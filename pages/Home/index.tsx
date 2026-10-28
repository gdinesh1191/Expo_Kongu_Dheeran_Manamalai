import { useAuth } from "@/app/AuthContext";
import BottomTabBar from "@/components/BottomTabBar";
import FillImage from "@/components/FillImage";
import { FEED_POSTS, FeedPost } from "@/constants/FeedPosts";
import { MY_PROFILE } from "@/constants/SampleProfile";
import { primaryPhoto } from "@/utils/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
  ViewToken,
} from "react-native";
import FeedPostCard from "./FeedPost";
import LoginPromptCard from "./LoginPromptCard";
import { COLORS, styles } from "./style";

const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

export default function Home() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuth();
  const navigation = useNavigation<any>();
  async function onRefresh() {
    setRefreshing(true);
    setPlayingId(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setRefreshing(false);
  }

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const visible = new Set(
        viewableItems
          .filter((token) => token.isViewable)
          .map((token) => (token.item as FeedPost).id),
      );
      setPlayingId((current) =>
        current && visible.has(current) ? current : null,
      );
    },
  ).current;

  function togglePlay(id: string) {
    setPlayingId((current) => (current === id ? null : id));
  }

  return (
    <View style={styles.homeScreen}>
      <View style={styles.feedHeader}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {token !== null ? (
              <View style={styles.headerAvatar}>
                <Feather name="user" size={20} color="rgba(255,255,255,0.85)" />

                <FillImage source={primaryPhoto(MY_PROFILE)} />
              </View>
            ) : (
              <Image
                source={require("../../assets/Images/Logo_bg.png")}
                style={styles.postAvatar}
                resizeMode="contain"
              />
            )}
            <View>
              <Text style={styles.userName} numberOfLines={1}>
                {token !== null ? MY_PROFILE.name : "Kongu Dheeran Manamalai"}
              </Text>
              {token !== null ? (
                <Text style={styles.greeting}>Reg No: {MY_PROFILE.id}</Text>
              ) : (
                <Text style={styles.greeting}>For Kongu By Kongu</Text>
              )}
            </View>
          </View>
          <View style={styles.headerRight}>
            {token !== null && (
              <Pressable style={styles.iconBtn}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={COLORS.red}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <FlatList
        data={FEED_POSTS}
        keyExtractor={(item) => item.id}
        style={styles.feedList}
        contentContainerStyle={[
          styles.feedContent,
          FEED_POSTS.length === 0 && styles.emptyWrap,
        ]}
        showsVerticalScrollIndicator={false}
        extraData={playingId}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListHeaderComponent={
          token === null ? (
            <LoginPromptCard onLogin={() => navigation.navigate("Login")} />
          ) : null
        }
        ListEmptyComponent={
          <>
            <Ionicons
              name="chatbubbles-outline"
              size={48}
              color={COLORS.primary}
            />
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptyText}>
              Official updates will show up in this feed.
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <FeedPostCard
            post={item}
            playing={item.id === playingId}
            onTogglePlay={togglePlay}
          />
        )}
      />

      <BottomTabBar active="Posts" />
    </View>
  );
}
