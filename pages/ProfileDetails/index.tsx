import HeroPhoto, { useHeroHeight } from "@/components/HeroPhoto";
import {
  ChipList,
  DetailsGrid,
  HoroscopeChart,
  PoruthamMatch,
  SectionTitle,
  SubTitle,
} from "@/components/ProfileSections";
import { Profile, SAMPLE_PROFILES } from "@/constants/SampleProfile";
import { useLikedProfiles } from "@/context/LikedProfilesContext";
import {
  clean,
  dasaBalanceText,
  details,
  educationText,
  imageSource,
  nameWithAge,
  profilePhotos,
} from "@/utils/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { COLORS, SHEET_OVERLAP, styles } from "./style";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_DOWN_DISTANCE = 80;
const SWIPE_DOWN_VELOCITY = 900;
const SPRING_BACK = { damping: 18, stiffness: 220 };

function withOccupation(name?: string, occupation?: string) {
  const n = clean(name);
  const o = clean(occupation);
  if (n && o) return `${n} (${o})`;
  return n ?? o;
}

export default function ProfileDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const profile: Profile = route.params?.profile ?? SAMPLE_PROFILES[0];

  const { isLiked, toggleLike } = useLikedProfiles();
  const liked = isLiked(profile.id);
  const photos = profilePhotos(profile);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activePhoto = photos[activeIndex] ?? photos[0];
  const heroHeight = useHeroHeight(activePhoto, SHEET_OVERLAP);
  const scrollY = useSharedValue(0);
  const startedAtTop = useSharedValue(true);
  const touchStartY = useSharedValue(0);
  const hasOrigin = useSharedValue(false);
  const recognized = useSharedValue(false);
  const closing = useSharedValue(false);
  const dragY = useSharedValue(0);
  const pageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: dragY.value }],
  }));
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // The list keeps the drag while it can still scroll. From the top, a
  // downward swipe uses the same back action as the chevron.
  const swipeDown = useMemo(
    () =>
      Gesture.Pan()
        .maxPointers(1)
        .activeOffsetY(28)
        .failOffsetY(-8)
        .failOffsetX([-20, 20])
        .shouldCancelWhenOutside(false)
        .onTouchesDown((event, manager) => {
          if (closing.value) {
            manager.fail();
            return;
          }
          recognized.value = false;
          startedAtTop.value = scrollY.value <= 2;
          const touch = event.allTouches[0];
          if (touch) {
            touchStartY.value = touch.absoluteY;
            hasOrigin.value = true;
          } else {
            hasOrigin.value = false;
          }
        })
        .onStart(() => {
          recognized.value = true;
        })
        .onTouchesMove((event, manager) => {
          if (recognized.value || closing.value) return;
          const touch = event.allTouches[0];
          const dy =
            touch && hasOrigin.value ? touch.absoluteY - touchStartY.value : 0;
          const pulledUp = dy < -4;
          if (!startedAtTop.value || scrollY.value > 2 || pulledUp) {
            manager.fail();
            return;
          }
          if (dy > 0) dragY.value = dy;
        })
        .onUpdate((event) => {
          if (!startedAtTop.value || closing.value) return;
          dragY.value = Math.max(0, event.translationY);
        })
        .onEnd((event, success) => {
          if (closing.value) return;
          const dismiss =
            success &&
            startedAtTop.value &&
            (event.translationY > SWIPE_DOWN_DISTANCE ||
              event.velocityY > SWIPE_DOWN_VELOCITY);
          if (!dismiss) {
            if (dragY.value !== 0) dragY.value = withSpring(0, SPRING_BACK);
            return;
          }
          closing.value = true;
          const remaining = Math.max(SCREEN_HEIGHT - dragY.value, 0);
          const speed = Math.max(event.velocityY, 1400);
          const duration = Math.min(
            Math.max((remaining / speed) * 1000, 160),
            280,
          );
          dragY.value = withTiming(
            SCREEN_HEIGHT,
            { duration, easing: Easing.out(Easing.cubic) },
            (finished) => {
              if (finished) runOnJS(goBack)();
            },
          );
        })
        .onFinalize((_, success) => {
          if (success || closing.value || dragY.value === 0) return;
          dragY.value = withSpring(0, SPRING_BACK);
        }),
    [
      closing,
      dragY,
      goBack,
      hasOrigin,
      recognized,
      scrollY,
      startedAtTop,
      touchStartY,
    ],
  );
  const contentScroll = useMemo(
    () => Gesture.Native().requireExternalGestureToFail(swipeDown),
    [swipeDown],
  );

  useEffect(() => {
    setActiveIndex(0);
    setPaused(false);
  }, [profile.id]);

  useEffect(() => {
    if (paused || photos.length < 2) return;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused, photos.length]);

  function selectPhoto(index: number) {
    setActiveIndex(index);
    setPaused(true);
  }

  const personal = details([
    ["Date of birth", profile.dob],
    ["Height", profile.Height],
    ["Marital status", profile.MaritalStatus],
    ["Complexion", profile.Complex],
    ["Education", educationText(profile)],
    ["Working category", profile.WorkingCategory],
    ["Designation", profile.Designation],
    ["Birth place", profile.BirthPlace],
    ["Kula Theivam", profile.KulaTheivam],
  ]);

  const family = details([
    ["Father", withOccupation(profile.FatherName, profile.FatherOccupation)],
    ["Mother", withOccupation(profile.MotherName, profile.MotherOccupation)],
    ["Siblings", profile.SiblingsCount],
  ]);
  const assets = (profile.Property ?? []).map((p) => p.trim()).filter(Boolean);
  const expectations = details([
    ["Partner expectation", profile.expectations],
    ["Abroad", profile.AboardExpectation],
    ["Note", profile.Note],
  ]);

  const horoscope = details([
    ["Rasi", profile.Rashi],
    ["Star", profile.Star],
    ["Laknam", profile.Laknam],
    ["Horoscope", profile.Horoscope],
    ["Thisa Iruppu", profile.ThisaIruppu],
    ["Dasa balance", dasaBalanceText(profile)],
  ]);

  const tags = details([
    ["Koottam", profile.Koottam],
    ["Porutham", profile.Porutham],
  ]);

  const hasFamilySection =
    family.length > 0 || assets.length > 0 || expectations.length > 0;
  const hasHoroscopeSection = horoscope.length > 0 || !!profile.horoscopeImage;

  return (
    <GestureDetector gesture={swipeDown}>
      <Animated.View style={[styles.container, pageStyle]}>
        <GestureDetector gesture={contentScroll}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            nestedScrollEnabled
            overScrollMode="never"
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {/* Photo / hero */}
            <View style={[styles.hero, { height: heroHeight }]}>
              {activePhoto ? (
                <HeroPhoto source={activePhoto} bottomInset={SHEET_OVERLAP} />
              ) : (
                <View style={styles.avatarWrap}>
                  <View style={styles.avatarHead} />
                  <View style={styles.avatarBody} />
                </View>
              )}

              {photos.length > 1 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.thumbs}
                  contentContainerStyle={styles.thumbsContent}
                >
                  {photos.map((photo, index) => {
                    const source = imageSource(photo);
                    if (!source) return null;
                    return (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.85}
                        onPress={() => selectPhoto(index)}
                        style={[
                          styles.thumb,
                          index === activeIndex && styles.thumbActive,
                        ]}
                      >
                        <Image source={source} style={styles.thumbImage} />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}

              <View style={styles.heroTopRow}>
                <TouchableOpacity style={styles.heroBtn} onPress={goBack}>
                  <Feather name="chevron-left" size={22} color={COLORS.red} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.heroBtn}
                  onPress={() => toggleLike(profile)}
                >
                  <Ionicons
                    name={liked ? "heart" : "heart-outline"}
                    size={22}
                    color={COLORS.red}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Details sheet */}
            <View style={styles.sheet}>
              <Text style={styles.name}>{nameWithAge(profile)}</Text>
              <Text style={styles.meta}>
                {[clean(profile.location)].filter(Boolean).join(" · ")}
              </Text>
              {tags.length > 0 && (
                <View style={styles.tagsRow}>
                  {tags.map((t) => (
                    <View key={t.label} style={styles.tag}>
                      <Text style={styles.tagText}>
                        {t.label}:{" "}
                        <Text style={styles.tagValue}>{t.value}</Text>
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <SectionTitle title="Basic details" icon="user" />
              <DetailsGrid items={personal} />

              {hasFamilySection && (
                <>
                  <SectionTitle title="Family and assets" icon="home" />
                  <DetailsGrid items={family} />
                  {assets.length > 0 && (
                    <>
                      <SubTitle title="Assets" />
                      <ChipList items={assets} />
                    </>
                  )}
                  {expectations.length > 0 && (
                    <>
                      <SubTitle title="Expectations" />
                      <DetailsGrid items={expectations} />
                    </>
                  )}
                </>
              )}

              {hasHoroscopeSection && (
                <>
                  <SectionTitle title="Horoscope" icon="sun" />
                  <DetailsGrid items={horoscope} />
                  <HoroscopeChart source={profile.horoscopeImage} />
                </>
              )}

              <SectionTitle title="Porutham match" icon="heart" />
              <PoruthamMatch profile={profile} />
            </View>
          </Animated.ScrollView>
        </GestureDetector>

        {/* Footer actions */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.interestBtn}
            onPress={() => navigation.navigate("DownlodProfile", { profile })}
          >
            <Text style={styles.interestText}>Click to Download Profile</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
