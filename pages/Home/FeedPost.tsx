import { FeedPost } from "@/constants/FeedPosts";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, Share, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { COLORS, styles } from "./style";

type Props = {
  post: FeedPost;
  liked: boolean;
  active: boolean;
  onLike: (id: string, liked: boolean) => void;
  onOpenAuthor: (post: FeedPost) => void;
};

function videoHtml(uri: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<style>
  html, body { margin: 0; height: 100%; background: #141414; overflow: hidden; }
  video { width: 100%; height: 100%; object-fit: cover; background: #141414; }
</style>
</head>
<body>
<video id="clip" autoplay muted loop playsinline webkit-playsinline src="${uri}"></video>
<script>
  var clip = document.getElementById("clip");
  clip.muted = true;
  var play = clip.play();
  if (play && play.catch) play.catch(function () {});
</script>
</body>
</html>`;
}

function FeedVideo({ uri, onPress }: { uri: string; onPress: () => void }) {
  const webRef = useRef<WebView>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    webRef.current?.injectJavaScript(`
      var clip = document.getElementById("clip");
      if (clip) { clip.muted = ${muted}; clip.play(); }
      true;
    `);
  }, [muted]);

  return (
    <>
      <WebView
        ref={webRef}
        source={{ html: videoHtml(uri) }}
        style={styles.mediaFill}
        scrollEnabled={false}
        bounces={false}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={false}
        javaScriptEnabled
        originWhitelist={["*"]}
        setSupportMultipleWindows={false}
        androidLayerType="hardware"
        pointerEvents="none"
      />
      <Pressable style={styles.mediaFill} onPress={onPress} />
      <TouchableOpacity style={styles.muteBtn} onPress={() => setMuted((value) => !value)}>
        <Ionicons name={muted ? "volume-mute" : "volume-high"} size={16} color={COLORS.white} />
      </TouchableOpacity>
    </>
  );
}

export default function FeedPostCard({ post, liked, active, onLike, onOpenAuthor }: Props) {
  const [burst, setBurst] = useState(false);
  const lastTap = useRef(0);
  const burstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const likes = post.likes + (liked ? 1 : 0);

  useEffect(() => {
    return () => {
      if (burstTimer.current) clearTimeout(burstTimer.current);
    };
  }, []);

  function showBurst() {
    setBurst(true);
    if (burstTimer.current) clearTimeout(burstTimer.current);
    burstTimer.current = setTimeout(() => setBurst(false), 700);
  }

  function onMediaTap() {
    const now = Date.now();
    if (now - lastTap.current < 280) {
      if (!liked) onLike(post.id, true);
      showBurst();
    }
    lastTap.current = now;
  }

  return (
    <View style={styles.post}>
      <TouchableOpacity style={styles.postHead} activeOpacity={0.8} onPress={() => onOpenAuthor(post)}>
        <View style={styles.postAvatar}>
          <Image source={post.authorPhoto} style={styles.postAvatarImage} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.postName} numberOfLines={1}>
            {post.authorName}
          </Text>
          <Text style={styles.postPlace} numberOfLines={1}>
            {post.location}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.media}>
        {post.media.type === "image" ? (
          <Image source={post.media.source} style={styles.mediaFill} resizeMode="cover" />
        ) : active ? (
          <FeedVideo uri={post.media.uri} onPress={onMediaTap} />
        ) : (
          <View style={styles.videoPlaceholder}>
            <Ionicons name="play-circle" size={54} color={COLORS.white} />
            <Text style={styles.videoLabel}>Video</Text>
          </View>
        )}
        {post.media.type === "image" || !active ? (
          <Pressable style={styles.mediaFill} onPress={onMediaTap} />
        ) : null}
        {burst && (
          <View style={styles.burst} pointerEvents="none">
            <Ionicons name="heart" size={92} color={COLORS.white} />
          </View>
        )}
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => onLike(post.id, !liked)} hitSlop={8}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={26} color={liked ? COLORS.red : COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity hitSlop={8}>
          <Ionicons name="chatbubble-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={8}
          onPress={() => Share.share({ message: `${post.authorName}: ${post.caption}` })}
        >
          <Ionicons name="paper-plane-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.postActionSpacer} />
      </View>

      <Text style={styles.postLikes}>{likes.toLocaleString()} likes</Text>
      <Text style={styles.postCaption}>
        <Text style={styles.postCaptionName}>{post.authorName} </Text>
        {post.caption}
      </Text>
      {post.comments > 0 && (
        <Text style={styles.postComments}>View all {post.comments} comments</Text>
      )}
      <Text style={styles.postTime}>{post.timeAgo}</Text>
    </View>
  );
}
