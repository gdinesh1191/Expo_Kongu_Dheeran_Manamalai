import BottomTabBar from "@/components/BottomTabBar";
import DownloadPdfModal, { PdfLanguage } from "@/components/DownloadPdfModal";
import FillImage from "@/components/FillImage";
import { Profile } from "@/constants/SampleProfile";
import { useDownloads } from "@/context/DownloadsContext";
import { primaryPhoto } from "@/utils/profile";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { COLORS, styles } from "./style";

export default function Downloads() {
  const navigation = useNavigation<any>();
  const { downloads } = useDownloads();
  const [pdfProfile, setPdfProfile] = useState<Profile | null>(null);

  function handleDownloadPdf(language: PdfLanguage) {
    setPdfProfile(null);
    // TODO: generate the profile PDF in the chosen language.
    const label = language === "tamil" ? "Tamil" : "English";
    Alert.alert("Download", `${label} PDF download will be available soon.`);
  }

  function renderItem({ item }: { item: Profile }) {
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          navigation.navigate("ProfileDetails", {
            profile: item,
            fromDownloads: true,
          })
        }
      >
        <Feather name="user" size={48} color="rgba(255,255,255,0.6)" />
        <FillImage source={primaryPhoto(item)} />
        <View pointerEvents="none" style={styles.gradient} />

        <View style={styles.cardTop}>
          <Pressable
            style={styles.heartBtn}
            onPress={() => setPdfProfile(item)}
            hitSlop={6}
            accessibilityLabel="Download as PDF"
          >
            <Feather name="download" size={16} color={COLORS.primary} />
          </Pressable>
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Downloads</Text>
        <Text style={styles.subtitle}>
          {downloads.length === 1
            ? "1 profile downloaded"
            : `${downloads.length} profiles downloaded`}
        </Text>
      </View>

      {downloads.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Feather name="download" size={52} color={COLORS.primary} />
          <Text style={styles.emptyTitle}>No downloads yet</Text>
          <Text style={styles.emptyText}>
            Tap &quot;Download&quot; on a profile&apos;s details to see it here.
          </Text>
          <Pressable
            style={styles.discoverBtn}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.discoverText}>Discover profiles</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={downloads}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}

      <BottomTabBar active="Downloads" />

      <DownloadPdfModal
        visible={!!pdfProfile}
        onClose={() => setPdfProfile(null)}
        onSelect={handleDownloadPdf}
      />
    </View>
  );
}
