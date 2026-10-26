import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const screenHeight = Dimensions.get("window").height;
const SIDEBAR_WIDTH = 300;

export default function SidebarModalContent({
  slideX,
  closeSidebar,
  navigation,
}: {
  slideX: Animated.Value;
  closeSidebar: () => void;
  navigation: any;
}) {
  const insets = useSafeAreaInsets();
  const handleNavigationClick = (path?: string) => {
    // close everything
    closeSidebar();
    if (path) {
      navigation.navigate(path);
    }
  };

  const handleLogout = () => {
    // signOut();
  };

  return (
    <>
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={closeSidebar} />

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            top:
              Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) : 44,
            bottom: Platform.OS === "android" ? insets.bottom : 0,
            paddingBottom: screenHeight * 0.02,
            transform: [{ translateX: slideX }],
          },
        ]}
        accessibilityLabel="Main sidebar navigation"
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Logo/Brand */}
          <View style={styles.logoBox}>
            {/* Profile Image */}
            <Image
              source={require("../../assets/Images/Logo.png")}
              style={{ width: "90%", height: "90%" }}
              resizeMode="contain"
            />
          </View>
          {/* User Profile */}
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Image
                source={require("../../assets/Images/profile.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Shreya</Text>
              <Text style={styles.profileRole}>Senior HR Manager</Text>
            </View>
          </View>
          {/* Search Bar */}
          <View style={styles.searchWrap}>
            <View
              style={[
                styles.searchBar,
                Platform.OS === "ios" && styles.searchBarIos,
              ]}
            >
              <RemixIcon name="search-line" size={18} color="#737477ff" />
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#4B5563"
                style={[
                  styles.searchInput,
                  Platform.OS === "ios"
                    ? styles.searchInputIos
                    : styles.searchInputAndroid,
                ]}
              />
            </View>
          </View>
        </View>
        {/* Navigation Menu */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.flex}>
          <View style={styles.menu}>
            {/* <Pressable
              style={styles.menuItem}
              onPress={() => handleNavigationClick("Home")}
            >
              <RemixIcon name="home-4-line" size={22} color="#5C6674" />
              <Text style={styles.menuText}>Home</Text>
            </Pressable> */}
            {/* Expense */}
            <Pressable
              style={styles.menuItem}
              onPress={() => handleNavigationClick("Attendance")}
            >
              <RemixIcon name="calendar-check-line" size={22} color="#5C6674" />
              <Text style={styles.menuText}>Attendance</Text>
            </Pressable>
            {/* Receipt */}
            <Pressable
              style={styles.menuItem}
              onPress={() => handleNavigationClick("Chat")}
            >
              <RemixIcon name="chat-3-line" size={22} color="#5C6674" />
              <Text style={styles.menuText}>Chat</Text>
            </Pressable>

            {/* Payment */}
            <Pressable
              style={styles.menuItem}
              onPress={() => handleNavigationClick("Todo")}
            >
              <RemixIcon name="todo-line" size={22} color="#5C6674" />
              <Text style={styles.menuText}>To-Do</Text>
            </Pressable>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Pressable style={[styles.footerItem, styles.footerItemSpacing]}>
            <RemixIcon name="question-line" size={22} color="#2563EB" />
            <Text style={styles.menuText}>Help & Information</Text>
          </Pressable>
          {/* Logout */}
          <Pressable style={styles.footerItem} onPress={handleLogout}>
            <RemixIcon name="logout-box-r-line" size={22} color="#DC2626" />
            <Text style={styles.menuText}>Log Out</Text>
          </Pressable>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  header: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  logoBox: {
    flexDirection: "row",
    width: 160,
    height: 80,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    marginRight: 12,
  },
  profileInfo: { flex: 1 },
  profileName: {
    color: "#111827",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 28,
  },
  profileRole: {
    color: "#4B5563",
    fontSize: 16,
    lineHeight: 24,
  },

  searchWrap: {
    marginTop: 24,
    marginBottom: 8,
    position: "relative",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchBarIos: { paddingVertical: 8 },
  searchInput: {
    flex: 1,
    color: "#111827",
    fontSize: 16,
    lineHeight: 24,
  },
  searchInputIos: { marginLeft: 8, paddingBottom: 4 },
  searchInputAndroid: { marginLeft: 4 },

  menu: { paddingHorizontal: 16 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  menuText: {
    color: "#111827",
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "500",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    paddingHorizontal: 16,
    marginTop: 16,
    paddingVertical: 8,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  footerItemSpacing: { marginBottom: 4 },
});
