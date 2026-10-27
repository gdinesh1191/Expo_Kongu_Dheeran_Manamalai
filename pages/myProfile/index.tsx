import BottomTabBar from "@/components/BottomTabBar";
import HeroPhoto, { useHeroHeight } from "@/components/HeroPhoto";
import { HoroscopeViewer } from "@/components/ProfileSections";
import { MY_PROFILE } from "@/constants/SampleProfile";
import { scaleFont } from "@/constants/ScaleFont";
import { imageSource, profilePhotos } from "@/utils/profile";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import LogoutModal from "../../components/LogoutModal";
import ProfileInfo, { HoroscopeButton } from "../ProfileDetails/ProfileInfo";
import {
  COLORS,
  SHEET_OVERLAP,
  styles as detailStyles,
} from "../ProfileDetails/style";

export default function MyProfile() {
  const profile = MY_PROFILE;
  const photos = profilePhotos(profile);
  const [activeIndex, setActiveIndex] = useState(0);
  const [horoscopeOpen, setHoroscopeOpen] = useState(false);
  const activePhoto = photos[activeIndex] ?? photos[0];
  const heroHeight = useHeroHeight(activePhoto, SHEET_OVERLAP);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <View style={detailStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Photo / hero */}
        <View style={[detailStyles.hero, { height: heroHeight }]}>
          <View style={detailStyles.heroPhotoArea}>
            {activePhoto ? (
              <HeroPhoto source={activePhoto} bottomInset={SHEET_OVERLAP} />
            ) : (
              <View style={detailStyles.avatarWrap}>
                <View style={detailStyles.avatarHead} />
                <View style={detailStyles.avatarBody} />
              </View>
            )}
          </View>

          {photos.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={detailStyles.thumbs}
              contentContainerStyle={detailStyles.thumbsContent}
            >
              {photos.map((photo, index) => {
                const source = imageSource(photo);
                if (!source) return null;
                return (
                  <Pressable
                    key={index}
                    onPress={() => setActiveIndex(index)}
                    style={[
                      detailStyles.thumb,
                      index === activeIndex && detailStyles.thumbActive,
                    ]}
                  >
                    <Image source={source} style={detailStyles.thumbImage} />
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* Details sheet */}
        <View style={detailStyles.sheet}>
          <ProfileInfo profile={profile} />

          {!!profile.horoscopeImage && (
            <HoroscopeButton onPress={() => setHoroscopeOpen(true)} />
          )}

          <View style={{ flexDirection: "row", marginTop: scaleFont(16) }}>
            <Pressable
              style={detailStyles.interestBtn}
              onPress={() => setLogoutOpen(true)}
            >
              <Feather name="log-out" size={18} color={COLORS.red} />
              <Text style={detailStyles.interestText}>Log out</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <HoroscopeViewer
        source={profile.horoscopeImage}
        visible={horoscopeOpen}
        onClose={() => setHoroscopeOpen(false)}
      />

      <LogoutModal visible={logoutOpen} onCancel={() => setLogoutOpen(false)} />

      <BottomTabBar active="My Profile" />
    </View>
  );
}
