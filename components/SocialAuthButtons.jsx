import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import AuthButton from "./AuthButton";

// importing appleIcon and googleIcon SVG components from Figma
export default function SocialAuthButtons({
  type = "login",
  appleIcon,
  googleIcon,
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <View style={[styles.line, { backgroundColor: colors.divider }]} />
        <Text style={[styles.orText, { color: colors.textMuted }]}>
          {t(type === "login" ? "login.or" : "register.or")}
        </Text>
        <View style={[styles.line, { backgroundColor: colors.divider }]} />
      </View>

      <AuthButton
        title={t(type === "login" ? "login.apple" : "register.apple")}
        onPress={() => console.log("Apple auth")}
        variant="apple"
        icon={appleIcon}
      />

      <AuthButton
        title={t(type === "login" ? "login.google" : "register.google")}
        onPress={() => console.log("Google auth")}
        variant="google"
        icon={googleIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 4 },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  line: { flex: 1, height: 1 },
  orText: { marginHorizontal: 12, fontSize: 13 },
});
