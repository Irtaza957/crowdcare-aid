import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

type AlignSelfTypes = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';

type DimensionValue = number | 'auto' | `${number}%`;
type FontWeightValue =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'ultralight'
  | 'thin'
  | 'light'
  | 'medium'
  | 'semibold'
  | 'heavy'
  | 'black';

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  backgroundColor?: string;
  borderWidth?: number;
  borderColor?: string;
  width?: DimensionValue;
  height?: number;
  alignSelf?: AlignSelfTypes;
  borderRadius?: number;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: FontWeightValue;
  showImage?: boolean;
  fontFamily?: string;
  loading?: boolean;
  loadingColor?: string;
  disabled?: boolean;
  bottom?: number;
  position?: string;
  textMarginTop?: number;
  buttonImage?: ImageSourcePropType;
  padding?: number;
  marginVertical?: number;
  elevation?: number;
  shadowProps?: {
    shadowColor?: string;
    shadowOffset?: { width: number; height: number };
    shadowOpacity?: number;
    shadowRadius?: number;
    elevation?: number;
  };
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  fontWeight,
  backgroundColor,
  borderWidth,
  borderColor,
  width,
  height,
  alignSelf,
  borderRadius,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  fontSize,
  color,
  disabled,
  fontFamily,
  loading,
  loadingColor,
  showImage,
  textMarginTop,
  buttonImage,
  padding,
  marginVertical,
  elevation,
  shadowProps,
}) => {
  const buttonStyle: StyleProp<ViewStyle> = {
    backgroundColor: disabled ? Colors.lightGray : backgroundColor || '#1a3f1e',
    borderWidth: borderWidth || 1,
    borderColor: disabled ? Colors.lightGray : borderColor || '#1a3f1e',
    width: width || '100%',
    height: height || 55,
    alignSelf: alignSelf || 'center',
    marginRight,
    marginTop,
    marginLeft,
    marginBottom,
    borderRadius: borderRadius || normalizeSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    padding,
    marginVertical,
    elevation: elevation,
    ...shadowProps,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || !onPress || loading}
      style={buttonStyle}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {showImage && (
          <Image
            source={buttonImage}
            style={{
              height: 25,
              width: 25,
              resizeMode: 'contain',
              marginRight: 15,
            }}
          />
        )}
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={loadingColor || Colors.white}
          />
        ) : (
          <Text
            style={{
              fontSize: fontSize || 20,
              color: color || 'white',
              fontFamily: fontFamily || Fonts.Medium,
              marginTop: textMarginTop,
              fontWeight: fontWeight || '500',
            }}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
