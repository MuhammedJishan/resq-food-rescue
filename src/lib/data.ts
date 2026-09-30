import bakeryBag from "@/assets/bakery-bag.jpg";
import buddhaBowl from "@/assets/buddha-bowl.jpg";
import produceCrate from "@/assets/produce-crate.jpg";
import coffeeCombo from "@/assets/coffee-combo.jpg";
import artisanBread from "@/assets/artisan-bread.jpg";
import dinnerBox from "@/assets/dinner-box.jpg";

export const CATEGORY_IMAGES: Record<string, string> = {
  Bakery: bakeryBag,
  "Café": buddhaBowl,
  Grocery: produceCrate,
  Coffee: coffeeCombo,
  Meals: dinnerBox,
};

export interface Vendor {
  id: string;
  name: string;
  area: string;
  address: string;
  rating: number;
  category: string;
}

export interface Listing {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  contents: string[];
  mystery: boolean;
  originalPrice: number;
  rescuePrice: number;
  quantity: number;
  pickupWindow: string;
  endsAt: number;
  distanceKm: number;
  category: string;
  image: string;
  mapX: number; // % position on explore map
  mapY: number;
}

export interface Order {
  id: string;
  listingId: string;
  qty: number;
  code: string;
  status: "active" | "completed" | "cancelled";
  total: number;
  placedAt: string;
}

const mins = (m: number) => Date.now() + m * 60_000;

export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "Sunrise Bakery",
    area: "Indiranagar",
    address: "12th Main Rd, Indiranagar, Bengaluru",
    rating: 4.7,
    category: "Bakery",
  },
  {
    id: "v2",
    name: "Green Bowl Café",
    area: "Koramangala",
    address: "80 Feet Rd, Koramangala 4th Block, Bengaluru",
    rating: 4.5,
    category: "Café",
  },
  {
    id: "v3",
    name: "Cornerstone Grocery",
    area: "HSR Layout",
    address: "27th Main, HSR Layout Sector 1, Bengaluru",
    rating: 4.3,
    category: "Grocery",
  },
  {
    id: "v4",
    name: "Daily Grind Coffee",
    area: "Church Street",
    address: "Church Street, MG Road, Bengaluru",
    rating: 4.6,
    category: "Coffee",
  },
  {
    id: "v5",
    name: "Urban Bakes",
    area: "Jayanagar",
    address: "9th Main, Jayanagar 3rd Block, Bengaluru",
    rating: 4.4,
    category: "Bakery",
  },
  {
    id: "v6",
    name: "Fresh Table Kitchen",
    area: "BTM Layout",
    address: "16th Main, BTM Layout 2nd Stage, Bengaluru",
    rating: 4.5,
    category: "Meals",
  },
];

export const seedListings: Listing[] = [
  {
    id: "l1",
    vendorId: "v1",
    name: "Mystery Bakery Bag",
    description:
      "A generous bag of today's unsold bakes from Sunrise Bakery. Always fresh from the same day, always a pleasant surprise.",
    contents: ["Croissants", "Muffins", "Danish pastries"],
    mystery: true,
    originalPrice: 299,
    rescuePrice: 99,
    quantity: 4,
    pickupWindow: "7:30 – 8:00 PM",
    endsAt: mins(23),
    distanceKm: 0.6,
    category: "Bakery",
    image: bakeryBag,
    mapX: 38,
    mapY: 30,
  },
  {
    id: "l2",
    vendorId: "v2",
    name: "Buddha Bowl Box",
    description:
      "Wholesome grain bowls with roasted chickpeas, avocado and seasonal greens, packed at closing time.",
    contents: ["Quinoa bowl", "Roasted chickpeas", "Avocado & greens"],
    mystery: false,
    originalPrice: 349,
    rescuePrice: 129,
    quantity: 3,
    pickupWindow: "8:00 – 8:30 PM",
    endsAt: mins(41),
    distanceKm: 1.2,
    category: "Café",
    image: buddhaBowl,
    mapX: 62,
    mapY: 22,
  },
  {
    id: "l3",
    vendorId: "v3",
    name: "Fresh Produce Crate",
    description:
      "A curated crate of fruits and vegetables that won't make it to tomorrow's shelves — perfectly good, deeply discounted.",
    contents: ["Seasonal fruits", "Leafy greens", "Root vegetables"],
    mystery: true,
    originalPrice: 499,
    rescuePrice: 149,
    quantity: 6,
    pickupWindow: "8:30 – 9:00 PM",
    endsAt: mins(58),
    distanceKm: 2.1,
    category: "Grocery",
    image: produceCrate,
    mapX: 72,
    mapY: 55,
  },
  {
    id: "l4",
    vendorId: "v4",
    name: "Coffee & Croissant Combo",
    description:
      "End-of-day pairing from Daily Grind: a fresh brew and a butter croissant, rescued together.",
    contents: ["Flat white", "Butter croissant"],
    mystery: false,
    originalPrice: 249,
    rescuePrice: 99,
    quantity: 5,
    pickupWindow: "7:45 – 8:15 PM",
    endsAt: mins(34),
    distanceKm: 0.9,
    category: "Coffee",
    image: coffeeCombo,
    mapX: 30,
    mapY: 58,
  },
  {
    id: "l5",
    vendorId: "v5",
    name: "Artisan Bread Duo",
    description:
      "Two rustic sourdough loaves from this morning's bake. Crusty, chewy, and best tonight.",
    contents: ["Sourdough loaf", "Country loaf"],
    mystery: false,
    originalPrice: 199,
    rescuePrice: 79,
    quantity: 2,
    pickupWindow: "7:20 – 7:50 PM",
    endsAt: mins(19),
    distanceKm: 1.8,
    category: "Bakery",
    image: artisanBread,
    mapX: 48,
    mapY: 76,
  },
  {
    id: "l6",
    vendorId: "v6",
    name: "Paneer Tikka Dinner Box",
    description:
      "A full dinner box with paneer tikka, naan, rice and curry from tonight's service.",
    contents: ["Paneer tikka", "Butter naan", "Rice & curry"],
    mystery: false,
    originalPrice: 399,
    rescuePrice: 149,
    quantity: 4,
    pickupWindow: "8:15 – 8:45 PM",
    endsAt: mins(47),
    distanceKm: 2.4,
    category: "Meals",
    image: dinnerBox,
    mapX: 55,
    mapY: 45,
  },
];

export const seedOrders: Order[] = [
  {
    id: "o1",
    listingId: "l4",
    qty: 1,
    code: "7315",
    status: "active",
    total: 99,
    placedAt: "Today, 6:42 PM",
  },
  {
    id: "o2",
    listingId: "l1",
    qty: 2,
    code: "2210",
    status: "completed",
    total: 198,
    placedAt: "Yesterday, 7:05 PM",
  },
  {
    id: "o3",
    listingId: "l6",
    qty: 1,
    code: "9048",
    status: "completed",
    total: 149,
    placedAt: "Mon, 8:12 PM",
  },
  {
    id: "o4",
    listingId: "l3",
    qty: 1,
    code: "5562",
    status: "cancelled",
    total: 149,
    placedAt: "Sun, 6:30 PM",
  },
];

/** Baseline personal impact; grows as new rescues are completed. */
export const baseImpact = {
  moneySaved: 2430,
  rescues: 18,
  foodDivertedKg: 7.4,
  co2eAvoidedKg: 12.8,
  streakDays: 7,
  weekly: [2, 3, 1, 4, 2, 3, 3],
};

export const achievements = [
  { id: "first", name: "First Rescue", unlocked: true, icon: "🎉" },
  { id: "five", name: "5 Rescues", unlocked: true, icon: "⭐" },
  { id: "warrior", name: "Waste Warrior", unlocked: true, icon: "🛡️" },
  { id: "hero", name: "Local Hero", unlocked: false, icon: "🏅" },
  { id: "ten", name: "10 Rescues", unlocked: true, icon: "💚" },
  { id: "streak", name: "7-Day Streak", unlocked: true, icon: "🔥" },
];

export function getVendor(id: string) {
  return vendors.find((v) => v.id === id)!;
}

export function discountPct(l: Pick<Listing, "originalPrice" | "rescuePrice">) {
  return Math.round((1 - l.rescuePrice / l.originalPrice) * 100);
}
