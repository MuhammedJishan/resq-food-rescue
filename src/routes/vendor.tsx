import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, IndianRupee, Package, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Page } from "@/components/bottom-nav";
import { useApp, VENDOR_MODE_VENDOR_ID } from "@/lib/store";

export const Route = createFileRoute("/vendor")({
  head: () => ({
    meta: [
      { title: "Vendor mode — RESQ" },
      { name: "description", content: "Publish surplus food drops from your store on RESQ." },
      { property: "og:title", content: "Vendor mode — RESQ" },
      { property: "og:description", content: "Publish surplus food drops from your store on RESQ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VendorPage,
});

const CATEGORIES = ["Bakery", "Café", "Grocery", "Coffee", "Meals"];

function VendorPage() {
  const { listings, orders, publishListing, setVendorMode } = useApp();
  const [published, setPublished] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [rescuePrice, setRescuePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupStart, setPickupStart] = useState("7:30 PM");
  const [pickupEnd, setPickupEnd] = useState("8:00 PM");
  const [category, setCategory] = useState("Bakery");

  const myListings = listings.filter((l) => l.vendorId === VENDOR_MODE_VENDOR_ID);
  const bagsRescued = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.qty, 0);
  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);

  const stats = [
    { icon: Package, value: String(myListings.length), label: "Active listings" },
    { icon: ShoppingBag, value: String(bagsRescued), label: "Bags rescued" },
    { icon: IndianRupee, value: `₹${revenue.toLocaleString("en-IN")}`, label: "Revenue recovered" },
  ];

  const valid =
    name.trim() &&
    description.trim() &&
    Number(originalPrice) > 0 &&
    Number(rescuePrice) > 0 &&
    Number(rescuePrice) < Number(originalPrice) &&
    Number(quantity) > 0;

  const submit = () => {
    if (!valid) return;
    publishListing({
      name: name.trim(),
      description: description.trim(),
      originalPrice: Number(originalPrice),
      rescuePrice: Number(rescuePrice),
      quantity: Number(quantity),
      pickupWindow: `${pickupStart} – ${pickupEnd}`,
      category,
    });
    setName("");
    setDescription("");
    setOriginalPrice("");
    setRescuePrice("");
    setQuantity("");
    setPublished(true);
    setTimeout(() => setPublished(false), 4000);
  };

  const input =
    "h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm font-medium outline-none focus:border-primary";

  return (
    <Page>
      <header className="flex items-center gap-3 px-5 pt-6">
        <Link
          to="/profile"
          onClick={() => setVendorMode(false)}
          aria-label="Back to profile"
          className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
            Vendor mode
          </p>
          <h1 className="text-xl font-extrabold tracking-tight">Sunrise Bakery</h1>
        </div>
      </header>

      <section className="px-5 pt-5">
        <h2 className="text-sm font-extrabold text-muted-foreground">Today's rescue activity</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-card p-3.5 text-center shadow-card">
              <s.icon className="mx-auto h-4 w-4 text-primary" />
              <p className="mt-1.5 text-lg font-extrabold">{s.value}</p>
              <p className="text-[10px] font-semibold leading-tight text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <h2 className="text-base font-extrabold">Create a rescue drop</h2>
        <div className="mt-3 space-y-3 rounded-3xl bg-card p-5 shadow-card">
          <div>
            <label className="text-xs font-bold text-muted-foreground">Food name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mystery Bakery Bag"
              className={`${input} mt-1.5`}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's in today's surplus…"
              rows={3}
              className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm font-medium outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-muted-foreground">Original ₹</label>
              <input
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="299"
                className={`${input} mt-1.5`}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground">Rescue ₹</label>
              <input
                value={rescuePrice}
                onChange={(e) => setRescuePrice(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="99"
                className={`${input} mt-1.5`}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground">Qty</label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="4"
                className={`${input} mt-1.5`}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-muted-foreground">Pickup start</label>
              <input
                value={pickupStart}
                onChange={(e) => setPickupStart(e.target.value)}
                className={`${input} mt-1.5`}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground">Pickup end</label>
              <input
                value={pickupEnd}
                onChange={(e) => setPickupEnd(e.target.value)}
                className={`${input} mt-1.5`}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground">Category</label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
                    category === c
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {published && (
            <div className="animate-pop-in flex items-center gap-2 rounded-2xl bg-leaf/10 px-4 py-3 text-sm font-bold text-leaf">
              <Check className="h-4 w-4" /> Drop published — it's live in the consumer feed!
            </div>
          )}

          <button
            onClick={submit}
            disabled={!valid}
            className="flex h-14 w-full items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground shadow-lift transition-transform active:scale-[0.98] disabled:bg-muted disabled:text-muted-foreground"
          >
            Publish Rescue Drop
          </button>
        </div>
      </section>

      <section className="px-5 pt-6">
        <h2 className="text-base font-extrabold">Your active drops</h2>
        <div className="mt-3 space-y-2.5">
          {myListings.map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-between rounded-3xl bg-card p-4 shadow-card"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{l.name}</p>
                <p className="text-xs font-medium text-muted-foreground">
                  ₹{l.rescuePrice} · {l.quantity} left · {l.pickupWindow}
                </p>
              </div>
              <span className="ml-3 shrink-0 rounded-full bg-leaf/10 px-2.5 py-1 text-[10px] font-extrabold text-leaf">
                LIVE
              </span>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
