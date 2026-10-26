import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
    Animated,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SidebarModalContent from "./SidebarModalContent";

// If you still have a title context, you can pass pageTitle as a prop,
// or wire your own context. For now, accept it as prop.
type Props = {
  title?: string;
  path?: string;
  rightIcon?: string | any;
  leftIcon?: string | any;
  rightIconPress?: () => void;
  leftIconPress?: () => void;
  status?: boolean;
  onStatusChange?: (val: boolean) => void;
  toShowStatus?: boolean;
};
const SIDEBAR_WIDTH = 300;
export default function HeaderContentNew({
  title,
  path,
  rightIcon,
  leftIcon,
  rightIconPress,
  leftIconPress,
  status,
  onStatusChange,
  toShowStatus = false,
}: Props) {
  const navigation = useNavigation<any>();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const { pageTitle } = usePageTitle();

  // Slide animation for the sidebar
  const slideX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const openSidebar = () => {
    setSidebarOpen(true);
    Animated.timing(slideX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const closeSidebar = () => {
    Animated.timing(slideX, {
      toValue: -SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSidebarOpen(false);
    });
  };

  return (
    <>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.leftGroup}>
          <Pressable
            style={styles.iconButton}
            onPress={() => {
              if (leftIconPress) {
                leftIconPress();
              } else if (path === "goBack") {
                navigation.goBack();
              } else if (path) {
                navigation.navigate(path);
              } else if (leftIcon !== "arrow-left-s-line") {
                openSidebar();
              }
            }}
            accessibilityLabel="all"
          >
            <RemixIcon
              name={leftIcon || "menu-2-fill"}
              size={path ? 25 : 20}
              color="#374151"
            />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>
        {rightIcon && (
          <Pressable
            onPress={rightIconPress}
            style={styles.iconButton}
            accessibilityLabel="all"
          >
            {rightIcon && (
              <RemixIcon name={rightIcon} size={20} color="#374151" />
            )}
          </Pressable>
        )}
      </View>
      {/* Sidebar / Overlay */}
      <Modal
        transparent
        visible={sidebarOpen}
        animationType="none"
        onRequestClose={closeSidebar}
      >
        <SafeAreaProvider>
          <SidebarModalContent
            slideX={slideX}
            closeSidebar={closeSidebar}
            navigation={navigation}
          />
        </SafeAreaProvider>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E5E8",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    backgroundColor: "#F9FAFB",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
    color: "#111827",
  },
});
