import BottomTabBar from "@/components/BottomTabBar";
import FillImage from "@/components/FillImage";
import { Profile } from "@/constants/SampleProfile";
import { useLikedProfiles } from "@/context/LikedProfilesContext";
import { primaryPhoto } from "@/utils/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { COLORS, styles } from "./style";

export default function LikedProfiles() {
  const navigation = useNavigation<any>();
  const { liked, unlike } = useLikedProfiles();

  function renderItem({ item }: { item: Profile }) {
    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate("ProfileDetails", { profile: item })}
      >
        <Feather name="user" size={48} color="rgba(255,255,255,0.6)" />
        <FillImage source={primaryPhoto(item)} />
        <View pointerEvents="none" style={styles.gradient} />

        <View style={styles.cardTop}>
          <Pressable
            style={styles.heartBtn}
            onPress={() => unlike(item.id)}
            hitSlop={6}
          >
            <Ionicons name="heart" size={18} color={COLORS.red} />
          </Pressable>
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
          <Text style={styles.meta} numberOfLines={1}>
            {item.EducationCourse}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liked profiles</Text>
        <Text style={styles.subtitle}>
          {liked.length === 1
            ? "1 profile you liked"
            : `${liked.length} profiles you liked`}
        </Text>
      </View>

      {liked.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Ionicons name="heart-outline" size={52} color={COLORS.primary} />
          <Text style={styles.emptyTitle}>No liked profiles yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart on a profile&apos;s details to see it here.
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
          data={liked}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}

      <BottomTabBar active="Wish List" />
    </View>
  );
}
