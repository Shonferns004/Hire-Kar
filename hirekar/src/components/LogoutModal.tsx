import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { colors, radius } from "../constants/theme";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";
import { verticalScale } from "../utils/styling";
import Typo from "./Typo";
import Input from "./Input";
import Button from "./Button";
import { deleteUser, handleLogout } from "../utils/authAction";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MODAL_HEIGHT = SCREEN_HEIGHT / 5.6;
const CLOSE_THRESHOLD = MODAL_HEIGHT / 3;

const LogoutModal = ({ isVisible, onClose, onDelete }: any) => {
  const [confirmationText, setConfirmationText] = useState("");
  const translateY = useSharedValue(MODAL_HEIGHT);
  const context = useSharedValue({ y: 0 });
  const [loading, setLoading] = useState(false);

  // Pan Gesture
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.min(
        Math.max(event.translationY + context.value.y, 0),
        MODAL_HEIGHT
      );
    })
    .onEnd(() => {
      if (translateY.value > CLOSE_THRESHOLD) {
        translateY.value = withSpring(MODAL_HEIGHT, {}, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(0, { damping: 50 });
      }
    });

    const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser();
      Alert.alert("Account Deleted", "Your account has been removed.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Slide in/out when isVisible changes
  useEffect(() => {
    if (isVisible) translateY.value = withSpring(0);
    else translateY.value = withSpring(MODAL_HEIGHT);
  }, [isVisible]);

  const rBottomSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const rOverlayStyle = useAnimatedStyle(() => ({
    opacity: 0.5 * (1 - translateY.value / MODAL_HEIGHT),
  }));


  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Overlay */}
        <Animated.View style={[styles.overlay, rOverlayStyle]} pointerEvents="box-none">
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
        </Animated.View>

        {/* Bottom Sheet */}
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.container, rBottomSheetStyle]}>
            <View style={styles.line} />
            <Typo style={styles.title}>
              Are you sure you want to logout?
            </Typo>

            <View style={styles.buttonRow}>

                <Button
                loading={loading}
                style={[
                  styles.button,
                  { backgroundColor:colors.neutral900 },
                ]}
                onPress={handleLogout}
              >
                <Typo size={15} style={{ color: colors.rose }}>Delete</Typo>
              </Button>
              <Button
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={onClose}
              >
                <Typo size={15} style={{ color: colors.black }}>Cancel</Typo>
              </Button>

              
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  container: {
    height: MODAL_HEIGHT,
    backgroundColor: colors.neutral800,
    width: "100%",
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
  subtitle: {
    color: "#ccc",
    marginBottom: 15,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:verticalScale(20)
  },
  button: {
    flex: 1,
    // paddingVertical: 12,
    justifyContent:'center',
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
});
