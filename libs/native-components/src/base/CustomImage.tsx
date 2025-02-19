import { Colors } from '@crowdcareaid-frontend/assets';
import { useGetImageQuery } from '@crowdcareaid-frontend/store';
import { DEFAULT_PROFILE_IMAGE_URL } from 'apps/crowdcareaid-mobile/src/screens/constant';
import React, { useState } from 'react';
import { ActivityIndicator, ImageStyle, StyleProp } from 'react-native';
import FastImage, { ResizeMode } from 'react-native-fast-image';
import ImageModal from 'react-native-image-modal';
interface iProps {
  url: string;
  uri?: string;
  style?: StyleProp<ImageStyle>;
  useModel?: boolean;
  shouldUseDirectImage?: boolean;
  resizeMode?: ResizeMode;
}
const CustomImage: React.FC<iProps> = ({
  url,
  style,
  useModel,
  shouldUseDirectImage,
  resizeMode = FastImage.resizeMode.cover,
  uri,
}) => {
  const { data, isLoading } = useGetImageQuery(url, {
    skip: shouldUseDirectImage,
  });

  const [isImageLoading, setIsImageLoading] = useState(false);

  const PLACEHOLDER_IMAGE = DEFAULT_PROFILE_IMAGE_URL;

  const imageSource = shouldUseDirectImage
    ? url || PLACEHOLDER_IMAGE
    : data?.data || PLACEHOLDER_IMAGE;

  if (useModel) {
    return (
      <ImageModal
        resizeMode="cover"
        modalImageResizeMode="contain"
        style={style}
        source={{
          uri: data?.data ? data?.data : uri,
        }}
      />
    );
  } else {
    return (
      <>
        <FastImage
          onLoadStart={() => setIsImageLoading(true)}
          onLoadEnd={() => setIsImageLoading(false)}
          source={{
            uri: imageSource,
          }}
          style={style}
          resizeMode={resizeMode}
        />
        {isImageLoading && isLoading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
            color={Colors.white}
            size="large"
          />
        )}
      </>
    );
  }
};
export default CustomImage;
