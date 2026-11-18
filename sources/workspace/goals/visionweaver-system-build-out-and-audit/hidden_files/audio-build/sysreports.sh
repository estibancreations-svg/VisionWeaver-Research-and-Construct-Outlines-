#!/bin/bash
set -e
R=~/workspace/goals/visionweaver-system-build-out-and-audit/files/system-reports
W=~/workspace/goals/visionweaver-system-build-out-and-audit/hidden_files/audio-build
for md in "$R"/system-*.md; do
  base=$(basename "$md" .md)
  # strip markdown heading markers only; all words stay identical
  sed -e 's/^#\+ //' -e 's/\*\*//g' -e 's/`//g' "$md" > "$W/$base-speech.txt"
  python3 - "$W/$base-speech.txt" "$W" "$base" << 'PYEOF'
import re, sys
txt = open(sys.argv[1]).read()
text = re.sub(r'\s+', ' ', txt)
sents = re.split(r'(?<=[.!?])\s+', text)
chunks, cur = [], ''
for s in sents:
    if len(cur.split()) + len(s.split()) > 950 and cur:
        chunks.append(cur); cur = s
    else:
        cur = (cur + ' ' + s).strip()
if cur: chunks.append(cur)
for i, c in enumerate(chunks, 1):
    open(f'{sys.argv[2]}/{sys.argv[3]}-part{i:02d}.txt', 'w').write(c)
print(sys.argv[3], 'parts:', len(chunks), 'words:', len(text.split()))
PYEOF
  > "$W/$base-parts.txt"
  for part in "$W/$base-part"*.txt; do
    n=$(basename "$part" .txt)
    /opt/hatch/bin/tts speak --voice avocado_v2:MAI_01 --timeout-secs 600 --text-stdin --output "$W/$n.mp3" < "$part" > /dev/null
    echo "file '$W/$n.mp3'" >> "$W/$base-parts.txt"
    echo "done $n"
  done
  # concat: parts.txt holds the list after the first line; rebuild clean list
  grep "^file " "$W/$base-parts.txt" > "$W/$base-list.txt"
  ffmpeg -v error -y -f concat -safe 0 -i "$W/$base-list.txt" -c:a libmp3lame -q:a 3 "$R/$base-audio.mp3"
  ffprobe -v error -show_entries format=duration -of csv=p=0 "$R/$base-audio.mp3"
  echo "finished $base"
done
