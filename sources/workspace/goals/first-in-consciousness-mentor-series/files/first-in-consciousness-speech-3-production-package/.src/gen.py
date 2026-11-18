import base64, pathlib
SRC = pathlib.Path(__file__).parent
def uri(name):
    data = base64.b64encode((SRC/'media'/name).read_bytes()).decode()
    return f"data:image/jpeg;base64,{data}"
HERO = uri('speech3-aelune-hero.jpg')
THUMB = uri('speech3-thumbnail-main.jpg')
SHORT = uri('speech3-short-cover.jpg')

CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
body { margin:0; font-family:'Liberation Sans','Noto Sans',sans-serif; color:#241b33; background:#fff; }
.page { min-height:297mm; padding:18mm 17mm 16mm; position:relative; background:#fdfaf4; page-break-after:always; }
.page:last-child { page-break-after:auto; }
.eyebrow { font-size:8.5pt; letter-spacing:2.6px; color:#7a5fc0; font-weight:700; text-transform:uppercase; margin-bottom:5mm; }
h1 { font-family:'Noto Serif',serif; font-size:27pt; line-height:1.12; color:#1d1233; margin:0 0 4mm; }
h2 { font-family:'Noto Serif',serif; font-size:19pt; line-height:1.2; color:#1d1233; margin:0 0 4mm; }
h3 { font-family:'Noto Serif',serif; font-size:13pt; color:#3a2566; margin:5mm 0 2mm; }
p { font-size:10.5pt; line-height:1.55; margin:0 0 3.2mm; }
.lede { font-size:12pt; line-height:1.55; color:#453659; }
.script p { font-family:'Noto Serif',serif; font-size:11pt; line-height:1.62; }
.quote { font-family:'Noto Serif',serif; font-size:14pt; line-height:1.45; color:#3a2566; border-left:3px solid #c9a227; padding-left:5mm; margin:4mm 0; }
img.hero { width:100%; max-height:39mm; object-fit:cover; object-position:50% 18%; border-radius:3mm; }
figure { margin:0 0 4mm; } figcaption { font-size:9pt; color:#6b5b8a; line-height:1.45; margin-top:2mm; }
.grid { display:grid; grid-template-columns:1fr 1fr; gap:4mm 7mm; }
.kv { border-top:1.5px solid #d9cfe9; padding-top:2.2mm; }
.kv b { display:block; font-size:8.5pt; letter-spacing:1.4px; text-transform:uppercase; color:#7a5fc0; margin-bottom:1mm; }
.kv span { font-size:10.5pt; line-height:1.45; }
.status { background:#1d1233; color:#f3edff; border-radius:3mm; padding:4mm 5mm; margin-top:4mm; }
.status b { color:#e8c96a; } .status p { color:#f3edff; margin-bottom:2mm; }
.note { background:#efe9fa; border-radius:2.5mm; padding:4mm 5mm; margin:4mm 0; }
.note p { margin-bottom:1.5mm; font-size:10pt; }
table { width:100%; border-collapse:collapse; font-size:9.3pt; line-height:1.4; }
th { text-align:left; font-size:8.3pt; letter-spacing:1px; text-transform:uppercase; color:#7a5fc0; border-bottom:2px solid #c9a227; padding:1.8mm 2mm; }
td { border-bottom:1px solid #ddd2ef; padding:2.2mm 2mm; vertical-align:top; }
td.n { font-weight:700; color:#3a2566; white-space:nowrap; }
ul { margin:0 0 3mm; padding-left:5mm; } li { font-size:10.5pt; line-height:1.5; margin-bottom:1.6mm; }
.small { font-size:9.5pt; color:#5d4d7d; line-height:1.5; }
.foot { position:absolute; bottom:10mm; left:17mm; right:17mm; display:flex; justify-content:space-between; font-size:8.5pt; color:#8a7aa8; border-top:1px solid #e2d9f2; padding-top:2mm; }
.tag { font-size:10pt; line-height:1.7; color:#3a2566; }
.thumbs { display:grid; grid-template-columns:1.55fr 1fr; gap:5mm; align-items:start; }
.thumbs img { width:100%; object-fit:contain; border-radius:2mm; }
.thumbs .wide img { max-height:23mm; } .thumbs .tall img { max-height:28mm; }
"""

def foot(n):
    return f'<div class="foot"><span>First in Consciousness - Speech 3 Production Package</span><span>Page {n}</span></div>'

pages = []

# Page 1 - cover
pages.append(f"""
<section class="page">
<div class="eyebrow">VisionWeaver &middot; First in Consciousness &middot; Weekly Series</div>
<h1>Hold the Hand,<br>Not the Riverbank</h1>
<p class="lede">Speech 3 production package. The full script draft, pulled together with the Crossroads production standards mapped to every scene - flow, voices, motion, sound, and posting - so this episode can be produced, checked, and published the same way as everything else in VisionWeaver.</p>
<figure><img class="hero" src="{HERO}" alt="Aelune, Keeper of the Night Shelf, in her observatory at night, lantern light on her star-chart shawl">
<figcaption>Aelune, Keeper of the Night Shelf - lead for Speech 3: lavender-grey skin, glowing violet vein patterns, feathery antennae, pale-gold eyes, dark blue shawl with silver star charts. Her locked portrait is the single continuity reference for every scene.</figcaption></figure>
<h3>Episode at a glance</h3>
<div class="grid">
<div class="kv"><b>Series</b><span>First in Consciousness</span></div>
<div class="kv"><b>Lead</b><span>Aelune, Keeper of the Night Shelf</span></div>
<div class="kv"><b>Episode</b><span>Speech 3 - Guinan mode: listening, reflective, the student decides</span></div>
<div class="kv"><b>Second character</b><span>The parent (second voice)</span></div>
<div class="kv"><b>Format</b><span>6-12 min teaching + 45-60 sec Short</span></div>
<div class="kv"><b>Setting</b><span>The Night Shelf observatory at night - lantern light, star charts</span></div>
<div class="kv"><b>Before</b><span>Speech 2 - &ldquo;Hurry Is Fear With Its Shoes On&rdquo;</span></div>
<div class="kv"><b>After</b><span>Speech 4 - &ldquo;The Sitting of Failures&rdquo;</span></div>
</div>
<div class="status"><p><b>DONE</b> &nbsp;This script draft, Crossroads standards mapping, 12-scene map, posting package, thumbnail artwork.</p>
<p><b>NEXT</b> &nbsp;Script approval, then scene work when funding returns.</p>
<p><b>NOT DONE</b> &nbsp;Nothing is rendered, recorded, or published for this episode. This sprint is writing, images, and files only.</p></div>
<p class="small" style="margin-top:3mm">How to use this file: produce scenes in scene-map order (pages 7-8), follow the standards mapping (page 6), record narration in chunks of 30 seconds or less, and do not publish until the QC preview passes.</p>
{foot(1)}
</section>""")

# Page 2 - script hook + story 1
pages.append(f"""
<section class="page">
<div class="eyebrow">Script Draft &middot; Speech 3</div>
<h2>The script is the source - these words do not change in production</h2>
<p class="small">Speaker is Aelune throughout, telling the parent's story. In Guinan mode she listens first, reflects back what she heard, asks one reframing question, and lets the student decide. Pauses after punch lines are part of the script.</p>
<h3>Hook</h3>
<div class="quote">&ldquo;Loving someone and needing them to never change are two different things.&rdquo;</div>
<h3>Story - a book of calls</h3>
<div class="script">
<p>A parent climbed to my shelf after dark, carrying a ledger no one had asked her to keep. Not a book of money. A book of calls. How many this week. How many last week. How long each one lasted.</p>
<p>Her grown child had moved to a new city, changed work, changed what she believed about a great many things, and stopped calling every day. So the parent did what frightened love so often does: she held tighter. More messages. More advice. More reminders of how it used to be, told fondly, told often, told like a rope.</p>
<p>And the child, feeling the rope, pulled further away.</p>
</div>
<div class="note"><p><b>Delivery note.</b> The hook is one shot and one breath - Aelune alone, lantern light, before any story begins. The ledger is never mocked. It is carried the way grief is carried: carefully, and a little too tightly.</p></div>
{foot(2)}
</section>""")

# Page 3 - story 2
pages.append(f"""
<section class="page">
<div class="eyebrow">Script Draft, Continued &middot; Speech 3</div>
<h2>Tea, silence, and one question she does not answer</h2>
<div class="script">
<p>I did not correct her. I poured tea. I let the silences sit where they fell. I listened the way night listens - without interrupting the stars to ask them to hurry.</p>
<p>And after a long while, I gave her back only what I had heard. &ldquo;You miss the child who needed you every day.&rdquo; She wept then, quietly, the way people weep when they are finally understood instead of advised.</p>
<p>Then I asked her one question, and I did not answer it for her. &ldquo;When you hold your child's hand,&rdquo; I said, &ldquo;whose hand are you holding - today's, or yesterday's?&rdquo;</p>
</div>
<div class="note"><p><b>Delivery notes for this section.</b></p>
<p>Nothing is fixed in this beat. Tea is poured, silences are allowed to sit, and the reflection is given back in the parent's own terms.</p>
<p>Hold a full pause after &ldquo;understood instead of advised.&rdquo; It is the moment the story turns.</p>
<p>The question is asked once, plainly, and left open. Aelune does not answer it, soften it, or explain it.</p></div>
{foot(3)}
</section>""")

# Page 4 - reframe
pages.append(f"""
<section class="page">
<div class="eyebrow">Script Draft, Continued &middot; Speech 3</div>
<h2>Possession freezes. Compassion accompanies.</h2>
<h3>Reframe</h3>
<div class="script">
<p>Hear me, gently. Possession freezes. Compassion accompanies. Attachment is love that insists the river stay still so it can be photographed. Compassion is love that walks beside a moving river and is glad the water is alive.</p>
<p>And attachment is not only about people. It is also about how it should have gone - the past version you rehearsed, the plan that never happened, the child who stayed seven years old forever in your mind. None of those can be held, because none of those are here.</p>
<p>What is here is a grown person, changing, who still loves you - and who can feel, down the line, whether your hand is open or closed. Love gets lighter when it stops gripping. The hand opens. And an open hand is the only hand another hand can choose to stay in.</p>
</div>
<div class="note"><p><b>Delivery note.</b> &ldquo;Possession freezes. Compassion accompanies.&rdquo; is the aphorism of the episode - it also carries the Short. Give each half its own beat, and let the river images stay unhurried.</p></div>
{foot(4)}
</section>""")

# Page 5 - practice + payoff
pages.append(f"""
<section class="page">
<div class="eyebrow">Script Draft, Continued &middot; Speech 3</div>
<h2>One sentence, said out loud - then lighter hands</h2>
<h3>Practice</h3>
<div class="script">
<p>So today, one sentence. One sentence of blessing for a change you did not choose, said out loud. Not thought. Said. &ldquo;I bless your new city, even though I miss you.&rdquo; &ldquo;I bless the path I did not pick for you.&rdquo; &ldquo;I bless the person you are becoming, even while I grieve the person you were.&rdquo;</p>
<p>Say it to the empty room if you must. Say it to them if you can. The sentence does not approve everything. It releases your grip on the one thing you were never holding - the past.</p>
</div>
<h3>Payoff / bridge</h3>
<div class="script">
<p>Love gets lighter when it stops gripping. And here is the quiet second gift: lighter hands fail softer. When love stops demanding that everything stay the same, a failure stops being a verdict and starts being a lesson. That is next week's teaching: the sitting of failures, and why a teacher tells her own first.</p>
</div>
<div class="note"><p><b>Delivery notes for this section.</b></p>
<p>Each blessing sentence is spoken as its own example, not a list to rush. The viewer should be able to hear their own sentence forming.</p>
<p>The bridge is an opening, never a hard goodbye: it names Speech 4, &ldquo;The Sitting of Failures,&rdquo; and leaves the door open.</p></div>
{foot(5)}
</section>""")

# Page 6 - standards
pages.append(f"""
<section class="page">
<div class="eyebrow">Crossroads Standards Mapping &middot; Speech 3</div>
<h2>Every choice maps to the Crossroads standard</h2>
<h3>Pipeline order</h3>
<p>Avatar Engineering &rarr; Worlds &amp; Locations &rarr; Books &amp; script &rarr; Locks &amp; maps &rarr; Cast &amp; avatars &rarr; Shot bible &rarr; Pictures &rarr; Motion &rarr; Narration booth &rarr; Sound &amp; music &rarr; Edit &rarr; Deliver &rarr; Publish &amp; social.</p>
<div class="grid">
<div><h3>Continuity</h3><p>Aelune's locked portrait is the single reference for every scene: lavender-grey skin, glowing violet vein patterns, feathery antennae, pale-gold eyes, dark blue shawl embroidered with silver star charts. The Night Shelf stays one place - observatory, lantern light, star charts - all night.</p></div>
<div><h3>Conversation flow</h3><p>Guinan mode: listen first, reflect back, ask one reframing question, let the student decide. Short lines, pauses after punch lines, no lecturing. Aelune never corrects the parent and never answers her own question.</p></div>
<div><h3>Voices</h3><p>Aelune has one distinct cast voice; the parent is a second voice. Narration is recorded in chunks of 30 seconds or less. Captions are Whisper-class ASR captions, checked against the script.</p></div>
<div><h3>Motion</h3><p>Visual change every 8-15 seconds. Hook under 8 seconds. A pacing reset every 30-60 seconds. Payoff lands at 70-85% of runtime. The bridge outro is never a hard goodbye.</p></div>
<div><h3>Sound</h3><p>Music sits 9-12 dB under the voice. Soft night ambience throughout the Night Shelf scenes: quiet room tone, a kettle, distant night air. Nothing competes with the silences - the silences are scripted.</p></div>
<div><h3>Render and QC</h3><p>Gen-4.5 / Act-Two-class workflow when funding returns, tracked by cost per finished second. Preview, verify against this package, then publish. No step is skipped because the script is approved.</p></div>
</div>
<div class="status"><p><b>STATUS</b> &nbsp;Writing, images, and files only for this episode right now - no render, no recording, nothing published. Billing remains on hold until funding comes in.</p></div>
{foot(6)}
</section>""")

SCENES_A = [
("1. Hook","Hook line, verbatim.","Aelune single shot at the Night Shelf, lantern light, star charts behind her.","Locked close shot; no movement but lantern flicker.","Chunk 1, under 30 sec.","Two different things."),
("2. The climb","Story: a parent climbed after dark, carrying a ledger - a book of calls.","Parent climbs to the shelf after dark, ledger held tight in both hands.","Slow follow up the steps; settle as she arrives.","Chunk 2, under 30 sec.","A book of calls."),
("3. The changes","Story: the grown child moved, changed work and beliefs, stopped calling every day.","Gentle montage: new city, new work, a phone that rings less often.","Slow cuts, one change per beat; nothing played for blame.","Chunk 3, under 30 sec.","She changed."),
("4. Holding tighter","Story: more messages, more advice, reminders told like a rope.","Parent sending, advising, reminding - fondly, often, tightly.","Closer framing with each beat; the rope image builds quietly.","Chunk 4, under 30 sec.","Held tighter."),
("5. Pulling away","Story: the child, feeling the rope, pulled further away.","Child distant; the rope between them drawn taut.","One slow widening shot; distance does the acting.","Chunk 5, under 30 sec.","The rope."),
("6. Tea and silence","Story: Aelune pours tea, lets silences sit, listens the way night listens.","Tea poured at the shelf; both women seated; stars through the observatory glass.","Held two-shot; camera rests while the silence rests.","Chunk 6, under 30 sec, with real pauses.","Night listens."),
]
SCENES_B = [
("7. Reflection","Story: &ldquo;You miss the child who needed you every day.&rdquo; The parent weeps.","Aelune reflects back only what she heard; parent weeps quietly.","Slow push-in on the parent; Aelune stays still.","Chunk 7, under 30 sec.","Understood, not advised."),
("8. The question","Story: &ldquo;Whose hand are you holding - today's, or yesterday's?&rdquo; Unanswered.","Aelune asks once, plainly; the parent looks at her own hands.","Locked shot; the question hangs - no cutaway rescue.","Chunk 8, under 30 sec.","Whose hand are you holding - today's, or yesterday's?"),
("9. Reframe","Reframe: possession freezes; compassion accompanies; the river still vs the river moving.","Frozen photograph of a river beside the same river alive and moving; walking beside it.","Two matched images, then a walking shot at river pace.","Chunks 9-10, each under 30 sec.","Possession freezes. Compassion accompanies."),
("10. How it should have gone","Reframe: attachment to the past version rehearsed, the plan that never happened.","An empty chair, an old plan on the shelf, a child remembered at seven.","Gentle, unfocused memory framing; return to the present room.","Chunk 11, under 30 sec.","Not here."),
("11. Practice","Practice: one sentence of blessing for a change you did not choose, said out loud; the three examples.","Aelune speaks each example; the words appear as she says them.","Locked medium shot; examples arrive one at a time.","Chunks 12-13, each under 30 sec.","Say it out loud."),
("12. Payoff / bridge","Payoff: love gets lighter when it stops gripping; lighter hands fail softer; bridge to Speech 4.","An open hand, palm up, in lantern light; night deepening kindly over the shelf.","Slow pull-back; outro opens forward, never a hard goodbye.","Chunk 14, under 30 sec.","Lighter hands fail softer."),
]
def scene_table(rows):
    body = "".join(f'<tr><td class="n">{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td><td>{f}</td></tr>' for a,b,c,d,e,f in rows)
    return f'<table><tr><th>Scene</th><th>Script lines</th><th>Visual</th><th>Camera / motion</th><th>Voice</th><th>On-screen text</th></tr>{body}</table>'

pages.append(f"""
<section class="page">
<div class="eyebrow">Scene Map, 1 of 2 &middot; Speech 3</div>
<h2>Scenes 1-6: the ledger, the rope, and the listening</h2>
{scene_table(SCENES_A)}
<p class="small" style="margin-top:4mm">Every voice chunk is 30 seconds or less. Visual change lands every 8-15 seconds inside each scene, and the hook (Scene 1) completes in under 8 seconds.</p>
{foot(7)}
</section>""")

pages.append(f"""
<section class="page">
<div class="eyebrow">Scene Map, 2 of 2 &middot; Speech 3</div>
<h2>Scenes 7-12: the question, the open hand, the bridge</h2>
{scene_table(SCENES_B)}
<p class="small" style="margin-top:4mm">The payoff (Scene 12) is timed to land at 70-85% of the finished runtime. The bridge names Speech 4, &ldquo;The Sitting of Failures,&rdquo; and closes as an opening, not a goodbye.</p>
{foot(8)}
</section>""")

# Page 9 - posting
pages.append(f"""
<section class="page">
<div class="eyebrow">Posting Package &middot; Speech 3</div>
<h2>Ready to post the moment the finished video exists</h2>
<div class="grid">
<div><h3>Long video - YouTube, Estiban Creations</h3>
<p><b>Title:</b> Hold the Hand, Not the Riverbank | First in Consciousness</p>
<p><b>Description:</b></p>
<p>A parent climbs to the Night Shelf after dark carrying a ledger no one asked her to keep - a book of calls, counted week by week, as her grown child moves to a new city, changes her work and her beliefs, and stops calling every day. Aelune does not correct her. She pours tea, listens the way night listens, and asks one question: whose hand are you holding - today's, or yesterday's?</p>
<p>Speech 3 is a practice in love without gripping: one sentence of blessing, said out loud, for a change you did not choose. Say it to the empty room if you must. Say it to them if you can. The sentence does not approve everything - it releases a grip on the one thing no one was ever holding: the past.</p>
<p>Next week: The Sitting of Failures.</p>
<p class="small">First in Consciousness - a weekly VisionWeaver series of original mentor teachings with Aelune and Okta.</p></div>
<div><h3>Short - 45-60 seconds</h3>
<ul>
<li><b>Hook:</b> &ldquo;Loving someone and needing them to never change are two different things.&rdquo;</li>
<li><b>Aphorism:</b> &ldquo;Possession freezes. Compassion accompanies.&rdquo;</li>
<li><b>Practice:</b> one spoken blessing sentence for a change you did not choose.</li>
<li><b>Bridge:</b> next week - The Sitting of Failures.</li>
</ul>
<h3>Channels</h3>
<p>YouTube: Estiban Creations<br>Instagram: Master_Your_Thinking</p>
<p class="small">No posting day or time is set for this episode.</p><h3>Tags and hashtags</h3>
<p class="tag">#FirstInConsciousness #Aelune #LettingGo #Compassion #Attachment #Parenting #Relationships #Mindfulness #WiseWords #LoveWithoutGripping</p></div>
</div>
<h3>Thumbnail artwork - text verified</h3>
<div class="thumbs">
<figure class="wide"><img src="{THUMB}" alt="Speech 3 main thumbnail: Aelune reaching an open hand forward, with the words HOLD THE HAND"><figcaption><b>speech3-thumbnail-main</b> - &ldquo;HOLD THE HAND&rdquo; (16:9, YouTube).</figcaption></figure>
<figure class="tall"><img src="{SHORT}" alt="Speech 3 Short cover: Aelune standing by a river at night with open hands, with the words LOVE WITHOUT GRIPPING"><figcaption><b>speech3-short-cover</b> - &ldquo;LOVE WITHOUT GRIPPING&rdquo; (vertical, Short).</figcaption></figure>
</div>
<div class="status"><p><b>HONEST STATUS</b> &nbsp;No video has been rendered, no voice recorded, and nothing has been published for Speech 3. This package - script draft, standards mapping, scene map, posting copy, and thumbnail artwork - is complete and ready to produce from when funding returns.</p></div>
{foot(9)}
</section>""")

html = "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><title>Speech 3 Production Package - First in Consciousness</title><style>" + CSS + "</style></head><body>" + "".join(pages) + "</body></html>"
(SRC/'index.html').write_text(html)
print("pages:", len(pages), "html bytes:", len(html))
