import HeroPhoto, { useHeroHeight } from "@/components/HeroPhoto";
import {
  HoroscopeViewer,
  PoruthamBoard,
  PoruthamPeople,
  PoruthamResult,
} from "@/components/ProfileSections";
import { Profile, SAMPLE_PROFILES } from "@/constants/SampleProfile";
import { useLikedProfiles } from "@/context/LikedProfilesContext";
import { imageSource, profilePhotos } from "@/utils/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
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
import SwipeGuideModal, { SwipeGuideStep } from "../profile/SwipeGuideModal";
import ProfileInfo, { HoroscopeButton, Section } from "./ProfileInfo";
import { COLORS, SHEET_OVERLAP, styles } from "./style";

const DETAILS_GUIDE_SEEN_KEY = "profile_details_swipe_guide_seen";
const PHOTO_GUIDE_STEPS: SwipeGuideStep[] = [
  {
    key: "left",
    icon: "gesture-swipe-left",
    title: "Swipe left",
    text: "See the next photo",
    target: { x: -80, y: 0 },
  },
  {
    key: "right",
    icon: "gesture-swipe-right",
    title: "Swipe right",
    text: "See the previous photo",
    target: { x: 80, y: 0 },
  },
];
const BACK_GUIDE_STEP: SwipeGuideStep = {
  key: "down",
  icon: "gesture-swipe-down",
  title: "Swipe down",
  text: "Go back to the profiles",
  target: { x: 0, y: 70 },
};

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_DOWN_DISTANCE = 80;
const SWIPE_DOWN_VELOCITY = 900;
const SPRING_BACK = { damping: 18, stiffness: 220 };
const PHOTO_SWIPE_DISTANCE = 40;
const PHOTO_SWIPE_VELOCITY = 500;

export default function ProfileDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const profile: Profile = route.params?.profile ?? SAMPLE_PROFILES[0];

  const { isLiked, toggleLike } = useLikedProfiles();
  const liked = isLiked(profile.id);
  const photos = profilePhotos(profile);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [horoscopeOpen, setHoroscopeOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const hasMultiplePhotos = photos.length > 1;
  const guideSteps = useMemo(
    () =>
      hasMultiplePhotos
        ? [...PHOTO_GUIDE_STEPS, BACK_GUIDE_STEP]
        : [BACK_GUIDE_STEP],
    [hasMultiplePhotos],
  );
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
    AsyncStorage.getItem(DETAILS_GUIDE_SEEN_KEY)
      .then((seen) => {
        if (!seen) setShowGuide(true);
      })
      .catch(() => setShowGuide(true));
  }, []);

  function closeGuide() {
    setShowGuide(false);
    AsyncStorage.setItem(DETAILS_GUIDE_SEEN_KEY, "1").catch(() => {});
  }

  useEffect(() => {
    if (paused || photos.length < 2) return;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused, photos.length]);

  function handleDownload() {
    // TODO: generate the profile PDF directly from this page.
    Alert.alert("Download", "PDF download will be available soon.");
  }

  function selectPhoto(index: number) {
    setActiveIndex(index);
    setPaused(true);
  }

  const stepPhoto = useCallback(
    (step: number) => {
      if (photos.length < 2) return;
      setActiveIndex((index) => (index + step + photos.length) % photos.length);
      setPaused(true);
    },
    [photos.length],
  );

  const photoSwipe = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-15, 15])
        .failOffsetY([-12, 12])
        .onEnd((event) => {
          if (
            event.translationX < -PHOTO_SWIPE_DISTANCE ||
            event.velocityX < -PHOTO_SWIPE_VELOCITY
          ) {
            runOnJS(stepPhoto)(1);
          } else if (
            event.translationX > PHOTO_SWIPE_DISTANCE ||
            event.velocityX > PHOTO_SWIPE_VELOCITY
          ) {
            runOnJS(stepPhoto)(-1);
          }
        }),
    [stepPhoto],
  );

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
              <GestureDetector gesture={photoSwipe}>
                <View style={styles.heroPhotoArea}>
                  {activePhoto ? (
                    <HeroPhoto
                      source={activePhoto}
                      bottomInset={SHEET_OVERLAP}
                    />
                  ) : (
                    <View style={styles.avatarWrap}>
                      <View style={styles.avatarHead} />
                      <View style={styles.avatarBody} />
                    </View>
                  )}
                </View>
              </GestureDetector>

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
              <ProfileInfo profile={profile} />

              <Section title="Porutham" icon="heart" plain>
                <PoruthamPeople profile={profile} />
              </Section>

              <Section title="Porutham Details" icon="check-square" plain>
                <PoruthamBoard profile={profile} />
                <PoruthamResult profile={profile} />
              </Section>

              {!!profile.horoscopeImage && (
                <HoroscopeButton onPress={() => setHoroscopeOpen(true)} />
              )}
            </View>
          </Animated.ScrollView>
        </GestureDetector>

        {/* Footer actions */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.wishlistBtn, liked && styles.wishlistBtnActive]}
            onPress={() => toggleLike(profile)}
            activeOpacity={0.85}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={18}
              color={liked ? COLORS.white : COLORS.primary}
            />
            <Text
              style={[styles.wishlistText, liked && styles.wishlistTextActive]}
            >
              {liked ? "Wishlisted" : "Wishlist"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.interestBtn}
            onPress={handleDownload}
            activeOpacity={0.85}
          >
            <Feather name="download" size={18} color={COLORS.red} />
            <Text style={styles.interestText}>Download Profile</Text>
          </TouchableOpacity>
        </View>

        <HoroscopeViewer
          source={profile.horoscopeImage}
          visible={horoscopeOpen}
          onClose={() => setHoroscopeOpen(false)}
        />

        <SwipeGuideModal
          visible={showGuide}
          onClose={closeGuide}
          title="How to view this profile"
          steps={guideSteps}
        />
      </Animated.View>
    </GestureDetector>
  );
}
