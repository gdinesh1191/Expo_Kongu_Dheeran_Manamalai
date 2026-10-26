import { scaleFont } from "@/constants/ScaleFont";
import { COLORS } from "@/pages/Home/style";
import { Dimensions, StyleSheet } from "react-native";

export { COLORS };

const HERO_HEIGHT = Dimensions.get("window").height * 0.42;
export const SHEET_OVERLAP = scaleFont(26);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // Hero
  hero: {
    height: HERO_HEIGHT,
    backgroundColor: COLORS.primary,
  },
  avatarWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  avatarHead: {
    width: scaleFont(110),
    height: scaleFont(110),
    borderRadius: scaleFont(55),
    backgroundColor: "rgba(255,255,255,0.28)",
    marginBottom: scaleFont(42),
  },
  avatarBody: {
    width: scaleFont(230),
    height: scaleFont(160),
    borderTopLeftRadius: scaleFont(115),
    borderTopRightRadius: scaleFont(115),
    backgroundColor: "rgba(255,255,255,0.28)",
    marginBottom: -SHEET_OVERLAP,
  },
  photoHidden: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(6),
  },
  photoHiddenText: {
    fontSize: scaleFont(12),
    fontWeight: "600",
    color: COLORS.white,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaleFont(18),
    paddingTop: scaleFont(14),
  },
  heroBtn: {
    width: scaleFont(42),
    height: scaleFont(42),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  heroBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: SHEET_OVERLAP + scaleFont(10),
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: scaleFont(16),
    gap: scaleFont(10),
  },
  thumbs: {
    flexGrow: 0,
    flexShrink: 1,
  },
  thumbsContent: {
    gap: scaleFont(8),
  },
  thumb: {
    width: scaleFont(44),
    height: scaleFont(56),
    borderRadius: scaleFont(10),
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  thumbActive: {
    borderColor: COLORS.white,
  },
  thumbImage: {
    width: "100%",
    height: "100%",
  },

  // Sheet
  sheet: {
    marginTop: -SHEET_OVERLAP,
    zIndex: 2,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scaleFont(28),
    borderTopRightRadius: scaleFont(28),
    overflow: "hidden",
    paddingHorizontal: scaleFont(20),
    paddingTop: scaleFont(22),
    paddingBottom: scaleFont(16),
  },
  name: {
    fontSize: scaleFont(24),
    fontWeight: "800",
    color: COLORS.text,
  },
  meta: {
    fontSize: scaleFont(12),
    color: COLORS.muted,
    marginTop: scaleFont(4),
  },
  sectionTitle: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.text,
    marginTop: scaleFont(24),
    marginBottom: scaleFont(10),
  },

  // Download format
  formatRow: {
    flexDirection: "row",
    gap: scaleFont(10),
  },
  formatOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(8),
    paddingVertical: scaleFont(14),
    borderRadius: scaleFont(14),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  formatOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  formatText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: COLORS.text,
  },
  formatTextActive: {
    color: COLORS.white,
  },

  // Toggles
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaleFont(6),
  },
  toggleDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  toggleLabel: {
    fontSize: scaleFont(13),
    color: COLORS.text,
  },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(12),
    paddingHorizontal: scaleFont(18),
    paddingVertical: scaleFont(14),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  downloadBtn: {
    flex: 1,
    height: scaleFont(54),
    flexDirection: "row",
    gap: scaleFont(10),
    borderRadius: scaleFont(16),
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.red,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  downloadText: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: COLORS.white,
  },
});
