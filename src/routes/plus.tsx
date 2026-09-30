import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BellRing, Bot, ChartColumn, Sparkles, X, Zap, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { PLUS_PLANS, type PremiumPlan } from "@/lib/premium";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/plus")({
  head: () => ({
    meta: [
      { title: "RESQ Plus — Rescue more. Miss less." },
      {
        name: "description",
        content: "Get first dibs on drops, smart alerts and advanced filters with RESQ Plus.",
      },
      { property: "og:title", content: "RESQ Plus — Rescue more. Miss less." },
      {
        property: "og:description",
        content: "Get first dibs on drops, smart alerts and advanced filters with RESQ Plus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlusPage,
});

const BENEFITS = [
  {
    icon: Zap,
    title: "FIRST DIBS",
    body: "See new surplus drops before free users.",
  },
  {
    icon: BellRing,
    title: "SMART DROP ALERTS",
    body: "Get notified when favorite vendors post matching food.",
  },
  {
    icon: SlidersHorizontal,
    title: "ADVANCED FILTERS",
    body: "Dietary preferences, price, radius and vendor preferences.",
  },
  {
    icon: Bot,
    title: "AUTO-RESERVE",
    body: "Automatically reserve matching drops according to saved preferences.",
  },
  {
    icon: ChartColumn,
    title: "ADVANCED IMPACT",
    body: "See deeper rescue and savings analytics.",
  },
];

function PlusPage() {
  const navigate = useNavigate();
  const { isPremium, entitlement, subscribePlus, cancelPlus } = useApp();
  const [plan, setPlan] = useState<PremiumPlan>("annual");

  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-5 pb-10 pt-6">
      <div className="flex justify-end">
        <button
          onClick={() => navigate({ to: "/" })}
          aria-label="Close"
          className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-card"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-2 text-center">
        <span className="inline-grid h-16 w-16 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-lift">
          <Sparkles className="h-8 w-8" />
        </span>
        <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.25em] text-primary">
          RESQ Plus
        </p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
          Rescue more.
          <br />
          Miss less.
        </h1>
      </div>

      <div className="mt-7 space-y-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="flex gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ember-soft text-primary">
              <b.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-extrabold tracking-wide">{b.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </div>
          </div>
        ))}
      </div>

      {isPremium ? (
        <div className="mt-8 rounded-3xl bg-card p-5 text-center shadow-card">
          <p className="text-sm font-extrabold text-leaf">
            RESQ Plus is active ({entitlement.plan === "annual" ? "Annual" : "Monthly"})
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            First dibs, alerts and advanced filters are unlocked.
          </p>
          <button
            onClick={cancelPlus}
            className="mt-4 text-xs font-bold text-muted-foreground underline"
          >
            Cancel subscription (demo)
          </button>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {(Object.keys(PLUS_PLANS) as PremiumPlan[]).map((p) => {
              const info = PLUS_PLANS[p];
              const active = plan === p;
              return (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`relative rounded-3xl border-2 bg-card p-4 text-left transition-colors ${
                    active ? "border-primary shadow-lift" : "border-transparent shadow-card"
                  }`}
                >
                  {info.note && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold text-primary-foreground">
                      {info.note}
                    </span>
                  )}
                  <p className="text-xs font-bold capitalize text-muted-foreground">{p}</p>
                  <p className="mt-1 text-xl font-extrabold">
                    {info.price}
                    <span className="text-xs font-semibold text-muted-foreground">{info.per}</span>
                  </p>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => subscribePlus(plan)}
            className="mt-5 flex h-14 w-full items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground shadow-lift transition-transform active:scale-[0.98]"
          >
            Start RESQ Plus
          </button>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-3 w-full text-center text-sm font-bold text-muted-foreground"
          >
            Maybe later
          </button>
          <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
            Demo paywall — no billing yet. Ready to connect to RevenueCat entitlements.
          </p>
        </>
      )}
    </div>
  );
}
