import { scaleFont } from "@/constants/ScaleFont";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "./style";

const STEPS = [
  {
    key: "left",
    icon: "gesture-swipe-left",
    title: "Swipe left",
    text: "See the next profile",
    target: { x: -80, y: 0 },
  },
  {
    key: "right",
    icon: "gesture-swipe-right",
    title: "Swipe right",
    text: "Go back to the previous profile",
    target: { x: 80, y: 0 },
  },
  {
    key: "up",
    icon: "gesture-swipe-up",
    title: "Swipe up",
    text: "Open the full profile details",
    target: { x: 0, y: -70 },
  },
] as const;

const STEP_DURATION = 2000;
const MOVE_DELAY = 350;
const MOVE_DURATION = 700;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SwipeGuideModal({ visible, onClose }: Props) {
  const [step, setStep] = useState(0);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (!visible) return;

    const { target } = STEPS[step];
    const easing = Easing.out(Easing.cubic);
    const reset = (to: number) => withTiming(to, { duration: 0 });
    tx.value = withSequence(
      reset(0),
      withDelay(MOVE_DELAY, withTiming(target.x, { duration: MOVE_DURATION, easing })),
    );
    ty.value = withSequence(
      reset(0),
      withDelay(MOVE_DELAY, withTiming(target.y, { duration: MOVE_DURATION, easing })),
    );
    opacity.value = withSequence(
      reset(1),
      withDelay(MOVE_DELAY + MOVE_DURATION, withTiming(0, { duration: 300 })),
    );

    const timer = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_DURATION);
    return () => clearTimeout(timer);
  }, [step, visible, tx, ty, opacity]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { rotate: `${interpolate(tx.value, [-80, 0, 80], [-10, 0, 10])}deg` },
    ],
  }));

  const handStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }));

  const current = STEPS[step];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>How to browse profiles</Text>

          {/* Animated demo */}
          <View style={styles.demo}>
            <View style={[styles.miniCard, styles.miniCardBack]} />
            <Animated.View style={[styles.miniCard, cardStyle]}>
              <View style={styles.miniHead} />
              <View style={styles.miniBody} />
            </Animated.View>
            <Animated.View style={[styles.hand, handStyle]} pointerEvents="none">
              <MaterialCommunityIcons name="hand-pointing-up" size={38} color={COLORS.red} />
            </Animated.View>
          </View>

          {/* Current gesture */}
          <View style={styles.stepRow}>
            <View style={styles.stepIcon}>
              <MaterialCommunityIcons name={current.icon} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.stepTextWrap}>
              <Text style={styles.stepTitle}>{current.title}</Text>
              <Text style={styles.stepText}>{current.text}</Text>
            </View>
          </View>

          <View style={styles.dots}>
            {STEPS.map((s, i) => (
              <TouchableOpacity key={s.key} onPress={() => setStep(i)} hitSlop={8}>
                <View style={[styles.dot, i === step && styles.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Feather name="check" size={18} color={COLORS.white} />
            <Text style={styles.buttonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const MINI_W = scaleFont(110);
const MINI_H = scaleFont(150);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleFont(24),
  },
  sheet: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: scaleFont(24),
    padding: scaleFont(22),
    alignItems: "center",
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: "800",
    color: COLORS.text,
  },
  demo: {
    width: "100%",
    height: MINI_H + scaleFont(70),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleFont(12),
    borderRadius: scaleFont(18),
    backgroundColor: COLORS.primaryLight,
    overflow: "hidden",
  },
  miniCard: {
    position: "absolute",
    width: MINI_W,
    height: MINI_H,
    borderRadius: scaleFont(16),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  miniCardBack: {
    backgroundColor: "#B9DDB9",
    transform: [{ scale: 0.9 }, { translateY: scaleFont(8) }],
  },
  miniHead: {
    width: scaleFont(36),
    height: scaleFont(36),
    borderRadius: scaleFont(18),
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: scaleFont(10),
  },
  miniBody: {
    width: scaleFont(76),
    height: scaleFont(40),
    borderTopLeftRadius: scaleFont(38),
    borderTopRightRadius: scaleFont(38),
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  hand: {
    position: "absolute",
    top: "50%",
    marginTop: scaleFont(20),
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(12),
    alignSelf: "stretch",
    marginTop: scaleFont(18),
  },
  stepIcon: {
    width: scaleFont(44),
    height: scaleFont(44),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  stepTextWrap: {
    flex: 1,
  },
  stepTitle: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.text,
  },
  stepText: {
    fontSize: scaleFont(13),
    color: COLORS.muted,
    marginTop: scaleFont(2),
  },
  dots: {
    flexDirection: "row",
    gap: scaleFont(8),
    marginTop: scaleFont(16),
  },
  dot: {
    width: scaleFont(8),
    height: scaleFont(8),
    borderRadius: scaleFont(4),
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: scaleFont(22),
    backgroundColor: COLORS.primary,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(8),
    alignSelf: "stretch",
    height: scaleFont(50),
    marginTop: scaleFont(18),
    borderRadius: scaleFont(14),
    backgroundColor: COLORS.red,
  },
  buttonText: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: COLORS.white,
  },
});
