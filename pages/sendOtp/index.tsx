import OtpScreenShell from "@/components/OtpScreenShell";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RemixIcon from "react-native-remix-icon";

const CONTACTS = {
  email: "ku********************@gmail.com",
  phone: "*****0467",
};

type Channel = "email" | "phone";

export default function SendOtpPage() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const role = route.params?.role ?? "user";
  const [channel, setChannel] = useState<Channel>("phone");

  const onSend = () => {
    navigation.navigate("VerifyOtp", {
      channel,
      masked: CONTACTS[channel],
      role,
    });
  };

  return (
    <OtpScreenShell>
      <Text style={styles.heading}>Where should we send the OTP?</Text>
      <Text style={styles.hint}>
        Choose email or phone linked to your profile.
      </Text>

      <ChannelOption
        label="Email"
        icon="mail-line"
        value={CONTACTS.email}
        selected={channel === "email"}
        onPress={() => setChannel("email")}
      />
      <ChannelOption
        label="Phone"
        icon="phone-line"
        value={CONTACTS.phone}
        selected={channel === "phone"}
        onPress={() => setChannel("phone")}
      />

      <Pressable onPress={onSend} style={styles.button}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={styles.backButton}
      >
        <Text style={styles.back}>Back to Login</Text>
      </Pressable>
    </OtpScreenShell>
  );
}

function ChannelOption({
  label,
  icon,
  value,
  selected,
  onPress,
}: {
  label: string;
  icon: string;
  value: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.option, selected && styles.optionOn]}
    >
      <View style={[styles.radio, selected && styles.radioOn]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
      <View style={styles.optionBody}>
        <View style={styles.optionTitleRow}>
          <RemixIcon name={icon as any} size={16} color="#FFFFFF" />
          <Text style={styles.optionLabel}>{label}</Text>
        </View>
        <Text style={styles.optionValue}>{value}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 14,
  },
  hint: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 18,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  optionOn: {
    borderColor: "rgba(255,255,255,0.9)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioOn: {
    borderColor: "#1E88E5",
    backgroundColor: "#1E88E5",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  optionBody: { flex: 1 },
  optionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  optionLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  optionValue: {
    color: "rgba(255,255,255,0.88)",
    fontSize: 13,
    marginTop: 2,
  },
  button: {
    height: 46,
    borderRadius: 6,
    backgroundColor: "#C62828",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    alignSelf: "center",
    marginTop: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  back: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textAlign: "center",
  },
});
