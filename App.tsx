import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CommonActions,
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Text, TextInput, useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogLevel, OneSignal } from "react-native-onesignal";
import "react-native-reanimated";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthProvider } from "./app/AuthContext";
import MainNavigator from "./app/MainNavigator";
import { LikedProfilesProvider } from "./context/LikedProfilesContext";

// You can remove this if you don't need to wait for any assets
// SplashScreen.preventAutoHideAsync();

// Disable system font scaling globally to ensure consistent typography
// across devices; use scale utilities for predictable sizing
if ((Text as any).defaultProps == null) (Text as any).defaultProps = {};
(Text as any).defaultProps.allowFontScaling = false;
(Text as any).defaultProps.maxFontSizeMultiplier = 1;
if ((TextInput as any).defaultProps == null)
  (TextInput as any).defaultProps = {};
(TextInput as any).defaultProps.allowFontScaling = false;
(TextInput as any).defaultProps.maxFontSizeMultiplier = 1;

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Root />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function Root() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const navigationRef = useRef<any>(null);

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize("0e92107b-915a-41d3-9570-bb3d3430ab72");
    // OneSignal.Notifications.requestPermission(true);
    OneSignal.User.pushSubscription
      .getIdAsync()
      .then((subscriptionId: any) => {
        AsyncStorage.setItem("subscriptionId", subscriptionId);
        // You can use this ID to identify the user or send it to your server
      })
      .catch((error) => {
        console.log("Failed to get subscription ID:", error);
      });
    OneSignal.Notifications.addEventListener("click", (event: any) => {
      const navigationData = event.notification.additionalData.navigation;
      const userId = event.notification.additionalData.userId;
      const sessionId = event.notification.additionalData.sessionID;
      const URL = event.notification.additionalData.url;
      const Name = event.notification.additionalData.UserName;
      if (navigationData && navigationData.screen) {
        const { screen } = navigationData;
        navigateToScreen(screen, userId, sessionId, URL, Name);
      } else {
        console.log("Navigation data is missing or incomplete.");
      }
    });
  }, []);

  const navigateToScreen = (
    screenName: any,
    userId: any,
    sessionId: any,
    URL: any,
    Name: any,
  ) => {
    const navigation = navigationRef.current;
    if (navigation) {
      navigation.dispatch(CommonActions.navigate(screenName));
      navigation.navigate("VerificationScreen", {
        userId,
        sessionId,
        URL,
        Name,
      });
    } else {
      console.error("Navigation object is undefined.");
    }
  };
  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "#0B9A0B", height: insets.top }} />
          <StatusBar style="light" />
          <LikedProfilesProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </LikedProfilesProvider>
          <View style={{ height: insets.bottom }} />
        </View>
      </ThemeProvider>
    </AuthProvider>
  );
}
