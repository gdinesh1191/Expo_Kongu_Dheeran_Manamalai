import { Profile } from "@/constants/SampleProfile";
import { ImageSourcePropType } from "react-native";

export const ALL_PORUTHAMS = [
  "Thinam",
  "Kanam",
  "Mahendiram",
  "Sthritheerkam",
  "Yoni",
  "Rasi",
  "Rasi Athipathi",
  "Vasiyam",
  "Rajju",
  "Vethai",
] as const;

export type PoruthamKey = (typeof ALL_PORUTHAMS)[number];

/** Left column, then right column, in the traditional 10-porutham order. */
export const PORUTHAM_COLUMNS: { key: PoruthamKey; label: string }[][] = [
  [
    { key: "Thinam", label: "Thinam" },
    { key: "Kanam", label: "Kanam" },
    { key: "Mahendiram", label: "Mahendiram" },
    { key: "Sthritheerkam", label: "Sthritheerkam" },
    { key: "Yoni", label: "Yoni" },
  ],
  [
    { key: "Rasi", label: "Rasi" },
    { key: "Rasi Athipathi", label: "Rasi Athipathi" },
    { key: "Vasiyam", label: "Vasiyam" },
    { key: "Rajju", label: "Rajju" },
    { key: "Vethai", label: "Vethai" },
  ],
];

export type Detail = { label: string; value: string };

/** Trimmed value, or undefined when empty. */
export function clean(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Builds a label/value list, dropping entries with no value. */
export function details(
  pairs: [string, string | undefined | null][],
): Detail[] {
  return pairs.flatMap(([label, value]) => {
    const v = clean(value);
    return v ? [{ label, value: v }] : [];
  });
}

/** Accepts a bundled image (require) or a remote URL. */
export function imageSource(
  src?: ImageSourcePropType | string,
): ImageSourcePropType | undefined {
  if (!src) return undefined;
  return typeof src === "string" ? { uri: src } : src;
}

export function profilePhotos(profile: Pick<Profile, "photos">) {
  return profile.photos ?? [];
}

/** First photo, used on cards and avatars that show a single image. */
export function primaryPhoto(profile: Pick<Profile, "photos">) {
  return profilePhotos(profile)[0];
}

/** `Poruthams` on a profile lists the poruthams it matches with the logged-in user. */
export function getPoruthamMatch(profile: Profile) {
  const matchedSet = new Set(
    profile.Poruthams.map((p) => p.trim().toLowerCase()),
  );
  const matched = ALL_PORUTHAMS.filter((p) => matchedSet.has(p.toLowerCase()));
  const unmatched = ALL_PORUTHAMS.filter(
    (p) => !matchedSet.has(p.toLowerCase()),
  );
  return { matched, unmatched, total: ALL_PORUTHAMS.length };
}

export function educationText(profile: Profile) {
  return [clean(profile.EducationCourse), clean(profile.EducationSpecification)]
    .filter(Boolean)
    .join(" - ");
}

export function dasaBalanceText(profile: Profile) {
  const parts = details([
    ["Years", profile.Year],
    ["Months", profile.Month],
    ["Days", profile.Day],
  ]);
  return parts.length
    ? parts.map((p) => `${p.value} ${p.label}`).join(", ")
    : undefined;
}
