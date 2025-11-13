import React, { use, useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "@/src/config/supabase";
import { PlusIcon } from "phosphor-react-native";
import { useFonts } from "@expo-google-fonts/quicksand";
import { router } from "expo-router";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { colors, spacingX } from "@/src/constants/theme";
import { responsiveFont, verticalScale } from "@/src/utils/styling";

const secondsToResend = 30;

const PhoneAuthScreen = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countryCode, setCountryCode] = useState("91");
  const [secondsLeft, setSecondsLeft] = useState(secondsToResend);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    "BrunoAceSC-Regular": require("@/src/assets/fonts/BrunoAceSC-Regular.ttf"),
    "Hey Comic": require("@/src/assets/fonts/Hey Comic.ttf"),
    "Bouncy Ballons": require("@/src/assets/fonts/Bouncy Balloons.ttf"),
    Moghul: require("@/src/assets/fonts/Moghul.ttf"),
  });
  if (!fontsLoaded) return null;

  const startResendTimer = () => {
    setIsResendDisabled(true);
    setSecondsLeft(secondsToResend);
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true)
    const phoneNumber = countryCode + phone;
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });
    if (error && error.message.includes("duplicate key value")) {
  // Instead of blocking the flow, try login-only mode:
  await supabase.auth.signInWithOtp({
    phone: phoneNumber,
    options: { shouldCreateUser: false },
  });
  return;
}


    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setOtpSent(true);
      Alert.alert("OTP Sent", "Check your phone for the OTP.");
      startResendTimer();
    }
    } catch (error:any) {
      Alert.alert("Error", error.message);
    }finally{
      setLoading(false)
    }
    
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.verifyOtp({
        phone: "+" + countryCode + phone,
        token: otp,
        type: "sms",
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      const user = data?.user;
      if (!user) {
        Alert.alert("Error", "User not found after OTP verification");
        return;
      }

      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("phone_number", user.phone)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingUser && existingUser.isNew == false) {
        Alert.alert("Welcome back!", "Redirecting to Home...");
        router.replace("/(app)/(tabs)");
      } else if (existingUser && existingUser.isNew == true) {
        Alert.alert("sucess", "Please fill the details");
        router.push("/(app)/(modals)/details");
      } else {
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: user.id,
            phone_number: user.phone,
            created_at: new Date(),
          },
        ]);

        if (insertError) throw insertError;

        Alert.alert("Success", "Account created! Let's complete your profile.");
        router.replace("/(app)/(modals)/details");
      }
    } catch (err: any) {
      console.error("OTP Verify Error:", err);
      Alert.alert("Error", err.message || "Something went wrong.");
    }finally{
      setLoading(false)
    }
  };

  const handleResendOtp = () => {
    if (isResendDisabled) return;
    setOtp("");
    handleSendOtp();
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
          {!otpSent ? (
            <>
              <Text
                style={[
                  styles.appName,
                  {
                    fontFamily: "BrunoAceSC-Regular",
                    fontSize: responsiveFont(30),
                    color: colors.primary,
                    letterSpacing: 6,
                  },
                ]}
              >
                Hire Kar
              </Text>
              <Typo size={16} color={colors.neutral100} style={styles.subtitle}>
                Login or Sign up to continue
              </Typo>
            </>
          ) : (
            ""
          )}

          {!otpSent ? (
            <>
              <View style={styles.rowInputs}>
                <View style={{ flex: 0.3 }}>
                  <Input
                    value={countryCode}
                    onChangeText={setCountryCode}
                    keyboardType="phone-pad"
                    placeholder="+91"
                    icon={<PlusIcon size={20} color={colors.primary} />}
                  />
                </View>

                <View style={{ flex: 0.7 }}>
                  <Input
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="Enter phone number"
                  />
                </View>
              </View>
              <Typo
                style={{ marginTop: verticalScale(15) }}
                size={13}
                color={colors.neutral400}
              >
                We will send an Otp to confirm the number
              </Typo>
            </>
          ) : (
            <>
              <View style={{ flexDirection: "row", gap: verticalScale(6) }}>
                <Typo style={{ marginBottom: verticalScale(25) }} size={14}>
                  Enter the Otp just sent to +91 {phone}
                </Typo>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: verticalScale(25),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setOtpSent(false)}
                    style={{ paddingBottom: 1, paddingLeft: 3 }}
                  >
                    <Typo
                      size={13}
                      color={colors.primary}
                      style={{ textDecorationLine: "underline" }}
                    >
                      Edit
                    </Typo>
                  </TouchableOpacity>
                </View>
              </View>
              <Input
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                placeholder="Enter the 6-digit code"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 20,
                  color: colors.white,
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <Typo
                  style={{
                    color: colors.textLight,
                    fontSize: 15,
                    marginTop: verticalScale(10),
                  }}
                >
                  Didn't receive code?{" "}
                </Typo>
                <TouchableOpacity
                  onPress={handleResendOtp}
                  disabled={isResendDisabled}
                >
                  <Typo
                    style={{
                      color: isResendDisabled
                        ? colors.neutral300
                        : colors.primary,
                      fontSize: 16,
                      fontWeight: "600",
                      marginTop: verticalScale(10),
                    }}
                  >
                    {isResendDisabled ? `Resend in ${secondsLeft}s` : "Resend"}
                  </Typo>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.bottomContainer}>
          {!otpSent ? (
            <Button
            loading={loading}
              disabled={phone.length != 10}
              style={[
                phone.length == 10
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: colors.neutral500 },
                {
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                },
              ]}
              onPress={handleSendOtp}
            >
              <Typo
                style={
                  phone.length == 10
                    ? { color: colors.black }
                    : { color: colors.white }
                }
                fontWeight="700"
              >
                Get Verification Code
              </Typo>
            </Button>
          ) : (
            <Button
              disabled={otp.length != 6}
              loading={loading}
              style={[
                otp.length == 6
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: colors.neutral500 },
                {
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                },
              ]}
              onPress={handleVerifyOtp}
            >
              <Typo
                style={
                  otp.length == 6
                    ? { color: colors.black }
                    : { color: colors.white }
                }
                fontWeight="700"
              >
                Verify OTP
              </Typo>
            </Button>
          )}

          {!otpSent && (
            <Typo size={12} color={colors.neutral400} style={styles.termsText}>
              By signing in you agree to our{" "}
              <Typo
                size={12}
                color={colors.primary}
                textProps={{ onPress: () => alert("Terms clicked") }}
                style={{ textDecorationLine: "underline" }}
              >
                Terms
              </Typo>{" "}
              and{" "}
              <Typo
                size={12}
                color={colors.primary}
                textProps={{ onPress: () => alert("Privacy clicked") }}
                style={{ textDecorationLine: "underline" }}
              >
                Privacy Policy
              </Typo>
            </Typo>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default PhoneAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    justifyContent: "space-between",
  },
  appName: {
    // textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    // textAlign: 'center',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(20),
    letterSpacing: 1.3,
    fontWeight: 600,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacingX._10,
  },
  bottomContainer: {
    width: "100%",
    marginBottom: verticalScale(30),
    flexDirection: "column-reverse",
  },
  termsText: {
    textAlign: "center",
    justifyContent: "center",
    marginBottom: verticalScale(25),
    marginRight: 10,
  },
});
