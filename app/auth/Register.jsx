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
import { registerUser } from "../../services/authService";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import SocialAuthButtons from "../../components/SocialAuthButtons";
import LanguageSwitch from "../../components/LanguageSwitch";

// import UserIcon from "../../assets/icons/UserIcon";
// import EmailIcon from "../../assets/icons/EmailIcon";
// import LockIcon from "../../assets/icons/LockIcon";

export default function Register() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = t("errors.nameRequired");
    if (!email.trim()) e.email = t("errors.emailRequired");
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = t("errors.emailInvalid");
    if (!password) e.password = t("errors.passwordRequired");
    else if (password.length < 6) e.password = t("errors.passwordShort");
    if (password !== confirmPassword)
      e.confirmPassword = t("errors.passwordMatch");
    if (!agreed) e.terms = t("errors.termsRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await registerUser({ name: name.trim(), email: email.trim(), password });
      router.replace("/(tabs)/(home)");
    } catch (err) {
      setApiError(err.message || t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

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
          {t("register.title")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t("register.subtitle")}
        </Text>

        <View style={styles.langRow}>
          <LanguageSwitch />
        </View>

        <AuthInput
          // icon={UserIcon}
          placeholder={t("register.name")}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          error={errors.name}
        />

        <AuthInput
          // icon={EmailIcon}
          placeholder={t("register.email")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />

        <AuthInput
          // icon={LockIcon}
          placeholder={t("register.password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <AuthInput
          // icon={LockIcon}
          placeholder={t("register.confirmPassword")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />

     
        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkbox,
              {
                borderColor: colors.checkboxBorder,
                backgroundColor: agreed ? colors.checkboxFill : "transparent",
              },
            ]}
          >
            {agreed && (
              <Text
                style={{
                  color: colors.checkboxCheck,
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                ✓
              </Text>
            )}
          </View>
          <Text
            style={[
              styles.termsText,
              {
                color: errors.terms ? colors.error : colors.textSecondary,
              },
            ]}
          >
            {t("register.terms")}
          </Text>
        </TouchableOpacity>

        {apiError ? (
          <Text style={[styles.apiError, { color: colors.error }]}>
            {apiError}
          </Text>
        ) : null}

        <AuthButton
          title={t("register.button")}
          onPress={handleRegister}
          loading={loading}
        />

        <SocialAuthButtons type="register" />

        <View style={styles.bottomRow}>
          <Text style={[styles.bottomText, { color: colors.textSecondary }]}>
            {t("register.hasAccount")}{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/LogIn")}>
            <Text style={[styles.linkText, { color: colors.primary }]}>
              {t("register.login")}
            </Text>
          </TouchableOpacity>
        </View>
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
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    marginTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 10,
    marginTop: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  apiError: {
    fontSize: 13,
    marginBottom: 12,
    textAlign: "center",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  bottomText: {
    fontSize: 14,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
