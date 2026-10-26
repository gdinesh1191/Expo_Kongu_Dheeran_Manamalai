import Attendance from "@/pages/attendance";
import Chat from "@/pages/chat";
import DownlodProfile from "@/pages/DownlodProfile";
import Home from "@/pages/Home";
import LikedProfiles from "@/pages/LikedProfiles";
import LoginPage from "@/pages/login";
import MyProfile from "@/pages/myProfile";
import Network from "@/pages/NetworkScreen";
import PermissionScreen from "@/pages/PermissionScreen";
import ProfilePage from "@/pages/profile";
import ProfileDetails from "@/pages/ProfileDetails";
import SendOtpPage from "@/pages/sendOtp";
import TodoPage from "@/pages/todo";
import VerificationScreen from "@/pages/VerificationScreen";
import VerifyOtpPage from "@/pages/verifyOtp";
import Webview from "@/pages/Webview";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MainStack = createNativeStackNavigator();
export default function MainNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Login"}
    >
      <MainStack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
      />
      <MainStack.Screen name="Webview" component={Webview} />
      <MainStack.Screen name="Network" component={Network} />
      <MainStack.Screen name="PermissionScreen" component={PermissionScreen} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Profile" component={ProfilePage} />
      <MainStack.Screen name="ProfileDetails" component={ProfileDetails} />
      <MainStack.Screen name="DownlodProfile" component={DownlodProfile} />
      <MainStack.Screen name="MyProfile" component={MyProfile} />
      <MainStack.Screen name="LikedProfiles" component={LikedProfiles} />
      <MainStack.Screen name="Login" component={LoginPage} />
      <MainStack.Screen name="SendOtp" component={SendOtpPage} />
      <MainStack.Screen name="VerifyOtp" component={VerifyOtpPage} />
      <MainStack.Screen name="Todo" component={TodoPage} />
      <MainStack.Screen name="Attendance" component={Attendance} />
      <MainStack.Screen name="Chat" component={Chat} />
    </MainStack.Navigator>
  );
}
