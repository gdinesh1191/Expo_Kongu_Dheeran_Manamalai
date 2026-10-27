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

// Same theme as the Attendance page.
export const THEME = {
  bgFallback: "#ffffff",
  glassBorder: COLORS.border,
  text: COLORS.text,
  muted: COLORS.muted,
  accent: COLORS.primary,
  accentSoft: COLORS.primaryLight,
};

// Fixed tab size so tab positions never move when the text size changes.
export const TAB_WIDTH = scaleFont(112);
export const TAB_GAP = scaleFont(6);

export type ToneKey = "overdue" | "week" | "ten";

// Same card colors the Attendance page uses (Absent / Late / Present / Week Off).
export const TONE_STYLE: Record<
  ToneKey,
  { card: string; border: string; pill: string; pillText: string }
> = {
  overdue: {
    card: "#FFFFFF",
    border: "#E5E7EB",
    pill: "#D64545",
    pillText: "#FFFFFF",
  },
  week: {
    card: "#FFFFFF",
    border: "#E5E7EB",
    pill: "#E0A92E",
    pillText: "#ffffff",
  },
  ten: {
    card: "#FFFFFF",
    border: "#E5E7EB",
    pill: "#E0A92E",
    pillText: "#ffffff",
  },
};

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: THEME.bgFallback,
  },

  // Tabs (same shell as Attendance, with a count on each tab)
  tabs: {
    marginHorizontal: scaleFont(14),
    marginTop: scaleFont(8),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
    overflow: "hidden",
  },
  tabsContent: {
    padding: scaleFont(4),
    gap: TAB_GAP,
  },
  // Fixed box: a font size change only scales the text inside, never the tab.
  tab: {
    width: TAB_WIDTH,
    height: scaleFont(38),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scaleFont(9),
  },
  tabActive: {
    backgroundColor: THEME.accent,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(6),
  },
  tabBadge: {
    width: scaleFont(24),
    height: scaleFont(20),
    borderRadius: scaleFont(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
  },
  tabBadgeActive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  tabCount: {
    fontSize: scaleFont(11),
    fontWeight: "800",
    color: THEME.text,
  },
  tabCountActive: {
    color: THEME.accent,
  },
  tabText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: THEME.text,
  },
  tabTextActive: {
    color: COLORS.white,
  },

  // Heading row: title + search
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(10),
    paddingHorizontal: scaleFont(14),
    paddingTop: scaleFont(14),
    paddingBottom: scaleFont(10),
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(8),
    paddingHorizontal: scaleFont(14),
    height: scaleFont(42),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFont(13),
    color: THEME.text,
    paddingVertical: 0,
  },
  totalChip: {
    paddingHorizontal: scaleFont(10),
    height: scaleFont(42),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scaleFont(12),
    backgroundColor: THEME.accentSoft,
  },
  totalChipText: {
    fontSize: scaleFont(12),
    fontWeight: "700",
    color: THEME.accent,
  },

  // List
  listContent: {
    paddingHorizontal: scaleFont(14),
    paddingBottom: scaleFont(12),
    gap: scaleFont(12),
  },
  empty: {
    textAlign: "center",
    color: THEME.muted,
    marginTop: scaleFont(40),
    fontSize: scaleFont(13),
  },
  card: {
    borderRadius: scaleFont(14),
    borderWidth: 1,
    padding: scaleFont(12),
    overflow: "hidden",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(10),
  },
  avatar: {
    width: scaleFont(42),
    height: scaleFont(42),
    borderRadius: scaleFont(21),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.accentSoft,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
  },
  avatarText: {
    fontSize: scaleFont(14),
    fontWeight: "800",
    color: THEME.accent,
  },
  cardTitleWrap: {
    flex: 1,
  },
  name: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: THEME.text,
  },
  placeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(4),
    marginTop: scaleFont(2),
  },
  place: {
    flexShrink: 1,
    fontSize: scaleFont(12),
    color: THEME.muted,
  },
  pill: {
    paddingHorizontal: scaleFont(10),
    paddingVertical: scaleFont(3),
    borderRadius: scaleFont(10),
  },
  pillText: {
    fontSize: scaleFont(12),
    fontWeight: "700",
  },

  // Info box (due date | phone | call)
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleFont(10),
    paddingVertical: scaleFont(10),
    borderRadius: scaleFont(10),
    backgroundColor: "#F3F4F6",
  },
  infoCell: {
    flex: 1,
    alignItems: "center",
  },
  infoCellWide: {
    flex: 1.5,
  },
  infoDivider: {
    borderLeftWidth: 1,
    borderLeftColor: THEME.glassBorder,
  },
  infoLabel: {
    fontSize: scaleFont(10),
    fontWeight: "700",
    color: THEME.muted,
    letterSpacing: 0.6,
  },
  infoValue: {
    fontSize: scaleFont(13),
    fontWeight: "600",
    color: THEME.text,
    marginTop: scaleFont(3),
  },
  callBtn: {
    width: scaleFont(36),
    height: scaleFont(36),
    borderRadius: scaleFont(18),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
