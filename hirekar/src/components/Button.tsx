import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { CustomButtonProps } from '@/types'
import Typo from './Typo'
import { colors, radius } from '../constants/theme'
import { verticalScale } from '../utils/styling'
import IOSLoader from './Loading'



const Button = ({
    style,
    onPress,
    loading= false,
    disabled=false,
    children
}:CustomButtonProps ) => {

    if (loading) {
        return(
            <View style={[{backgroundColor: 'transparent',borderRadius: radius._17, borderCurve: 'continuous', height: verticalScale(52)}, style]}>
                <IOSLoader size={20} color={colors.black}/>
            </View>
        )
    }

  return (
    <TouchableOpacity disabled={disabled} className='justify-center items-center' style={[{backgroundColor: colors.primary, borderRadius: radius._10, borderCurve: 'continuous', height: verticalScale(45)},style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default Button