import { useAuth } from "@/app/AuthContext";
import KeyboardAwareScrollView from "@/components/KeyboardAwareScrollView";
import { checkCredentials, LoginRole } from "@/constants/DummyAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";

// TODO: put your own images at these paths (or change the paths)
// - bg-login.png : dark green background with temple, warrior and leaf art (full screen)
// - logo.png     : the round "K" logo
const BG = require("../../assets/Images/login_bg.png");
const LOGO = require("../../assets/Images/Logo_bg.png");

const COLORS = {
  bg: "#0B3B1E",
  overlay: "rgba(5, 40, 18, 0.55)",
  gold: "#B79B5B",
  field: "#F6F2EA",
  fieldText: "#6B7280",
  icon: "#374151",
  white: "#FFFFFF",
  red: "#B71C1C",
  redDark: "#8E1212",
  soft: "rgba(255,255,255,0.75)",
  secure: "#8FD0A6",
  errorText: "#FFCDD2",
  errorBorder: "#E53935",
};

export default function LoginPage() {
  const navigation = useNavigation<any>();
  const { login } = useAuth();
  const [role, setRole] = useState<LoginRole>("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const route = useRoute<any>();
  const routeParams = route.params ?? {};
  const onChangeRole = (next: LoginRole) => {
    setRole(next);
    setUsernameError("");
    setPasswordError("");
  };

  const onLogin = () => {
    const nextUsernameError = !username.trim() ? "Username is required" : "";
    const nextPasswordError = !password
      ? "Password is required"
      : password.length < 6
        ? "Password must be at least 6 characters"
        : "";
    setUsernameError(nextUsernameError);
    setPasswordError(nextPasswordError);
    if (nextUsernameError || nextPasswordError) return;

    // TODO: replace the dummy check with your login API { username, password, remember, role }
    const result = checkCredentials(role, username, password);
    if (result === "invalidUsername") {
      setUsernameError(`No ${role} account found with this username`);
      return;
    }
    if (result === "invalidPassword") {
      setPasswordError("Incorrect password");
      return;
    }

    if (role === "staff") {
      login("staff");
      navigation.reset({
        index: 0,
        routes: [{ name: "Attendance", params: { role } }],
      });
    } else {
      navigation.navigate("SendOtp", { role, route: routeParams.route });
    }
  };

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
          {/* Logo */}
          <Image source={LOGO} style={styles.logo} resizeMode="contain" />

          {/* Titles */}
          <Text
            style={styles.title}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            Kongu Dheeran Manamalai
          </Text>
          <View style={styles.homeRow}>
            <View style={styles.line} />
            <Text style={styles.home}>Home</Text>
            <View style={styles.line} />
          </View>

          <Text style={styles.subtitle}>
            {role === "staff" ? "Staff login" : "User login"}
          </Text>

          {/* Username */}
          <View
            style={[styles.field, usernameError ? styles.fieldError : null]}
          >
            <RemixIcon name="user-3-line" size={24} color={COLORS.icon} />
            <View style={styles.divider} />
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor={COLORS.fieldText}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (usernameError) setUsernameError("");
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <FieldError message={usernameError} />

          {/* Password */}
          <View
            style={[styles.field, passwordError ? styles.fieldError : null]}
          >
            <RemixIcon name="lock-line" size={24} color={COLORS.icon} />
            <View style={styles.divider} />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor={COLORS.fieldText}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError("");
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={10}>
              <RemixIcon
                name={showPassword ? "eye-off-line" : "eye-line"}
                size={24}
                color={COLORS.icon}
              />
            </Pressable>
          </View>
          <FieldError message={passwordError} />

          {/* Remember me */}
          <Pressable
            style={styles.rememberRow}
            onPress={() => setRemember((v) => !v)}
          >
            <View style={[styles.checkbox, remember && styles.checkboxOn]}>
              {remember && (
                <RemixIcon name="check-line" size={16} color={COLORS.white} />
              )}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </Pressable>

          <Pressable onPress={onLogin} style={styles.button}>
            <Text style={styles.buttonText} numberOfLines={1}>
              Log In
            </Text>
            <RemixIcon name="arrow-right-line" size={16} color={COLORS.white} />
          </Pressable>

          {/* Secure note */}
          <View style={styles.secureRow}>
            <RemixIcon
              name="shield-check-line"
              size={20}
              color={COLORS.secure}
            />
            <Text style={styles.secureText}>Secure sign in</Text>
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchHint}>
              {role === "user" ? "Staff member? " : "Not staff? "}
            </Text>
            <Pressable
              onPress={() => onChangeRole(role === "user" ? "staff" : "user")}
              hitSlop={8}
            >
              <Text style={styles.switchLink}>
                {role === "user" ? "Staff login" : "User login"}
              </Text>
            </Pressable>
          </View>

          {/* New registration */}
          <View style={styles.newHereRow}>
            <View style={styles.newHereLine} />
            <Text style={styles.newHereText}>New here?</Text>
            <View style={styles.newHereLine} />
          </View>
          <Pressable
            onPress={() => {
              // TODO: navigate to the enquiry / new registration screen
              navigation.navigate("EnquireForm");
            }}
            hitSlop={8}
          >
            <Text style={styles.enquireText}>
              Enquire Now for New Registration
            </Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
}

function FieldError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <View style={styles.errorRow}>
      <RemixIcon name="error-warning-line" size={16} color={COLORS.errorText} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  flex: { flex: 1 },
  bg: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 32,
  },

  logo: {
    width: 96,
    height: 96,
    alignSelf: "center",
    marginBottom: 8,
    marginTop: 40,
  },

  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
    letterSpacing: 0.5,
  },
  homeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    gap: 16,
  },
  line: { width: 82, height: 1.5, backgroundColor: COLORS.gold },
  home: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
  },
  subtitle: {
    color: COLORS.soft,
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },

  field: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.field,
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 24,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  fieldError: { borderColor: COLORS.errorBorder },
  divider: {
    width: 1,
    height: 34,
    backgroundColor: "#E2DCCF",
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 26,
    marginLeft: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.soft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxOn: { backgroundColor: COLORS.red, borderColor: COLORS.red },
  rememberText: { color: COLORS.white, fontSize: 14 },

  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: -12,
    marginBottom: 14,
    marginLeft: 4,
  },
  errorText: { color: COLORS.errorText, fontSize: 13, flex: 1 },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 58,
    borderRadius: 16,
    backgroundColor: COLORS.red,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.redDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: "700" },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  switchHint: { color: COLORS.soft, fontSize: 14 },
  switchLink: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: "700",
  },

  secureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 26,
  },
  secureText: { color: COLORS.secure, fontSize: 14 },

  newHereRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 26,
  },
  newHereLine: { flex: 1, height: 1, backgroundColor: COLORS.soft },
  newHereText: { color: COLORS.soft, fontSize: 14 },
  enquireText: {
    color: COLORS.gold,
    fontSize: 18,
    textAlign: "center",
    marginTop: 14,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
  },
});
