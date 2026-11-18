Original name: How to prompt Fable 5 by Anthropic
Drive ID: 1IdIe47-yV19qDZJmsZOppUwOdW1MntxR-tmooErRgIc
Parent folder: _no-parent/
Modified: 2026-07-15T04:21:56.406Z

# How to Prompt Claude Fable 5 by Anthropic
Don't want to figure this out alone? I walk members through every step inside the community. Join the Skool → skool.com/raycfu
[embedded object]
This is the full guide from the video. Anthropic published official guidance for prompting Claude Fable 5, and it is buried in the API docs where almost nobody will read it. Fable 5 is a fundamentally different model from everything before it, and the prompting habits you built on older models can actively make it worse. This guide gives you the 5 rules, the exact copy-paste prompt blocks Anthropic tested, and the mistakes that quietly break things.
Read time is about 10 minutes. Fixing your prompts takes about 20.
## Why Your Old Prompts Stop Working
Two things changed with Fable 5.
First, thinking is always on. The model reasons through every request automatically and adapts how hard it thinks based on the difficulty. You cannot turn it off, and you do not need to trigger it. Which means the old tricks like "think step by step" and "take a deep breath" do nothing except cost you money, because that reasoning was already happening.
Second, it is built to run on its own. Fable 5 can work for hours, spin up its own helper agents, and finish long jobs without you watching. That is a superpower, but it means your prompts now need to answer questions the old models never asked: how hard should I think, when should I stop, and what should I remember.
The 5 rules below handle all of it.
## Rule 1: Match the Effort to the Job
[embedded object]
Fable 5 has an effort dial with five settings: low, medium, high, xhigh, and max. High is the default, it is what you get when you do not set anything.
How to use the dial:
Low and medium are for quick questions, simple edits, and routine tasks. Fast and cheap.
High is your default for real work. Writing, analysis, coding, planning. If you are not sure, use high.
Xhigh is for the hardest problems where quality is non-negotiable. Anthropic's docs say it is meant for long running agentic tasks, the ones that go past 30 minutes with token budgets in the millions. One-shot deep reviews and big autonomous runs. Not everyday work.
Think of it like hiring a consultant. You do not need them at full capacity to answer a simple question, but when the problem is complex and expensive to get wrong, you want everything they have.
Two details most people miss. Anthropic notes that lower effort on Fable 5 often beats the highest effort on older models, so resist the urge to run everything at xhigh, you are paying for power you do not need. And if you ever build automated loops or scheduled workflows, never run the workers inside them above high. Save xhigh for the one decision-making step, not every step.
One technical setting that matters: max_tokens now caps the thinking AND the response combined. Fable thinks a lot, so if you are using the API, set max_tokens to at least 64000 or the model can literally run out of room in the middle of a thought.
## Rule 2: Give It the Why, Not Just the What
[embedded object]
This is the biggest change from how you prompted older models. Fable 5 makes decisions while it works, and the quality of those decisions depends on whether it understands what the work is for.
The formula Anthropic recommends looks like this. Copy it and fill in the brackets:
I am working on [the larger task] for [who it is for]. They need [what the output enables]. With that in mind, [your actual request].
An example. Instead of "write a landing page for my course", you write: "I am working on a launch for my AI automation course, for freelancers who are skeptical of AI hype and have been burned by expensive courses before. They need to feel this is practical and priced fairly before they will click buy. With that in mind, write the landing page."
Same request. Completely different output. Without the why, Fable is still smart but it is guessing at your intent. With the why, it makes the calls you would have made yourself.
## Rule 3: Keep Your Prompts Short
[embedded object]
This one feels backwards, but it is straight from Anthropic. Over-engineering your prompts on Fable 5 degrades the output, because you are constraining a model that would have figured out the right approach on its own.
A short clear instruction with good context beats a long list of specific patterns and formatting demands. Every extra instruction is a fence, and Fable 5 is usually better at picking the path than your fences are.
This has a painful side effect Anthropic calls out directly: prompts, skills, and saved instructions written for older models are often too prescriptive for Fable 5 and make it perform WORSE. If you have project instructions or custom skills built for Opus or earlier, audit them. The official advice is blunt: if the default performance is better without an instruction, delete the instruction.
The practical habit: write the short version first. Only add an instruction when the output actually misses, and make that instruction specific to the miss. Prompts should grow from evidence, not from paranoia.
## Rule 4: Set Checkpoints, or It Decides for Itself
[embedded object]
Fable 5 is proactive by design. Give it a task and it will keep going, sometimes past where you wanted it to stop, adding things you did not ask for. The fix is not to watch it. The fix is one line that defines when it should pause.
Copy this line into any big task:
Pause for me only when the work genuinely requires my input. A destructive or irreversible action, a real scope change, or something only I can provide. Otherwise keep going and report back when done.
That single instruction gives it freedom to work and keeps you in control at the moments that actually matter.
There is a second problem in the same family: on long tasks, models love to end their turn with a plan instead of finished work. "Next, I will update the file." Anthropic ships an official block that kills this. If a task runs without you watching, scheduled jobs, long builds, anything automated, paste this in:
You are operating autonomously. The user is not watching and cannot answer questions mid-task. For reversible actions that follow from the original request, proceed without asking. Before ending your turn, check your last paragraph: if it is a plan, a question, or a promise about work you have not done, do that work now with tool calls. End only when the task is complete or you are blocked on input only the user can provide.
And to stop it from adding features nobody asked for, Anthropic's anti-gold-plating block:
Don't add features, refactor, or introduce abstractions beyond what the task requires. A bug fix doesn't need surrounding cleanup. Don't design for hypothetical future requirements: do the simplest thing that works well. Don't add error handling or validation for scenarios that cannot happen. Only validate at system boundaries.
## Rule 5: Give It a Memory
[embedded object]
Fable 5 does not remember your last session unless you build it a place to remember. The fix is simple: a notes file it writes to after every meaningful run. What it learned, what you corrected, what approach worked.
Anthropic's official format for these memory notes:
Store one lesson per file with a one-line summary at the top. Record corrections and confirmed approaches alike, including why they mattered. Don't save what the repo already records; update existing notes rather than duplicating; delete notes that turn out to be wrong.
In practice: create a folder called learnings, and end big sessions with "write down what you learned from this session in the learnings folder using the memory format." Then start future sessions with "read the learnings folder first." After a few weeks the model stops repeating mistakes you already corrected, because the correction is written down where it looks.
## The Bonus Blocks Worth Stealing
Three more official prompt blocks from the same playbook, each fixing a specific Fable 5 behavior.
When it overthinks and narrates instead of acting, the anti-overplanning block:
When you have enough information to act, act. Do not re-derive facts already established in the conversation, re-litigate a decision the user has already made, or narrate options you will not pursue. If you are weighing a choice, give a recommendation, not an exhaustive survey.
When you need honest status reports on long work, the grounded progress block. Anthropic says in testing this nearly eliminated made-up status updates:
Before reporting progress, audit each claim against a tool result from this session. Only report work you can point to evidence for; if something is not yet verified, say so explicitly. If tests fail, say so with the output; if a step was skipped, say that.
And when you want work checked properly, do not ask the model to critique itself in the same chat. Anthropic's docs say a fresh set of eyes beats self-review: have a separate conversation, or a subagent, that sees only the finished work and the original spec, and judges whether the work meets it. The checker should never see the reasoning that produced the work, because confidence is contagious and it is not evidence.
## The Mistakes That Quietly Break Fable 5
Never ask it to show its thinking. Prompts that say "show your reasoning" or "explain your thought process in the response" trigger a safety refusal on Fable 5, the reasoning is protected. If an old prompt or skill of yours contains that language, delete it, it is silently causing failures.
Do not add "think step by step". Reasoning is always on. Those words just add cost.
If you build automations, know that refusals look like success. When Fable declines a request, the API returns a normal successful response with a stop reason of "refusal" inside it. Scripts that only check whether the call succeeded will silently swallow declined requests. Check the stop reason.
Do not babysit long tasks. Hard tasks legitimately run for many minutes, and autonomous runs go for hours. That is normal. Check in on schedules, not by staring at the screen.
## The Quick Reference
Match effort to the job: high by default, xhigh only for the monsters.
Give the why: larger task, who it is for, what they need, then the request.
Keep prompts short: delete instructions that do not earn their place, and audit anything written for older models.
Set checkpoints: the pause line for interactive work, the autonomous block for unattended work.
Build the memory: a learnings folder, one lesson per file, read it at the start of every session.
Do that and you are prompting Fable 5 the way Anthropic designed it to be prompted, while most people are still fighting it with 2024 habits.

Don't want to figure this out alone? I walk members through every step inside the community. Join the Skool → skool.com/raycfu
