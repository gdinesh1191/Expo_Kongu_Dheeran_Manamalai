import HeroPhoto, { useHeroHeight } from "@/components/HeroPhoto";
import {
  ChipList,
  DetailsGrid,
  HoroscopeChart,
  PoruthamMatch,
  SectionTitle,
  SubTitle,
} from "@/components/ProfileSections";
import { Profile, SAMPLE_PROFILES } from "@/constants/SampleProfile";
import { useLikedProfiles } from "@/context/LikedProfilesContext";
import {
  clean,
  dasaBalanceText,
  details,
  educationText,
  nameWithAge,
} from "@/utils/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SHEET_OVERLAP, styles } from "./style";

function withOccupation(name?: string, occupation?: string) {
  const n = clean(name);
  const o = clean(occupation);
  if (n && o) return `${n} (${o})`;
  return n ?? o;
}

export default function ProfileDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const profile: Profile = route.params?.profile ?? SAMPLE_PROFILES[0];

  const { isLiked, toggleLike } = useLikedProfiles();
  const liked = isLiked(profile.id);
  const heroHeight = useHeroHeight(profile.photo, SHEET_OVERLAP);
  const personal = details([
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
  const expectations = details([
    ["Partner expectation", profile.expectations],
    ["Abroad", profile.AboardExpectation],
    ["Note", profile.Note],
  ]);

  const horoscope = details([
    ["Rasi", profile.Rashi],
    ["Star", profile.Star],
    ["Laknam", profile.Laknam],
    ["Horoscope", profile.Horoscope],
    ["Thisa Iruppu", profile.ThisaIruppu],
    ["Dasa balance", dasaBalanceText(profile)],
  ]);

  const tags = details([
    ["Koottam", profile.Koottam],
    ["Porutham", profile.Porutham],
  ]);

  const hasFamilySection = family.length > 0 || assets.length > 0 || expectations.length > 0;
  const hasHoroscopeSection = horoscope.length > 0 || !!profile.horoscopeImage;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Photo / hero */}
        <View style={[styles.hero, { height: heroHeight }]}>
          {profile.photo ? (
            <HeroPhoto source={profile.photo} bottomInset={SHEET_OVERLAP} />
          ) : (
            <View style={styles.avatarWrap}>
              <View style={styles.avatarHead} />
              <View style={styles.avatarBody} />
            </View>
          )}

          <View style={styles.heroTopRow}>
            <TouchableOpacity style={styles.heroBtn} onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={22} color={COLORS.red} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroBtn} onPress={() => toggleLike(profile)}>
              <Ionicons name={liked ? "heart" : "heart-outline"} size={22} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Details sheet */}
        <View style={styles.sheet}>
          <Text style={styles.name}>{nameWithAge(profile)}</Text>
          <Text style={styles.meta}>
            {[clean(profile.location)].filter(Boolean).join(" · ")}
          </Text>
          {tags.length > 0 && (
            <View style={styles.tagsRow}>
              {tags.map((t) => (
                <View key={t.label} style={styles.tag}>
                  <Text style={styles.tagText}>
                    {t.label}: <Text style={styles.tagValue}>{t.value}</Text>
                  </Text>
                </View>
              ))}
            </View>
          )}

          <SectionTitle title="Basic details" icon="user" />
          <DetailsGrid items={personal} />

          {hasFamilySection && (
            <>
              <SectionTitle title="Family and assets" icon="home" />
              <DetailsGrid items={family} />
              {assets.length > 0 && (
                <>
                  <SubTitle title="Assets" />
                  <ChipList items={assets} />
                </>
              )}
              {expectations.length > 0 && (
                <>
                  <SubTitle title="Expectations" />
                  <DetailsGrid items={expectations} />
                </>
              )}
            </>
          )}

          {hasHoroscopeSection && (
            <>
              <SectionTitle title="Horoscope" icon="sun" />
              <DetailsGrid items={horoscope} />
              <HoroscopeChart source={profile.horoscopeImage} />
            </>
          )}

          <SectionTitle title="Porutham match" icon="heart" />
          <PoruthamMatch profile={profile} />
        </View>
      </ScrollView>

      {/* Footer actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.interestBtn}
          onPress={() => navigation.navigate("DownlodProfile", { profile })}
        >
          <Text style={styles.interestText}>Click to Download Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
