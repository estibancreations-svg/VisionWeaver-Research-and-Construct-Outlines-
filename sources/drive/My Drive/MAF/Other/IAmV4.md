Original name: IAmV4
Drive ID: 1-z5hAJlR6jsPcj0Iadm90Etx9rtZz4Af-JWWtmH1Fos
Parent folder: My Drive/MAF/Other/
Modified: 2026-05-23T21:58:06.609Z

/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  ONE TRIBE — "I Am That I Am"                                        ║
 * ║  Build: v4.0.0                                                       ║
 * ║  Timestamp: 2026-04-27T00:00:00-04:00 (EDT)                         ║
 * ║                                                                      ║
 * ║  CHANGELOG from v3.1.0 → v4.0.0:                                    ║
 * ║  - NEW: Guided onboarding flow (Welcome → How It Works → Begin)     ║
 * ║  - NEW: Node selection/activation — user elects each node to start  ║
 * ║  - NEW: Per-session + total elapsed time tracking per node          ║
 * ║  - NEW: Notes panel — user can write questions/thoughts per node    ║
 * ║  - NEW: Legal pad background option for notes (yellow + lines)      ║
 * ║  - NEW: Theme switcher — Dark / Light / Legal Pad                   ║
 * ║  - PRESERVED: All 232 questions, XP, avatar, puzzle, footprint      ║
 * ║  REVERT: Load localStorage key "onetribe_v3_1" for prior build      ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─── BUILD ──────────────────────────────────────────────────────────────────
const BUILD = {
  version: "4.0.0",
  timestamp: "2026-04-27T00:00:00-04:00",
  storageKey: "onetribe_v4",
  prevBuildKey: "onetribe_v3_1",
};

// ─── THEMES ─────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    id: "dark",
    label: "Dark",
    icon: "◐",
    bg: "#050508",
    surface: "#0d0d12",
    surfaceAlt: "#12121a",
    border: "rgba(255,255,255,0.08)",
    borderAccent: "rgba(255,255,255,0.18)",
    text: "#ffffff",
    textMid: "rgba(255,255,255,0.55)",
    textDim: "rgba(255,255,255,0.28)",
    headerBg: "rgba(5,5,8,0.96)",
    modalBg: "#0d0d12",
    inputBg: "rgba(255,255,255,0.05)",
    notesBg: "#0a0a10",
    notesLines: "rgba(255,255,255,0.06)",
    notesText: "#fff",
    notesMargin: "rgba(79,195,247,0.3)",
    notesPaper: false,
  },
  light: {
    id: "light",
    label: "Light",
    icon: "○",
    bg: "#f5f5f0",
    surface: "#ffffff",
    surfaceAlt: "#f0f0ea",
    border: "rgba(0,0,0,0.1)",
    borderAccent: "rgba(0,0,0,0.22)",
    text: "#1a1a2e",
    textMid: "rgba(0,0,0,0.55)",
    textDim: "rgba(0,0,0,0.32)",
    headerBg: "rgba(245,245,240,0.96)",
    modalBg: "#ffffff",
    inputBg: "rgba(0,0,0,0.04)",
    notesBg: "#fffef5",
    notesLines: "rgba(100,149,237,0.25)",
    notesText: "#1a1a2e",
    notesMargin: "rgba(220,50,50,0.4)",
    notesPaper: true,
  },
  legal: {
    id: "legal",
    label: "Legal Pad",
    icon: "≡",
    bg: "#f5e9a0",
    surface: "#fdf3b0",
    surfaceAlt: "#f0e090",
    border: "rgba(0,0,0,0.12)",
    borderAccent: "rgba(0,0,0,0.25)",
    text: "#1a1208",
    textMid: "rgba(26,18,8,0.62)",
    textDim: "rgba(26,18,8,0.38)",
    headerBg: "rgba(245,233,160,0.97)",
    modalBg: "#fdf3b0",
    inputBg: "rgba(0,0,0,0.05)",
    notesBg: "#fdf3b0",
    notesLines: "rgba(100,130,200,0.3)",
    notesText: "#1a1208",
    notesMargin: "rgba(200,40,40,0.45)",
    notesPaper: true,
  },
};

// ─── NODE CONFIG (all 232 questions preserved from v3.1.0) ──────────────────
const NODE_CONFIG = [
  {
    id: "seed", number: 0, label: "The Seed", emoji: "🌱",
    color: "#a8e6cf", bg: "#0d1f17", accent: "#2ecc71",
    description: "Baseline API Handshake — bypasses self-deception by pulling real behavioral data. Your zero point.",
    unlockXP: 50,
    estimatedMinutes: 12,
    secondNature: "Go outside barefoot for 2 minutes. Touch the earth. Feel your feet. This is where you actually are.",
    questions: [
      { key: "q1", label: "What name do you want this system to call you — not your given name, but the name of who you are becoming?", type: "text" },
      { key: "q2", label: "On a scale of 1–10, how honest are you willing to be with this system right now — knowing it will hold your truth?", type: "scale", min: 1, max: 10 },
      { key: "q3", label: "What brought you here today? What finally broke open the door?", type: "text" },
      { key: "q4", label: "How long have you known something needed to change?", type: "multiselect", options: ["Less than a month","A few months","1–2 years","3–5 years","Most of my adult life","My whole life"] },
      { key: "q5", label: "What is your primary device you spend the most time on daily?", type: "multiselect", options: ["iPhone","Android phone","iPad/tablet","Laptop/Mac","Multiple equally"] },
      { key: "q6", label: "Roughly how many hours per day are you on your phone?", type: "scale", min: 1, max: 16, unit: "hours" },
      { key: "q7", label: "What are your top 3 most-used apps right now? (List them honestly)", type: "text" },
      { key: "q8", label: "How much of your phone use is intentional vs. unconscious scrolling?", type: "scale", min: 0, max: 100, unit: "% intentional" },
      { key: "q9", label: "Do you currently use any system to track your goals or habits?", type: "yesno" },
      { key: "q10", label: "If yes — what system, and how consistently do you use it?", type: "text" },
      { key: "q11", label: "What time do you typically wake up?", type: "text" },
      { key: "q12", label: "What time do you typically go to sleep?", type: "text" },
      { key: "q13", label: "What is your approximate monthly take-home income? (This is data — no judgment)", type: "text" },
      { key: "q14", label: "How much of that income would you say 'disappears' without explanation each month?", type: "multiselect", options: ["Almost none","10–20%","20–40%","More than half","I genuinely don't know"] },
      { key: "q15", label: "How many social media accounts do you actively post on?", type: "number" },
      { key: "q16", label: "How many times a day do you check social media?", type: "scale", min: 0, max: 30 },
      { key: "q17", label: "What is your current relationship status?", type: "multiselect", options: ["Single","Dating","In a relationship","Married/partnered","Separated/divorced","Widowed","It's complicated"] },
      { key: "q18", label: "Do you have children or dependents?", type: "yesno" },
      { key: "q19", label: "If yes — how many, and what are their ages?", type: "text" },
      { key: "q20", label: "What city/region are you currently living in?", type: "text" },
      { key: "q21", label: "How long have you lived at your current address?", type: "multiselect", options: ["Less than 1 year","1–3 years","3–5 years","5–10 years","10+ years"] },
      { key: "q22", label: "How stable does your current living situation feel?", type: "scale", min: 1, max: 10 },
      { key: "q23", label: "What is your highest level of formal education?", type: "multiselect", options: ["Some high school","High school diploma/GED","Some college","Associate's degree","Bachelor's degree","Graduate degree","Self-educated/trades"] },
      { key: "q24", label: "What are you most afraid this system will discover about you?", type: "text" },
      { key: "q25", label: "What is the single most important thing you want your life to look like 3 years from today?", type: "text" },
    ],
  },
  {
    id: "inner_sanctum", number: 1, label: "The Inner Sanctum", emoji: "🔵",
    color: "#4fc3f7", bg: "#071929", accent: "#0288d1",
    description: "State of Calm — meditation, 528Hz/432Hz frequencies, nervous system regulation, spiritual baseline.",
    unlockXP: 100, estimatedMinutes: 15,
    secondNature: "Set a 5-minute timer right now. Sit in silence. No phone. Notice what arises without chasing it.",
    questions: [
      { key: "q1", label: "How many minutes per day is your mind completely quiet — no thoughts, no agenda?", type: "scale", min: 0, max: 120, unit: "minutes" },
      { key: "q2", label: "What specific environments or triggers shift your internal state from 'ocean waves' to a 'boiling pot'?", type: "text" },
      { key: "q3", label: "Do you currently have any meditation, prayer, or stillness practice?", type: "yesno" },
      { key: "q4", label: "If yes — describe it. How long and how often?", type: "text" },
      { key: "q5", label: "How would you describe your spiritual or philosophical foundation?", type: "text" },
      { key: "q6", label: "On a scale of 1–10, how much do you trust the universe / God / life to support you?", type: "scale", min: 1, max: 10 },
      { key: "q7", label: "What does 'peace' feel like in your body? Where do you feel it?", type: "text" },
      { key: "q8", label: "When did you last feel genuine peace — not just distraction?", type: "text" },
      { key: "q9", label: "Rate your current baseline anxiety level most days:", type: "scale", min: 1, max: 10 },
      { key: "q10", label: "Do you experience panic attacks or sudden intense anxiety?", type: "yesno" },
      { key: "q11", label: "How often do you feel emotionally 'flooded'?", type: "multiselect", options: ["Rarely","1–2x per month","Weekly","Several times a week","Almost daily"] },
      { key: "q12", label: "What is your primary nervous system response under stress?", type: "multiselect", options: ["Fight (anger/aggression)","Flight (escape/avoidance)","Freeze (shut down/numb)","Fawn (people-please/comply)","Combination"] },
      { key: "q13", label: "How does your body physically feel right now, in this moment?", type: "text" },
      { key: "q14", label: "Do you have a history of trauma — big or small?", type: "yesno" },
      { key: "q15", label: "On a scale of 1–10, how much do you feel that past experience is still running your present?", type: "scale", min: 1, max: 10 },
      { key: "q16", label: "What sound, music, or frequency do you find most calming?", type: "text" },
      { key: "q17", label: "How often do you spend time in nature?", type: "multiselect", options: ["Daily","Few times a week","Weekly","Monthly","Rarely"] },
      { key: "q18", label: "Do you have a gratitude or journaling practice?", type: "yesno" },
      { key: "q19", label: "How connected do you feel to something larger than yourself?", type: "scale", min: 1, max: 10 },
      { key: "q20", label: "What is your relationship with silence? Is it peaceful or uncomfortable?", type: "text" },
      { key: "q21", label: "When you are overwhelmed, what is your immediate default behavior?", type: "multiselect", options: ["Scroll phone","Eat","Sleep/withdraw","Work harder","Reach out to someone","Substance use","Exercise","Prayer/meditation"] },
      { key: "q22", label: "Do you use any substances to regulate your emotional state?", type: "multiselect", options: ["Never","Occasionally/socially","Weekly","Daily","I'm concerned about my use"] },
      { key: "q23", label: "What emotion do you most struggle to feel or express?", type: "multiselect", options: ["Anger","Sadness","Fear","Joy/happiness","Love/vulnerability","Shame","Grief"] },
      { key: "q24", label: "On a scale of 1–10, how much do you love yourself right now — not as performance, but genuinely?", type: "scale", min: 1, max: 10 },
      { key: "q25", label: "What would it mean for your nervous system to be fully at rest? What would your life look like?", type: "text" },
      { key: "q26", label: "Do you currently use any frequency therapy, sound baths, or binaural audio?", type: "yesno" },
      { key: "q27", label: "How is your sleep quality on average?", type: "scale", min: 1, max: 10 },
      { key: "q28", label: "Do you have recurring dreams, nightmares, or significant sleep disruptions?", type: "yesno" },
    ],
  },
  {
    id: "mirror", number: 2, label: "The Mirror", emoji: "⚫",
    color: "#b0bec5", bg: "#0a0a0a", accent: "#607d8b",
    description: "Accountability Engine — the 'Read for Filth' phase. Missed goals trigger Digital Friction locks.",
    unlockXP: 120, estimatedMinutes: 14, consequence: true,
    secondNature: "Write down ONE thing you've been avoiding for over a week. Put it on your calendar for tomorrow. Tell one person out loud.",
    questions: [
      { key: "q1", label: "What are the top 3 apps or websites you use to hide or escape from your responsibilities?", type: "text" },
      { key: "q2", label: "If you fail to complete a critical goal, what is the most effective consequence the system can enforce?", type: "text" },
      { key: "q3", label: "What is a 'sacred hour' in your day — one time block you will protect no matter what?", type: "text" },
      { key: "q4", label: "On a scale of 1–10, how accountable are you to yourself when no one else is watching?", type: "scale", min: 1, max: 10 },
      { key: "q5", label: "On a scale of 1–10, how accountable are you when you know someone else will see your results?", type: "scale", min: 1, max: 10 },
      { key: "q6", label: "What is your most common excuse when you avoid a difficult task?", type: "text" },
      { key: "q7", label: "How many uncompleted goals or projects are currently sitting on your list?", type: "multiselect", options: ["0–2","3–5","6–10","More than 10","I've stopped keeping a list"] },
      { key: "q8", label: "Do you tend to over-promise and under-deliver — to yourself or others?", type: "yesno" },
      { key: "q9", label: "What pattern of self-sabotage shows up most reliably in your life?", type: "text" },
      { key: "q10", label: "When you feel close to a breakthrough, do you tend to pull back or push through?", type: "multiselect", options: ["Pull back/self-sabotage","Push through","Depends on the domain","I've never noticed this pattern"] },
      { key: "q11", label: "Have you ever been called out for inconsistency — by someone who knew you well?", type: "yesno" },
      { key: "q12", label: "What was the feedback and do you believe it was accurate?", type: "text" },
      { key: "q13", label: "When you lie to yourself, what does it usually sound like? (Start with 'I'll do it...')", type: "text" },
      { key: "q14", label: "How many times this week did you say you'd do something and didn't?", type: "scale", min: 0, max: 20 },
      { key: "q15", label: "What is the cost — in real terms — of your avoidance patterns over the last 12 months?", type: "text" },
      { key: "q16", label: "Do you have an accountability partner currently?", type: "yesno" },
      { key: "q17", label: "If yes — how effective are they? If no — what has stopped you from getting one?", type: "text" },
      { key: "q18", label: "Which domain of your life has the largest gap between where you say you want to be and where you actually are?", type: "multiselect", options: ["Health/body","Finances","Relationships","Career/purpose","Spirituality","Mental health","Education"] },
      { key: "q19", label: "On a scale of 1–10, how much do you trust your own word — when you make a promise to yourself?", type: "scale", min: 1, max: 10 },
      { key: "q20", label: "What would your most honest friend say is the real reason you haven't moved further by now?", type: "text" },
      { key: "q21", label: "What do you need to be held accountable FOR first — the one thing that, if done consistently, would change everything?", type: "text" },
      { key: "q22", label: "Are you willing to have your progress made visible to a specialist in this system?", type: "yesno" },
      { key: "q23", label: "What does 'failure' mean to you at the deepest level? (Not logically — emotionally.)", type: "text" },
      { key: "q24", label: "What is the story you tell yourself about why people like you don't succeed?", type: "text" },
      { key: "q25", label: "Rate how much fear of failure drives your inaction vs. how much laziness does:", type: "scale", min: 0, max: 100, unit: "% fear (vs laziness)" },
      { key: "q26", label: "If the Mirror locked your top escape app for 48 hours when you missed a goal — would you cheat the system?", type: "yesno" },
      { key: "q27", label: "What would be the consequence you'd fear most and therefore take most seriously?", type: "text" },
    ],
  },
  {
    id: "forge", number: 3, label: "The Forge", emoji: "🟢",
    color: "#81c784", bg: "#061408", accent: "#388e3c",
    description: "Physical Health — diet tracking, somatic awareness, movement cadence, and body truth.",
    unlockXP: 100, estimatedMinutes: 14,
    secondNature: "Drink a full glass of water right now. Stand up. Walk to another room and back. That's your first rep.",
    questions: [
      { key: "q1", label: "What is the exact physical reality of your health right now? Describe your body without filters.", type: "text" },
      { key: "q2", label: "What is your current weight range, and how do you feel about it?", type: "text" },
      { key: "q3", label: "How many hours of sleep do you get on average?", type: "scale", min: 0, max: 12, unit: "hours" },
      { key: "q4", label: "How would you rate your sleep quality?", type: "scale", min: 1, max: 10 },
      { key: "q5", label: "How many days a week do you move your body intentionally?", type: "scale", min: 0, max: 7, unit: "days" },
      { key: "q6", label: "What type of movement do you actually enjoy (not just tolerate)?", type: "text" },
      { key: "q7", label: "How many glasses of water do you drink per day?", type: "scale", min: 0, max: 16 },
      { key: "q8", label: "How often do you eat fast food or takeout?", type: "multiselect", options: ["Daily","4–6x per week","2–3x per week","Weekly","Rarely"] },
      { key: "q9", label: "How often do you cook at home?", type: "multiselect", options: ["Daily","Most days","A few times a week","Rarely","Never"] },
      { key: "q10", label: "Do you follow any dietary approach or have dietary restrictions?", type: "text" },
      { key: "q11", label: "On a scale of 1–10, how much does food serve as emotional regulation for you?", type: "scale", min: 1, max: 10 },
      { key: "q12", label: "Do you have any chronic pain, illness, or diagnosed physical condition?", type: "yesno" },
      { key: "q13", label: "If yes — describe it and how long you've been managing it:", type: "text" },
      { key: "q14", label: "When did you last have a full physical/bloodwork done?", type: "multiselect", options: ["Within the last year","1–2 years ago","3–5 years ago","More than 5 years ago","Never as an adult"] },
      { key: "q15", label: "How is your energy throughout the day — steady, crashed mid-day, dependent on caffeine?", type: "text" },
      { key: "q16", label: "How much caffeine do you consume daily?", type: "multiselect", options: ["None","1 cup","2–3 cups","4+ cups","Energy drinks"] },
      { key: "q17", label: "How often do you sit for more than 4 consecutive hours without moving?", type: "multiselect", options: ["Rarely","A few times a week","Daily","Almost every day"] },
      { key: "q18", label: "Do you experience regular headaches, tension, or jaw clenching?", type: "yesno" },
      { key: "q19", label: "How connected do you feel to your body — can you sense when it's stressed before your mind knows?", type: "scale", min: 1, max: 10 },
      { key: "q20", label: "What physical habit, if eliminated or added, would most immediately improve your quality of life?", type: "text" },
      { key: "q21", label: "Have you ever worked with a personal trainer, nutritionist, or physical therapist?", type: "yesno" },
      { key: "q22", label: "How does your body feel when you are in your best physical state? Describe it.", type: "text" },
      { key: "q23", label: "Do you use any supplements, medications, or physical health aids?", type: "text" },
      { key: "q24", label: "On a scale of 1–10, how much respect do you currently show your body through your daily choices?", type: "scale", min: 1, max: 10 },
      { key: "q25", label: "What physical goal — if achieved in 90 days — would make you feel the most proud?", type: "text" },
      { key: "q26", label: "Have you ever had a significant period where you were in excellent physical health? What made it possible?", type: "text" },
      { key: "q27", label: "What stops you from being in that state right now?", type: "text" },
    ],
  },
  {
    id: "ledger", number: 4, label: "The Ledger", emoji: "🟢",
    color: "#a5d6a7", bg: "#051209", accent: "#43a047",
    description: "Financial & Business Reality — 53 Bank integration, accountant routing, legal entity tracking.",
    unlockXP: 120, estimatedMinutes: 15,
    secondNature: "Log into your bank account right now. Look at last month's transactions for exactly 3 minutes. Write one number down. Close it.",
    questions: [
      { key: "q1", label: "What is your current credit score range?", type: "multiselect", options: ["Below 580 (Poor)","580–669 (Fair)","670–739 (Good)","740–799 (Very Good)","800+ (Exceptional)","I don't know my score"] },
      { key: "q2", label: "What is the exact legal status of your business?", type: "multiselect", options: ["No business entity yet","Sole proprietor (informal)","LLC filed","LLC + EIN acquired","S-Corp/C-Corp","Partnership","Nonprofit"] },
      { key: "q3", label: "What is one financial 'leak' you already know exists but haven't plugged?", type: "text" },
      { key: "q4", label: "What is your approximate monthly take-home income?", type: "text" },
      { key: "q5", label: "What are your fixed monthly expenses (rent, car, subscriptions)?", type: "text" },
      { key: "q6", label: "Do you have a written budget?", type: "yesno" },
      { key: "q7", label: "If yes — do you actually follow it? Rate adherence 1–10:", type: "scale", min: 1, max: 10 },
      { key: "q8", label: "Do you have an emergency fund?", type: "yesno" },
      { key: "q9", label: "If yes — how many months of expenses could it cover?", type: "multiselect", options: ["Less than 1 month","1–2 months","3–6 months","6–12 months","More than 12 months"] },
      { key: "q10", label: "Do you have any outstanding debt beyond a mortgage?", type: "yesno" },
      { key: "q11", label: "If yes — roughly what is the total amount owed?", type: "multiselect", options: ["Under $5,000","$5,000–$15,000","$15,000–$50,000","$50,000–$100,000","Over $100,000"] },
      { key: "q12", label: "What types of debt do you carry?", type: "multiselect", options: ["Credit cards","Student loans","Car note","Medical debt","Personal loans","Business debt","Tax debt","Back rent"] },
      { key: "q13", label: "Do you pay your bills on time consistently?", type: "multiselect", options: ["Always","Usually","Sometimes","Rarely","I avoid opening bills"] },
      { key: "q14", label: "Do you have any retirement or investment accounts?", type: "yesno" },
      { key: "q15", label: "How comfortable are you talking about money with people close to you?", type: "scale", min: 1, max: 10 },
      { key: "q16", label: "What is your emotional relationship with money — does it feel scarce, shameful, powerful, neutral?", type: "text" },
      { key: "q17", label: "What money belief did you grow up with that still runs your behavior?", type: "text" },
      { key: "q18", label: "Have you ever filed taxes on time without an extension?", type: "yesno" },
      { key: "q19", label: "Do you use any financial tracking tool?", type: "text" },
      { key: "q20", label: "On a scale of 1–10, how much does financial stress affect your quality of life?", type: "scale", min: 1, max: 10 },
      { key: "q21", label: "What is your primary income source right now?", type: "multiselect", options: ["9-to-5 employment","Freelance/gig work","Business owner","Multiple income streams","Passive income","Dependent on others","Unemployed currently"] },
      { key: "q22", label: "What is the one financial move — if made in the next 90 days — that would have the biggest impact?", type: "text" },
      { key: "q23", label: "Have you ever worked with a financial advisor or accountant?", type: "yesno" },
      { key: "q24", label: "What is your 5-year financial target? Be specific.", type: "text" },
      { key: "q25", label: "Where does financial shame live in your story?", type: "text" },
      { key: "q26", label: "Do you currently have business insurance, liability coverage, or a business bank account?", type: "text" },
      { key: "q27", label: "Rate your overall financial discipline right now:", type: "scale", min: 1, max: 10 },
    ],
  },
  {
    id: "academy", number: 5, label: "The Academy", emoji: "⚪",
    color: "#e0e0e0", bg: "#0f0f0f", accent: "#9e9e9e",
    description: "Educational Skill Tree — Final Fantasy-style progression: Bachelors → Masters → PhD of the Self.",
    unlockXP: 150, estimatedMinutes: 16,
    secondNature: "Choose ONE course from your Bachelors tier. Block 20 minutes this week. Say the day and time out loud to yourself right now.",
    levels: { bachelors: ["Emotional Regulation 101","Financial Literacy 101","Body Literacy","Communication Fundamentals","Boundaries & Self-Respect"], masters: ["Advanced Negotiation","Business Formation","Trauma-Informed Relationships","Systems Thinking","Leadership & Influence"], phd: ["Legacy Architecture","Wealth Transfer","Community Leadership","Embodied Mastery","Teaching What You Know"] },
    questions: [
      { key: "q1", label: "Look at your 5-year goal: What is the #1 technical or life skill you are currently missing?", type: "text" },
      { key: "q2", label: "How do you process new information best?", type: "multiselect", options: ["Audio/podcasts","Video/visual","Reading text","Hands-on doing","Teaching others","Discussion/conversation"] },
      { key: "q3", label: "What subject, if mastered in 90 days, would make the most other problems solve themselves?", type: "text" },
      { key: "q4", label: "What was the last thing you learned that genuinely changed how you operate?", type: "text" },
      { key: "q5", label: "How long ago was that?", type: "multiselect", options: ["Within the last month","1–6 months ago","6–12 months ago","1–3 years ago","More than 3 years ago"] },
      { key: "q6", label: "How many books have you finished in the last 12 months?", type: "multiselect", options: ["0","1–2","3–5","6–10","More than 10"] },
      { key: "q7", label: "Do you have any professional certifications, licenses, or credentials?", type: "text" },
      { key: "q8", label: "What professional or academic credential would most change your options in life right now?", type: "text" },
      { key: "q9", label: "What subject did you love learning about as a child that you've abandoned as an adult?", type: "text" },
      { key: "q10", label: "What skill do the people you most admire have that you currently lack?", type: "text" },
      { key: "q11", label: "Rate your current emotional intelligence:", type: "scale", min: 1, max: 10 },
      { key: "q12", label: "Rate your communication skills in high-stakes or conflict situations:", type: "scale", min: 1, max: 10 },
      { key: "q13", label: "Rate your financial literacy:", type: "scale", min: 1, max: 10 },
      { key: "q14", label: "Rate your digital/technology literacy for your field:", type: "scale", min: 1, max: 10 },
      { key: "q15", label: "Rate your public speaking or presentation ability:", type: "scale", min: 1, max: 10 },
      { key: "q16", label: "Have you ever dropped out of a course, certification, or degree program midway?", type: "yesno" },
      { key: "q17", label: "If yes — what stopped you? Be honest.", type: "text" },
      { key: "q18", label: "How long can you maintain focused learning before your mind drifts?", type: "multiselect", options: ["Less than 10 minutes","10–20 minutes","20–45 minutes","45–90 minutes","2+ hours"] },
      { key: "q19", label: "What time of day are you sharpest mentally?", type: "multiselect", options: ["Early morning (5–8am)","Morning (8–11am)","Midday","Afternoon","Evening","Late night"] },
      { key: "q20", label: "Do you learn better alone or with others?", type: "multiselect", options: ["Alone","With a partner","In a small group","In a class/cohort","Depends"] },
      { key: "q21", label: "What belief do you hold about your own intelligence that may be limiting you?", type: "text" },
      { key: "q22", label: "What would the PhD version of you be teaching to others?", type: "text" },
      { key: "q23", label: "What is one course or skill you've been saying you'd 'get to eventually' for more than 2 years?", type: "text" },
      { key: "q24", label: "If you had 1 focused hour every day for 90 days — what would you study and why?", type: "text" },
      { key: "q25", label: "Are you currently enrolled in any educational program?", type: "yesno" },
      { key: "q26", label: "What mentor or teacher has had the single greatest impact on your growth?", type: "text" },
      { key: "q27", label: "What did they see in you that you struggle to see in yourself?", type: "text" },
      { key: "q28", label: "Which Bachelors tier course do you want to start with?", type: "multiselect", options: ["Emotional Regulation 101","Financial Literacy 101","Body Literacy","Communication Fundamentals","Boundaries & Self-Respect"] },
    ],
  },
  {
    id: "bridge", number: 6, label: "The Bridge", emoji: "🟤",
    color: "#bcaaa4", bg: "#1a0e0a", accent: "#8d6e63",
    description: "Specialists & The Dirt — Telehealth portal linking to Counselors, Doctors, Accountants who see your data.",
    unlockXP: 130, estimatedMinutes: 14,
    secondNature: "Look up one specialist relevant to your most honest answer above. Find their contact info. Save it. Don't call yet — just close the distance.",
    questions: [
      { key: "q1", label: "What is the 'rot' or avoidance behavior currently holding you back from execution?", type: "text" },
      { key: "q2", label: "What specific expertise do you completely lack that you need a Master to handle for you?", type: "multiselect", options: ["Therapist/counselor","Psychiatrist/medication","Primary care doctor","Accountant/CPA","Business attorney","Financial advisor","Nutritionist","Personal trainer","Life coach","Specialist not listed"] },
      { key: "q3", label: "Do you currently have a primary care doctor?", type: "yesno" },
      { key: "q4", label: "When was your last doctor's visit?", type: "multiselect", options: ["Within 6 months","6–12 months ago","1–2 years ago","2–5 years ago","More than 5 years ago","I avoid doctors"] },
      { key: "q5", label: "Have you ever been in therapy or counseling?", type: "yesno" },
      { key: "q6", label: "If yes — for how long and what type? If no — what has stopped you?", type: "text" },
      { key: "q7", label: "Have you ever been diagnosed with a mental health condition?", type: "text" },
      { key: "q8", label: "Are you currently taking any psychiatric or mood-related medications?", type: "yesno" },
      { key: "q9", label: "Have you ever been evaluated for a focus or attention condition?", type: "yesno" },
      { key: "q10", label: "On a scale of 1–10, how much do difficulty with focus, follow-through, forgetfulness, and distraction affect your daily functioning?", type: "scale", min: 1, max: 10 },
      { key: "q11", label: "Do you have any unresolved legal issues?", type: "yesno" },
      { key: "q12", label: "If yes — what type?", type: "multiselect", options: ["Traffic/minor violations","Civil lawsuit","Family court/custody","Business dispute","Criminal matter","Immigration matter"] },
      { key: "q13", label: "Do you have a will, power of attorney, or any estate planning in place?", type: "yesno" },
      { key: "q14", label: "Is there a physical health issue you've been ignoring that needs professional attention?", type: "yesno" },
      { key: "q15", label: "What physical symptom have you been avoiding getting checked?", type: "text" },
      { key: "q16", label: "What is your biggest resistance to seeking professional help?", type: "multiselect", options: ["Cost","Pride/stigma","Don't know where to start","Fear of what they'll find","Bad past experience","Trust issues","Time"] },
      { key: "q17", label: "Do you have health insurance?", type: "yesno" },
      { key: "q18", label: "Have you ever had a substance use problem — past or present?", type: "yesno" },
      { key: "q19", label: "Is there something in your history you've never told a professional that you suspect is affecting you now?", type: "yesno" },
      { key: "q20", label: "Rate how much shame prevents you from seeking the help you know you need:", type: "scale", min: 1, max: 10 },
      { key: "q21", label: "What would you need to believe to feel safe enough to see the right specialist?", type: "text" },
      { key: "q22", label: "Have you ever had a crisis that went untreated for too long?", type: "yesno" },
      { key: "q23", label: "If yes — what was the long-term cost of waiting?", type: "text" },
      { key: "q24", label: "Who is the one specialist you already know you need to contact but haven't? What's the real reason?", type: "text" },
      { key: "q25", label: "Would you be comfortable with a specialist in this system having read-only access to your intake data?", type: "yesno" },
      { key: "q26", label: "What does 'getting help' mean to you emotionally?", type: "text" },
      { key: "q27", label: "What would change in your life within 6 months if you had the right professional team around you?", type: "text" },
    ],
  },
  {
    id: "vault", number: 7, label: "The Vault", emoji: "⚫",
    color: "#90a4ae", bg: "#050a0f", accent: "#455a64",
    description: "Memory & Calendar — The brain of the app. Executive function routing, memory tracking, central scheduling.",
    unlockXP: 100, estimatedMinutes: 14,
    secondNature: "Add ONE appointment to your phone calendar right now — even if it's just 'Check in with myself at 8am.' Set a reminder. Do it before you close this.",
    questions: [
      { key: "q1", label: "What system are you relying on today to remember appointments and prevent things from slipping away?", type: "text" },
      { key: "q2", label: "Where did you lose focus most frequently this week, and what was the distraction?", type: "text" },
      { key: "q3", label: "How many unread emails are currently in your inbox?", type: "multiselect", options: ["Under 10","10–50","50–200","200–1,000","1,000–10,000","Inbox zero","I've abandoned that account"] },
      { key: "q4", label: "Do you use a calendar app?", type: "yesno" },
      { key: "q5", label: "If yes — which one, and do you check it daily? If no — how do you track time commitments?", type: "text" },
      { key: "q6", label: "How often do you miss appointments, deadlines, or forget things you promised?", type: "multiselect", options: ["Rarely","A few times a month","Weekly","Multiple times a week","It's a constant problem"] },
      { key: "q7", label: "Do you rely on your phone for reminders for basic tasks?", type: "yesno" },
      { key: "q8", label: "How many browser tabs do you typically have open?", type: "multiselect", options: ["1–5","5–15","15–30","30–50","50+ (I have a problem)"] },
      { key: "q9", label: "Describe your relationship with task lists — do you make them? Follow them? Abandon them?", type: "text" },
      { key: "q10", label: "Have you ever started a productivity system and abandoned it within a month?", type: "yesno" },
      { key: "q11", label: "Rate your ability to start tasks without procrastinating:", type: "scale", min: 1, max: 10 },
      { key: "q12", label: "Rate your ability to finish tasks you've started:", type: "scale", min: 1, max: 10 },
      { key: "q13", label: "Do you experience hyperfocus — becoming completely consumed by one thing while other priorities collapse?", type: "yesno" },
      { key: "q14", label: "Do you frequently lose items (keys, phone, wallet)?", type: "multiselect", options: ["Never","Occasionally","Weekly","Daily","Multiple times a day"] },
      { key: "q15", label: "How is your working memory?", type: "scale", min: 1, max: 10, unit: "strength (10 = excellent)" },
      { key: "q16", label: "How much of your time is genuinely scheduled vs. reactive?", type: "scale", min: 0, max: 100, unit: "% scheduled" },
      { key: "q17", label: "What is your morning routine on a typical day?", type: "text" },
      { key: "q18", label: "What is your evening/wind-down routine?", type: "text" },
      { key: "q19", label: "Do you have a time of day where you are most cognitively sharp?", type: "multiselect", options: ["Early morning","Morning","Midday","Afternoon","Evening","Late night","Inconsistent"] },
      { key: "q20", label: "How many projects are you actively working on right now across all areas of your life?", type: "number" },
      { key: "q21", label: "Do you find it hard to prioritize — does everything feel equally urgent?", type: "yesno" },
      { key: "q22", label: "How often does context-switching derail your productivity?", type: "multiselect", options: ["Rarely","Sometimes","Often","Almost constantly"] },
      { key: "q23", label: "Rate your ability to say no to things that don't serve your top priorities:", type: "scale", min: 1, max: 10 },
      { key: "q24", label: "Have you ever been late or unprepared for something truly important because of disorganization?", type: "yesno" },
      { key: "q25", label: "What would 'organized' look like in your life — specifically?", type: "text" },
      { key: "q26", label: "How much time do you estimate you lose per week to disorganization?", type: "multiselect", options: ["Less than 1 hour","1–3 hours","3–6 hours","6–10 hours","More than 10 hours"] },
      { key: "q27", label: "What single organizational tool or habit, if implemented today, would have the biggest impact?", type: "text" },
    ],
  },
  {
    id: "tribe", number: 8, label: "The Tribe", emoji: "🌸",
    color: "#f48fb1", bg: "#1a0510", accent: "#e91e63",
    description: "Community Integration — Verified support network. Turning healing into Second Nature real-world interactions.",
    unlockXP: 100, estimatedMinutes: 15,
    secondNature: "Text one person from your answer above right now. No agenda — just say you're thinking of them. Put the phone down after.",
    questions: [
      { key: "q1", label: "Who is in your immediate physical network right now that actually supports your goals?", type: "text" },
      { key: "q2", label: "What non-screen activity brings you genuine 'spring' — alive, restored, not just distracted?", type: "text" },
      { key: "q3", label: "How many people can you call right now if you were in a genuine crisis?", type: "scale", min: 0, max: 20 },
      { key: "q4", label: "How many people would call YOU if they were in genuine crisis?", type: "scale", min: 0, max: 20 },
      { key: "q5", label: "Are the people around you growing — or are they static?", type: "multiselect", options: ["Mostly growing","Mostly static","Mix of both","I've outgrown most of my circle","I'm isolated"] },
      { key: "q6", label: "Is there someone in your life who actively undermines your goals or energy?", type: "yesno" },
      { key: "q7", label: "If yes — who and how? (Type, not name)", type: "text" },
      { key: "q8", label: "Do you find it easier to give support to others than to receive it?", type: "yesno" },
      { key: "q9", label: "What is your attachment style in close relationships?", type: "multiselect", options: ["Secure","Anxious/preoccupied","Avoidant/dismissive","Fearful/disorganized","I don't know"] },
      { key: "q10", label: "How comfortable are you being truly vulnerable with someone you trust?", type: "scale", min: 1, max: 10 },
      { key: "q11", label: "How often do you spend quality time with people you care about?", type: "multiselect", options: ["Daily","A few times a week","Weekly","Monthly","Rarely","I'm socially isolated"] },
      { key: "q12", label: "Do you have any community outside of family and work?", type: "yesno" },
      { key: "q13", label: "What kind of community have you always wanted but never found?", type: "text" },
      { key: "q14", label: "How many of your friendships are primarily digital vs. physically present?", type: "scale", min: 0, max: 100, unit: "% primarily digital" },
      { key: "q15", label: "Have you ever lost a friendship because you grew and they didn't — or vice versa?", type: "yesno" },
      { key: "q16", label: "Rate your ability to set limits in relationships:", type: "scale", min: 1, max: 10 },
      { key: "q17", label: "Do you tend to over-extend for others at the expense of your own goals?", type: "yesno" },
      { key: "q18", label: "What does belonging mean to you — describe the feeling you're looking for in community?", type: "text" },
      { key: "q19", label: "Is there a relationship in your life right now that needs to end?", type: "yesno" },
      { key: "q20", label: "Is there a relationship in your life right now that needs repairing?", type: "yesno" },
      { key: "q21", label: "How do you typically handle conflict in relationships?", type: "multiselect", options: ["Confront it directly","Avoid it","Shut down emotionally","Explode and then apologize","Talk it out calmly","Leave the relationship"] },
      { key: "q22", label: "Do you feel genuinely known and seen by at least one person in your life?", type: "yesno" },
      { key: "q23", label: "What kind of people do you want more of in your life?", type: "text" },
      { key: "q24", label: "Are you currently in a romantic relationship?", type: "yesno" },
      { key: "q25", label: "If yes — does that relationship support your growth? Rate it:", type: "scale", min: 1, max: 10 },
      { key: "q26", label: "What is the most significant way loneliness or disconnection has affected your life?", type: "text" },
      { key: "q27", label: "Who is the one person whose belief in you changed something in you? What did they see?", type: "text" },
      { key: "q28", label: "What is the single most important quality you bring to a community or group?", type: "text" },
    ],
  },
];

const QUESTIONS_PER_PAGE = 5;
const getPages = (qs) => {
  const pages = [];
  for (let i = 0; i < qs.length; i += QUESTIONS_PER_PAGE) pages.push(qs.slice(i, i + QUESTIONS_PER_PAGE));
  return pages;
};

// ─── ONBOARDING STEPS ───────────────────────────────────────────────────────
const ONBOARDING_STEPS = [
  {
    id: "welcome",
    title: "Welcome to ONE TRIBE",
    subtitle: "I Am That I Am",
    body: "This is not a wellness app. This is not a productivity tool.\n\nONE TRIBE is a full-stack truth mirror — a system built to bypass self-deception, map every dimension of who you are, and hold you accountable to the person you are becoming.\n\nYou start as a silhouette. You finish as yourself.",
    cta: "I'm Ready →",
  },
  {
    id: "how_it_works",
    title: "How It Works",
    steps: [
      { icon: "🌱", label: "Start with The Seed", desc: "Your zero point. Answer honestly — this establishes your true baseline." },
      { icon: "◈", label: "Elect Each Node", desc: "Nine domains of your life. You choose when to begin each one. No skipping — every domain matters." },
      { icon: "⏱", label: "Work at Your Own Pace", desc: "Each section is timed. You can pause, return, and resume. The system tracks your total time invested." },
      { icon: "📝", label: "Take Notes as You Go", desc: "Questions may surface things you want to remember or ask. Your notes panel is always available." },
      { icon: "✦", label: "Unlock Your Future Self", desc: "Complete all 9 nodes and your avatar transforms — the silhouette becomes you." },
    ],
    cta: "Understood →",
  },
  {
    id: "commitment",
    title: "One Commitment",
    body: "This system only works if you are honest.\n\nNot polished. Not performing. Not the version of you that looks good in a mirror.\n\nThe real one. The one who knows what needs to change.\n\nMake that commitment now — to yourself, not to us.",
    cta: "I Commit. Let's Begin.",
  },
];

// ─── INITIAL STATE ───────────────────────────────────────────────────────────
const buildInitialState = () => ({
  meta: { buildVersion: BUILD.version, buildTimestamp: BUILD.timestamp, sessionCreated: new Date().toISOString() },
  user: { name: "", level: "Bachelors", xp: 0, avatarPhase: "silhouette", completedNodes: [], seedData: null },
  nodes: Object.fromEntries(NODE_CONFIG.map((n, i) => [n.id, {
    id: n.id,
    status: i === 0 ? "available" : "locked",
    answers: {},
    pageProgress: 0,
    completedAt: null,
    elapsedSeconds: 0,
    sessionStarted: null,
    notes: "",
  }])),
  puzzle: { pieces: 0, total: NODE_CONFIG.length },
  activeView: "hub",
  activeNode: null,
  onboardingStep: 0,
  onboardingComplete: false,
  theme: "dark",
  notesOpen: false,
  activeNoteNode: null,
});

function reducer(state, action) {
  switch (action.type) {
    case "NEXT_ONBOARDING": {
      const next = state.onboardingStep + 1;
      if (next >= ONBOARDING_STEPS.length) return { ...state, onboardingComplete: true };
      return { ...state, onboardingStep: next };
    }
    case "SET_NAME":
      return { ...state, user: { ...state.user, name: action.name } };
    case "SET_THEME":
      return { ...state, theme: action.theme };
    case "SAVE_PROGRESS": {
      const nodes = { ...state.nodes };
      nodes[action.nodeId] = { ...nodes[action.nodeId], answers: { ...nodes[action.nodeId].answers, ...action.answers }, pageProgress: action.page };
      return { ...state, nodes };
    }
    case "TICK_TIMER": {
      const nodes = { ...state.nodes };
      if (nodes[action.nodeId]?.sessionStarted) {
        nodes[action.nodeId] = { ...nodes[action.nodeId], elapsedSeconds: (nodes[action.nodeId].elapsedSeconds || 0) + 1 };
      }
      return { ...state, nodes };
    }
    case "START_SESSION": {
      const nodes = { ...state.nodes };
      nodes[action.nodeId] = { ...nodes[action.nodeId], sessionStarted: Date.now() };
      return { ...state, nodes };
    }
    case "PAUSE_SESSION": {
      const nodes = { ...state.nodes };
      nodes[action.nodeId] = { ...nodes[action.nodeId], sessionStarted: null };
      return { ...state, nodes };
    }
    case "COMPLETE_NODE": {
      const nodes = { ...state.nodes };
      nodes[action.nodeId] = { ...nodes[action.nodeId], status: "complete", answers: action.answers, completedAt: new Date().toISOString(), sessionStarted: null };
      const order = NODE_CONFIG.map(n => n.id);
      const idx = order.indexOf(action.nodeId);
      if (idx < order.length - 1) nodes[order[idx + 1]].status = "available";
      const completedCount = Object.values(nodes).filter(n => n.status === "complete").length;
      const xp = state.user.xp + (NODE_CONFIG.find(n => n.id === action.nodeId)?.unlockXP || 100);
      const level = xp >= 900 ? "PhD" : xp >= 500 ? "Masters" : "Bachelors";
      const avatarPhase = completedCount >= 9 ? "revealed" : completedCount >= 5 ? "emerging" : "silhouette";
      return {
        ...state, nodes,
        user: { ...state.user, xp, level, avatarPhase, completedNodes: [...state.user.completedNodes, action.nodeId] },
        puzzle: { ...state.puzzle, pieces: completedCount },
        activeNode: null,
      };
    }
    case "SAVE_NOTE": {
      const nodes = { ...state.nodes };
      nodes[action.nodeId] = { ...nodes[action.nodeId], notes: action.text };
      return { ...state, nodes };
    }
    case "OPEN_NODE": return { ...state, activeNode: action.nodeId };
    case "CLOSE_NODE": return { ...state, activeNode: null };
    case "SET_VIEW": return { ...state, activeView: action.view };
    case "TOGGLE_NOTES": return { ...state, notesOpen: !state.notesOpen, activeNoteNode: action.nodeId || state.activeNoteNode };
    default: return state;
  }
}

// ─── TIMER UTILS ────────────────────────────────────────────────────────────
function formatTime(secs) {
  const m = Math.floor(secs / 60), s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── QUESTION INPUT ──────────────────────────────────────────────────────────
function QuestionInput({ q, value, onChange, accent, theme }) {
  const T = THEMES[theme];
  const base = {
    width: "100%", padding: "10px 14px",
    background: T.inputBg,
    border: `1px solid ${value !== undefined && value !== "" ? accent + "66" : T.border}`,
    borderRadius: 10, color: T.text, fontSize: 13, outline: "none",
    marginTop: 8, boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6,
    transition: "border-color 0.2s",
  };
  if (q.type === "scale") {
    const min = q.min ?? 1, max = q.max ?? 10;
    const cur = value !== undefined && value !== "" ? Number(value) : null;
    const items = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const show = items.length <= 16 ? items : items.filter((_, i) => i % Math.ceil(items.length / 15) === 0 || items[i] === min || items[i] === max);
    return (
      <div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
          {show.map(n => (
            <button key={n} onClick={() => onChange(n)} style={{
              width: 34, height: 34, borderRadius: 8, border: `1px solid ${cur === n ? accent : T.border}`,
              background: cur === n ? accent : T.inputBg,
              color: cur === n ? "#000" : T.textMid, cursor: "pointer", fontSize: 11,
              fontWeight: cur === n ? 800 : 400, transition: "all 0.15s",
            }}>{n}</button>
          ))}
        </div>
        {q.unit && <div style={{ fontSize: 10, color: T.textDim, marginTop: 4 }}>{q.unit}</div>}
      </div>
    );
  }
  if (q.type === "yesno") {
    return (
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        {["Yes", "No"].map(opt => (
          <button key={opt} onClick={() => onChange(opt)} style={{
            padding: "9px 28px", borderRadius: 8,
            border: `1px solid ${value === opt ? accent : T.border}`,
            background: value === opt ? accent : T.inputBg,
            color: value === opt ? "#000" : T.textMid,
            cursor: "pointer", fontWeight: value === opt ? 800 : 400, fontSize: 13,
            transition: "all 0.15s",
          }}>{opt}</button>
        ))}
      </div>
    );
  }
  if (q.type === "multiselect") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
        {q.options.map(opt => (
          <button key={opt} onClick={() => onChange(opt)} style={{
            padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12,
            border: `1px solid ${value === opt ? accent : T.border}`,
            background: value === opt ? `${accent}22` : "transparent",
            color: value === opt ? T.text : T.textMid, transition: "all 0.15s",
          }}>{opt}</button>
        ))}
      </div>
    );
  }
  if (q.type === "number") {
    return <input type="number" value={value || ""} onChange={e => onChange(e.target.value)} style={{ ...base, marginTop: 8 }} />;
  }
  return <textarea value={value || ""} onChange={e => onChange(e.target.value)} rows={3} style={{ ...base, resize: "vertical" }} />;
}

// ─── AVATAR ──────────────────────────────────────────────────────────────────
function AvatarCore({ lightPercent, phase }) {
  const gold = phase === "revealed";
  const particles = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div style={{ position: "relative", width: 160, height: 210, margin: "0 auto" }}>
      <div style={{ position: "absolute", inset: -12, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${gold ? "255,215,0" : "79,195,247"},${0.05 + lightPercent / 900}) 0%, transparent 70%)`, animation: "otPulse 3s ease-in-out infinite" }} />
      <svg width="140" height="200" viewBox="0 0 140 200" style={{ position: "absolute", left: 10, top: 5 }}>
        <defs>
          <radialGradient id="avGrad" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor={gold ? "#ffd700" : "#4fc3f7"} stopOpacity={0.9} />
            <stop offset="100%" stopColor={gold ? "#ff8c00" : "#0d47a1"} stopOpacity={0.2} />
          </radialGradient>
          <filter id="avGlow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <ellipse cx="70" cy="38" rx="28" ry="32" fill="url(#avGrad)" filter="url(#avGlow)" opacity={0.45 + lightPercent / 220} />
        <path d="M40 78 Q35 130 30 185 L110 185 Q105 130 100 78 Q85 64 70 64 Q55 64 40 78Z" fill="url(#avGrad)" filter="url(#avGlow)" opacity={0.4 + lightPercent / 260} />
        <path d="M40 84 Q14 112 10 145" stroke="url(#avGrad)" strokeWidth="13" fill="none" strokeLinecap="round" opacity={0.35 + lightPercent / 300} />
        <path d="M100 84 Q126 112 130 145" stroke="url(#avGrad)" strokeWidth="13" fill="none" strokeLinecap="round" opacity={0.35 + lightPercent / 300} />
      </svg>
      {particles.map(i => {
        const angle = (i / particles.length) * 360;
        const r = 56 + Math.sin(i * 0.9) * 20;
        const x = 80 + r * Math.cos(angle * Math.PI / 180);
        const y = 105 + r * 0.55 * Math.sin(angle * Math.PI / 180);
        return (i / particles.length) * 100 < lightPercent ? (
          <div key={i} style={{
            position: "absolute", left: x, top: y,
            width: 2 + (i % 3), height: 2 + (i % 3), borderRadius: "50%",
            background: gold ? "#ffd700" : "#4fc3f7",
            opacity: 0.35 + (i % 5) * 0.12,
            animation: `otFloat ${2 + i % 3}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
            boxShadow: `0 0 5px ${gold ? "#ffd700" : "#4fc3f7"}`,
          }} />
        ) : null;
      })}
      <div style={{ position: "absolute", bottom: -26, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: gold ? "#ffd700" : "#4fc3f7", letterSpacing: 2, fontFamily: "monospace", whiteSpace: "nowrap" }}>
        {lightPercent}% ILLUMINATED
      </div>
    </div>
  );
}

// ─── NOTES PANEL ─────────────────────────────────────────────────────────────
function NotesPanel({ appState, dispatch, theme }) {
  const T = THEMES[theme];
  const nodeId = appState.activeNoteNode || NODE_CONFIG[0].id;
  const cfg = NODE_CONFIG.find(n => n.id === nodeId);
  const text = appState.nodes[nodeId]?.notes || "";
  const [draft, setDraft] = useState(text);

  useEffect(() => { setDraft(appState.nodes[nodeId]?.notes || ""); }, [nodeId, appState.nodes]);

  const lineHeight = 28;
  const lineCount = 40;

  const legalPadStyle = T.notesPaper ? {
    backgroundImage: `
      repeating-linear-gradient(
        transparent,
        transparent ${lineHeight - 1}px,
        ${T.notesLines} ${lineHeight - 1}px,
        ${T.notesLines} ${lineHeight}px
      ),
      linear-gradient(to right, transparent 48px, ${T.notesMargin} 48px, ${T.notesMargin} 50px, transparent 50px)
    `,
    backgroundSize: `100% ${lineHeight}px, 100% 100%`,
    paddingLeft: 60,
    lineHeight: `${lineHeight}px`,
    fontFamily: theme === "legal" ? "'Georgia', serif" : "inherit",
  } : {
    backgroundImage: `repeating-linear-gradient(transparent, transparent ${lineHeight - 1}px, ${T.notesLines} ${lineHeight - 1}px, ${T.notesLines} ${lineHeight}px)`,
    backgroundSize: `100% ${lineHeight}px`,
    lineHeight: `${lineHeight}px`,
  };

  return (
    <div style={{
      position: "fixed", right: 0, top: 0, bottom: 0, width: 320,
      background: T.notesBg, borderLeft: `1px solid ${T.border}`,
      zIndex: 200, display: "flex", flexDirection: "column",
      boxShadow: `-8px 0 40px rgba(0,0,0,0.2)`,
      animation: "otSlideRight 0.3s ease",
    }}>
      {/* Header */}
      <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: T.text, letterSpacing: 1 }}>MY NOTES</div>
          <div style={{ fontSize: 10, color: T.textDim, marginTop: 2 }}>Questions, thoughts, reflections</div>
        </div>
        <button onClick={() => dispatch({ type: "TOGGLE_NOTES" })} style={{ background: "none", border: "none", color: T.textMid, cursor: "pointer", fontSize: 18, padding: 4 }}>✕</button>
      </div>

      {/* Node selector */}
      <div style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {NODE_CONFIG.map(n => (
          <button key={n.id} onClick={() => dispatch({ type: "TOGGLE_NOTES", nodeId: n.id })} style={{
            padding: "4px 8px", borderRadius: 6, border: `1px solid ${nodeId === n.id ? n.accent : T.border}`,
            background: nodeId === n.id ? `${n.accent}22` : "transparent",
            color: appState.nodes[n.id]?.notes ? n.accent : T.textDim,
            cursor: "pointer", fontSize: 10, fontWeight: nodeId === n.id ? 700 : 400,
            position: "relative",
          }}>
            {n.emoji}
            {appState.nodes[n.id]?.notes && <span style={{ position: "absolute", top: -2, right: -2, width: 5, height: 5, borderRadius: "50%", background: n.accent }} />}
          </button>
        ))}
      </div>

      {/* Current node label */}
      <div style={{ padding: "8px 16px", background: `${cfg.accent}12`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 700 }}>{cfg.emoji} {cfg.label}</div>
        <div style={{ fontSize: 10, color: T.textDim, marginTop: 2 }}>Write questions or thoughts as you go</div>
      </div>

      {/* Textarea */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <textarea
          value={draft}
          onChange={e => {
            setDraft(e.target.value);
            dispatch({ type: "SAVE_NOTE", nodeId, text: e.target.value });
          }}
          placeholder="What questions came up? What do you want to remember? What do you need to ask?"
          style={{
            width: "100%", height: "100%",
            background: T.notesBg,
            border: "none", outline: "none",
            color: T.notesText,
            fontSize: 13, padding: "14px 14px",
            resize: "none", boxSizing: "border-box",
            ...legalPadStyle,
          }}
        />
      </div>

      {/* Footer with char count */}
      <div style={{ padding: "8px 14px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: T.textDim }}>{draft.length} chars</div>
        <div style={{ fontSize: 10, color: T.textDim }}>{theme === "legal" ? "📋 Legal Pad" : theme === "light" ? "○ Light" : "◐ Dark"}</div>
      </div>
    </div>
  );
}

// ─── NODE MODAL ───────────────────────────────────────────────────────────────
function NodeModal({ nodeId, appState, dispatch, theme, onClose }) {
  const cfg = NODE_CONFIG.find(n => n.id === nodeId);
  const nodeState = appState.nodes[nodeId];
  const T = THEMES[theme];
  const isComplete = nodeState.status === "complete";
  const pages = getPages(cfg.questions);
  const totalPages = pages.length;

  const [localAnswers, setLocalAnswers] = useState(nodeState.answers || {});
  const [currentPage, setCurrentPage] = useState(isComplete ? 999 : Math.min(nodeState.pageProgress || 0, totalPages - 1));
  const [phase, setPhase] = useState(isComplete ? "complete" : "intake");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (!isComplete && phase === "intake") {
      dispatch({ type: "START_SESSION", nodeId });
      timerRef.current = setInterval(() => dispatch({ type: "TICK_TIMER", nodeId }), 1000);
    }
    return () => {
      clearInterval(timerRef.current);
      dispatch({ type: "PAUSE_SESSION", nodeId });
    };
  }, [nodeId, isComplete, phase]);

  const currentQs = phase === "intake" && currentPage < totalPages ? pages[currentPage] : [];
  const answeredThisPage = currentQs.every(q => localAnswers[q.key] !== undefined && localAnswers[q.key] !== "");

  function saveAndNext() {
    dispatch({ type: "SAVE_PROGRESS", nodeId, answers: localAnswers, page: currentPage + 1 });
    if (currentPage < totalPages - 1) { setCurrentPage(p => p + 1); }
    else { submitAll(); }
  }

  async function submitAll() {
    setPhase("ai"); setAiLoading(true);
    try {
      const sample = cfg.questions.slice(0, 8).map(q => `Q: ${q.label}\nA: ${localAnswers[q.key] || "(skipped)"}`).join("\n\n");
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          messages: [{ role: "user", content: `You are the AI coach inside ONE TRIBE — a holistic life-coaching ecosystem built on radical self-honesty.\n\nNode completed: "${cfg.label}"\nPurpose: ${cfg.description}\n\nSample answers (first 8 of ${cfg.questions.length}):\n${sample}\n\nDeliver 4-5 sentences: name one clear pattern, identify one blind spot, be direct and warm. Close with one sentence declaring what this node unlocked. No filler. No generic affirmations. No diagnosis.` }],
        }),
      });
      const data = await res.json();
      setAiResponse(data.content?.[0]?.text || "Your truth has been recorded. The system sees you clearly now.");
    } catch { setAiResponse("Your answers have been locked in. Something significant just shifted."); }
    setAiLoading(false);
    dispatch({ type: "COMPLETE_NODE", nodeId, answers: localAnswers });
    setPhase("secondNature");
  }

  const elapsed = nodeState.elapsedSeconds || 0;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: theme === "dark" ? cfg.bg : T.modalBg,
        border: `1px solid ${cfg.accent}44`,
        borderRadius: 24, width: "100%", maxWidth: 560,
        maxHeight: "92vh", overflowY: "auto",
        padding: "26px 22px", boxShadow: `0 0 80px ${cfg.accent}1a`,
        position: "relative",
      }}>
        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 22 }}>{cfg.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: T.text, letterSpacing: 0.5 }}>{cfg.label}</div>
              <div style={{ fontSize: 9, color: cfg.accent, letterSpacing: 2 }}>NODE {cfg.number.toString().padStart(2,"0")} · {cfg.questions.length} QUESTIONS · ~{cfg.estimatedMinutes} MIN</div>
            </div>
            {/* Live timer */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: cfg.accent, fontFamily: "monospace" }}>{formatTime(elapsed)}</div>
              <div style={{ fontSize: 9, color: T.textDim, letterSpacing: 1 }}>TIME IN SESSION</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: T.textMid, lineHeight: 1.5 }}>{cfg.description}</div>
          <div style={{ fontSize: 9, color: T.textDim, fontFamily: "monospace", marginTop: 4 }}>v{BUILD.version} · {BUILD.timestamp.split("T")[0]}</div>
        </div>

        {/* Progress */}
        {phase === "intake" && !isComplete && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: T.textDim, marginBottom: 5, letterSpacing: 1 }}>
              <span>PAGE {currentPage + 1} OF {totalPages}</span>
              <span>Q {currentPage * QUESTIONS_PER_PAGE + 1}–{Math.min((currentPage + 1) * QUESTIONS_PER_PAGE, cfg.questions.length)} OF {cfg.questions.length}</span>
            </div>
            <div style={{ height: 3, background: T.border, borderRadius: 4 }}>
              <div style={{ height: "100%", borderRadius: 4, width: `${(currentPage / totalPages) * 100}%`, background: `linear-gradient(90deg, ${cfg.accent}, ${cfg.color})`, transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}

        {/* INTAKE */}
        {phase === "intake" && !isComplete && (
          <div>
            {currentQs.map((q, i) => (
              <div key={q.key} style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.55 }}>
                  <span style={{ color: cfg.accent, fontFamily: "monospace", fontSize: 10, marginRight: 6 }}>
                    {currentPage * QUESTIONS_PER_PAGE + i + 1}.
                  </span>
                  {q.label}
                </div>
                <QuestionInput q={q} value={localAnswers[q.key]} onChange={val => setLocalAnswers(p => ({ ...p, [q.key]: val }))} accent={cfg.accent} theme={theme} />
              </div>
            ))}
            {cfg.consequence && (
              <div style={{ padding: 11, background: "rgba(255,60,60,0.08)", borderRadius: 10, border: "1px solid rgba(255,60,60,0.2)", marginBottom: 14 }}>
                <div style={{ fontSize: 9, color: "#ff6b6b", letterSpacing: 1 }}>⚠ ACCOUNTABILITY NOTICE — The Mirror enforces what you define here.</div>
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              {currentPage > 0 && (
                <button onClick={() => setCurrentPage(p => p - 1)} style={{ width: 44, height: 46, background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, color: T.textMid, cursor: "pointer", fontSize: 14 }}>←</button>
              )}
              <button onClick={saveAndNext} style={{
                flex: 1, padding: "13px",
                background: answeredThisPage ? cfg.accent : T.inputBg,
                border: "none", borderRadius: 12,
                color: answeredThisPage ? "#000" : T.textDim,
                fontWeight: 800, fontSize: 11, cursor: answeredThisPage ? "pointer" : "default",
                letterSpacing: 2, textTransform: "uppercase", transition: "all 0.2s",
              }}>
                {currentPage === totalPages - 1 ? "SUBMIT & ANALYZE" : `NEXT  ·  ${totalPages - currentPage - 1} PAGES LEFT`}
              </button>
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: T.textDim }}>Your progress auto-saves each page</div>
          </div>
        )}

        {/* AI LOADING */}
        {phase === "ai" && (
          <div style={{ textAlign: "center", padding: "44px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 14, animation: "otPulse 1.2s ease-in-out infinite" }}>◈</div>
            <div style={{ fontSize: 12, color: T.textMid }}>Analyzing your {cfg.questions.length} answers…</div>
          </div>
        )}

        {/* SECOND NATURE */}
        {phase === "secondNature" && (
          <div>
            {aiResponse && (
              <div style={{ padding: 15, background: T.inputBg, borderRadius: 14, border: `1px solid ${cfg.accent}33`, marginBottom: 18 }}>
                <div style={{ fontSize: 9, color: cfg.accent, letterSpacing: 2, marginBottom: 8 }}>YOUR COACH REFLECTS:</div>
                <div style={{ fontSize: 13, color: T.text, lineHeight: 1.75 }}>{aiResponse}</div>
              </div>
            )}
            <div style={{ padding: 18, background: `${cfg.accent}10`, border: `1px solid ${cfg.accent}44`, borderRadius: 14, marginBottom: 18 }}>
              <div style={{ fontSize: 9, color: cfg.accent, letterSpacing: 2, marginBottom: 8 }}>🌱 SECOND NATURE PROMPT</div>
              <div style={{ fontSize: 14, color: T.text, lineHeight: 1.75, fontStyle: "italic" }}>"{cfg.secondNature}"</div>
            </div>
            <div style={{ fontSize: 11, color: T.textDim, marginBottom: 14, textAlign: "center" }}>Do this — in the physical world — before closing.</div>
            <button onClick={() => setPhase("complete")} style={{ width: "100%", padding: "13px", background: cfg.accent, border: "none", borderRadius: 12, color: "#000", fontWeight: 800, fontSize: 11, cursor: "pointer", letterSpacing: 2 }}>
              I DID IT — LOCK IN PUZZLE PIECE
            </button>
          </div>
        )}

        {/* COMPLETE */}
        {(phase === "complete" || isComplete) && (
          <div>
            <div style={{ textAlign: "center", padding: "20px 0 14px" }}>
              <div style={{ fontSize: 42, marginBottom: 8, filter: `drop-shadow(0 0 18px ${cfg.accent})` }}>✦</div>
              <div style={{ fontSize: 16, color: T.text, fontWeight: 800, marginBottom: 4 }}>{cfg.label} — Complete</div>
              <div style={{ fontSize: 11, color: cfg.accent, marginBottom: 2, letterSpacing: 1 }}>+{cfg.unlockXP} XP · {cfg.questions.length} Questions · {formatTime(nodeState.elapsedSeconds || 0)} total time</div>
              {nodeState.completedAt && <div style={{ fontSize: 9, color: T.textDim, fontFamily: "monospace" }}>{new Date(nodeState.completedAt).toLocaleString()}</div>}
            </div>
            <div style={{ maxHeight: 250, overflowY: "auto", marginBottom: 14 }}>
              {cfg.questions.slice(0, 8).map(q => nodeState.answers?.[q.key] && (
                <div key={q.key} style={{ marginBottom: 7, padding: "8px 11px", background: T.inputBg, borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: T.textDim, marginBottom: 2, lineHeight: 1.4 }}>{q.label}</div>
                  <div style={{ fontSize: 11, color: T.textMid }}>{String(nodeState.answers[q.key])}</div>
                </div>
              ))}
              {cfg.questions.length > 8 && <div style={{ fontSize: 10, color: T.textDim, textAlign: "center", padding: 6 }}>+{cfg.questions.length - 8} more in The Vault</div>}
            </div>
            <button onClick={onClose} style={{ width: "100%", padding: "11px", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, color: T.text, cursor: "pointer", fontSize: 11, letterSpacing: 1 }}>RETURN TO HUB</button>
          </div>
        )}

        {/* Notes shortcut */}
        <button onClick={() => dispatch({ type: "TOGGLE_NOTES", nodeId })} style={{
          position: "absolute", top: 14, right: 44,
          background: appState.nodes[nodeId]?.notes ? `${cfg.accent}22` : T.inputBg,
          border: `1px solid ${appState.nodes[nodeId]?.notes ? cfg.accent + "55" : T.border}`,
          borderRadius: 8, color: T.textMid, cursor: "pointer", padding: "5px 8px", fontSize: 13,
          title: "Open Notes",
        }}>📝</button>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, cursor: "pointer", padding: "5px 10px", fontSize: 11 }}>✕</button>
      </div>
    </div>
  );
}

// ─── NODE CARD ────────────────────────────────────────────────────────────────
function NodeCard({ nodeId, appState, dispatch, theme }) {
  const cfg = NODE_CONFIG.find(n => n.id === nodeId);
  const ns = appState.nodes[nodeId];
  const T = THEMES[theme];
  const isComplete = ns.status === "complete";
  const isLocked = ns.status === "locked";
  const inProgress = ns.pageProgress > 0 && !isComplete;
  const isActive = ns.status === "available";
  const elapsed = ns.elapsedSeconds || 0;
  const pct = inProgress ? Math.round((ns.pageProgress / getPages(cfg.questions).length) * 100) : 0;
  const hasNotes = !!(ns.notes);

  return (
    <div style={{
      background: isComplete
        ? theme === "dark" ? `linear-gradient(135deg, ${cfg.bg}, rgba(255,255,255,0.02))` : T.surface
        : theme === "dark" ? cfg.bg : T.surface,
      border: `1px solid ${isComplete ? cfg.accent + "55" : isLocked ? T.border : isActive ? cfg.accent + "44" : T.border}`,
      borderRadius: 16, padding: "15px 16px",
      cursor: isLocked ? "default" : "pointer",
      transition: "all 0.25s ease", position: "relative", overflow: "hidden",
    }}
    onClick={() => !isLocked && dispatch({ type: "OPEN_NODE", nodeId })}
    onMouseEnter={e => { if (!isLocked) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 28px ${cfg.accent}22`; }}}
    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
      {isComplete && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)` }} />}
      {inProgress && <div style={{ position: "absolute", top: 0, left: 0, width: `${pct}%`, height: 2, background: cfg.accent }} />}
      {isActive && !inProgress && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${cfg.accent}66, transparent)`, animation: "otShimmer 2s ease-in-out infinite" }} />}

      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        {/* Checkbox / status */}
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: isLocked ? T.inputBg : `${cfg.accent}18`,
          border: `2px solid ${isLocked ? T.border : isComplete ? cfg.accent : cfg.accent + "55"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: isComplete ? 16 : 18,
          transition: "all 0.3s",
        }}>
          {isLocked ? <span style={{ fontSize: 14, opacity: 0.3 }}>🔒</span> : isComplete ? "✓" : cfg.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: isLocked ? T.textDim : T.text }}>{cfg.label}</div>
            {hasNotes && <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 4, background: `${cfg.accent}22`, color: cfg.accent }}>NOTES</span>}
          </div>
          <div style={{ fontSize: 9, color: isLocked ? T.textDim : isComplete ? cfg.accent : T.textMid, letterSpacing: 1, marginTop: 1 }}>
            {isLocked ? "LOCKED — COMPLETE PRIOR NODE" : isComplete
              ? `✓ DONE · +${cfg.unlockXP} XP · ${formatTime(elapsed)}`
              : inProgress ? `IN PROGRESS · ${pct}% · ${formatTime(elapsed)}`
              : `${cfg.questions.length} QUESTIONS · ~${cfg.estimatedMinutes} MIN · ${cfg.unlockXP} XP`}
          </div>
        </div>
        {isActive && !inProgress && (
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: cfg.accent, padding: "5px 10px", border: `1px solid ${cfg.accent}55`, borderRadius: 8 }}>BEGIN</div>
        )}
        {isComplete && <div style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.accent, boxShadow: `0 0 9px ${cfg.accent}`, flexShrink: 0 }} />}
      </div>
      {!isLocked && (
        <div style={{ marginTop: 7, fontSize: 10, color: T.textDim, lineHeight: 1.5 }}>
          {cfg.description.split("—")[0].trim()}
        </div>
      )}
    </div>
  );
}

// ─── ONBOARDING ──────────────────────────────────────────────────────────────
function OnboardingScreen({ step, onNext, theme }) {
  const T = THEMES[theme];
  const s = ONBOARDING_STEPS[step];

  if (s.id === "welcome") {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 440, animation: "otSlideUp 0.8s ease" }}>
          <div style={{ fontSize: 54, marginBottom: 20, filter: "drop-shadow(0 0 24px #4fc3f7)" }}>◈</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: T.text, letterSpacing: -1, marginBottom: 6 }}>ONE TRIBE</div>
          <div style={{ fontSize: 14, color: "#4fc3f7", letterSpacing: 4, textTransform: "uppercase", marginBottom: 32 }}>I Am That I Am</div>
          <div style={{ fontSize: 14, color: T.textMid, lineHeight: 1.9, marginBottom: 32, whiteSpace: "pre-line" }}>{s.body}</div>
          <div style={{ fontSize: 10, color: T.textDim, marginBottom: 24, fontFamily: "monospace" }}>v{BUILD.version} · 9 nodes · 232 questions</div>
          <button onClick={onNext} style={{
            width: "100%", padding: "15px",
            background: "linear-gradient(135deg, #4fc3f7, #0288d1)",
            border: "none", borderRadius: 14,
            color: "#000", fontWeight: 800, fontSize: 14, cursor: "pointer", letterSpacing: 2,
            boxShadow: "0 0 40px rgba(79,195,247,0.25)",
          }}>{s.cta}</button>
        </div>
      </div>
    );
  }

  if (s.id === "how_it_works") {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", padding: 24 }}>
        <div style={{ maxWidth: 480, width: "100%", animation: "otSlideUp 0.6s ease" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: T.text, marginBottom: 6 }}>{s.title}</div>
            <div style={{ fontSize: 12, color: T.textDim, letterSpacing: 2 }}>HERE'S HOW THE JOURNEY UNFOLDS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {s.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, animation: `otSlideUp ${0.4 + i * 0.1}s ease` }}>
                <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{step.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 3 }}>{step.label}</div>
                  <div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.55 }}>{step.desc}</div>
                </div>
                <div style={{ marginLeft: "auto", flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "rgba(79,195,247,0.15)", border: "1px solid rgba(79,195,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#4fc3f7", fontWeight: 800 }}>{i + 1}</div>
              </div>
            ))}
          </div>
          <button onClick={onNext} style={{
            width: "100%", padding: "14px",
            background: "linear-gradient(135deg, #4fc3f7, #0288d1)",
            border: "none", borderRadius: 14, color: "#000",
            fontWeight: 800, fontSize: 13, cursor: "pointer", letterSpacing: 2,
          }}>{s.cta}</button>
        </div>
      </div>
    );
  }

  if (s.id === "commitment") {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 420, animation: "otSlideUp 0.7s ease" }}>
          <div style={{ fontSize: 40, marginBottom: 18 }}>◈</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 20 }}>{s.title}</div>
          <div style={{ fontSize: 14, color: T.textMid, lineHeight: 1.95, marginBottom: 32, whiteSpace: "pre-line" }}>{s.body}</div>
          <button onClick={onNext} style={{
            width: "100%", padding: "15px",
            background: "linear-gradient(135deg, #2ecc71, #0d9e55)",
            border: "none", borderRadius: 14, color: "#000",
            fontWeight: 800, fontSize: 13, cursor: "pointer", letterSpacing: 1,
            boxShadow: "0 0 30px rgba(46,204,113,0.25)",
          }}>{s.cta}</button>
        </div>
      </div>
    );
  }
  return null;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function OneTribeApp() {
  const [appState, setAppState] = useState(() => {
    try { const s = localStorage.getItem(BUILD.storageKey); if (s) return JSON.parse(s); } catch {}
    return buildInitialState();
  });

  const appDispatch = useCallback((action) => {
    setAppState(prev => {
      const next = reducer(prev, action);
      try { localStorage.setItem(BUILD.storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const theme = appState.theme || "dark";
  const T = THEMES[theme];

  const totalQsAnswered = Object.entries(appState.nodes)
    .filter(([, n]) => n.status === "complete")
    .reduce((sum, [id]) => sum + NODE_CONFIG.find(n => n.id === id).questions.length, 0);
  const totalQsAvailable = NODE_CONFIG.reduce((sum, n) => sum + n.questions.length, 0);
  const lightPercent = Math.round((appState.puzzle.pieces / appState.puzzle.total) * 100);
  const totalElapsed = Object.values(appState.nodes).reduce((s, n) => s + (n.elapsedSeconds || 0), 0);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; }
    @keyframes otPulse { 0%,100%{opacity:0.65;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }
    @keyframes otFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    @keyframes otSlideUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes otSlideRight { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes otShimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.2); border-radius: 4px; }
  `;

  // Onboarding
  if (!appState.onboardingComplete) {
    return (
      <>
        <style>{css}</style>
        <OnboardingScreen step={appState.onboardingStep} onNext={() => appDispatch({ type: "NEXT_ONBOARDING" })} theme={theme} />
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Syne', sans-serif", color: T.text, paddingRight: appState.notesOpen ? 320 : 0, transition: "padding-right 0.3s ease" }}>

        {/* ── HEADER ── */}
        <div style={{
          padding: "13px 18px", borderBottom: `1px solid ${T.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 100,
          background: T.headerBg, backdropFilter: "blur(20px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, filter: "drop-shadow(0 0 8px #4fc3f7)" }}>◈</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, color: T.text }}>ONE TRIBE</div>
              <div style={{ fontSize: 9, color: T.textDim, letterSpacing: 2, fontFamily: "monospace" }}>
                v{BUILD.version} · {appState.user.level.toUpperCase()} OF SELF
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Timer */}
            <div style={{ textAlign: "center", padding: "3px 8px", background: T.inputBg, borderRadius: 7, border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#4fc3f7", fontFamily: "monospace" }}>{formatTime(totalElapsed)}</div>
              <div style={{ fontSize: 8, color: T.textDim, letterSpacing: 1 }}>TOTAL TIME</div>
            </div>
            {/* Theme switcher */}
            <div style={{ display: "flex", gap: 4 }}>
              {Object.values(THEMES).map(t => (
                <button key={t.id} onClick={() => appDispatch({ type: "SET_THEME", theme: t.id })} title={t.label} style={{
                  width: 30, height: 30, borderRadius: 8, border: `1px solid ${theme === t.id ? "#4fc3f7" : T.border}`,
                  background: theme === t.id ? "rgba(79,195,247,0.15)" : T.inputBg,
                  color: theme === t.id ? "#4fc3f7" : T.textDim, cursor: "pointer", fontSize: 13,
                }}>{t.icon}</button>
              ))}
            </div>
            {/* Notes toggle */}
            <button onClick={() => appDispatch({ type: "TOGGLE_NOTES", nodeId: NODE_CONFIG[0].id })} style={{
              width: 30, height: 30, borderRadius: 8,
              border: `1px solid ${appState.notesOpen ? "#4fc3f7" : T.border}`,
              background: appState.notesOpen ? "rgba(79,195,247,0.15)" : T.inputBg,
              color: appState.notesOpen ? "#4fc3f7" : T.textDim, cursor: "pointer", fontSize: 14,
            }}>📝</button>
            {/* XP + avatar initials */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#4fc3f7", fontFamily: "monospace" }}>{appState.user.xp} XP</div>
              <div style={{ fontSize: 8, color: T.textDim, fontFamily: "monospace" }}>{totalQsAnswered}/{totalQsAvailable}</div>
            </div>
            {appState.user.name && (
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(79,195,247,0.12)", border: "1px solid rgba(79,195,247,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#4fc3f7" }}>
                {appState.user.name[0]?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: "20px 18px", maxWidth: 600, margin: "0 auto" }}>
          {/* Nav */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
            {[["hub","Hub"],["avatar","Avatar"],["vault_view","Vault"],["footprint","Footprint"]].map(([v, label]) => (
              <button key={v} onClick={() => appDispatch({ type: "SET_VIEW", view: v })} style={{
                padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 10,
                background: appState.activeView === v ? "rgba(79,195,247,0.18)" : T.inputBg,
                color: appState.activeView === v ? "#4fc3f7" : T.textMid,
                letterSpacing: 1, fontWeight: 700, textTransform: "uppercase",
                outline: appState.activeView === v ? "1px solid rgba(79,195,247,0.25)" : "none",
              }}>{label}</button>
            ))}
          </div>

          {/* ── HUB ── */}
          {appState.activeView === "hub" && (
            <div style={{ animation: "otSlideUp 0.4s ease" }}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: T.text }}>
                  {appState.user.name ? `Welcome back, ${appState.user.name}.` : "Your Journey"}
                </div>
                <div style={{ fontSize: 12, color: T.textMid }}>
                  {appState.puzzle.pieces === 0
                    ? "Begin with The Seed — your zero point. Each node below unlocks in sequence."
                    : `${appState.puzzle.total - appState.puzzle.pieces} nodes remain. ${totalQsAvailable - totalQsAnswered} questions left.`}
                </div>
              </div>

              {/* Progress bars */}
              <div style={{ marginBottom: 20 }}>
                {[
                  { label: "XP PROGRESS", value: appState.user.xp, max: 1000, color: "#4fc3f7", display: `${appState.user.xp} / 1000 XP` },
                  { label: "QUESTIONS ANSWERED", value: totalQsAnswered, max: totalQsAvailable, color: "#2ecc71", display: `${totalQsAnswered} / ${totalQsAvailable}` },
                  { label: "TIME INVESTED", value: totalElapsed, max: Math.max(totalElapsed, NODE_CONFIG.reduce((s,n)=>s+n.estimatedMinutes*60,0)), color: "#f5a623", display: formatTime(totalElapsed) },
                ].map(bar => (
                  <div key={bar.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: T.textDim, marginBottom: 4, letterSpacing: 1 }}>
                      <span>{bar.label}</span><span style={{ color: T.textMid }}>{bar.display}</span>
                    </div>
                    <div style={{ height: 3, background: T.border, borderRadius: 4 }}>
                      <div style={{ height: "100%", borderRadius: 4, width: `${Math.min((bar.value / bar.max) * 100, 100)}%`, background: bar.color, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Node cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {NODE_CONFIG.map(n => (
                  <NodeCard key={n.id} nodeId={n.id} appState={appState} dispatch={appDispatch} theme={theme} />
                ))}
              </div>

              {/* Reset */}
              <div style={{ marginTop: 28, textAlign: "center" }}>
                <button onClick={() => { if (window.confirm(`Reset v${BUILD.version}? Revert key: ${BUILD.prevBuildKey}`)) { localStorage.removeItem(BUILD.storageKey); window.location.reload(); }}} style={{
                  padding: "8px 18px", background: "rgba(255,60,60,0.07)", border: "1px solid rgba(255,60,60,0.18)",
                  borderRadius: 9, color: "rgba(255,100,100,0.6)", cursor: "pointer", fontSize: 9, letterSpacing: 1, fontFamily: "monospace",
                }}>RESET v{BUILD.version} · REVERT KEY: {BUILD.prevBuildKey}</button>
              </div>
            </div>
          )}

          {/* ── AVATAR ── */}
          {appState.activeView === "avatar" && (
            <div style={{ textAlign: "center", animation: "otSlideUp 0.4s ease" }}>
              <div style={{ fontSize: 10, color: T.textDim, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Current Self</div>
              <div style={{ marginBottom: 54 }}><AvatarCore lightPercent={lightPercent} phase={appState.user.avatarPhase} /></div>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 4 }}>{appState.user.name || "Unnamed"}</div>
              <div style={{ fontSize: 11, color: "#4fc3f7", letterSpacing: 2, marginBottom: 20 }}>{appState.user.level.toUpperCase()} OF SELF</div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 26 }}>
                {NODE_CONFIG.map(n => {
                  const done = appState.nodes[n.id].status === "complete";
                  return (
                    <div key={n.id} title={n.label} style={{
                      width: 34, height: 34, borderRadius: 8, fontSize: 15,
                      background: done ? `${n.accent}22` : T.inputBg,
                      border: `1px solid ${done ? n.accent + "55" : T.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: done ? `0 0 9px ${n.accent}44` : "none", transition: "all 0.3s",
                    }}>{done ? n.emoji : "○"}</div>
                  );
                })}
              </div>
              <div style={{ padding: 18, background: T.surface, borderRadius: 16, border: `1px solid ${T.border}` }}>
                {[["Bachelors",0,499],["Masters",500,899],["PhD",900,1000]].map(([tier,lo,hi]) => (
                  <div key={tier} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontSize: 12, color: appState.user.xp >= lo ? T.text : T.textDim }}>{appState.user.xp >= lo ? "✓" : "○"} {tier} of Self</span>
                    <span style={{ fontSize: 10, color: T.textDim, fontFamily: "monospace" }}>{lo}–{hi} XP</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── VAULT VIEW ── */}
          {appState.activeView === "vault_view" && (
            <div style={{ animation: "otSlideUp 0.4s ease" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 4 }}>The Vault</div>
              <div style={{ fontSize: 11, color: T.textMid, marginBottom: 20 }}>{totalQsAnswered} of {totalQsAvailable} questions recorded · {formatTime(totalElapsed)} total invested</div>
              {NODE_CONFIG.map(cfg => {
                const ns = appState.nodes[cfg.id];
                if (ns.status !== "complete") return null;
                const answered = cfg.questions.filter(q => ns.answers?.[q.key]);
                return (
                  <div key={cfg.id} style={{ marginBottom: 14, padding: 16, background: theme === "dark" ? cfg.bg : T.surface, border: `1px solid ${cfg.accent}33`, borderRadius: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 16 }}>{cfg.emoji}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{cfg.label}</span>
                      <span style={{ marginLeft: "auto", fontSize: 9, color: cfg.accent }}>{answered.length}/{cfg.questions.length} · {formatTime(ns.elapsedSeconds||0)} · +{cfg.unlockXP}XP</span>
                    </div>
                    {answered.slice(0, 5).map(q => (
                      <div key={q.key} style={{ marginBottom: 7 }}>
                        <div style={{ fontSize: 9, color: T.textDim, marginBottom: 2 }}>{q.label}</div>
                        <div style={{ fontSize: 11, color: T.textMid }}>{String(ns.answers[q.key])}</div>
                      </div>
                    ))}
                    {answered.length > 5 && <div style={{ fontSize: 9, color: T.textDim, marginTop: 6 }}>+{answered.length - 5} more stored</div>}
                    {ns.notes && (
                      <div style={{ marginTop: 10, padding: "8px 10px", background: `${cfg.accent}0e`, borderRadius: 8, border: `1px solid ${cfg.accent}22` }}>
                        <div style={{ fontSize: 9, color: cfg.accent, letterSpacing: 1, marginBottom: 4 }}>MY NOTES</div>
                        <div style={{ fontSize: 11, color: T.textMid, whiteSpace: "pre-wrap" }}>{ns.notes}</div>
                      </div>
                    )}
                    {ns.completedAt && <div style={{ marginTop: 8, fontSize: 9, color: T.textDim, fontFamily: "monospace" }}>Completed: {new Date(ns.completedAt).toLocaleString()}</div>}
                  </div>
                );
              })}
              {appState.puzzle.pieces === 0 && <div style={{ textAlign: "center", padding: 40, color: T.textDim, fontSize: 13 }}>No nodes completed yet. Begin with The Seed.</div>}
            </div>
          )}

          {/* ── FOOTPRINT ── */}
          {appState.activeView === "footprint" && (
            <div style={{ animation: "otSlideUp 0.4s ease" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 4 }}>Electronic Footprint</div>
              <div style={{ fontSize: 11, color: T.textMid, marginBottom: 20 }}>Cross-referencing behavioral data across nodes to surface real patterns vs. stated intentions.</div>
              {appState.puzzle.pieces > 0 ? (
                <div>
                  {appState.nodes.seed?.answers?.q6 && (
                    <div style={{ marginBottom: 12, padding: 15, background: T.surface, borderRadius: 14, border: "1px solid rgba(46,204,113,0.25)" }}>
                      <div style={{ fontSize: 9, color: "#2ecc71", letterSpacing: 2, marginBottom: 10 }}>🌱 BASELINE SIGNALS</div>
                      {[
                        { label: "Daily Phone Use", value: `${appState.nodes.seed.answers.q6}h/day`, risk: Number(appState.nodes.seed.answers.q6) > 6 ? "HIGH" : Number(appState.nodes.seed.answers.q6) > 3 ? "MOD" : "LOW" },
                        { label: "Top Apps Reported", value: appState.nodes.seed.answers.q7 || "Not recorded" },
                        { label: "Monthly Leak", value: appState.nodes.seed.answers.q14 || "Not recorded" },
                        { label: "Social Checks/Day", value: appState.nodes.seed.answers.q16 ? `${appState.nodes.seed.answers.q16}x` : "Not recorded" },
                      ].map(item => (
                        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${T.border}` }}>
                          <span style={{ fontSize: 11, color: T.textMid }}>{item.label}</span>
                          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                            <span style={{ fontSize: 11, color: T.text }}>{item.value}</span>
                            {item.risk && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: item.risk === "HIGH" ? "rgba(255,60,60,0.2)" : item.risk === "MOD" ? "rgba(255,193,7,0.2)" : "rgba(46,204,113,0.2)", color: item.risk === "HIGH" ? "#ff6b6b" : item.risk === "MOD" ? "#ffc107" : "#2ecc71" }}>{item.risk}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ marginBottom: 12, padding: 15, background: T.surface, borderRadius: 14, border: "1px solid rgba(79,195,247,0.2)" }}>
                    <div style={{ fontSize: 9, color: "#4fc3f7", letterSpacing: 2, marginBottom: 10 }}>📊 CROSS-NODE PATTERNS</div>
                    {[
                      { signal: "Calm vs. Consequence Gap", desc: appState.nodes.inner_sanctum?.answers?.q9 && appState.nodes.mirror?.answers?.q4 ? `Anxiety: ${appState.nodes.inner_sanctum.answers.q9}/10 · Accountability: ${appState.nodes.mirror.answers.q4}/10 — ${Number(appState.nodes.inner_sanctum.answers.q9) > Number(appState.nodes.mirror.answers.q4) ? "Anxiety outpaces accountability. Regulate first." : "Accountability exceeds anxiety. Build from strength."}` : "Complete Inner Sanctum + Mirror to reveal", active: !!(appState.nodes.inner_sanctum?.answers?.q9 && appState.nodes.mirror?.answers?.q4) },
                      { signal: "Body-Finance Alignment", desc: appState.nodes.forge?.answers?.q24 && appState.nodes.ledger?.answers?.q27 ? `Body: ${appState.nodes.forge.answers.q24}/10 · Finances: ${appState.nodes.ledger.answers.q27}/10 — ${Math.abs(Number(appState.nodes.forge.answers.q24) - Number(appState.nodes.ledger.answers.q27)) > 3 ? "Significant imbalance detected." : "Reasonably aligned."}` : "Complete Forge + Ledger to reveal", active: !!(appState.nodes.forge?.answers?.q24 && appState.nodes.ledger?.answers?.q27) },
                      { signal: "Memory vs. Execution Delta", desc: appState.nodes.vault?.answers?.q11 && appState.nodes.vault?.answers?.q12 ? `Start: ${appState.nodes.vault.answers.q11}/10 · Finish: ${appState.nodes.vault.answers.q12}/10 — ${Number(appState.nodes.vault.answers.q11) > Number(appState.nodes.vault.answers.q12) ? "You start more than you finish. Gap lives at completion." : "Finishing strength. Work on initiation."}` : "Complete Vault to reveal", active: !!(appState.nodes.vault?.answers?.q11 && appState.nodes.vault?.answers?.q12) },
                      { signal: "Community vs. Digital Dependency", desc: appState.nodes.tribe?.answers?.q3 && appState.nodes.seed?.answers?.q6 ? `Contacts: ${appState.nodes.tribe.answers.q3} · Phone: ${appState.nodes.seed.answers.q6}h/day — ${Number(appState.nodes.tribe.answers.q3) < 3 && Number(appState.nodes.seed.answers.q6) > 4 ? "Digital dependency high, real community thin." : "Human network present. Build depth."}` : "Complete Tribe + Seed to reveal", active: !!(appState.nodes.tribe?.answers?.q3 && appState.nodes.seed?.answers?.q6) },
                    ].map((p, i) => (
                      <div key={i} style={{ padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>
                        <div style={{ fontSize: 11, color: p.active ? T.text : T.textDim, fontWeight: 700, marginBottom: 3 }}>{p.signal}</div>
                        <div style={{ fontSize: 11, color: p.active ? T.textMid : T.textDim }}>{p.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: 15, background: T.surface, borderRadius: 14, border: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: 9, color: T.textDim, letterSpacing: 2, marginBottom: 8 }}>PROFILE COMPLETENESS</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#4fc3f7", marginBottom: 3 }}>{Math.round((totalQsAnswered / totalQsAvailable) * 100)}%</div>
                    <div style={{ fontSize: 11, color: T.textMid }}>{totalQsAnswered} of {totalQsAvailable} questions · {appState.puzzle.pieces} of {appState.puzzle.total} nodes</div>
                    <div style={{ marginTop: 10, height: 3, background: T.border, borderRadius: 4 }}>
                      <div style={{ height: "100%", borderRadius: 4, width: `${(totalQsAnswered / totalQsAvailable) * 100}%`, background: "linear-gradient(90deg, #4fc3f7, #2ecc71)", transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: 40 }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>📡</div>
                  <div style={{ fontSize: 13, color: T.textDim }}>Complete The Seed to begin footprint analysis.</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Node Modal */}
        {appState.activeNode && (
          <NodeModal nodeId={appState.activeNode} appState={appState} dispatch={appDispatch} theme={theme} onClose={() => appDispatch({ type: "CLOSE_NODE" })} />
        )}

        {/* Notes Panel */}
        {appState.notesOpen && (
          <NotesPanel appState={appState} dispatch={appDispatch} theme={theme} />
        )}
      </div>
    </>
  );
}
