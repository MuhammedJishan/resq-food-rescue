import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="plus" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="confirmation" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="item/[id]" />
    </Stack>
  );
}