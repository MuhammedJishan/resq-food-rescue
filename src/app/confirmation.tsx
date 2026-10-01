import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Check,
  MapPin,
  Clock3,
  Leaf,
  ArrowRight,
} from "lucide-react-native";

const listings: Record<string, any> = {
  l1: {
    title: "Mystery Bakery Bag",
    vendor: "Sunrise Bakery",
    price: 99,
    pickup: "7:30 – 8:00 PM",
    distance: "0.6 km away",
  },
  l2: {
    title: "Buddha Bowl Box",
    vendor: "Green Bowl Café",
    price: 129,
    pickup: "8:00 – 8:30 PM",
    distance: "1.2 km away",
  },
  l3: {
    title: "Fresh Produce Crate",
    vendor: "Cornerstone Grocery",
    price: 149,
    pickup: "8:30 – 9:00 PM",
    distance: "2.1 km away",
  },
  l4: {
    title: "Coffee & Croissant Combo",
    vendor: "Daily Grind Coffee",
    price: 99,
    pickup: "7:45 – 8:15 PM",
    distance: "0.9 km away",
  },
  l5: {
    title: "Artisan Bread Duo",
    vendor: "Urban Bakes",
    price: 79,
    pickup: "7:20 – 7:50 PM",
    distance: "1.8 km away",
  },
  l6: {
    title: "Paneer Tikka Dinner Box",
    vendor: "Fresh Table Kitchen",
    price: 149,
    pickup: "8:15 – 8:45 PM",
    distance: "2.4 km away",
  },
};

export default function ConfirmationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = listings[id ?? "l1"] ?? listings.l1;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Success icon */}
          <View style={styles.successCircle}>
            <Check size={42} color="#FFFFFF" strokeWidth={3} />
          </View>

          <Text style={styles.title}>Rescue confirmed!</Text>

          <Text style={styles.subtitle}>
            Your food rescue is reserved and ready for pickup.
          </Text>

          {/* Pickup code */}
          <View style={styles.codeCard}>
            <Text style={styles.codeLabel}>YOUR PICKUP CODE</Text>

            <Text style={styles.code}>4827</Text>

            <Text style={styles.codeHint}>
              Show this code to the vendor when you arrive.
            </Text>
          </View>

          {/* Order */}
          <View style={styles.orderCard}>
            <Text style={styles.itemTitle}>{item.title}</Text>

            <Text style={styles.vendor}>{item.vendor}</Text>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Clock3 size={18} color="#0D9488" />

              <View>
                <Text style={styles.infoLabel}>Pickup</Text>
                <Text style={styles.infoValue}>{item.pickup}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MapPin size={18} color="#0D9488" />

              <View>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{item.distance}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Leaf size={18} color="#0D9488" />

              <View>
                <Text style={styles.infoLabel}>You saved</Text>
                <Text style={styles.infoValue}>₹{item.price} + food rescued</Text>
              </View>
            </View>
          </View>

          <View style={styles.impactBanner}>
            <Leaf size={20} color="#0D9488" />

            <Text style={styles.impactText}>
              Nice rescue! You're helping prevent perfectly good food from
              going to waste.
            </Text>
          </View>
        </View>

        {/* Bottom */}
        <View style={styles.bottomBar}>
          <Pressable
            style={styles.ordersButton}
            onPress={() => router.push("/")}
          >
            <Text style={styles.ordersText}>Back to Home</Text>
            <ArrowRight size={19} color="#FFFFFF" />
          </Pressable>
        </View>
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
    justifyContent: "space-between",
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 45,
    alignItems: "center",
  },

  successCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#0D9488",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#64748B",
    textAlign: "center",
    maxWidth: 320,
  },

  codeCard: {
    width: "100%",
    marginTop: 28,
    paddingVertical: 22,
    borderRadius: 20,
    backgroundColor: "#F0FDFA",
    borderWidth: 1,
    borderColor: "#99F6E4",
    alignItems: "center",
  },

  codeLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: "800",
    color: "#64748B",
  },

  code: {
    marginTop: 6,
    fontSize: 42,
    letterSpacing: 8,
    fontWeight: "900",
    color: "#0D9488",
  },

  codeHint: {
    marginTop: 5,
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },

  orderCard: {
    width: "100%",
    marginTop: 18,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#0F172A",
  },

  vendor: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },

  infoLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },

  infoValue: {
    marginTop: 2,
    fontSize: 14,
    color: "#334155",
    fontWeight: "800",
  },

  impactBanner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    padding: 14,
    borderRadius: 15,
    backgroundColor: "#F0FDFA",
    gap: 10,
  },

  impactText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#475569",
    fontWeight: "600",
  },

  bottomBar: {
    paddingHorizontal: 22,
    paddingBottom: 20,
  },

  ordersButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#0D9488",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  ordersText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});