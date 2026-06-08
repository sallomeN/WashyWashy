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

import { Formik } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password required"),
  agreed: Yup.boolean().oneOf([true], "You must accept terms"),
});

export default function Register() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();

  const [apiError, setApiError] = useState("");

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
      >
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: colors.primary }]}>
            WashyWashy
          </Text>
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

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreed: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setApiError("");
              await registerUser({
                name: values.name.trim(),
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
            setFieldValue,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <AuthInput
                placeholder={t("register.name")}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                error={touched.name && errors.name}
              />

              <AuthInput
                placeholder={t("register.email")}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email}
              />

              <AuthInput
                placeholder={t("register.password")}
                value={values.password}
                onChangeText={handleChange("password")}
                secureTextEntry
                error={touched.password && errors.password}
              />

              <AuthInput
                placeholder={t("register.confirmPassword")}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                secureTextEntry
                error={touched.confirmPassword && errors.confirmPassword}
              />

              {/* checkbox */}
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setFieldValue("agreed", !values.agreed)}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: colors.checkboxBorder,
                      backgroundColor: values.agreed
                        ? colors.checkboxFill
                        : "transparent",
                    },
                  ]}
                >
                  {values.agreed && <Text>✓</Text>}
                </View>

                <Text
                  style={[styles.termsText, { color: colors.textSecondary }]}
                >
                  {t("register.terms")}
                </Text>
              </TouchableOpacity>

              {touched.agreed && errors.agreed ? (
                <Text style={{ color: colors.error, marginBottom: 10 }}>
                  {errors.agreed}
                </Text>
              ) : null}

              {apiError ? (
                <Text style={[styles.apiError, { color: colors.error }]}>
                  {apiError}
                </Text>
              ) : null}

              <AuthButton
                title={t("register.button")}
                onPress={handleSubmit}
                loading={isSubmitting}
              />
            </>
          )}
        </Formik>

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
  logoText: {
    fontSize: 22,
    fontWeight: "700",
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
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  termsText: {
    flex: 1,
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
