import { scaleFont } from "@/constants/ScaleFont";
import { COLORS } from "@/pages/Home/style";
import { StyleSheet } from "react-native";

export { COLORS };

// Light theme, built on the same COLORS the rest of the app uses.
export const THEME = {
  bgFallback: "#ffffff",
  glass: COLORS.white,
  glassStrong: "#EAF4EC",
  glassBorder: COLORS.border,
  text: COLORS.text,
  muted: COLORS.muted,
  accent: COLORS.primary,
  accentSoft: COLORS.primaryLight,
  amberText: "#8A5A00",
  amberBg: "#FFF6DB",
  amberBorder: "#F1D88A",
};

export const STATUS_STYLE = {
  Absent: {
    card: "#FDECEC",
    border: "#F5C2C2",
    pill: "#D64545",
    pillText: "#FFFFFF",
  },
  Present: {
    card: "#E8F6EC",
    border: "#BFE3CB",
    pill: "#1F9D55",
    pillText: "#FFFFFF",
  },
  Late: {
    card: "#FFF6DB",
    border: "#F1D88A",
    pill: "#E0A92E",
    pillText: "#3B2A00",
  },
  "Week Off": {
    card: "#F1F3F2",
    border: "#DCE1DE",
    pill: "#DDE3E0",
    pillText: "#3C4A42",
  },
} as const;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: THEME.bgFallback,
  },
  safe: {
    flex: 1,
  },

  // Header (same layout as the Home header)
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleFont(16),
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
    color: THEME.muted,
  },
  userName: {
    fontSize: scaleFont(18),
    fontWeight: "800",
    color: THEME.text,
  },
  roundBtn: {
    width: scaleFont(40),
    height: scaleFont(40),
    borderRadius: scaleFont(20),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
    alignItems: "center",
    justifyContent: "center",
  },

  // Tabs
  tabs: {
    flexDirection: "row",
    marginHorizontal: scaleFont(14),
    marginTop: scaleFont(8),
    padding: scaleFont(4),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scaleFont(11),
    borderRadius: scaleFont(9),
  },
  tabActive: {
    backgroundColor: THEME.accent,
  },
  tabText: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: THEME.muted,
  },
  tabTextActive: {
    color: COLORS.white,
  },

  // Notice
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: scaleFont(8),
    marginHorizontal: scaleFont(14),
    marginTop: scaleFont(10),
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(10),
    borderRadius: scaleFont(10),
    backgroundColor: THEME.amberBg,
    borderWidth: 1,
    borderColor: THEME.amberBorder,
  },

  // Employee + month row
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleFont(18),
    paddingTop: scaleFont(14),
    paddingBottom: scaleFont(10),
    zIndex: 10,
  },
  employeeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(8),
  },
  employeeName: {
    fontSize: scaleFont(18),
    fontWeight: "800",
    color: THEME.text,
    letterSpacing: 0.3,
  },
  employeeCode: {
    paddingHorizontal: scaleFont(8),
    paddingVertical: scaleFont(2),
    borderRadius: scaleFont(6),
    backgroundColor: THEME.accentSoft,
  },
  employeeCodeText: {
    fontSize: scaleFont(12),
    fontWeight: "700",
    color: THEME.accent,
  },

  // Month picker
  monthBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(8),
    paddingHorizontal: scaleFont(14),
    paddingVertical: scaleFont(10),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
  },
  monthText: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: THEME.text,
  },
  monthMenu: {
    position: "absolute",
    right: scaleFont(18),
    top: scaleFont(58),
    minWidth: scaleFont(150),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  monthMenuItem: {
    paddingHorizontal: scaleFont(14),
    paddingVertical: scaleFont(11),
  },
  monthMenuItemActive: {
    backgroundColor: THEME.accentSoft,
  },
  monthMenuText: {
    fontSize: scaleFont(13),
    color: THEME.text,
  },

  // List
  listContent: {
    paddingHorizontal: scaleFont(14),
    paddingBottom: scaleFont(24),
    gap: scaleFont(12),
  },
  empty: {
    textAlign: "center",
    color: THEME.muted,
    marginTop: scaleFont(40),
    fontSize: scaleFont(13),
  },

  // Day card
  card: {
    borderRadius: scaleFont(14),
    borderWidth: 1,
    padding: scaleFont(12),
    overflow: "hidden",
  },
  cardDecor: {
    position: "absolute",
    right: -scaleFont(30),
    bottom: -scaleFont(36),
    width: scaleFont(110),
    height: scaleFont(110),
    borderRadius: scaleFont(55),
    backgroundColor: "rgba(0,0,0,0.035)",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(10),
  },
  dateChip: {
    width: scaleFont(38),
    alignItems: "center",
    paddingVertical: scaleFont(4),
    borderRadius: scaleFont(8),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
  },
  dateDay: {
    fontSize: scaleFont(12),
    fontWeight: "800",
    color: "#06210F",
  },
  dateMonth: {
    fontSize: scaleFont(9),
    fontWeight: "700",
    color: "#5A5A5A",
  },
  cardTitleWrap: {
    flex: 1,
  },
  weekday: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: THEME.text,
  },
  remark: {
    fontSize: scaleFont(12),
    color: THEME.muted,
    marginTop: scaleFont(1),
  },
  pill: {
    paddingHorizontal: scaleFont(10),
    paddingVertical: scaleFont(3),
    borderRadius: scaleFont(10),
  },
  pillText: {
    fontSize: scaleFont(10),
    fontWeight: "700",
  },

  // Metric boxes
  triRow: {
    flexDirection: "row",
    marginTop: scaleFont(10),
    paddingVertical: scaleFont(10),
    borderRadius: scaleFont(10),
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  triCell: {
    flex: 1,
    alignItems: "center",
  },
  triDivider: {
    borderLeftWidth: 1,
    borderLeftColor: THEME.glassBorder,
  },
  metricLabel: {
    fontSize: scaleFont(10),
    fontWeight: "700",
    color: THEME.muted,
    letterSpacing: 0.6,
  },
  metricValue: {
    fontSize: scaleFont(13),
    fontWeight: "600",
    color: THEME.text,
    marginTop: scaleFont(3),
  },
  quintRow: {
    flexDirection: "row",
    gap: scaleFont(6),
    marginTop: scaleFont(8),
  },
  quintCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: scaleFont(8),
    borderRadius: scaleFont(8),
    backgroundColor: "rgba(255,255,255,0.8)",
  },

  // Punch tab
  punchBody: {
    flex: 1,
    paddingHorizontal: scaleFont(14),
    paddingTop: scaleFont(12),
    paddingBottom: scaleFont(16),
  },
  mapBox: {
    flex: 1,
    borderRadius: scaleFont(12),
    backgroundColor: "#EAF0EB",
    borderWidth: 1,
    borderColor: THEME.glassBorder,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  timeChip: {
    position: "absolute",
    left: scaleFont(10),
    bottom: scaleFont(10),
    zIndex: 2,
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(7),
    borderRadius: scaleFont(16),
    backgroundColor: THEME.accentSoft,
    borderWidth: 1,
    borderColor: THEME.accent,
  },
  timeChipText: {
    fontSize: scaleFont(12),
    fontWeight: "600",
    color: THEME.text,
  },
  punchBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(8),
    marginTop: scaleFont(12),
    paddingVertical: scaleFont(15),
    borderRadius: scaleFont(12),
    backgroundColor: THEME.accent,
  },
  punchBtnText: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.white,
  },
});
