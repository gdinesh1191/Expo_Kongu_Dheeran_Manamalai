import HeaderContentNew from "@/components/HeaderContent/HeaderContentNew";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { COLORS, STATUS_STYLE, styles, THEME } from "./style";

type TabKey = "history" | "punch";

type AttendanceStatus = "Absent" | "Present" | "Late" | "Week Off";

type AttendanceRecord = {
  key: string;
  day: string;
  monthShort: string;
  weekday: string;
  status: AttendanceStatus;
  remark: string;
  punchIn: string;
  punchOut: string;
  hours: string;
};

/* ---------- sample data (replace with your API) ---------- */

const MY_ATTENDANCE_EMPLOYEE = { name: "KARTHICK", code: "4" };

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Records for one month, newest day first. Future days are not included.
function buildMonthRecords(
  year: number,
  month: number,
  today: Date = new Date(),
): AttendanceRecord[] {
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;
  const lastDay = isCurrentMonth
    ? today.getDate()
    : new Date(year, month + 1, 0).getDate();

  const records: AttendanceRecord[] = [];
  for (let d = lastDay; d >= 1; d--) {
    const weekdayIndex = new Date(year, month, d).getDay();

    // Sample pattern: Sunday = Week Off, every 4th day = Absent, every 5th = Late, rest = Present.
    let status: AttendanceStatus = "Present";
    if (weekdayIndex === 0) status = "Week Off";
    else if (d % 4 === 0) status = "Absent";
    else if (d % 5 === 0) status = "Late";

    const worked = status === "Present" || status === "Late";
    records.push({
      key: `${year}-${month}-${d}`,
      day: String(d).padStart(2, "0"),
      monthShort: MONTH_SHORT[month].toUpperCase(),
      weekday: WEEKDAYS[weekdayIndex],
      status,
      remark: status === "Late" ? "Late by 42 min" : "-",
      punchIn: worked ? (status === "Late" ? "09:42 AM" : "09:01 AM") : "-",
      punchOut: worked ? "06:10 PM" : "-",
      hours: worked ? (status === "Late" ? "08:28" : "09:09") : "-",
    });
  }
  return records;
}

/* ---------- helpers ---------- */

function lastSixMonths() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      label: `${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`,
    };
  });
}

function formatNow(d: Date) {
  const h = d.getHours();
  const hh = String(h % 12 || 12).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getDate()} ${MONTH_SHORT[d.getMonth()]}, ${d.getFullYear()} ${hh}:${mm} ${h >= 12 ? "PM" : "AM"}`;
}

/* ---------- small pieces ---------- */

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </>
  );
}

function DayCard({ item }: { item: AttendanceRecord }) {
  const tone = STATUS_STYLE[item.status];

  const tri = [
    { label: "PUNCH IN", value: item.punchIn },
    { label: "PUNCH OUT", value: item.punchOut },
    { label: "HRS", value: item.hours },
  ];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: tone.card, borderColor: tone.border },
      ]}
    >
      <View style={styles.cardDecor} />

      <View style={styles.cardTop}>
        <View style={styles.dateChip}>
          <Text style={styles.dateDay}>{item.day}</Text>
          <Text style={styles.dateMonth}>{item.monthShort}</Text>
        </View>
        <View style={styles.cardTitleWrap}>
          <Text style={styles.weekday}>{item.weekday}</Text>
          <Text style={styles.remark}>{item.remark}</Text>
        </View>
        <View style={[styles.pill, { backgroundColor: tone.pill }]}>
          <Text style={[styles.pillText, { color: tone.pillText }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.triRow}>
        {tri.map((m, i) => (
          <View
            key={m.label}
            style={[styles.triCell, i > 0 && styles.triDivider]}
          >
            <Metric label={m.label} value={m.value} />
          </View>
        ))}
      </View>
    </View>
  );
}

/* ---------- Punch History tab ---------- */

function HistoryTab() {
  const months = useMemo(lastSixMonths, []);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const current = months[selected];
  const records = useMemo(
    () => buildMonthRecords(current.year, current.month),
    [current.year, current.month],
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headingRow}>
        <View style={styles.employeeRow}>
          <Text style={styles.employeeName}>{MY_ATTENDANCE_EMPLOYEE.name}</Text>
          <View style={styles.employeeCode}>
            <Text style={styles.employeeCodeText}>
              {MY_ATTENDANCE_EMPLOYEE.code}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.monthBtn}
          onPress={() => setOpen((v) => !v)}
          activeOpacity={0.8}
        >
          <Feather name="calendar" size={15} color={THEME.text} />
          <Text style={styles.monthText}>{current.label}</Text>
          <Feather
            name={open ? "chevron-up" : "chevron-down"}
            size={15}
            color={THEME.text}
          />
        </TouchableOpacity>

        {open && (
          <View style={styles.monthMenu}>
            {months.map((m, i) => (
              <TouchableOpacity
                key={m.label}
                style={[
                  styles.monthMenuItem,
                  i === selected && styles.monthMenuItemActive,
                ]}
                onPress={() => {
                  setSelected(i);
                  setOpen(false);
                }}
              >
                <Text style={styles.monthMenuText}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FlatList
        data={records}
        keyExtractor={(r) => r.key}
        renderItem={({ item }) => <DayCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No records for this month</Text>
        }
      />
    </View>
  );
}

const DEFAULT_POINT = { latitude: 11.341, longitude: 77.7172 };

function mapHtml(latitude: number, longitude: number, showMarker: boolean) {
  const marker = showMarker
    ? `L.circleMarker([${latitude}, ${longitude}], {
        radius: 9, color: "#ffffff", weight: 2, fillColor: "#12B34A", fillOpacity: 1
      }).addTo(map);`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  html, body, #map { height: 100%; margin: 0; background: #EAF0EB; }
  .leaflet-control-attribution { font-size: 10px; }
</style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map("map", { zoomControl: false }).setView([${latitude}, ${longitude}], ${showMarker ? 16 : 12});
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
  ${marker}
</script>
</body>
</html>`;
}

/* ---------- Punch tab ---------- */

function PunchMap() {
  const [point, setPoint] = useState(DEFAULT_POINT);
  const [showMarker, setShowMarker] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status !== "granted") return;
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (!active) return;
        setPoint({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setShowMarker(true);
      } catch {
        // The map stays on the default area when location is unavailable.
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <WebView
      style={styles.map}
      source={{ html: mapHtml(point.latitude, point.longitude, showMarker) }}
      originWhitelist={["*"]}
      javaScriptEnabled
      domStorageEnabled
      scrollEnabled={false}
      setSupportMultipleWindows={false}
    />
  );
}

function PunchTab() {
  const [now, setNow] = useState(new Date());
  const [punchedIn, setPunchedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  function onPunch() {
    setPunchedIn((v) => !v);
  }

  return (
    <View style={styles.punchBody}>
      <View style={styles.mapBox}>
        <PunchMap />
        <View style={styles.timeChip} pointerEvents="none">
          <Text style={styles.timeChipText}>{formatNow(now)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.punchBtn}
        onPress={onPunch}
        activeOpacity={0.85}
      >
        <Feather
          name={punchedIn ? "log-out" : "log-in"}
          size={18}
          color={COLORS.white}
        />
        <Text style={styles.punchBtnText}>
          {punchedIn ? "Punch Out" : "Punch In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- Screen ---------- */

export default function Attendance() {
  const [tab, setTab] = useState<TabKey>("history");

  return (
    <View style={styles.background}>
      <HeaderContentNew
        title="Attendance"
        leftIcon="menu-2-fill"
        rightIcon="notification-3-fill"
        rightIconPress={() => navigation.navigate("notifications")}
      />

      {/* Tabs */}
      <View style={styles.tabs}>
        {(
          [
            { key: "history", label: "Punch History" },
            { key: "punch", label: "Punch" },
          ] as { key: TabKey; label: string }[]
        ).map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, tab === t.key && styles.tabActive]}
            onPress={() => setTab(t.key)}
            activeOpacity={0.85}
          >
            <Text
              style={[styles.tabText, tab === t.key && styles.tabTextActive]}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === "history" ? <HistoryTab /> : <PunchTab />}
    </View>
  );
}
