import React, { useState } from "react";
import { router, Tabs } from "expo-router";
import { ApplePodcastsLogoIcon, CaretLeftIcon } from "phosphor-react-native";
import { colors, spacingY } from "@/src/constants/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Quicksand_400Regular, useFonts } from "@expo-google-fonts/quicksand";
import { Platform, TouchableOpacity, View } from "react-native";
import {
  responsiveFont,
  scaleHeight,
  scaleWidth,
  verticalScale,
} from "@/src/utils/styling";
import Typo from "@/src/components/Typo";
import LottieView from "lottie-react-native";

const TabsLayout = () => {
  const [address, setAddress] = useState("");
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
  });
  if (!fontsLoaded) return null;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral500,
        tabBarLabelStyle: {
          fontFamily: "Quicksand_400Regular",
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: colors.neutral800,
          borderTopWidth: 1,
          width: "100%",
          height: Platform.OS == "ios" ? scaleHeight(75) : scaleHeight(70),
          paddingTop: scaleHeight(10),
          justifyContent:'center',
          alignItems: 'center',
          borderColor: colors.neutral700,
        },
        headerStyle: {
          backgroundColor: colors.neutral800,
          height: spacingY._60,
        },
        headerTitleStyle: {
          color: colors.neutral500,
          fontFamily: "Quicksand_400Regular",
          fontSize: 22,
          fontWeight: 700,
          marginLeft: verticalScale(10),
        },
        headerTintColor: colors.white,
        headerShadowVisible: false,
      }}
    >
      {/* home */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          title: "",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6
              name="house-chimney-window"
              size={size}
              color={color}
            />
          ),
          headerShown: false
        }}
        
      />

      {/* scan */}

      <Tabs.Screen
        name="scan"
        options={{
          tabBarLabel: "Nearby",
          tabBarIcon: ({ size, color }) => (
            <ApplePodcastsLogoIcon size={32} color={color} />
          ),
        }}
      />

      {/* booking */}

      <Tabs.Screen
        name="bookings"
        options={{
          tabBarLabel: "Bookings",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name="rectangle-list" size={size} color={color} />
          ),
        }}
      />

      {/* profile */}

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Account",
          headerTitle: () => (
            <Typo
              color={colors.neutral500}
              style={{
                marginBottom: scaleHeight(4),
                marginLeft: scaleWidth(3),
              }}
            >
              Settings
            </Typo>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/(app)/(tabs)")}
              style={{ marginLeft: 23 }}
            >
              <CaretLeftIcon
                size={responsiveFont(18)}
                weight="bold"
                color={colors.neutral500}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.neutral800,
          },
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
