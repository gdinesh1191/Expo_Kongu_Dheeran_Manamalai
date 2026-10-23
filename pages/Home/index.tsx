import BottomTabBar from "@/components/BottomTabBar";
import { FEED_POSTS, FeedPost } from "@/constants/FeedPosts";
import { MY_PROFILE, Profile, SAMPLE_PROFILES } from "@/constants/SampleProfile";
import { loadRecentViewIds, orderByRecentViews, rememberRecentView } from "@/utils/recentViews";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View, ViewToken } from "react-native";
import FeedPostCard from "./FeedPost";
import { COLORS, styles } from "./style";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const viewabilityConfig = { itemVisiblePercentThreshold: 70 };

export default function Home() {
  const navigation = useNavigation<any>();
  const [deck, setDeck] = useState<FeedPost[] | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const keepPlace = useRef(false);
  const activeVideoRef = useRef<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadRecentViewIds().then((ids) => {
        if (!active) return;
        if (keepPlace.current) {
          keepPlace.current = false;
          return;
        }
        setDeck(orderByRecentViews(FEED_POSTS, ids));
      });
      return () => {
        active = false;
      };
    }, []),
  );

  const posts = deck ?? [];

  async function onRefresh() {
    setRefreshing(true);
    const ids = await loadRecentViewIds();
    setDeck(orderByRecentViews(FEED_POSTS, ids));
    await new Promise((resolve) => setTimeout(resolve, 600));
    setRefreshing(false);
  }

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const visible = viewableItems.filter((token) => token.isViewable);
      const top = visible[0]?.item as FeedPost | undefined;
      const nextVideo = top?.media.type === "video" ? top.id : null;
      if (activeVideoRef.current !== nextVideo) {
        activeVideoRef.current = nextVideo;
        setActiveVideoId(nextVideo);
      }
      visible.forEach((token) => {
        const post = token.item as FeedPost;
        rememberRecentView(post.id);
      });
    },
  ).current;

  function setPostLiked(id: string, liked: boolean) {
    setLikedIds((ids) =>
      liked ? (ids.includes(id) ? ids : [...ids, id]) : ids.filter((item) => item !== id),
    );
  }

  function openAuthor(post: FeedPost) {
    const profile = [...SAMPLE_PROFILES, MY_PROFILE].find((item) => item.id === post.authorId);
    if (!profile) return;
    keepPlace.current = true;
    navigation.navigate("ProfileDetails", { profile: profile as Profile });
  }

  return (
    <View style={styles.container}>
      <View style={styles.feedHeader}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/Images/Logo_bg.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.userName} numberOfLines={1}>
                {MY_PROFILE.name}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="filter" size={20} color={COLORS.red} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.red} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {deck ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          style={styles.feedList}
          contentContainerStyle={[styles.feedContent, posts.length === 0 && styles.emptyWrap]}
          showsVerticalScrollIndicator={false}
          extraData={{ activeVideoId, likedIds }}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
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
          ListEmptyComponent={
            <>
              <Ionicons name="image-outline" size={48} color={COLORS.primary} />
              <Text style={styles.emptyTitle}>Nothing here yet</Text>
              <Text style={styles.emptyText}>New posts will show up in this feed.</Text>
            </>
          }
          renderItem={({ item }) => (
            <FeedPostCard
              post={item}
              liked={likedIds.includes(item.id)}
              active={item.media.type === "video" && item.id === activeVideoId}
              onLike={setPostLiked}
              onOpenAuthor={openAuthor}
            />
          )}
        />
      ) : (
        <View style={styles.feedList} />
      )}

      <BottomTabBar active="Home" />
    </View>
  );
}
