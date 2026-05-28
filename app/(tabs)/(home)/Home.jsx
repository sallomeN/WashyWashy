import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../../context/ThemeContext";
import { logoutUser } from "../../../services/authService";

export default function Home() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/auth/LogIn");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Welcome to WashyWashy 
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        You are logged in!
      </Text>

      <TouchableOpacity
        style={[styles.logoutBtn, { backgroundColor: colors.primary }]}
        onPress={handleLogout}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 40,
  },
  logoutBtn: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
});
