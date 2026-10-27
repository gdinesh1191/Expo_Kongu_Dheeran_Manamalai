import { scaleFont } from "@/constants/ScaleFont";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { styles } from "./style";

export default function PermissionScreen() {
  const navigation = useNavigation<any>();

  //   useEffect(()=>{
  // checkPermission
  //   },[])

  async function checkPermission() {
    const isAndroid10OrAbove =
      Platform.OS === "android" && Number(Platform.Version) >= 29; // Android 10 (API level 29) or above

    try {
      if (Platform.OS === "android") {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        const allGranted = result === PermissionsAndroid.RESULTS.GRANTED;

        if (!allGranted) {
          Alert.alert(
            "Permission Required",
            "Without permission you cannot access the app.",
            [
              {
                text: "Open Settings",
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        } else {
          navigation.navigate("Webview");
        }
      }
    } catch (err) {
      console.warn(err);
      Alert.alert("Error", "Failed to request permissions");
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/Images/permission.png")}
      style={styles.ImageBackground}
      resizeMode="cover"
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ marginTop: scaleFont(120) }}>
          <Image
            source={require("../../assets/Images/Logo1.png")}
            style={styles.Logo}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text1}>Permission Needed</Text>
          <Text style={styles.text2}>
            Please allow the app to function properly by granting the required
            permissions. Thanks!
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Pressable style={styles.btn} onPress={() => checkPermission()}>
            <Text style={styles.btnText}>Allow</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
