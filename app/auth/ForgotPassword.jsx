import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { forgotPasswordRequest } from "../../services/authService";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import LanguageSwitch from "../../components/LanguageSwitch";

// import EmailIcon from "../../assets/icons/EmailIcon";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email.trim()) {
      setError(t("errors.emailRequired"));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(t("errors.emailInvalid"));
      return;
    }

    setLoading(true);
    try {
      await forgotPasswordRequest(email.trim());
      setSent(true);
    } catch (err) {
      setError(err.message || t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <View
        style={[
          styles.successContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={styles.successIcon}>
          <Text style={{ fontSize: 48 }}>✉️</Text>
        </View>
        <Text style={[styles.successTitle, { color: colors.text }]}>
          {t("forgotPassword.success")}
        </Text>
        <Text style={[styles.successSub, { color: colors.textSecondary }]}>
          {t("forgotPassword.successSub")}
        </Text>
        <TouchableOpacity
          style={[styles.backButton, { borderColor: colors.primary }]}
          onPress={() => router.replace("/auth/LogIn")}
        >
          <Text style={[styles.backText, { color: colors.primary }]}>
            {t("forgotPassword.back")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { backgroundColor: colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
     
        <View style={styles.logoContainer}>
          <View
            style={[styles.logoPlaceholder, { borderColor: colors.primary }]}
          >
            <Text style={[styles.logoText, { color: colors.primary }]}>
              WashyWashy
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          {t("forgotPassword.title")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t("forgotPassword.subtitle")}
        </Text>

        <View style={styles.langRow}>
          <LanguageSwitch />
        </View>

        <AuthInput
          // icon={EmailIcon}
          placeholder={t("forgotPassword.email")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={error}
        />

        <AuthButton
          title={t("forgotPassword.button")}
          onPress={handleSubmit}
          loading={loading}
        />

        <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>
            {t("forgotPassword.back")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoPlaceholder: {
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  langRow: {
    marginBottom: 20,
  },
  backRow: {
    alignItems: "center",
    marginTop: 16,
  },
  backLink: {
    fontSize: 14,
    fontWeight: "600",
  },


  
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  successSub: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
  },
  backButton: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  backText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
