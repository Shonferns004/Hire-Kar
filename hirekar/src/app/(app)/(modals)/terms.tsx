import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Typo from "@/src/components/Typo";
import { colors, radius } from "@/src/constants/theme";
import { verticalScale } from "@/src/utils/styling";
import { useRouter } from "expo-router";
import Header from "@/src/components/Header";
import { CaretRight } from "phosphor-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MODAL_HEIGHT = SCREEN_HEIGHT /2;
const CLOSE_THRESHOLD = MODAL_HEIGHT / 5;

export default function PolicyModal() {
  const router = useRouter();
  const translateY = useSharedValue(MODAL_HEIGHT);
  const context = useSharedValue({ y: 0 });
  const keyboardHeight = useSharedValue(0);

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
        translateY.value = withTiming(MODAL_HEIGHT, { duration: 500 }, () =>
          runOnJS(router.back)()
        );
      } else {
        translateY.value = withTiming(0, { duration: 500 });
      }
    });

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 700 });
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const offset = Platform.OS === "ios" ? keyboardHeight.value : 0;
    return {
      transform: [{ translateY: translateY.value - offset }],
    };
  });

  const rOverlayStyle = useAnimatedStyle(() => ({
    opacity: 0.5 * (1 - translateY.value / MODAL_HEIGHT),
  }));

  const closeModal = () => {
    translateY.value = withTiming(MODAL_HEIGHT, { duration: 500 }, () =>
      runOnJS(router.back)()
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Dim background */}
      <Animated.View
        style={[styles.overlay, rOverlayStyle]}
        pointerEvents="box-none"
      >
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={closeModal} />
      </Animated.View>

      {/* Bottom Sheet */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
          <View style={styles.line} />
          <Header
            style={{ marginBottom: verticalScale(25) }}
            title="Policies"
          />

          {/* Policy list items */}
          <View style={styles.listContainer}>
            <TouchableOpacity
              style={styles.listItem}
              activeOpacity={0.7}
              onPress={() => Alert.alert("Terms of Use", "Navigate to Terms page")}
            >
              <Typo size={16} style={styles.listText}>Terms of Use</Typo>
              <CaretRight color={colors.neutral300} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItem}
              activeOpacity={0.7}
              onPress={() => Alert.alert("Privacy Policy", "Navigate to Privacy page")}
            >
              <Typo size={16} style={styles.listText}>Privacy Policy</Typo>
              <CaretRight color={colors.neutral300} size={20} />
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: colors.neutral700,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 2,
  },
  listContainer: {
    gap: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral700,
  },
  listText: {
    color: colors.neutral100,
    fontWeight: "500",
  },
});
