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
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, styles } from "../Home/style";
import SwipeCard, { SwipeDirection } from "./SwipeCard";
import SwipeGuideModal from "./SwipeGuideModal";

const SWIPE_GUIDE_SEEN_KEY = "home_swipe_guide_seen";

export default function ProfilePage() {
  const navigation = useNavigation<any>();
  const [index, setIndex] = useState(0);

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
      direction === "next"
        ? Math.min(i + 1, profiles.length - 1)
        : Math.max(i - 1, 0),
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerAvatar}>
              <Feather name="user" size={20} color="rgba(255,255,255,0.85)" />
              <FillImage source={primaryPhoto(MY_PROFILE)} />
            </View>
            <View>
              <Text style={styles.userName} numberOfLines={1}>
                {MY_PROFILE.name}
              </Text>
              <Text style={styles.greeting}>Reg No: {MY_PROFILE.id}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="filter" size={20} color={COLORS.red} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={COLORS.red}
              />
            </TouchableOpacity>
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
        ) : null}
      </View>

      <BottomTabBar active="Profiles" />

      <SwipeGuideModal visible={showGuide} onClose={closeGuide} />
    </View>
  );
}
