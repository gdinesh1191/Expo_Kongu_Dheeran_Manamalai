import { scaleFont } from "@/constants/ScaleFont";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../pages/Home/style";

type Props = {
  visible: boolean;
  name: string;
  onClose: () => void;
  onViewCart: () => void;
};

export default function AlreadyInCartModal({
  visible,
  name,
  onClose,
  onViewCart,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <View style={styles.iconWrap}>
            <Feather name="shopping-cart" size={26} color={COLORS.primary} />
          </View>

          <Text style={styles.title}>Already in cart</Text>
          <Text style={styles.text}>
            {name}&apos;s profile is already in your cart.
          </Text>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.closeBtn]}
              onPress={onClose}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.viewBtn]}
              onPress={onViewCart}
            >
              <Text style={styles.viewText}>View Cart</Text>
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
    backgroundColor: COLORS.primaryLight,
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
  closeBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  viewBtn: {
    backgroundColor: COLORS.primary,
  },
  closeText: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.text,
  },
  viewText: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.white,
  },
});
