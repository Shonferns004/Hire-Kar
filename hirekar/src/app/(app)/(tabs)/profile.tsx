import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
} from "react-native";
import Typo from "@/src/components/Typo";
import { router } from "expo-router";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import LottieView from "lottie-react-native";
import { colors, radius } from "@/src/constants/theme";
import { useFonts } from "@expo-google-fonts/quicksand";
import Button from "@/src/components/Button";
import { CaretRightIcon } from "phosphor-react-native";
import DeleteModal from "@/src/components/DeleteModal";
import LogoutModal from "@/src/components/LogoutModal";
import { useFocusEffect } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";
import { responsiveFont, scaleHeight, scaleWidth } from "@/src/utils/styling";

const ProfileTab = () => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalDelete, setModalDelete] = useState(false);
  const screenHeight = Dimensions.get("window").height;

  useFocusEffect(() => {
    StatusBar.setBackgroundColor(colors.neutral800);
    StatusBar.setBarStyle("light-content");
  });


  const [fontsLoaded] = useFonts({
    "Hey Comic": require("@/src/assets/fonts/Hey Comic.ttf"),
    "Bouncy Ballons": require("@/src/assets/fonts/Bouncy Balloons.ttf"),
    Moghul: require("@/src/assets/fonts/Moghul.ttf"),
  });
  if (!fontsLoaded) return null;

  

  return (
      <ScreenWrapper>
        <StatusBar backgroundColor={colors.neutral800} />
        <View style={{ paddingHorizontal: verticalScale(15) }}>
        {/* Top Label */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.neutral800,
            borderRadius: radius._10,
            alignItems: "center",
            justifyContent: "space-between", // 👈 main fix
            paddingHorizontal: 10,
            width: "100%",
            height: verticalScale(60),
            shadowColor: "#FFFFFF", // white glow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 8, // softer spread
            elevation: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <LottieView
              source={require("@/src/assets/images/gift.json")}
              autoPlay
              loop
              style={{ width: 40, height: 60 }}
            />
            <Typo style={{fontSize: responsiveFont(11)}}>
              Earn{" "}
              <Typo
                size={14}
                fontWeight={700}
                style={{
                  color: colors.primary,
                  fontFamily: "Moghul",
                  fontStyle: "italic",
                }}
              >
                {" "}
                ₹100{" "}
              </Typo>
              for every referral
            </Typo>
          </View>

          <View>
            <Button
              style={{
                backgroundColor: colors.primary, // use your app’s primary color
                borderRadius: radius._10, // match your global radius
                paddingVertical: scaleHeight(4),
                paddingHorizontal: verticalScale(16),
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 3,
                height: scaleHeight(40),
              }}
            >
              <Typo
                style={{
                  color: colors.black,
                  fontWeight: "700",
                  textAlign: "center",
                  fontFamily: "Hey Comic", // playful font fits “Refer Now” vibe
                  letterSpacing: 0.5,
                }}
                size={14}
              >
                Refer Now
              </Typo>
            </Button>
          </View>
        </View>

        {/* Second Label */}
        <View
          style={{
            flexDirection: "column",
            marginTop: verticalScale(20),
            gap: verticalScale(12),
          }}
        >
          {[
            {
              title: "Profile",
              subtitle: "Update personal information",
              lottie: require("@/src/assets/animations/user.json"),
              route: "/(app)/(modals)/profile",
            },
            {
              title: "Address",
              subtitle: "Manage saved addresses",
              lottie: require("@/src/assets/animations/address.json"),
              route: "/(app)/(modals)/address",
            },
            {
              title: "Policies",
              subtitle: "Terms of use, Privacy ppolicy and others",
              lottie: require("@/src/assets/animations/policy.json"),
              route: "/(app)/(modals)/terms",
            },
            {
              title: "Help & Support",
              subtitle: "Reach out to us incase you have any question",
              lottie: require("@/src/assets/animations/help.json"),
              route: "/(app)/(modals)/help",
            },
          ].map((item: any, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.neutral800,
                borderRadius: radius._10,
                padding: scaleHeight(10),
                paddingHorizontal: scaleWidth(16),
                shadowColor: "#000",
                shadowOffset: { width: 0, height: scaleHeight(2) },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              {/* Lottie Icon */}
              <LottieView
                source={item.lottie}
                autoPlay
                loop
                style={{ width: 40, height: 70 }}
              />

              {/* Text */}
              <View style={{ marginLeft: verticalScale(16), flex: 1 }}>
                <Typo
                  size={16}
                  fontWeight={700}
                  style={{ color: colors.white, letterSpacing: 1.3 }}
                >
                  {item.title}
                </Typo>
                <Typo
                  size={11}
                  style={{
                    color: colors.neutral300,
                    marginTop: verticalScale(2),
                  }}
                >
                  {item.subtitle}
                </Typo>
              </View>

              {/* Optional Arrow */}
              <CaretRightIcon
                size={responsiveFont(18)}
                weight="bold"
                color={colors.neutral500}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: verticalScale(20),
          }}
        >
          <Button
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: verticalScale(100),
              backgroundColor: colors.neutral800,
              borderWidth: 1,
              borderColor: colors.neutral800,
              height:verticalScale(40),
            }}
            onPress={() =>  setModalVisible(true)}
          >
            <Typo
              size={17}
              style={{ justifyContent: "center", color: colors.rose }}
            >
              Logout
            </Typo>
          </Button>
          
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: verticalScale(20),
          }}
        >
          <Button
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: verticalScale(200),
              backgroundColor: colors.neutral800,
              borderWidth: 1,
              borderColor: colors.neutral800,
            }}
            onPress={() => setModalDelete(true)}
          >
            <Typo
              size={17}
              style={{ justifyContent: "center", color: colors.rose, letterSpacing:1.2 }}
            >
              Delete my data
            </Typo>
          </Button>
          
   
      </View>
        </View>
        <DeleteModal isVisible={isModalDelete} onClose={()=>setModalDelete(false)}/>
        <LogoutModal isVisible={isModalVisible} onClose={()=>setModalVisible(false)} />
      </ScreenWrapper>
  );
};

export default ProfileTab;
