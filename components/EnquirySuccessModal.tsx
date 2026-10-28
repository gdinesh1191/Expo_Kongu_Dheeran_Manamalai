import { scaleFont } from "@/constants/ScaleFont";
import React from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";

const COLORS = {
  bg: "#0B3B1E",
  backdrop: "rgba(0, 0, 0, 0.6)",
  gold: "#B79B5B",
  goldSoft: "rgba(183, 155, 91, 0.18)",
  white: "#FFFFFF",
  red: "#B71C1C",
  redDark: "#8E1212",
  soft: "rgba(255,255,255,0.75)",
};

type Props = {
  visible: boolean;
  onOk: () => void;
};

export default function EnquirySuccessModal({ visible, onOk }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onOk}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.iconWrap}>
            <View style={styles.iconCircle}>
              <RemixIcon name="check-line" size={34} color={COLORS.bg} />
            </View>
          </View>

          <View style={styles.titleRow}>
            <View style={styles.line} />
            <Text style={styles.title}>Enquiry Submitted</Text>
            <View style={styles.line} />
          </View>
          <Text style={styles.text}>
            Thank you for your interest! Our team will contact you shortly to
            guide you through the next steps of your registration.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={onOk}
          >
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.backdrop,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleFont(24),
  },
  sheet: {
    width: "100%",
    backgroundColor: COLORS.bg,
    borderRadius: scaleFont(24),
    padding: scaleFont(24),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  iconWrap: {
    width: scaleFont(84),
    height: scaleFont(84),
    borderRadius: scaleFont(42),
    backgroundColor: COLORS.goldSoft,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: scaleFont(60),
    height: scaleFont(60),
    borderRadius: scaleFont(30),
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(12),
    marginTop: scaleFont(18),
  },
  line: {
    width: scaleFont(28),
    height: 1.5,
    backgroundColor: COLORS.gold,
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: COLORS.white,
    textAlign: "center",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
  },
  text: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(21),
    color: COLORS.soft,
    textAlign: "center",
    marginTop: scaleFont(12),
  },
  button: {
    alignSelf: "stretch",
    height: scaleFont(52),
    borderRadius: scaleFont(16),
    backgroundColor: COLORS.red,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.redDark,
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleFont(24),
  },
  buttonPressed: {
    backgroundColor: COLORS.redDark,
  },
  buttonText: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: COLORS.white,
  },
});
