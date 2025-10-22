import React from 'react'
import { Stack } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { colors } from '@/src/constants/theme';

const AuthLayout = () => {
   useFocusEffect(() => {
      StatusBar.setBackgroundColor(colors.neutral800);
      StatusBar.setBarStyle("light-content");
    });
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name='index' />
    </Stack>
  )
}

export default AuthLayout