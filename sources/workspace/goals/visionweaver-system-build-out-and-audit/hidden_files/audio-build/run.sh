#!/bin/bash
set -e
D=~/workspace/goals/visionweaver-system-build-out-and-audit/hidden_files/audio-build
OUT=~/workspace/goals/visionweaver-system-build-out-and-audit/files/visionweaver-directives-and-system-review/visionweaver-directives-and-system-review-audio.mp3
> "$D/parts.txt"
for f in "$D"/chunk-*.txt; do
  n=$(basename "$f" .txt)
  /opt/hatch/bin/tts speak --voice avocado_v2:MAI_01 --timeout-secs 600 --text-stdin --output "$D/$n.mp3" < "$f" > /dev/null
  echo "file '$D/$n.mp3'" >> "$D/parts.txt"
  echo "done $n"
done
ffmpeg -v error -y -f concat -safe 0 -i "$D/parts.txt" -c:a libmp3lame -q:a 3 "$OUT"
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$OUT"
ls -la "$OUT"
