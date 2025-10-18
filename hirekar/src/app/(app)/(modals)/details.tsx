import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "@expo-google-fonts/quicksand";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { colors, spacingX } from "@/src/constants/theme";
import { verticalScale } from "@/src/utils/styling";
import { router } from "expo-router";
import { supabase } from "@/src/config/supabase";
import IOSLoader from "@/src/components/Loading";

const DetailsModal = () => {
  const [name, setName] = useState("");
  const [referral, setReferral] = useState("");
  const [loading, setLoading] = useState(false)

  const [fontsLoaded] = useFonts({
    "BrunoAceSC-Regular": require("@/src/assets/fonts/BrunoAceSC-Regular.ttf"),
    "Hey Comic": require("@/src/assets/fonts/Hey Comic.ttf"),
    "Bouncy Ballons": require("@/src/assets/fonts/Bouncy Balloons.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleSkip = async () => {
  try {
    setLoading(true)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) {
      console.warn("No logged-in user found");
      return;
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ isNew: false })
      .eq("id", user.id); 

    if (updateError) throw updateError;

    router.push("/(app)/(tabs)/profile");

  } catch (error:any) {
    console.error("Error updating user:", error.message);
  }finally{
    setLoading(false)
  }
};


const handleContinue = async () => {
  try {
    setLoading(true)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) {
      console.warn("No logged-in user found");
      return;
    }

    // Update the user's record in 'users' table
    const { error: updateError } = await supabase
      .from("users")
      .update({
        name: name,
        referral: referral || "", // optional
        isNew: false,
      })
      .eq("id", user.id);

    if (updateError) throw updateError;

    // Navigate to profile page
    router.push("/(app)/(tabs)/profile");

  } catch (error:any) {
    console.error("Error updating user:", error.message);
  }finally{
    setLoading(false)
  }
};


  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={{position: 'absolute',top:30, right:30,zIndex: 10}}>
            {
              loading ? (<IOSLoader size={15} color={colors.primary} />): (
                <>
                <TouchableOpacity onPress={handleSkip}>
              <Typo style={{color:colors.primary}} fontWeight={700}>Skip</Typo>
            </TouchableOpacity>
                </>
              )
            }
          </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: "100%",
            gap: verticalScale(30),
          }}
        >
          
          <View style={{ flexDirection: "row", gap: verticalScale(6) }}>
            <Typo style={{ fontWeight: "bold", letterSpacing: 2 }} size={16}>
              Please enter your full name
            </Typo>
          </View>

          <Input
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
          />

          <Input
            value={referral}
            onChangeText={setReferral}
            placeholder="Enter referral code (Optional)"
          />
        </View>

        <View style={styles.bottomContainer}>
          <Button
            disabled={!name}
            loading={loading}
            style={[
              name
                ? { backgroundColor: colors.primary }
                : { backgroundColor: colors.neutral500 },
              {
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              },
            ]}
            onPress={handleContinue}
          >
            <Typo
              style={name ? { color: colors.black } : { color: colors.white }}
              fontWeight="700"
            >
              Continue
            </Typo>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default DetailsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  bottomContainer: {
    width: "100%",
    marginBottom: verticalScale(30),
    flexDirection: "column-reverse",
  },

});
