import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import {
  ArrowLeft,
  Zap,
  Bell,
  SlidersHorizontal,
  Bot,
  BarChart3,
  Check,
  Sparkles,
} from "lucide-react-native";

export default function PlusScreen() {
  const handleSubscribe = () => {
    Alert.alert(
      "RESQ Plus",
      "RevenueCat subscription flow is ready to connect.",
      [{ text: "Got it" }]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.back} onPress={() => router.back()}>
            <ArrowLeft size={22} color="#0F172A" />
          </Pressable>

          <View style={styles.plusBadge}>
            <Sparkles size={15} color="#0D9488" />
            <Text style={styles.plusBadgeText}>RESQ PLUS</Text>
          </View>

          <View style={{ width: 42 }} />
        </View>

        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <Sparkles size={30} color="#0D9488" />
          </View>

          <Text style={styles.title}>Rescue more.{`\n`}Miss less.</Text>

          <Text style={styles.subtitle}>
            Get earlier access to the best surplus food around you.
          </Text>
        </View>

        <View style={styles.features}>
          <Feature
            icon={<Zap size={22} color="#0D9488" />}
            title="First Dibs"
            description="See new rescue drops 15–30 minutes early."
          />

          <Feature
            icon={<Bell size={22} color="#0D9488" />}
            title="Smart Drop Alerts"
            description="Get notified when your favorite food appears."
          />

          <Feature
            icon={<SlidersHorizontal size={22} color="#0D9488" />}
            title="Advanced Filters"
            description="Filter by cuisine, dietary preferences and distance."
          />

          <Feature
            icon={<Bot size={22} color="#0D9488" />}
            title="Smart Auto-Reserve"
            description="Set preferences and never miss your ideal rescue."
          />

          <Feature
            icon={<BarChart3 size={22} color="#0D9488" />}
            title="Advanced Impact"
            description="See detailed savings and waste reduction insights."
          />
        </View>

        <View style={styles.planCard}>
          <View>
            <Text style={styles.planTitle}>Monthly</Text>
            <Text style={styles.planPrice}>₹199</Text>
            <Text style={styles.planPeriod}>per month</Text>
          </View>

          <View style={styles.recommended}>
            <Text style={styles.recommendedText}>POPULAR</Text>
          </View>
        </View>

        <View style={styles.yearCard}>
          <View>
            <Text style={styles.yearTitle}>Annual</Text>
            <Text style={styles.yearPrice}>₹1,499</Text>
            <Text style={styles.yearPeriod}>per year</Text>
          </View>

          <Text style={styles.yearSave}>Save 37%</Text>
        </View>

        <View style={styles.checkRow}>
          <Check size={18} color="#0D9488" />
          <Text style={styles.checkText}>Cancel anytime</Text>
        </View>

        <View style={styles.checkRow}>
          <Check size={18} color="#0D9488" />
          <Text style={styles.checkText}>Secure subscription powered by RevenueCat</Text>
        </View>

        <Pressable style={styles.subscribeButton} onPress={handleSubscribe}>
          <Sparkles size={19} color="#FFFFFF" />
          <Text style={styles.subscribeText}>Start RESQ Plus</Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          Manage your subscription anytime from your account.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureIcon}>{icon}</View>

      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
  },

  content: {
    paddingBottom: 40,
  },

  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },

  plusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#F0FDFA",
  },

  plusBadgeText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#0D9488",
  },

  hero: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 30,
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#CCFBF1",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 18,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
    color: "#0F172A",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,
    maxWidth: 330,
    fontSize: 15,
    lineHeight: 22,
    color: "#64748B",
    textAlign: "center",
  },

  features: {
    paddingHorizontal: 20,
  },

  feature: {
    flexDirection: "row",
    paddingVertical: 13,
  },

  featureIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#F0FDFA",
    alignItems: "center",
    justifyContent: "center",
  },

  featureText: {
    flex: 1,
    marginLeft: 13,
  },

  featureTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  featureDescription: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 19,
    color: "#64748B",
  },

  planCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#0D9488",
    backgroundColor: "#F0FDFA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  planTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },

  planPrice: {
    marginTop: 3,
    fontSize: 27,
    fontWeight: "900",
    color: "#0F172A",
  },

  planPeriod: {
    fontSize: 12,
    color: "#64748B",
  },

  recommended: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#0D9488",
  },

  recommendedText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  yearCard: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  yearTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },

  yearPrice: {
    marginTop: 3,
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
  },

  yearPeriod: {
    fontSize: 12,
    color: "#64748B",
  },

  yearSave: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0D9488",
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 22,
    marginTop: 12,
    gap: 8,
  },

  checkText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  subscribeButton: {
    height: 55,
    marginHorizontal: 20,
    marginTop: 22,
    borderRadius: 16,
    backgroundColor: "#0D9488",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  subscribeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  disclaimer: {
    marginTop: 10,
    marginHorizontal: 30,
    fontSize: 11,
    lineHeight: 17,
    color: "#94A3B8",
    textAlign: "center",
  },
});