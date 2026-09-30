import { createFileRoute } from "@tanstack/react-router";
import { Flame, Info } from "lucide-react";
import { Page } from "@/components/bottom-nav";
import { achievements } from "@/lib/data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Your rescue impact — RESQ" },
      {
        name: "description",
        content: "See how much food, money and CO₂e your rescues have saved.",
      },
      { property: "og:title", content: "Your rescue impact — RESQ" },
      {
        property: "og:description",
        content: "See how much food, money and CO₂e your rescues have saved.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImpactPage,
});

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function ImpactPage() {
  const { impact } = useApp();
  const max = Math.max(...impact.weekly, 1);

  const stats = [
    { value: `₹${impact.moneySaved.toLocaleString("en-IN")}`, label: "Money saved", estimate: false },
    { value: String(impact.rescues), label: "Food rescues", estimate: false },
    { value: `${impact.foodDivertedKg} kg`, label: "Food diverted", estimate: true },
    { value: `${impact.co2eAvoidedKg} kg`, label: "CO₂e avoided", estimate: true },
  ];

  return (
    <Page>
      <header className="px-5 pt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">This month</p>
        <h1 className="mt-1 text-xl font-extrabold tracking-tight">Your Rescue Impact</h1>
      </header>

      <div className="mx-5 mt-5 flex items-center gap-3 rounded-3xl bg-foreground p-4 text-background shadow-lift">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-xl">
          🔥
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold">{impact.streakDays} day rescue streak</p>
          <p className="text-xs font-medium opacity-70">Keep it alive — rescue again today.</p>
        </div>
        <Flame className="h-5 w-5 shrink-0 text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pt-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl bg-card p-4 shadow-card">
            <p className="text-2xl font-extrabold tracking-tight text-primary">{s.value}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
              {s.label}
              {s.estimate && <Info className="h-3 w-3" />}
            </p>
          </div>
        ))}
      </div>
      <p className="px-5 pt-2 text-[11px] font-medium text-muted-foreground">
        Environmental figures are estimates based on average rescue weight and emission factors.
      </p>

      <section className="px-5 pt-6">
        <h2 className="text-base font-extrabold">Activity this week</h2>
        <div className="mt-3 flex h-36 items-end justify-between gap-2 rounded-3xl bg-card p-5 shadow-card">
          {impact.weekly.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground">{v}</span>
              <div
                className={`w-full max-w-7 rounded-full ${i === impact.weekly.length - 1 ? "bg-primary" : "bg-secondary"}`}
                style={{ height: `${Math.max(8, (v / max) * 72)}px` }}
              />
              <span className="text-[10px] font-bold text-muted-foreground">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <h2 className="text-base font-extrabold">Badges</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`flex flex-col items-center gap-1.5 rounded-3xl p-4 text-center shadow-card ${
                a.unlocked ? "bg-card" : "bg-muted opacity-50"
              }`}
            >
              <span className={`text-2xl ${a.unlocked ? "" : "grayscale"}`}>{a.icon}</span>
              <span className="text-[11px] font-bold leading-tight">{a.name}</span>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
