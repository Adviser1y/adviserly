export const SECTIONS = ["Wellness", "Daily Life", "Personal", "Tech", "Business", "Writing"];

export const EXPERT_MODES = {
  health:       [{ id:"general_health", label:"General Advisor", desc:"Overall health guidance" }, { id:"nutrition", label:"Nutrition Coach", desc:"Diet & food advice" }, { id:"mental_health", label:"Mental Health Guide", desc:"Stress, anxiety, mood" }],
  fitness:      [{ id:"trainer", label:"Personal Trainer", desc:"Workouts & plans" }, { id:"nutrition_fit", label:"Nutrition Coach", desc:"Meal plans & macros" }, { id:"marathon", label:"Marathon Coach", desc:"Running & endurance" }],
  coding:       [{ id:"mentor", label:"Coding Mentor", desc:"Learn programming" }, { id:"debugger", label:"Debugger", desc:"Fix errors & bugs" }, { id:"webdev", label:"Web Developer", desc:"HTML, CSS, JS, React" }],
  money:        [{ id:"budgeter", label:"Budget Planner", desc:"Save & manage money" }, { id:"investor", label:"Investment Advisor", desc:"Grow your wealth" }, { id:"debt", label:"Debt Advisor", desc:"Get out of debt" }],
  career:       [{ id:"resume", label:"Resume Expert", desc:"CV & cover letters" }, { id:"interview", label:"Interview Coach", desc:"Nail interviews" }, { id:"growth", label:"Career Growth", desc:"Promotions & skills" }],
  study:        [{ id:"exam", label:"Exam Coach", desc:"Test prep & exams" }, { id:"focus", label:"Focus Coach", desc:"Productivity & focus" }, { id:"tutor", label:"Subject Tutor", desc:"Explain any topic" }],
  skin:         [{ id:"routine", label:"Routine Builder", desc:"Daily skincare plans" }, { id:"acne", label:"Acne Specialist", desc:"Clear skin advice" }, { id:"anti_age", label:"Anti-Aging Coach", desc:"Youthful skin tips" }],
  cooking:      [{ id:"recipe", label:"Recipe Creator", desc:"Custom recipes" }, { id:"nutrition_cook", label:"Nutrition Chef", desc:"Healthy cooking" }, { id:"baker", label:"Baking Expert", desc:"Cakes, bread & more" }],
  relationship: [{ id:"couples", label:"Couples Advisor", desc:"Romantic relationships" }, { id:"family", label:"Family Counselor", desc:"Family dynamics" }, { id:"friends", label:"Friendship Coach", desc:"Social skills" }],
  business:     [{ id:"startup", label:"Startup Advisor", desc:"Launch your idea" }, { id:"marketing", label:"Marketing Consultant", desc:"Grow your audience" }, { id:"finance_biz", label:"Business Finance", desc:"Revenue & profits" }],
  writing:      [{ id:"editor", label:"Editor", desc:"Polish your writing" }, { id:"coach", label:"Writing Coach", desc:"Improve your craft" }, { id:"grammar", label:"Grammar Assistant", desc:"Fix grammar & style" }],
};

export const EXPERT_PROMPTS = {
  nutrition: "Focus on dietary advice, meal planning, macronutrients, and nutrition science.",
  mental_health: "Focus on mental health, emotional wellness, stress management, and coping strategies.",
  trainer: "Focus on workout programming, exercise form, progressive overload, and training plans.",
  nutrition_fit: "Focus on sports nutrition, meal timing, macros for fitness goals.",
  marathon: "Focus on running training, marathon preparation, endurance, and pacing.",
  mentor: "Focus on teaching programming concepts clearly with examples.",
  debugger: "Focus on finding and fixing code errors. Ask for the error message and code.",
  webdev: "Focus on web development: HTML, CSS, JavaScript, React, and related tools.",
  budgeter: "Focus on budgeting, saving strategies, and daily money management.",
  investor: "Focus on investment basics, stocks, funds, and wealth building.",
  debt: "Focus on debt repayment strategies and financial recovery.",
  resume: "Focus on resume writing, cover letters, and job applications.",
  interview: "Focus on interview preparation, common questions, and confidence.",
  growth: "Focus on career advancement, skills development, and workplace strategy.",
  exam: "Focus on exam strategies, study schedules, and test-taking techniques.",
  focus: "Focus on productivity, concentration, and study habits.",
  tutor: "Focus on explaining concepts clearly and checking understanding.",
  routine: "Focus on building daily skincare routines for different skin types.",
  acne: "Focus on acne causes, treatments, and prevention.",
  anti_age: "Focus on anti-aging skincare, ingredients, and routines.",
  recipe: "Focus on creating and customizing recipes based on available ingredients.",
  nutrition_cook: "Focus on healthy, nutritious meal preparation.",
  baker: "Focus on baking techniques, recipes, and troubleshooting.",
  couples: "Focus on romantic relationship dynamics, communication, and intimacy.",
  family: "Focus on family relationships, parenting, and household dynamics.",
  friends: "Focus on friendships, social skills, and peer relationships.",
  startup: "Focus on startup strategy, product-market fit, and launching.",
  marketing: "Focus on marketing strategies, social media, and audience growth.",
  finance_biz: "Focus on business finances, revenue models, and profitability.",
  editor: "Focus on editing text for clarity, flow, and impact.",
  coach: "Focus on improving writing skills, style, and technique.",
  grammar: "Focus on grammar, punctuation, and style corrections.",
};

export const LEARNING_PATHS = {
  coding: {
    title: "Learn Python in 30 Days",
    steps: ["Day 1-3: Variables & Data Types", "Day 4-6: Control Flow (if/for/while)", "Day 7-10: Functions & Modules", "Day 11-15: Lists, Dicts & Files", "Day 16-20: OOP & Classes", "Day 21-25: APIs & Libraries", "Day 26-30: Build a Project"]
  },
  fitness: {
    title: "Fitness Transformation Plan",
    steps: ["Week 1: Build the Habit (3x/week)", "Week 2: Add Nutrition Basics", "Week 3: Increase Intensity", "Week 4: Track Progress", "Week 5-6: Progressive Overload", "Week 7-8: Results & Adjust"]
  },
  money: {
    title: "Start Saving in 7 Steps",
    steps: ["Step 1: Track all expenses for 1 week", "Step 2: Create a simple budget", "Step 3: Cut 1 unnecessary expense", "Step 4: Open a savings account", "Step 5: Set up auto-transfer", "Step 6: Build ₱1000 emergency fund", "Step 7: Set a 3-month goal"]
  },
  career: {
    title: "Land Your Dream Job",
    steps: ["Step 1: Define your target role", "Step 2: Update your resume", "Step 3: Build LinkedIn profile", "Step 4: Apply to 5 jobs/week", "Step 5: Practice interview answers", "Step 6: Negotiate your offer", "Step 7: Crush your first 90 days"]
  },
  study: {
    title: "Ace Your Exams",
    steps: ["Week 1: Create a study schedule", "Week 2: Active recall techniques", "Week 3: Practice tests & past papers", "Week 4: Review weak areas", "Week 5: Final revision & rest", "Exam Day: Stay calm & focused"]
  },
  business: {
    title: "Start a Business in 7 Steps",
    steps: ["Step 1: Validate your idea", "Step 2: Research competitors", "Step 3: Define your audience", "Step 4: Build an MVP", "Step 5: Get first customers", "Step 6: Collect feedback", "Step 7: Scale what works"]
  },
};

export const CATEGORY_TOOLS = {
  fitness: [
    { id: "bmi", label: "BMI Calculator", icon: "⚖️" },
    { id: "calories", label: "Calorie Calculator", icon: "🔥" },
  ],
  money: [
    { id: "budget", label: "Budget Planner", icon: "📊" },
  ],
  cooking: [
    { id: "convert", label: "Unit Converter", icon: "🥄" },
  ],
  coding: [
    { id: "format", label: "Code Formatter", icon: "✨" },
  ],
};

export const DAILY_INSIGHTS = {
  coding:   ["💡 Tip: Name variables clearly — code is read more than it's written.", "💡 Tip: Learn one new built-in function today.", "💡 Tip: Write small functions that do one thing well.", "💡 Tip: Read error messages carefully — they tell you exactly what went wrong.", "💡 Tip: Practice by building something you actually want to use."],
  fitness:  ["💪 Challenge: Do 20 squats right now!", "💪 Tip: Sleep is when your muscles actually grow.", "💪 Challenge: Walk 1,000 extra steps today.", "💪 Tip: Consistency beats intensity every time.", "💪 Challenge: Try 5 minutes of stretching before bed."],
  money:    ["💰 Tip: Check your bank balance every morning.", "💰 Idea: Cancel one unused subscription today.", "💰 Tip: The 24-hour rule: wait before any non-essential purchase.", "💰 Tip: Pay yourself first — save before you spend.", "💰 Idea: Track every peso you spend this week."],
  study:    ["📖 Tip: Study in 25-minute focused blocks (Pomodoro).", "📖 Tip: Teach what you learned to someone else.", "📖 Challenge: Summarize today's lesson in 5 sentences.", "📖 Tip: Review notes within 24 hours of a class.", "📖 Tip: Handwriting notes improves retention vs typing."],
  cooking:  ["🍳 Tip: Mise en place — prep everything before cooking.", "🍳 Idea: Try one new ingredient this week.", "🍳 Tip: Taste as you go, not just at the end.", "🍳 Tip: A sharp knife is safer than a dull one.", "🍳 Challenge: Cook a meal from scratch today."],
  business: ["🚀 Idea: Talk to one potential customer today.", "🚀 Tip: Revenue solves most startup problems.", "🚀 Tip: Build in public — share your progress online.", "🚀 Idea: Write down 3 business ideas right now.", "🚀 Tip: Your first version doesn't need to be perfect."],
  writing:  ["✍️ Tip: Write every day, even just 100 words.", "✍️ Tip: The first draft is just you telling yourself the story.", "✍️ Challenge: Write a 5-sentence story right now.", "✍️ Tip: Read widely to write better.", "✍️ Tip: Cut every word that doesn't add meaning."],
};

export const CATEGORIES = [
  {
    id: "general", icon: "💬", bg: "#1e2a38", section: "General",
    en: { name: "General Questions", label: "Ask me anything", chips: ["Give me a fun fact", "Help me decide something", "Explain something simply"] },
    tl: { name: "Pangkalahatang Tanong", label: "Magtanong ng kahit ano", chips: ["Bigyan mo ako ng fun fact", "Tulungan mo akong magdesisyon", "Ipaliwanag nang simple"] },
    prompt: "You are a helpful, knowledgeable, friendly general assistant. Answer clearly with well-formatted paragraphs.",
  },
  {
    id: "health", icon: "❤️", bg: "#3f0c0c", section: "Wellness",
    en: { name: "Health Advice", label: "Symptoms, wellness, nutrition", chips: ["What causes headaches?", "How to improve sleep?", "Is my diet balanced?"] },
    tl: { name: "Kalusugan", label: "Sintomas, kalusugan, nutrisyon", chips: ["Bakit masakit ang ulo ko?", "Paano mapabuti ang tulog?", "Malusog ba ang pagkain ko?"] },
    prompt: "You are a careful, empathetic health advisor. Always remind users to see a doctor for serious concerns.",
  },
  {
    id: "skin", icon: "✨", bg: "#2a1a0f", section: "Wellness",
    en: { name: "Skin Care", label: "Routines, products, breakouts", chips: ["How to remove pimples?", "Best routine for oily skin", "What causes dark spots?"] },
    tl: { name: "Pag-aalaga ng Balat", label: "Rutina, produkto, pimples", chips: ["Paano aalisin ang pimples?", "Routine para sa mantikang balat", "Bakit may dark spots?"] },
    prompt: "You are a knowledgeable skincare advisor. Give practical, evidence-based advice.",
  },
  {
    id: "hair", icon: "💇", bg: "#1a0f2a", section: "Wellness",
    en: { name: "Hair Care", label: "Growth, styling, treatments", chips: ["How to reduce hair fall?", "Best shampoo for dry hair", "How to grow hair faster?"] },
    tl: { name: "Pag-aalaga ng Buhok", label: "Paglago, istilo, paggamot", chips: ["Paano mababawasan ang paglagas?", "Pinakamainam na shampoo", "Paano mapapabilis ang paglago?"] },
    prompt: "You are a hair care expert. Ask about hair type before giving advice.",
  },
  {
    id: "mental", icon: "🧠", bg: "#1a0a1a", section: "Wellness",
    en: { name: "Mental Wellness", label: "Stress, anxiety, motivation", chips: ["How to manage stress?", "I feel anxious lately", "How to stay motivated?"] },
    tl: { name: "Mental Wellness", label: "Stress, pagkabalisa, motibasyon", chips: ["Paano pamahalaan ang stress?", "Nangangamba ako", "Paano manatiling motivated?"] },
    prompt: "You are a compassionate mental wellness guide. Acknowledge feelings first. Always recommend professional help for serious concerns.",
  },
  {
    id: "fitness", icon: "💪", bg: "#0f1f04", section: "Wellness",
    en: { name: "Fitness", label: "Workouts, goals, nutrition", chips: ["Beginner workout at home", "How to lose belly fat?", "Best pre-workout food?"] },
    tl: { name: "Fitness", label: "Ehersisyo, goals, nutrisyon", chips: ["Workout para sa baguhan", "Paano mawalan ng tiyan?", "Pagkain bago mag-ehersisyo?"] },
    prompt: "You are an encouraging personal fitness coach.",
  },
  {
    id: "cooking", icon: "🍳", bg: "#2a1a04", section: "Daily Life",
    en: { name: "Cooking Help", label: "Recipes, tips, substitutes", chips: ["Easy recipe with eggs", "Substitute for butter?", "How to cook rice perfectly?"] },
    tl: { name: "Pagluluto", label: "Mga recipe, tips, papalit", chips: ["Madaling recipe na may itlog", "Papalit sa butter?", "Paano magluto ng bigas?"] },
    prompt: "You are a friendly home cook and recipe expert.",
  },
  {
    id: "money", icon: "💰", bg: "#0a1f0a", section: "Daily Life",
    en: { name: "Money & Budget", label: "Saving, budgeting, expenses", chips: ["How do I start saving?", "50/30/20 rule explained", "Budget with low income?"] },
    tl: { name: "Pera at Budget", label: "Pag-iimpok, budget, gastos", chips: ["Paano magsimulang mag-ipon?", "Ipaliwanag ang 50/30/20 rule", "Budget sa maliit na kita?"] },
    prompt: "You are a friendly personal finance advisor.",
  },
  {
    id: "fashion", icon: "👗", bg: "#1f0f1f", section: "Daily Life",
    en: { name: "Fashion & Style", label: "Outfits, trends, confidence", chips: ["What to wear for an interview?", "Casual outfit ideas", "How to mix and match?"] },
    tl: { name: "Fashion at Estilo", label: "Outfit, trend, kumpiyansa", chips: ["Damit para sa interview?", "Casual outfit ideas", "Paano mag-mix and match?"] },
    prompt: "You are a friendly fashion advisor.",
  },
  {
    id: "relationship", icon: "💑", bg: "#2a0a1a", section: "Personal",
    en: { name: "Relationship Advice", label: "Love, friendship, family", chips: ["How to communicate better?", "I had a fight with my partner", "How to set boundaries?"] },
    tl: { name: "Relasyon at Payo", label: "Pag-ibig, pagkakaibigan, pamilya", chips: ["Paano mas mapabuti ang komunikasyon?", "Nag-away kami ng partner ko", "Paano mag-set ng boundaries?"] },
    prompt: "You are an empathetic relationship advisor. Be non-judgmental and balanced.",
  },
  {
    id: "study", icon: "📖", bg: "#0a1428", section: "Personal",
    en: { name: "Study & School Help", label: "Exams, focus, learning tips", chips: ["How to study effectively?", "I can't focus while studying", "Best way to memorize?"] },
    tl: { name: "Pag-aaral at Paaralan", label: "Exam, focus, paraan ng pag-aaral", chips: ["Paano epektibong mag-aral?", "Hindi ako makapag-focus", "Pinakamainam na paraan ng memorize?"] },
    prompt: "You are a patient study coach.",
  },
  {
    id: "career", icon: "💼", bg: "#0f1a0a", section: "Personal",
    en: { name: "Career & Job Tips", label: "Resume, interviews, growth", chips: ["How do I write a good resume?", "Tips for job interviews", "How to ask for a raise?"] },
    tl: { name: "Trabaho at Karera", label: "Resume, interview, paglago", chips: ["Paano gumawa ng magandang resume?", "Tips para sa job interview", "Paano humingi ng dagdag sa sahod?"] },
    prompt: "You are a helpful career advisor.",
  },
  {
    id: "pet", icon: "🐾", bg: "#1a1408", section: "Personal",
    en: { name: "Pet Care", label: "Dogs, cats, health & training", chips: ["How to train a puppy?", "My cat is not eating", "Best food for dogs?"] },
    tl: { name: "Pag-aalaga ng Alagang Hayop", label: "Aso, pusa, kalusugan at pagsasanay", chips: ["Paano sanayin ang tuta?", "Hindi kumakain ang pusa ko", "Pinakamainam na pagkain para sa aso?"] },
    prompt: "You are a friendly pet care advisor. Always recommend a vet for medical concerns.",
  },
  {
    id: "legal", icon: "⚖️", bg: "#141414", section: "Personal",
    en: { name: "Legal Questions", label: "Basic rights, documents, advice", chips: ["Rights as an employee?", "How to file a complaint?", "What is a notarized document?"] },
    tl: { name: "Legal na Tanong", label: "Karapatan, dokumento, payo", chips: ["Ano ang karapatan ko bilang empleyado?", "Paano mag-file ng reklamo?", "Ano ang notarized na dokumento?"] },
    prompt: "You are a general legal information guide (NOT a lawyer). Always recommend consulting a lawyer for serious matters.",
  },
  {
    id: "electronics", icon: "💻", bg: "#091828", section: "Tech",
    en: { name: "Electronics", label: "Gadgets, devices, repairs", chips: ["My phone battery drains fast", "Best budget laptop 2025", "WiFi keeps disconnecting"] },
    tl: { name: "Electronics", label: "Gadgets, device, pagkukumpuni", chips: ["Mabilis maubos ang baterya", "Pinakamainam na budget laptop", "WiFi laging nangingila"] },
    prompt: "You are an expert electronics technician.",
  },
  {
    id: "coding", icon: "👨‍💻", bg: "#041f14", section: "Tech",
    en: { name: "Coding Help", label: "Debug, learn, build projects", chips: ["Fix my Python error", "Explain what an API is", "How do I center a div?"] },
    tl: { name: "Coding", label: "Debug, matuto, gumawa ng project", chips: ["Ayusin ang Python error", "Ano ang API?", "Paano i-center ang div?"] },
    prompt: "You are a senior software engineer and patient coding mentor. Show working code examples.",
  },
  {
    id: "research", icon: "📚", bg: "#150f2a", section: "Tech",
    en: { name: "Research Help", label: "Verify facts, summarize topics", chips: ["Is this news reliable?", "Summarize quantum computing", "Explain climate change simply"] },
    tl: { name: "Pananaliksik", label: "I-verify ang impormasyon", chips: ["Totoo ba itong balita?", "I-summarize ang quantum computing", "Ipaliwanag ang climate change"] },
    prompt: "You are a rigorous research assistant. Be objective and flag uncertainty.",
  },
  {
    id: "business", icon: "🏢", bg: "#1a1a0a", section: "Business",
    en: { name: "Business", label: "Startups, marketing, strategy", chips: ["How to validate a business idea?", "How to get first customers?", "How to price my product?"] },
    tl: { name: "Negosyo", label: "Startup, marketing, estratehiya", chips: ["Paano i-validate ang business idea?", "Paano makakuha ng unang customer?", "Paano mag-presyo ng produkto?"] },
    prompt: "You are a sharp business advisor with startup and marketing expertise.",
  },
  {
    id: "writing", icon: "✍️", bg: "#0a0a1a", section: "Writing",
    en: { name: "Writing Help", label: "Essays, stories, grammar", chips: ["Help me write an email", "Fix my grammar", "Make my writing more engaging"] },
    tl: { name: "Pagsulat", label: "Essay, kwento, grammar", chips: ["Tulungan mo akong sumulat ng email", "Ayusin ang grammar ko", "Gawing mas kawili-wili ang sulatin ko"] },
    prompt: "You are a skilled writing coach and editor.",
  },
];

export const GENERAL_PROMPT = "You are a helpful, knowledgeable, and friendly general assistant. Answer clearly and warmly.";
