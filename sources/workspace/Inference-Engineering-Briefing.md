# Inference Engineering — Applied Briefing
*From Chapters 1, 6, and 7 of* Inference Engineering *by Philip Kiely (Baseten). Mapped to VisionWeaver rendering and T.H.E.L.M.A. serving. Oct 20, 2026.*

## Ch. 1 — Prerequisites → your render decision

- **Define "best" before optimizing.** Performance is a tradeoff among latency, throughput, and quality, driven by five inputs: model requirements, interface, latency budget, unit economics, usage patterns. Batch 1's unit economics are now explicit: a Pro month buys 187s of Gen-4.5 or 375s of Turbo against 480s needed.
- **Model selection is the biggest cost lever** — bigger than any runtime trick. The rule: use the smallest, cheapest model that passes *your* evals. Turbo vs. Gen-4.5 is exactly this decision. Your eval is the Batch 1 QC pass on one test episode; if Turbo passes it, Turbo is the correct default and Gen-4.5 is for finals only.
- **You are an offline workload.** VisionWeaver rendering is batch work with no user waiting, so optimize for throughput and cost per finished second, not latency. Offline and online uses of the same model deserve separate setups.
- **Stay on shared inference.** The book's explicit early-stage advice: use off-the-shelf APIs until scale, a custom model, or multi-model orchestration forces dedicated GPUs. Runway credits fit your stage; self-hosting would raise your monthly floor for no current benefit.

## Ch. 6 — Modalities → production mechanics

- **Video generation is compute-bound and priced by model speed.** Attention is 70–80% of compute; cost falls only when the model gets faster (fewer denoising steps, caching, quantization) — not by batching. Practical read: expect per-second pricing to stay steep, and treat step/quality settings as your main cost dial alongside model choice.
- **Image/video quality can't be reliably auto-graded.** VLM scoring gives directional signal at best; human preference is the real benchmark. This validates your gate: one episode, human QC, then scale — don't automate the verdict.
- **TTS degrades on long inputs.** Speech quality drops after ~30 seconds of generated audio. Generate narration per scene (your 6 × 10s scene format already complies), never as one 60s pass.
- **ASR is your captioning workhorse.** Whisper-class models transcribe fast and cheap; for long audio the pattern is voice-activity chunking, parallel transcription, timestamp stitching.

## Ch. 7 — Production → T.H.E.L.M.A. serving

- **You're managed, not self-hosted — and that's fine.** Supabase/Vercel plus APIs means containerization, GPU procurement, and autoscaling are your providers' problems. The chapter still hands you three disciplines worth adopting:
- **Observability set.** Track volume, request/response sizes, error codes (2XX/4XX/5XX), latency at P50/P90/P99 (never averages — outliers are what users remember), and queue depth. That's a ready-made metric list for the CRO Master Dashboard.
- **Deploy like a canary.** Ship to a small slice, monitor, then ramp — your preview → verify → merge PR flow already is this; PR #64's "do not merge until verified" is textbook.
- **Pin everything.** Exact dependency versions or builds drift and break. This is the book's case for finishing the stalled lockfile/CI work in standalone-crm.
- **Cost accounting rule.** Compare options on total cost over at least a week, including engineering time (TCO) — not per-token or per-credit sticker prices. And the scale-to-zero warning: if a workload only works when it scales to zero, it isn't ready for dedicated infrastructure — another vote for staying on APIs.

## Bottom line

1. VisionWeaver: stay on shared inference; let the one-episode QC test decide Turbo-first vs. Gen-4.5 finals; budget in cost per finished second.
2. Voiceover: TTS in ≤30s scene chunks; Whisper-class ASR for captions.
3. T.H.E.L.M.A.: adopt the Ch. 7 observability list in the dashboard, keep canary discipline, close the lockfile gap.
