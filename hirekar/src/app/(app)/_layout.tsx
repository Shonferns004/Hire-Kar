import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import CustomSplash from "@/src/components/SplashScreen";

SplashScreen.preventAutoHideAsync();


const AppLayout = () => {
  const { session, user, loading } = useAuth();

   useEffect(() => {
    if (!loading) {
      // Hide native splash AFTER loading is done
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return <CustomSplash/>; 

  if (session && user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(modals)/details" />
        <Stack.Screen options={{
        presentation: 'transparentModal',
        headerShown: false,   
      }} name="(modals)/help" />
        <Stack.Screen options={{
        presentation: 'transparentModal', 
        headerShown: false,   
      }} name="(modals)/terms" />
        <Stack.Screen name="(modals)/address" />
        <Stack.Screen options={{
        presentation: "modal", 
        headerShown: false,   
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
