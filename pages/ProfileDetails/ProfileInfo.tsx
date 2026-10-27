import { Profile } from "@/constants/SampleProfile";
import { Detail, clean, details } from "@/utils/profile";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, styles } from "./style";

type FeatherIcon = React.ComponentProps<typeof Feather>["name"];

export function Section({
  title,
  icon,
  children,
  plain,
}: {
  title: string;
  icon: FeatherIcon;
  children: React.ReactNode;
  plain?: boolean;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIcon}>
          <Feather name={icon} size={14} color={COLORS.primary} />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {plain ? children : <View style={styles.card}>{children}</View>}
    </View>
  );
}

/** Thisa Iruppu with its balance, e.g. "Jupiter 05 years, 04 months, 04 days". */
function dasaText(profile: Profile) {
  const balance = details([
    ["years", profile.Year],
    ["months", profile.Month],
    ["days", profile.Day],
  ])
    .map((p) => `${p.value} ${p.label}`)
    .join(", ");
  return [clean(profile.ThisaIruppu), balance].filter(Boolean).join(" ");
}

/** Stacked label/value rows; `grid` lays them out two per line. */
function InfoRows({
  items,
  grid,
  fullWidth = [],
}: {
  items: Detail[];
  grid?: boolean;
  fullWidth?: string[];
}) {
  if (!items.length) return null;
  return (
    <View style={[styles.rows, grid && styles.rowsGrid]}>
      {items.map((item) => (
        <View
          key={item.label}
          style={[
            styles.row,
            grid && !fullWidth.includes(item.label) && styles.rowHalf,
            grid && fullWidth.includes(item.label) && styles.rowFull,
          ]}
        >
          <Text style={styles.rowLabel}>{item.label}</Text>
          <Text style={styles.rowValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

function CardSubTitle({ title }: { title: string }) {
  return (
    <View style={styles.cardSubHeader}>
      <Text style={styles.cardSubTitle}>{title}</Text>
    </View>
  );
}

export function HoroscopeButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      style={styles.horoscopeBtn}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Feather name="book-open" size={18} color={COLORS.primary} />
      <Text style={styles.horoscopeBtnText}>View Full Horoscope</Text>
      <Feather
        name="chevron-right"
        size={18}
        color={COLORS.primary}
        style={styles.horoscopeBtnChevron}
      />
    </TouchableOpacity>
  );
}

/** Name, basic, education, family and horoscope sections of a profile. */
export default function ProfileInfo({ profile }: { profile: Profile }) {
  const personal = details([
    ["Horoscope", profile.Horoscope],
    ["Koottam", profile.Koottam],
    ["Kula Theivam", profile.KulaTheivam],
    ["Height", profile.Height],
    ["Complexion", profile.Complex],
    ["D.O.B", profile.dob],
    ["Birth place", profile.BirthPlace],
    ["Marital status", profile.MaritalStatus],
    ["Residential Area", profile.location],
  ]);

  const education: Detail[] = (
    [
      ["Education Course", profile.EducationCourse],
      ["Education Specification", profile.EducationSpecification],
      ["Working Category", profile.WorkingCategory],
      ["Designation", profile.Designation],
      ["Company Name", profile.CompanyName],
      ["Monthly Salary/Income", profile.MonthlyIncome],
      ["Working Place", profile.WorkingPlace],
      ["Working Country", profile.WorkingCountry],
    ] as const
  ).map(([label, value]) => ({ label, value: clean(value) ?? "-" }));

  const family = details([
    ["Father", profile.FatherName],
    ["Father's occupation", profile.FatherOccupation],
    ["Mother", profile.MotherName],
    ["Mother's occupation", profile.MotherOccupation],
    ["Siblings", profile.SiblingsCount],
  ]);
  const assets = (profile.Property ?? []).map((p) => p.trim()).filter(Boolean);
  const expectations = details([
    ["Partner expectation", profile.expectations],
    ["Abroad", profile.AboardExpectation],
    ["Note", profile.Note],
  ]);

  const horoscope = details([
    ["Type of horoscope", profile.Horoscope],
    ["Star", profile.Star],
    ["Rasi", profile.Rashi],
    ["Laknam", profile.Laknam],
    ["Thisa Iruppu", dasaText(profile)],
  ]);

  const hasFamilySection =
    family.length > 0 || assets.length > 0 || expectations.length > 0;

  return (
    <>
      <View style={styles.nameBlock}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.registerNo}>
          Register No:{" "}
          <Text style={styles.registerNoValue}>{profile.id}</Text>
        </Text>
      </View>

      {personal.length > 0 && (
        <Section title="Basic details" icon="user">
          <InfoRows items={personal} grid fullWidth={["Kula Theivam"]} />
        </Section>
      )}

      <Section title="Education and occupation" icon="briefcase">
        <InfoRows items={education} />
      </Section>

      {hasFamilySection && (
        <Section title="Family and assets" icon="home">
          <InfoRows items={family} />
          {assets.length > 0 && (
            <>
              <CardSubTitle title="Assets" />
              <Text style={styles.assetsText}>{assets.join(", ")}</Text>
            </>
          )}
          {expectations.length > 0 && (
            <>
              <CardSubTitle title="Expectations" />
              <InfoRows items={expectations} />
            </>
          )}
        </Section>
      )}

      {horoscope.length > 0 && (
        <Section title="Horoscope" icon="sun">
          <InfoRows items={horoscope} />
        </Section>
      )}
    </>
  );
}
