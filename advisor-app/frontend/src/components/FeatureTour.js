import { useState } from "react";

const STEPS = [
  { icon: "🎓", title: "Expert Modes", desc: "Click the 🎓 button in the chat header to switch between specialized experts — like a Personal Trainer, Nutrition Coach, or Debugger — for more targeted advice." },
  { icon: "📍", title: "Learning Paths", desc: "Click 📍 to access structured step-by-step learning journeys like 'Learn Python in 30 Days' or 'Start a Business in 7 Steps'. Track your progress as you go!" },
  { icon: "⚖️", title: "AI Compare Tool", desc: "Click ⚖️ to compare two options side by side — like Python vs JavaScript, or Freelancing vs Employment. Get a full AI-powered breakdown." },
  { icon: "💾", title: "Save Chats", desc: "Click 💾 to save your current conversation so you can come back to it later. Your chats are stored on your device." },
  { icon: "🎙️", title: "Voice Mode", desc: "Click 🎙️ to speak to Adviserly! It will listen to you, think, and speak the answer back. Works like a real voice assistant." },
  { icon: "🔧", title: "Category Tools", desc: "Some categories have built-in tools — like a BMI Calculator for Fitness, a Budget Planner for Money, or a Code Formatter for Coding. Look for 🔧!" },
  { icon: "✦", title: "Follow-up Buttons", desc: "After every AI response, quick action buttons appear below — like 'Give me examples' or 'Explain it simpler'. Tap them instead of typing!" },
  { icon: "🌐", title: "Language Selector", desc: "Tap the language button at the top to switch Adviserly's language. It supports English, Tagalog, Spanish, French, and 8 more languages!" },
];

export default function FeatureTour({ onDismiss }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="tour-overlay">
      <div className="tour-modal">
        <div className="tour-header">
          <span className="tour-badge">✦ Quick Tour</span>
          <button className="tour-skip" onClick={onDismiss}>Skip tour</button>
        </div>
        <div className="tour-icon">{current.icon}</div>
        <h2 className="tour-title">{current.title}</h2>
        <p className="tour-desc">{current.desc}</p>
        <div className="tour-dots">
          {STEPS.map((_, i) => (
            <div key={i} className={`tour-dot${i === step ? " active" : ""}`} onClick={() => setStep(i)} />
          ))}
        </div>
        <div className="tour-btns">
          {step > 0 && <button className="tour-prev" onClick={() => setStep(s => s - 1)}>← Back</button>}
          <button className="tour-next" onClick={() => isLast ? onDismiss() : setStep(s => s + 1)}>
            {isLast ? "🚀 Let's go!" : "Next →"}
          </button>
        </div>
        <div className="tour-count">{step + 1} of {STEPS.length}</div>
      </div>
    </div>
  );
}
