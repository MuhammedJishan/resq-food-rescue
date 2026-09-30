import { Link } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { CATEGORY_IMAGES, discountPct, getVendor, type Listing } from "@/lib/data";
import { formatCountdown, useNow } from "@/hooks/use-countdown";

export function listingImage(l: Listing) {
  return l.image || CATEGORY_IMAGES[l.category] || CATEGORY_IMAGES["Bakery"] || "";
}

function CountdownBadge({ endsAt, now }: { endsAt: number; now: number | null }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-foreground/85 px-2 py-1 text-[11px] font-bold text-background backdrop-blur">
      <Clock className="h-3 w-3" />
      {now === null ? "…" : formatCountdown(endsAt, now)}
    </span>
  );
}

/** Horizontal-scroll card for the "Ending Soon" rail. */
export function EndingSoonCard({ listing }: { listing: Listing }) {
  const vendor = getVendor(listing.vendorId);
  const now = useNow(1000);
  return (
    <Link
      to="/item/$id"
      params={{ id: listing.id }}
      className="block w-64 shrink-0 snap-start overflow-hidden rounded-3xl bg-card shadow-card transition-transform active:scale-[0.98]"
    >
      <div className="relative h-36">
        <img
          src={listingImage(listing)}
          alt={listing.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-extrabold text-primary-foreground">
          {discountPct(listing)}% OFF
        </span>
        <span className="absolute right-3 top-3">
          <CountdownBadge endsAt={listing.endsAt} now={now} />
        </span>
      </div>
      <div className="space-y-1.5 p-4">
        <p className="text-xs font-semibold text-muted-foreground">{vendor.name}</p>
        <h3 className="truncate text-base font-bold">{listing.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-primary">₹{listing.rescuePrice}</span>
          <span className="text-sm text-muted-foreground line-through">₹{listing.originalPrice}</span>
        </div>
        <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {listing.distanceKm} km
          </span>
          <span>{listing.quantity} left</span>
          <span>Pickup {listing.pickupWindow}</span>
        </div>
        <div className="pt-2">
          <span className="flex h-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            Rescue ₹{listing.rescuePrice}
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Full-width row card for vertical feeds. */
export function ListingRow({ listing }: { listing: Listing }) {
  const vendor = getVendor(listing.vendorId);
  const now = useNow(1000);
  const ended = (now !== null && listing.endsAt <= now) || listing.quantity === 0;
  return (
    <Link
      to="/item/$id"
      params={{ id: listing.id }}
      className={`flex gap-3 rounded-3xl bg-card p-3 shadow-card transition-transform active:scale-[0.98] ${ended ? "opacity-60" : ""}`}
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
        <img
          src={listingImage(listing)}
          alt={listing.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-1.5 left-1.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold text-primary-foreground">
          -{discountPct(listing)}%
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground">
            {vendor.name} · {listing.distanceKm} km
          </p>
          <h3 className="truncate text-sm font-bold">{listing.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-primary">₹{listing.rescuePrice}</span>
            <span className="text-xs text-muted-foreground line-through">₹{listing.originalPrice}</span>
          </div>
          <span className={`text-[11px] font-bold ${ended ? "text-muted-foreground" : "text-leaf"}`}>
            {ended
              ? "Sold out"
              : `${listing.quantity} left${now === null ? "" : ` · ${formatCountdown(listing.endsAt, now)}`}`}
          </span>
        </div>
      </div>
    </Link>
  );
}
