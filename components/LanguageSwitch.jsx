import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { saveLanguage } from "../i18n";

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const { colors } = useTheme();
  const current = i18n.language;

  const toggle = (lang) => {
    if (lang !== current) saveLanguage(lang);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.langBg }]}>
      <TouchableOpacity
        style={[
          styles.btn,
          current === "ka" && { backgroundColor: colors.langActive },
        ]}
        onPress={() => toggle("ka")}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            {
              color:
                current === "ka"
                  ? colors.langActiveText
                  : colors.langInactiveText,
              fontWeight: current === "ka" ? "700" : "400",
            },
          ]}
        >
          კა
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.btn,
          current === "en" && { backgroundColor: colors.langActive },
        ]}
        onPress={() => toggle("en")}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            {
              color:
                current === "en"
                  ? colors.langActiveText
                  : colors.langInactiveText,
              fontWeight: current === "en" ? "700" : "400",
            },
          ]}
        >
          En
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 3,
    alignSelf: "flex-start",
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 17,
  },
  text: {
    fontSize: 13,
  },
});
