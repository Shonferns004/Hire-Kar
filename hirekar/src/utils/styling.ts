import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      (shortDimension / guidelineBaseWidth) * (size as number)
    )
  );

export const verticalScale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      (longDimension / guidelineBaseHeight) * (size as number)
    )
  );

  // Scale font based on screen width
export const scaleFont = (size:any) => size * (SCREEN_WIDTH / 375); // 375 is base iPhone width

// Respect device font settings
export const responsiveFont = (size:any) => {
  const scaledSize = scaleFont(size);
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};


// Horizontal scale (width)
export const scaleWidth = (size: any) => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Vertical scale (height)
export const scaleHeight = (size: any) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Moderate scale (balance scaling so it's not too small/too big)
export const moderateScale = (size: any, factor = 0.5) =>
  size + (scaleWidth(size) - size) * factor;

