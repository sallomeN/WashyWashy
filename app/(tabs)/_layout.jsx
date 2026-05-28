import { Tabs } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          // tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
