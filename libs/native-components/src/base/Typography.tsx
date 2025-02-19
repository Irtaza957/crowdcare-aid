import React from 'react';
import { Text, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';

interface TypographyProps {
  textStyle?: StyleProp<TextStyle>;
  fontSize?: number;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  justifyContent?: 'center' | 'flex-start' | 'flex-end';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  label: string;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  bottom?: number;
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  borderRadius?: number;
  borderBottomWidth?: number;
  borderTopWidth?: number;
  borderWidth?: number;
  onPress?: () => void;
  marginVertical?: number;
  paddingBottom?: number;
  opacity?: number;
  paddingTop?: number;
  paddingLeft?: number;
  paddingHorizontal?: number;
  numberOfLines?: number;
  backgroundColor?: string;
  padding?: number;
  marginHorizontal?: number;
  paddingVertical?: number;
  disabled?: boolean;
  top?: number;
  display?: 'flex' | 'none';
  left?: number;
}

const Typography: React.FC<TypographyProps> = ({
  textStyle,
  fontSize,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  alignSelf,
  fontFamily,
  fontStyle,
  textAlign,
  label,
  color,
  fontWeight,
  bottom,
  width,
  height,
  borderColor,
  borderBottomWidth,
  borderTopWidth,
  borderWidth,
  onPress,
  marginVertical,
  paddingBottom,
  opacity,
  paddingTop,
  paddingHorizontal,
  numberOfLines,
  backgroundColor,
  padding,
  borderRadius,
  marginHorizontal,
  paddingVertical,
  disabled,
  top,
  display,
  left,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress || disabled}
      activeOpacity={0.8}
    >
      <Text
        numberOfLines={numberOfLines}
        allowFontScaling={false}
        maxFontSizeMultiplier={1}
        style={[
          {
            alignSelf: alignSelf,
            fontSize: fontSize || 12,
            color: color || 'black',
            marginTop: marginTop || 0,
            marginBottom: marginBottom || 0,
            marginLeft: marginLeft || 0,
            marginRight: marginRight || 0,
            fontFamily: fontFamily || Fonts.Regular,
            fontStyle: fontStyle || 'normal',
            textAlign: textAlign || 'left',
            fontWeight: fontWeight || '400',
            bottom: bottom,
            top: top,
            borderBottomWidth: borderBottomWidth,
            borderTopWidth: borderTopWidth,
            borderWidth: borderWidth,
            borderColor: borderColor,
            width: width,
            marginVertical: marginVertical,
            paddingBottom: paddingBottom,
            opacity: opacity,
            paddingTop: paddingTop,
            paddingHorizontal: paddingHorizontal,
            backgroundColor: backgroundColor,
            padding: padding,
            height: height,
            borderRadius: borderRadius,
            marginHorizontal: marginHorizontal,
            paddingVertical: paddingVertical,
            display: display,
            left: left,
          } as TextStyle,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Typography;
