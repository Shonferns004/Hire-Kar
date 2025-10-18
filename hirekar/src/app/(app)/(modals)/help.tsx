import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, Alert, Keyboard, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Typo from "@/src/components/Typo";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { colors, radius } from "@/src/constants/theme";
import { deleteUser } from "@/src/utils/authAction";
import { verticalScale } from "@/src/utils/styling";
import { useRouter } from "expo-router";
import Header from "@/src/components/Header";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MODAL_HEIGHT = SCREEN_HEIGHT - 80; // Slightly smaller to avoid floating above tabbar
const CLOSE_THRESHOLD = MODAL_HEIGHT / 5;

export default function ProfileModalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Example state for profile edit inputs
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  const translateY = useSharedValue(MODAL_HEIGHT);
  const context = useSharedValue({ y: 0 });
  const keyboardHeight = useSharedValue(0);

  // Pan gesture
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.min(Math.max(event.translationY + context.value.y, 0), MODAL_HEIGHT);
    })
    .onEnd(() => {
      if (translateY.value > CLOSE_THRESHOLD) {
        translateY.value = withTiming(MODAL_HEIGHT, { duration: 500 }, () => runOnJS(router.back)());
      } else {
        translateY.value = withTiming(0, { duration: 500 });
      }
    });

  // Slide modal up on mount
  useEffect(() => {
    translateY.value = withTiming(0, { duration: 700 });
  }, []);

  // Keyboard listeners
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      keyboardHeight.value = e.endCoordinates.height;
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      keyboardHeight.value = 0;
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Bottom sheet animation
  const rBottomSheetStyle = useAnimatedStyle(() => {
    const offset = Platform.OS === "ios" ? keyboardHeight.value : 0;
    return {
      transform: [{ translateY: translateY.value - offset }],
    };
  });

  const rOverlayStyle = useAnimatedStyle(() => ({
    opacity: 0.5 * (1 - translateY.value / MODAL_HEIGHT),
  }));

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser();
      Alert.alert("Account Deleted", "Your account has been removed.");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    translateY.value = withTiming(MODAL_HEIGHT, { duration: 500 }, () => runOnJS(router.back)());
  };

  const handleSave = () => {
    Alert.alert("Saved", `Name: ${name}\nEmail: ${email}`);
    closeModal();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Overlay */}
      <Animated.View style={[styles.overlay, rOverlayStyle]} pointerEvents="box-none">
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={closeModal} />
      </Animated.View>
      <GestureDetector gesture={gesture}>
  <Animated.View style={[styles.container, rBottomSheetStyle]}>
    <View style={styles.line} />
    <Header style={{marginBottom:verticalScale(40)}} title="Policies" />

    

  </Animated.View>
</GestureDetector>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  container: {
    height: MODAL_HEIGHT,
    width: "100%",
    backgroundColor: colors.neutral800,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: radius._20,
    borderTopRightRadius: radius._20,
    padding: 20,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: colors.neutral900,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 2,
  },
  title: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: verticalScale(8),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },
  button: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
});
