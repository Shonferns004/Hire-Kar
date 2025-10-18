import React from 'react'
import { router, Tabs } from 'expo-router'
import { ApplePodcastsLogoIcon, CaretLeftIcon } from 'phosphor-react-native'
import { colors } from '@/src/constants/theme'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Quicksand_400Regular, useFonts } from '@expo-google-fonts/quicksand';
import { Platform, TouchableOpacity } from 'react-native';
import { verticalScale } from '@/src/utils/styling';

const TabsLayout = () => {
  const [fontsLoaded] = useFonts({
      Quicksand_400Regular,
    });
    if (!fontsLoaded) return null;
  return (
   <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral500,
        tabBarLabelStyle:{
          fontFamily: 'Quicksand_400Regular',
          fontSize: 12
        },
        tabBarStyle: {
          backgroundColor: colors.neutral800,
          borderTopWidth: 1,
          width: '100%',
          height: Platform.OS == 'ios'? verticalScale(75): verticalScale(70),
          paddingTop: 10,
          borderColor: colors.neutral700
        },
         headerStyle: {
          backgroundColor: colors.neutral800,
          height: verticalScale(105),
        },
        headerTitleStyle: {
          color: colors.neutral500,
          fontFamily: 'Quicksand_400Regular',
          fontSize: 22,
          fontWeight: 700,
          // letterSpacing: 2,
          marginLeft:verticalScale(10)
        },
        headerTintColor: colors.white,
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown:false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name="house-chimney-window" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarLabel: 'Nearby',
          tabBarIcon: ({ size, color }) => <ApplePodcastsLogoIcon size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name="rectangle-list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Account',
          title: 'Settings',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push('/(app)/(tabs)')}
              style={{ marginLeft: 20, }}
            >
              <CaretLeftIcon size={32} weight='bold' color={colors.neutral500} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ size, color }) => <FontAwesome5 name="user-circle" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout