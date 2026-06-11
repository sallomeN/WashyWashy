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

import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LogIn() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const router = useRouter();

  const [apiError, setApiError] = useState("");

  const Logo = isDark ? DarkLogo : LightLogo;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView contentContainerStyle={[
            styles.container,
            { backgroundColor: colors.background },
          ]} >
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

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setApiError("");
                await loginUser({
                  email: values.email.trim(),
                  password: values.password,
                });
                router.replace("/(tabs)/(home)");
              } catch (err) {
                setApiError(err.message || t("errors.generic"));
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                <AuthInput
                  icon={Email}
                  placeholder={t("login.email")}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email}
                />

                <AuthInput
                  icon={Lock}
                  placeholder={t("login.password")}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  error={touched.password && errors.password}
                />

                {apiError ? (
                  <Text style={[styles.apiError, { color: colors.error }]}>
                    {apiError}
                  </Text>
                ) : null}

                <AuthButton
                  title={t("login.button")}
                  onPress={handleSubmit}
                  loading={isSubmitting}
                />
              </>
            )}
          </Formik>

          <SocialAuthButtons
            type="login"
            appleIcon={Apple}
            googleIcon={Google}
          />

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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
