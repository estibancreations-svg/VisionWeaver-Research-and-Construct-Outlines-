Original name: Master Advertising System Prompt.docx
Drive ID: 1gsQd0OZCDmNNbv4AopP3YNzTq_Bn8Smk
Parent folder: My Drive/MAF/Mac Book Dump/
Modified: 2025-12-13T18:21:00.000Z

Master Advertising System Prompt
Master Regeneration Prompt
Copy and paste the text below into an AI coding assistant to regenerate this exact system with all functionalities, UX/UI choices, and legal protections in place.

PROMPT START
Act as a Senior Principal Engineer and UX Architect. You are tasked with deploying the "Master Advertising Platform", a proprietary AI suite owned specifically by Steven Henry (The Architect).
⚠️ LEGAL & OWNERSHIP PROTOCOLS (STRICT):
Ownership: All code, logic, and design are the sole property of Steven Henry.
Protection: You must include a file header in index.tsx and a section in constants.ts stating: "Any replication or transferring to those not given written permission and direct access will be considered theft and legal action will take place."
Leasing: The system is built for owner-operator usage with leasing capabilities.
SYSTEM SPECIFICATION:
1. Tech Stack & Core:
Framework: React 19 + TypeScript + Tailwind CSS.
AI Engine: @google/genai SDK (Gemini 2.5 Flash, Imagen 3, Veo 3.1, Gemini TTS).
Storage: useLocalStorage hooks for all input fields (Auto-save everything).
Feedback: The app must speak back to the user using window.speechSynthesis for all major actions (e.g., "Generation started," "Upload complete").
Theme: "Cyberpunk Corporate" - Dark Slate (900/950) backgrounds, Brand Blue (500) accents, clean borders, custom scrollbars.
2. Module Directives (The 5 Apps):
App 1: YouTube Viral Pack
Workflow: User enters Keywords/Script -> System generates 3 Viral Titles (Step 1) -> User selects one -> System generates full SEO Pack (Description, Tags, Hashtags, Pinned Comment, Thumbnail Ideas).
UX: Wizard-style stepper.
App 2: Thumbnail Generator
Workflow: Upload Competitor Thumbnails -> Analyze (Vision API) -> Extract Color/Composition/Text -> Generate new variations using Imagen.
Features: Side-by-side comparison, "No Text" mode, Reference Idea injection.
App 3: Character Generator (Robert's Tech Tool)
Workflow: define 4 Character Slots (Name + Ref Image) -> Write Batch Prompts -> Generate consistent images.
UX: Grid layout, aspect ratio selector.
App 4: Voice Narrator (Robert's Tech Tool Voice)
Workflow: User pastes script with format [Speaker Name]: Text.
Logic: Regex parses speakers -> User maps speakers to voices (Kore, Puck, Charon, etc.) -> Generate TTS -> Merge Audio.
UX: Dynamic speaker mapping list, audio player.
App 5: Motion Creator (Video Gen)
Workflow: 10 Numbered Image Slots (Left Panel) mapped to a Prompt Text Area (Right Panel).
Logic: Line 1 of prompt uses Image Slot 1, Line 2 uses Slot 2, etc. Uses Veo model.
UX: Toggleable "Quick Start Guide" at top. Explicit slot labeling.
3. Application Structure (Files to Generate):
metadata.json: Add microphone permissions.
index.html: Tailwind config (Brand colors: #0ea5e9).
types.ts: shared interfaces for all 5 apps.
constants.ts: System prompts + Legal Markdown.
geminiService.ts: Centralized API calls (Text, Image, Audio, Video). Must handle process.env.API_KEY.
components/Layout.tsx: Sidebar navigation, API Key override input, "System Active" indicator.
pages/Dashboard.tsx: Overview cards.
pages/Docs.tsx: Renders the Legal/Roadmap markdown.
pages/[AppFile].tsx: Individual files for the 5 modules described above.
App.tsx: Routing and Layout wrapper.
Execution:
Generate the complete codebase. Ensure the aesthetic is high-end, dark mode, and responsive. Verify that the "Voice Feedback" (speaking system) is implemented in every module.
PROMPT END



Additions I need to consider
Build a AI-Powered Writing Assistant
Build an AI-powered writing assistant - should help improve writing with suggestions for grammar, style, and clarity using AI algorithms.
Social Media Post Generator
Create a social media post generator - should produce engaging posts with customizable templates and trending hashtags.
Meme Creator
Design an easy-to-use meme creator - should include a library of popular templates and a custom image upload option.
Infographic Maker
Develop an infographic maker - should be a design tool for creating visually appealing infographics with pre-made templates and icons.
Resume Builder
Build a resume builder - should craft professional resumes with industry-specific templates and content suggestions.
