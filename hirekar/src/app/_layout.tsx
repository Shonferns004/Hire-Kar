import React from "react";
import { Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { colors } from "../constants/theme";
import { AuthProvider } from "../context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import {GestureHandlerRootView} from "react-native-gesture-handler"

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

  useEffect(() => {
    const hide = async () => {
      // wait for auth, fonts, etc. to load
      await SplashScreen.hideAsync();
    };
    hide();
  }, []);
  // const [splash, setSplash] = useState(true)
  
    
  //     useEffect(()=>{
  //       const timer = setTimeout(()=>{
  //         setSplash(false)
  //       },3000)
  
  //       return ()=>clearTimeout(timer)
  //     },[])
  
  //   if (splash) {
  //     return(
  //       <View style={{flex:1, backgroundColor: colors.primary, justifyContent:'center', alignItems: 'center'}}>
  //       <Image source={require('@/src/assets/images/logo.png')} />
  //     </View>
  //     )
  //   }
  
  return (
    <AuthProvider>
    <GestureHandlerRootView style={{flex:1}}>
      <Slot/>
    </GestureHandlerRootView>
    </AuthProvider>
  );
}
