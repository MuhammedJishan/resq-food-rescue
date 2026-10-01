import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft, CheckCircle2, Clock3, MapPin } from "lucide-react-native";

const orders = [
  {
    id: "7315",
    title: "Coffee & Croissant Combo",
    vendor: "Daily Grind Coffee",
    price: "₹99",
    time: "Today · 6:42 PM",
    status: "Ready for pickup",
    active: true,
  },
  {
    id: "2210",
    title: "Mystery Bakery Bag",
    vendor: "Sunrise Bakery",
    price: "₹198",
    time: "Yesterday · 7:05 PM",
    status: "Completed",
    active: false,
  },
  {
    id: "9048",
    title: "Paneer Tikka Dinner Box",
    vendor: "Fresh Table Kitchen",
    price: "₹149",
    time: "Mon · 8:12 PM",
    status: "Completed",
    active: false,
  },
];

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <ArrowLeft size={22} color="#111827" />
        </Pressable>
        <Text style={styles.title}>My orders</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Your rescues</Text>
        <Text style={styles.sub}>Track pickups and see your rescue history.</Text>

        {orders.map((order) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.icon}>
                {order.active ? (
                  <Clock3 size={22} color="#0D9488" />
                ) : (
                  <CheckCircle2 size={22} color="#16A34A" />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.food}>{order.title}</Text>
                <Text style={styles.vendor}>{order.vendor}</Text>
              </View>

              <Text style={styles.price}>{order.price}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detail}>
              <Text style={styles.muted}>{order.time}</Text>
              <Text style={order.active ? styles.active : styles.done}>
                {order.status}
              </Text>
            </View>

            {order.active && (
              <View style={styles.pickup}>
                <MapPin size={16} color="#0D9488" />
                <Text style={styles.pickupText}>Pickup code: 7315</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.impact}>
          <Text style={styles.impactTitle}>Every rescue counts 🌱</Text>
          <Text style={styles.impactText}>
            You've helped keep good food out of the waste stream.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FAFAF7" },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0EB",
  },
  title: { fontSize: 19, fontWeight: "800", color: "#111827" },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 28, fontWeight: "900", color: "#111827" },
  sub: { color: "#6B7280", marginTop: 5, marginBottom: 20 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E9E9E3",
  },
  row: { flexDirection: "row", alignItems: "center" },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#E8F7F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  food: { fontSize: 15, fontWeight: "800", color: "#111827" },
  vendor: { fontSize: 12, color: "#6B7280", marginTop: 3 },
  price: { fontWeight: "900", color: "#111827" },
  divider: { height: 1, backgroundColor: "#EEEEEA", marginVertical: 14 },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  muted: { fontSize: 12, color: "#6B7280" },
  active: { color: "#0D9488", fontSize: 12, fontWeight: "800" },
  done: { color: "#16A34A", fontSize: 12, fontWeight: "800" },
  pickup: {
    marginTop: 12,
    padding: 11,
    borderRadius: 12,
    backgroundColor: "#F0FAF8",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  pickupText: { color: "#0D766B", fontWeight: "800", fontSize: 13 },
  impact: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
  },
  impactTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "900" },
  impactText: { color: "#CBD5E1", marginTop: 6, lineHeight: 20 },
});