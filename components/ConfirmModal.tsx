import { scaleFont } from "@/constants/ScaleFont";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../pages/Home/style";

type Props = {
  visible: boolean;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  visible,
  icon,
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop}>
        <Pressable style={styles.sheet}>
          <View style={styles.iconWrap}>
            <Feather name={icon} size={26} color={COLORS.red} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{message}</Text>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.cancelBtn]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.confirmBtn]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

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
  iconWrap: {
    width: scaleFont(60),
    height: scaleFont(60),
    borderRadius: scaleFont(30),
    backgroundColor: "#FDECEC",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: "800",
    color: COLORS.text,
    marginTop: scaleFont(14),
  },
  text: {
    fontSize: scaleFont(14),
    color: COLORS.muted,
    textAlign: "center",
    marginTop: scaleFont(6),
  },
  actions: {
    flexDirection: "row",
    gap: scaleFont(12),
    alignSelf: "stretch",
    marginTop: scaleFont(22),
  },
  button: {
    flex: 1,
    height: scaleFont(50),
    borderRadius: scaleFont(14),
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  confirmBtn: {
    backgroundColor: COLORS.red,
  },
  cancelText: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.text,
  },
  confirmText: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.white,
  },
});
