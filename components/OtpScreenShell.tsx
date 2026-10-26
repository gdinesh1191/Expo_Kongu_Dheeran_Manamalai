import { ReactNode } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import KeyboardAwareScrollView from "./KeyboardAwareScrollView";

const BG = require("../assets/Images/login_bg.png");
const LOGO = require("../assets/Images/Logo_bg.png");

const COLORS = {
  bg: "#0B3B1E",
  overlay: "rgba(5, 40, 18, 0.55)",
  white: "#FFFFFF",
  soft: "rgba(255,255,255,0.75)",
};

type Props = {
  children: ReactNode;
};

export default function OtpScreenShell({ children }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar backgroundColor="#0B8A3A" barStyle="light-content" />
      <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
        <View style={styles.overlay} />
        <KeyboardAwareScrollView
          extraScrollHeight={180}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.card}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Kongu Dheeran Manamalai</Text>
            {children}
            <Text style={styles.footer}>© 2026 Kongu Dheeran Manamalai .</Text>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  flex: { flex: 1 },
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 28,
  },
  card: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    backgroundColor: "rgba(6, 36, 20, 0.72)",
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 18,
  },
  logo: {
    width: 92,
    height: 92,
    alignSelf: "center",
    marginBottom: 8,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
    letterSpacing: 0.3,
  },
  footer: {
    color: COLORS.soft,
    fontSize: 12,
    textAlign: "center",
    marginTop: 22,
  },
});
