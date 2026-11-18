import { useState } from "react";
import { resolveVWImage } from "@/lib/vw-images";

// VWImage: a photo slot from the VisionWeaver Prime asset set.
// A "/vw/<name>.jpg" src is resolved through the embedded Prime assets
// (src/lib/vw-images.ts) — the real photos from the VisionWeaver-Prime
// repo. If the image is missing or fails to load, a navy/purple gradient
// shows instead — never a broken-image icon, never a generated photo.
export function VWImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveVWImage(src);
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#1b1440] via-[#241a4d] to-[#0b1e3a] ${className}`}
    >
      {!failed && (
        <img
          src={resolved}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
          loading="lazy"
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center px-3 text-center text-[11px] uppercase tracking-widest text-white/50">
          {alt}
        </div>
      )}
    </div>
  );
}
