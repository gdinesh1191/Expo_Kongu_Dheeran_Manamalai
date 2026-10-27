import HeaderContentNew from "@/components/HeaderContent/HeaderContentNew";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BackHandler,
  FlatList,
  ImageBackground,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";
import { AVATAR_TINTS, chatStyles, COLORS, listStyles } from "./style";

type Contact = {
  id: string;
  name: string;
  role: string;
  online: boolean;
  lastMessage: string;
  time: string;
  unread: number;
};

type ChatMessage = {
  id: string;
  kind: "message";
  from: "me" | "them";
  text: string;
  time: string;
  read?: boolean;
};

type DayMarker = {
  id: string;
  kind: "day";
  label: string;
};

type ChatItem = ChatMessage | DayMarker;

/* ---------- sample data (replace with your API / socket) ---------- */

const CHAT_BG = require("../../assets/Images/chat-bg.png");

const CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Murugan",
    role: "Supervisor",
    online: true,
    lastMessage: "Noted. I will update your OT today.",
    time: "10:20 AM",
    unread: 2,
  },
  {
    id: "2",
    name: "Priya",
    role: "HR Manager",
    online: true,
    lastMessage: "Please share your leave form by evening.",
    time: "09:45 AM",
    unread: 1,
  },
  {
    id: "3",
    name: "Suresh",
    role: "Accounts",
    online: false,
    lastMessage: "Salary slip has been sent to your email.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "4",
    name: "Divya",
    role: "Team Lead",
    online: true,
    lastMessage: "Meeting at 4 PM in the conference room.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "5",
    name: "Arun",
    role: "Project Manager",
    online: false,
    lastMessage: "Thanks, the report looks good.",
    time: "Mon",
    unread: 0,
  },
  {
    id: "6",
    name: "Kavitha",
    role: "Admin",
    online: false,
    lastMessage: "Your ID card is ready for pickup.",
    time: "Sun",
    unread: 0,
  },
];

// Small sample conversation for whoever you tap in the list.
function buildConversation(contact: Contact): ChatItem[] {
  return [
    { id: "d1", kind: "day", label: "Yesterday" },
    {
      id: "m1",
      kind: "message",
      from: "them",
      text: `Hi Karthick, this is ${contact.name} from ${contact.role}.`,
      time: "09:05 AM",
    },
    {
      id: "m2",
      kind: "message",
      from: "me",
      text: "Hello, how can I help you?",
      time: "09:07 AM",
      read: true,
    },
    { id: "d2", kind: "day", label: "Today" },
    {
      id: "m3",
      kind: "message",
      from: "them",
      text: contact.lastMessage,
      time: contact.time === "Yesterday" ? "10:20 AM" : contact.time,
    },
  ];
}

/* ---------- helpers ---------- */

function formatTime(d: Date) {
  const h = d.getHours();
  const hh = String(h % 12 || 12).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm} ${h >= 12 ? "PM" : "AM"}`;
}

function tintFor(id: string) {
  const n = parseInt(id, 10);
  return AVATAR_TINTS[(Number.isNaN(n) ? 0 : n) % AVATAR_TINTS.length];
}

/* =====================================================
   Screen 1: list of people
   ===================================================== */

function ContactCard({
  item,
  onPress,
}: {
  item: Contact;
  onPress: () => void;
}) {
  const hasUnread = item.unread > 0;
  const tint = tintFor(item.id);

  return (
    <Pressable
      style={[listStyles.card, hasUnread && listStyles.cardUnread]}
      onPress={onPress}
    >
      <View>
        <View style={[listStyles.avatar, { backgroundColor: tint.bg }]}>
          <Text style={[listStyles.avatarText, { color: tint.fg }]}>
            {item.name.charAt(0)}
          </Text>
        </View>
        {item.online && <View style={listStyles.onlineDot} />}
      </View>

      <View style={listStyles.cardBody}>
        <View style={listStyles.cardTop}>
          <Text style={listStyles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[listStyles.time, hasUnread && listStyles.timeUnread]}>
            {item.time}
          </Text>
        </View>
        <View style={listStyles.roleChip}>
          <Text style={listStyles.role}>{item.role}</Text>
        </View>

        <View style={listStyles.cardBottom}>
          <Text
            style={[
              listStyles.lastMessage,
              hasUnread && listStyles.lastMessageUnread,
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {hasUnread && (
            <View style={listStyles.unreadBadge}>
              <Text style={listStyles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

function PeopleList({
  contacts,
  onOpen,
}: {
  contacts: Contact[];
  onOpen: (c: Contact) => void;
}) {
  const [query, setQuery] = useState("");

  const unreadTotal = useMemo(
    () => contacts.reduce((sum, c) => sum + c.unread, 0),
    [contacts],
  );
  const onlineContacts = useMemo(
    () => contacts.filter((c) => c.online),
    [contacts],
  );

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts.filter((c) => {
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
      );
    });
  }, [contacts, query]);

  return (
    <View style={listStyles.container}>
      <HeaderContentNew
        title="Messages"
        leftIcon="menu-2-fill"
        rightIcon="notification-3-fill"
        rightIconPress={() => navigation.navigate("notifications")}
      />
      {/* Header */}
      {/* <View style={listStyles.header}>
        <View>
          <Text style={listStyles.title} numberOfLines={1}>
            Messages
          </Text>
          <Text style={listStyles.subtitle}>
            {unreadTotal > 0
              ? `${unreadTotal} unread messages`
              : "You're all caught up"}
          </Text>
        </View>
        <Pressable style={listStyles.roundBtn} >
          <RemixIcon name="notification-3-line" size={20} color={COLORS.text} />
          {unreadTotal > 0 && <View style={listStyles.bellDot} />}
        </Pressable>
      </View> */}

      {/* Search */}
      <View style={listStyles.searchBox}>
        <RemixIcon name="search-line" size={18} color={COLORS.muted} />
        <TextInput
          style={listStyles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search name or role"
          placeholderTextColor={COLORS.muted}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")}>
            <RemixIcon name="close-line" size={18} color={COLORS.muted} />
          </Pressable>
        )}
      </View>

      {/* Online now */}
      {query.length === 0 && onlineContacts.length > 0 && (
        <View style={listStyles.onlineSection}>
          <Text style={listStyles.sectionLabel}>Online now</Text>
          <FlatList
            horizontal
            data={onlineContacts}
            keyExtractor={(c) => c.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={listStyles.onlineRow}
            renderItem={({ item }) => {
              const tint = tintFor(item.id);
              return (
                <Pressable
                  style={listStyles.onlineItem}
                  onPress={() => onOpen(item)}
                >
                  <View style={listStyles.onlineRing}>
                    <View
                      style={[
                        listStyles.onlineAvatar,
                        { backgroundColor: tint.bg },
                      ]}
                    >
                      <Text style={[listStyles.avatarText, { color: tint.fg }]}>
                        {item.name.charAt(0)}
                      </Text>
                    </View>
                  </View>
                  <Text style={listStyles.onlineName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      )}

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <ContactCard item={item} onPress={() => onOpen(item)} />
        )}
        contentContainerStyle={listStyles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={listStyles.empty}>No chats found</Text>
        }
      />
    </View>
  );
}

/* =====================================================
   Screen 2: chat room
   ===================================================== */

function DayChip({ label }: { label: string }) {
  return (
    <View style={chatStyles.dayWrap}>
      <View style={chatStyles.dayChip}>
        <Text style={chatStyles.dayText}>{label}</Text>
      </View>
    </View>
  );
}

function Bubble({ item }: { item: ChatMessage }) {
  const mine = item.from === "me";

  return (
    <View
      style={[chatStyles.row, mine ? chatStyles.rowMe : chatStyles.rowThem]}
    >
      <View
        style={[
          chatStyles.bubble,
          mine ? chatStyles.bubbleMe : chatStyles.bubbleThem,
        ]}
      >
        <Text
          style={[
            chatStyles.messageText,
            mine ? chatStyles.messageTextMe : chatStyles.messageTextThem,
          ]}
        >
          {item.text}
        </Text>
        <View style={chatStyles.metaRow}>
          <Text
            style={[
              chatStyles.timeText,
              mine ? chatStyles.timeMe : chatStyles.timeThem,
            ]}
          >
            {item.time}
          </Text>
          {mine && (
            <RemixIcon
              name={item.read ? "check-double-line" : "check-line"}
              size={15}
              color="rgba(255,255,255,0.9)"
            />
          )}
        </View>
      </View>
    </View>
  );
}

function ChatRoom({
  contact,
  items,
  onSend,
  onBack,
}: {
  contact: Contact;
  items: ChatItem[];
  onSend: (text: string) => void;
  onBack: () => void;
}) {
  const listRef = useRef<FlatList<ChatItem>>(null);
  const [draft, setDraft] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const tint = tintFor(contact.id);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSub = Keyboard.addListener(showEvent, (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (keyboardHeight === 0) return;
    const timer = setTimeout(
      () => listRef.current?.scrollToEnd({ animated: true }),
      50,
    );
    return () => clearTimeout(timer);
  }, [keyboardHeight]);

  const keyboardLift = keyboardHeight > 0 ? keyboardHeight : 0;

  const send = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value) return;
      onSend(value);
      setDraft("");
    },
    [onSend],
  );

  const canSend = draft.trim().length > 0;

  return (
    <View style={chatStyles.container}>
      {/* Header */}
      <View style={chatStyles.header}>
        <View style={chatStyles.headerLeft}>
          <Pressable style={chatStyles.roundBtn} onPress={onBack}>
            <RemixIcon name="arrow-left-line" size={20} color={COLORS.text} />
          </Pressable>

          <View>
            <View style={[chatStyles.avatar, { backgroundColor: tint.bg }]}>
              <Text style={[chatStyles.avatarText, { color: tint.fg }]}>
                {contact.name.charAt(0)}
              </Text>
            </View>
            {contact.online && <View style={chatStyles.onlineDot} />}
          </View>

          <View>
            <Text style={chatStyles.contactName} numberOfLines={1}>
              {contact.name}
            </Text>
            <Text
              style={[
                chatStyles.contactStatus,
                contact.online && chatStyles.contactStatusOnline,
              ]}
              numberOfLines={1}
            >
              {contact.online ? "Online" : contact.role}
            </Text>
          </View>
        </View>
      </View>

      <View style={[chatStyles.flex, { paddingBottom: keyboardLift }]}>
        {/* Messages sit on the doodle background */}
        <ImageBackground
          source={CHAT_BG}
          style={chatStyles.chatBg}
          resizeMode="cover"
        >
          <FlatList
            ref={listRef}
            data={items}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) =>
              item.kind === "day" ? (
                <DayChip label={item.label} />
              ) : (
                <Bubble item={item} />
              )
            }
            contentContainerStyle={chatStyles.listContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              listRef.current?.scrollToEnd({ animated: true })
            }
          />

          {/* Floating input bar */}
          <View style={chatStyles.inputBar}>
            <Pressable style={chatStyles.attachBtn}>
              <RemixIcon name="attachment-2" size={19} color={COLORS.primary} />
            </Pressable>

            <View style={chatStyles.inputWrap}>
              <TextInput
                style={chatStyles.input}
                value={draft}
                onChangeText={setDraft}
                placeholder="Type a message"
                placeholderTextColor={COLORS.muted}
                multiline
              />
            </View>

            <Pressable
              style={[
                chatStyles.sendBtn,
                !canSend && chatStyles.sendBtnDisabled,
              ]}
              onPress={() => send(draft)}
              disabled={!canSend}
            >
              <RemixIcon
                name="send-plane-fill"
                size={18}
                color={COLORS.white}
              />
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

/* =====================================================
   One page: shows the list, or the chat of the person you tapped
   ===================================================== */

export default function Chat() {
  const [contacts, setContacts] = useState<Contact[]>(CONTACTS);
  const [threads, setThreads] = useState<Record<string, ChatItem[]>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = contacts.find((c) => c.id === selectedId) ?? null;

  // Android back button: from a chat go back to the list instead of leaving the page.
  useEffect(() => {
    if (!selectedId) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      setSelectedId(null);
      return true;
    });
    return () => sub.remove();
  }, [selectedId]);

  const openChat = useCallback((c: Contact) => {
    // TODO: load this person's messages from your API here.
    setThreads((prev) =>
      prev[c.id] ? prev : { ...prev, [c.id]: buildConversation(c) },
    );
    setContacts((prev) =>
      prev.map((x) => (x.id === c.id ? { ...x, unread: 0 } : x)),
    );
    setSelectedId(c.id);
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      if (!selectedId) return;
      // TODO: send the message to your API / socket here.
      const time = formatTime(new Date());
      setThreads((prev) => ({
        ...prev,
        [selectedId]: [
          ...(prev[selectedId] ?? []),
          { id: String(Date.now()), kind: "message", from: "me", text, time },
        ],
      }));
      setContacts((prev) =>
        prev.map((x) =>
          x.id === selectedId ? { ...x, lastMessage: text, time } : x,
        ),
      );
    },
    [selectedId],
  );

  if (selected) {
    return (
      <ChatRoom
        key={selected.id}
        contact={selected}
        items={threads[selected.id] ?? []}
        onSend={sendMessage}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return <PeopleList contacts={contacts} onOpen={openChat} />;
}
