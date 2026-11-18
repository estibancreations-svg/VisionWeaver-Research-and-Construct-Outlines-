import base64, pathlib
BASE = pathlib.Path(__file__).resolve().parent
MEDIA = BASE / "media"
def uri(name):
    data = base64.b64encode((MEDIA / name).read_bytes()).decode()
    return f"data:image/jpeg;base64,{data}"
HERO = uri("speech4-okta-hero.jpg")
THUMB = uri("speech4-thumbnail-main.jpg")
SHORT = uri("speech4-short-cover.jpg")

CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
body { margin:0; font-family:'Liberation Sans','Noto Sans',sans-serif; color:#2b2118; background:#fff; font-size:10.5pt; line-height:1.5; }
.page { min-height:297mm; padding:18mm 18mm 16mm 18mm; position:relative; background:#fdf8ee; page-break-after:always; }
.page:last-child { page-break-after:auto; }
h1 { font-family:'Liberation Serif',serif; font-size:30pt; line-height:1.08; margin:0 0 5mm; color:#3b2314; }
h2 { font-family:'Liberation Serif',serif; font-size:17pt; line-height:1.15; margin:0 0 4mm; color:#3b2314; border-bottom:2px solid #c98a2e; padding-bottom:2mm; }
h3 { font-family:'Liberation Serif',serif; font-size:12.5pt; margin:5mm 0 2mm; color:#7a3b14; }
p { margin:0 0 3mm; }
.small { font-size:9pt; color:#6b5a49; line-height:1.5; }
.eyebrow { font-size:8.5pt; letter-spacing:.14em; text-transform:uppercase; color:#8a4b12; font-weight:700; margin-bottom:3mm; }
.lede { font-size:12pt; line-height:1.55; color:#4a3828; }
table { width:100%; border-collapse:collapse; font-size:9.2pt; line-height:1.4; margin:3mm 0 5mm; }
th { background:#3b2314; color:#fdf8ee; text-align:left; padding:2.2mm 2.5mm; font-size:8.8pt; }
td { padding:2.2mm 2.5mm; border-bottom:1px solid #e6dcc8; vertical-align:top; }
tr { break-inside:avoid; }
.script { font-family:'Liberation Serif',serif; font-size:11.5pt; line-height:1.65; }
.script p { margin-bottom:4mm; }
.hook { font-family:'Liberation Serif',serif; font-size:16pt; line-height:1.35; color:#7a3b14; border-left:4px solid #c98a2e; padding-left:5mm; margin:4mm 0 6mm; }
.card { background:#fff; border:1px solid #e6dcc8; border-radius:3mm; padding:4mm 5mm; margin-bottom:4mm; break-inside:avoid; }
.grid2 { display:grid; grid-template-columns:1fr 1fr; gap:4mm; }
ul { margin:1mm 0 3mm 5mm; padding:0; } li { margin-bottom:1.6mm; }
.footer { position:absolute; bottom:10mm; left:18mm; right:18mm; font-size:8pt; color:#8a7a66; border-top:1px solid #e6dcc8; padding-top:2mm; display:flex; justify-content:space-between; }
img.hero { width:100%; height:26mm; object-fit:cover; object-position:50% 30%; border-radius:3mm; }
figure { margin:0 0 4mm; } figcaption { font-size:8.5pt; color:#6b5a49; margin-top:2mm; line-height:1.45; }
.thumbs { display:grid; grid-template-columns:1.55fr 1fr; gap:5mm; align-items:start; }
.thumbs img { width:100%; object-fit:contain; border-radius:2mm; }
.thumbs .wide img { max-height:26mm; } .thumbs .tall img { max-height:30mm; }
.status-done { color:#2a6b5e; font-weight:700; } .status-not { color:#8a3b2e; font-weight:700; } .status-next { color:#9a6a12; font-weight:700; }
.tag { font-size:10pt; line-height:1.7; color:#5a3418; }
.kv b { display:block; font-size:8.5pt; letter-spacing:1.2px; text-transform:uppercase; color:#8a4b12; margin-bottom:1mm; }
.kv { border-top:1.5px solid #e0cfa5; padding-top:1.6mm; margin-bottom:2mm; }
"""
FOOT = "<div class='footer'><span>First in Consciousness - Speech 4 Production Package</span><span>Page {n}</span></div>"

PAGES = []

PAGES.append(f"""
<section class="page">
<div class="eyebrow">VisionWeaver &middot; First in Consciousness &middot; Weekly Series</div>
<h1>The Sitting<br>of Failures</h1>
<p class="lede">Speech 4 production package. The full script draft, pulled together with the Crossroads production standards mapped to every scene - flow, voices, motion, sound, and posting - so this episode can be produced, checked, and published the same way as everything else in VisionWeaver.</p>
<figure><img class="hero" src="{HERO}"><figcaption>Okta, Who Walks It All - lead for Speech 4. Her locked portrait is the single continuity reference for every scene: same face, patterned amber-brown shell-cloak, staff, and small brass bell. Original artwork for this episode: Okta at the fireside sitting, dusk.</figcaption></figure>
<h2>Episode at a glance</h2>
<div class="grid2">
<div class="kv"><b>Series</b><span>First in Consciousness</span></div>
<div class="kv"><b>Episode</b><span>Speech 4 - Elder mode</span></div>
<div class="kv"><b>Lead</b><span>Okta, Who Walks It All</span></div>
<div class="kv"><b>Second voices</b><span>The travellers, heard only briefly</span></div>
<div class="kv"><b>Format</b><span>6-12 min teaching + 45-60 sec Short</span></div>
<div class="kv"><b>Setting</b><span>A fireside sitting at dusk</span></div>
<div class="kv"><b>Cosmology</b><span>The Current</span></div>
<div class="kv"><b>Single aphorism for the Short</b><span>&ldquo;Failure is the curriculum&rdquo;</span></div>
</div>
<p><span class="status-done">DONE</span> Speech 3 production package, this script draft, Crossroads standards mapping, 12-scene map, posting package, thumbnail artwork.</p>
<p><span class="status-next">NEXT</span> Script approval, then scene work when funding returns.</p>
<p><span class="status-not">NOT DONE</span> Nothing is rendered, recorded, or published for this episode. This sprint is writing, images, and files only.</p>
<div class="grid2" style="margin-top:4mm">
<div class="kv"><b>Before</b><span>Speech 3 - &ldquo;Hold the Hand, Not the Riverbank&rdquo;</span></div>
<div class="kv"><b>After</b><span>Speech 5 - &ldquo;The Current Cannot Carry Half of You&rdquo;</span></div>
</div>
<p class="small">How to use this file: produce scenes in the order of the scene map (pages 7-8), follow the standards mapping (page 6) for every choice, record narration in chunks of 30 seconds or less per scene, and do not publish until the QC preview step is passed.</p>
{FOOT.format(n=1)}
</section>
""")

PAGES.append(f"""
<section class="page">
<div class="eyebrow">Approved Script &middot; Verbatim</div>
<h2>The script is the source - these words do not change in production</h2>
<p class="small">Speaker is Okta throughout, telling her own failure first. No student story is told until hers is done. Pauses after punch lines are part of the script - see the standards mapping.</p>
<h3>Hook</h3>
<div class="hook">&ldquo;Before I teach you about failure, let me sit with one of mine.&rdquo;</div>
<h3>Story - the rule of this sitting</h3>
<div class="script">
<p>No student story until mine is done. That is the rule of this sitting, and I made the rule because I broke it once, long ago, in the other direction. Early in my walking, I promised to guide a party of travellers through a high pass before winter. The signs said turn back. The clouds stacked. The wind changed its mind twice before noon. The birds went quiet, the way they do when weather is coming. I pressed on anyway - not because the road was safe, but because I had promised, and pride had dressed itself up as keeping my word.</p>
</div>
<div class="card"><p><b>Delivery note.</b> The rule is stated plainly, before any story begins. Each sign gets its own beat - clouds, wind, quiet birds - and none of them is hurried.</p></div>
{FOOT.format(n=2)}
</section>
""")

PAGES.append(f"""
<section class="page">
<div class="eyebrow">Approved Script &middot; Verbatim, Continued</div>
<h2>The storm, the apology, and the second wrong</h2>
<div class="script">
<p>The storm caught us on the ridge. We spent a night exposed, cold to the bone, and one traveller fell on the ice and hurt his leg badly enough that he walked with a stick for a month. At dawn I apologised plainly, without excuse, and I walked them all back the long way, the way I should have taken the day before.</p>
<p>Then I did the second, quieter wrong: I carried the shame for years. I avoided that pass. I avoided telling the story. I polished my other crossings until they shone, and I hid the one that did not. Until one night, at a fire like this one, an old walker said to me: &ldquo;A teacher passes on mastery and folly - failure most of all. Students are meant to grow beyond the teacher. If you hide your failures, they inherit only the shine, and the shine teaches nothing.&rdquo; So here is mine, sitting in front of you, unpolished. I led badly. I learned slowly. I am telling you first, so that you do not have to learn it the way I did - alone, and years late.</p>
</div>
<div class="card"><p><b>Delivery notes for this section.</b></p>
<p>Hold a pause after &ldquo;without excuse.&rdquo; The apology is plain, and the pause is part of it.</p>
<p>The old walker's words are quoted, not paraphrased. Give &ldquo;the shine teaches nothing&rdquo; its full weight, then let the fire settle before &ldquo;So here is mine.&rdquo;</p>
<p>&ldquo;I led badly. I learned slowly.&rdquo; - two short lines, each on its own breath.</p></div>
{FOOT.format(n=3)}
</section>
""")

PAGES.append(f"""
<section class="page">
<div class="eyebrow">Approved Script &middot; Verbatim, Continued</div>
<h2>Failure is the curriculum</h2>
<h3>Reframe</h3>
<div class="script">
<p>Hear me. Failure is not the opposite of the teaching. Failure is the curriculum. The lesson was never &ldquo;never fall.&rdquo; The lesson is what the fall teaches, once you stop running from it. Shame keeps people exiled from their own lives. It builds a small room, locks the door, and calls the room humility. It is not humility. It is hiding. Naming returns the exiled to action. Say the failure in plain words, and the room opens. The failure is not the verdict. The hiding is the exile. And a teacher who tells only her victories is not protecting her students. She is starving them of the one lesson that would have saved them a winter of their own.</p>
</div>
<div class="card"><p><b>Delivery note.</b> &ldquo;Failure is the curriculum&rdquo; is the aphorism of the episode - it also carries the Short and the main thumbnail. Hold a full pause after it, and after &ldquo;The hiding is the exile.&rdquo;</p></div>
{FOOT.format(n=4)}
</section>
""")

PAGES.append(f"""
<section class="page">
<div class="eyebrow">Approved Script &middot; Verbatim, Continued</div>
<h2>Keep the lesson. Release the ledger.</h2>
<h3>Practice</h3>
<div class="script">
<p>So tonight, write the failure. Write it fully, in your own hand, no softening, no audience. Then, underneath it, write one line, and only one line: &ldquo;This taught me ___.&rdquo; Fill the blank honestly. Then keep the second line only. Fold the rest away. Keep the lesson. Release the ledger. The lesson fits in a pocket. The ledger never did.</p>
</div>
<h3>Payoff / Bridge</h3>
<div class="script">
<p>Shame keeps people exiled from their own lives. Naming returns them to action. Walk back into your life carrying one line instead of a ledger - and then, with that lighter step, comes the next question, the one about the half-step. Are you in, or are you only trying? That is next week's teaching: the Current cannot carry half of you.</p>
</div>
<div class="card"><p><b>Where this sits in the episode.</b> End of approved script. The payoff sits at 70-85% of runtime in the scene map, and the bridge - not a hard goodbye - carries the viewer to Speech 5, &ldquo;The Current Cannot Carry Half of You.&rdquo;</p>
<p>The episode's punch lines, each followed by a full pause: &ldquo;Failure is the curriculum.&rdquo; &ldquo;The hiding is the exile.&rdquo; &ldquo;The lesson fits in a pocket. The ledger never did.&rdquo;</p></div>
{FOOT.format(n=5)}
</section>
""")

PAGES.append(f"""
<section class="page">
<div class="eyebrow">Crossroads Standards &middot; Mapped to This Episode</div>
<h2>The Crossroads standard governs this episode, choice by choice</h2>
<p>The standards already set for Crossroads of Identity - the way the video moves, the way it feels, and the way the conversation goes - are the standard for this episode and everything after it. Each standard below is mapped to what it means, concretely, in Speech 4.</p>
<table>
<tr><th style="width:26%">Crossroads standard</th><th>How Speech 4 maps to it</th></tr>
<tr><td><b>Pipeline order</b></td><td>Follow the VisionWeaver Studio order with no steps skipped: Avatar Engineering &rarr; Worlds &amp; Locations &rarr; Books &amp; script &rarr; Locks &amp; maps &rarr; Cast &amp; avatars &rarr; Shot bible &rarr; Pictures &rarr; Motion &rarr; Narration booth &rarr; Sound &amp; music &rarr; Edit &rarr; Deliver &rarr; Publish &amp; social. This package completes the script and locks stage.</td></tr>
<tr><td><b>Continuity</b></td><td>Okta's locked portrait is the single reference for every scene - shell-cloak, staff, and bell. Consistency and hallucination checks on every scene before it passes to edit. The fireside sitting stays one place, at dusk, all episode; the high-pass story is told inside that sitting, never as a second present-day location.</td></tr>
<tr><td><b>Conversation flow</b></td><td>Elder mode: the teacher tells her own failure first, and no student story is told until hers is done. Short lines, pauses after punch lines, no lecturing at any point.</td></tr>
<tr><td><b>Voices</b></td><td>Okta has one distinct cast voice - no impression of any existing character. The travellers are heard only briefly. Narration is generated in chunks of 30 seconds or less per scene. Captions come from Whisper-class ASR, checked against the script.</td></tr>
<tr><td><b>Motion and feel</b></td><td>Visual change every 8-15 seconds. Hook in under 8 seconds, with no branding opener. Pacing reset every 30-60 seconds. Payoff at 70-85% of runtime. Bridge outro - never a hard goodbye.</td></tr>
<tr><td><b>Sound</b></td><td>Music sits 9-12 dB under the voice. Fire ambience runs under the sitting. The brass bell is Okta's audio signature - it sounds at the open and again at the bridge, and at no other points.</td></tr>
<tr><td><b>Render and QC</b></td><td>Gen-4.5 / Act-Two-class workflow, as in the Crossroads pipeline, when funding returns. Budget is measured as cost per finished second. Discipline is preview &rarr; verify &rarr; publish - nothing publishes from an unverified render.</td></tr>
</table>
<p><b>Status:</b> Writing, images, and files only - no render, no recording, nothing published for this episode.</p>
{FOOT.format(n=6)}
</section>
""")

PAGES.append(f"""
<section class="page">
<div class="eyebrow">Scene Map &middot; 12 Scenes &middot; 6-12 Minutes</div>
<h2>Scenes 1-6 - the sitting, the promise, the storm</h2>
<p class="small">Setting: a fireside sitting at dusk; the high-pass story is pictured as Okta tells it. Every voice chunk is 30 seconds or less. Visual change every 8-15 seconds within each scene.</p>
<table>
<tr><th>#</th><th>Script lines</th><th>Visual</th><th>Camera / motion</th><th>Voice &amp; text</th></tr>
<tr><td><b>1</b></td><td>Hook: &ldquo;Before I teach you about failure, let me sit with one of mine.&rdquo;</td><td>Single shot on Okta at the fire, dusk. The brass bell rings once.</td><td>Static, close. No branding opener. Delivered in under 8 seconds.</td><td>Okta, chunk 1. Text: One of mine.</td></tr>
<tr><td><b>2</b></td><td>The rule - no student story until mine is done; the rule exists because she broke it once, in the other direction.</td><td>The sitting: fire circle at dusk, listeners settled, Okta at the centre.</td><td>Slow settle into the circle. Pacing reset.</td><td>Okta, chunk 2. Text: No student story first.</td></tr>
<tr><td><b>3</b></td><td>The promise - young Okta agrees to guide a party of travellers through a high pass before winter.</td><td>Young Okta with the party below the high pass, winter light coming.</td><td>Wide establishing move, unhurried.</td><td>Okta narration, chunk 3. Text: I promised.</td></tr>
<tr><td><b>4</b></td><td>The signs - the clouds stacked; the wind changed its mind twice before noon; the birds went quiet.</td><td>Clouds stacking, wind shifting in the grass, birds gone silent.</td><td>Three held beats, one sign at a time. No hurry.</td><td>Okta, chunk 4. Text: The signs said turn back.</td></tr>
<tr><td><b>5</b></td><td>Pride dressed as promise - she pressed on anyway, not because the road was safe, but because she had promised.</td><td>The party pressing upward; Okta leading, jaw set.</td><td>Steady upward track; cuts shorten slightly.</td><td>Okta, chunk 5. Text: Pride, dressed up.</td></tr>
<tr><td><b>6</b></td><td>The storm - caught on the ridge; a night exposed, cold to the bone; a traveller falls on the ice and hurts his leg.</td><td>Ridge in storm light, figures braced; the fall on ice, held plainly, never sensational.</td><td>Movement strains, then stops. Hold on stillness after the fall.</td><td>Okta, chunk 6. Text: The ridge.</td></tr>
</table>
{FOOT.format(n=7)}
</section>
""")

PAGES.append(f"""
<section class="page">
<div class="eyebrow">Scene Map &middot; Continued</div>
<h2>Scenes 7-12 - the apology, the lesson, the bridge</h2>
<table>
<tr><th>#</th><th>Script lines</th><th>Visual</th><th>Camera / motion</th><th>Voice &amp; text</th></tr>
<tr><td><b>7</b></td><td>Dawn apology - she apologised plainly, without excuse, and walked them all back the long way.</td><td>Dawn on the ridge; Okta speaking plainly to the party; the long way down.</td><td>Wide and still. Long pause after the apology.</td><td>Okta + travellers briefly, chunk 7. Text: Without excuse.</td></tr>
<tr><td><b>8</b></td><td>The second wrong - she carried the shame for years; avoided the pass and the story; polished her other crossings and hid the one that did not shine.</td><td>Back at the fireside in the present telling; polished crossings glimpsed bright, the pass left in shadow.</td><td>Slow return to the present fire. Pacing reset.</td><td>Okta, chunk 8. Text: The hiding.</td></tr>
<tr><td><b>9</b></td><td>The old walker - &ldquo;A teacher passes on mastery and folly - failure most of all.&rdquo; The shine teaches nothing.</td><td>A fire like this one, years earlier; the old walker speaking across the flames.</td><td>Locked two-shot across the fire. The line lands, then silence.</td><td>Okta quoting the old walker, chunk 9. Text: A teacher passes on mastery and folly - failure most of all.</td></tr>
<tr><td><b>10</b></td><td>Reframe - failure is not the opposite of the teaching; failure is the curriculum. Shame builds a small room and calls it humility; naming opens the room.</td><td>Okta close at the fire, direct to viewer; the small locked room pictured simply, then its door opening.</td><td>Static close. Full pause after the aphorism.</td><td>Okta, chunk 10. Text: Failure is the curriculum.</td></tr>
<tr><td><b>11</b></td><td>Practice - write the failure fully, in your own hand; underneath it, one line only: &ldquo;This taught me ___.&rdquo; Keep the second line only.</td><td>A hand writing by firelight; the page folded away; one small line kept, slipped into a pocket.</td><td>Gentle push-in on the writing; hold on the kept line.</td><td>Okta, chunk 11. Text: Keep the second line only.</td></tr>
<tr><td><b>12</b></td><td>Payoff / bridge - naming returns them to action; walk back into your life carrying one line instead of a ledger; bridge to the half-step question.</td><td>Okta rises from the fire, bell at the bridge; the path ahead in last light.</td><td>Slow pull-back. Bell at the bridge. No hard goodbye.</td><td>Okta, chunk 12. Text: Naming returns you to action.</td></tr>
</table>
<p class="small">Payoff placement: Scene 12 lands at 70-85% of total runtime when timed in the edit, with the bridge carrying the remaining time - never a hard cut to black on the last line.</p>
{FOOT.format(n=8)}
</section>
""")

PAGES.append(f"""
<section class="page">
<div class="eyebrow">Posting Package &middot; Processing Status</div>
<h2>Ready to post - when the episode is produced</h2>
<p><b>Long title:</b> The Sitting of Failures | First in Consciousness</p>
<p><b>Channels:</b> YouTube - Estiban Creations &middot; Instagram - Master_Your_Thinking</p>
<p class="small">No posting day or time is set for this episode.</p>
<div class="thumbs">
<div class="wide"><img src="{THUMB}"><p class="small"><b>Main thumbnail</b> - speech4-thumbnail-main. Original Okta artwork. Text verified: FAILURE IS CURRICULUM.</p></div>
<div class="tall"><img src="{SHORT}"><p class="small"><b>Short cover</b> - speech4-short-cover. Original Okta artwork. Text verified: THIS TAUGHT ME.</p></div>
</div>
<h3>Short - 45-60 second beat sheet</h3>
<ul>
<li><b>Hook (0-8 sec):</b> &ldquo;Before I teach you about failure, let me sit with one of mine.&rdquo;</li>
<li><b>Aphorism:</b> &ldquo;Failure is the curriculum.&rdquo;</li>
<li><b>Practice:</b> Write the failure fully, then keep one line only - &ldquo;This taught me ___.&rdquo;</li>
<li><b>Bridge:</b> Next, Speech 5 - the Current cannot carry half of you.</li>
</ul>
<h3>Description</h3>
<p>Early in her walking, Okta promised to guide a party of travellers through a high pass before winter. The signs said turn back, and pride - dressed up as keeping her word - pressed on anyway. Caught by a storm on the ridge, she apologised without excuse, walked them back the long way, and then carried the shame in silence for years, until an old walker at a fire told her what a teacher owes her students: mastery and folly, failure most of all.</p>
<p>Tonight's practice is one page and one line. Write the failure fully, in your own hand, with no softening and no audience. Underneath it write a single line - &ldquo;This taught me ___.&rdquo; - then keep the second line only. Keep the lesson. Release the ledger.</p>
<p>Next week: The Current Cannot Carry Half of You</p>
<p>First in Consciousness - a weekly VisionWeaver series with Okta, Who Walks It All.</p>
<p class="tag"><b>Tags:</b> #FirstInConsciousness #Okta #Failure #Resilience #Shame #Growth #Mindfulness #WiseWords #SelfCompassion #LessonsLearned</p>
<h3>Processing status</h3>
<p><span class="status-done">DONE</span> Script draft, standards mapping, 12-scene map, posting package, thumbnails - this file.</p>
<p><span class="status-next">NEXT</span> Script approval, then renders, voice, edit, and QC when funding returns.</p>
<p><span class="status-not">NOT DONE</span> No render, no recording, nothing published for this episode. Writing, images, and files only.</p>
{FOOT.format(n=9)}
</section>
""")

html = "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><title>Speech 4 Production Package - First in Consciousness</title><style>" + CSS + "</style></head><body>" + "".join(PAGES) + "</body></html>"
# Restore em dashes inside the verbatim script and quoted lines
html = html.replace("pressed on anyway - not because", "pressed on anyway &mdash; not because")
html = html.replace("learn it the way I did - alone", "learn it the way I did &mdash; alone")
html = html.replace("mastery and folly - failure most of all", "mastery and folly &mdash; failure most of all")
html = html.replace("one line instead of a ledger - and then", "one line instead of a ledger &mdash; and then")
html = html.replace("keep one line only - &ldquo;This taught", "keep one line only: &ldquo;This taught")
html = html.replace("pride - dressed up as keeping her word - pressed", "pride &mdash; dressed up as keeping her word &mdash; pressed")
html = html.replace("single line - &ldquo;This taught me ___.&rdquo; - then keep", "single line &mdash; &ldquo;This taught me ___.&rdquo; &mdash; then keep")
(BASE / "index.html").write_text(html, encoding="utf-8")
print("pages:", len(PAGES), "html bytes:", len(html))
