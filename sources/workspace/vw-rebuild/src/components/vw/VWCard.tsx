import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { VWImage } from "./VWImage";

// VWCard: a VisionWeaver feature card — a photo on top, an icon + title,
// a description, and an arrow. Matches the home-dashboard cards in the
// owner's VisionWeaver Prime screenshots.
export function VWCard({
  image,
  icon: Icon,
  title,
  desc,
  to,
}: {
  image: string;
  icon: any;
  title: string;
  desc: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="panel group block overflow-hidden p-0 transition hover:border-[color:var(--neon-violet)]/50"
    >
      <VWImage src={image} alt={title} className="aspect-[16/9] w-full" />
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-[color:var(--neon-violet)]" />
          <h3 className="text-sm font-semibold">{title}</h3>
          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[color:var(--neon-violet)]" />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
}
