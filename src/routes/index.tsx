import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, MapPin, Search, Sparkles } from "lucide-react";
import { Page } from "@/components/bottom-nav";
import { EndingSoonCard, ListingRow } from "@/components/listing-card";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RESQ — Rescue food. Save money. Waste less." },
      {
        name: "description",
        content:
          "Rescue surplus food from nearby bakeries, cafés and stores in Bengaluru at up to 70% off.",
      },
      { property: "og:title", content: "RESQ — Rescue food. Save money. Waste less." },
      {
        property: "og:description",
        content:
          "Rescue surplus food from nearby bakeries, cafés and stores in Bengaluru at up to 70% off.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const CATEGORIES = ["All", "Bakery", "Café", "Grocery", "Coffee", "Meals"];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function HomePage() {
  const { listings, isPremium } = useApp();
  // Stable on SSR/first render; real greeting applied after mount.
  const [hello, setHello] = useState("Good evening");
  useEffect(() => setHello(greeting()), []);
  const now = Date.now();
  const live = listings.filter((l) => l.endsAt > now && l.quantity > 0);
  const endingSoon = [...live].sort((a, b) => a.endsAt - b.endsAt).slice(0, 6);

  return (
    <Page>
      <header className="flex items-center justify-between px-5 pt-6">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">{greeting()} 👋</h1>
          <p className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" /> Nearby • Bengaluru
          </p>
        </div>
        <button
          aria-label="Notifications"
          className="grid h-11 w-11 place-items-center rounded-full bg-card shadow-card"
        >
          <Bell className="h-5 w-5 text-foreground" />
        </button>
      </header>

      <section className="px-5 pt-6">
        <h2 className="text-[28px] font-extrabold leading-tight tracking-tight">
          Rescue something
          <br />
          <span className="text-primary">delicious</span>
        </h2>
        <p className="mt-1.5 text-sm font-medium text-muted-foreground">
          Fresh surplus. Local businesses. Better prices.
        </p>

        <Link
          to="/explore"
          className="mt-4 flex h-12 items-center gap-3 rounded-full bg-card px-4 text-sm font-medium text-muted-foreground shadow-card"
        >
          <Search className="h-4 w-4" /> Search bakeries, cafés, groceries…
        </Link>

        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c}
              to="/explore"
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                i === 0
                  ? "bg-foreground text-background"
                  : "bg-card text-muted-foreground shadow-card"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {!isPremium && (
        <section className="px-5 pt-5">
          <Link
            to="/plus"
            className="flex items-center gap-3 rounded-3xl bg-foreground p-4 text-background shadow-lift"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-extrabold">RESQ Plus</span>
              <span className="block truncate text-xs font-medium opacity-70">
                First dibs on drops, smart alerts & more
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 opacity-70" />
          </Link>
        </section>
      )}

      <section className="pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-lg font-extrabold">Ending soon</h2>
          <Link to="/explore" className="text-xs font-bold text-primary">
            See all
          </Link>
        </div>
        <div className="no-scrollbar -mx-0 mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
          {endingSoon.map((l) => (
            <EndingSoonCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <h2 className="text-lg font-extrabold">Fresh drops nearby</h2>
        <div className="mt-3 space-y-3">
          {live.map((l) => (
            <ListingRow key={l.id} listing={l} />
          ))}
          {live.length === 0 && (
            <div className="rounded-3xl bg-card p-8 text-center shadow-card">
              <p className="text-3xl">🌙</p>
              <p className="mt-2 text-sm font-bold">All rescued for now</p>
              <p className="mt-1 text-xs text-muted-foreground">
                New drops usually appear around closing time.
              </p>
            </div>
          )}
        </div>
      </section>
    </Page>
  );
}
