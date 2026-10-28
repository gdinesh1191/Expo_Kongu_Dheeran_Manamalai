import EnquirySuccessModal from "@/components/EnquirySuccessModal";
import KeyboardAwareScrollView from "@/components/KeyboardAwareScrollView";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";

const BG = require("../../assets/Images/login_bg.png");
const LOGO = require("../../assets/Images/Logo_bg.png");

const COLORS = {
  bg: "#0B3B1E",
  overlay: "rgba(5, 40, 18, 0.55)",
  gold: "#B79B5B",
  field: "#F6F2EA",
  fieldText: "#6B7280",
  white: "#FFFFFF",
  red: "#B71C1C",
  redDark: "#8E1212",
  soft: "rgba(255,255,255,0.75)",
  secure: "#8FD0A6",
  errorText: "#FFCDD2",
  errorBorder: "#E53935",
};

export default function EnquireFormPage() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [koottam, setKoottam] = useState("");
  const [kulaTheivam, setKulaTheivam] = useState("");
  const [residentialPlace, setResidentialPlace] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [nameError, setNameError] = useState("");
  const [koottamError, setKoottamError] = useState("");
  const [kulaTheivamError, setKulaTheivamError] = useState("");
  const [residentialPlaceError, setResidentialPlaceError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const resetForm = () => {
    setName("");
    setKoottam("");
    setKulaTheivam("");
    setResidentialPlace("");
    setWhatsapp("");
  };

  const onSuccessOk = () => {
    setSuccessVisible(false);
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  const onSubmit = () => {
    const nextNameError = !name.trim() ? "Name is required" : "";
    const nextKoottamError = !koottam.trim() ? "Koottam is required" : "";
    const nextKulaTheivamError = !kulaTheivam.trim()
      ? "Kula Theivam is required"
      : "";
    const nextResidentialPlaceError = !residentialPlace.trim()
      ? "Residential place is required"
      : "";
    const nextWhatsappError = !whatsapp
      ? "Whatsapp number is required"
      : !/^\d{10}$/.test(whatsapp)
        ? "Enter a valid 10-digit number"
        : "";
    setNameError(nextNameError);
    setKoottamError(nextKoottamError);
    setKulaTheivamError(nextKulaTheivamError);
    setResidentialPlaceError(nextResidentialPlaceError);
    setWhatsappError(nextWhatsappError);
    if (
      nextNameError ||
      nextKoottamError ||
      nextKulaTheivamError ||
      nextResidentialPlaceError ||
      nextWhatsappError
    )
      return;

    // TODO: send { name, koottam, kulaTheivam, residentialPlace, whatsapp } to the enquiry API
    resetForm();
    setSuccessVisible(true);
  };

  return (
    <View style={styles.root}>
      <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
        <View style={styles.overlay} />

        <KeyboardAwareScrollView
          extraScrollHeight={180}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
          paddingBottom={20}
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
            <Text style={styles.home}>Enquire Form</Text>
            <View style={styles.line} />
          </View>

          <LabeledField
            label="Name"
            placeholder="Enter your name"
            value={name}
            error={nameError}
            onChangeText={(text) => {
              setName(text);
              if (nameError) setNameError("");
            }}
            autoCapitalize="words"
          />

          <LabeledField
            label="Koottam"
            placeholder="Enter your koottam"
            value={koottam}
            error={koottamError}
            onChangeText={(text) => {
              setKoottam(text);
              if (koottamError) setKoottamError("");
            }}
            autoCapitalize="words"
          />

          <LabeledField
            label="Kula Theivam"
            placeholder="Enter your kula theivam"
            value={kulaTheivam}
            error={kulaTheivamError}
            onChangeText={(text) => {
              setKulaTheivam(text);
              if (kulaTheivamError) setKulaTheivamError("");
            }}
            autoCapitalize="words"
          />

          <LabeledField
            label="Residential Place"
            placeholder="Enter your residential place"
            value={residentialPlace}
            error={residentialPlaceError}
            onChangeText={(text) => {
              setResidentialPlace(text);
              if (residentialPlaceError) setResidentialPlaceError("");
            }}
            autoCapitalize="words"
          />

          <LabeledField
            label="Whatsapp Number"
            placeholder="Enter your whatsapp number"
            value={whatsapp}
            error={whatsappError}
            onChangeText={(text) => {
              setWhatsapp(text.replace(/\D/g, ""));
              if (whatsappError) setWhatsappError("");
            }}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Pressable onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonText} numberOfLines={1}>
              Submit Enquiry
            </Text>
            <RemixIcon name="arrow-right-line" size={16} color={COLORS.white} />
          </Pressable>

          <View style={styles.switchRow}>
            <Text style={styles.switchHint}>Already have an account? </Text>
            <Pressable
              onPress={() =>
                navigation.reset({ index: 0, routes: [{ name: "Login" }] })
              }
              hitSlop={8}
            >
              <Text style={styles.switchLink}>Login</Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>

      <EnquirySuccessModal visible={successVisible} onOk={onSuccessOk} />
    </View>
  );
}

type LabeledFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  error: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "words";
  maxLength?: number;
};

function LabeledField({
  label,
  placeholder,
  value,
  error,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "none",
  maxLength,
}: LabeledFieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}*</Text>
      <View style={[styles.field, error ? styles.fieldError : null]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.fieldText}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          maxLength={maxLength}
        />
      </View>
      <FieldError message={error} />
    </>
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
    // paddingVertical: 32,
  },

  logo: {
    width: 96,
    height: 96,
    alignSelf: "center",
    // marginBottom: 8,
    marginTop: 20,
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
    marginBottom: 20,
  },
  line: { width: 82, height: 1.5, backgroundColor: COLORS.gold },
  home: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
  },

  label: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 2,
  },
  field: {
    justifyContent: "center",
    backgroundColor: COLORS.field,
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  fieldError: { borderColor: COLORS.errorBorder },
  input: {
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },

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
    marginTop: 8,
    backgroundColor: COLORS.red,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.redDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
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
});
