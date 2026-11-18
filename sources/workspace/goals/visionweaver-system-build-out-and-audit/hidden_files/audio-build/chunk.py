import re, os
raw = open('/tmp/report.txt', encoding='utf-8', errors='replace').read()
lines = []
for l in raw.split('\n'):
    s = l.strip()
    if not s: continue
    if 'Review only — no rebuild authorized' in s: continue
    if re.match(r'^V I S I O N W E AV E R', s): continue
    if s in ('DIRECT AND CLEAR',) or re.match(r'^DIRECT AND CLEAR\s+NO REBUILD', s): continue
    if re.match(r'^\d+$', s): continue  # standalone page numbers
    lines.append(s)
# join wrapped lines: pdftotext -layout keeps paragraphs as multiple lines; join lines that don't end with terminal punctuation into next line, but keep headings separate
text = ' '.join(lines)
text = re.sub(r'\s+', ' ', text)
# restore sentence spacing already single; split into sentences
sentences = re.split(r'(?<=[.!?])\s+', text)
chunks, cur = [], ''
for s in sentences:
    if len(cur.split()) + len(s.split()) > 950 and cur:
        chunks.append(cur); cur = s
    else:
        cur = (cur + ' ' + s).strip()
if cur: chunks.append(cur)
outdir = os.path.expanduser('~/workspace/goals/visionweaver-system-build-out-and-audit/hidden_files/audio-build')
for i, c in enumerate(chunks, 1):
    open(f'{outdir}/chunk-{i:02d}.txt', 'w').write(c)
print('chunks:', len(chunks), 'words:', len(text.split()))
for i, c in enumerate(chunks, 1):
    print(i, len(c.split()), 'words |', c[:80])
