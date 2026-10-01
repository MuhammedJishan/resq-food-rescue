import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Bell,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  Sparkles,
  Tag,
  Utensils,
} from "lucide-react-native";
import { router } from "expo-router";

const foodImages = {
  bakeryBag: require("../../assets/food/bakery-bag.jpg"),
  buddhaBowl: require("../../assets/food/buddha-bowl.jpg"),
  produceCrate: require("../../assets/food/produce-crate.jpg"),
  coffeeCombo: require("../../assets/food/coffee-combo.jpg"),
  artisanBread: require("../../assets/food/artisan-bread.jpg"),
  dinnerBox: require("../../assets/food/dinner-box.jpg"),
};

const categories = ["All", "Bakery", "Café", "Grocery", "Coffee", "Meals"];

const listings = [
  {
    id: "l1",
    name: "Mystery Bakery Bag",
    vendor: "Sunrise Bakery",
    category: "Bakery",
    originalPrice: 299,
    rescuePrice: 99,
    quantity: 4,
    distance: "0.6 km",
    pickup: "7:30 – 8:00 PM",
    ends: "23m",
    discount: 67,
    image: foodImages.bakeryBag,
  },
  {
    id: "l2",
    name: "Buddha Bowl Box",
    vendor: "Green Bowl Café",
    category: "Café",
    originalPrice: 349,
    rescuePrice: 129,
    quantity: 3,
    distance: "1.2 km",
    pickup: "8:00 – 8:30 PM",
    ends: "41m",
    discount: 63,
    image: foodImages.buddhaBowl,
  },
  {
    id: "l3",
    name: "Fresh Produce Crate",
    vendor: "Cornerstone Grocery",
    category: "Grocery",
    originalPrice: 499,
    rescuePrice: 149,
    quantity: 6,
    distance: "2.1 km",
    pickup: "8:30 – 9:00 PM",
    ends: "58m",
    discount: 70,
    image: foodImages.produceCrate,
  },
  {
    id: "l4",
    name: "Coffee & Croissant Combo",
    vendor: "Daily Grind Coffee",
    category: "Coffee",
    originalPrice: 249,
    rescuePrice: 99,
    quantity: 5,
    distance: "0.9 km",
    pickup: "7:45 – 8:15 PM",
    ends: "34m",
    discount: 60,
    image: foodImages.coffeeCombo,
  },
  {
    id: "l5",
    name: "Artisan Bread Duo",
    vendor: "Urban Bakes",
    category: "Bakery",
    originalPrice: 199,
    rescuePrice: 79,
    quantity: 2,
    distance: "1.8 km",
    pickup: "7:20 – 7:50 PM",
    ends: "19m",
    discount: 60,
    image: foodImages.artisanBread,
  },
  {
    id: "l6",
    name: "Paneer Tikka Dinner Box",
    vendor: "Fresh Table Kitchen",
    category: "Meals",
    originalPrice: 399,
    rescuePrice: 149,
    quantity: 4,
    distance: "2.4 km",
    pickup: "8:15 – 8:45 PM",
    ends: "47m",
    discount: 63,
    image: foodImages.dinnerBox,
  },
];

export default function HomeScreen() {
  const endingSoon = [...listings]
    .sort((a, b) => parseInt(a.ends) - parseInt(b.ends))
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening 👋</Text>

            <View style={styles.locationRow}>
              <MapPin size={15} color="#16A34A" strokeWidth={2.5} />
              <Text style={styles.location}>Bengaluru</Text>
              <ChevronRight size={14} color="#94A3B8" />
            </View>
          </View>

          <Pressable style={styles.iconButton}>
            <Bell size={21} color="#172033" />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroGlow} />

          <View style={styles.heroIcon}>
            <Sparkles size={22} color="#FFFFFF" fill="#FFFFFF" />
          </View>

          <Text style={styles.heroTitle}>
            Rescue something{"\n"}
            <Text style={styles.heroAccent}>delicious.</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Great food deserves a second chance.
            {"\n"}Save money. Waste less.
          </Text>

          <Pressable style={styles.searchButton}>
            <Search size={19} color="#64748B" />
            <Text style={styles.searchText}>
              Search food, cafés, bakeries...
            </Text>
          </Pressable>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse nearby</Text>
          <Pressable>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category, index) => (
            <Pressable
              key={category}
              style={[
                styles.category,
                index === 0 && styles.categoryActive,
              ]}
            >
              {index === 0 ? (
                <Utensils size={16} color="#FFFFFF" />
              ) : (
                <Tag size={15} color="#475569" />
              )}

              <Text
                style={[
                  styles.categoryText,
                  index === 0 && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Plus Banner */}
        <Pressable
          style={styles.plusBanner}
          onPress={() => router.push("/plus")}
        >
          <View style={styles.plusIcon}>
            <Sparkles size={18} color="#FFFFFF" fill="#FFFFFF" />
          </View>

          <View style={styles.plusContent}>
            <Text style={styles.plusTitle}>RESQ Plus</Text>
            <Text style={styles.plusSubtitle}>
              First dibs on the best drops
            </Text>
          </View>

          <ChevronRight size={21} color="#FFFFFF" />
        </Pressable>

        {/* Ending Soon */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Ending soon</Text>
            <Text style={styles.sectionSubtitle}>
              Rescue before it's gone
            </Text>
          </View>

          <Pressable>
            <Text style={styles.seeAll}>View all</Text>
          </Pressable>
        </View>

        <FlatList
          horizontal
          data={endingSoon}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              style={styles.endingCard}
              onPress={() => {
                console.log("FOOD CARD PRESSED:", item.id);

                router.push({
                  pathname: "/item/[id]",
                  params: { id: item.id },
                });
              }}
              android_ripple={{ color: "#CCFBF1" }}
            >
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.endingImage} />

                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {item.discount}% OFF
                  </Text>
                </View>

                <View style={styles.timeBadge}>
                  <Clock3 size={12} color="#FFFFFF" />
                  <Text style={styles.timeText}>{item.ends}</Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.vendor}>{item.vendor}</Text>

                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.rescuePrice}>
                    ₹{item.rescuePrice}
                  </Text>

                  <Text style={styles.originalPrice}>
                    ₹{item.originalPrice}
                  </Text>
                </View>

                <Text style={styles.distance}>
                  {item.distance} • {item.quantity} left
                </Text>
              </View>
            </Pressable>
          )}
        />

        {/* Fresh Drops */}
        <View style={[styles.sectionHeader, styles.freshHeader]}>
          <View>
            <Text style={styles.sectionTitle}>Fresh drops nearby</Text>
            <Text style={styles.sectionSubtitle}>
              Just added by local businesses
            </Text>
          </View>

          <Pressable>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        {listings.slice(0, 4).map((item) => (
          <Pressable
            key={item.id}
            style={styles.listingRow}
            onPress={() =>
              router.push({
                pathname: "/item/[id]",
                params: { id: item.id },
              })
            }
          >
            <Image source={item.image} style={styles.rowImage} />

            <View style={styles.rowDiscount}>
              <Text style={styles.rowDiscountText}>
                {item.discount}%
              </Text>
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.rowVendor}>{item.vendor}</Text>

              <Text style={styles.rowName} numberOfLines={1}>
                {item.name}
              </Text>

              <View style={styles.rowBottom}>
                <Text style={styles.rowPrice}>
                  ₹{item.rescuePrice}
                </Text>

                <Text style={styles.rowOriginal}>
                  ₹{item.originalPrice}
                </Text>

                <Text style={styles.rowDistance}>
                  • {item.distance}
                </Text>
              </View>
            </View>

            <ChevronRight size={18} color="#94A3B8" />
          </Pressable>
        ))}

        {/* Impact Footer */}
        <View style={styles.impactFooter}>
          <View style={styles.impactIcon}>
            <Sparkles size={17} color="#16A34A" />
          </View>

          <View style={styles.impactTextContainer}>
            <Text style={styles.impactTitle}>
              Every rescue makes an impact
            </Text>

            <Text style={styles.impactSubtitle}>
              Less waste • More savings • Better planet
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  greeting: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },

  location: {
    fontSize: 16,
    color: "#172033",
    fontWeight: "700",
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },

  hero: {
    backgroundColor: "#172033",
    borderRadius: 28,
    padding: 22,
    overflow: "hidden",
    marginBottom: 26,
  },

  heroGlow: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    right: -55,
    top: -70,
    backgroundColor: "#14532D",
    opacity: 0.65,
  },

  heroIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  heroTitle: {
    fontSize: 30,
    lineHeight: 35,
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: -0.8,
  },

  heroAccent: {
    color: "#4ADE80",
  },

  heroSubtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 18,
  },

  searchButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },

  searchText: {
    color: "#94A3B8",
    fontSize: 13,
    flex: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#172033",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  sectionSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 3,
  },

  seeAll: {
    color: "#16A34A",
    fontSize: 13,
    fontWeight: "700",
  },

  categoryList: {
    gap: 9,
    paddingBottom: 22,
  },

  category: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  categoryActive: {
    backgroundColor: "#172033",
    borderColor: "#172033",
  },

  categoryText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "600",
  },

  categoryTextActive: {
    color: "#FFFFFF",
  },

  plusBanner: {
    backgroundColor: "#16A34A",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 27,
  },

  plusIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  plusContent: {
    flex: 1,
    marginLeft: 12,
  },

  plusTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  plusSubtitle: {
    color: "#DCFCE7",
    fontSize: 12,
    marginTop: 2,
  },

  horizontalList: {
    gap: 13,
    paddingBottom: 4,
  },

  endingCard: {
    width: 205,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  imageContainer: {
    height: 135,
    position: "relative",
  },

  endingImage: {
    width: "100%",
    height: "100%",
  },

  discountBadge: {
    position: "absolute",
    left: 9,
    top: 9,
    backgroundColor: "#16A34A",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  discountText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  timeBadge: {
    position: "absolute",
    right: 9,
    bottom: 9,
    backgroundColor: "rgba(15,23,42,0.82)",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  timeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  cardContent: {
    padding: 12,
  },

  vendor: {
    color: "#16A34A",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 4,
  },

  itemName: {
    color: "#172033",
    fontSize: 14,
    fontWeight: "800",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 7,
  },

  rescuePrice: {
    color: "#172033",
    fontSize: 17,
    fontWeight: "900",
  },

  originalPrice: {
    color: "#94A3B8",
    fontSize: 11,
    textDecorationLine: "line-through",
  },

  distance: {
    color: "#94A3B8",
    fontSize: 10,
    marginTop: 4,
  },

  freshHeader: {
    marginTop: 28,
  },

  listingRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  rowImage: {
    width: 78,
    height: 78,
    borderRadius: 13,
  },

  rowDiscount: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#16A34A",
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },

  rowDiscountText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },

  rowInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  rowVendor: {
    color: "#16A34A",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 3,
  },

  rowName: {
    color: "#172033",
    fontSize: 14,
    fontWeight: "800",
  },

  rowBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  rowPrice: {
    color: "#172033",
    fontSize: 15,
    fontWeight: "900",
  },

  rowOriginal: {
    color: "#94A3B8",
    fontSize: 10,
    textDecorationLine: "line-through",
    marginLeft: 6,
  },

  rowDistance: {
    color: "#94A3B8",
    fontSize: 10,
    marginLeft: 5,
  },

  impactFooter: {
    marginTop: 18,
    backgroundColor: "#ECFDF5",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  impactIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },

  impactTextContainer: {
    marginLeft: 11,
  },

  impactTitle: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "800",
  },

  impactSubtitle: {
    color: "#4D7C5A",
    fontSize: 10,
    marginTop: 3,
  },
});