import BottomTabBar from "@/components/BottomTabBar";
import FillImage from "@/components/FillImage";
import {
  MY_PROFILE,
  Profile,
  SAMPLE_PROFILES,
} from "@/constants/SampleProfile";
import { primaryPhoto } from "@/utils/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import { COLORS, styles } from "../Home/style";
import SwipeCard, { SwipeDirection } from "./SwipeCard";
import SwipeGuideModal from "./SwipeGuideModal";

const SWIPE_GUIDE_SEEN_KEY = "home_swipe_guide_seen";
const ANIM_MS = 220;

export default function ProfilePage() {
  const navigation = useNavigation<any>();
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [showGuide, setShowGuide] = useState(false);

  const profiles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SAMPLE_PROFILES;
    return SAMPLE_PROFILES.filter(
      (p) => p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q),
    );
  }, [query]);
  const current = profiles[index];

  function onSearch(text: string) {
    setQuery(text);
    setIndex(0);
  }

  function toggleSearch() {
    if (searchOpen) onSearch("");
    setSearchOpen((open) => !open);
  }

  useEffect(() => {
    AsyncStorage.getItem(SWIPE_GUIDE_SEEN_KEY)
      .then((seen) => {
        if (!seen) setShowGuide(true);
      })
      .catch(() => setShowGuide(true));
  }, []);

  function closeGuide() {
    setShowGuide(false);
    AsyncStorage.setItem(SWIPE_GUIDE_SEEN_KEY, "1").catch(() => {});
  }

  function openDetails(profile: Profile) {
    navigation.navigate("ProfileDetails", { profile });
  }

  function handleSwipe(direction: SwipeDirection) {
    if (direction === "up") {
      if (current) openDetails(current);
      return;
    }
    setIndex((i) =>
      direction === "next"
        ? Math.min(i + 1, profiles.length - 1)
        : Math.max(i - 1, 0),
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerSlot}>
            {searchOpen ? (
              <Animated.View
                key="search"
                entering={FadeInRight.duration(ANIM_MS)}
                exiting={FadeOutRight.duration(ANIM_MS)}
                style={[styles.headerSlotFill, styles.headerSearch]}
              >
                <Feather name="search" size={16} color={COLORS.muted} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by Reg No / Name"
                  placeholderTextColor={COLORS.muted}
                  value={query}
                  onChangeText={onSearch}
                  autoFocus
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="search"
                />
                {query ? (
                  <Pressable onPress={() => onSearch("")} hitSlop={8}>
                    <Ionicons
                      name="close-circle"
                      size={16}
                      color={COLORS.muted}
                    />
                  </Pressable>
                ) : null}
              </Animated.View>
            ) : (
              <Animated.View
                key="profile"
                entering={FadeInLeft.duration(ANIM_MS)}
                exiting={FadeOutLeft.duration(ANIM_MS)}
                style={[styles.headerSlotFill, styles.headerLeft]}
              >
                <View style={styles.headerAvatar}>
                  <Feather
                    name="user"
                    size={20}
                    color="rgba(255,255,255,0.85)"
                  />
                  <FillImage source={primaryPhoto(MY_PROFILE)} />
                </View>
                <View style={styles.flexShrink}>
                  <Text style={styles.userName} numberOfLines={1}>
                    {MY_PROFILE.name}
                  </Text>
                  <Text style={styles.greeting}>Reg No: {MY_PROFILE.id}</Text>
                </View>
              </Animated.View>
            )}
          </View>

          <View style={styles.headerRight}>
            <Pressable style={styles.iconBtn} onPress={toggleSearch}>
              <Ionicons
                name={searchOpen ? "close" : "search"}
                size={18}
                color={COLORS.red}
              />
            </Pressable>
            <Pressable
              style={styles.iconBtn}
              onPress={() => navigation.navigate("Filter")}
            >
              <Ionicons name="filter" size={18} color={COLORS.red} />
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <Ionicons
                name="notifications-outline"
                size={18}
                color={COLORS.red}
              />
            </Pressable>
          </View>
        </View>

        {current ? (
          <View style={styles.cardArea}>
            <View style={styles.backCardRed} />
            <View style={styles.backCardGreen} />

            <SwipeCard
              key={current.id}
              profile={current}
              previousProfile={profiles[index - 1]}
              nextProfile={profiles[index + 1]}
              onSwipe={handleSwipe}
            />
          </View>
        ) : (
          <View style={styles.emptyWrap}>
            <Feather name="search" size={40} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>No profile found</Text>
            <Text style={styles.emptyText}>
              No profile matches "{query.trim()}".
            </Text>
          </View>
        )}
      </View>

      <BottomTabBar active="Profiles" />

      <SwipeGuideModal visible={showGuide} onClose={closeGuide} />
    </View>
  );
}
