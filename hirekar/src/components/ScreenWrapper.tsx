import React from 'react'
import { View, Text, Platform, Dimensions, StatusBar } from 'react-native'
import { colors } from '../constants/theme'
import { ScreenWrapperProps } from '@/types'

const { height } = Dimensions.get('window')


const ScreenWrapper = ({style,children}:ScreenWrapperProps) => {
    let paddingTop = Platform.OS == 'ios' ? height * 0.06 : 50
  return (
    <View style={[{paddingTop, backgroundColor:colors.neutral900, flex:1},style]}>
        <StatusBar barStyle='light-content' />
      {children}
    </View>
  )
}

export default ScreenWrapper