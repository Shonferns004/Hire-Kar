import React from 'react'
import { View, Text, Platform, Dimensions, StatusBar } from 'react-native'
import { colors } from '../constants/theme'
import { ScreenWrapperProps } from '@/types'

const { height } = Dimensions.get('window')


const TopWrapper = ({style,children}:ScreenWrapperProps) => {
  return (
    <View style={[{ backgroundColor:colors.neutral900},style]}>
        <StatusBar barStyle='light-content' />
      {children}
    </View>
  )
}

export default TopWrapper