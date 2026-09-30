import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { listingImage } from "@/components/listing-card";
import { getVendor, type Order } from "@/lib/data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/checkout/$id")({
  head: () => ({
    meta: [
      { title: "Confirm your rescue — RESQ" },
      { name: "description", content: "Confirm your surplus food rescue on RESQ." },
      { property: "og:title", content: "Confirm your rescue — RESQ" },
      { property: "og:description", content: "Confirm your surplus food rescue on RESQ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { getListing, reserve } = useApp();
  const listing = getListing(id);
  const [qty, setQty] = useState(1);
  const [order, setOrder] = useState<Order | null>(null);

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

  if (order) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-5 pb-10 pt-16 text-center">
        <div className="animate-pop-in grid h-24 w-24 place-items-center rounded-full bg-leaf">
          <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="var(--color-leaf-foreground)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-check"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight">Food rescued! 🎉</h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          Show this code at pickup.
        </p>

        <div className="mt-6 w-full rounded-3xl bg-card p-6 shadow-card">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Pickup code
          </p>
          <p className="mt-2 font-display text-5xl font-extrabold tracking-[0.3em] text-primary">
            {order.code}
          </p>
        </div>

        <div className="mt-4 w-full space-y-3 rounded-3xl bg-card p-5 text-left shadow-card">
          {[
            ["Vendor", vendor.name],
            ["Item", `${listing.name} × ${order.qty}`],
            ["Pickup", listing.pickupWindow],
            ["Address", vendor.address],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4 text-sm">
              <span className="font-semibold text-muted-foreground">{k}</span>
              <span className="text-right font-bold">{v}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
            <span className="font-semibold text-muted-foreground">Status</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf/10 px-2.5 py-1 text-xs font-extrabold text-leaf">
              <Check className="h-3 w-3" /> Reserved
            </span>
          </div>
        </div>

        <Link
          to="/orders"
          className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground shadow-lift"
        >
          View my orders
        </Link>
        <Link to="/" className="mt-3 text-sm font-bold text-muted-foreground">
          Back to home
        </Link>
      </div>
    );
  }

  const total = listing.rescuePrice * qty;

  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-5 pb-10 pt-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate({ to: "/item/$id", params: { id: listing.id } })}
          aria-label="Back"
          className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-extrabold tracking-tight">Checkout</h1>
      </div>

      <div className="mt-6 flex gap-3 rounded-3xl bg-card p-3 shadow-card">
        <img
          src={listingImage(listing)}
          alt={listing.name}
          className="h-20 w-20 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0 py-1">
          <p className="text-[11px] font-semibold text-muted-foreground">{vendor.name}</p>
          <h2 className="truncate text-sm font-bold">{listing.name}</h2>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            Pickup {listing.pickupWindow}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-3xl bg-card p-4 shadow-card">
        <span className="text-sm font-bold">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid h-9 w-9 place-items-center rounded-full bg-muted"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-base font-extrabold">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(listing.quantity, q + 1))}
            aria-label="Increase quantity"
            className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2.5 rounded-3xl bg-card p-5 shadow-card">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-muted-foreground">
            ₹{listing.rescuePrice} × {qty}
          </span>
          <span className="font-bold">₹{total}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-muted-foreground">You're saving</span>
          <span className="font-bold text-leaf">
            ₹{(listing.originalPrice - listing.rescuePrice) * qty}
          </span>
        </div>
        <div className="flex justify-between border-t border-border pt-2.5">
          <span className="text-sm font-extrabold">Total</span>
          <span className="text-lg font-extrabold text-primary">₹{total}</span>
        </div>
      </div>

      <div className="mt-4 rounded-3xl bg-secondary p-4">
        <p className="text-xs font-extrabold uppercase tracking-wide text-secondary-foreground">
          Pickup instructions
        </p>
        <ul className="mt-2 space-y-1.5 text-xs font-medium leading-relaxed text-muted-foreground">
          <li>• Arrive between {listing.pickupWindow} at {vendor.name}, {vendor.area}.</li>
          <li>• Show your 4-digit pickup code at the counter.</li>
          <li>• Pay at pickup — no online payment needed for this demo.</li>
        </ul>
      </div>

      <button
        onClick={() => {
          const placed = reserve(listing.id, qty);
          if (placed) setOrder(placed);
        }}
        className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground shadow-lift transition-transform active:scale-[0.98]"
      >
        Confirm Rescue · ₹{total}
      </button>
    </div>
  );
}
