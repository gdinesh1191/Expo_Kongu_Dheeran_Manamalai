import HeaderContentNew from "@/components/HeaderContent/HeaderContentNew";
import HeroPhoto, { useHeroHeight } from "@/components/HeroPhoto";
import {
  ChipList,
  DetailsGrid,
  HoroscopeChart,
  SectionTitle,
  SubTitle,
} from "@/components/ProfileSections";
import {
  MY_PROFILE,
  Profile,
  SAMPLE_PROFILES,
} from "@/constants/SampleProfile";
import {
  clean,
  dasaBalanceText,
  details,
  educationText,
  imageSource,
  profilePhotos,
} from "@/utils/profile";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS, SHEET_OVERLAP, styles } from "./style";

const FORMATS = [
  { key: "PDF", icon: "file" },
  { key: "Image", icon: "image" },
] as const;

type Format = (typeof FORMATS)[number]["key"];

// Dummy phone (profiles have no phone field)
const DUMMY_PHONE = "+91 98765 43210";

function withOccupation(name?: string, occupation?: string) {
  const n = clean(name);
  const o = clean(occupation);
  if (n && o) return `${n} (${o})`;
  return n ?? o;
}

// Find a profile by register number (profile id).
// To use an API later, replace the body with a fetch and keep it async.
async function findProfileByRegNo(regNo: string): Promise<Profile | undefined> {
  const key = regNo.trim().toUpperCase();
  return [MY_PROFILE, ...SAMPLE_PROFILES].find(
    (p) => String(p.id).toUpperCase() === key,
  );
}

export default function DownlodProfile() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Profile stays null (blank page) until a register number is found
  const [profile, setProfile] = useState<Profile | null>(
    route.params?.profile ?? null,
  );
  const p = (profile ?? {}) as Profile; // safe access; UI is hidden while null

  const [modalOpen, setModalOpen] = useState(!route.params?.profile);
  const [regNo, setRegNo] = useState("");
  const [regError, setRegError] = useState("");
  const [loading, setLoading] = useState(false);

  const [format, setFormat] = useState<Format>("PDF");
  const [includePhoto, setIncludePhoto] = useState(true);
  const [hidePhone, setHidePhone] = useState(true);
  const [includeFamily, setIncludeFamily] = useState(true);
  const [includeChart, setIncludeChart] = useState(true);
  const photos = profile ? profilePhotos(profile) : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activePhoto = photos[activeIndex] ?? photos[0];
  const heroHeight = useHeroHeight(activePhoto, SHEET_OVERLAP);

  const displayName = clean(p.name) ?? "-";
  const displayPlace = clean(p.location) ?? "-";
  const displayPhone = hidePhone ? "+91 98••• ••210" : DUMMY_PHONE;

  useEffect(() => {
    setActiveIndex(0);
    setPaused(false);
  }, [profile?.id]);

  useEffect(() => {
    if (!includePhoto || paused || photos.length < 2) return;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [includePhoto, paused, photos.length]);

  function selectPhoto(index: number) {
    setActiveIndex(index);
    setPaused(true);
  }

  async function handleFind() {
    if (!regNo.trim()) {
      setRegError("Enter your register number.");
      return;
    }
    setLoading(true);
    try {
      const found = await findProfileByRegNo(regNo);
      if (!found) {
        setRegError("No profile found for this register number.");
        return;
      }
      setProfile(found);
      setModalOpen(false); // the one button closes the modal
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setModalOpen(false);
    if (!profile) navigation.goBack(); // nothing to show, so leave the page
  }

  const basic = details([
    ["Register no", clean(String(p.id ?? "")) ?? "-"],
    ["Koottam", p.Koottam],
    ["Date of birth", p.dob],
    ["Height", p.Height],
    ["Marital status", p.MaritalStatus],
    ["Complexion", p.Complex],
    ["Education", profile ? educationText(p) : undefined],
    ["Working category", p.WorkingCategory],
    ["Designation", p.Designation],
    ["Birth place", p.BirthPlace],
    ["Kula Theivam", p.KulaTheivam],
  ]);

  const family = details([
    ["Father", withOccupation(p.FatherName, p.FatherOccupation)],
    ["Mother", withOccupation(p.MotherName, p.MotherOccupation)],
    ["Siblings", p.SiblingsCount],
  ]);
  const assets = (p.Property ?? []).map((x) => x.trim()).filter(Boolean);

  const horoscope = details([
    ["Rasi", p.Rashi],
    ["Star", p.Star],
    ["Laknam", p.Laknam],
    ["Horoscope", p.Horoscope],
    ["Thisa Iruppu", p.ThisaIruppu],
    ["Dasa balance", profile ? dasaBalanceText(p) : undefined],
  ]);

  const hasFamily = family.length > 0 || assets.length > 0;
  const hasChart = !!p.horoscopeImage;

  async function handlePrint() {
    // uses buildBiodataText() when you add expo-print
  }

  function handleDownload() {
    // TODO: Print.printToFileAsync({ html }) + expo-sharing for PDF,
    // react-native-view-shot for Image.
    Alert.alert("Download", `${format} download will be available soon.`);
  }

  const toggles = [
    {
      label: "Profile photo",
      value: includePhoto,
      onChange: setIncludePhoto,
      show: true,
    },
    {
      label: "Hide phone number",
      value: hidePhone,
      onChange: setHidePhone,
      show: true,
    },
    {
      label: "Family details",
      value: includeFamily,
      onChange: setIncludeFamily,
      show: hasFamily,
    },
    {
      label: "Horoscope chart",
      value: includeChart,
      onChange: setIncludeChart,
      show: hasChart,
    },
  ].filter((t) => t.show);

  return (
    <View style={styles.container}>
      {/* Fixed header (same component as the other pages) */}
      {profile && (
        <>
          <HeaderContentNew
            title="Download Profile"
            leftIcon="menu-2-fill"
            rightIcon="notification-3-fill"
            rightIconPress={() => navigation.navigate("notifications")}
          />

          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {/* Photo / hero */}
            <View style={[styles.hero, { height: heroHeight }]}>
              {includePhoto && activePhoto ? (
                <HeroPhoto source={activePhoto} bottomInset={SHEET_OVERLAP} />
              ) : includePhoto ? (
                <View style={styles.avatarWrap}>
                  <View style={styles.avatarHead} />
                  <View style={styles.avatarBody} />
                </View>
              ) : (
                <View style={styles.photoHidden}>
                  <Feather name="eye-off" size={30} color={COLORS.white} />
                  <Text style={styles.photoHiddenText}>
                    Photo hidden in biodata
                  </Text>
                </View>
              )}

              {includePhoto && photos.length > 1 && (
                <View style={styles.heroBottom}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.thumbs}
                    contentContainerStyle={styles.thumbsContent}
                  >
                    {photos.map((photo, index) => {
                      const source = imageSource(photo);
                      if (!source) return null;
                      return (
                        <Pressable
                          key={index}
                          onPress={() => selectPhoto(index)}
                          style={({ pressed }) => [
                            styles.thumb,
                            index === activeIndex && styles.thumbActive,
                            pressed && { opacity: 0.85 },
                          ]}
                        >
                          <Image source={source} style={styles.thumbImage} />
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Details sheet */}
            <View style={styles.sheet}>
              <Text style={styles.name}>{displayName}</Text>

              {/* Name / place / phone */}
              <View style={styles.contactCard}>
                <View style={styles.contactRow}>
                  <Feather name="user" size={16} color={COLORS.primary} />
                  <Text style={styles.contactText}>{displayName}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Feather name="map-pin" size={16} color={COLORS.primary} />
                  <Text style={styles.contactText}>{displayPlace}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Feather name="phone" size={16} color={COLORS.primary} />
                  <Text style={styles.contactText}>{displayPhone}</Text>
                </View>
              </View>

              <SectionTitle title="Basic details" icon="user" />
              <DetailsGrid items={basic} />

              {includeFamily && hasFamily && (
                <>
                  <SectionTitle title="Family and assets" icon="home" />
                  <DetailsGrid items={family} />
                  {assets.length > 0 && (
                    <>
                      <SubTitle title="Assets" />
                      <ChipList items={assets} />
                    </>
                  )}
                </>
              )}

              {(horoscope.length > 0 || (includeChart && hasChart)) && (
                <>
                  <SectionTitle title="Horoscope" icon="sun" />
                  <DetailsGrid items={horoscope} />
                  {includeChart && <HoroscopeChart source={p.horoscopeImage} />}
                </>
              )}

              <Text style={styles.sectionTitle}>Download as</Text>
              <View style={styles.formatRow}>
                {FORMATS.map((item) => {
                  const active = item.key === format;
                  return (
                    <Pressable
                      key={item.key}
                      style={[
                        styles.formatOption,
                        active && styles.formatOptionActive,
                      ]}
                      onPress={() => setFormat(item.key)}
                    >
                      <Feather
                        name={item.icon}
                        size={18}
                        color={active ? COLORS.white : COLORS.text}
                      />
                      <Text
                        style={[
                          styles.formatText,
                          active && styles.formatTextActive,
                        ]}
                      >
                        {item.key}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.sectionTitle}>Include in biodata</Text>
              {toggles.map((item, index) => (
                <View
                  key={item.label}
                  style={[styles.toggleRow, index > 0 && styles.toggleDivider]}
                >
                  <Text style={styles.toggleLabel}>{item.label}</Text>
                  <Switch
                    value={item.value}
                    onValueChange={item.onChange}
                    trackColor={{
                      false: COLORS.primaryLight,
                      true: COLORS.primary,
                    }}
                    thumbColor={COLORS.white}
                  />
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Bottom: Print + Download */}
          <View style={styles.footer}>
            <Pressable style={styles.printBtn} onPress={handlePrint}>
              <Feather name="printer" size={20} color={COLORS.red} />
              <Text style={styles.printText}>Print</Text>
            </Pressable>
            <Pressable style={styles.downloadBtn} onPress={handleDownload}>
              <Feather name="download" size={20} color="#009333" />
              <Text style={styles.downloadText}>Download</Text>
            </Pressable>
          </View>
        </>
      )}

      {/* Register number modal */}
      <Modal
        visible={modalOpen}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalRoot}>
          <Pressable style={styles.backdrop} onPress={handleCancel} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Download profile</Text>
            <Text style={styles.modalHint}>
              Enter your register number to continue
            </Text>

            <Text style={styles.label}>Register number</Text>
            <TextInput
              value={regNo}
              onChangeText={(v) => {
                setRegNo(v);
                if (regError) setRegError("");
              }}
              placeholder="e.g. TG30930"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              autoCapitalize="characters"
              maxLength={20}
              autoFocus
            />
            {regError ? <Text style={styles.error}>{regError}</Text> : null}

            <Pressable
              style={[styles.findBtn, loading && { opacity: 0.6 }]}
              onPress={handleFind}
              disabled={loading}
            >
              <Text style={styles.findText}>
                {loading ? "Finding..." : "Find profile"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
