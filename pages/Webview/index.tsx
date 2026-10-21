import { postUserDetails } from "@/hooks/api/postUserDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import * as StoreReview from "expo-store-review";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  BackHandler,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  View,
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { WebView } from "react-native-webview";
import { styles } from "./style";
// Razorpay Checkout detects Android WebView from the user agent
// ("; wv)" token and "Version/4.0") and hides UPI apps/intent in that case.
// Present the WebView as a regular Chrome browser so UPI options are shown.
const browserLikeUserAgent = (ua?: string) => {
  console.log("ua", ua);
  const fallback =
    "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";
  if (!ua) return fallback;
  return ua
    .replace("; wv)", ")")
    .replace(/\s?Version\/\d+\.\d+/i, "")
    .trim();
};

export default function Webview() {
  const webViewRef = useRef<any>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const lastBackPressRef = useRef(0);
  const navigation = useNavigation<any>();
  const [AndroidID, setAndroidID] = useState("");
  const [subscriptionID, setsubscriptionID] = useState<string | null>(null);
  const canGoBackRef = useRef(false);

  const [appOpenCount, setAppOpenCount] = useState(0);
  const lastReviewRequest = useRef<number>(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [browserUserAgent, setBrowserUserAgent] = useState<string | null>(null);
  const hasPostedRef = useRef(false);
  const checkNetworkStatus = () => {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        navigation.navigate("Network"); // Navigate to network error page
      }
    });
  };

  useEffect(() => {
    checkPermissions();
    getId();
    getAllDeviceInfo();
  }, []);

  useEffect(() => {
    if (subscriptionID && deviceInfo?.subscriptionID !== subscriptionID) {
      setDeviceInfo((prev: any) => ({ ...prev, subscriptionID }));
    }
  }, [subscriptionID, deviceInfo]);

  useEffect(() => {
    if (deviceInfo?.subscriptionID && !hasPostedRef.current) {
      hasPostedRef.current = true;
      postDeviceInfo();
    }
  }, [deviceInfo]);

  const checkPermissions = async () => {
    const isAndroid10OrAbove =
      Platform.OS === "android" && Number(Platform.Version) > 31;

    if (isAndroid10OrAbove) {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (!granted) {
        navigation.navigate("PermissionScreen");
      }
    }
  };

  const postDeviceInfo = async () => {
    try {
      const details = await postUserDetails(deviceInfo);
      console.log("details", details);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDeviceInfo = async () => {
    try {
      const [
        androidApiLevel,
        androidID,
        brand,
        systemName,
        systemVersion,
        applicationBuildVersion,
        operatorName,
        device,
        deviceID,
        deviceName,
        fontScale,
        hardware,
        ipAddress,
        macAddress,
        manufacturer,
        modal,
        productName,
        applicationVersion,
        userAgent,
      ] = await Promise.all([
        DeviceInfo.getApiLevel(),
        DeviceInfo.getAndroidId(),
        DeviceInfo.getBrand(),
        DeviceInfo.getSystemName(),
        DeviceInfo.getSystemVersion(),
        DeviceInfo.getBuildNumber(),
        DeviceInfo.getCarrier(),
        DeviceInfo.getDevice(),
        DeviceInfo.getDeviceId(),
        DeviceInfo.getDeviceName(),
        DeviceInfo.getFontScale(),
        DeviceInfo.getHardware(),
        DeviceInfo.getIpAddress(),
        DeviceInfo.getMacAddress(),
        DeviceInfo.getManufacturer(),
        DeviceInfo.getModel(),
        DeviceInfo.getProduct(),
        DeviceInfo.getVersion(),
        DeviceInfo.getUserAgent(),
      ]);
      const deviceInfo = {
        androidApiLevel,
        androidID,
        brand,
        systemName,
        systemVersion,
        applicationBuildVersion,
        operatorName,
        device,
        deviceID,
        deviceName,
        fontScale,
        hardware,
        ipAddress,
        macAddress,
        manufacturer,
        modal,
        productName,
        applicationVersion,
        userAgent,
      };
      console.log("deviceInfo", deviceInfo);
      setDeviceInfo(deviceInfo);
      // build the browser-like user agent once, as soon as device info is loaded
      setBrowserUserAgent(browserLikeUserAgent(deviceInfo.userAgent));
    } catch (error) {
      console.error("Error getting device info:", error);
    }
  };

  const checkAndRequestReview = async () => {
    console.log(appOpenCount);

    try {
      // Only request review if:
      // 1. The app has been opened at least 5 times
      // 2. It's been at least 7 days since the last review request
      // 3. The device is capable of showing the review dialog
      const now = Date.now();
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

      if (
        appOpenCount === 5 &&
        (await StoreReview.hasAction()) &&
        (await StoreReview.isAvailableAsync())
      ) {
        await StoreReview.requestReview();
        lastReviewRequest.current = now;
      }
    } catch (error) {
      console.log("Error requesting review:", error);
    }
  };
  async function getId() {
    const id = await AsyncStorage.getItem("subscriptionId");
    console.log(id);
    setsubscriptionID(id);
  }

  useEffect(() => {
    // Handle hardware back press for moving previous page and exit the app

    const reviewSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          // App has come to the foreground
          setAppOpenCount((prev) => prev + 1);
          checkAndRequestReview();
        }

        setAppState(nextAppState);
      },
    );

    return () => {
      reviewSubscription.remove();
      // Remove event listener when component unmounts
    };
  }, [appOpenCount, appState]);

  useEffect(() => {
    const backAction = () => {
      console.log("canGoBackRef.current:", canGoBackRef.current);
      if (canGoBackRef.current && webViewRef.current) {
        webViewRef.current.goBack();
        lastBackPressRef.current = 0; // Reset timer when going back in WebView
        return true;
      }

      const now = Date.now();
      if (lastBackPressRef.current && now - lastBackPressRef.current < 2000) {
        console.log("Exiting app");
        BackHandler.exitApp(); // exit app on second press
        console.log("Exiting app 2");
        return true;
      }
      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
      lastBackPressRef.current = now;
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const parseIntentUrl = (url: string) => {
    // intent://pay?pa=...#Intent;scheme=upi;package=com.xxx;end
    const m = url.match(/^intent:\/\/(.*?)#Intent;(.*)$/i);
    if (!m) return null;
    const scheme = /scheme=([^;]+)/.exec(m[2])?.[1] ?? "https";
    return `${scheme}://${m[1]}`;
  };

  const handleNavigation = (request: { url: string }) => {
    const { url } = request;

    if (/^(upi|tez|phonepe|paytmmp|gpay|credpay|bhim|amazonpay):/i.test(url)) {
      Linking.openURL(url).catch(() =>
        Alert.alert(
          "Payment app unavailable",
          "Please try another payment method.",
        ),
      );
      return false;
    }

    if (/^intent:/i.test(url)) {
      const target = parseIntentUrl(url);
      if (target) Linking.openURL(target).catch(() => {});
      return false;
    }

    return true;
  };

  // wait until device info is ready so the WebView loads with the final UA
  if (!deviceInfo || !browserUserAgent) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  // Razorpay decides from the HTTP User-Agent header, so the browser-like
  // value must be part of the WebView userAgent.
  const userAgent = `${deviceInfo?.applicationBuildVersion}/infogreen-c-app/${deviceInfo?.androidID}/${subscriptionID}/${browserUserAgent}`;

  return (
    <>
      {/* here i am checking the user status for getting the link from api if user status is pending the api doesn't provide the link that case it navigate to bending screen once the status is success it will provid the link and user navigate to webview  */}

      <WebView
        userAgent={userAgent}
        source={{
          uri: "https://user.kongudheeranmanamalai.com/auth-login.php",
        }}
        startInLoadingState
        renderLoading={() => (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={false}
        incognito={false}
        pullToRefreshEnabled={false}
        showsVerticalScrollIndicator={false}
        ref={webViewRef}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          canGoBackRef.current = navState.canGoBack; // keep latest value
        }}
        textZoom={100}
        onShouldStartLoadWithRequest={handleNavigation}
        originWhitelist={["*"]}
        onError={(e) => {
          const { description } = e.nativeEvent;
          console.warn("WebView Error:", description);
          if (description === "net::ERR_INTERNET_DISCONNECTED") {
            navigation.navigate("Network");
          } else {
            Alert.alert("Page Load Error", description, [
              { text: "Retry", onPress: () => webViewRef.current?.reload() },
            ]);
          }
        }}
      />
    </>
  );
}
