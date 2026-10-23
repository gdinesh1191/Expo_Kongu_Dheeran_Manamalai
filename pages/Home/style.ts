import { scaleFont } from "@/constants/ScaleFont";
import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#0E9B0E",
  primaryDark: "#0A6B0A",
  primaryLight: "#E6F4E6",
  red: "#EE0E0E",
  text: "#1F2A1F",
  muted: "#7A7A7A",
  border: "#E3E3E3",
  white: "#FFFFFF",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: scaleFont(18),
  },
  
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleFont(14),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(10),
  },
  logo: {
    width: scaleFont(40),
    height: scaleFont(40),
  },
  greeting: {
    fontSize: scaleFont(12),
    color: COLORS.muted,
  },
  userName: {
    fontSize: scaleFont(17),
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  headerRight: {
    flexDirection: "row",
    gap: scaleFont(10),
  },
  iconBtn: {
    width: scaleFont(42),
    height: scaleFont(42),
    borderRadius: scaleFont(14),
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  notifDot: {
    position: "absolute",
    top: scaleFont(10),
    right: scaleFont(11),
    width: scaleFont(8),
    height: scaleFont(8),
    borderRadius: scaleFont(4),
    backgroundColor: COLORS.red,
    borderWidth: 1,
    borderColor: COLORS.white,
  },

  // Segmented toggle
  segment: {
    flexDirection: "row",
    backgroundColor: COLORS.primaryLight,
    borderRadius: scaleFont(30),
    padding: scaleFont(4),
    marginTop: scaleFont(20),
  },
  segmentItem: {
    flex: 1,
    paddingVertical: scaleFont(11),
    borderRadius: scaleFont(26),
    alignItems: "center",
  },
  segmentItemActive: {
    backgroundColor: COLORS.primary,
  },
  segmentText: {
    fontSize: scaleFont(13),
    fontWeight: "600",
    color: COLORS.primary,
  },
  segmentTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },

  // Card stack
  cardArea: {
    flex: 1,
    marginTop: scaleFont(18),
    marginBottom: scaleFont(20),
  },
  backCardRed: {
    ...StyleSheet.absoluteFillObject,
    top: scaleFont(4),
    borderRadius: scaleFont(26),
    backgroundColor: "#F6D9D9",
    transform: [{ rotate: "-5deg" }],
  },
  backCardGreen: {
    ...StyleSheet.absoluteFillObject,
    top: -scaleFont(4),
    borderRadius: scaleFont(26),
    backgroundColor: "#D3EBD3",
    transform: [{ rotate: "4deg" }],
  },
  cardLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  stamp: {
    position: "absolute",
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(4),
    borderWidth: 3,
    borderRadius: scaleFont(10),
  },
  stampDetails: {
    alignSelf: "center",
    top: "40%",
    borderColor: COLORS.white,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  stampText: {
    fontSize: scaleFont(20),
    fontWeight: "900",
    letterSpacing: 1,
  },
  card: {
    flex: 1,
    borderRadius: scaleFont(26),
    backgroundColor: COLORS.primary,
    overflow: "hidden",
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  // experimental_backgroundImage requires the New Architecture (enabled in app.json).
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
    experimental_backgroundImage:
      "linear-gradient(to bottom, rgba(0,46,0,0) 0%, rgba(0,46,0,0.45) 50%, rgba(0,46,0,0.85) 100%)",
  },
  avatarWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  avatarHead: {
    width: scaleFont(100),
    height: scaleFont(100),
    borderRadius: scaleFont(50),
    backgroundColor: "rgba(255,255,255,0.25)",
    marginBottom: scaleFont(42),
  },
  avatarBody: {
    width: scaleFont(210),
    height: scaleFont(180),
    borderTopLeftRadius: scaleFont(105),
    borderTopRightRadius: scaleFont(105),
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: -scaleFont(30),
  },
  cardInfo: {
    position: "absolute",
    left: scaleFont(20),
    right: scaleFont(20),
    bottom: scaleFont(22),
  },
  profileName: {
    fontSize: scaleFont(26),
    fontWeight: "800",
    color: COLORS.white,
  },
  profileMeta: {
    flexShrink: 1,
    fontSize: scaleFont(13),
    color: "rgba(255,255,255,0.9)",
  },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(6),
    marginTop: scaleFont(4),
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scaleFont(8),
    marginTop: scaleFont(10),
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(5),
    borderRadius: scaleFont(14),
  },
  tagText: {
    fontSize: scaleFont(11),
    fontWeight: "600",
    color: COLORS.white,
  },

  // Empty states
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleFont(24),
  },
  emptyTitle: {
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: COLORS.text,
    marginTop: scaleFont(12),
  },
  emptyText: {
    fontSize: scaleFont(13),
    color: COLORS.muted,
    textAlign: "center",
    marginTop: scaleFont(6),
  },
  // Saved (Liked tab) list
  savedList: {
    flex: 1,
    marginTop: scaleFont(16),
  },
  savedItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(12),
    padding: scaleFont(12),
    marginBottom: scaleFont(10),
    borderRadius: scaleFont(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  savedAvatar: {
    width: scaleFont(50),
    height: scaleFont(50),
    borderRadius: scaleFont(25),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  savedInfo: {
    flex: 1,
  },
  savedName: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.text,
  },
  savedMeta: {
    fontSize: scaleFont(12),
    color: COLORS.muted,
    marginTop: scaleFont(2),
  },
  savedRemove: {
    width: scaleFont(32),
    height: scaleFont(32),
    borderRadius: scaleFont(16),
    borderWidth: 1,
    borderColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
  },

  feedHeader: {
    paddingHorizontal: scaleFont(18),
  },
  feedList: {
    flex: 1,
    marginTop: scaleFont(14),
  },
  feedContent: {
    paddingBottom: scaleFont(18),
  },
  post: {
    marginBottom: scaleFont(18),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  postHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(10),
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(10),
  },
  postAvatar: {
    width: scaleFont(36),
    height: scaleFont(36),
    borderRadius: scaleFont(18),
    backgroundColor: COLORS.primary,
    overflow: "hidden",
  },
  postAvatarImage: {
    width: "100%",
    height: "100%",
  },
  postName: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: COLORS.text,
  },
  postPlace: {
    fontSize: scaleFont(11),
    color: COLORS.muted,
    marginTop: scaleFont(1),
  },
  media: {
    width: "100%",
    aspectRatio: 4 / 5,
    backgroundColor: "#141414",
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  mediaFill: {
    ...StyleSheet.absoluteFillObject,
  },
  videoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(8),
  },
  videoLabel: {
    color: COLORS.white,
    fontSize: scaleFont(13),
    fontWeight: "700",
  },
  muteBtn: {
    position: "absolute",
    right: scaleFont(12),
    bottom: scaleFont(12),
    width: scaleFont(32),
    height: scaleFont(32),
    borderRadius: scaleFont(16),
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  burst: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleFont(12),
    paddingTop: scaleFont(10),
    gap: scaleFont(14),
  },
  postActionSpacer: {
    flex: 1,
  },
  postLikes: {
    paddingHorizontal: scaleFont(12),
    paddingTop: scaleFont(8),
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.text,
  },
  postCaption: {
    paddingHorizontal: scaleFont(12),
    paddingTop: scaleFont(4),
    fontSize: scaleFont(13),
    color: COLORS.text,
    lineHeight: scaleFont(18),
  },
  postCaptionName: {
    fontWeight: "700",
  },
  postComments: {
    paddingHorizontal: scaleFont(12),
    paddingTop: scaleFont(4),
    fontSize: scaleFont(13),
    color: COLORS.muted,
  },
  postTime: {
    paddingHorizontal: scaleFont(12),
    paddingTop: scaleFont(4),
    fontSize: scaleFont(11),
    color: COLORS.muted,
  },
});
