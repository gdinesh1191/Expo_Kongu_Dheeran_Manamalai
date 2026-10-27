import { scaleFont } from "@/constants/ScaleFont";
import { COLORS } from "@/pages/Home/style";
import { Dimensions, StyleSheet } from "react-native";

export { COLORS };

const HERO_HEIGHT = Dimensions.get("window").height * 0.42;
export const SHEET_OVERLAP = scaleFont(26);

const CANVAS = "#F4F6F4";
const CARD_SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.04,
  shadowRadius: 6,
  elevation: 1,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CANVAS,
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
  heroPhotoArea: {
    ...StyleSheet.absoluteFillObject,
  },
  thumbs: {
    position: "absolute",
    left: scaleFont(12),
    right: scaleFont(12),
    bottom: SHEET_OVERLAP + scaleFont(12),
  },
  thumbsContent: {
    alignItems: "center",
    gap: scaleFont(8),
    padding: scaleFont(6),
    borderRadius: scaleFont(14),
    backgroundColor: "rgba(0,0,0,0.38)",
  },
  thumb: {
    width: scaleFont(50),
    height: scaleFont(62),
    borderRadius: scaleFont(10),
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(255,255,255,0.35)",
    opacity: 0.6,
  },
  thumbActive: {
    width: scaleFont(56),
    height: scaleFont(70),
    borderWidth: 3,
    borderColor: COLORS.white,
    opacity: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  thumbImage: {
    width: "100%",
    height: "100%",
  },

  // Sheet
  sheet: {
    marginTop: -SHEET_OVERLAP,
    zIndex: 2,
    backgroundColor: CANVAS,
    borderTopLeftRadius: scaleFont(24),
    borderTopRightRadius: scaleFont(24),
    overflow: "hidden",
    paddingHorizontal: scaleFont(16),
    paddingBottom: scaleFont(28),
  },

  nameBlock: {
    paddingTop: scaleFont(18),
    paddingHorizontal: scaleFont(2),
  },
  name: {
    fontSize: scaleFont(20),
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  registerNo: {
    fontSize: scaleFont(13),
    color: COLORS.text,
    marginTop: scaleFont(4),
  },
  registerNoValue: {
    fontWeight: "400",
    color: COLORS.text,
  },

  // Sections
  section: {
    marginTop: scaleFont(20),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(8),
    marginBottom: scaleFont(10),
    paddingHorizontal: scaleFont(2),
  },
  sectionIcon: {
    width: scaleFont(26),
    height: scaleFont(26),
    borderRadius: scaleFont(7),
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: scaleFont(13),
    fontWeight: "800",
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scaleFont(14),
    borderWidth: 1,
    borderColor: COLORS.border,
    ...CARD_SHADOW,
  },
  assetsText: {
    fontSize: scaleFont(13),
    color: COLORS.text,
    lineHeight: scaleFont(20),
    paddingHorizontal: scaleFont(14),
    paddingVertical: scaleFont(12),
  },
  cardSubHeader: {
    paddingHorizontal: scaleFont(14),
    paddingTop: scaleFont(12),
    paddingBottom: scaleFont(10),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: CANVAS,
  },
  cardSubTitle: {
    fontSize: scaleFont(11),
    fontWeight: "800",
    color: COLORS.primaryDark,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  rows: {
    paddingHorizontal: scaleFont(14),
    paddingVertical: scaleFont(6),
  },
  rowsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    paddingVertical: scaleFont(8),
    gap: scaleFont(2),
  },
  rowHalf: {
    width: "50%",
    paddingRight: scaleFont(10),
  },
  rowFull: {
    width: "100%",
  },
  rowLabel: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: scaleFont(19),
  },
  rowValue: {
    fontSize: scaleFont(13),
    fontWeight: "400",
    color: COLORS.muted,
    lineHeight: scaleFont(19),
  },

  horoscopeBtn: {
    height: scaleFont(50),
    marginTop: scaleFont(20),
    borderRadius: scaleFont(12),
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(8),
    paddingHorizontal: scaleFont(16),
  },
  horoscopeBtnText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: COLORS.primary,
  },
  horoscopeBtnChevron: {
    position: "absolute",
    right: scaleFont(16),
  },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(12),
    paddingHorizontal: scaleFont(16),
    paddingTop: scaleFont(12),
    paddingBottom: scaleFont(16),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  wishlistBtn: {
    flex: 1,
    height: scaleFont(50),
    borderRadius: scaleFont(12),
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(6),
    paddingHorizontal: scaleFont(8),
  },
  wishlistBtnActive: {
    backgroundColor: COLORS.primary,
  },
  wishlistText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: COLORS.primary,
  },
  wishlistTextActive: {
    color: COLORS.white,
  },
  interestBtn: {
    flex: 1,
    height: scaleFont(50),
    borderRadius: scaleFont(12),
    borderWidth: 1.5,
    borderColor: COLORS.red,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(6),
    paddingHorizontal: scaleFont(8),
  },
  interestText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: COLORS.red,
  },
});
