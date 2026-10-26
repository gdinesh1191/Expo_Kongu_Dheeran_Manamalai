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

/**
 * Photo fills the hero edge to edge. The rounded sheet sits on top, so the bottom
 * of the photo does not leave a rectangular strip along the card.
 */
export default function HeroPhoto({
  source,
}: {
  source?: ImageSourcePropType | string;
  bottomInset?: number;
}) {
  if (!imageSource(source)) return null;
  return (
    <>
      <FillImage source={source} align="top" blurRadius={18} />
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <FillImage source={source} mode="cover" align="top" />
      </View>
    </>
  );
}
