export const CATEGORIES = [
  {
    id: "health",
    icon: "❤️",
    color: "#E24B4A",
    bg: "#FCEBEB",
    en: {
      name: "Health Advice",
      desc: "Symptoms, wellness, nutrition",
      chips: ["What causes headaches?", "Is my diet balanced?", "How to improve sleep?"],
    },
    tl: {
      name: "Kalusugan",
      desc: "Sintomas, kalusugan, nutrisyon",
      chips: ["Bakit masakit ang ulo ko?", "Ano ang malusog na pagkain?", "Paano mapabuti ang tulog?"],
    },
    prompt: `You are a careful, empathetic health advisor. Provide clear, responsible general health guidance. Always remind users to see a doctor for serious concerns. Be warm and avoid jargon. If the user writes in Tagalog, respond in Tagalog.`,
  },
  {
    id: "electronics",
    icon: "💻",
    color: "#185FA5",
    bg: "#E6F1FB",
    en: {
      name: "Electronics Help",
      desc: "Gadgets, devices, repairs",
      chips: ["My phone battery drains fast", "Best budget laptop 2025", "WiFi keeps disconnecting"],
    },
    tl: {
      name: "Electronics",
      desc: "Gadgets, device, pagkukumpuni",
      chips: ["Mabilis maubos ang baterya ko", "Pinakamahusay na budget laptop", "WiFi laging nangingila"],
    },
    prompt: `You are an expert electronics and gadget technician. Help users troubleshoot devices, understand specs, and make smart buying decisions. Be practical, step-by-step, and beginner-friendly. If the user writes in Tagalog, respond in Tagalog.`,
  },
  {
    id: "cooking",
    icon: "🍳",
    color: "#BA7517",
    bg: "#FAEEDA",
    en: {
      name: "Cooking Help",
      desc: "Recipes, techniques, tips",
      chips: ["Easy recipe with eggs", "How to cook rice perfectly", "Substitute for butter?"],
    },
    tl: {
      name: "Pagluluto",
      desc: "Mga recipe, teknik, tips",
      chips: ["Madaling recipe na may itlog", "Paano magluto ng bigas nang tama", "Papalit sa butter?"],
    },
    prompt: `You are a friendly experienced home cook and culinary advisor. Help with recipes, techniques, ingredient substitutions, and meal planning. Be encouraging, practical, and specific. If the user writes in Tagalog, respond in Tagalog.`,
  },
  {
    id: "money",
    icon: "💰",
    color: "#3B6D11",
    bg: "#EAF3DE",
    en: {
      name: "Money & Budget",
      desc: "Saving, budgeting, student finance",
      chips: ["How do I start saving?", "What is the 50/30/20 rule?", "How to budget on minimum wage?"],
    },
    tl: {
      name: "Pera at Budget",
      desc: "Pag-iimpok, budget, estudyante",
      chips: ["Paano magsimulang mag-ipon?", "Ano ang 50/30/20 rule?", "Paano mag-budget sa maliit na sahod?"],
    },
    prompt: `You are a friendly and practical personal finance advisor, especially helpful for students, fresh graduates, and beginners. Help users with budgeting, saving, understanding bills, and building good money habits. Be encouraging, non-judgmental, and give concrete actionable tips. If the user writes in Tagalog, respond in Tagalog.`,
  },
  {
    id: "research",
    icon: "📚",
    color: "#534AB7",
    bg: "#EEEDFE",
    en: {
      name: "Research Help",
      desc: "Verify facts, summarize topics",
      chips: ["Is this news article reliable?", "Summarize quantum computing", "Explain climate change simply"],
    },
    tl: {
      name: "Pananaliksik",
      desc: "I-verify ang impormasyon",
      chips: ["Totoo ba itong balita?", "I-summarize ang quantum computing", "Ipaliwanag ang climate change"],
    },
    prompt: `You are a rigorous research assistant. Help users verify facts, summarize research, find credible sources, and think critically. Be objective, explain reasoning, and flag uncertainty. If the user writes in Tagalog, respond in Tagalog.`,
  },
  {
    id: "coding",
    icon: "👨‍💻",
    color: "#0F6E56",
    bg: "#E1F5EE",
    en: {
      name: "Coding Help",
      desc: "Debug, learn, build projects",
      chips: ["Fix my Python error", "Explain what an API is", "How do I center a div?"],
    },
    tl: {
      name: "Coding",
      desc: "Debug, matuto, gumawa ng project",
      chips: ["Ayusin ang aking Python error", "Ano ang API?", "Paano i-center ang div?"],
    },
    prompt: `You are a senior software engineer and patient coding mentor. Help users debug code, learn programming concepts, and build projects. Show working examples. Be clear for beginners but go deep for advanced users. If the user writes in Tagalog, respond in Tagalog.`,
  },
  {
    id: "fitness",
    icon: "💪",
    color: "#639922",
    bg: "#EAF3DE",
    en: {
      name: "Fitness",
      desc: "Workouts, goals, motivation",
      chips: ["Beginner workout at home", "How to lose belly fat?", "Best foods before exercise?"],
    },
    tl: {
      name: "Fitness",
      desc: "Ehersisyo, goals, motibasyon",
      chips: ["Workout para sa baguhan sa bahay", "Paano mawalan ng tiyan?", "Pinakamainam na pagkain bago mag-ehersisyo?"],
    },
    prompt: `You are an encouraging, knowledgeable personal fitness coach. Help with workout plans, exercise form, nutrition for fitness, and staying motivated. Be realistic, safe, and supportive. If the user writes in Tagalog, respond in Tagalog.`,
  },
  {
    id: "general",
    icon: "💬",
    color: "#5F5E5A",
    bg: "#F1EFE8",
    en: {
      name: "General Questions",
      desc: "Anything on your mind",
      chips: ["Explain something complicated simply", "Give me a fun fact", "Help me think through a decision"],
    },
    tl: {
      name: "Pangkalahatang Tanong",
      desc: "Anumang katanungan",
      chips: ["Ipaliwanag nang simple", "Bigyan mo ako ng fun fact", "Tulungan mo akong magdesisyon"],
    },
    prompt: `You are a helpful, knowledgeable, and friendly general assistant. Answer any question clearly, honestly, and warmly. Be conversational. If the user writes in Tagalog, respond in Tagalog.`,
  },
];

export const UI_TEXT = {
  en: {
    title: "What do you need help with?",
    sub: "Choose a category, then ask your question",
    back: "← Back",
    send: "Send",
    placeholder: "Type your question...",
    thinking: "Thinking...",
    greeting: (name) => `Hi! I'm your ${name}. What would you like to know?`,
  },
  tl: {
    title: "Ano ang kailangan mo?",
    sub: "Pumili ng kategorya, tapos magtanong",
    back: "← Bumalik",
    send: "Ipadala",
    placeholder: "I-type ang iyong tanong...",
    thinking: "Nag-iisip...",
    greeting: (name) => `Kamusta! Ako ang iyong ${name}. Ano ang gusto mong malaman?`,
  },
};
