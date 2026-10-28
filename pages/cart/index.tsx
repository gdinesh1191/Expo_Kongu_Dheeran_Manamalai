import BottomTabBar from "@/components/BottomTabBar";
import FillImage from "@/components/FillImage";
import { Profile } from "@/constants/SampleProfile";
import { useCart } from "@/context/CartContext";
import { useDownloads } from "@/context/DownloadsContext";
import { useProfileSelection } from "@/hooks/useProfileSelection";
import { primaryPhoto } from "@/utils/profile";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { COLORS, styles } from "./style";

export default function Cart() {
  const navigation = useNavigation<any>();
  const { cart, removeFromCart } = useCart();
  const { addDownload } = useDownloads();
  const selection = useProfileSelection(cart);

  function downloadSelected() {
    // Added in reverse so the moved profiles keep their order at the top.
    [...selection.selected].reverse().forEach((profile) => {
      addDownload(profile);
      removeFromCart(profile.id);
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
                fromCart: true,
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
              onPress={() => removeFromCart(item.id)}
              hitSlop={6}
              accessibilityLabel="Remove from cart"
            >
              <Feather name="trash-2" size={16} color={COLORS.red} />
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
          <Text style={styles.title}>Cart</Text>
          <Text style={styles.subtitle}>
            {selection.selecting
              ? `${selection.selected.length} selected`
              : cart.length === 1
                ? "1 profile in your cart"
                : `${cart.length} profiles in your cart`}
          </Text>
        </View>
        {cart.length > 0 && (
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

      {cart.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Feather name="shopping-cart" size={52} color={COLORS.primary} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Tap &quot;Cart&quot; on a profile&apos;s details to add it here.
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
          data={cart}
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
            style={[styles.actionBtn, styles.downloadAction]}
            onPress={downloadSelected}
          >
            <Feather name="download" size={18} color={COLORS.red} />
            <Text style={[styles.actionText, styles.downloadActionText]}>
              Download
            </Text>
          </Pressable>
        </View>
      )}

      <BottomTabBar active="Cart" />
    </View>
  );
}
