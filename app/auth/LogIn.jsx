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
import { loginUser } from "../../services/authService";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import SocialAuthButtons from "../../components/SocialAuthButtons";
import LanguageSwitch from "../../components/LanguageSwitch";

import Email from "../../assets/icons/Email.svg";
import Lock from "../../assets/icons/Lock.svg";
import LightLogo from "../../assets/images/LightLogo.svg";
import DarkLogo from "../../assets/images/DarkLogo.svg";
import Apple from "../../assets/icons/Apple.svg";
import Google from "../../assets/icons/Google.svg";

export default function LogIn() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = t("errors.emailRequired");
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = t("errors.emailInvalid");
    if (!password) e.password = t("errors.passwordRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await loginUser({ email: email.trim(), password });
      router.replace("/(tabs)/(home)");
    } catch (err) {
      setApiError(err.message || t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  
  const Logo = isDark ? DarkLogo : LightLogo;

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
          <Logo width={160} height={80} />
          {/* <View style={{ width: 160, height: 80 }}><Logo /></View> */}
        </View>

   
        <Text style={[styles.title, { color: colors.text }]}>
          {t("login.title")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t("login.subtitle")}
        </Text>

   
        <View style={styles.langRow}>
          <LanguageSwitch />
        </View>

  
        <AuthInput
          icon={Email}
          placeholder={t("login.email")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />

        <AuthInput
          icon={Lock}
          placeholder={t("login.password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />


        <TouchableOpacity
          style={styles.forgotRow}
          onPress={() => router.push("/auth/ForgotPassword")}
        >
          <Text style={[styles.forgotText, { color: colors.primary }]}>
            {t("login.forgotPassword")}
          </Text>
        </TouchableOpacity>


        {apiError ? (
          <Text style={[styles.apiError, { color: colors.error }]}>
            {apiError}
          </Text>
        ) : null}


        <AuthButton
          title={t("login.button")}
          onPress={handleLogin}
          loading={loading}
        />


        <SocialAuthButtons type="login" appleIcon={Apple} googleIcon={Google} />


        <View style={styles.bottomRow}>
          <Text style={[styles.bottomText, { color: colors.textSecondary }]}>
            {t("login.noAccount")}{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/Register")}>
            <Text style={[styles.linkText, { color: colors.primary }]}>
              {t("login.register")}
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
  forgotRow: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: 4,
  },
  forgotText: {
    fontSize: 13,
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
