import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogIn" />
      <Stack.Screen name="Register" />
      <Stack.Screen name="ForgotPassword" />
    </Stack>
  );
}
