import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  baseImpact,
  getVendor,
  seedListings,
  seedOrders,
  vendors,
  type Listing,
  type Order,
} from "./data";
import {
  premiumService,
  type PremiumEntitlement,
  type PremiumPlan,
} from "./premium";

const VENDOR_MODE_VENDOR_ID = "v1"; // Sunrise Bakery — the demo vendor account

interface PublishInput {
  name: string;
  description: string;
  originalPrice: number;
  rescuePrice: number;
  quantity: number;
  pickupWindow: string;
  category: string;
}

interface AppState {
  listings: Listing[];
  orders: Order[];
  favorites: string[];
  isPremium: boolean;
  entitlement: PremiumEntitlement;
  vendorMode: boolean;
  getListing: (id: string) => Listing | undefined;
  toggleFavorite: (vendorId: string) => void;
  reserve: (listingId: string, qty: number) => Order | null;
  cancelOrder: (orderId: string) => void;
  publishListing: (input: PublishInput) => Listing;
  subscribePlus: (plan: PremiumPlan) => void;
  cancelPlus: () => void;
  setVendorMode: (v: boolean) => void;
  impact: {
    moneySaved: number;
    rescues: number;
    foodDivertedKg: number;
    co2eAvoidedKg: number;
    streakDays: number;
    weekly: number[];
  };
}

const AppContext = createContext<AppState | null>(null);

function makePickupCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(seedListings);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [favorites, setFavorites] = useState<string[]>(["v1", "v4"]);
  const [entitlement, setEntitlement] = useState<PremiumEntitlement>(() =>
    premiumService.getEntitlement(),
  );
  const [vendorMode, setVendorMode] = useState(false);

  const getListing = useCallback(
    (id: string) => listings.find((l) => l.id === id),
    [listings],
  );

  const toggleFavorite = useCallback((vendorId: string) => {
    setFavorites((f) =>
      f.includes(vendorId) ? f.filter((x) => x !== vendorId) : [...f, vendorId],
    );
  }, []);

  const reserve = useCallback((listingId: string, qty: number): Order | null => {
    let order: Order | null = null;
    setListings((ls) =>
      ls.map((l) => {
        if (l.id !== listingId || l.quantity < qty) return l;
        order = {
          id: `o${Date.now()}`,
          listingId,
          qty,
          code: makePickupCode(),
          status: "active" as const,
          total: l.rescuePrice * qty,
          placedAt: "Just now",
        };
        return { ...l, quantity: l.quantity - qty };
      }),
    );
    if (order) setOrders((os) => [order!, ...os]);
    return order;
  }, []);

  const cancelOrder = useCallback(
    (orderId: string) => {
      const target = orders.find((o) => o.id === orderId);
      if (!target || target.status !== "active") return;
      setOrders((os) =>
        os.map((o) => (o.id === orderId ? { ...o, status: "cancelled" as const } : o)),
      );
      setListings((ls) =>
        ls.map((l) =>
          l.id === target.listingId ? { ...l, quantity: l.quantity + target.qty } : l,
        ),
      );
    },
    [orders],
  );

  const publishListing = useCallback((input: PublishInput): Listing => {
    const listing: Listing = {
      id: `l${Date.now()}`,
      vendorId: VENDOR_MODE_VENDOR_ID,
      name: input.name,
      description: input.description,
      contents: [],
      mystery: false,
      originalPrice: input.originalPrice,
      rescuePrice: input.rescuePrice,
      quantity: input.quantity,
      pickupWindow: input.pickupWindow,
      endsAt: Date.now() + 90 * 60_000,
      distanceKm: 0.6,
      category: input.category,
      image: "",
      mapX: 40,
      mapY: 35,
    };
    setListings((ls) => [listing, ...ls]);
    return listing;
  }, []);

  const subscribePlus = useCallback((plan: PremiumPlan) => {
    setEntitlement(premiumService.subscribe(plan));
  }, []);

  const cancelPlus = useCallback(() => {
    setEntitlement(premiumService.cancel());
  }, []);

  const impact = useMemo(() => {
    const extra = orders.filter((o) => o.status !== "cancelled" && o.placedAt === "Just now");
    const extraSaved = extra.reduce((sum, o) => {
      const l = listings.find((x) => x.id === o.listingId);
      return sum + (l ? (l.originalPrice - l.rescuePrice) * o.qty : 0);
    }, 0);
    const extraQty = extra.reduce((s, o) => s + o.qty, 0);
    return {
      moneySaved: baseImpact.moneySaved + extraSaved,
      rescues: baseImpact.rescues + extraQty,
      foodDivertedKg: +(baseImpact.foodDivertedKg + extraQty * 0.4).toFixed(1),
      co2eAvoidedKg: +(baseImpact.co2eAvoidedKg + extraQty * 0.7).toFixed(1),
      streakDays: baseImpact.streakDays,
      weekly: baseImpact.weekly,
    };
  }, [orders, listings]);

  const value: AppState = {
    listings,
    orders,
    favorites,
    isPremium: entitlement.isActive,
    entitlement,
    vendorMode,
    getListing,
    toggleFavorite,
    reserve,
    cancelOrder,
    publishListing,
    subscribePlus,
    cancelPlus,
    setVendorMode,
    impact,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export { getVendor, vendors, VENDOR_MODE_VENDOR_ID };
