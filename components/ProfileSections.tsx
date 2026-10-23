import { MY_PROFILE, Profile } from "@/constants/SampleProfile";
import { scaleFont } from "@/constants/ScaleFont";
import { COLORS } from "@/pages/Home/style";
import { Detail, clean, getPoruthamMatch, imageSource, nameWithAge } from "@/utils/profile";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import FillImage, { useImageRatio } from "./FillImage";

type FeatherIcon = React.ComponentProps<typeof Feather>["name"];

const DEFAULT_CHART_RATIO = 2.75;

export function SectionTitle({ title, icon }: { title: string; icon?: FeatherIcon }) {
  return (
    <View style={styles.sectionHeader}>
      {icon && (
        <View style={styles.sectionIcon}>
          <Feather name={icon} size={15} color={COLORS.primary} />
        </View>
      )}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export function SubTitle({ title }: { title: string }) {
  return <Text style={styles.subTitle}>{title}</Text>;
}

export function DetailsGrid({ items }: { items: Detail[] }) {
  if (!items.length) return null;
  return (
    <View style={styles.detailsGrid}>
      {items.map((item) => (
        <View key={item.label} style={styles.detailTile}>
          <Text style={styles.detailLabel}>{item.label}</Text>
          <Text style={styles.detailValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

type ChipVariant = "neutral" | "success" | "danger";

export function ChipList({
  items,
  variant = "neutral",
  icon,
}: {
  items: readonly string[];
  variant?: ChipVariant;
  icon?: FeatherIcon;
}) {
  if (!items.length) return null;
  const color =
    variant === "success" ? COLORS.primary : variant === "danger" ? COLORS.red : COLORS.text;
  return (
    <View style={styles.chips}>
      {items.map((item) => (
        <View key={item} style={[styles.chip, chipVariantStyles[variant]]}>
          {icon && <Feather name={icon} size={13} color={color} />}
          <Text style={[styles.chipText, { color }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

/** Horoscope chart image; tapping opens it full screen. */
export function HoroscopeChart({ source }: { source?: ImageSourcePropType | string }) {
  const [open, setOpen] = useState(false);
  const ratio = useImageRatio(source) ?? DEFAULT_CHART_RATIO;
  const window = useWindowDimensions();
  if (!imageSource(source)) return null;

  const viewerW = Math.min(window.width * 0.96, window.height * 0.85 * ratio);
  const viewerH = viewerW / ratio;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setOpen(true)}
        style={[styles.chartWrap, { aspectRatio: ratio }]}
      >
        <FillImage source={source} mode="contain" align="center" />
        <View style={styles.chartHint}>
          <Feather name="maximize-2" size={12} color={COLORS.white} />
          <Text style={styles.chartHintText}>Tap to enlarge</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.viewerBackdrop} onPress={() => setOpen(false)}>
          <View
            style={[styles.viewerChart, { width: viewerW, height: viewerH }]}
          >
            <FillImage source={source} mode="contain" align="center" />
          </View>
          <View style={styles.viewerClose}>
            <Feather name="x" size={22} color={COLORS.white} />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

function PersonColumn({ profile, label }: { profile: Profile; label: string }) {
  const astro = [
    ["Rasi", clean(profile.Rashi)],
    ["Star", clean(profile.Star)],
  ].filter((r): r is [string, string] => !!r[1]);

  return (
    <View style={styles.person}>
      <View style={styles.personPhoto}>
        <Feather name="user" size={28} color="rgba(255,255,255,0.8)" />
        <FillImage source={profile.photo} />
      </View>
      <Text style={styles.personLabel}>{label}</Text>
      <Text style={styles.personName} numberOfLines={2}>
        {nameWithAge(profile)}
      </Text>
      {astro.map(([k, v]) => (
        <Text key={k} style={styles.personAstro} numberOfLines={1}>
          {k}: <Text style={styles.personAstroValue}>{v}</Text>
        </Text>
      ))}
    </View>
  );
}

/** Compares the logged-in user with a profile using the 10 poruthams. */
export function PoruthamMatch({ profile, me = MY_PROFILE }: { profile: Profile; me?: Profile }) {
  const { matched, unmatched, total } = getPoruthamMatch(profile);
  const grade = clean(profile.Porutham);

  return (
    <View>
      <View style={styles.matchCard}>
        <PersonColumn profile={me} label="You" />
        <View style={styles.matchCenter}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreValue}>{matched.length}</Text>
            <Text style={styles.scoreTotal}>of {total}</Text>
          </View>
          <Text style={styles.scoreLabel}>Poruthams</Text>
          {grade && (
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeText}>{grade}</Text>
            </View>
          )}
        </View>
        <PersonColumn profile={profile} label="Profile" />
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(matched.length / total) * 100}%` }]} />
      </View>

      <SubTitle title={`Matched (${matched.length})`} />
      {matched.length ? (
        <ChipList items={matched} variant="success" icon="check" />
      ) : (
        <Text style={styles.emptyText}>No poruthams matched.</Text>
      )}

      <SubTitle title={`Not matched (${unmatched.length})`} />
      {unmatched.length ? (
        <ChipList items={unmatched} variant="danger" icon="x" />
      ) : (
        <Text style={styles.emptyText}>All poruthams matched.</Text>
      )}
    </View>
  );
}

const chipVariantStyles = StyleSheet.create({
  neutral: { backgroundColor: COLORS.primaryLight },
  success: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  danger: { backgroundColor: "#FDE7E7", borderColor: COLORS.red },
});

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(8),
    marginTop: scaleFont(24),
    marginBottom: scaleFont(12),
  },
  sectionIcon: {
    width: scaleFont(28),
    height: scaleFont(28),
    borderRadius: scaleFont(8),
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: COLORS.text,
  },
  subTitle: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.text,
    marginTop: scaleFont(14),
    marginBottom: scaleFont(8),
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: scaleFont(10),
  },
  detailTile: {
    width: "48.5%",
    backgroundColor: COLORS.primaryLight,
    borderRadius: scaleFont(14),
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(10),
  },
  detailLabel: {
    fontSize: scaleFont(11),
    color: "#5A6B5A",
  },
  detailValue: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.text,
    marginTop: scaleFont(2),
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scaleFont(8),
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(4),
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(6),
    borderRadius: scaleFont(16),
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipText: {
    fontSize: scaleFont(12),
    fontWeight: "600",
  },
  chartWrap: {
    width: "100%",
    borderRadius: scaleFont(14),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#FFFBF0",
    overflow: "hidden",
    marginTop: scaleFont(12),
  },
  chartHint: {
    position: "absolute",
    right: scaleFont(8),
    bottom: scaleFont(8),
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(4),
    paddingHorizontal: scaleFont(8),
    paddingVertical: scaleFont(4),
    borderRadius: scaleFont(10),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  chartHintText: {
    fontSize: scaleFont(10),
    color: COLORS.white,
  },
  viewerBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    alignItems: "center",
    justifyContent: "center",
    padding: scaleFont(12),
  },
  viewerChart: {
    backgroundColor: "#FFFBF0",
    borderRadius: scaleFont(8),
    overflow: "hidden",
  },
  viewerClose: {
    position: "absolute",
    top: scaleFont(40),
    right: scaleFont(20),
    width: scaleFont(40),
    height: scaleFont(40),
    borderRadius: scaleFont(20),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  matchCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: scaleFont(14),
    borderRadius: scaleFont(18),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  person: {
    flex: 1,
    alignItems: "center",
  },
  personPhoto: {
    width: scaleFont(64),
    height: scaleFont(64),
    borderRadius: scaleFont(32),
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  personLabel: {
    fontSize: scaleFont(10),
    fontWeight: "700",
    color: COLORS.muted,
    textTransform: "uppercase",
    marginTop: scaleFont(6),
  },
  personName: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginTop: scaleFont(2),
  },
  personAstro: {
    fontSize: scaleFont(11),
    color: COLORS.muted,
    marginTop: scaleFont(2),
  },
  personAstroValue: {
    fontWeight: "700",
    color: COLORS.text,
  },
  matchCenter: {
    alignItems: "center",
    paddingHorizontal: scaleFont(6),
    paddingTop: scaleFont(4),
  },
  scoreCircle: {
    width: scaleFont(62),
    height: scaleFont(62),
    borderRadius: scaleFont(31),
    borderWidth: 4,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreValue: {
    fontSize: scaleFont(20),
    fontWeight: "800",
    color: COLORS.primary,
    lineHeight: scaleFont(22),
  },
  scoreTotal: {
    fontSize: scaleFont(10),
    color: COLORS.muted,
  },
  scoreLabel: {
    fontSize: scaleFont(11),
    fontWeight: "600",
    color: COLORS.text,
    marginTop: scaleFont(6),
  },
  gradeBadge: {
    marginTop: scaleFont(6),
    paddingHorizontal: scaleFont(10),
    paddingVertical: scaleFont(3),
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.red,
  },
  gradeText: {
    fontSize: scaleFont(11),
    fontWeight: "700",
    color: COLORS.white,
  },
  progressTrack: {
    height: scaleFont(8),
    borderRadius: scaleFont(4),
    backgroundColor: "#FDE7E7",
    marginTop: scaleFont(14),
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: scaleFont(4),
    backgroundColor: COLORS.primary,
  },
  emptyText: {
    fontSize: scaleFont(12),
    color: COLORS.muted,
  },
});
