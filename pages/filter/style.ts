import { scaleFont } from "@/constants/ScaleFont";
import { COLORS as BASE_COLORS } from "@/pages/Home/style";
import { StyleSheet } from "react-native";

export const COLORS = { ...BASE_COLORS, primary: "#0B9A0B" };

const SCREEN_BG = "#ffffff";
const THUMB_SIZE = scaleFont(22);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleFont(16),
    paddingTop: scaleFont(10),
    paddingBottom: scaleFont(8),
    backgroundColor: COLORS.white,
  },
  closeBtn: {
    width: scaleFont(40),
    height: scaleFont(40),
    borderRadius: scaleFont(12),
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  headerCenter: {
    alignItems: "center",
  },
  title: {
    fontSize: scaleFont(20),
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: scaleFont(12),
    color: COLORS.muted,
    marginTop: scaleFont(1),
  },
  resetText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: COLORS.red,
  },

  // Applied chips
  appliedRow: {
    backgroundColor: COLORS.white,
    paddingBottom: scaleFont(10),
  },
  appliedContent: {
    paddingHorizontal: scaleFont(16),
    gap: scaleFont(8),
  },
  appliedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(6),
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(7),
    borderRadius: scaleFont(18),
    backgroundColor: COLORS.primaryLight,
  },
  appliedChipText: {
    fontSize: scaleFont(12),
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  // Body
  scrollContent: {
    padding: scaleFont(16),
  },
  cardList: {
    gap: scaleFont(12),
  },

  // Section card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scaleFont(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: scaleFont(14),
  },
  cardActive: {
    borderColor: COLORS.primary,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(12),
  },
  cardIcon: {
    width: scaleFont(38),
    height: scaleFont(38),
    borderRadius: scaleFont(10),
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitleWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.text,
  },
  cardSubtitle: {
    fontSize: scaleFont(12),
    color: COLORS.muted,
    marginTop: scaleFont(2),
  },
  badge: {
    minWidth: scaleFont(20),
    height: scaleFont(20),
    borderRadius: scaleFont(10),
    paddingHorizontal: scaleFont(5),
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: scaleFont(11),
    fontWeight: "700",
    color: COLORS.white,
  },
  cardBody: {
    marginTop: scaleFont(14),
  },

  // Field rows
  label: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.text,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scaleFont(10),
  },
  fieldGap: {
    marginTop: scaleFont(18),
  },
  selectAll: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.red,
  },

  // Height range
  rangeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(10),
    marginTop: scaleFont(10),
  },
  rangeTo: {
    fontSize: scaleFont(13),
    color: COLORS.muted,
  },
  dropdown: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: scaleFont(46),
    paddingHorizontal: scaleFont(12),
    borderRadius: scaleFont(12),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: COLORS.text,
  },
  dropdownIcon: {
    width: scaleFont(22),
    height: scaleFont(22),
    borderRadius: scaleFont(11),
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  // Age slider
  valuePill: {
    paddingHorizontal: scaleFont(10),
    paddingVertical: scaleFont(4),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.primaryLight,
  },
  valuePillText: {
    fontSize: scaleFont(12),
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  sliderHit: {
    height: THUMB_SIZE + scaleFont(10),
    justifyContent: "center",
    marginHorizontal: THUMB_SIZE / 2,
  },
  sliderTrack: {
    height: scaleFont(5),
    borderRadius: scaleFont(3),
    backgroundColor: COLORS.primaryLight,
  },
  sliderFill: {
    position: "absolute",
    left: 0,
    height: scaleFont(5),
    borderRadius: scaleFont(3),
    backgroundColor: COLORS.primary,
  },
  sliderThumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    marginLeft: -THUMB_SIZE / 2,
    borderWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleFont(4),
  },
  sliderLabel: {
    width: scaleFont(28),
    textAlign: "center",
    fontSize: scaleFont(11),
    color: COLORS.muted,
  },

  // Chips
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scaleFont(8),
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(5),
    paddingHorizontal: scaleFont(14),
    paddingVertical: scaleFont(8),
    borderRadius: scaleFont(20),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  chipText: {
    fontSize: scaleFont(13),
    fontWeight: "600",
    color: COLORS.text,
  },
  chipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  chipTextActive: {
    color: COLORS.primaryDark,
  },
  // Checkbox grid
  groupLabel: {
    fontSize: scaleFont(12),
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: COLORS.muted,
  },
  checkGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(10),
    paddingVertical: scaleFont(8),
    paddingRight: scaleFont(8),
  },
  checkBox: {
    width: scaleFont(18),
    height: scaleFont(18),
    borderRadius: scaleFont(4),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkText: {
    flex: 1,
    fontSize: scaleFont(13),
    fontWeight: "600",
    color: COLORS.text,
  },

  moreText: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.red,
    marginTop: scaleFont(8),
  },

  // Profession
  textInput: {
    height: scaleFont(46),
    marginTop: scaleFont(12),
    paddingHorizontal: scaleFont(12),
    borderRadius: scaleFont(12),
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: scaleFont(14),
    color: COLORS.text,
  },

  // Footer
  footer: {
    flexDirection: "row",
    gap: scaleFont(12),
    paddingHorizontal: scaleFont(16),
    paddingVertical: scaleFont(12),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  footerReset: {
    width: scaleFont(110),
    height: scaleFont(52),
    borderRadius: scaleFont(14),
    borderWidth: 1,
    borderColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
  },
  footerResetText: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.red,
  },
  showBtn: {
    flex: 1,
    height: scaleFont(52),
    borderRadius: scaleFont(14),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  showBtnText: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: COLORS.white,
  },

  // Height picker modal
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modalSheet: {
    maxHeight: "60%",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scaleFont(22),
    borderTopRightRadius: scaleFont(22),
    paddingTop: scaleFont(16),
  },
  modalTitle: {
    fontSize: scaleFont(16),
    fontWeight: "800",
    color: COLORS.text,
    paddingHorizontal: scaleFont(20),
    marginBottom: scaleFont(8),
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleFont(20),
    paddingVertical: scaleFont(13),
  },
  modalItemText: {
    fontSize: scaleFont(15),
    color: COLORS.text,
  },
  modalItemTextActive: {
    fontWeight: "700",
    color: COLORS.primary,
  },
});
