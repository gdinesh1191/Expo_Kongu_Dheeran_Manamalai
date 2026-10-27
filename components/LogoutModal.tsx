import { useAuth } from "@/app/AuthContext";
import { scaleFont } from "@/constants/ScaleFont";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../pages/Home/style";

type Props = {
  visible: boolean;
  onCancel: () => void;
};

export default function LogoutModal({ visible, onCancel }: Props) {
  const { logout } = useAuth();
  const navigation = useNavigation<any>();
  const onConfirm = () => {
    logout();
    onCancel();
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }, 500);
  };
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
            <Feather name="log-out" size={26} color={COLORS.red} />
          </View>

          <Text style={styles.title}>Log out?</Text>
          <Text style={styles.text}>
            Are you sure you want to log out of your account?
          </Text>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.cancelBtn]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.confirmBtn]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>Log out</Text>
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
