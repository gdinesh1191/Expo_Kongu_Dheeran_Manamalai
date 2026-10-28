import { useAuth } from "@/app/AuthContext";
import { SAMPLE_PROFILES } from "@/constants/SampleProfile";
import { scaleFont } from "@/constants/ScaleFont";
import { useCart } from "@/context/CartContext";
import { useDownloads } from "@/context/DownloadsContext";
import { useLikedProfiles } from "@/context/LikedProfilesContext";
import { COLORS } from "@/pages/Home/style";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TABS = [
  { key: "Profiles", icon: "users", route: "Profile" },
  { key: "Wish List", icon: "heart", route: "LikedProfiles" },
  { key: "Cart", icon: "shopping-cart", route: "Cart" },
  { key: "Downloads", icon: "download", route: "MyDownloads" },
  { key: "Posts", icon: "play-circle", route: "Home" },
] as const;

export type TabKey = (typeof TABS)[number]["key"];

export default function BottomTabBar({ active }: { active: TabKey }) {
  const navigation = useNavigation<any>();
  const { token } = useAuth();
  const { liked } = useLikedProfiles();
  const { cart } = useCart();
  const { downloads } = useDownloads();

  const counts: Partial<Record<TabKey, number>> = {
    Profiles: SAMPLE_PROFILES.length,
    "Wish List": liked.length,
    Cart: cart.length,
    Downloads: downloads.length,
  };

  const onPress = (route: string) => {
    if (token === null) {
      navigation.navigate("Login");
    } else {
      navigation.navigate(route);
    }
  };
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const count = counts[tab.key] ?? 0;
        return (
          <Pressable
            key={tab.key}
            style={styles.tabItem}
            onPress={() => {
              if (!isActive && tab.route) onPress(tab.route);
            }}
          >
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Feather
                name={tab.icon}
                size={20}
                color={isActive ? COLORS.primary : COLORS.muted}
              />
              {count > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {count > 99 ? "99+" : count}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.key}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingTop: scaleFont(10),
    paddingBottom: scaleFont(10),
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: scaleFont(2),
  },
  iconWrap: {
    width: scaleFont(36),
    height: scaleFont(36),
    borderRadius: scaleFont(18),
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -scaleFont(2),
    right: -scaleFont(4),
    minWidth: scaleFont(18),
    height: scaleFont(18),
    paddingHorizontal: scaleFont(4),
    borderRadius: scaleFont(9),
    borderWidth: 1.5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: scaleFont(10),
    fontWeight: "700",
    color: COLORS.white,
  },
  iconWrapActive: {
    backgroundColor: COLORS.primaryLight,
  },
  tabLabel: {
    fontSize: scaleFont(11),
    color: COLORS.muted,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
