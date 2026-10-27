import { FEED_ADMIN, FeedPost } from "@/constants/FeedPosts";
import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { COLORS, styles } from "./style";

type Props = {
  post: FeedPost;
  playing: boolean;
  onTogglePlay: (id: string) => void;
};

function ActiveVideo({ uri, onToggle }: { uri: string; onToggle: () => void }) {
  const [muted, setMuted] = useState(true);
  const player = useVideoPlayer(uri, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  useEffect(() => {
    player.muted = muted;
  }, [player, muted]);

  return (
    <>
      <VideoView
        player={player}
        style={styles.mediaFill}
        contentFit="cover"
        nativeControls={false}
        pointerEvents="none"
      />
      <Pressable style={styles.mediaFill} onPress={onToggle} />
      <Pressable
        style={styles.muteBtn}
        onPress={() => setMuted((value) => !value)}
      >
        <Ionicons
          name={muted ? "volume-mute" : "volume-high"}
          size={16}
          color={COLORS.white}
        />
      </Pressable>
    </>
  );
}

function FeedVideo({
  uri,
  playing,
  onToggle,
}: {
  uri: string;
  playing: boolean;
  onToggle: () => void;
}) {
  if (!playing) {
    return (
      <Pressable style={styles.videoIdle} onPress={onToggle}>
        <View style={styles.playCircle}>
          <Ionicons
            name="play"
            size={22}
            color={COLORS.white}
            style={styles.playIcon}
          />
        </View>
      </Pressable>
    );
  }

  return <ActiveVideo uri={uri} onToggle={onToggle} />;
}

export default function FeedPostCard({ post, playing, onTogglePlay }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [measured, setMeasured] = useState(false);
  const [shortText, setShortText] = useState<string | null>(null); // null = fits in 2 lines

  const showShort = measured && shortText !== null && !expanded;
  return (
    <View style={styles.post}>
      {/* logo + name row (unchanged content) */}
      <View style={styles.postHeader}>
        <Image
          source={FEED_ADMIN.photo}
          style={styles.postAvatar}
          resizeMode="contain"
        />
        <View style={styles.postHeaderText}>
          <View style={styles.tweetNameRow}>
            <Text style={styles.postName} numberOfLines={1}>
              {FEED_ADMIN.name}
            </Text>
            <Ionicons
              name="checkmark-circle"
              size={15}
              color={COLORS.primary}
            />
          </View>
          <Text style={styles.tweetMeta} numberOfLines={1}>
            @{FEED_ADMIN.handle} · {post.timeAgo}
          </Text>
        </View>
      </View>

      {/* full-width portrait image / video */}
      <View style={styles.tweetMedia}>
        {post.media.type === "image" ? (
          <Image
            source={post.media.source}
            style={styles.mediaFill}
            resizeMode="cover"
          />
        ) : (
          <FeedVideo
            uri={post.media.uri}
            playing={playing}
            onToggle={() => onTogglePlay(post.id)}
          />
        )}
      </View>

      {/* caption + more */}
      <View style={styles.captionWrap}>
        <Text
          style={[styles.tweetText, { opacity: measured ? 1 : 0 }]}
          onTextLayout={(e) => {
            if (measured) return;
            const lines = e.nativeEvent.lines;
            if (lines.length > 2) {
              const first = lines[0].text;
              const second = lines[1].text.replace(/\s+$/, "");
              // leave room on line 2 for "  …more"
              const cut = Math.max(0, second.length - 9);
              setShortText((first + second.slice(0, cut)).replace(/\s+$/, ""));
            }
            setMeasured(true);
          }}
        >
          {showShort ? shortText : post.text}
          {showShort && (
            <Text style={styles.moreText} onPress={() => setExpanded(true)}>
              {"  …more"}
            </Text>
          )}
          {expanded && shortText !== null && (
            <Text style={styles.moreText} onPress={() => setExpanded(false)}>
              {"  less"}
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
}
