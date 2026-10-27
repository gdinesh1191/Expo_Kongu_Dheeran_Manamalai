import HeaderContentNew from "@/components/HeaderContent/HeaderContentNew";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useRef, useState } from "react";
import {
    FlatList,
    Linking,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    COLORS,
    styles,
    TAB_GAP,
    TAB_WIDTH,
    THEME,
    TONE_STYLE,
    ToneKey,
} from "./style";

type TabKey = "overdue" | "thisWeek" | "tenDays" | "nextWeek";

type RenewalItem = {
  id: string;
  name: string;
  place: string;
  phone: string;
  dueDate: string; // ISO date of the renewal due date
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "overdue", label: "Overdue" },
  { key: "thisWeek", label: "This Week" },
  { key: "tenDays", label: "10 Days" },
  { key: "nextWeek", label: "Next Week" },
];

/* ---------- dummy data (replace with your API) ---------- */

function offsetDate(days: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

// Offsets are relative to today so the sample data always lands in the tabs.
const RENEWALS: RenewalItem[] = [
  {
    id: "1",
    name: "Karthick Raja",
    place: "Salem",
    phone: "+91 98765 43210",
    dueDate: offsetDate(-9),
  },
  {
    id: "2",
    name: "Priya Lakshmi",
    place: "Erode",
    phone: "+91 91234 56780",
    dueDate: offsetDate(-3),
  },
  {
    id: "3",
    name: "Mohammed Rafi",
    place: "Namakkal",
    phone: "+91 99440 11223",
    dueDate: offsetDate(-1),
  },
  {
    id: "4",
    name: "Sundar Raman",
    place: "Coimbatore",
    phone: "+91 90030 77881",
    dueDate: offsetDate(0),
  },
  {
    id: "5",
    name: "Divya Bharathi",
    place: "Trichy",
    phone: "+91 97890 65432",
    dueDate: offsetDate(2),
  },
  {
    id: "6",
    name: "Arun Prakash",
    place: "Madurai",
    phone: "+91 88700 12345",
    dueDate: offsetDate(4),
  },
  {
    id: "7",
    name: "Meena Kumari",
    place: "Dharmapuri",
    phone: "+91 94430 99887",
    dueDate: offsetDate(6),
  },
  {
    id: "8",
    name: "Vignesh Kumar",
    place: "Attur",
    phone: "+91 96001 22334",
    dueDate: offsetDate(9),
  },
  {
    id: "9",
    name: "Anitha Devi",
    place: "Omalur",
    phone: "+91 98430 55667",
    dueDate: offsetDate(11),
  },
  {
    id: "10",
    name: "Gopal Samy",
    place: "Mettur",
    phone: "+91 93600 88990",
    dueDate: offsetDate(20),
  },
];

/* ---------- helpers ---------- */

function daysFromToday(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(iso);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

// Days left until Sunday (weeks run Monday to Sunday).
function daysLeftInWeek() {
  return 6 - ((new Date().getDay() + 6) % 7);
}

function inTab(item: RenewalItem, tab: TabKey) {
  const d = daysFromToday(item.dueDate);
  const weekEnd = daysLeftInWeek();
  switch (tab) {
    case "overdue":
      return d < 0;
    case "thisWeek":
      return d >= 0 && d <= weekEnd;
    case "tenDays":
      return d >= 0 && d <= 10;
    case "nextWeek":
      return d >= weekEnd + 1 && d <= weekEnd + 7;
  }
}

function getTone(item: RenewalItem): ToneKey {
  const d = daysFromToday(item.dueDate);
  if (d < 0) return "overdue";
  if (d <= daysLeftInWeek()) return "week";
  return "ten";
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function pillText(item: RenewalItem) {
  const d = daysFromToday(item.dueDate);
  if (d < 0) {
    const n = Math.abs(d);
    return `${n} day${n > 1 ? "s" : ""} overdue`;
  }
  if (d === 0) return "Due today";
  return `In ${d} day${d > 1 ? "s" : ""}`;
}

/* ---------- small pieces ---------- */

function RenewalCard({ item }: { item: RenewalItem }) {
  const tone = TONE_STYLE[getTone(item)];
  const due = new Date(item.dueDate);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: tone.card, borderColor: tone.border },
      ]}
    >
      <View style={styles.cardTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials(item.name)}</Text>
        </View>

        <View style={styles.cardTitleWrap}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.placeRow}>
            <Feather name="map-pin" size={12} color={THEME.muted} />
            <Text style={styles.place} numberOfLines={1}>
              {item.place}
            </Text>
          </View>
        </View>

        <View style={[styles.pill, { backgroundColor: tone.pill }]}>
          <Text style={[styles.pillText, { color: tone.pillText }]}>
            {pillText(item)}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoCell}>
          <Text style={styles.infoLabel}>RENEWAL DATE</Text>
          <Text style={styles.infoValue}>
            {`${String(due.getDate()).padStart(2, "0")}/${String(
              due.getMonth() + 1,
            ).padStart(2, "0")}/${due.getFullYear()}`}
          </Text>
        </View>

        <View
          style={[styles.infoCell, styles.infoCellWide, styles.infoDivider]}
        >
          <Text style={styles.infoLabel}>PHONE</Text>
          <Text style={styles.infoValue}>{item.phone}</Text>
        </View>

        <View style={[styles.infoCell, styles.infoDivider]}>
          <TouchableOpacity
            style={styles.callBtn}
            activeOpacity={0.85}
            onPress={() =>
              Linking.openURL(`tel:${item.phone.replace(/\s/g, "")}`)
            }
          >
            <Feather name="phone" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ---------- Screen ---------- */

export default function Renewal() {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<TabKey>("overdue");
  const [query, setQuery] = useState("");
  const [tabsWidth, setTabsWidth] = useState(0);
  const tabsRef = useRef<ScrollView>(null);

  // Keep the tapped tab centered when the tab row is scrollable.
  const onTabPress = (key: TabKey, index: number) => {
    setTab(key);
    const step = TAB_WIDTH + TAB_GAP;
    const x = index * step - (tabsWidth - TAB_WIDTH) / 2;
    tabsRef.current?.scrollTo({ x: Math.max(0, x), animated: true });
  };

  const counts = useMemo(() => {
    const c = {} as Record<TabKey, number>;
    TABS.forEach((t) => {
      c[t.key] = RENEWALS.filter((r) => inTab(r, t.key)).length;
    });
    return c;
  }, []);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RENEWALS.filter((r) => {
      if (!inTab(r, tab)) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.place.toLowerCase().includes(q) ||
        r.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""))
      );
    }).sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );
  }, [tab, query]);

  return (
    <View style={styles.background}>
      <HeaderContentNew
        title="Renewals"
        leftIcon="menu-2-fill"
        rightIcon="notification-3-fill"
        rightIconPress={() => navigation.navigate("notifications")}
      />

      {/* Tabs with counts */}
      <View
        style={styles.tabs}
        onLayout={(e) => setTabsWidth(e.nativeEvent.layout.width)}
      >
        <ScrollView
          ref={tabsRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {TABS.map((t, i) => {
            const active = tab === t.key;

            return (
              <TouchableOpacity
                key={t.key}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => onTabPress(t.key, i)}
                activeOpacity={0.85}
              >
                <View style={styles.tabContent}>
                  <Text
                    style={[styles.tabText, active && styles.tabTextActive]}
                    numberOfLines={1}
                    maxFontSizeMultiplier={1.2}
                  >
                    {t.label}
                  </Text>

                  <View
                    style={[styles.tabBadge, active && styles.tabBadgeActive]}
                  >
                    <Text
                      style={[styles.tabCount, active && styles.tabCountActive]}
                      numberOfLines={1}
                      maxFontSizeMultiplier={1.2}
                    >
                      {counts[t.key]}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.headingRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={15} color={THEME.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search name, place or phone"
            placeholderTextColor={THEME.muted}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Feather name="x" size={15} color={THEME.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => <RenewalCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No renewals here</Text>}
      />
    </View>
  );
}
