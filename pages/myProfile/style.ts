import { scaleFont } from "@/constants/ScaleFont";
import { COLORS } from "@/pages/Home/style";
import { StyleSheet } from "react-native";

export { COLORS };

const SCREEN_BG = "#F5FAF5";
const RED_LIGHT = "#FDE7E7";
const AVATAR_SIZE = scaleFont(116);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scrollContent: {
    paddingHorizontal: scaleFont(20),
    paddingBottom: scaleFont(16),
  },

  // Header
  headerCurve: {
    position: "absolute",
    top: 0,
    left: "-25%",
    width: "150%",
    height: scaleFont(170),
    backgroundColor: COLORS.primaryLight,
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 9999,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleFont(16),
  },
  title: {
    fontSize: scaleFont(22),
    fontWeight: "800",
    color: COLORS.text,
  },
  settingsBtn: {
    width: scaleFont(44),
    height: scaleFont(44),
    borderRadius: scaleFont(14),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  // Identity
  avatarWrap: {
    alignSelf: "center",
    marginTop: scaleFont(4),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 4,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  avatarHead: {
    width: scaleFont(36),
    height: scaleFont(36),
    borderRadius: scaleFont(18),
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: scaleFont(8),
  },
  avatarBody: {
    width: scaleFont(76),
    height: scaleFont(36),
    borderTopLeftRadius: scaleFont(38),
    borderTopRightRadius: scaleFont(38),
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  editBadge: {
    position: "absolute",
    right: scaleFont(2),
    bottom: scaleFont(4),
    width: scaleFont(32),
    height: scaleFont(32),
    borderRadius: scaleFont(16),
    borderWidth: 3,
    borderColor: COLORS.white,
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
    elevation: 9,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(8),
    marginTop: scaleFont(14),
  },
  name: {
    fontSize: scaleFont(22),
    fontWeight: "800",
    color: COLORS.text,
  },
  meta: {
    textAlign: "center",
    fontSize: scaleFont(13),
    color: COLORS.muted,
    marginTop: scaleFont(4),
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: scaleFont(10),
    marginTop: scaleFont(18),
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: scaleFont(12),
    borderRadius: scaleFont(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  statValue: {
    fontSize: scaleFont(20),
    fontWeight: "800",
  },
  statLabel: {
    fontSize: scaleFont(11),
    color: "#5A5A5A",
    marginTop: scaleFont(2),
  },

  // Completeness
  completeCard: {
    marginTop: scaleFont(12),
    padding: scaleFont(16),
    borderRadius: scaleFont(18),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  completeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  completeTitle: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: COLORS.text,
  },
  completeValue: {
    fontSize: scaleFont(14),
    fontWeight: "800",
    color: COLORS.primary,
  },
  progressTrack: {
    height: scaleFont(8),
    borderRadius: scaleFont(4),
    backgroundColor: COLORS.primaryLight,
    marginTop: scaleFont(10),
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: scaleFont(4),
    backgroundColor: COLORS.primary,
  },
  completeHint: {
    fontSize: scaleFont(11),
    color: "#5A5A5A",
    marginTop: scaleFont(8),
  },

  // Menu
  menu: {
    marginTop: scaleFont(14),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(14),
    paddingVertical: scaleFont(10),
  },
  menuDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  menuIcon: {
    width: scaleFont(40),
    height: scaleFont(40),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconDanger: {
    backgroundColor: RED_LIGHT,
  },
  menuLabel: {
    flex: 1,
    fontSize: scaleFont(15),
    color: COLORS.text,
  },
  menuLabelDanger: {
    color: COLORS.red,
  },
  menuBadge: {
    paddingHorizontal: scaleFont(10),
    paddingVertical: scaleFont(3),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.primaryLight,
  },
  menuBadgeText: {
    fontSize: scaleFont(11),
    fontWeight: "700",
    color: COLORS.primary,
  },
});
