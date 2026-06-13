import { useState, useRef } from "react";
import { CATEGORIES, SECTIONS, GENERAL_PROMPT } from "../categories";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const QUICK_SUGGESTIONS = ["How can I improve my sleep?","How do I start saving money?","Best workout for beginners?","How to manage stress?"];

function parseInline(text) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((p,i)=>{
    if(/^\*\*[^*]+\*\*$/.test(p))return<strong key={i}>{p.slice(2,-2)}</strong>;
    if(/^\*[^*]+\*$/.test(p))return<em key={i}>{p.slice(1,-1)}</em>;
    return p;
  });
}
function renderMD(text) {
  const lines=text.split("\n"); const els=[]; let i=0;
  while(i<lines.length){
    const l=lines[i];
    if(!l.trim()){i++;continue;}
    if(/^\d+\.\s/.test(l)){const items=[];while(i<lines.length&&/^\d+\.\s/.test(lines[i])){items.push(<li key={i}>{parseInline(lines[i].replace(/^\d+\.\s/,""))}</li>);i++;}els.push(<ol key={"ol"+i} className="md-ol">{items}</ol>);continue;}
    if(/^[\*\-]\s/.test(l)){const items=[];while(i<lines.length&&/^[\*\-]\s/.test(lines[i])){items.push(<li key={i}>{parseInline(lines[i].replace(/^[\*\-]\s/,""))}</li>);i++;}els.push(<ul key={"ul"+i} className="md-ul">{items}</ul>);continue;}
    if(/^#+\s/.test(l))els.push(<p key={i} className="md-h">{parseInline(l.replace(/^#+\s/,""))}</p>);
    else els.push(<p key={i} className="md-p">{parseInline(l)}</p>);
    i++;
  }
  return els;
}

export default function HomePage({ lang, onSelectCat, onMessageSent, onShowTerms, onShowTour }) {
  const [msgs, setMsgs] = useState([{ role:"ai", text:"Hi! Ask me anything or pick a category for specialized help." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [cooldown, setCooldown] = useState(0);
  const msgsRef = useRef(null);
  const coolRef = useRef(null);

  const ui = {
    en:{ badge:"🤖 AI ADVICE FOR EVERYDAY LIFE", h1:"Get Smart Advice,", h2:"Anytime, Anywhere.", sub:"Your AI advisor for health, money, relationships, studies, fitness and more.", askBtn:"Ask Anything", popCats:"Popular Categories", viewAll:"View all", chatTitle:"What can I help you with today?", ph:"Ask anything...", coffee:"☕ Buy me a coffee", footer:"Built with ❤️ · AI advice for a better you.", features:[{icon:"🎯",t:"Personalized Advice",s:"Tailored to your needs"},{icon:"⭐",t:"Expert Categories",s:"Wide range of topics"},{icon:"⚡",t:"Fast AI Responses",s:"Get answers instantly"},{icon:"🎁",t:"Free to Use",s:"No sign up required"}] },
    tl:{ badge:"🤖 AI PAYO PARA SA ARAW-ARAW", h1:"Makakuha ng Matalinong Payo,", h2:"Kahit Kailan, Kahit Saan.", sub:"Ang iyong AI advisor para sa kalusugan, pera, relasyon, pag-aaral at marami pa.", askBtn:"Magtanong", popCats:"Mga Kategorya", viewAll:"Tingnan lahat", chatTitle:"Paano kita matutulungan ngayon?", ph:"Magtanong ng kahit ano...", coffee:"☕ Bilhan ng kape", footer:"Ginawa nang may ❤️", features:[{icon:"🎯",t:"Personal na Payo",s:"Ayon sa iyong pangangailangan"},{icon:"⭐",t:"Iba't Ibang Kategorya",s:"Malawak na paksa"},{icon:"⚡",t:"Mabilis na Tugon",s:"Sagot agad"},{icon:"🎁",t:"Libre",s:"Walang sign up"}] },
  };
  const t = ui[lang]||ui.en;
  const popCats = CATEGORIES.filter(c=>["health","money","fitness","mental","study","career"].includes(c.id));

  function startCooldown(){setCooldown(2);if(coolRef.current)clearInterval(coolRef.current);coolRef.current=setInterval(()=>{setCooldown(p=>{if(p<=1){clearInterval(coolRef.current);return 0;}return p-1;});},1000);}

  async function send(txt) {
    const text=txt||input.trim();
    if(!text||loading||cooldown>0)return;
    setInput("");
    const newH=[...history,{role:"user",content:text}];
    setMsgs(prev=>[...prev,{role:"user",text},{role:"thinking",text:"Thinking..."}]);
    setLoading(true); onMessageSent&&onMessageSent();
    try {
      const res=await fetch(`${API_URL}/api/chat/stream`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:newH,systemPrompt:GENERAL_PROMPT+` Language: ${lang}. Format with paragraphs and lists. No raw asterisks.`,maxTokens:600})});
      if(res.status===429){const d=await res.json();setMsgs(prev=>[...prev.filter(m=>m.role!=="thinking"),{role:"ai",text:d.error||"Too many messages. Please slow down."}]);setLoading(false);return;}
      const reader=res.body.getReader();const decoder=new TextDecoder();let reply="";let buf="";
      setMsgs(prev=>[...prev.filter(m=>m.role!=="thinking"),{role:"ai",text:"",streaming:true}]);
      while(true){const{done,value}=await reader.read();if(done)break;buf+=decoder.decode(value,{stream:true});const lines=buf.split("\n");buf=lines.pop();for(const line of lines){if(!line.startsWith("data: "))continue;const data=line.slice(6);if(data==="[DONE]")break;try{const p=JSON.parse(data);if(p.token){reply+=p.token;setMsgs(prev=>{const copy=[...prev];const last=copy[copy.length-1];if(last?.streaming)copy[copy.length-1]={...last,text:reply};return copy;});}}catch{}}}
      setMsgs(prev=>{const copy=[...prev];const last=copy[copy.length-1];if(last?.streaming)copy[copy.length-1]={...last,streaming:false};return copy;});
      setHistory([...newH,{role:"assistant",content:reply}]); onMessageSent&&onMessageSent();
    } catch{setMsgs(prev=>[...prev.filter(m=>m.role!=="thinking"&&!m.streaming),{role:"ai",text:"Something went wrong. Please try again."}]);}
    setLoading(false);startCooldown();
    setTimeout(()=>{if(msgsRef.current)msgsRef.current.scrollTop=msgsRef.current.scrollHeight;},50);
  }

  return (
    <div className="home-view">
      <div className="hero">
        <div className="hero-badge">{t.badge}</div>
        <h1 className="hero-title">{t.h1}<br /><span className="hero-accent">{t.h2}</span></h1>
        <p className="hero-sub">{t.sub}</p>
        <div className="hero-btns">
          <button className="hero-btn" onClick={()=>document.getElementById("hci")?.focus()}>✦ {t.askBtn} ✦</button>
          <button className="tour-trigger-btn" onClick={onShowTour}>🗺️ Take a Tour</button>
        </div>
      </div>

      <div className="section-wrap">
        <div className="sec-hdr"><span className="sec-lbl-txt">{t.popCats}</span>
          <button className="view-all" onClick={()=>document.getElementById("allcats")?.scrollIntoView({behavior:"smooth"})}>{t.viewAll} →</button>
        </div>
        <div className="scroll-wrap">
          <div className="hscroll">
            {popCats.map(c=>(
              <div key={c.id} className="pop-card" onClick={()=>onSelectCat(c)}>
                <div className="pop-top"><div className="cat-badge" style={{background:c.bg}}>{c.icon}</div><span className="pop-name">{c[lang]?.name||c.en.name}</span></div>
                <div className="pop-lbl">{c[lang]?.label||c.en.label}</div>
                <div className="pop-arrow">→</div>
              </div>
            ))}
          </div>
          <div className="sfade" />
        </div>
      </div>

      <div className="home-chat-wrap">
        <div className="home-chat-box">
          <h2 className="hcb-title">{t.chatTitle}</h2>
          <div className="home-msgs" ref={msgsRef}>
            {msgs.map((m,i)=>(
              <div key={i} className={`hmsg ${m.role}`}>
                {m.role==="ai"||m.role==="thinking"?<div className="hmsg-md">{renderMD(m.text)}{m.streaming&&<span className="cursor">▋</span>}</div>:m.text}
              </div>
            ))}
          </div>
          <div className="home-input-row">
            <textarea id="hci" className="h-input" value={input} placeholder={t.ph} rows={1}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} />
            <button className="h-send" disabled={loading||cooldown>0} onClick={()=>send()}>{cooldown>0?cooldown:"↑"}</button>
          </div>
          <div className="qchips">
            {QUICK_SUGGESTIONS.map(s=><button key={s} className="qchip" onClick={()=>send(s)}>✦ {s}</button>)}
          </div>
        </div>
      </div>

      <div id="allcats" className="all-cats">
        {SECTIONS.map(sec=>(
          <div key={sec} className="cat-section">
            <div className="sec-label">{sec}</div>
            <div className="scroll-wrap">
              <div className="hscroll">
                {CATEGORIES.filter(c=>c.section===sec).map(c=>(
                  <div key={c.id} className="cat-card" onClick={()=>onSelectCat(c)}>
                    <div className="cc-top"><div className="cat-badge" style={{background:c.bg}}>{c.icon}</div><span className="cc-name">{c[lang]?.name||c.en.name}</span></div>
                    <div className="cc-lbl">{c[lang]?.label||c.en.label}</div>
                    <div className="cc-chips">{(c[lang]?.chips||c.en.chips).slice(0,2).map(ch=><div key={ch} className="mini-chip">↗ {ch}</div>)}</div>
                  </div>
                ))}
              </div>
              <div className="sfade" />
            </div>
          </div>
        ))}
      </div>

      <div className="features-row">
        {t.features.map((f,i)=>(
          <div key={i} className="feat-item">
            <div className="feat-icon">{f.icon}</div>
            <div><div className="feat-t">{f.t}</div><div className="feat-s">{f.s}</div></div>
          </div>
        ))}
      </div>

      <div className="home-footer">
        <span className="footer-txt">{t.footer}</span>
        <a href="https://ko-fi.com/adviserly" target="_blank" rel="noreferrer" className="coffee-btn">{t.coffee}</a>
        <button className="footer-link" onClick={onShowTerms}>Terms & Privacy</button>
        <button className="footer-link" onClick={onShowTour}>🗺️ Feature Tour</button>
      </div>
    </div>
  );
}
