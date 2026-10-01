import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import {
  ArrowLeft,
  MapPin,
  Clock3,
  Package,
  ShieldCheck,
  Leaf,
  ChevronRight,
} from "lucide-react-native";

const listings: Record<string, any> = {
  l1: {
    title: "Mystery Bakery Bag",
    vendor: "Sunrise Bakery",
    originalPrice: 299,
    price: 99,
    quantity: 4,
    pickup: "7:30 – 8:00 PM",
    distance: "0.6 km away",
    category: "Bakery",
    discount: "67% OFF",
    image: require("../../../assets/food/bakery-bag.jpg"),
    description:
      "A surprise bag of freshly baked items that would otherwise go unsold at the end of the day.",
  },
  l2: {
    title: "Buddha Bowl Box",
    vendor: "Green Bowl Café",
    originalPrice: 349,
    price: 129,
    quantity: 3,
    pickup: "8:00 – 8:30 PM",
    distance: "1.2 km away",
    category: "Café",
    discount: "63% OFF",
    image: require("../../../assets/food/buddha-bowl.jpg"),
    description:
      "A fresh, balanced bowl prepared today and available at a rescue price.",
  },
  l3: {
    title: "Fresh Produce Crate",
    vendor: "Cornerstone Grocery",
    originalPrice: 499,
    price: 149,
    quantity: 6,
    pickup: "8:30 – 9:00 PM",
    distance: "2.1 km away",
    category: "Grocery",
    discount: "70% OFF",
    image: require("../../../assets/food/produce-crate.jpg"),
    description:
      "A mixed crate of fresh produce that is still perfectly good but needs to be rescued today.",
  },
  l4: {
    title: "Coffee & Croissant Combo",
    vendor: "Daily Grind Coffee",
    originalPrice: 249,
    price: 99,
    quantity: 5,
    pickup: "7:45 – 8:15 PM",
    distance: "0.9 km away",
    category: "Coffee",
    discount: "60% OFF",
    image: require("../../../assets/food/coffee-combo.jpg"),
    description:
      "Fresh coffee and a buttery croissant combo available for pickup before closing.",
  },
  l5: {
    title: "Artisan Bread Duo",
    vendor: "Urban Bakes",
    originalPrice: 199,
    price: 79,
    quantity: 2,
    pickup: "7:20 – 7:50 PM",
    distance: "1.8 km away",
    category: "Bakery",
    discount: "60% OFF",
    image: require("../../../assets/food/artisan-bread.jpg"),
    description:
      "Two artisan loaves baked today and ready to be rescued before closing.",
  },
  l6: {
    title: "Paneer Tikka Dinner Box",
    vendor: "Fresh Table Kitchen",
    originalPrice: 399,
    price: 149,
    quantity: 4,
    pickup: "8:15 – 8:45 PM",
    distance: "2.4 km away",
    category: "Meals",
    discount: "63% OFF",
    image: require("../../../assets/food/dinner-box.jpg"),
    description:
      "A hearty paneer tikka dinner box prepared fresh today and available at a rescue price.",
  },
};

export default function FoodDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = listings[id ?? "l1"] ?? listings.l1;

  const savings = item.originalPrice - item.price;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />

          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={22} color="#0F172A" />
          </Pressable>

          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.categoryRow}>
            <Text style={styles.category}>{item.category}</Text>
            <View style={styles.available}>
              <View style={styles.greenDot} />
              <Text style={styles.availableText}>
                {item.quantity} left
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.vendor}>{item.vendor}</Text>

          <View style={styles.locationRow}>
            <MapPin size={17} color="#64748B" />
            <Text style={styles.location}>{item.distance}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{item.price}</Text>
            <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
            <Text style={styles.saveText}>Save ₹{savings}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Clock3 size={20} color="#0D9488" />
            </View>

            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Pickup window</Text>
              <Text style={styles.infoValue}>{item.pickup}</Text>
            </View>

            <ChevronRight size={19} color="#94A3B8" />
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About this rescue</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.trustCard}>
            <View style={styles.trustItem}>
              <Leaf size={20} color="#0D9488" />
              <Text style={styles.trustText}>Reduces food waste</Text>
            </View>

            <View style={styles.trustItem}>
              <ShieldCheck size={20} color="#0D9488" />
              <Text style={styles.trustText}>Verified vendor</Text>
            </View>

            <View style={styles.trustItem}>
              <Package size={20} color="#0D9488" />
              <Text style={styles.trustText}>Pickup ready</Text>
            </View>
          </View>

          <View style={styles.bottomSpace} />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Your total</Text>
          <Text style={styles.bottomPrice}>₹{item.price}</Text>
        </View>

        <Pressable
          style={styles.reserveButton}
          onPress={() =>
            router.push({
              pathname: "/checkout" as any,
              params: { id: id ?? "l1" },
            })
          }
        >
          <Text style={styles.reserveText}>Reserve rescue</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    paddingBottom: 110,
  },

  imageContainer: {
    height: 300,
    position: "relative",
    backgroundColor: "#F1F5F9",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  backButton: {
    position: "absolute",
    top: 18,
    left: 18,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },

  discountBadge: {
    position: "absolute",
    right: 18,
    bottom: 18,
    backgroundColor: "#0D9488",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },

  discountText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  category: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0D9488",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },

  available: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },

  availableText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },

  title: {
    marginTop: 8,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: "#0F172A",
  },

  vendor: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },

  location: {
    fontSize: 14,
    color: "#64748B",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },

  price: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0F172A",
  },

  originalPrice: {
    fontSize: 16,
    color: "#94A3B8",
    textDecorationLine: "line-through",
  },

  saveText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0D9488",
    backgroundColor: "#CCFBF1",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 20,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 15,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  infoValue: {
    marginTop: 3,
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "800",
  },

  descriptionSection: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#64748B",
  },

  trustCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F0FDFA",
    gap: 14,
  },

  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  trustText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  bottomSpace: {
    height: 20,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bottomLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  bottomPrice: {
    marginTop: 2,
    fontSize: 22,
    color: "#0F172A",
    fontWeight: "900",
  },

  reserveButton: {
    height: 52,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#0D9488",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  reserveText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});