import BottomTabBar from "@/components/BottomTabBar";
import FillImage from "@/components/FillImage";
import { MY_PROFILE } from "@/constants/SampleProfile";
import { clean, nameWithAge, primaryPhoto } from "@/utils/profile";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLORS, styles } from "./style";

type MenuItem = {
  key: string;
  label: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  danger?: boolean;
  badge?: string;
  onPress?: () => void;
};

export default function MyProfile() {
  const navigation = useNavigation<any>();
  const profile = MY_PROFILE;

  const stats = [
    { label: "Sent", value: profile.stats.sent, color: COLORS.primary },
    { label: "Received", value: profile.stats.received, color: COLORS.red },
    {
      label: "Shortlisted",
      value: profile.stats.shortlisted,
      color: COLORS.primary,
    },
  ];

  function confirmLogout() {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => {} },
    ]);
  }

  const menu: MenuItem[] = [
    { key: "edit", label: "Edit profile", icon: "edit-2" },
    {
      key: "preferences",
      label: "Partner preferences",
      icon: "heart",
      danger: true,
    },
    { key: "verification", label: "Verification", icon: "shield" },
    { key: "privacy", label: "Privacy and security", icon: "lock" },
    {
      key: "download",
      label: "Download my profile",
      icon: "download",
      onPress: () => navigation.navigate("DownlodProfile", { profile }),
    },

    {
      key: "logout",
      label: "Log out",
      icon: "log-out",
      danger: true,
      onPress: confirmLogout,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerCurve} />

        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>My Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Feather name="settings" size={20} color={COLORS.red} />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <View style={styles.avatarHead} />
            <View style={styles.avatarBody} />
            <FillImage source={primaryPhoto(profile)} />
          </View>
          <TouchableOpacity style={styles.editBadge}>
            <Feather name="edit-2" size={13} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.nameRow}>
          <Text style={styles.name}>{nameWithAge(profile)}</Text>
        </View>
        <Text style={styles.meta}>
          {[clean(profile.WorkingCategory), clean(profile.location)]
            .filter(Boolean)
            .join(" · ")}
        </Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text style={[styles.statValue, { color: item.color }]}>
                {item.value}
              </Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Profile completeness */}
        <View style={styles.completeCard}>
          <View style={styles.completeHeader}>
            <Text style={styles.completeTitle}>Profile completeness</Text>
            <Text style={styles.completeValue}>{profile.completeness}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${profile.completeness}%` },
              ]}
            />
          </View>
          <Text style={styles.completeHint}>{profile.completenessHint}</Text>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {menu.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.menuItem, index > 0 && styles.menuDivider]}
              onPress={item.onPress}
            >
              <View
                style={[styles.menuIcon, item.danger && styles.menuIconDanger]}
              >
                <Feather
                  name={item.icon}
                  size={18}
                  color={item.danger ? COLORS.red : COLORS.primary}
                />
              </View>
              <Text
                style={[
                  styles.menuLabel,
                  item.key === "logout" && styles.menuLabelDanger,
                ]}
              >
                {item.label}
              </Text>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <Feather name="chevron-right" size={18} color="#5A5A5A" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="My Profile" />
    </View>
  );
}
