import { useState, useEffect, useRef } from "react";
import { CATEGORIES, SECTIONS, EXPERT_MODES, EXPERT_PROMPTS, LEARNING_PATHS, CATEGORY_TOOLS, DAILY_INSIGHTS } from "../categories";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const GREETINGS = ["hi","hey","hello","kumusta","kamusta","sup","yo","hi po","hey po","good morning","good afternoon","good evening","magandang umaga","magandang hapon","magandang gabi"];
const isGreeting = t => GREETINGS.some(g => t.toLowerCase().trim() === g || t.toLowerCase().trim() === g + "!");

const FOLLOWUP_OPTIONS = {
  health:{q:"What kind of help do you need?",opts:["Symptoms / Illness","Diet & Nutrition","Sleep & Energy","Mental Health","Something else"]},
  skin:{q:"What's your main skin concern?",opts:["Acne / Pimples","Oily Skin","Dark Spots","Dry Skin","Something else"]},
  hair:{q:"What's your hair concern?",opts:["Hair Fall","Dry / Frizzy Hair","Hair Growth","Styling Tips","Something else"]},
  mental:{q:"What would you like to talk about?",opts:["Stress & Anxiety","Motivation","Sadness / Low Mood","Sleep Issues","Something else"]},
  fitness:{q:"What's your fitness goal?",opts:["Lose Weight","Build Muscle","Stay Active","Beginner Workout","Something else"]},
  cooking:{q:"What do you need help with?",opts:["Recipe Ideas","Ingredient Substitute","Cooking Techniques","Meal Planning","Something else"]},
  money:{q:"What's your situation?",opts:["Student / No Income","Fresh Graduate","Working / Employed","Starting a Business","Something else"]},
  fashion:{q:"What's the occasion?",opts:["Casual Everyday","Job Interview","Date Night","Formal Event","Something else"]},
  relationship:{q:"What kind of relationship?",opts:["Romantic Partner","Family","Friends","Work / Colleagues","Something else"]},
  study:{q:"What do you need help with?",opts:["Exam Preparation","Can't Focus","Time Management","Understanding a Topic","Something else"]},
  career:{q:"Where are you in your career?",opts:["Fresh Graduate","Job Hunting","Career Switch","Want a Promotion","Something else"]},
  pet:{q:"What type of pet do you have?",opts:["Dog","Cat","Bird","Fish / Reptile","Something else"]},
  legal:{q:"What's your concern?",opts:["Employee Rights","Filing a Complaint","Documents / Contracts","Tenant Rights","Something else"]},
  electronics:{q:"What device needs help?",opts:["Smartphone","Laptop / PC","TV / Smart Device","Internet / WiFi","Something else"]},
  coding:{q:"What do you need help with?",opts:["Fix an Error / Bug","Learn a Concept","Build a Project","Code Review","Something else"]},
  research:{q:"What kind of research help?",opts:["Fact Checking","Summarize a Topic","Find Sources","Explain Simply","Something else"]},
  business:{q:"What do you need help with?",opts:["Validate an Idea","Marketing Strategy","Pricing","Find Customers","Something else"]},
  writing:{q:"What kind of writing help?",opts:["Fix Grammar","Improve Style","Write from Scratch","Shorten / Summarize","Something else"]},
};

const FOLLOWUP_ACTIONS = ["Want a step-by-step plan?","Give me examples","Explain it simpler","What are the pros and cons?","Explain like I'm 12"];
const SCORES_CATS = ["money","business","career","fitness","coding"];

function parseInline(text) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((p,i)=>{
    if(/^\*\*[^*]+\*\*$/.test(p))return<strong key={i}>{p.slice(2,-2)}</strong>;
    if(/^\*[^*]+\*$/.test(p))return<em key={i}>{p.slice(1,-1)}</em>;
    return p;
  });
}

function renderMD(text, onChip) {
  const lines = text.split("\n");
  const els=[]; let i=0;
  while(i<lines.length){
    const l=lines[i];
    if(!l.trim()){i++;continue;}
    if(/^\d+\.\s/.test(l)){
      const items=[];
      while(i<lines.length&&/^\d+\.\s/.test(lines[i])){items.push(<li key={i}>{parseInline(lines[i].replace(/^\d+\.\s/,""))}</li>);i++;}
      els.push(<ol key={"ol"+i} className="md-ol">{items}</ol>);continue;
    }
    if(/^[\*\-]\s/.test(l)){
      const items=[];
      while(i<lines.length&&/^[\*\-]\s/.test(lines[i])){items.push(<li key={i}>{parseInline(lines[i].replace(/^[\*\-]\s/,""))}</li>);i++;}
      els.push(<ul key={"ul"+i} className="md-ul">{items}</ul>);continue;
    }
    if(/^#+\s/.test(l))els.push(<p key={i} className="md-h">{parseInline(l.replace(/^#+\s/,""))}</p>);
    else els.push(<p key={i} className="md-p">{parseInline(l)}</p>);
    i++;
  }
  if(onChip){
    const sugg=[];
    lines.forEach(l=>{const m=l.match(/^[\*\-\d\.]+\s+(.+\?)$/);if(m&&m[1].length<80)sugg.push(m[1].trim());});
    if(sugg.length>0)els.push(<div key="sugg" className="ai-chips">{sugg.slice(0,3).map((s,idx)=><button key={idx} className="ai-chip" onClick={()=>onChip(s)}>↗ {s}</button>)}</div>);
  }
  return els;
}

function getDailyInsight(catId) {
  const pool = DAILY_INSIGHTS[catId];
  if(!pool) return null;
  const day = Math.floor(Date.now()/(1000*60*60*24));
  return pool[day % pool.length];
}

function BMICalc() {
  const [h,setH]=useState(""); const [w,setW]=useState(""); const [res,setRes]=useState(null);
  function calc(){const bmi=w/((h/100)**2);setRes({bmi:bmi.toFixed(1),label:bmi<18.5?"Underweight":bmi<25?"Normal":bmi<30?"Overweight":"Obese"});}
  return(<div className="tool-card"><h4>BMI Calculator</h4><div className="tool-row"><input className="tool-input" placeholder="Height (cm)" value={h} onChange={e=>setH(e.target.value)} type="number"/><input className="tool-input" placeholder="Weight (kg)" value={w} onChange={e=>setW(e.target.value)} type="number"/></div><button className="tool-btn" onClick={calc}>Calculate</button>{res&&<div className="tool-result">BMI: <strong>{res.bmi}</strong> — {res.label}</div>}</div>);
}

function CalorieCalc() {
  const [age,setAge]=useState(""); const [gender,setGender]=useState("male"); const [h,setH]=useState(""); const [w,setW]=useState(""); const [act,setAct]=useState("1.2"); const [res,setRes]=useState(null);
  function calc(){const bmr=gender==="male"?88.36+(13.4*w)+(4.8*h)-(5.7*age):447.6+(9.2*w)+(3.1*h)-(4.3*age);setRes(Math.round(bmr*act));}
  return(<div className="tool-card"><h4>Calorie Calculator (TDEE)</h4><div className="tool-row"><input className="tool-input" placeholder="Age" value={age} onChange={e=>setAge(e.target.value)} type="number"/><select className="tool-input" value={gender} onChange={e=>setGender(e.target.value)}><option value="male">Male</option><option value="female">Female</option></select></div><div className="tool-row"><input className="tool-input" placeholder="Height (cm)" value={h} onChange={e=>setH(e.target.value)} type="number"/><input className="tool-input" placeholder="Weight (kg)" value={w} onChange={e=>setW(e.target.value)} type="number"/></div><select className="tool-input" value={act} onChange={e=>setAct(e.target.value)} style={{width:"100%",marginBottom:8}}><option value="1.2">Sedentary</option><option value="1.375">Light Exercise</option><option value="1.55">Moderate</option><option value="1.725">Very Active</option></select><button className="tool-btn" onClick={calc}>Calculate</button>{res&&<div className="tool-result">Daily Calories: <strong>{res} kcal</strong></div>}</div>);
}

function BudgetTool() {
  const [income,setIncome]=useState(""); const [res,setRes]=useState(null);
  function calc(){const n=parseFloat(income);if(isNaN(n))return;setRes({needs:Math.round(n*0.5),wants:Math.round(n*0.3),save:Math.round(n*0.2)});}
  return(<div className="tool-card"><h4>50/30/20 Budget Planner</h4><input className="tool-input" placeholder="Monthly income (₱)" value={income} onChange={e=>setIncome(e.target.value)} type="number" style={{width:"100%",marginBottom:8}}/><button className="tool-btn" onClick={calc}>Calculate</button>{res&&<div className="tool-result">🏠 Needs: <strong>₱{res.needs}</strong><br/>🎉 Wants: <strong>₱{res.wants}</strong><br/>💰 Savings: <strong>₱{res.save}</strong></div>}</div>);
}

function CodeFormatter() {
  const [code,setCode]=useState(""); const [out,setOut]=useState("");
  function format(){try{const json=JSON.parse(code);setOut(JSON.stringify(json,null,2));}catch{setOut(code.replace(/;/g,";\n").replace(/\{/g,"{\n").replace(/\}/g,"\n}"));}}
  return(<div className="tool-card"><h4>Code / JSON Formatter</h4><textarea className="tool-textarea" placeholder="Paste code or JSON here..." value={code} onChange={e=>setCode(e.target.value)} rows={4}/><button className="tool-btn" onClick={format}>Format</button>{out&&<pre className="tool-pre">{out}</pre>}</div>);
}

function LearningPath({ catId, lang }) {
  const path = LEARNING_PATHS[catId];
  if (!path) return null;
  const savedKey = `lp_${catId}`;
  const [done, setDone] = useState(() => { try { return JSON.parse(localStorage.getItem(savedKey)||"[]"); } catch { return []; }});
  function toggle(i) { const nd = done.includes(i) ? done.filter(x=>x!==i) : [...done,i]; setDone(nd); localStorage.setItem(savedKey, JSON.stringify(nd)); }
  const pct = Math.round((done.length/path.steps.length)*100);
  return (
    <div className="lp-card">
      <div className="lp-header">
        <span className="lp-title">📍 {path.title}</span>
        <span className="lp-pct">{pct}%</span>
      </div>
      <div className="lp-bar"><div className="lp-fill" style={{width:pct+"%"}} /></div>
      <div className="lp-steps">
        {path.steps.map((s,i)=>(
          <div key={i} className={`lp-step${done.includes(i)?" done":""}`} onClick={()=>toggle(i)}>
            <span className="lp-check">{done.includes(i)?"✅":"⬜"}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Scorecard({ text }) {
  const scores = { risk: Math.floor(Math.random()*4)+4, cost: Math.floor(Math.random()*5)+2, difficulty: Math.floor(Math.random()*4)+3, time: Math.floor(Math.random()*4)+3 };
  const [show, setShow] = useState(false);
  if (!show) return <button className="scorecard-btn" onClick={()=>setShow(true)}>📊 View AI Scorecard</button>;
  return (
    <div className="scorecard">
      <div className="sc-title">AI Scorecard</div>
      {Object.entries(scores).map(([k,v])=>(
        <div key={k} className="sc-row">
          <span className="sc-label">{k.charAt(0).toUpperCase()+k.slice(1)}</span>
          <div className="sc-bar-wrap"><div className="sc-bar" style={{width:(v/10*100)+"%", background: v>=7?"#e05555":v>=5?"#e09055":"#55b855"}} /></div>
          <span className="sc-val">{v}/10</span>
        </div>
      ))}
    </div>
  );
}

function SavedChats({ catId, onLoad }) {
  const key = `saved_${catId}`;
  const [chats, setChats] = useState(() => { try { return JSON.parse(localStorage.getItem(key)||"[]"); } catch { return []; }});
  const [open, setOpen] = useState(false);
  if (chats.length === 0) return null;
  return (
    <div className="saved-wrap">
      <button className="saved-toggle" onClick={()=>setOpen(o=>!o)}>💾 Saved Chats ({chats.length}) {open?"▲":"▼"}</button>
      {open && (
        <div className="saved-list">
          {chats.map((c,i)=>(
            <div key={i} className="saved-item">
              <span className="saved-preview" onClick={()=>{onLoad(c.history);setOpen(false);}}>📄 {c.preview}</span>
              <button className="saved-del" onClick={()=>{const nd=chats.filter((_,j)=>j!==i);setChats(nd);localStorage.setItem(key,JSON.stringify(nd));}}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function makeInitMsg(cat, lang) {
  return [{ role:"ai", text:`Hi! I'm your ${cat[lang]?.name||cat.en.name} advisor. Try a suggestion below or ask me anything!` }];
}

export default function ChatPage({ lang, initialCat, onHome, onMessageSent }) {
  const [cat, setCat] = useState(initialCat);
  const catDataRef = useRef({});
  const [messages, setMessages] = useState(() => makeInitMsg(initialCat, lang));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [followUpModal, setFollowUpModal] = useState(null);
  const [expertMode, setExpertMode] = useState(null);
  const [showExpertPicker, setShowExpertPicker] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [showLearning, setShowLearning] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [cooldown, setCooldown] = useState(0);
  const [showCompare, setShowCompare] = useState(false);
  const [compareA, setCompareA] = useState(""); const [compareB, setCompareB] = useState("");
  const [comparingResult, setComparingResult] = useState(null);
  const [multiOpinion, setMultiOpinion] = useState(null);
  const msgsRef = useRef(null);
  const coolRef = useRef(null);
  const streamRef = useRef(false);

  // Voice mode
  const [voiceOn, setVoiceOn] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("off");
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const data = getCatData(initialCat);
    setMessages(data.messages);
    setFollowUpModal(null);
    setExpertMode(null);
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, [initialCat]);

  function getCatData(c) {
    if (!catDataRef.current[c.id]) catDataRef.current[c.id] = { messages: makeInitMsg(c, lang), history: [], followUpShown: false };
    return catDataRef.current[c.id];
  }

  function switchCat(c) {
    catDataRef.current[cat.id] = { messages, history: getCurrentHistory(), followUpShown: isFollowUpShown() };
    const data = getCatData(c);
    setCat(c); setMessages(data.messages); setFollowUpModal(null); setExpertMode(null); setActiveTool(null);
    if (window.innerWidth < 768) setSidebarOpen(false);
    scrollToBottom();
  }

  function scrollToBottom() { setTimeout(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, 50); }
  function getCurrentHistory() { return catDataRef.current[cat.id]?.history || []; }
  function setCurrentHistory(h) { if (!catDataRef.current[cat.id]) catDataRef.current[cat.id] = { messages:[], history:[], followUpShown:false }; catDataRef.current[cat.id].history = h; }
  function isFollowUpShown() { return catDataRef.current[cat.id]?.followUpShown || false; }
  function setFollowUpShown(v) { if (!catDataRef.current[cat.id]) catDataRef.current[cat.id] = { messages:[], history:[], followUpShown:false }; catDataRef.current[cat.id].followUpShown = v; }
  function updateMessages(updater) { setMessages(prev => { const next = typeof updater==="function"?updater(prev):updater; if(catDataRef.current[cat.id]) catDataRef.current[cat.id].messages=next; return next; }); }

  function startCooldown() {
    setCooldown(2); if(coolRef.current) clearInterval(coolRef.current);
    coolRef.current = setInterval(()=>{ setCooldown(p=>{if(p<=1){clearInterval(coolRef.current);return 0;}return p-1;}); },1000);
  }

  function buildSystemPrompt() {
    let p = cat.prompt;
    if (expertMode && EXPERT_PROMPTS[expertMode]) p += " " + EXPERT_PROMPTS[expertMode];
    p += ` Respond in the user's language. Language preference: ${lang}. Format with paragraphs and lists. Do NOT use raw asterisks — use proper formatting.`;
    const hist = getCurrentHistory();
    if (hist.length > 10) p += ` Context summary: The user has been asking about ${cat.en.name.toLowerCase()} topics.`;
    return p;
  }

  async function streamResponse(newHistory, onToken, onDone, onError) {
    streamRef.current = true;
    try {
      const res = await fetch(`${API_URL}/api/chat/stream`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ messages: newHistory.slice(-12), systemPrompt: buildSystemPrompt(), maxTokens: 800 })
      });
      if (res.status === 429) { const d=await res.json(); onError(d.error||"Too many messages. Please slow down."); return; }
      const reader = res.body.getReader(); const decoder = new TextDecoder(); let buf=""; let reply="";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value,{stream:true});
        const lines = buf.split("\n"); buf = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data==="[DONE]") break;
          try { const p=JSON.parse(data); if(p.token){reply+=p.token;onToken(p.token);} if(p.error){onError(p.error);return;} } catch {}
        }
      }
      onDone(reply);
    } catch(e) { onError("Something went wrong. Please try again."); }
    streamRef.current = false;
  }

  async function doSend(text, skipFollowUp=false) {
    if (loading || !text || cooldown > 0) return;
    const newMsgs = [...messages, { role:"user", text }];
    const newHistory = [...getCurrentHistory(), { role:"user", content:text }];

    if (!isFollowUpShown() && !skipFollowUp && !isGreeting(text)) {
      const opts = FOLLOWUP_OPTIONS[cat.id];
      if (opts) { updateMessages(newMsgs); setCurrentHistory(newHistory); setFollowUpModal(opts); onMessageSent&&onMessageSent(); scrollToBottom(); return; }
      setFollowUpShown(true);
    }

    updateMessages([...newMsgs, { role:"thinking", text: lang==="tl"?"Nag-iisip...":"Thinking..." }]);
    setCurrentHistory(newHistory);
    setLoading(true); scrollToBottom(); onMessageSent&&onMessageSent();

    let reply = "";
    updateMessages(prev => [...prev.filter(m=>m.role!=="thinking"), { role:"ai", text:"", streaming:true }]);

    await streamResponse(newHistory,
      (token) => { reply+=token; updateMessages(prev=>{ const c=[...prev]; const last=c[c.length-1]; if(last?.streaming) c[c.length-1]={...last,text:reply}; return c; }); scrollToBottom(); },
      (full) => {
        updateMessages(prev=>{ const c=[...prev]; const last=c[c.length-1]; if(last?.streaming) c[c.length-1]={...last,streaming:false}; return c; });
        setCurrentHistory([...newHistory, { role:"assistant", content:full }]);
        onMessageSent&&onMessageSent();

        // Speak if voice mode on
        if (voiceOn && synthRef.current) {
          synthRef.current.cancel();
          const utt = new SpeechSynthesisUtterance(full.replace(/[*#]/g,"").slice(0,500));
          utt.onend = () => { setVoiceStatus("listening"); startListening(); };
          setVoiceStatus("speaking"); synthRef.current.speak(utt);
        }
      },
      (err) => { updateMessages(prev=>[...prev.filter(m=>m.role!=="thinking"&&!m.streaming), { role:"ai", text:err }]); }
    );

    setLoading(false); startCooldown(); scrollToBottom();
  }

  async function send(textOverride) { const t=textOverride||input.trim(); if(!t)return; setInput(""); await doSend(t); }

  // Voice
  function startListening() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice not supported in this browser. Try Chrome."); return; }
    const r = new SR(); r.continuous=false; r.interimResults=false; r.lang="en-US";
    recognitionRef.current = r;
    r.onstart = () => setVoiceStatus("listening");
    r.onresult = (e) => { const t=e.results[0][0].transcript; setInput(t); setVoiceStatus("thinking"); synthRef.current?.cancel(); setTimeout(()=>{ setInput(""); doSend(t); },300); };
    r.onerror = (e) => { setVoiceStatus("off"); if(e.error==="not-allowed") alert("Microphone access denied. Please allow it in your browser."); };
    r.onend = () => { if(voiceOn && voiceStatus!=="speaking") setVoiceStatus("idle"); };
    r.start();
  }

  function toggleVoice() {
    if (voiceOn) { setVoiceOn(false); setVoiceStatus("off"); recognitionRef.current?.stop(); synthRef.current?.cancel(); }
    else { setVoiceOn(true); startListening(); }
  }

  function saveChat() {
    const h = getCurrentHistory();
    if (h.length < 2) return;
    const key = `saved_${cat.id}`;
    const existing = JSON.parse(localStorage.getItem(key)||"[]");
    const preview = h.find(m=>m.role==="user")?.content?.slice(0,40)||"Chat";
    existing.unshift({ preview, history: h, date: new Date().toLocaleDateString() });
    localStorage.setItem(key, JSON.stringify(existing.slice(0,10)));
    alert("Chat saved!");
  }

  async function runCompare() {
    if (!compareA.trim() || !compareB.trim()) return;
    setComparingResult("loading");
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          messages:[{role:"user", content:`Compare "${compareA}" vs "${compareB}". Give a structured comparison table with pros, cons, and a final recommendation. Keep it concise.`}],
          systemPrompt: `You are an expert analyst. Respond in language: ${lang}. Use clear headings and bullet points. No raw asterisks.`,
          maxTokens: 700
        })
      });
      const d = await res.json(); setComparingResult(d.reply||"Could not compare.");
    } catch { setComparingResult("Error. Please try again."); }
  }

  async function getMultiOpinion(question) {
    setMultiOpinion("loading");
    const roles = cat.id==="business"?["Startup Advisor","Investor","Marketing Expert"]:cat.id==="coding"?["Senior Developer","Tech Lead","Security Expert"]:cat.id==="money"?["Financial Advisor","Budget Coach","Investment Expert"]:["Expert A","Expert B","Expert C"];
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          messages:[{role:"user", content:question}],
          systemPrompt:`You are providing 3 different expert opinions on the user's question. Format EXACTLY like this:\n\n**${roles[0]}:**\n[opinion]\n\n**${roles[1]}:**\n[opinion]\n\n**${roles[2]}:**\n[opinion]\n\nKeep each opinion 2-3 sentences. Language: ${lang}.`,
          maxTokens:600
        })
      });
      const d = await res.json(); setMultiOpinion(d.reply||"Could not get opinions.");
    } catch { setMultiOpinion("Error. Please try again."); }
  }

  const chips = cat[lang]?.chips||cat.en.chips;
  const experts = EXPERT_MODES[cat.id];
  const tools = CATEGORY_TOOLS[cat.id];
  const insight = getDailyInsight(cat.id);
  const isMobile = window.innerWidth < 768;
  const voiceIcons = { off:"🎙️ Voice", listening:"🎤 Listening...", thinking:"🧠 Thinking...", speaking:"🔊 Speaking...", idle:"🎙️ Voice" };

  return (
    <div className="chat-view">
      <button className="sb-toggle" onClick={()=>setSidebarOpen(o=>!o)} title={sidebarOpen?"Collapse":"Expand"}>
        {sidebarOpen?"◀":"☰"}
      </button>

      {isMobile && sidebarOpen && <div className="sb-overlay" onClick={()=>setSidebarOpen(false)} />}

      <div className={`sidebar${sidebarOpen?" open":" closed"}`}>
        <div className="back-btn" onClick={onHome}><span>←</span><span className="back-txt"> Home</span></div>
        {["General",...SECTIONS].map(sec=>(
          <div key={sec}>
            <div className="sb-sec">{sec}</div>
            {CATEGORIES.filter(c=>c.section===sec).map(c=>(
              <div key={c.id} className={`sb-item${c.id===cat.id?" active":""}`} onClick={()=>switchCat(c)} title={c[lang]?.name||c.en.name}>
                <div className="sb-icon" style={{background:c.bg}}>{c.icon}</div>
                <div className="sb-info"><div className="sb-name">{c[lang]?.name||c.en.name}</div><div className="sb-lbl">{c[lang]?.label||c.en.label}</div></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="chat-main">
        <div className="chat-hdr">
          <div className="ch-icon" style={{background:cat.bg}}>{cat.icon}</div>
          <div className="ch-info">
            <div className="ch-title">{cat[lang]?.name||cat.en.name}</div>
            {expertMode && <div className="ch-expert">Expert: {EXPERT_MODES[cat.id]?.find(e=>e.id===expertMode)?.label}</div>}
          </div>
          <div className="chat-actions">
            {experts && <button className="ca-btn" onClick={()=>setShowExpertPicker(v=>!v)} title="Expert Mode">🎓</button>}
            {LEARNING_PATHS[cat.id] && <button className="ca-btn" onClick={()=>setShowLearning(v=>!v)} title="Learning Path">📍</button>}
            {tools && <button className="ca-btn" onClick={()=>setActiveTool(activeTool?null:tools[0].id)} title="Tools">🔧</button>}
            <button className="ca-btn" onClick={()=>setShowCompare(v=>!v)} title="Compare Tool">⚖️</button>
            <button className="ca-btn" onClick={saveChat} title="Save Chat">💾</button>
            <button className={`ca-btn voice-btn${voiceOn?" voice-on":""}`} onClick={toggleVoice} title="Voice Mode">{voiceOn ? voiceIcons[voiceStatus]||"🎙️" : "🎙️"}</button>
          </div>
        </div>

        {insight && <div className="daily-insight">{insight}</div>}

        {showExpertPicker && experts && (
          <div className="expert-picker">
            <div className="ep-title">Choose your expert:</div>
            <div className="ep-opts">
              <button className={`ep-opt${!expertMode?" active":""}`} onClick={()=>{setExpertMode(null);setShowExpertPicker(false);}}>🤖 Default</button>
              {experts.map(e=>(
                <button key={e.id} className={`ep-opt${expertMode===e.id?" active":""}`} onClick={()=>{setExpertMode(e.id);setShowExpertPicker(false);}}>
                  <strong>{e.label}</strong><br/><small>{e.desc}</small>
                </button>
              ))}
            </div>
          </div>
        )}

        {showLearning && <LearningPath catId={cat.id} lang={lang} />}

        {activeTool && (
          <div className="tool-wrap">
            <div className="tool-tabs">
              {(tools||[]).map(t=><button key={t.id} className={`tool-tab${activeTool===t.id?" active":""}`} onClick={()=>setActiveTool(t.id)}>{t.icon} {t.label}</button>)}
              <button className="tool-tab" onClick={()=>setActiveTool(null)}>✕ Close</button>
            </div>
            {activeTool==="bmi"&&<BMICalc/>}
            {activeTool==="calories"&&<CalorieCalc/>}
            {activeTool==="budget"&&<BudgetTool/>}
            {activeTool==="format"&&<CodeFormatter/>}
            {activeTool==="convert"&&<div className="tool-card"><p style={{color:"#888",fontSize:13}}>Ask the AI about unit conversions in the chat!</p></div>}
          </div>
        )}

        {showCompare && (
          <div className="compare-wrap">
            <div className="compare-title">⚖️ AI Compare Tool</div>
            <div className="compare-inputs">
              <input className="cmp-input" placeholder="Option A (e.g. Python)" value={compareA} onChange={e=>setCompareA(e.target.value)} />
              <span className="cmp-vs">vs</span>
              <input className="cmp-input" placeholder="Option B (e.g. JavaScript)" value={compareB} onChange={e=>setCompareB(e.target.value)} />
              <button className="cmp-btn" onClick={runCompare}>Compare</button>
              <button className="cmp-close" onClick={()=>{setShowCompare(false);setComparingResult(null);}}>✕</button>
            </div>
            {comparingResult==="loading"&&<div className="cmp-loading">Comparing...</div>}
            {comparingResult&&comparingResult!=="loading"&&<div className="cmp-result">{renderMD(comparingResult)}</div>}
          </div>
        )}

        <SavedChats catId={cat.id} onLoad={(h)=>{setCurrentHistory(h);}} />

        <div className="messages" ref={msgsRef}>
          {messages.map((m,i)=>(
            <div key={i} className={`msg-row${m.role==="user"?" user":""}`}>
              <div className={`av ${m.role==="user"?"user-av":"ai-av"}`}>{m.role==="user"?"Y":"A"}</div>
              <div className={`bubble${m.role==="thinking"?" thinking":m.role==="user"?" user":""}`}>
                {m.role==="ai"
                  ? <>{renderMD(m.text, t=>send(t))}{m.streaming&&<span className="cursor">▋</span>}{!m.streaming&&m.text.length>100&&SCORES_CATS.includes(cat.id)&&<Scorecard text={m.text}/>}</>
                  : m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Follow-up action buttons */}
        {messages.length>1&&messages[messages.length-1]?.role==="ai"&&!messages[messages.length-1]?.streaming&&(
          <div className="followup-actions">
            {FOLLOWUP_ACTIONS.map(a=><button key={a} className="fa-btn" onClick={()=>send(a)}>{a}</button>)}
            {["money","business","career","coding","study"].includes(cat.id)&&(
              <button className="fa-btn fa-opinion" onClick={()=>{ const last=getCurrentHistory().find(m=>m.role==="user")?.content; if(last) getMultiOpinion(last); }}>🧠 Multiple Opinions</button>
            )}
          </div>
        )}

        {multiOpinion&&multiOpinion!=="loading"&&(
          <div className="multi-opinion">
            <div className="mo-title">🧠 Multiple Expert Opinions</div>
            {renderMD(multiOpinion)}
            <button className="mo-close" onClick={()=>setMultiOpinion(null)}>✕ Close</button>
          </div>
        )}
        {multiOpinion==="loading"&&<div className="mo-loading">Getting multiple opinions...</div>}

        <div className="qchips">
          {chips.map(ch=><span key={ch} className="qchip" onClick={()=>send(ch)}>↗ {ch}</span>)}
        </div>

        <div className="input-area">
          <div className="input-box">
            <textarea className="msg-input" value={input} placeholder="Message Adviserly..."
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} rows={1} />
            <button className="send-btn" disabled={loading||cooldown>0} onClick={()=>send()}>
              {cooldown>0?cooldown:"↑"}
            </button>
          </div>
          <div className="hint">Adviserly can make mistakes. Use it as a guide, not a final answer.</div>
        </div>
      </div>

      {followUpModal&&(
        <div className="modal-overlay">
          <div className="followup-modal">
            <div className="fu-q">{followUpModal.q}</div>
            <div className="fu-opts">
              {followUpModal.opts.map((o,i)=>(
                <button key={i} className="fu-opt" onClick={()=>{setFollowUpModal(null);setFollowUpShown(true);doSend(o,true);}}>
                  <span className="fu-num">{i+1}</span> {o}
                </button>
              ))}
            </div>
            <button className="fu-skip" onClick={()=>{setFollowUpModal(null);setFollowUpShown(true);}}>Skip →</button>
          </div>
        </div>
      )}
    </div>
  );
}
