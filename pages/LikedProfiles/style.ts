import { scaleFont } from "@/constants/ScaleFont";
import { COLORS } from "@/pages/Home/style";
import { StyleSheet } from "react-native";

export { COLORS };

const SCREEN_BG = "#F5FAF5";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  header: {
    paddingHorizontal: scaleFont(20),
    paddingTop: scaleFont(16),
    paddingBottom: scaleFont(8),
  },
  title: {
    fontSize: scaleFont(22),
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: scaleFont(13),
    color: COLORS.muted,
    marginTop: scaleFont(2),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: scaleFont(12),
  },
  headerText: {
    flexShrink: 1,
  },
  headerActions: {
    flexDirection: "row",
    gap: scaleFont(8),
  },
  headerBtn: {
    paddingHorizontal: scaleFont(14),
    paddingVertical: scaleFont(7),
    borderRadius: scaleFont(16),
    backgroundColor: COLORS.primaryLight,
  },
  headerBtnText: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.primary,
  },

  // Grid
  listContent: {
    paddingHorizontal: scaleFont(16),
    paddingTop: scaleFont(8),
    paddingBottom: scaleFont(16),
  },
  row: {
    gap: scaleFont(12),
    marginBottom: scaleFont(12),
  },
  card: {
    flex: 1,
    maxWidth: "50%",
    aspectRatio: 0.75,
    borderRadius: scaleFont(20),
    overflow: "hidden",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "55%",
    experimental_backgroundImage:
      "linear-gradient(to bottom, rgba(0,46,0,0) 0%, rgba(0,46,0,0.5) 50%, rgba(0,46,0,0.9) 100%)",
  },
  cardTop: {
    position: "absolute",
    top: scaleFont(10),
    left: scaleFont(10),
    right: scaleFont(10),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: scaleFont(8),
  },
  heartBtn: {
    width: scaleFont(32),
    height: scaleFont(32),
    borderRadius: scaleFont(16),
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  // Drawn as an overlay: toggling a border on the clipping card itself
  // can leave the photo hidden after deselecting.
  selectedOutline: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: scaleFont(20),
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  checkCircle: {
    width: scaleFont(28),
    height: scaleFont(28),
    borderRadius: scaleFont(14),
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleActive: {
    backgroundColor: COLORS.primary,
  },
  cardInfo: {
    position: "absolute",
    left: scaleFont(12),
    right: scaleFont(12),
    bottom: scaleFont(12),
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(4),
  },
  name: {
    flexShrink: 1,
    fontSize: scaleFont(16),
    fontWeight: "800",
    color: COLORS.white,
  },
  meta: {
    fontSize: scaleFont(11),
    color: "rgba(255,255,255,0.9)",
    marginTop: scaleFont(2),
  },

  // Empty state
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleFont(32),
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
  discoverBtn: {
    marginTop: scaleFont(18),
    paddingHorizontal: scaleFont(28),
    paddingVertical: scaleFont(12),
    borderRadius: scaleFont(16),
    backgroundColor: COLORS.red,
  },
  discoverText: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.white,
  },

  // Selection actions
  actionBar: {
    flexDirection: "row",
    gap: scaleFont(8),
    paddingHorizontal: scaleFont(16),
    paddingVertical: scaleFont(12),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  actionBtn: {
    flex: 1,
    height: scaleFont(50),
    borderRadius: scaleFont(12),
    borderWidth: 1.5,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleFont(6),
  },
  actionText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
  },
  cartAction: {
    borderColor: COLORS.primaryDark,
  },
  cartActionText: {
    color: COLORS.primaryDark,
  },
  downloadAction: {
    borderColor: COLORS.red,
  },
  downloadActionText: {
    color: COLORS.red,
  },
});
