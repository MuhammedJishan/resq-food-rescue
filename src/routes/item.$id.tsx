import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Clock, Heart, MapPin, Star, Users } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { listingImage } from "@/components/listing-card";
import { discountPct, getVendor } from "@/lib/data";
import { useApp } from "@/lib/store";
import { formatCountdown, useNow } from "@/hooks/use-countdown";

export const Route = createFileRoute("/item/$id")({
  head: () => ({
    meta: [
      { title: "Rescue details — RESQ" },
      { name: "description", content: "View this surplus food rescue on RESQ." },
      { property: "og:title", content: "Rescue details — RESQ" },
      { property: "og:description", content: "View this surplus food rescue on RESQ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ItemPage,
});

function ItemPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { getListing, favorites, toggleFavorite } = useApp();
  const listing = getListing(id);
  const now = useNow(1000);

  if (!listing) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-3 px-5 text-center">
        <p className="text-3xl">🥲</p>
        <p className="text-sm font-bold">This rescue is no longer available</p>
        <Link to="/" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
          Back to home
        </Link>
      </div>
    );
  }

  const vendor = getVendor(listing.vendorId);
  const fav = favorites.includes(vendor.id);
  const soldOut = listing.quantity === 0 || listing.endsAt <= now;

  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-36">
      <div className="relative">
        <img src={listingImage(listing)} alt={listing.name} className="h-72 w-full object-cover" />
        <button
          onClick={() => navigate({ to: ".." })}
          aria-label="Back"
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-card/95 shadow-card"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => toggleFavorite(vendor.id)}
          aria-label="Save vendor"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-card/95 shadow-card"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${fav ? "fill-primary text-primary" : "text-foreground"}`}
          />
        </button>
        <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1.5 text-xs font-extrabold text-primary-foreground">
          {discountPct(listing)}% OFF
        </span>
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-foreground/85 px-3 py-1.5 text-xs font-bold text-background backdrop-blur">
          <Clock className="h-3.5 w-3.5" />
          {formatCountdown(listing.endsAt, now)} left
        </span>
      </div>

      <div className="space-y-5 px-5 pt-5">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-primary">{vendor.name}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {vendor.rating}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight">{listing.name}</h1>
          <p className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {vendor.area} · {listing.distanceKm} km away
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{listing.description}</p>

        <div className="flex items-center justify-between rounded-3xl bg-card p-4 shadow-card">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-primary">₹{listing.rescuePrice}</span>
              <span className="text-sm text-muted-foreground line-through">₹{listing.originalPrice}</span>
            </div>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">
              You save ₹{listing.originalPrice - listing.rescuePrice}
            </p>
          </div>
          <div className="text-right text-xs font-semibold text-muted-foreground">
            <p className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {listing.quantity} left
            </p>
            <p className="mt-1">Pickup {listing.pickupWindow}</p>
          </div>
        </div>

        {listing.contents.length > 0 && (
          <div>
            <h2 className="text-base font-extrabold">What's inside?</h2>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {listing.contents.map((c) => (
                <span key={c} className="rounded-full bg-secondary px-3.5 py-2 text-xs font-bold">
                  {c}
                </span>
              ))}
            </div>
            {listing.mystery && (
              <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                It's a mystery bag — contents vary by day and these are examples, not a guarantee.
                That's part of the surprise. 🎁
              </p>
            )}
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 mx-auto w-full max-w-md px-5 pb-4">
        <button
          disabled={soldOut}
          onClick={() => navigate({ to: "/checkout/$id", params: { id: listing.id } })}
          className="flex h-14 w-full items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground shadow-lift transition-transform active:scale-[0.98] disabled:bg-muted disabled:text-muted-foreground"
        >
          {soldOut ? "Sold out" : `Rescue this bag · ₹${listing.rescuePrice}`}
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
