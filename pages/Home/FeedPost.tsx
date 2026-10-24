import { FEED_ADMIN, FeedPost } from "@/constants/FeedPosts";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { COLORS, styles } from "./style";

type Props = {
  post: FeedPost;
  playing: boolean;
  onTogglePlay: (id: string) => void;
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

function FeedVideo({
  uri,
  playing,
  onToggle,
}: {
  uri: string;
  playing: boolean;
  onToggle: () => void;
}) {
  const webRef = useRef<WebView>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!playing) return;
    webRef.current?.injectJavaScript(`
      var clip = document.getElementById("clip");
      if (clip) { clip.muted = ${muted}; clip.play(); }
      true;
    `);
  }, [muted, playing]);

  if (!playing) {
    return (
      <Pressable style={styles.videoIdle} onPress={onToggle}>
        <View style={styles.playCircle}>
          <Ionicons name="play" size={22} color={COLORS.white} style={styles.playIcon} />
        </View>
      </Pressable>
    );
  }

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
      <Pressable style={styles.mediaFill} onPress={onToggle} />
      <TouchableOpacity style={styles.muteBtn} onPress={() => setMuted((value) => !value)}>
        <Ionicons name={muted ? "volume-mute" : "volume-high"} size={16} color={COLORS.white} />
      </TouchableOpacity>
    </>
  );
}

export default function FeedPostCard({ post, playing, onTogglePlay }: Props) {
  return (
    <View style={styles.post}>
      <Image source={FEED_ADMIN.photo} style={styles.postAvatar} resizeMode="contain" />
      <View style={styles.tweetBody}>
        <View style={styles.tweetNameRow}>
          <Text style={styles.postName} numberOfLines={1}>
            {FEED_ADMIN.name}
          </Text>
          <Ionicons name="checkmark-circle" size={15} color={COLORS.primary} />
        </View>
        <Text style={styles.tweetMeta} numberOfLines={1}>
          @{FEED_ADMIN.handle} · {post.timeAgo}
        </Text>
        <Text style={styles.tweetText}>{post.text}</Text>

        <View style={styles.tweetMedia}>
          {post.media.type === "image" ? (
            <Image source={post.media.source} style={styles.mediaFill} resizeMode="cover" />
          ) : (
            <FeedVideo
              uri={post.media.uri}
              playing={playing}
              onToggle={() => onTogglePlay(post.id)}
            />
          )}
        </View>
      </View>
    </View>
  );
}
