import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import {
  ArrowLeft,
  MapPin,
  Clock3,
  ShieldCheck,
  ChevronRight,
  CreditCard,
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

export default function CheckoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = listings[id ?? "l1"] ?? listings.l1;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={22} color="#0F172A" />
          </Pressable>

          <Text style={styles.headerTitle}>Checkout</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Order */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your rescue</Text>

          <View style={styles.orderCard}>
            <View style={styles.foodIcon}>
              <Text style={styles.foodEmoji}>🥡</Text>
            </View>

            <View style={styles.orderInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.vendor}>{item.vendor}</Text>

              <View style={styles.priceLine}>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.quantity}>× 1</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pickup */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup details</Text>

          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.iconBox}>
                <Clock3 size={19} color="#0D9488" />
              </View>

              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Pickup window</Text>
                <Text style={styles.detailValue}>{item.pickup}</Text>
              </View>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.iconBox}>
                <MapPin size={19} color="#0D9488" />
              </View>

              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Distance</Text>
                <Text style={styles.detailValue}>{item.distance}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>

          <View style={styles.paymentCard}>
            <View style={styles.paymentIcon}>
              <CreditCard size={20} color="#0F172A" />
            </View>

            <View style={styles.paymentText}>
              <Text style={styles.paymentTitle}>Demo Payment</Text>
              <Text style={styles.paymentSubtitle}>
                Secure checkout for your rescue
              </Text>
            </View>

            <ChevronRight size={19} color="#94A3B8" />
          </View>
        </View>

        {/* Price summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Food rescue</Text>
            <Text style={styles.summaryValue}>₹{item.price}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform fee</Text>
            <Text style={styles.free}>FREE</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{item.price}</Text>
          </View>
        </View>

        {/* Trust */}
        <View style={styles.trust}>
          <ShieldCheck size={19} color="#0D9488" />

          <Text style={styles.trustText}>
            Your rescue is reserved for you during the pickup window.
          </Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalSmall}>Total</Text>
          <Text style={styles.bottomPrice}>₹{item.price}</Text>
        </View>

        <Pressable
          style={styles.confirmButton}
          onPress={() =>
            router.push({
              pathname: "/confirmation",
              params: { id: id ?? "l1" },
            })
          }
        >
          <Text style={styles.confirmText}>Confirm rescue</Text>
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

  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
  },

  headerSpacer: {
    width: 42,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },

  orderCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
  },

  foodIcon: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
  },

  foodEmoji: {
    fontSize: 34,
  },

  orderInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },

  vendor: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },

  priceLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    gap: 8,
  },

  price: {
    fontSize: 17,
    fontWeight: "900",
    color: "#0D9488",
  },

  quantity: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },

  detailCard: {
    padding: 15,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
  },

  detailText: {
    marginLeft: 12,
  },

  detailLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  detailValue: {
    marginTop: 3,
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "800",
  },

  detailDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },

  paymentText: {
    flex: 1,
    marginLeft: 12,
  },

  paymentTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },

  paymentSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748B",
  },

  summaryCard: {
    marginHorizontal: 20,
    marginTop: 26,
    padding: 17,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },

  summaryLabel: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },

  summaryValue: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "700",
  },

  free: {
    fontSize: 12,
    color: "#0D9488",
    fontWeight: "900",
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 12,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },

  totalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0D9488",
  },

  trust: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 18,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#F0FDFA",
  },

  trustText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 12,
    lineHeight: 18,
    color: "#475569",
    fontWeight: "600",
  },

  bottomSpace: {
    height: 20,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalSmall: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  bottomPrice: {
    marginTop: 2,
    fontSize: 21,
    color: "#0F172A",
    fontWeight: "900",
  },

  confirmButton: {
    height: 52,
    paddingHorizontal: 19,
    borderRadius: 15,
    backgroundColor: "#0D9488",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  confirmText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});