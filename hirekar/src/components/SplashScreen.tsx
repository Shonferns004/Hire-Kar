// src/components/SplashScreen.tsx
import React from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../constants/theme";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Replace with your own logo/image */}
      <Image source={require("@/src/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // or your brand color
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default SplashScreen;
