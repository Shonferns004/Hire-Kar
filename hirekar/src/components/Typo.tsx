import React from 'react'
import { View, Text, TextStyle } from 'react-native'
import { colors } from '../constants/theme'
import { TypoProps } from '@/types'
import { responsiveFont, verticalScale } from '../utils/styling'
import { Quicksand_400Regular, Quicksand_700Bold, useFonts } from '@expo-google-fonts/quicksand'
import CustomIOSLoader from './Loading'
import { TextInput } from 'react-native-gesture-handler'


const Typo = ({
    size,
    color=colors.text,
    fontWeight= '400',
    children,
    style,
    textProps = {},
    loading=false
}:TypoProps) => {


    

    if (loading) {
        return(
            <CustomIOSLoader/>
        )
    }
    const textStyle: TextStyle = {
        fontSize : size ? responsiveFont(size): verticalScale(18),
        color,
        fontWeight
    }

    const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) return null;
  return (
      <Text {...textProps} style={[textStyle,style, {fontFamily: "Quicksand_400Regular"}]}>{children}</Text>
  )
}

export default Typo