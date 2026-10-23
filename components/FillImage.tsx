import { imageSource } from "@/utils/profile";
import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType, LayoutRectangle, StyleSheet, View } from "react-native";

type Props = {
  source?: ImageSourcePropType | string;
  /** cover fills the box (cropping), contain shows the whole image. */
  mode?: "cover" | "contain";
  /** Which part stays visible when cover crops vertically; "top" keeps faces in frame. */
  align?: "top" | "center";
  blurRadius?: number;
};

/** Width / height of an image, resolved for bundled assets and remote URLs. */
export function useImageRatio(source?: ImageSourcePropType | string) {
  const resolved = imageSource(source);
  const uri =
    resolved && typeof resolved === "object" && !Array.isArray(resolved) ? resolved.uri : undefined;

  const [ratio, setRatio] = useState<number | undefined>(() => {
    if (typeof resolved !== "number") return undefined;
    const asset = Image.resolveAssetSource(resolved);
    return asset?.width && asset?.height ? asset.width / asset.height : undefined;
  });

  useEffect(() => {
    if (!uri) return;
    Image.getSize(
      uri,
      (w, h) => h && setRatio(w / h),
      () => {},
    );
  }, [uri]);

  return ratio;
}

/**
 * Fills its parent with an image. Bundled images otherwise keep their intrinsic size,
 * so the image is sized explicitly from the measured box and the image's aspect ratio.
 */
export default function FillImage({ source, mode = "cover", align = "top", blurRadius }: Props) {
  const resolved = imageSource(source);
  const ratio = useImageRatio(source);
  const [box, setBox] = useState<LayoutRectangle | null>(null);

  if (!resolved) return null;

  let imageStyle;
  if (box && ratio) {
    const boxRatio = box.width / box.height;
    const fitWidth = mode === "cover" ? ratio < boxRatio : ratio > boxRatio;
    const width = fitWidth ? box.width : box.height * ratio;
    const height = fitWidth ? box.width / ratio : box.height;
    imageStyle = {
      position: "absolute" as const,
      width,
      height,
      left: (box.width - width) / 2,
      top: align === "top" && height > box.height ? 0 : (box.height - height) / 2,
    };
  }

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.clip]}
      pointerEvents="none"
      onLayout={(e) => setBox(e.nativeEvent.layout)}
    >
      <Image
        source={resolved}
        style={imageStyle ?? styles.fallback}
        resizeMode={imageStyle ? "stretch" : mode}
        blurRadius={blurRadius}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  clip: {
    overflow: "hidden",
  },
  fallback: {
    width: "100%",
    height: "100%",
  },
});
