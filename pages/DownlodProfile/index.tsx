import HeroPhoto, { useHeroHeight } from "@/components/HeroPhoto";
import {
    ChipList,
    DetailsGrid,
    HoroscopeChart,
    SectionTitle,
    SubTitle,
} from "@/components/ProfileSections";
import { Profile, SAMPLE_PROFILES } from "@/constants/SampleProfile";
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
    ScrollView,
    Share,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, SHEET_OVERLAP, styles } from "./style";

const FORMATS = [
  { key: "PDF", icon: "file" },
  { key: "Image", icon: "image" },
] as const;

type Format = (typeof FORMATS)[number]["key"];

function withOccupation(name?: string, occupation?: string) {
  const n = clean(name);
  const o = clean(occupation);
  if (n && o) return `${n} (${o})`;
  return n ?? o;
}

export default function DownlodProfile() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const profile: Profile = route.params?.profile ?? SAMPLE_PROFILES[0];

  const [format, setFormat] = useState<Format>("PDF");
  const [includePhoto, setIncludePhoto] = useState(true);
  const [hidePhone, setHidePhone] = useState(true);
  const [includeFamily, setIncludeFamily] = useState(true);
  const [includeChart, setIncludeChart] = useState(true);
  const photos = profilePhotos(profile);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activePhoto = photos[activeIndex] ?? photos[0];
  const heroHeight = useHeroHeight(activePhoto, SHEET_OVERLAP);

  useEffect(() => {
    setActiveIndex(0);
    setPaused(false);
  }, [profile.id]);

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

  const basic = details([
    ["Koottam", profile.Koottam],
    ["Date of birth", profile.dob],
    ["Height", profile.Height],
    ["Marital status", profile.MaritalStatus],
    ["Complexion", profile.Complex],
    ["Education", educationText(profile)],
    ["Working category", profile.WorkingCategory],
    ["Designation", profile.Designation],
    ["Birth place", profile.BirthPlace],
    ["Kula Theivam", profile.KulaTheivam],
  ]);

  const family = details([
    ["Father", withOccupation(profile.FatherName, profile.FatherOccupation)],
    ["Mother", withOccupation(profile.MotherName, profile.MotherOccupation)],
    ["Siblings", profile.SiblingsCount],
  ]);
  const assets = (profile.Property ?? []).map((p) => p.trim()).filter(Boolean);

  const horoscope = details([
    ["Rasi", profile.Rashi],
    ["Star", profile.Star],
    ["Laknam", profile.Laknam],
    ["Horoscope", profile.Horoscope],
    ["Thisa Iruppu", profile.ThisaIruppu],
    ["Dasa balance", dasaBalanceText(profile)],
  ]);

  const hasFamily = family.length > 0 || assets.length > 0;
  const hasChart = !!profile.horoscopeImage;

  function buildBiodataText() {
    const lines = [
      profile.name,
      [clean(profile.location)].filter(Boolean).join(" · "),
      "",
      "BASIC DETAILS",
      ...basic.map((d) => `${d.label}: ${d.value}`),
    ];
    if (includeFamily && hasFamily) {
      lines.push(
        "",
        "FAMILY AND ASSETS",
        ...family.map((d) => `${d.label}: ${d.value}`),
      );
      if (assets.length) lines.push(`Assets: ${assets.join(", ")}`);
    }
    if (horoscope.length) {
      lines.push(
        "",
        "HOROSCOPE",
        ...horoscope.map((d) => `${d.label}: ${d.value}`),
      );
    }
    return lines.join("\n");
  }

  async function handleShare() {
    try {
      await Share.share({
        title: `${profile.name} - Profile biodata`,
        message: buildBiodataText(),
      });
    } catch (err) {
      console.warn(err);
    }
  }

  function handleDownload() {
    // TODO: generate the file (e.g. expo-print for PDF, react-native-view-shot for Image).
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

          <View style={styles.heroTopRow}>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevron-left" size={22} color={COLORS.red} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroBtn} onPress={handleShare}>
              <Feather name="share-2" size={20} color={COLORS.red} />
            </TouchableOpacity>
          </View>

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
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.85}
                      onPress={() => selectPhoto(index)}
                      style={[
                        styles.thumb,
                        index === activeIndex && styles.thumbActive,
                      ]}
                    >
                      <Image source={source} style={styles.thumbImage} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Details sheet */}
        <View style={styles.sheet}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.meta}>
            {[clean(profile.location)].filter(Boolean).join(" · ")}
          </Text>

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
              {includeChart && (
                <HoroscopeChart source={profile.horoscopeImage} />
              )}
            </>
          )}

          <Text style={styles.sectionTitle}>Download as</Text>
          <View style={styles.formatRow}>
            {FORMATS.map((item) => {
              const active = item.key === format;
              return (
                <TouchableOpacity
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
                </TouchableOpacity>
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

      {/* Footer actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <Feather name="download" size={20} color={COLORS.white} />
          <Text style={styles.downloadText}>Download {format}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
