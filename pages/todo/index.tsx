import HeaderContentNew from "@/components/HeaderContent/HeaderContentNew";
import { scaleFont } from "@/constants/ScaleFont";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS, styles } from "./style";

const STORAGE_KEY = "kongu_todos_v2";

type Priority = "high" | "medium" | "low";
type Filter = "all" | "pending" | "done";

type Todo = {
  id: string;
  title: string;
  note: string;
  done: boolean;
  createdAt: number;
  dueDate: string;
  priority: Priority;
};

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "done", label: "Done" },
];

const PRIORITIES: { key: Priority; label: string }[] = [
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
];

function dateKey(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function headerDate(date: Date) {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

function sampleTasks(today: string): Todo[] {
  const now = Date.now();
  return [
    {
      id: "sample-1",
      title: "Reply to Ananya's interest",
      note: "Ananya, 27 · Chennai",
      done: false,
      priority: "high",
      dueDate: today,
      createdAt: now,
    },
    {
      id: "sample-2",
      title: "Call Meera's family",
      note: "Meera, 25 · Coimbatore",
      done: false,
      priority: "medium",
      dueDate: today,
      createdAt: now,
    },
    {
      id: "sample-3",
      title: "Add 2 more photos",
      note: "My profile",
      done: false,
      priority: "low",
      dueDate: today,
      createdAt: now,
    },
    {
      id: "sample-4",
      title: "Video call with Divya",
      note: "Divya, 28 · Madurai",
      done: false,
      priority: "high",
      dueDate: today,
      createdAt: now,
    },
    {
      id: "sample-5",
      title: "Verify mobile number",
      note: "My profile",
      done: true,
      priority: "medium",
      dueDate: today,
      createdAt: now,
    },
    {
      id: "sample-6",
      title: "Update partner preferences",
      note: "My profile",
      done: true,
      priority: "medium",
      dueDate: today,
      createdAt: now,
    },
  ];
}

function accentColor(item: Todo) {
  if (item.done || item.priority === "medium") return COLORS.primary;
  if (item.priority === "high") return COLORS.high;
  return COLORS.low;
}

function badgeStyle(item: Todo) {
  if (item.done)
    return {
      bg: COLORS.primaryLight,
      color: COLORS.primaryDark,
      label: "Done",
    };
  if (item.priority === "high")
    return { bg: COLORS.highBg, color: COLORS.high, label: "High" };
  if (item.priority === "low")
    return { bg: COLORS.lowBg, color: COLORS.low, label: "Low" };
  return {
    bg: COLORS.primaryLight,
    color: COLORS.primaryDark,
    label: "Medium",
  };
}

export default function TodoPage() {
  const navigation = useNavigation<any>();
  const today = useMemo(() => startOfDay(new Date()), []);
  const todayKey = dateKey(today);
  const days = useMemo(
    () =>
      [-1, 0, 1, 2, 3].map((offset) => {
        const date = new Date(today);
        date.setDate(today.getDate() + offset);
        return date;
      }),
    [today],
  );

  const [todos, setTodos] = useState<Todo[]>([]);
  const [ready, setReady] = useState(false);
  const [selectedKey, setSelectedKey] = useState(todayKey);
  const [filter, setFilter] = useState<Filter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) {
          setTodos(sampleTasks(todayKey));
          return;
        }
        const parsed = JSON.parse(raw) as Todo[];
        if (Array.isArray(parsed)) setTodos(parsed);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, [todayKey]);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch(() => {});
  }, [todos, ready]);

  const dayTasks = useMemo(
    () => todos.filter((item) => item.dueDate === selectedKey),
    [selectedKey, todos],
  );

  const doneCount = dayTasks.filter((item) => item.done).length;
  const progress = dayTasks.length === 0 ? 0 : doneCount / dayTasks.length;

  const visible = useMemo(() => {
    const filtered =
      filter === "pending"
        ? dayTasks.filter((item) => !item.done)
        : filter === "done"
          ? dayTasks.filter((item) => item.done)
          : dayTasks;

    return [...filtered].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return a.createdAt - b.createdAt;
    });
  }, [dayTasks, filter]);

  const selectedDate =
    days.find((day) => dateKey(day) === selectedKey) ?? today;
  const progressLabel =
    selectedKey === todayKey
      ? "Today's progress"
      : `${WEEKDAYS[selectedDate.getDay()]}'s progress`;

  function openCreate() {
    setTitle("");
    setNote("");
    setPriority("medium");
    setError("");
    setModalOpen(true);
  }

  function closeCreate() {
    setModalOpen(false);
  }

  function addTodo() {
    const nextTitle = title.trim();
    if (!nextTitle) {
      setError("Add a title to save this task.");
      return;
    }

    setTodos((current) => [
      {
        id: `${Date.now()}`,
        title: nextTitle,
        note: note.trim(),
        done: false,
        createdAt: Date.now(),
        dueDate: selectedKey,
        priority,
      },
      ...current,
    ]);
    setModalOpen(false);
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function confirmDelete(item: Todo) {
    Alert.alert("Delete task", `Delete “${item.title}”?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setTodos((current) => current.filter((todo) => todo.id !== item.id)),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <HeaderContentNew
        title="My Tasks"
        leftIcon="menu-2-fill"
        rightIcon="notification-3-fill"
        rightIconPress={() => navigation.navigate("notifications")}
      />

      <View style={styles.progress}>
        <Text style={styles.progressLabel}>{progressLabel}</Text>
        <Text style={styles.progressValue}>
          {doneCount} of {dayTasks.length} tasks done
        </Text>
        <View style={styles.track}>
          <View
            style={[styles.fill, { width: `${Math.round(progress * 100)}%` }]}
          />
        </View>
      </View>

      <View style={styles.dayRow}>
        {days.map((day) => {
          const key = dateKey(day);
          const active = key === selectedKey;
          return (
            <Pressable
              key={key}
              style={[styles.dayChip, active && styles.dayChipOn]}
              onPress={() => setSelectedKey(key)}
            >
              <Text style={[styles.dayName, active && styles.dayNameOn]}>
                {WEEKDAY_SHORT[day.getDay()]}
              </Text>
              <Text style={[styles.dayNum, active && styles.dayNumOn]}>
                {day.getDate()}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.filters}>
        {FILTERS.map((item) => {
          const active = item.key === filter;
          return (
            <Pressable
              key={item.key}
              style={[styles.priorityChip, active && styles.priorityChipOn]}
              onPress={() => setFilter(item.key)}
            >
              <Text
                style={[
                  styles.priorityChipText,
                  active && styles.priorityChipTextOn,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No tasks for this day</Text>
            <Text style={styles.emptyText}>Tap + to add one.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const badge = badgeStyle(item);
          return (
            <Pressable
              style={[styles.card, { borderLeftColor: accentColor(item) }]}
              onLongPress={() => confirmDelete(item)}
            >
              <Pressable
                style={[styles.check, item.done && styles.checkOn]}
                onPress={() => toggleTodo(item.id)}
                hitSlop={8}
              >
                {item.done ? (
                  <Feather name="check" size={14} color={COLORS.primary} />
                ) : null}
              </Pressable>
              <View style={styles.cardBody}>
                <View style={styles.titleRow}>
                  <Text
                    style={[
                      styles.cardTitle,
                      item.done && styles.cardTitleDone,
                    ]}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                    <Text style={[styles.badgeText, { color: badge.color }]}>
                      {badge.label}
                    </Text>
                  </View>
                </View>
                {item.note ? (
                  <Text style={styles.cardNote} numberOfLines={1}>
                    {item.note}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        }}
      />

      <Pressable style={styles.fab} onPress={openCreate}>
        <Feather name="plus" size={scaleFont(26)} color={COLORS.white} />
      </Pressable>

      <Modal
        visible={modalOpen}
        transparent
        animationType="fade"
        onRequestClose={closeCreate}
      >
        <KeyboardAvoidingView
          style={styles.modalRoot}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Pressable style={styles.backdrop} onPress={closeCreate} />
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>New task</Text>
            <Text style={styles.sheetHint}>
              Added to {headerDate(selectedDate)}
            </Text>

            <Text style={styles.label}>Title</Text>
            <TextInput
              value={title}
              onChangeText={(value) => {
                setTitle(value);
                if (error) setError("");
              }}
              placeholder="What needs to be done?"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              maxLength={80}
              autoFocus
            />

            <Text style={styles.label}>Details</Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Ananya, 27 · Chennai"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              maxLength={80}
            />

            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityRow}>
              {PRIORITIES.map((item) => {
                const active = item.key === priority;
                return (
                  <Pressable
                    key={item.key}
                    style={[
                      styles.priorityChip,
                      active && styles.priorityChipOn,
                    ]}
                    onPress={() => setPriority(item.key)}
                  >
                    <Text
                      style={[
                        styles.priorityChipText,
                        active && styles.priorityChipTextOn,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.actions}>
              <Pressable style={styles.cancelBtn} onPress={closeCreate}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveBtn} onPress={addTodo}>
                <Text style={styles.saveText}>Add task</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
