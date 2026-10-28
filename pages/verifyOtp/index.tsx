import { useAuth } from "@/app/AuthContext";
import OtpScreenShell from "@/components/OtpScreenShell";
import { DUMMY_OTP } from "@/constants/DummyAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const LENGTH = 4;

export default function VerifyOtpPage() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { login } = useAuth();
  const masked = route.params?.masked ?? "*****0467";
  const inputs = useRef<Array<TextInput | null>>([]);
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [error, setError] = useState("");

  const focusAt = (index: number) => {
    inputs.current[index]?.focus();
  };

  const onChange = (text: string, index: number) => {
    const clean = text.replace(/\D/g, "");
    if (error) setError("");
    if (clean.length > 1) {
      const next = Array(LENGTH).fill("");
      clean
        .slice(0, LENGTH)
        .split("")
        .forEach((char, i) => {
          next[i] = char;
        });
      setDigits(next);
      focusAt(Math.min(clean.length, LENGTH - 1));
      return;
    }

    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < LENGTH - 1) focusAt(index + 1);
  };

  const onKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      focusAt(index - 1);
    }
  };

  const onVerify = () => {
    const code = digits.join("");
    if (code.length < LENGTH) {
      setError(`Please enter the ${LENGTH}-digit OTP`);
      return;
    }
    // TODO: replace the dummy check with your verify OTP API
    if (code !== DUMMY_OTP) {
      setError("Invalid OTP. Please try again.");
      setDigits(Array(LENGTH).fill(""));
      focusAt(0);
      return;
    }
    login("user");
    navigation.reset({
      index: 0,
      routes: [{ name: "Profile", params: { role: "user" } }],
    });
  };

  const onResend = () => {
    setDigits(Array(LENGTH).fill(""));
    setError("");
    focusAt(0);
  };

  return (
    <OtpScreenShell>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          OTP sent successfully to {masked}.
        </Text>
      </View>

      <Text style={styles.hint}>Enter the 4-digit OTP to continue.</Text>

      <View style={styles.boxes}>
        {digits.map((digit, index) => (
          <TextInput
            key={index}
            ref={(node) => {
              inputs.current[index] = node;
            }}
            style={styles.box}
            value={digit}
            onChangeText={(text) => onChange(text, index)}
            onKeyPress={({ nativeEvent }) => onKeyPress(nativeEvent.key, index)}
            keyboardType="number-pad"
            maxLength={index === 0 ? LENGTH : 1}
            textAlign="center"
            selectionColor="#0B3B1E"
            autoFocus={index === 0}
          />
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable onPress={onVerify} style={styles.button}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </Pressable>

      <Text style={styles.resendRow}>
        Didn't receive OTP?{" "}
        <Text style={styles.resend} onPress={onResend}>
          Resend
        </Text>
      </Text>
    </OtpScreenShell>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#D6EBFA",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  bannerText: {
    color: "#1A1A1A",
    fontSize: 14,
    textAlign: "center",
  },
  hint: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 16,
  },
  boxes: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 18,
  },
  box: {
    width: 58,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    color: "#111827",
    fontSize: 22,
    fontWeight: "700",
  },
  error: {
    color: "#FFCDD2",
    fontSize: 13,
    textAlign: "center",
    marginTop: -6,
    marginBottom: 12,
  },
  button: {
    height: 46,
    borderRadius: 6,
    backgroundColor: "#C62828",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resendRow: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
  },
  resend: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
