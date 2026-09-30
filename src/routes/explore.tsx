import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Page } from "@/components/bottom-nav";
import { listingImage } from "@/components/listing-card";
import { discountPct, getVendor, type Listing } from "@/lib/data";
import { useApp } from "@/lib/store";
import { formatCountdown, useNow } from "@/hooks/use-countdown";
import cityMap from "@/assets/city-map.jpg";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore nearby rescues — RESQ" },
      {
        name: "description",
        content: "Find surplus food drops near you on the RESQ map.",
      },
      { property: "og:title", content: "Explore nearby rescues — RESQ" },
      {
        property: "og:description",
        content: "Find surplus food drops near you on the RESQ map.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

const CATEGORIES = ["All", "Bakery", "Café", "Grocery", "Coffee", "Meals"];

const PREMIUM_FILTERS = ["Dietary", "Radius", "Vendors"];

function ExplorePage() {
  const { listings, isPremium } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [endingSoon, setEndingSoon] = useState(false);
  const [under100, setUnder100] = useState(false);
  const [near, setNear] = useState(false);
  const [selected, setSelected] = useState<Listing | null>(null);
  const now = useNow(1000);

  const results = useMemo(() => {
    return listings.filter((l) => {
      if (l.quantity === 0 || l.endsAt <= now) return false;
      const vendor = getVendor(l.vendorId);
      if (query) {
        const q = query.toLowerCase();
        if (!l.name.toLowerCase().includes(q) && !vendor.name.toLowerCase().includes(q))
          return false;
      }
      if (category !== "All" && l.category !== category) return false;
      if (endingSoon && l.endsAt - now > 30 * 60_000) return false;
      if (under100 && l.rescuePrice >= 100) return false;
      if (near && l.distanceKm > 1) return false;
      return true;
    });
  }, [listings, query, category, endingSoon, under100, near, now]);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
      active ? "bg-foreground text-background" : "bg-card text-muted-foreground shadow-card"
    }`;

  return (
    <Page className="relative">
      <header className="px-5 pt-6">
        <h1 className="text-xl font-extrabold tracking-tight">Explore</h1>
        <p className="mt-0.5 text-sm font-medium text-muted-foreground">
          {results.length} rescues near you
        </p>
      </header>

      <div className="px-5 pt-4">
        <label className="flex h-12 items-center gap-3 rounded-full bg-card px-4 shadow-card">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vendors or food…"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-5 pb-1">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={chip(category === c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto px-5 pb-1">
        <button onClick={() => setEndingSoon((v) => !v)} className={chip(endingSoon)}>
          Ending soon
        </button>
        <button onClick={() => setUnder100((v) => !v)} className={chip(under100)}>
          Under ₹100
        </button>
        <button onClick={() => setNear((v) => !v)} className={chip(near)}>
          &lt; 1 km
        </button>
        {PREMIUM_FILTERS.map((f) => (
          <Link
            key={f}
            to="/plus"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-ember-soft px-3.5 py-2 text-xs font-bold text-primary"
          >
            {isPremium ? <SlidersHorizontal className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            {f}
            {!isPremium && (
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-extrabold text-primary-foreground">
                PLUS
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Map */}
      <div className="relative mx-5 mt-4 h-[380px] overflow-hidden rounded-3xl shadow-card">
        <img src={cityMap} alt="Map of nearby rescues" className="h-full w-full object-cover" />
        {/* You-are-here dot */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute -inset-3 animate-pulse-soft rounded-full bg-leaf/25" />
          <span className="relative block h-4 w-4 rounded-full border-2 border-card bg-leaf" />
        </span>
        {results.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelected(l)}
            style={{ left: `${l.mapX}%`, top: `${l.mapY}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1.5 text-xs font-extrabold shadow-lift transition-transform active:scale-90 ${
              selected?.id === l.id
                ? "bg-foreground text-background"
                : "bg-card text-foreground"
            }`}
          >
            ₹{l.rescuePrice}
          </button>
        ))}
        {results.length === 0 && (
          <div className="absolute inset-x-4 top-4 rounded-2xl bg-card/95 p-4 text-center shadow-card backdrop-blur">
            <p className="text-sm font-bold">No rescues match these filters</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Try widening your search.</p>
          </div>
        )}
      </div>

      {/* Selected listing sheet */}
      {selected && (
        <div className="fixed inset-x-0 bottom-16 z-30 mx-auto w-full max-w-md px-5">
          <div className="rounded-3xl bg-card p-4 shadow-lift">
            <div className="flex gap-3">
              <img
                src={listingImage(selected)}
                alt={selected.name}
                className="h-20 w-20 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-muted-foreground">
                      {getVendor(selected.vendorId).name}
                    </p>
                    <h3 className="truncate text-sm font-bold">{selected.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selected.distanceKm} km
                  </span>
                  <span>{selected.quantity} left</span>
                  <span className="text-primary">{formatCountdown(selected.endsAt, now)} left</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-extrabold text-primary">
                      ₹{selected.rescuePrice}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{selected.originalPrice}
                    </span>
                    <span className="rounded-full bg-ember-soft px-1.5 py-0.5 text-[10px] font-extrabold text-primary">
                      {discountPct(selected)}% OFF
                    </span>
                  </div>
                  <Link
                    to="/item/$id"
                    params={{ id: selected.id }}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
                  >
                    Rescue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
