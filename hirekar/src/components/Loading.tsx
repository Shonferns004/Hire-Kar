// IOSLoader.js
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";

const IOSLoader = ({ size = 40, color = "#30D5C8" }) => {
  const spokes = [...Array(12).keys()];
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ rotate: rotateInterpolate }],
        },
      ]}
    >
      {spokes.map((_, i) => {
        const spokeOpacity = 1 - i / spokes.length; // gradient fade
        return (
          <View
            key={i}
            style={[
              styles.spoke,
              {
                width: size * 0.08,
                height: size * 0.28,
                backgroundColor: color,
                opacity: spokeOpacity,
                borderRadius: size * 0.04,
                transform: [
                  { rotate: `${i * 30}deg` },
                  { translateY: -size * 0.32 },
                ],
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  spoke: {
    position: "absolute",
  },
});

export default IOSLoader;
