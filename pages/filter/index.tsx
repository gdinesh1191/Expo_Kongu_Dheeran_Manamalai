import KeyboardAwareScrollView from "@/components/KeyboardAwareScrollView";
import { scaleFont } from "@/constants/ScaleFont";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, styles } from "./style";

const HEIGHTS = Array.from({ length: 25 }, (_, i) => {
  const inches = 54 + i;
  return `${Math.floor(inches / 12)} ft ${inches % 12} in`;
});
const AGE_STEPS = ["All", "2", "5", "8", "10+"];
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
const WORK_COUNTRY = [
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
  "Exclude Wishlist",
  "Exclude Downloaded",
];

const VISIBLE_OPTIONS = 10;

type FilterState = {
  heightFrom: number;
  heightTo: number;
  ageStep: number;
  profession: string;
  complexion: string[];
  education: string[];
  educationCourse: string[];
  educationSpecialization: string[];
  work: string[];
  workCountry: string[];
  workPlace: string[];
  residentialState: string[];
  residentialDistrict: string[];
  residentialTaluk: string[];
  abroad: string[];
  horoscope: string[];
  avoid: string[];
};

type ListKey = Exclude<
  keyof FilterState,
  "heightFrom" | "heightTo" | "ageStep" | "profession"
>;

const EMPTY: FilterState = {
  heightFrom: 0,
  heightTo: HEIGHTS.length - 1,
  ageStep: 0,
  profession: "",
  complexion: [],
  education: [],
  educationCourse: [],
  educationSpecialization: [],
  work: [],
  workCountry: [],
  workPlace: [],
  residentialState: [],
  residentialDistrict: [],
  residentialTaluk: [],
  abroad: [],
  horoscope: [],
  avoid: [],
};

const INITIAL: FilterState = {
  ...EMPTY,
  heightFrom: 8,
  heightTo: 17,
  ageStep: 2,
  complexion: ["Fair"],
  education: ["PG", "UG"],
  work: ["Private Job", "Govt Job"],
  residentialState: ["Tamilnadu"],
  residentialDistrict: ["Salem", "Chennai"],
  abroad: ["Not yet decided"],
  horoscope: ["Sutham"],
  avoid: ["No Rajju", "Exclude Downloaded"],
};

const CHIP_ORDER: ListKey[] = [
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

const EDUCATION_WORK_SECTIONS: Section[] = [
  {
    key: "education",
    title: "Education",
    icon: <Ionicons name="school-outline" size={18} color={COLORS.primary} />,
    options: EDUCATION,
    showBadge: true,
    checkboxLabel: "Education degree",
  },
  {
    key: "educationCourse",
    title: "Education course",
    icon: <Feather name="book-open" size={18} color={COLORS.primary} />,
    options: EDUCATION_COURSE,
    showBadge: true,
    checkboxLabel: "Education course",
  },
  {
    key: "educationSpecialization",
    title: "Education specialization",
    icon: <Feather name="layers" size={18} color={COLORS.primary} />,
    options: EDUCATION_SPECIALIZATION,
    showBadge: true,
    checkboxLabel: "Education specialization",
  },
  {
    key: "work",
    title: "Working and business",
    icon: <Feather name="briefcase" size={18} color={COLORS.primary} />,
    options: WORK,
    showBadge: true,
    checkboxLabel: "Work category",
  },
  {
    key: "workCountry",
    title: "Work country",
    icon: <Ionicons name="earth-outline" size={18} color={COLORS.primary} />,
    options: WORK_COUNTRY,
    showBadge: true,
    checkboxLabel: "Work country",
  },
  {
    key: "workPlace",
    title: "Work place",
    icon: <Ionicons name="business-outline" size={18} color={COLORS.primary} />,
    options: WORK_PLACE,
    showBadge: true,
    checkboxLabel: "Work place",
  },
];

const OTHER_SECTIONS: Section[] = [
  {
    key: "residentialState",
    title: "Residential state",
    icon: <Feather name="map" size={18} color={COLORS.primary} />,
    options: RESIDENTIAL_STATE,
    showBadge: true,
    checkboxLabel: "Residential state",
  },
  {
    key: "residentialDistrict",
    title: "Residential district",
    icon: <Feather name="map-pin" size={18} color={COLORS.primary} />,
    options: RESIDENTIAL_DISTRICT,
    showBadge: true,
    checkboxLabel: "Residential district",
  },
  {
    key: "residentialTaluk",
    title: "Residential taluk",
    icon: <Feather name="navigation" size={18} color={COLORS.primary} />,
    options: RESIDENTIAL_TALUK,
    showBadge: true,
    checkboxLabel: "Residential taluk",
  },
  {
    key: "abroad",
    title: "Abroad expectation",
    icon: <Feather name="globe" size={18} color={COLORS.primary} />,
    options: ABROAD,
    single: true,
    showBadge: true,
  },
];

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
  const [filters, setFilters] = useState<FilterState>(INITIAL);
  const [expanded, setExpanded] = useState<string | null>("basic");
  const [picker, setPicker] = useState<"from" | "to" | null>(null);
  const [showAll, setShowAll] = useState<Partial<Record<ListKey, boolean>>>({});

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
    setFilters((f) => ({
      ...f,
      [key]: f[key].length === options.length ? [] : [...options],
    }));
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
  if (filters.ageStep > 0) {
    applied.push({
      id: "ageStep",
      label: `Age gap ${AGE_STEPS[filters.ageStep]} yrs`,
      remove: () => setFilters((f) => ({ ...f, ageStep: 0 })),
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
      <TouchableOpacity
        key={value}
        style={[styles.chip, active && styles.chipActive]}
        onPress={() => toggle(key, value, single)}
        activeOpacity={0.8}
      >
        {active ? (
          <Feather name="check" size={14} color={COLORS.primaryDark} />
        ) : null}
        <Text style={[styles.chipText, active && styles.chipTextActive]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderCheckboxGrid(section: Section) {
    const values = filters[section.key];
    const expandedList = showAll[section.key];
    const hidden = section.options.length - VISIBLE_OPTIONS;
    const options =
      hidden > 0 && !expandedList
        ? section.options.slice(0, VISIBLE_OPTIONS)
        : section.options;

    return (
      <View style={styles.cardBody}>
        <View style={styles.labelRow}>
          <Text style={styles.groupLabel}>{section.checkboxLabel}</Text>
          <TouchableOpacity
            onPress={() => selectAll(section.key, section.options)}
            hitSlop={8}
          >
            <Text style={styles.selectAll}>Select all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkGrid}>
          {options.map((o) => {
            const checked = values.includes(o);
            return (
              <TouchableOpacity
                key={o}
                style={styles.checkItem}
                onPress={() => toggle(section.key, o)}
                activeOpacity={0.7}
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
              </TouchableOpacity>
            );
          })}
        </View>
        {hidden > 0 ? (
          <TouchableOpacity
            onPress={() =>
              setShowAll((s) => ({ ...s, [section.key]: !expandedList }))
            }
            hitSlop={8}
          >
            <Text style={styles.moreText}>
              {expandedList ? "Show less" : `+ ${hidden} more`}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  function renderSection(section: Section) {
    const open = expanded === section.key;
    const values = filters[section.key];
    return (
      <View key={section.key} style={[styles.card, open && styles.cardActive]}>
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => setExpanded(open ? null : section.key)}
          activeOpacity={0.8}
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
        </TouchableOpacity>

        {open && section.checkboxLabel ? (
          renderCheckboxGrid(section)
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

  const basicOpen = expanded === "basic";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Filters</Text>
          <Text style={styles.subtitle}>{applied.length} applied</Text>
        </View>
        <TouchableOpacity onPress={() => setFilters(EMPTY)} hitSlop={8}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {applied.length > 0 ? (
        <View style={styles.appliedRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.appliedContent}
          >
            {applied.map((chip) => (
              <TouchableOpacity
                key={chip.id}
                style={styles.appliedChip}
                onPress={chip.remove}
                activeOpacity={0.8}
              >
                <Text style={styles.appliedChipText}>{chip.label}</Text>
                <Feather name="x" size={13} color={COLORS.primaryDark} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}

      <KeyboardAwareScrollView
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

          <View style={[styles.card, basicOpen && styles.cardActive]}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => setExpanded(basicOpen ? null : "basic")}
              activeOpacity={0.8}
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
            </TouchableOpacity>

            {basicOpen ? (
              <View style={styles.cardBody}>
                <Text style={styles.label}>Height range</Text>
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
                  <Text style={styles.label}>Age difference upto</Text>
                  <View style={styles.valuePill}>
                    <Text style={styles.valuePillText}>
                      {filters.ageStep === 0
                        ? "All"
                        : `${AGE_STEPS[filters.ageStep]} years`}
                    </Text>
                  </View>
                </View>
                <StepSlider
                  steps={AGE_STEPS}
                  value={filters.ageStep}
                  onChange={(ageStep) => setFilters((f) => ({ ...f, ageStep }))}
                />

                <View style={[styles.labelRow, styles.fieldGap]}>
                  <Text style={styles.label}>Complexion</Text>
                  <TouchableOpacity
                    onPress={() => selectAll("complexion", COMPLEXIONS)}
                    hitSlop={8}
                  >
                    <Text style={styles.selectAll}>Select all</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.chipsWrap}>
                  {COMPLEXIONS.map((c) => renderChip("complexion", c))}
                </View>
              </View>
            ) : null}
          </View>

          {EDUCATION_WORK_SECTIONS.map(renderSection)}

          <View
            style={[
              styles.card,
              expanded === "profession" && styles.cardActive,
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Feather name="award" size={18} color={COLORS.primary} />
              </View>
              <View style={styles.cardTitleWrap}>
                <Text style={styles.cardTitle}>Profession</Text>
              </View>
            </View>
            <TextInput
              style={styles.textInput}
              value={filters.profession}
              onChangeText={(profession) =>
                setFilters((f) => ({ ...f, profession }))
              }
              onFocus={() => setExpanded("profession")}
              placeholder="e.g. Software Engineer"
              placeholderTextColor={COLORS.muted}
              returnKeyType="done"
            />
          </View>

          {OTHER_SECTIONS.map(renderSection)}
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerReset}
          onPress={() => setFilters(EMPTY)}
        >
          <Text style={styles.footerResetText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.showBtnText}>Apply</Text>
        </TouchableOpacity>
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
                  <TouchableOpacity
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
                  </TouchableOpacity>
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
    <TouchableOpacity
      style={styles.dropdown}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.dropdownText}>{value}</Text>
      <View style={styles.dropdownIcon}>
        <Feather name="chevron-down" size={14} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
}

function StepSlider({
  steps,
  value,
  onChange,
}: {
  steps: string[];
  value: number;
  onChange: (step: number) => void;
}) {
  const [width, setWidth] = useState(0);
  const last = steps.length - 1;

  function update(x: number) {
    if (!width) return;
    const ratio = Math.min(Math.max(x / width, 0), 1);
    const step = Math.round(ratio * last);
    if (step !== value) onChange(step);
  }

  const pan = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-4, 4])
    .failOffsetY([-12, 12])
    .onUpdate((e) => update(e.x));
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onEnd((e) => update(e.x));

  const left = width * (value / last);

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
        {steps.map((s) => (
          <Text key={s} style={styles.sliderLabel}>
            {s}
          </Text>
        ))}
      </View>
    </View>
  );
}
