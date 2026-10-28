import AlreadyInCartModal from "@/components/AlreadyInCartModal";
import ConfirmModal from "@/components/ConfirmModal";
import DownloadPdfModal, { PdfLanguage } from "@/components/DownloadPdfModal";
import HeroPhoto, { useHeroHeight } from "@/components/HeroPhoto";
import {
  HoroscopeViewer,
  PoruthamBoard,
  PoruthamPeople,
  PoruthamResult,
} from "@/components/ProfileSections";
import { Profile, SAMPLE_PROFILES } from "@/constants/SampleProfile";
import { useCart } from "@/context/CartContext";
import { useDownloads } from "@/context/DownloadsContext";
import { useLikedProfiles } from "@/context/LikedProfilesContext";
import { imageSource, profilePhotos } from "@/utils/profile";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
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
const SCREEN_WIDTH = Dimensions.get("window").width;
const PROFILE_SLIDE_DISTANCE = SCREEN_WIDTH * 0.3;
const PROFILE_EXIT_MS = 150;
const PROFILE_ENTER_MS = 240;
const SWIPE_DOWN_DISTANCE = 80;
const SWIPE_DOWN_VELOCITY = 900;
const SPRING_BACK = { damping: 18, stiffness: 220 };
const PHOTO_SWIPE_DISTANCE = 40;
const PHOTO_SWIPE_VELOCITY = 500;
const PROFILE_SWIPE_DISTANCE = 60;
const PROFILE_SWIPE_VELOCITY = 600;

export default function ProfileDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const profile: Profile = route.params?.profile ?? SAMPLE_PROFILES[0];

  const fromWishlist: boolean = route.params?.fromWishlist ?? false;
  const fromCart: boolean = route.params?.fromCart ?? false;
  const fromDownloads: boolean = route.params?.fromDownloads ?? false;

  const {
    liked: wishlist,
    isLiked,
    like,
    toggleLike,
    unlike,
  } = useLikedProfiles();
  const liked = isLiked(profile.id);
  const showRemoveFromWishlist = fromWishlist && liked;
  const { cart, isInCart, addToCart, removeFromCart } = useCart();
  const showRemoveFromCart = fromCart && isInCart(profile.id);
  const { downloads, addDownload, removeDownload } = useDownloads();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [alreadyInCartOpen, setAlreadyInCartOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const scrollRef = useRef<Animated.ScrollView>(null);
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

  // Profile switch: the current profile slides out in the swipe direction,
  // then the next one slides in from the opposite side.
  const slideX = useSharedValue(0);
  const slideOpacity = useSharedValue(1);
  const enterDirection = useRef(0);
  const switching = useRef(false);
  const slideStyle = useAnimatedStyle(() => ({
    opacity: slideOpacity.value,
    transform: [{ translateX: slideX.value }],
  }));
  const setProfileParam = useCallback(
    (next: Profile) => navigation.setParams({ profile: next }),
    [navigation],
  );
  const goToProfile = useCallback(
    (next: Profile, direction: 1 | -1) => {
      if (switching.current) return;
      switching.current = true;
      enterDirection.current = direction;
      const exit = {
        duration: PROFILE_EXIT_MS,
        easing: Easing.in(Easing.cubic),
      };
      slideOpacity.value = withTiming(0, exit);
      slideX.value = withTiming(
        -direction * PROFILE_SLIDE_DISTANCE,
        exit,
        () => {
          runOnJS(setProfileParam)(next);
        },
      );
    },
    [setProfileParam, slideOpacity, slideX],
  );
  const finishSwitch = useCallback(() => {
    switching.current = false;
  }, []);

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
    scrollRef.current?.scrollTo({ y: 0, animated: false });

    const direction = enterDirection.current;
    if (!direction) return;
    enterDirection.current = 0;
    const enter = {
      duration: PROFILE_ENTER_MS,
      easing: Easing.out(Easing.cubic),
    };
    slideX.value = direction * PROFILE_SLIDE_DISTANCE;
    slideX.value = withTiming(0, enter, () => {
      runOnJS(finishSwitch)();
    });
    slideOpacity.value = withTiming(1, enter);
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
    addDownload(profile);
    Alert.alert("Download", "PDF download will be available soon.");
    if (showRemoveFromWishlist) {
      unlike(profile.id);
      showNextFrom(wishlist);
    } else if (showRemoveFromCart) {
      removeFromCart(profile.id);
      showNextFrom(cart);
    }
  }

  function handleDownloadPdf(language: PdfLanguage) {
    setPdfOpen(false);
    // TODO: generate the profile PDF in the chosen language.
    const label = language === "tamil" ? "Tamil" : "English";
    Alert.alert("Download", `${label} PDF download will be available soon.`);
  }

  function handleDeleteDownload() {
    setDeleteOpen(false);
    removeDownload(profile.id);
    showNextFrom(downloads);
  }

  function handleAddToCart() {
    if (isInCart(profile.id)) {
      setAlreadyInCartOpen(true);
      return;
    }
    addToCart(profile);
    unlike(profile.id);
    if (fromWishlist) {
      showNextFrom(wishlist);
      return;
    }
    showNextFrom(
      SAMPLE_PROFILES.filter((p) => p.id === profile.id || !isInCart(p.id)),
    );
  }

  function handleToggleWishlist() {
    if (showRemoveFromCart) {
      like(profile);
      removeFromCart(profile.id);
      showNextFrom(cart);
      return;
    }
    if (!liked) removeFromCart(profile.id);
    toggleLike(profile);
  }

  function viewCart() {
    setAlreadyInCartOpen(false);
    navigation.navigate("Cart");
  }

  // Shows the neighbouring profile from the list, or goes back to the
  // list's empty state when this was the last one.
  function showNextFrom(list: Profile[]) {
    const index = list.findIndex((p) => p.id === profile.id);
    const remaining = list.filter((p) => p.id !== profile.id);
    if (remaining.length === 0) {
      goBack();
      return;
    }
    const next = remaining[Math.min(index, remaining.length - 1)];
    goToProfile(next, 1);
  }

  function handleRemoveFromWishlist() {
    unlike(profile.id);
    showNextFrom(wishlist);
  }

  function handleRemoveFromCart() {
    removeFromCart(profile.id);
    showNextFrom(cart);
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

  const siblings = fromWishlist
    ? wishlist
    : fromCart
      ? cart
      : fromDownloads
        ? downloads
        : SAMPLE_PROFILES;

  const stepProfile = useCallback(
    (step: number) => {
      const index = siblings.findIndex((p) => p.id === profile.id);
      if (index === -1) return;
      const next = siblings[index + step];
      if (next) goToProfile(next, step > 0 ? 1 : -1);
    },
    [siblings, profile.id, goToProfile],
  );

  const profileSwipe = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-20, 20])
        .failOffsetY([-12, 12])
        .onEnd((event) => {
          if (
            event.translationX < -PROFILE_SWIPE_DISTANCE ||
            event.velocityX < -PROFILE_SWIPE_VELOCITY
          ) {
            runOnJS(stepProfile)(1);
          } else if (
            event.translationX > PROFILE_SWIPE_DISTANCE ||
            event.velocityX > PROFILE_SWIPE_VELOCITY
          ) {
            runOnJS(stepProfile)(-1);
          }
        }),
    [stepProfile],
  );

  const cartButton = showRemoveFromCart ? (
    <Pressable style={styles.cartBtn} onPress={handleRemoveFromCart}>
      <MaterialCommunityIcons
        name="cart-remove"
        size={18}
        color={COLORS.primaryDark}
      />
      <Text style={styles.cartText} numberOfLines={2}>
        Remove Cart
      </Text>
    </Pressable>
  ) : (
    <Pressable
      style={styles.cartBtn}
      onPress={handleAddToCart}
      accessibilityLabel="Add to cart"
    >
      <Feather name="plus" size={16} color={COLORS.primaryDark} />
      <Text style={styles.cartText} numberOfLines={1}>
        Cart
      </Text>
    </Pressable>
  );

  const downloadButton = (
    <Pressable style={styles.interestBtn} onPress={handleDownload}>
      <Feather name="download" size={18} color={COLORS.red} />
      <Text style={styles.interestText} numberOfLines={1}>
        Download
      </Text>
    </Pressable>
  );

  return (
    <GestureDetector gesture={swipeDown}>
      <Animated.View style={[styles.container, pageStyle]}>
        <GestureDetector gesture={contentScroll}>
          <Animated.ScrollView
            ref={scrollRef}
            style={slideStyle}
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
                      <Pressable
                        key={index}
                        onPress={() => selectPhoto(index)}
                        style={[
                          styles.thumb,
                          index === activeIndex && styles.thumbActive,
                        ]}
                      >
                        <Image source={source} style={styles.thumbImage} />
                      </Pressable>
                    );
                  })}
                </ScrollView>
              )}

              <View style={styles.heroTopRow}>
                <Pressable style={styles.heroBtn} onPress={goBack}>
                  <Feather name="chevron-left" size={22} color={COLORS.red} />
                </Pressable>
                <Pressable
                  style={styles.heroBtn}
                  onPress={handleToggleWishlist}
                >
                  <Ionicons
                    name={liked ? "heart" : "heart-outline"}
                    size={22}
                    color={COLORS.red}
                  />
                </Pressable>
              </View>
            </View>

            {/* Details sheet */}
            <GestureDetector gesture={profileSwipe}>
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
            </GestureDetector>
          </Animated.ScrollView>
        </GestureDetector>

        {/* Footer actions */}
        <View style={styles.footer}>
          {!fromDownloads && (
            <View style={styles.footerRow}>
              {fromCart && downloadButton}
              {cartButton}
              {!fromCart && downloadButton}
              {showRemoveFromWishlist ? (
                <Pressable
                  style={styles.wishlistBtn}
                  onPress={handleRemoveFromWishlist}
                >
                  <Ionicons
                    name="heart-dislike-outline"
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text style={styles.wishlistText} numberOfLines={2}>
                    Remove Wishlist
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  style={[
                    styles.wishlistBtn,
                    liked && styles.wishlistBtnActive,
                  ]}
                  onPress={handleToggleWishlist}
                >
                  <Ionicons
                    name={liked ? "heart" : "heart-outline"}
                    size={18}
                    color={liked ? COLORS.white : COLORS.primary}
                  />
                  <Text
                    style={[
                      styles.wishlistText,
                      liked && styles.wishlistTextActive,
                    ]}
                    numberOfLines={1}
                  >
                    {liked ? "Wishlisted" : "Wishlist"}
                  </Text>
                </Pressable>
              )}
            </View>
          )}
          {fromDownloads && (
            <View style={styles.footerRow}>
              <Pressable style={styles.pdfBtn} onPress={() => setPdfOpen(true)}>
                <Feather name="file-text" size={18} color={COLORS.primary} />
                <Text style={styles.pdfText}>Download as PDF</Text>
              </Pressable>
              <Pressable
                style={styles.deleteBtn}
                onPress={() => setDeleteOpen(true)}
              >
                <Feather name="trash-2" size={18} color={COLORS.red} />
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
          )}
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

        <AlreadyInCartModal
          visible={alreadyInCartOpen}
          name={profile.name}
          onClose={() => setAlreadyInCartOpen(false)}
          onViewCart={viewCart}
        />

        <DownloadPdfModal
          visible={pdfOpen}
          onClose={() => setPdfOpen(false)}
          onSelect={handleDownloadPdf}
        />

        <ConfirmModal
          visible={deleteOpen}
          icon="trash-2"
          title="Delete profile?"
          message={`Are you sure you want to remove ${profile.name}'s profile from your downloads?`}
          confirmLabel="Delete"
          onCancel={() => setDeleteOpen(false)}
          onConfirm={handleDeleteDownload}
        />
      </Animated.View>
    </GestureDetector>
  );
}
