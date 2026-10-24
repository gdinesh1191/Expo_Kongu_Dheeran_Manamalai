import { Profile } from "@/constants/SampleProfile";
import HeroPhoto from "@/components/HeroPhoto";
import { clean, details, nameWithAge } from "@/utils/profile";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { COLORS, styles } from "../Home/style";

export type SwipeDirection = "next" | "previous" | "up";
type FeatherIcon = React.ComponentProps<typeof Feather>["name"];

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_X_THRESHOLD = SCREEN_WIDTH * 0.28;
const SWIPE_UP_THRESHOLD = 80;
const UP_FLING_VELOCITY = 500;
const UP_AXIS_BIAS = 0.6;
const AXIS_LOCK_DISTANCE = 6;
const FLING_VELOCITY = 800;
const OFFSCREEN_X = SCREEN_WIDTH * 1.5;
const EDGE_RESISTANCE = 0.25;
const BACK_CARD_SCALE = 0.9;
const SPRING_BACK = { damping: 16, stiffness: 180 };

export function ProfileCard({ profile }: { profile: Profile }) {
  const infoLines = [
    { icon: "calendar", text: clean(profile.dob) },
    { icon: "book-open", text: clean(profile.EducationCourse) },
    { icon: "briefcase", text: clean(profile.Designation) },
    { icon: "map-pin", text: clean(profile.location) },
  ].filter((l): l is { icon: FeatherIcon; text: string } => !!l.text);
  const tags = details([
    ["Koottam", profile.Koottam],
    ["Porutham", profile.Porutham],
  ]);

  return (
    <View style={styles.card}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatarHead} />
        <View style={styles.avatarBody} />
      </View>
      <HeroPhoto source={profile.photo} />

      <View pointerEvents="none" style={styles.gradient} />

      <View style={styles.cardInfo}>
        <Text style={styles.profileName}>{nameWithAge(profile)}</Text>

        {infoLines.map((line) => (
          <View key={line.icon} style={styles.infoLine}>
            <Feather name={line.icon} size={13} color="rgba(255,255,255,0.9)" />
            <Text style={styles.profileMeta} numberOfLines={1}>
              {line.text}
            </Text>
          </View>
        ))}

        <View style={styles.tagsRow}>
          {tags.map((tag) => (
            <View key={tag.label} style={styles.tag}>
              <Text style={styles.tagText}>
                {tag.label}: {tag.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

type Props = {
  profile: Profile;
  previousProfile?: Profile;
  nextProfile?: Profile;
  onSwipe: (direction: SwipeDirection) => void;
};

export default function SwipeCard({ profile, previousProfile, nextProfile, onSwipe }: Props) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const hasPrevious = !!previousProfile;
  const hasNext = !!nextProfile;

  // The drag locks to one axis on first movement: left/right, or up only.
  const axis = useSharedValue<"none" | "horizontal" | "vertical">("none");

  // Dragging left reveals the next profile, dragging right reveals the previous one.
  const pan = Gesture.Pan()
    .minDistance(10)
    .onBegin(() => {
      axis.value = "none";
    })
    .onUpdate((e) => {
      // Translation can still be zero when the gesture activates on Android, so the axis is
      // chosen from the first update that has actually moved.
      if (axis.value === "none") {
        const dx = Math.abs(e.translationX);
        const dy = Math.abs(e.translationY);
        if (dx < AXIS_LOCK_DISTANCE && dy < AXIS_LOCK_DISTANCE) return;
        // Thumbs rarely swipe perfectly straight up, so favour the vertical axis for upward drags.
        const upward = e.translationY < 0 && dy > dx * UP_AXIS_BIAS;
        axis.value = upward || dy > dx ? "vertical" : "horizontal";
      }

      if (axis.value === "horizontal") {
        const blocked = (e.translationX > 0 && !hasPrevious) || (e.translationX < 0 && !hasNext);
        x.value = blocked ? e.translationX * EDGE_RESISTANCE : e.translationX;
        y.value = 0;
      } else {
        x.value = 0;
        y.value = Math.min(e.translationY, 0);
      }
    })
    .onEnd((e) => {
      const horizontal = axis.value === "horizontal";
      const vertical = axis.value === "vertical";
      axis.value = "none";
      const passed =
        Math.abs(e.translationX) > SWIPE_X_THRESHOLD || Math.abs(e.velocityX) > FLING_VELOCITY;
      const goingRight = e.translationX > 0;

      if (horizontal && passed && (goingRight ? hasPrevious : hasNext)) {
        const target = goingRight ? OFFSCREEN_X : -OFFSCREEN_X;
        const remaining = Math.abs(target - x.value);
        const speed = Math.max(Math.abs(e.velocityX), 1800);
        const duration = Math.min(Math.max((remaining / speed) * 1000, 180), 320);

        x.value = withTiming(target, { duration, easing: Easing.out(Easing.cubic) }, (finished) => {
          if (finished) runOnJS(onSwipe)(goingRight ? "previous" : "next");
        });
        return;
      }

      if (vertical && (e.translationY < -SWIPE_UP_THRESHOLD || e.velocityY < -UP_FLING_VELOCITY)) {
        runOnJS(onSwipe)("up");
      }

      x.value = withSpring(0, SPRING_BACK);
      y.value = withSpring(0, SPRING_BACK);
    });

  const tap = Gesture.Tap().onEnd((_e, success) => {
    if (success) runOnJS(onSwipe)("up");
  });

  const gesture = Gesture.Race(pan, tap);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      Math.abs(x.value),
      [SCREEN_WIDTH * 0.5, OFFSCREEN_X],
      [1, 0.4],
      Extrapolation.CLAMP,
    ),
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      {
        rotate: `${interpolate(x.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-10, 0, 10])}deg`,
      },
    ],
  }));

  // The card behind grows to full size as the top card leaves, so the swap is seamless.
  const backCardStyle = (visible: boolean) => {
    "worklet";
    const progress = interpolate(Math.abs(x.value), [0, SCREEN_WIDTH], [0, 1], Extrapolation.CLAMP);
    return {
      opacity: visible ? interpolate(progress, [0, 1], [0.6, 1]) : 0,
      transform: [
        { scale: interpolate(progress, [0, 1], [BACK_CARD_SCALE, 1]) },
        { translateY: interpolate(progress, [0, 1], [14, 0]) },
      ],
    };
  };

  const previousLayerStyle = useAnimatedStyle(() => backCardStyle(x.value > 0));
  const nextLayerStyle = useAnimatedStyle(() => backCardStyle(x.value < 0));

  const detailsStampStyle = useAnimatedStyle(() => ({
    opacity:
      Math.abs(x.value) > Math.abs(y.value)
        ? 0
        : interpolate(y.value, [-SWIPE_UP_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <>
      {previousProfile && (
        <Animated.View style={[styles.cardLayer, previousLayerStyle]} pointerEvents="none">
          <ProfileCard profile={previousProfile} />
        </Animated.View>
      )}
      {nextProfile && (
        <Animated.View style={[styles.cardLayer, nextLayerStyle]} pointerEvents="none">
          <ProfileCard profile={nextProfile} />
        </Animated.View>
      )}

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.cardLayer, cardStyle]}>
          <ProfileCard profile={profile} />
          <Animated.View
            style={[styles.stamp, styles.stampDetails, detailsStampStyle]}
            pointerEvents="none"
          >
            <Text style={[styles.stampText, { color: COLORS.white }]}>VIEW PROFILE</Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}
