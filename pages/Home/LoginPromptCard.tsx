import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS, styles } from "./style";

type Props = {
  onLogin: () => void;
};

export default function LoginPromptCard({ onLogin }: Props) {
  return (
    <View style={styles.loginCard}>
      <View style={styles.loginCardIcon}>
        <Ionicons name="people" size={22} color={COLORS.white} />
      </View>
      <Text style={styles.loginCardTitle}>Find your perfect match</Text>
      <Pressable style={[styles.loginCardBtn]} onPress={onLogin}>
        <Text style={styles.loginCardBtnText}>Login</Text>
        <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
      </Pressable>
    </View>
  );
}
