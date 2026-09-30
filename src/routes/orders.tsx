import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/bottom-nav";
import { listingImage } from "@/components/listing-card";
import { getVendor, type Order } from "@/lib/data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your orders — RESQ" },
      { name: "description", content: "Track your active and past food rescues on RESQ." },
      { property: "og:title", content: "Your orders — RESQ" },
      { property: "og:description", content: "Track your active and past food rescues on RESQ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrdersPage,
});

type Tab = "active" | "completed" | "cancelled";

const STATUS_STYLE: Record<Tab, { label: string; className: string }> = {
  active: { label: "Reserved", className: "bg-leaf/10 text-leaf" },
  completed: { label: "Picked up", className: "bg-secondary text-secondary-foreground" },
  cancelled: { label: "Cancelled", className: "bg-destructive/10 text-destructive" },
};

function OrdersPage() {
  const { orders, getListing, cancelOrder } = useApp();
  const [tab, setTab] = useState<Tab>("active");
  const shown = orders.filter((o) => o.status === tab);

  return (
    <Page>
      <header className="px-5 pt-6">
        <h1 className="text-xl font-extrabold tracking-tight">Your rescues</h1>
        <p className="mt-0.5 text-sm font-medium text-muted-foreground">
          {orders.filter((o) => o.status === "active").length} active pickup
        </p>
      </header>

      <div className="mx-5 mt-4 grid grid-cols-3 rounded-full bg-muted p-1">
        {(["active", "completed", "cancelled"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full py-2 text-xs font-bold capitalize transition-colors ${
              tab === t ? "bg-card shadow-card" : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3 px-5 pt-4">
        {shown.map((o) => (
          <OrderCard key={o.id} order={o} onCancel={() => cancelOrder(o.id)} getListing={getListing} />
        ))}
        {shown.length === 0 && (
          <div className="rounded-3xl bg-card p-8 text-center shadow-card">
            <p className="text-3xl">{tab === "active" ? "🛍️" : "📭"}</p>
            <p className="mt-2 text-sm font-bold">No {tab} orders</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {tab === "active"
                ? "Rescue something delicious nearby."
                : "They'll show up here when you have some."}
            </p>
            {tab === "active" && (
              <Link
                to="/explore"
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                Explore rescues
              </Link>
            )}
          </div>
        )}
      </div>
    </Page>
  );
}

function OrderCard({
  order,
  onCancel,
  getListing,
}: {
  order: Order;
  onCancel: () => void;
  getListing: ReturnType<typeof useApp>["getListing"];
}) {
  const listing = getListing(order.listingId);
  if (!listing) return null;
  const vendor = getVendor(listing.vendorId);
  const style = STATUS_STYLE[order.status];

  return (
    <div className="rounded-3xl bg-card p-4 shadow-card">
      <div className="flex gap-3">
        <img
          src={listingImage(listing)}
          alt={listing.name}
          loading="lazy"
          className="h-16 w-16 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-muted-foreground">{vendor.name}</p>
              <h3 className="truncate text-sm font-bold">
                {listing.name} × {order.qty}
              </h3>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${style.className}`}>
              {style.label}
            </span>
          </div>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {order.placedAt} · ₹{order.total}
          </p>
        </div>
      </div>
      {order.status === "active" && (
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-secondary px-4 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Pickup code · {listing.pickupWindow}
            </p>
            <p className="font-display text-xl font-extrabold tracking-[0.25em] text-primary">
              {order.code}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="rounded-full px-3 py-1.5 text-xs font-bold text-destructive"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
