import { scaleFont } from "@/constants/ScaleFont";
import { COLORS } from "@/pages/Home/style";
import { StyleSheet } from "react-native";

export { COLORS };

const SCREEN_BG = "#F4F7F5";
const SOFT_SHADOW = {
  shadowColor: "#0B3D2E",
  shadowOpacity: 0.08,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
} as const;

// Soft pastel avatar colours (background, text)
export const AVATAR_TINTS: { bg: string; fg: string }[] = [
  { bg: "#DDF3E4", fg: "#1E7A46" },
  { bg: "#FFE6D5", fg: "#C2551B" },
  { bg: "#E3E8FF", fg: "#4457C9" },
  { bg: "#FFE1EC", fg: "#C2336B" },
  { bg: "#FFF3C9", fg: "#9A7400" },
  { bg: "#DDF1F8", fg: "#1B7A99" },
];

/* =====================================================
   Screen 1: list of people
   ===================================================== */
export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  safe: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleFont(20),
    marginTop: scaleFont(16),
  },
  title: {
    fontSize: scaleFont(28),
    fontWeight: "800",
    letterSpacing: -0.5,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: scaleFont(12),
    color: COLORS.muted,
    marginTop: scaleFont(2),
  },
  roundBtn: {
    width: scaleFont(44),
    height: scaleFont(44),
    borderRadius: scaleFont(22),
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    ...SOFT_SHADOW,
  },
  bellDot: {
    position: "absolute",
    top: scaleFont(11),
    right: scaleFont(12),
    width: scaleFont(9),
    height: scaleFont(9),
    borderRadius: scaleFont(5),
    backgroundColor: COLORS.red,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },

  // Search
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(10),
    marginHorizontal: scaleFont(20),
    marginTop: scaleFont(18),
    paddingHorizontal: scaleFont(16),
    borderRadius: scaleFont(26),
    backgroundColor: COLORS.white,
    ...SOFT_SHADOW,
  },
  searchInput: {
    flex: 1,
    paddingVertical: scaleFont(13),
    fontSize: scaleFont(14),
    color: COLORS.text,
  },

  // Online row (stories style)
  onlineSection: {
    marginTop: scaleFont(18),
  },
  sectionLabel: {
    marginHorizontal: scaleFont(20),
    marginBottom: scaleFont(10),
    fontSize: scaleFont(12),
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: COLORS.muted,
  },
  onlineRow: {
    paddingHorizontal: scaleFont(20),
    gap: scaleFont(14),
  },
  onlineItem: {
    alignItems: "center",
    width: scaleFont(62),
  },
  onlineRing: {
    width: scaleFont(62),
    height: scaleFont(62),
    borderRadius: scaleFont(31),
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  onlineAvatar: {
    width: scaleFont(51),
    height: scaleFont(51),
    borderRadius: scaleFont(26),
    alignItems: "center",
    justifyContent: "center",
  },
  onlineName: {
    marginTop: scaleFont(6),
    fontSize: scaleFont(12),
    fontWeight: "600",
    color: COLORS.text,
  },

  // Tabs (pill segmented)
  tabs: {
    flexDirection: "row",
    marginHorizontal: scaleFont(20),
    marginTop: scaleFont(18),
    padding: scaleFont(4),
    borderRadius: scaleFont(24),
    backgroundColor: "#E7EEEA",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(6),
    paddingVertical: scaleFont(10),
    borderRadius: scaleFont(20),
  },
  tabActive: {
    backgroundColor: COLORS.white,
    ...SOFT_SHADOW,
  },
  tabText: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.muted,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tabBadge: {
    minWidth: scaleFont(18),
    paddingHorizontal: scaleFont(5),
    paddingVertical: scaleFont(1),
    borderRadius: scaleFont(9),
    alignItems: "center",
    backgroundColor: COLORS.red,
  },
  tabBadgeText: {
    fontSize: scaleFont(10),
    fontWeight: "800",
    color: COLORS.white,
  },

  // List
  listContent: {
    paddingHorizontal: scaleFont(20),
    paddingTop: scaleFont(16),
    paddingBottom: scaleFont(30),
    gap: scaleFont(12),
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: scaleFont(40),
    fontSize: scaleFont(13),
  },

  // Contact card
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(14),
    padding: scaleFont(14),
    borderRadius: scaleFont(22),
    backgroundColor: COLORS.white,
    ...SOFT_SHADOW,
  },
  cardUnread: {
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  avatar: {
    width: scaleFont(54),
    height: scaleFont(54),
    borderRadius: scaleFont(20),
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: scaleFont(20),
    fontWeight: "800",
  },
  onlineDot: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: scaleFont(14),
    height: scaleFont(14),
    borderRadius: scaleFont(7),
    backgroundColor: COLORS.primary,
    borderWidth: 2.5,
    borderColor: COLORS.white,
  },
  cardBody: {
    flex: 1,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: scaleFont(8),
  },
  name: {
    flex: 1,
    fontSize: scaleFont(16),
    fontWeight: "800",
    color: COLORS.text,
  },
  time: {
    fontSize: scaleFont(11),
    color: COLORS.muted,
  },
  timeUnread: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  roleChip: {
    alignSelf: "flex-start",
    marginTop: scaleFont(3),
    paddingHorizontal: scaleFont(8),
    paddingVertical: scaleFont(2),
    borderRadius: scaleFont(8),
    backgroundColor: COLORS.primaryLight,
  },
  role: {
    fontSize: scaleFont(10),
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: scaleFont(8),
    marginTop: scaleFont(6),
  },
  lastMessage: {
    flex: 1,
    fontSize: scaleFont(13),
    color: COLORS.muted,
  },
  lastMessageUnread: {
    color: COLORS.text,
    fontWeight: "600",
  },
  unreadBadge: {
    minWidth: scaleFont(22),
    height: scaleFont(22),
    paddingHorizontal: scaleFont(6),
    borderRadius: scaleFont(11),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  unreadText: {
    fontSize: scaleFont(11),
    fontWeight: "800",
    color: COLORS.white,
  },
});

/* =====================================================
   Screen 2: chat room
   ===================================================== */
export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  chatBg: {
    flex: 1,
    backgroundColor: SCREEN_BG,
    borderTopLeftRadius: scaleFont(28),
    borderTopRightRadius: scaleFont(28),
    overflow: "hidden",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleFont(16),
    paddingTop: scaleFont(14),
    paddingBottom: scaleFont(18),
    backgroundColor: COLORS.white,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(12),
  },
  roundBtn: {
    width: scaleFont(42),
    height: scaleFont(42),
    borderRadius: scaleFont(21),
    backgroundColor: SCREEN_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  callBtn: {
    width: scaleFont(42),
    height: scaleFont(42),
    borderRadius: scaleFont(21),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: scaleFont(46),
    height: scaleFont(46),
    borderRadius: scaleFont(17),
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: scaleFont(18),
    fontWeight: "800",
  },
  onlineDot: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: scaleFont(13),
    height: scaleFont(13),
    borderRadius: scaleFont(7),
    backgroundColor: COLORS.primary,
    borderWidth: 2.5,
    borderColor: COLORS.white,
  },
  contactName: {
    fontSize: scaleFont(17),
    fontWeight: "800",
    color: COLORS.text,
  },
  contactStatus: {
    fontSize: scaleFont(12),
    color: COLORS.muted,
    marginTop: scaleFont(1),
  },
  contactStatusOnline: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  // Message list
  listContent: {
    paddingHorizontal: scaleFont(16),
    paddingTop: scaleFont(20),
    paddingBottom: scaleFont(10),
    gap: scaleFont(10),
  },
  dayWrap: {
    alignItems: "center",
    marginVertical: scaleFont(8),
  },
  dayChip: {
    paddingHorizontal: scaleFont(14),
    paddingVertical: scaleFont(5),
    borderRadius: scaleFont(14),
    backgroundColor: "rgba(255,255,255,0.9)",
    ...SOFT_SHADOW,
    shadowOpacity: 0.04,
  },
  dayText: {
    fontSize: scaleFont(11),
    fontWeight: "700",
    color: COLORS.muted,
  },

  // Bubbles
  row: {
    flexDirection: "row",
  },
  rowMe: {
    justifyContent: "flex-end",
  },
  rowThem: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: scaleFont(14),
    paddingTop: scaleFont(10),
    paddingBottom: scaleFont(7),
    borderRadius: scaleFont(22),
  },
  bubbleThem: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: scaleFont(6),
    ...SOFT_SHADOW,
    shadowOpacity: 0.05,
  },
  bubbleMe: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: scaleFont(6),
    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  messageText: {
    fontSize: scaleFont(14.5),
    lineHeight: scaleFont(21),
  },
  messageTextThem: {
    color: COLORS.text,
  },
  messageTextMe: {
    color: COLORS.white,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: scaleFont(4),
    marginTop: scaleFont(3),
  },
  timeText: {
    fontSize: scaleFont(10),
  },
  timeThem: {
    color: COLORS.muted,
  },
  timeMe: {
    color: "rgba(255,255,255,0.8)",
  },

  // Quick replies
  quickRow: {
    paddingHorizontal: scaleFont(16),
    paddingVertical: scaleFont(8),
    gap: scaleFont(8),
  },
  quickChip: {
    paddingHorizontal: scaleFont(16),
    paddingVertical: scaleFont(8),
    borderRadius: scaleFont(18),
    backgroundColor: COLORS.primaryLight,
  },
  quickText: {
    fontSize: scaleFont(12),
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  // Floating input bar
  inputBar: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: scaleFont(8),
    marginHorizontal: scaleFont(12),
    marginTop: scaleFont(4),
    marginBottom: scaleFont(12),
    padding: scaleFont(6),
    borderRadius: scaleFont(30),
    backgroundColor: COLORS.white,
    zIndex: 2,
    ...SOFT_SHADOW,
    shadowOpacity: 0.14,
  },
  attachBtn: {
    width: scaleFont(40),
    height: scaleFont(40),
    borderRadius: scaleFont(20),
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrap: {
    flex: 1,
    minHeight: scaleFont(40),
    maxHeight: scaleFont(110),
    justifyContent: "center",
    paddingHorizontal: scaleFont(6),
  },
  input: {
    minHeight: scaleFont(24),
    fontSize: scaleFont(15),
    color: "#1A1A1A",
    paddingVertical: scaleFont(8),
  },
  sendBtn: {
    width: scaleFont(40),
    height: scaleFont(40),
    borderRadius: scaleFont(20),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
});