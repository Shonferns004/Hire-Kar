import ScreenWrapper from '@/src/components/ScreenWrapper'
import { colors } from '@/src/constants/theme'
import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { View, Text, StatusBar } from 'react-native'

const HomeTab = () => {

  useFocusEffect(() => {
  StatusBar.setBackgroundColor(colors.primary);
  StatusBar.setBarStyle("light-content");
});

  return (
    <ScreenWrapper>
      
      <View>
        
      </View>
    </ScreenWrapper>
  )
}

export default HomeTab