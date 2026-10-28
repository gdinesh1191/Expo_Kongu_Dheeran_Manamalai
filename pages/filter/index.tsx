import KeyboardAwareScrollView from "@/components/KeyboardAwareScrollView";
import { scaleFont } from "@/constants/ScaleFont";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, styles } from "./style";

const HEIGHTS = Array.from({ length: 25 }, (_, i) => {
  const inches = 54 + i;
  return `${Math.floor(inches / 12)}'${inches % 12}"`;
});
const AGE_GAP_MAX = 10;
const AGE_GAP_MARKS = [
  { value: 0, label: "All" },
  { value: 2, label: "2" },
  { value: 5, label: "5" },
  { value: 8, label: "8" },
  { value: AGE_GAP_MAX, label: "10+" },
];

function ageGapLabel(gap: number) {
  if (gap === 0) return "All";
  if (gap === AGE_GAP_MAX) return `${AGE_GAP_MAX}+ years`;
  return `${gap} ${gap === 1 ? "year" : "years"}`;
}
const COMPLEXIONS = ["Fair", "Brown"];
const EDUCATION = [
  "Doctorate",
  "Doctor",
  "Research Associate",
  "PG",
  "UG",
  "Paramedical Courses",
  "Veterinary Science",
  "Diploma",
  "HSC",
  "ITI",
];
const WORK = [
  "Private Job",
  "Govt Job",
  "Self - Employed",
  "Business",
  "Agriculture",
  "Not Working",
  "None",
];
const EDUCATION_COURSE = [
  "PHD",
  "M.E",
  "B.E",
  "B.Sc",
  "BVSC",
  "MVSC",
  "Diploma",
  "+2",
  "M.B.B.S",
  "B.Tech",
  "M.Tech",
  "B.Com",
  "M.Com",
  "BCA",
  "MCA",
  "BBA",
  "MBA",
  "B.A",
  "M.A",
  "M.Sc",
  "B.D.S",
  "M.D.S",
  "M.D",
  "B.Pharm",
  "B.Ed",
];
const EDUCATION_SPECIALIZATION = [
  "-",
  "Civil",
  "Mech",
  "CSE",
  "ECE",
  "EEE",
  "EIE",
  "Mining",
  "E&I",
  "Metallurgical",
  "IT",
  "Chemical",
  "Textile",
  "Automobile",
  "Aeronautical",
  "Biotechnology",
  "Agriculture",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Computer Science",
  "Commerce",
  "English",
];
const COUNTRIES = [
  "India",
  "London (England)",
  "Malaysia",
  "Singapore",
  "Dubai (UAE)",
  "Japan",
  "Italy",
  "Germany",
  "China",
  "America",
  "Canada",
  "Australia",
  "New Zealand",
  "Qatar",
  "Saudi Arabia",
  "Kuwait",
  "Oman",
  "France",
  "Ireland",
  "Netherlands",
];
const WORK_PLACE = [
  "Salem",
  "Karungalpalayam",
  "Chennai",
  "Coimbatore",
  "Bangalore",
  "Attur",
  "Thalaivasal",
  "Erode",
  "USA",
  "Thiruchengode",
  "Namakkal",
  "Tiruppur",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Madurai",
  "Trichy",
  "Karur",
  "Hosur",
  "Dubai",
];
const RESIDENTIAL_STATE = [
  "Tamilnadu",
  "Puducherry",
  "Telangana",
  "Karnataka",
  "Gujarat",
  "Uttar Pradesh",
  "Andrapradesh",
  "Kerala",
];
const RESIDENTIAL_DISTRICT = [
  "Salem",
  "Namakkal",
  "Karur",
  "Kallakurichi",
  "Krishnagiri",
  "Dharmapuri",
  "Chennai",
  "Cuddalore",
  "Dindigul",
  "Erode",
  "Coimbatore",
  "Tiruppur",
  "Nilgiris",
  "Tiruchirappalli",
  "Madurai",
  "Thanjavur",
  "Vellore",
  "Kanchipuram",
  "Tirunelveli",
  "Theni",
  "Sivaganga",
  "Virudhunagar",
  "Thoothukudi",
  "Villupuram",
  "Pudukkottai",
  "Perambalur",
  "Ariyalur",
  "Ramanathapuram",
  "Kanyakumari",
  "Nagapattinam",
  "Tiruvannamalai",
  "Tiruvallur",
  "Tiruvarur",
  "Chengalpattu",
  "Ranipet",
  "Tirupathur",
  "Tenkasi",
  "Mayiladuthurai",
];
const RESIDENTIAL_TALUK = [
  "Salem",
  "Thalaivasal",
  "Attur",
  "Gangavalli",
  "Pethanaickenpalayam",
  "Valapady",
  "Sankagiri",
  "Edapadi",
  "Mettur",
  "Kadayampatti",
  "Omalur",
  "Yercaud",
  "Namakkal",
  "Rasipuram",
  "Tiruchengode",
  "Paramathi Velur",
  "Kumarapalayam",
  "Erode",
  "Gobichettipalayam",
  "Perundurai",
  "Bhavani",
  "Sathyamangalam",
];
const ABROAD = ["Not yet decided", "Willing", "Not Willing"];
const HOROSCOPE = ["Sutham"];
const AVOID = [
  "Pangali",
  "Mathimam",
  "Athamam",
  "Eka Porutham",
  "No Rajju",
  "Wishlisted",
  "Downloaded",
  "Already Viewed",
];

const VISIBLE_OPTIONS = 10;
const CARD_TOP_GAP = scaleFont(12);

type FilterState = {
  heightFrom: number;
  heightTo: number;
  ageGap: number;
  profession: string;
  complexion: string[];
  education: string[];
  educationCourse: string[];
  educationSpecialization: string[];
  work: string[];
  workCountry: string[];
  workPlace: string[];
  residentialCountry: string[];
  residentialState: string[];
  residentialDistrict: string[];
  residentialTaluk: string[];
  abroad: string[];
  horoscope: string[];
  avoid: string[];
};

type ListKey = Exclude<
  keyof FilterState,
  "heightFrom" | "heightTo" | "ageGap" | "profession"
>;

const EMPTY: FilterState = {
  heightFrom: 0,
  heightTo: HEIGHTS.length - 1,
  ageGap: 0,
  profession: "",
  complexion: [],
  education: [],
  educationCourse: [],
  educationSpecialization: [],
  work: [],
  workCountry: [],
  workPlace: [],
  residentialCountry: [],
  residentialState: [],
  residentialDistrict: [],
  residentialTaluk: [],
  abroad: [],
  horoscope: [],
  avoid: [],
};

const CHIP_ORDER: ListKey[] = [
  "residentialCountry",
  "residentialState",
  "residentialDistrict",
  "residentialTaluk",
  "education",
  "educationCourse",
  "educationSpecialization",
  "complexion",
  "work",
  "workCountry",
  "workPlace",
  "abroad",
  "horoscope",
  "avoid",
];

type Section = {
  key: ListKey;
  title: string;
  icon: React.ReactNode;
  options: string[];
  single?: boolean;
  showBadge?: boolean;
  checkboxLabel?: string;
};

type SubSection = {
  key: ListKey;
  label: string;
  options: string[];
};

type Group = {
  id: string;
  title: string;
  icon: React.ReactNode;
  sections: SubSection[];
};

const EDUCATION_GROUP: Group = {
  id: "education",
  title: "Education",
  icon: <Ionicons name="school-outline" size={18} color={COLORS.primary} />,
  sections: [
    { key: "education", label: "Education degree", options: EDUCATION },
    {
      key: "educationCourse",
      label: "Education course",
      options: EDUCATION_COURSE,
    },
    {
      key: "educationSpecialization",
      label: "Education specialization",
      options: EDUCATION_SPECIALIZATION,
    },
  ],
};

const WORK_GROUP: Group = {
  id: "work",
  title: "Working/Business",
  icon: <Feather name="briefcase" size={18} color={COLORS.primary} />,
  sections: [
    { key: "work", label: "Work category", options: WORK },
    { key: "workCountry", label: "Work country", options: COUNTRIES },
    { key: "workPlace", label: "Work place", options: WORK_PLACE },
  ],
};

const RESIDENTIAL_GROUP: Group = {
  id: "residential",
  title: "Residential Search",
  icon: <Feather name="map-pin" size={18} color={COLORS.primary} />,
  sections: [
    {
      key: "residentialCountry",
      label: "Residential country",
      options: COUNTRIES,
    },
    {
      key: "residentialState",
      label: "Residential state",
      options: RESIDENTIAL_STATE,
    },
    {
      key: "residentialDistrict",
      label: "Residential district",
      options: RESIDENTIAL_DISTRICT,
    },
    {
      key: "residentialTaluk",
      label: "Residential taluk",
      options: RESIDENTIAL_TALUK,
    },
  ],
};

const ABROAD_SECTION: Section = {
  key: "abroad",
  title: "Abroad expectation",
  icon: <Feather name="globe" size={18} color={COLORS.primary} />,
  options: ABROAD,
  single: true,
  showBadge: true,
};

const AVOID_SECTION: Section = {
  key: "avoid",
  title: "Avoid listing",
  icon: <Feather name="slash" size={18} color={COLORS.primary} />,
  options: AVOID,
  showBadge: true,
  checkboxLabel: "Avoid listing",
};

function sectionSubtitle(values: string[]) {
  return values.length === 0 ? "Any" : values.join(", ");
}

export default function FilterPage() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [filters, setFilters] = useState<FilterState>(EMPTY);
  const [expanded, setExpanded] = useState<string | null>("basic");
  const [picker, setPicker] = useState<"from" | "to" | null>(null);
  const [showAll, setShowAll] = useState<Partial<Record<ListKey, boolean>>>({});
  const [search, setSearch] = useState<Record<string, string>>({});
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(0);
  const cardRefs = useRef<Record<string, View | null>>({});

  function scrollCardIntoView(id: string) {
    const card = cardRefs.current[id];
    const scroll = scrollRef.current as unknown as View | null;
    if (!card || !scroll) return;
    scroll.measureInWindow((_x, scrollTop) => {
      card.measureInWindow((_cx, cardTop) => {
        const offset = cardTop - scrollTop;
        if (offset < CARD_TOP_GAP) {
          scrollRef.current?.scrollTo({
            y: Math.max(scrollY.current + offset - CARD_TOP_GAP, 0),
            animated: true,
          });
        }
      });
    });
  }

  function toggleCard(id: string) {
    if (expanded === id) {
      setExpanded(null);
      return;
    }
    setExpanded(id);
    // Wait for the previously open card to collapse before measuring.
    setTimeout(() => scrollCardIntoView(id), 60);
  }

  function toggle(key: ListKey, value: string, single?: boolean) {
    setFilters((f) => {
      const current = f[key];
      const has = current.includes(value);
      const next = single
        ? has
          ? []
          : [value]
        : has
          ? current.filter((v) => v !== value)
          : [...current, value];
      return { ...f, [key]: next };
    });
  }

  function selectAll(key: ListKey, options: string[]) {
    setFilters((f) => {
      const current = f[key];
      const allSelected = options.every((o) => current.includes(o));
      return {
        ...f,
        [key]: allSelected
          ? current.filter((v) => !options.includes(v))
          : [...current, ...options.filter((o) => !current.includes(o))],
      };
    });
  }

  function pickHeight(index: number) {
    setFilters((f) =>
      picker === "from"
        ? { ...f, heightFrom: index, heightTo: Math.max(index, f.heightTo) }
        : { ...f, heightTo: index, heightFrom: Math.min(index, f.heightFrom) },
    );
    setPicker(null);
  }

  const applied: { id: string; label: string; remove: () => void }[] = [];
  if (filters.ageGap > 0) {
    applied.push({
      id: "ageGap",
      label: `Age gap ${ageGapLabel(filters.ageGap)}`,
      remove: () => setFilters((f) => ({ ...f, ageGap: 0 })),
    });
  }
  if (filters.heightFrom > 0 || filters.heightTo < HEIGHTS.length - 1) {
    applied.push({
      id: "height",
      label: `${HEIGHTS[filters.heightFrom]} - ${HEIGHTS[filters.heightTo]}`,
      remove: () =>
        setFilters((f) => ({
          ...f,
          heightFrom: EMPTY.heightFrom,
          heightTo: EMPTY.heightTo,
        })),
    });
  }
  CHIP_ORDER.forEach((key) =>
    filters[key].forEach((value) =>
      applied.push({
        id: `${key}-${value}`,
        label: value,
        remove: () => toggle(key, value),
      }),
    ),
  );
  const profession = filters.profession.trim();
  if (profession) {
    applied.push({
      id: "profession",
      label: profession,
      remove: () => setFilters((f) => ({ ...f, profession: "" })),
    });
  }

  function renderChip(key: ListKey, value: string, single?: boolean) {
    const active = filters[key].includes(value);
    return (
      <Pressable
        key={value}
        style={[styles.chip, active && styles.chipActive]}
        onPress={() => toggle(key, value, single)}
      >
        {active ? (
          <Feather name="check" size={14} color={COLORS.primaryDark} />
        ) : null}
        <Text style={[styles.chipText, active && styles.chipTextActive]}>
          {value}
        </Text>
      </Pressable>
    );
  }

  function renderCheckboxGrid(
    section: SubSection,
    divider?: boolean,
    searching?: boolean,
  ) {
    const values = filters[section.key];
    const expandedList = showAll[section.key];
    const hidden = searching ? 0 : section.options.length - VISIBLE_OPTIONS;
    const options =
      hidden > 0 && !expandedList
        ? section.options.slice(0, VISIBLE_OPTIONS)
        : section.options;

    return (
      <View
        key={section.key}
        style={[styles.cardBody, divider && styles.groupDivider]}
      >
        <View style={styles.labelRow}>
          <Text style={styles.groupLabel}>{section.label}</Text>
          <Pressable
            onPress={() => selectAll(section.key, section.options)}
            hitSlop={8}
          >
            <Text style={styles.selectAll}>Select all</Text>
          </Pressable>
        </View>
        <View style={styles.checkGrid}>
          {options.map((o) => {
            const checked = values.includes(o);
            return (
              <Pressable
                key={o}
                style={styles.checkItem}
                onPress={() => toggle(section.key, o)}
              >
                <View
                  style={[styles.checkBox, checked && styles.checkBoxActive]}
                >
                  {checked ? (
                    <Feather name="check" size={12} color={COLORS.white} />
                  ) : null}
                </View>
                <Text style={styles.checkText} numberOfLines={2}>
                  {o}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {hidden > 0 ? (
          <Pressable
            onPress={() =>
              setShowAll((s) => ({ ...s, [section.key]: !expandedList }))
            }
            hitSlop={8}
          >
            <Text style={styles.moreText}>
              {expandedList ? "Show less" : `+ ${hidden} more`}
            </Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  function renderSection(section: Section) {
    const open = expanded === section.key;
    const values = filters[section.key];
    return (
      <View
        key={section.key}
        ref={(r) => {
          cardRefs.current[section.key] = r;
        }}
        style={[styles.card, open && styles.cardActive]}
      >
        <Pressable
          style={styles.cardHeader}
          onPress={() => toggleCard(section.key)}
        >
          <View style={styles.cardIcon}>{section.icon}</View>
          <View style={styles.cardTitleWrap}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.cardSubtitle} numberOfLines={1}>
              {sectionSubtitle(values)}
            </Text>
          </View>
          {section.showBadge && values.length > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{values.length}</Text>
            </View>
          ) : null}
          <Feather
            name={open ? "chevron-up" : "chevron-right"}
            size={18}
            color={COLORS.text}
          />
        </Pressable>

        {open && section.checkboxLabel ? (
          renderCheckboxGrid({
            key: section.key,
            label: section.checkboxLabel,
            options: section.options,
          })
        ) : open ? (
          <View style={[styles.cardBody, styles.chipsWrap]}>
            {section.options.map((o) =>
              renderChip(section.key, o, section.single),
            )}
          </View>
        ) : null}
      </View>
    );
  }

  function renderGroup(group: Group, extra?: React.ReactNode, extraValue = "") {
    const open = expanded === group.id;
    const values = group.sections.flatMap((s) => filters[s.key]);
    if (extraValue) values.push(extraValue);
    const query = search[group.id] ?? "";
    const term = query.trim().toLowerCase();
    const sections = term
      ? group.sections
          .map((s) => ({
            ...s,
            options: s.options.filter((o) => o.toLowerCase().includes(term)),
          }))
          .filter((s) => s.options.length > 0)
      : group.sections;
    return (
      <View
        key={group.id}
        ref={(r) => {
          cardRefs.current[group.id] = r;
        }}
        style={[styles.card, open && styles.cardActive]}
      >
        <Pressable
          style={styles.cardHeader}
          onPress={() => toggleCard(group.id)}
        >
          <View style={styles.cardIcon}>{group.icon}</View>
          <View style={styles.cardTitleWrap}>
            <Text style={styles.cardTitle}>{group.title}</Text>
            <Text style={styles.cardSubtitle} numberOfLines={1}>
              {sectionSubtitle(values)}
            </Text>
          </View>
          {values.length > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{values.length}</Text>
            </View>
          ) : null}
          <Feather
            name={open ? "chevron-up" : "chevron-right"}
            size={18}
            color={COLORS.text}
          />
        </Pressable>

        {open ? (
          <>
            <View style={styles.searchBox}>
              <Feather name="search" size={16} color={COLORS.muted} />
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={(text) =>
                  setSearch((s) => ({ ...s, [group.id]: text }))
                }
                placeholder={`Search ${group.title.toLowerCase()}`}
                placeholderTextColor={COLORS.muted}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
              />
              {query ? (
                <Pressable
                  onPress={() => setSearch((s) => ({ ...s, [group.id]: "" }))}
                  hitSlop={8}
                >
                  <Feather name="x-circle" size={16} color={COLORS.muted} />
                </Pressable>
              ) : null}
            </View>
            {sections.map((s, i) => renderCheckboxGrid(s, i > 0, !!term))}
            {term && sections.length === 0 ? (
              <Text style={styles.emptyText}>
                No results for &quot;{query.trim()}&quot;
              </Text>
            ) : null}
            {extra}
          </>
        ) : null}
      </View>
    );
  }

  const basicOpen = expanded === "basic";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Feather name="x" size={20} color={COLORS.text} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Filters</Text>
          <Text style={styles.subtitle}>{applied.length} applied</Text>
        </View>
        <Pressable onPress={() => setFilters(EMPTY)} hitSlop={8}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

      {applied.length > 0 ? (
        <View style={styles.appliedRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.appliedContent}
          >
            {applied.map((chip) => (
              <Pressable
                key={chip.id}
                style={styles.appliedChip}
                onPress={chip.remove}
              >
                <Text style={styles.appliedChipText}>{chip.label}</Text>
                <Feather name="x" size={13} color={COLORS.primaryDark} />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}

      <KeyboardAwareScrollView
        ref={scrollRef}
        onScroll={(e) => {
          scrollY.current = e.nativeEvent.contentOffset.y;
        }}
        contentContainerStyle={styles.scrollContent}
        paddingBottom={scaleFont(16)}
      >
        <View style={styles.cardList}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Feather name="star" size={18} color={COLORS.primary} />
              </View>
              <View style={styles.cardTitleWrap}>
                <Text style={styles.cardTitle}>Horoscope</Text>
              </View>
            </View>
            <View style={[styles.cardBody, styles.chipsWrap]}>
              {HOROSCOPE.map((h) => renderChip("horoscope", h))}
            </View>
          </View>

          {renderSection(AVOID_SECTION)}

          <View
            ref={(r) => {
              cardRefs.current.basic = r;
            }}
            style={[styles.card, basicOpen && styles.cardActive]}
          >
            <Pressable
              style={styles.cardHeader}
              onPress={() => toggleCard("basic")}
            >
              <View style={styles.cardIcon}>
                <Feather name="user" size={18} color={COLORS.primary} />
              </View>
              <View style={styles.cardTitleWrap}>
                <Text style={styles.cardTitle}>Basic</Text>
              </View>
              <Feather
                name={basicOpen ? "chevron-up" : "chevron-right"}
                size={18}
                color={COLORS.text}
              />
            </Pressable>

            {basicOpen ? (
              <View style={styles.cardBody}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Age difference upto</Text>
                  <View style={styles.valuePill}>
                    <Text style={styles.valuePillText}>
                      {ageGapLabel(filters.ageGap)}
                    </Text>
                  </View>
                </View>
                <ValueSlider
                  max={AGE_GAP_MAX}
                  marks={AGE_GAP_MARKS}
                  value={filters.ageGap}
                  onChange={(ageGap) => setFilters((f) => ({ ...f, ageGap }))}
                />

                <Text style={[styles.label, styles.fieldGap]}>
                  Height range
                </Text>
                <View style={styles.rangeRow}>
                  <HeightDropdown
                    value={HEIGHTS[filters.heightFrom]}
                    onPress={() => setPicker("from")}
                  />
                  <Text style={styles.rangeTo}>to</Text>
                  <HeightDropdown
                    value={HEIGHTS[filters.heightTo]}
                    onPress={() => setPicker("to")}
                  />
                </View>

                <View style={[styles.labelRow, styles.fieldGap]}>
                  <Text style={styles.label}>Complexion</Text>
                  <Pressable
                    onPress={() => selectAll("complexion", COMPLEXIONS)}
                    hitSlop={8}
                  >
                    <Text style={styles.selectAll}>Select all</Text>
                  </Pressable>
                </View>
                <View style={styles.chipsWrap}>
                  {COMPLEXIONS.map((c) => renderChip("complexion", c))}
                </View>
              </View>
            ) : null}
          </View>

          {renderGroup(EDUCATION_GROUP)}

          {renderGroup(
            WORK_GROUP,
            <View style={[styles.cardBody, styles.groupDivider]}>
              <Text style={styles.groupLabel}>Profession</Text>
              <TextInput
                style={styles.textInput}
                value={filters.profession}
                onChangeText={(profession) =>
                  setFilters((f) => ({ ...f, profession }))
                }
                placeholder="e.g. Software Engineer"
                placeholderTextColor={COLORS.muted}
                returnKeyType="done"
              />
            </View>,
            profession,
          )}

          {renderGroup(RESIDENTIAL_GROUP)}

          {renderSection(ABROAD_SECTION)}
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.footerReset} onPress={() => setFilters(EMPTY)}>
          <Text style={styles.footerResetText}>Reset</Text>
        </Pressable>
        <Pressable style={styles.showBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.showBtnText}>Apply</Text>
        </Pressable>
      </View>

      <Modal
        visible={picker !== null}
        transparent
        animationType="slide"
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={() => setPicker(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setPicker(null)}>
          <Pressable
            style={[
              styles.modalSheet,
              { paddingBottom: insets.bottom + scaleFont(16) },
            ]}
          >
            <Text style={styles.modalTitle}>
              {picker === "from" ? "Minimum height" : "Maximum height"}
            </Text>
            <FlatList
              data={HEIGHTS}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item}
              initialScrollIndex={Math.max(
                0,
                (picker === "to" ? filters.heightTo : filters.heightFrom) - 2,
              )}
              getItemLayout={(_, index) => ({
                length: 48,
                offset: 48 * index,
                index,
              })}
              renderItem={({ item, index }) => {
                const selected =
                  index ===
                  (picker === "to" ? filters.heightTo : filters.heightFrom);
                return (
                  <Pressable
                    style={[styles.modalItem, { height: 48 }]}
                    onPress={() => pickHeight(index)}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        selected && styles.modalItemTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                    {selected ? (
                      <Feather name="check" size={18} color={COLORS.primary} />
                    ) : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function HeightDropdown({
  value,
  onPress,
}: {
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.dropdown} onPress={onPress}>
      <Text style={styles.dropdownText}>{value}</Text>
      <View style={styles.dropdownIcon}>
        <Feather name="chevron-down" size={14} color={COLORS.primary} />
      </View>
    </Pressable>
  );
}

function ValueSlider({
  max,
  marks,
  value,
  onChange,
}: {
  max: number;
  marks: { value: number; label: string }[];
  value: number;
  onChange: (value: number) => void;
}) {
  const [width, setWidth] = useState(0);

  function update(x: number) {
    if (!width) return;
    const ratio = Math.min(Math.max(x / width, 0), 1);
    const next = Math.round(ratio * max);
    if (next !== value) onChange(next);
  }

  const pan = Gesture.Pan()
    .runOnJS(true)
    .hitSlop({ vertical: 12 })
    .activeOffsetX([-4, 4])
    .failOffsetY([-12, 12])
    .onStart((e) => update(e.x))
    .onUpdate((e) => update(e.x));
  const tap = Gesture.Tap()
    .runOnJS(true)
    .hitSlop({ vertical: 12 })
    .onEnd((e) => update(e.x));

  const left = width * (value / max);

  return (
    <View>
      <GestureDetector gesture={Gesture.Race(pan, tap)}>
        <View
          style={styles.sliderHit}
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
          <View style={styles.sliderTrack} />
          <View style={[styles.sliderFill, { width: left }]} />
          <View style={[styles.sliderThumb, { left }]} />
        </View>
      </GestureDetector>
      <View style={styles.sliderLabels}>
        {marks.map((m) => (
          <Text
            key={m.label}
            style={[
              styles.sliderLabel,
              { left: width * (m.value / max) },
              m.value === value && styles.sliderLabelActive,
            ]}
            onPress={() => onChange(m.value)}
            suppressHighlighting
          >
            {m.label}
          </Text>
        ))}
      </View>
    </View>
  );
}
