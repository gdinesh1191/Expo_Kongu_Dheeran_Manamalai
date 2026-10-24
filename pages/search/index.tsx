import BottomTabBar from "@/components/BottomTabBar";
import FillImage from "@/components/FillImage";
import { MY_PROFILE, Profile, SAMPLE_PROFILES } from "@/constants/SampleProfile";
import { useLikedProfiles } from "@/context/LikedProfilesContext";
import { clean, nameWithAge } from "@/utils/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, styles } from "../Home/style";
import SwipeCard, { SwipeDirection } from "./SwipeCard";
import SwipeGuideModal from "./SwipeGuideModal";

const SWIPE_GUIDE_SEEN_KEY = "home_swipe_guide_seen";

const FILTERS = ["Discover", "Matches", "Liked", "Nearby"] as const;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Search() {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Discover");
  const [index, setIndex] = useState(0);
  const { liked: saved, unlike: unsave } = useLikedProfiles();

  const [showGuide, setShowGuide] = useState(false);

  const profiles = SAMPLE_PROFILES;
  const current = profiles[index];

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
      direction === "next" ? Math.min(i + 1, profiles.length - 1) : Math.max(i - 1, 0),
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/Images/Logo_bg.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.userName} numberOfLines={1}>
                {MY_PROFILE.name}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="filter" size={20} color={COLORS.red} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.red} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.segment}>
          {FILTERS.map((item) => {
            const active = item === filter;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.segmentItem, active && styles.segmentItemActive]}
                onPress={() => setFilter(item)}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filter === "Liked" ? (
          <FlatList
            data={saved}
            keyExtractor={(item) => item.id}
            style={styles.savedList}
            contentContainerStyle={saved.length === 0 && styles.emptyWrap}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <>
                <Ionicons name="heart-outline" size={48} color={COLORS.primary} />
                <Text style={styles.emptyTitle}>No saved profiles yet</Text>
                <Text style={styles.emptyText}>
                  Tap the heart on a profile&apos;s details to save it here.
                </Text>
              </>
            }
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.savedItem} onPress={() => openDetails(item)}>
                <View style={styles.savedAvatar}>
                  <Feather name="user" size={24} color="rgba(255,255,255,0.85)" />
                  <FillImage source={item.photo} />
                </View>
                <View style={styles.savedInfo}>
                  <Text style={styles.savedName}>{nameWithAge(item)}</Text>
                  <Text style={styles.savedMeta} numberOfLines={1}>
                    {[clean(item.EducationCourse), clean(item.location)].filter(Boolean).join(" · ")}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.savedRemove}
                  onPress={() => unsave(item.id)}
                  hitSlop={8}
                >
                  <Feather name="x" size={18} color={COLORS.red} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        ) : current ? (
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
        ) : null}
      </View>

      <BottomTabBar active="Profiles" />

      <SwipeGuideModal visible={showGuide} onClose={closeGuide} />
    </View>
  );
}
