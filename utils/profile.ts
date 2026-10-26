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

/** Age in years from a "DD-MM-YYYY" date of birth. */
export function getAge(dob?: string) {
  const parts = clean(dob)?.split(/[-/.]/).map(Number);
  if (!parts || parts.length !== 3 || parts.some(Number.isNaN))
    return undefined;
  const [day, month, year] = parts;
  const today = new Date();
  let age = today.getFullYear() - year;
  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age -= 1;
  }
  return age;
}

export function nameWithAge(profile: Profile) {
  const age = getAge(profile.dob);
  return age ? `${profile.name}, ${age}` : profile.name;
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
