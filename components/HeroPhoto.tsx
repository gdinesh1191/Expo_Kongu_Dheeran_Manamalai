import { imageSource } from "@/utils/profile";
import React from "react";
import { ImageSourcePropType, StyleSheet, View, useWindowDimensions } from "react-native";
import FillImage, { useImageRatio } from "./FillImage";

const MAX_HEIGHT_RATIO = 0.65;
const FALLBACK_HEIGHT_RATIO = 0.42;

/**
 * Hero height that shows the whole photo at full screen width, capped so very tall
 * photos still leave room for the details. `overlap` is the part hidden under the sheet.
 */
export function useHeroHeight(source: ImageSourcePropType | string | undefined, overlap: number) {
  const ratio = useImageRatio(source);
  const { width, height } = useWindowDimensions();
  if (!imageSource(source) || !ratio) return height * FALLBACK_HEIGHT_RATIO;
  return Math.min(width / ratio, height * MAX_HEIGHT_RATIO) + overlap;
}

/** Full (uncropped) photo over a blurred copy that fills any leftover space. */
export default function HeroPhoto({
  source,
  bottomInset = 0,
}: {
  source?: ImageSourcePropType | string;
  bottomInset?: number;
}) {
  if (!imageSource(source)) return null;
  return (
    <>
      <FillImage source={source} align="center" blurRadius={18} />
      <View style={[StyleSheet.absoluteFill, { bottom: bottomInset }]} pointerEvents="none">
        <FillImage source={source} mode="contain" align="center" />
      </View>
    </>
  );
}
