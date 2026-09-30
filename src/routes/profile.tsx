import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  Heart,
  Leaf,
  Settings,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { Page } from "@/components/bottom-nav";
import { getVendor } from "@/lib/data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — RESQ" },
      { name: "description", content: "Manage your RESQ profile, vendors and preferences." },
      { property: "og:title", content: "Profile — RESQ" },
      { property: "og:description", content: "Manage your RESQ profile, vendors and preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const DIETARY = ["Vegetarian", "Vegan", "Jain", "Gluten-free", "Egg-free"];

function ProfilePage() {
  const navigate = useNavigate();
  const { favorites, isPremium, entitlement, setVendorMode } = useApp();
  const [alerts, setAlerts] = useState(true);
  const [dropAlerts, setDropAlerts] = useState(isPremium);
  const [diet, setDiet] = useState<string[]>(["Vegetarian"]);
  const [pickup, setPickup] = useState("Evening");

  return (
    <Page>
      <header className="flex items-center gap-4 px-5 pt-6">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground">
          MJ
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-extrabold tracking-tight">Muhammed Jishan</h1>
          <p className="text-sm font-medium text-muted-foreground">Bengaluru · Rescuer since 2026</p>
        </div>
      </header>

      <section className="px-5 pt-5">
        <Link
          to="/plus"
          className={`flex items-center gap-3 rounded-3xl p-4 shadow-lift ${
            isPremium ? "bg-foreground text-background" : "bg-card"
          }`}
        >
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${
              isPremium ? "bg-primary text-primary-foreground" : "bg-ember-soft text-primary"
            }`}
          >
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-extrabold">
              {isPremium
                ? `RESQ Plus · ${entitlement.plan === "annual" ? "Annual" : "Monthly"}`
                : "Upgrade to RESQ Plus"}
            </span>
            <span className={`block text-xs font-medium ${isPremium ? "opacity-70" : "text-muted-foreground"}`}>
              {isPremium ? "Thanks for supporting food rescue 💚" : "First dibs, alerts, auto-reserve"}
            </span>
          </span>
          <ChevronRight className={`h-4 w-4 shrink-0 ${isPremium ? "opacity-70" : "text-muted-foreground"}`} />
        </Link>
      </section>

      <section className="px-5 pt-6">
        <h2 className="text-base font-extrabold">Saved vendors</h2>
        <div className="mt-3 space-y-2.5">
          {favorites.map((id) => {
            const v = getVendor(id);
            return (
              <div key={id} className="flex items-center gap-3 rounded-3xl bg-card p-3.5 shadow-card">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-sm font-extrabold">
                  {v.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{v.name}</p>
                  <p className="text-xs font-medium text-muted-foreground">
                    {v.area} · ★ {v.rating}
                  </p>
                </div>
                <Heart className="h-4 w-4 shrink-0 fill-primary text-primary" />
              </div>
            );
          })}
          {favorites.length === 0 && (
            <p className="rounded-3xl bg-card p-5 text-center text-xs font-medium text-muted-foreground shadow-card">
              Tap the heart on any vendor to save them here.
            </p>
          )}
        </div>
      </section>

      <section className="px-5 pt-6">
        <h2 className="text-base font-extrabold">Preferences</h2>
        <div className="mt-3 space-y-2.5">
          <ToggleRow
            icon={<Bell className="h-4 w-4" />}
            label="Push notifications"
            value={alerts}
            onChange={setAlerts}
          />
          <ToggleRow
            icon={<Sparkles className="h-4 w-4" />}
            label="Smart drop alerts"
            value={dropAlerts}
            onChange={setDropAlerts}
            locked={!isPremium}
          />
          <div className="rounded-3xl bg-card p-4 shadow-card">
            <p className="flex items-center gap-2 text-sm font-bold">
              <UtensilsCrossed className="h-4 w-4 text-primary" /> Dietary preferences
              {!isPremium && (
                <span className="rounded-full bg-ember-soft px-2 py-0.5 text-[9px] font-extrabold text-primary">
                  PLUS
                </span>
              )}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {DIETARY.map((d) => {
                const active = diet.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() =>
                      setDiet((cur) => (active ? cur.filter((x) => x !== d) : [...cur, d]))
                    }
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                      active ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl bg-card p-4 shadow-card">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Leaf className="h-4 w-4 text-primary" /> Preferred pickup time
            </p>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {["Lunch", "Evening", "Late"].map((t) => (
                <button
                  key={t}
                  onClick={() => setPickup(t)}
                  className={`rounded-full py-2 text-xs font-bold transition-colors ${
                    pickup === t ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pt-6">
        <h2 className="text-base font-extrabold">More</h2>
        <div className="mt-3 space-y-2.5">
          <button
            onClick={() => {
              setVendorMode(true);
              navigate({ to: "/vendor" });
            }}
            className="flex w-full items-center gap-3 rounded-3xl bg-card p-4 shadow-card"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ember-soft text-primary">
              <Store className="h-5 w-5" />
            </span>
            <span className="flex-1 text-left">
              <span className="block text-sm font-extrabold">Switch to vendor mode</span>
              <span className="block text-xs font-medium text-muted-foreground">
                Sunrise Bakery · demo storefront
              </span>
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary">
              <Settings className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-extrabold">Subscription & settings</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </section>
    </Page>
  );
}

function ToggleRow({
  icon,
  label,
  value,
  onChange,
  locked,
}: {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  locked?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-secondary text-foreground">
        {icon}
      </span>
      <span className="flex-1 text-sm font-bold">
        {label}
        {locked && (
          <span className="ml-2 rounded-full bg-ember-soft px-2 py-0.5 text-[9px] font-extrabold text-primary">
            PLUS
          </span>
        )}
      </span>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          value ? "bg-leaf" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow transition-transform ${
            value ? "translate-x-5.5 left-0.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
