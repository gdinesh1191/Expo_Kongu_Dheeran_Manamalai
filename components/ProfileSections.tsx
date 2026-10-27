import { MY_PROFILE, Profile } from "@/constants/SampleProfile";
import { scaleFont } from "@/constants/ScaleFont";
import { COLORS } from "@/pages/Home/style";
import {
  Detail,
  PORUTHAM_COLUMNS,
  clean,
  getPoruthamMatch,
  imageSource,
  primaryPhoto,
} from "@/utils/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import FillImage, { useImageRatio } from "./FillImage";

type FeatherIcon = React.ComponentProps<typeof Feather>["name"];

const DEFAULT_CHART_RATIO = 2.75;

export function SectionTitle({
  title,
  icon,
}: {
  title: string;
  icon?: FeatherIcon;
}) {
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
    variant === "success"
      ? COLORS.primary
      : variant === "danger"
        ? COLORS.red
        : COLORS.text;
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
export function HoroscopeChart({
  source,
}: {
  source?: ImageSourcePropType | string;
}) {
  const [open, setOpen] = useState(false);
  const ratio = useImageRatio(source) ?? DEFAULT_CHART_RATIO;
  if (!imageSource(source)) return null;

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

      <HoroscopeViewer
        source={source}
        visible={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

/** Full-screen horoscope chart; tapping anywhere closes it. */
export function HoroscopeViewer({
  source,
  visible,
  onClose,
}: {
  source?: ImageSourcePropType | string;
  visible: boolean;
  onClose: () => void;
}) {
  const ratio = useImageRatio(source) ?? DEFAULT_CHART_RATIO;
  const window = useWindowDimensions();
  if (!imageSource(source)) return null;

  const viewerW = Math.min(window.width * 0.96, window.height * 0.85 * ratio);
  const viewerH = viewerW / ratio;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.viewerBackdrop} onPress={onClose}>
        <View style={[styles.viewerChart, { width: viewerW, height: viewerH }]}>
          <FillImage source={source} mode="contain" align="center" />
        </View>
        <View style={styles.viewerClose}>
          <Feather name="x" size={22} color={COLORS.white} />
        </View>
      </Pressable>
    </Modal>
  );
}

const GRADE_COLORS: Record<string, string> = {
  mathimam: "#F2C200",
  uthamam: COLORS.primary,
  athamam: COLORS.red,
};

const STAR_COLOR = "#E5A800";

function PersonCard({ profile }: { profile: Profile }) {
  const astro = [
    { label: "Star", value: clean(profile.Star), icon: "star" as const },
    { label: "Rasi", value: clean(profile.Rashi), icon: "moon" as const },
  ].filter((r) => !!r.value);

  return (
    <View style={styles.personCard}>
      <View style={styles.personPhoto}>
        <Feather name="user" size={32} color="rgba(255,255,255,0.8)" />
        <FillImage source={primaryPhoto(profile)} />
      </View>
      <Text style={styles.personName} numberOfLines={1}>
        {profile.name}
      </Text>
      {astro.map((row) => (
        <View key={row.label} style={styles.personAstroRow}>
          <Ionicons
            name={row.icon}
            size={12}
            color={row.icon === "star" ? STAR_COLOR : COLORS.primary}
          />
          <Text style={styles.personAstro} numberOfLines={1}>
            {row.label} :{" "}
            <Text style={styles.personAstroValue}>{row.value}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}

/** The logged-in user and the profile, side by side. */
export function PoruthamPeople({
  profile,
  me = MY_PROFILE,
}: {
  profile: Profile;
  me?: Profile;
}) {
  return (
    <View style={styles.matchPeople}>
      <PersonCard profile={me} />
      <PersonCard profile={profile} />
    </View>
  );
}

/** Matched count out of 10 with the profile's porutham grade. */
export function PoruthamResult({ profile }: { profile: Profile }) {
  const { matched, total } = getPoruthamMatch(profile);
  const grade = clean(profile.Porutham);
  const gradeColor = GRADE_COLORS[grade?.toLowerCase() ?? ""] ?? COLORS.red;
  const valueStyle = [styles.resultValue, { color: gradeColor }];

  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultLabel}>
        Porutham :{" "}
        <Text style={valueStyle}>
          {matched.length}/{total}
        </Text>
      </Text>
      {grade && (
        <Text style={styles.resultLabel}>
          Result : <Text style={valueStyle}>{grade}</Text>
        </Text>
      )}
    </View>
  );
}

/** Compares the logged-in user with a profile using the 10 poruthams. */
export function PoruthamMatch({
  profile,
  me = MY_PROFILE,
}: {
  profile: Profile;
  me?: Profile;
}) {
  return (
    <View>
      <PoruthamPeople profile={profile} me={me} />
      <PoruthamBoard profile={profile} style={styles.boardGap} />
      <PoruthamResult profile={profile} />
    </View>
  );
}

/** Tick or cross for each of the 10 poruthams. */
export function PoruthamBoard({
  profile,
  style,
}: {
  profile: Profile;
  style?: StyleProp<ViewStyle>;
}) {
  const { matched } = getPoruthamMatch(profile);
  const matchedSet = new Set(matched.map((p) => p.toLowerCase()));

  return (
    <View style={[styles.poruthamBoard, style]}>
      {PORUTHAM_COLUMNS.map((column) => (
        <View key={column[0].key} style={styles.poruthamColumn}>
          {column.map((item) => {
            const ok = matchedSet.has(item.key.toLowerCase());
            return (
              <View
                key={item.key}
                style={[
                  styles.poruthamItem,
                  ok ? styles.poruthamItemOk : styles.poruthamItemNo,
                ]}
              >
                <View
                  style={[
                    styles.poruthamIcon,
                    { backgroundColor: ok ? COLORS.primary : COLORS.red },
                  ]}
                >
                  <Feather
                    name={ok ? "check" : "x"}
                    size={13}
                    color={COLORS.white}
                  />
                </View>
                <Text
                  style={[
                    styles.poruthamLabel,
                    { color: ok ? COLORS.text : COLORS.red },
                  ]}
                  numberOfLines={2}
                >
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const chipVariantStyles = StyleSheet.create({
  neutral: { backgroundColor: COLORS.primaryLight },
  success: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
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
  matchPeople: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: scaleFont(12),
  },
  personCard: {
    flex: 1,
    padding: scaleFont(6),
    paddingBottom: scaleFont(10),
    borderRadius: scaleFont(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  personPhoto: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: scaleFont(12),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  personName: {
    fontSize: scaleFont(15),
    fontWeight: "800",
    color: COLORS.text,
    marginTop: scaleFont(8),
    marginBottom: scaleFont(4),
    paddingHorizontal: scaleFont(4),
  },
  personAstroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(6),
    marginTop: scaleFont(3),
    paddingHorizontal: scaleFont(4),
  },
  personAstro: {
    flex: 1,
    fontSize: scaleFont(12),
    fontWeight: "700",
    color: COLORS.text,
  },
  personAstroValue: {
    fontWeight: "400",
    color: COLORS.muted,
  },
  boardGap: {
    marginTop: scaleFont(16),
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: scaleFont(12),
    marginTop: scaleFont(12),
    paddingHorizontal: scaleFont(16),
    paddingVertical: scaleFont(14),
    borderRadius: scaleFont(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  resultLabel: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: COLORS.text,
  },
  resultValue: {
    fontWeight: "400",
  },
  poruthamBoard: {
    flexDirection: "row",
    gap: scaleFont(10),
    padding: scaleFont(10),
    borderRadius: scaleFont(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  poruthamColumn: {
    flex: 1,
    gap: scaleFont(8),
  },
  poruthamItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFont(8),
    minHeight: scaleFont(44),
    paddingHorizontal: scaleFont(8),
    paddingVertical: scaleFont(6),
    borderRadius: scaleFont(10),
    borderWidth: 1,
  },
  poruthamItemOk: {
    backgroundColor: "#F1F8F1",
    borderColor: "#D6ECD6",
  },
  poruthamItemNo: {
    backgroundColor: "#FDF0F0",
    borderColor: "#F7D2D2",
  },
  poruthamIcon: {
    width: scaleFont(22),
    height: scaleFont(22),
    borderRadius: scaleFont(11),
    alignItems: "center",
    justifyContent: "center",
  },
  poruthamLabel: {
    flex: 1,
    fontSize: scaleFont(13),
    fontWeight: "500",
  },
});
