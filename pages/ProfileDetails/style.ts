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
    overflow: "hidden",
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

  // Sheet
  sheet: {
    marginTop: -SHEET_OVERLAP,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scaleFont(28),
    borderTopRightRadius: scaleFont(28),
    paddingHorizontal: scaleFont(20),
    paddingTop: scaleFont(24),
    paddingBottom: scaleFont(24),
  },
  name: {
    fontSize: scaleFont(24),
    fontWeight: "800",
    color: COLORS.text,
  },
  meta: {
    fontSize: scaleFont(13),
    color: COLORS.muted,
    marginTop: scaleFont(4),
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scaleFont(8),
    marginTop: scaleFont(12),
  },
  tag: {
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(6),
    borderRadius: scaleFont(16),
    backgroundColor: "#FDE7E7",
  },
  tagText: {
    fontSize: scaleFont(12),
    color: COLORS.red,
  },
  tagValue: {
    fontWeight: "700",
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
  interestBtn: {
    flex: 1,
    height: scaleFont(54),
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
  interestText: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: COLORS.white,
  },
});
