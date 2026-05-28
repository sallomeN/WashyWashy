import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { isLoggedIn } from "../services/authService";
import { useTheme } from "../context/ThemeContext";

export default function Index() {
  const router = useRouter();
  const { colors } = useTheme();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
      router.replace("/(tabs)/(home)");
    } else {
      router.replace("/auth/LogIn");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
