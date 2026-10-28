import BottomTabBar from "@/components/BottomTabBar";
import FillImage from "@/components/FillImage";
import { Profile } from "@/constants/SampleProfile";
import { useCart } from "@/context/CartContext";
import { useDownloads } from "@/context/DownloadsContext";
import { useLikedProfiles } from "@/context/LikedProfilesContext";
import { useProfileSelection } from "@/hooks/useProfileSelection";
import { primaryPhoto } from "@/utils/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { COLORS, styles } from "./style";

export default function LikedProfiles() {
  const navigation = useNavigation<any>();
  const { liked, unlike } = useLikedProfiles();
  const { addToCart } = useCart();
  const { addDownload } = useDownloads();
  const selection = useProfileSelection(liked);

  function moveSelected(add: (profile: Profile) => void) {
    // Added in reverse so the moved profiles keep their order at the top.
    [...selection.selected].reverse().forEach((profile) => {
      add(profile);
      unlike(profile.id);
    });
    selection.cancel();
  }

  function renderItem({ item }: { item: Profile }) {
    const selected = selection.isSelected(item.id);
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          selection.selecting
            ? selection.toggle(item.id)
            : navigation.navigate("ProfileDetails", {
                profile: item,
                fromWishlist: true,
              })
        }
        onLongPress={() => {
          if (!selection.selecting) selection.start(item.id);
        }}
      >
        <Feather name="user" size={48} color="rgba(255,255,255,0.6)" />
        <FillImage source={primaryPhoto(item)} />
        <View pointerEvents="none" style={styles.gradient} />
        {selected && (
          <View pointerEvents="none" style={styles.selectedOutline} />
        )}

        <View style={styles.cardTop}>
          {selection.selecting ? (
            <View
              style={[styles.checkCircle, selected && styles.checkCircleActive]}
            >
              {selected && (
                <Feather name="check" size={16} color={COLORS.white} />
              )}
            </View>
          ) : (
            <Pressable
              style={styles.heartBtn}
              onPress={() => unlike(item.id)}
              hitSlop={6}
            >
              <Ionicons name="heart" size={18} color={COLORS.red} />
            </Pressable>
          )}
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
      <View style={[styles.header, styles.headerRow]}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Liked profiles</Text>
          <Text style={styles.subtitle}>
            {selection.selecting
              ? `${selection.selected.length} selected`
              : liked.length === 1
                ? "1 profile you liked"
                : `${liked.length} profiles you liked`}
          </Text>
        </View>
        {liked.length > 0 && (
          <View style={styles.headerActions}>
            {selection.selecting ? (
              <>
                <Pressable
                  style={styles.headerBtn}
                  onPress={selection.toggleAll}
                >
                  <Text style={styles.headerBtnText}>
                    {selection.allSelected ? "Clear all" : "Select all"}
                  </Text>
                </Pressable>
                <Pressable style={styles.headerBtn} onPress={selection.cancel}>
                  <Text style={styles.headerBtnText}>Cancel</Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                style={styles.headerBtn}
                onPress={() => selection.start()}
              >
                <Text style={styles.headerBtnText}>Select</Text>
              </Pressable>
            )}
          </View>
        )}
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
          extraData={selection}
        />
      )}

      {selection.selected.length > 0 && (
        <View style={styles.actionBar}>
          <Pressable
            style={[styles.actionBtn, styles.cartAction]}
            onPress={() => moveSelected(addToCart)}
          >
            <Feather name="plus" size={16} color={COLORS.primaryDark} />
            <Text style={[styles.actionText, styles.cartActionText]}>
              Add to Cart
            </Text>
          </Pressable>
          <Pressable
            style={[styles.actionBtn, styles.downloadAction]}
            onPress={() => moveSelected(addDownload)}
          >
            <Feather name="download" size={18} color={COLORS.red} />
            <Text style={[styles.actionText, styles.downloadActionText]}>
              Download
            </Text>
          </Pressable>
        </View>
      )}

      <BottomTabBar active="Wish List" />
    </View>
  );
}
