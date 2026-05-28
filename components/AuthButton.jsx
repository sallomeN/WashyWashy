import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function AuthButton({
  title,
  onPress,
  loading = false,
  variant = "primary", 
  icon: IconComponent,
  disabled = false,
}) {
  const { colors } = useTheme();

  const getStyle = () => {
    switch (variant) {
      case "apple":
        return {
          bg: colors.appleBg,
          text: colors.appleText,
          border: colors.appleBg,
        };
      case "google":
        return {
          bg: colors.googleBg,
          text: colors.googleText,
          border: colors.googleBorder,
        };
      default:
        return {
          bg: colors.buttonPrimary,
          text: colors.buttonPrimaryText,
          border: colors.buttonPrimary,
        };
    }
  };

  const s = getStyle();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: s.bg,
          borderColor: s.border,
          borderWidth: variant === "google" ? 1.5 : 0,
          opacity: disabled || loading ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={s.text} />
      ) : (
        <View style={styles.inner}>
          {IconComponent && (
            <View style={styles.icon}>
              <IconComponent size={18} color={s.text} />
            </View>
          )}
          <Text style={[styles.text, { color: s.text }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
