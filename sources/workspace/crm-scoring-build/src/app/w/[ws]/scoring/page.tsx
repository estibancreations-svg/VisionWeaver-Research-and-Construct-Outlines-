import Link from "next/link";
import type { Metadata } from "next";
import { getWorkspace } from "@/lib/session";
import { Empty, PageHead } from "@/components/ui";
import { ActionForm, SubmitButton } from "@/components/forms";
import { recalculateScores, saveScoringRules } from "../scoring-actions";

export const metadata: Metadata = { title: "Scoring rules" };

export default async function Scoring({ params }: { params: Promise<{ ws: string }> }) {
  const { ws } = await params;
  const ctx = await getWorkspace(ws);
  const { data: rules } = await ctx.supabase.from("scoring_rules").select("id, signal, label, points, active").eq("workspace_id", ws).order("points", { ascending: false });

  return (
    <div className="stack-lg">
      <PageHead
        eyebrow={ctx.ws.name}
        title="Scoring rules"
        actions={
          <Link className="btn" href={`/w/${ws}/lists`}>
            Lists
          </Link>
        }
      />
      <p className="faint" style={{ margin: 0 }}>
        Every contact scores 0 to 100. Signals stack, and the total is capped at 100. Hot is 70 or more, warm is 40 to 69, cold is
        under 40. Scores update on their own when contacts, deals, messages, tasks, and appointments change.
      </p>

      {(rules ?? []).length === 0 ? (
        <div className="card">
          <Empty title="No rules yet">Rules are seeded for every sub-account. If this stays empty, tell the Owner.</Empty>
        </div>
      ) : (
        <section className="card stack">
          <ActionForm action={saveScoringRules.bind(null, ws)}>
            <ul className="plain-list">
              {(rules ?? []).map((r) => (
                <li key={r.id} className="spread">
                  <label style={{ fontWeight: 700 }}>
                    <input type="checkbox" name={`active_${r.id}`} defaultChecked={r.active} /> {r.label}
                  </label>
                  <label className="row" style={{ gap: 8, alignItems: "center" }}>
                    <span className="faint">Points</span>
                    <input className="input" type="number" name={`points_${r.id}`} min={-100} max={100} step={1} defaultValue={r.points} required style={{ width: 96 }} />
                  </label>
                </li>
              ))}
            </ul>
            {ctx.canWrite ? <SubmitButton pendingText="Saving…">Save rules and recalculate</SubmitButton> : null}
          </ActionForm>
        </section>
      )}

      {ctx.canWrite ? (
        <section className="card stack">
          <h2>Recalculate</h2>
          <p className="faint" style={{ margin: 0 }}>
            Scores normally stay current on their own. Recalculate if a score ever looks stale.
          </p>
          <ActionForm action={recalculateScores.bind(null, ws)}>
            <SubmitButton pendingText="Recalculating…">Recalculate all scores</SubmitButton>
          </ActionForm>
        </section>
      ) : null}
    </div>
  );
}
