import React from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";


const AppLayout = () => {
  const { session, user, loading } = useAuth();

  if (loading) return null; // can show a splash loader here

  if (session && user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(modals)/details" />
        <Stack.Screen options={{
        presentation: 'transparentModal', // This makes all screens in this Stack render as modals
        headerShown: false,    // Hide the default header
      }} name="(modals)/help" />
        <Stack.Screen options={{
        presentation: 'transparentModal', // This makes all screens in this Stack render as modals
        headerShown: false,    // Hide the default header
      }} name="(modals)/terms" />
        <Stack.Screen name="(modals)/address" />
        <Stack.Screen options={{
        presentation: "modal", // This makes all screens in this Stack render as modals
        headerShown: false,    // Hide the default header
      }} name="(modals)/profile" />
      </Stack>
    );
  } else {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
    );
  }
};

export default AppLayout;
