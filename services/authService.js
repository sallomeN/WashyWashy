import AsyncStorage from "@react-native-async-storage/async-storage";

// Change this to your machine's local IP when testing on a physical device
// e.g. "http://192.168.1.100:5000/api/auth"
// For emulator use "http://10.0.2.2:5000/api/auth" (Android)
// For simulator use "http://localhost:5000/api/auth" (iOS)
// const BASE_URL = "http://192.168.88.46:5000/api/auth";
const BASE_URL = "http://192.168.88.85:5000/api/auth";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const storeToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeMany([TOKEN_KEY, USER_KEY]);
};

export const storeUser = async (user) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const registerUser = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  await storeToken(data.token);
  await storeUser({ _id: data._id, name: data.name, email: data.email });

  return data;
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  await storeToken(data.token);
  await storeUser({ _id: data._id, name: data.name, email: data.email });

  return data;
};

export const forgotPasswordRequest = async (email) => {
  const response = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const logoutUser = async () => {
  await removeToken();
};

export const isLoggedIn = async () => {
  const token = await getToken();
  return !!token;
};
