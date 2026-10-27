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
    paddingTop: scaleFont(10),
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
  headerAvatar: {
    width: scaleFont(40),
    height: scaleFont(40),
    borderRadius: scaleFont(20),
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    width: scaleFont(32),
    height: scaleFont(32),
    borderRadius: scaleFont(10),
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },

  // Header search
  headerSlot: {
    flex: 1,
    height: scaleFont(42),
    marginRight: scaleFont(10),
    overflow: "hidden",
  },
  headerSlotFill: {
    ...StyleSheet.absoluteFillObject,
  },
  headerSearch: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(6),
    marginVertical: scaleFont(4),
    paddingHorizontal: scaleFont(10),
    borderRadius: scaleFont(10),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#F7F7F7",
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFont(13),
    color: COLORS.text,
    paddingVertical: 0,
  },
  flexShrink: { flexShrink: 1 },
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
  poruthamBadge: {
    position: "absolute",
    top: scaleFont(16),
    right: scaleFont(16),
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(5),
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(6),
    borderRadius: scaleFont(16),
    backgroundColor: COLORS.red,
    borderWidth: 1.5,
    borderColor: COLORS.white,
    shadowColor: COLORS.red,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  poruthamBadgeText: {
    fontSize: scaleFont(14),
    fontWeight: "800",
    color: COLORS.white,
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

  homeScreen: {
    flex: 1,
    backgroundColor: "#F3F6F3",
  },
  feedHeader: {
    paddingHorizontal: scaleFont(18),
    paddingBottom: scaleFont(10),
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  feedList: {
    flex: 1,
    backgroundColor: "#F3F6F3",
  },
  feedContent: {
    paddingTop: scaleFont(12),
    paddingBottom: scaleFont(4),
  },
  post: {
    marginHorizontal: scaleFont(8),
    marginBottom: scaleFont(12),
    paddingVertical: scaleFont(12),
    borderRadius: scaleFont(18),
    backgroundColor: COLORS.white,
    shadowColor: "#1F2A1F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(10),
    paddingHorizontal: scaleFont(12),
  },
  postHeaderText: {
    flex: 1,
  },
  captionWrap: {
    paddingHorizontal: scaleFont(12),
  },
  postAvatar: {
    width: scaleFont(40),
    height: scaleFont(40),
    borderRadius: scaleFont(20),
    overflow: "hidden",
  },
  tweetBody: {
    flex: 1,
  },
  tweetNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(4),
  },
  postName: {
    flexShrink: 1,
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.text,
  },
  tweetMeta: {
    marginTop: scaleFont(1),
    fontSize: scaleFont(13),
    color: COLORS.muted,
  },
  tweetText: {
    marginTop: scaleFont(10),
    fontSize: scaleFont(15),
    lineHeight: scaleFont(21),
    color: COLORS.text,
  },
  tweetMedia: {
    marginTop: scaleFont(10),
    width: "100%",
    aspectRatio: 4 / 5, // portrait like Instagram (was 16 / 9)
    // borderRadius: scaleFont(14),
    backgroundColor: "#D6E4F5",
    overflow: "hidden",
  },

  moreText: {
    fontWeight: "600",
    color: COLORS.muted,
  },
  mediaFill: {
    ...StyleSheet.absoluteFillObject,
  },

  videoIdle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  playCircle: {
    width: scaleFont(52),
    height: scaleFont(52),
    borderRadius: scaleFont(26),
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    marginLeft: scaleFont(3),
  },
  muteBtn: {
    position: "absolute",
    right: scaleFont(10),
    bottom: scaleFont(10),
    width: scaleFont(32),
    height: scaleFont(32),
    borderRadius: scaleFont(16),
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
});
