import { PixelRatio, Platform } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
// export const isTablet = DeviceInfo.isTablet();
const minDimension = Math.min(width, height);
const scale = minDimension / 370;
// const tabletScale = minDimension / 650;

export const normalizeSize = (size: number) => {
  // const newSize = isTablet ? size * tabletScale : size * scale;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};
