import { scaleFont } from "@/constants/ScaleFont";
import { COLORS } from "@/pages/Home/style";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TABS = [
  { key: "Home", icon: "home", route: "Home" },
  { key: "Profiles", icon: "users", route: "Search" },
  { key: "Wish List", icon: "heart", route: "LikedProfiles" },
  { key: "My Profile", icon: "user", route: "MyProfile" },
] as const;

export type TabKey = (typeof TABS)[number]["key"];

export default function BottomTabBar({ active }: { active: TabKey }) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => {
              if (!isActive && tab.route) navigation.navigate(tab.route);
            }}
          >
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Feather name={tab.icon} size={20} color={isActive ? COLORS.primary : COLORS.muted} />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.key}</Text>
          </TouchableOpacity>
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
    paddingBottom: scaleFont(12),
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
