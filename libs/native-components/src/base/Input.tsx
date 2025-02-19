import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Typography from './Typography';
import Icons from '../organisms/Icons';
import { Colors } from '@crowdcareaid-frontend/assets';
import { TextStyle, KeyboardTypeOptions, FlexAlignType } from 'react-native';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
interface CustomInputProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  IconName?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  marginRight?: number;
  marginLeft?: number;
  withLabel?: string;
  borderBottomColor?: string;
  labelStyle?: TextStyle;
  width?: string | number;
  borderRadius?: number;
  height?: number;
  paddingHorizontal?: number;
  searchIcon?: boolean;
  borderColor?: string;
  marginBottom?: number;
  alignSelf?: FlexAlignType;
  borderWidth?: number;
  backgroundColor?: string;
  errorMessage?: string;
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  leftIconSource?: number;
  marginTop?: number;
  multiline?: boolean;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  placeholderTextColor?: string;
  fontSize?: number;
  borderBottomWidth?: number;
  textAlign?: 'left' | 'right' | 'center';
  paddingTop?: number;
  searchImage?: boolean;
  inputColor?: string;
  fontWeight?: TextStyle['fontWeight'];
  inputWidth?: number;
  family?: string;
  readOnly?: boolean;
  right?: number;
  borderBottomLeftRadius?: number;
  borderTopLeftRadius?: number;
  marginVertical?: number;
  textInputMarginLeft?: number;
  elevation?: number;
  rightError?: number;
  shadowProps?: {
    shadowColor?: string;
    shadowOffset?: { width: number; height: number };
    shadowOpacity?: number;
    shadowRadius?: number;
  };
  onPress?: () => void;
  IconFamily?: string;
  size?: number;
  onBlur?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  onChangeText,
  value,
  IconName,
  marginVertical,
  keyboardType,
  withLabel,
  labelStyle,
  width,
  borderRadius,
  textAlign,
  textAlignVertical,
  height,
  paddingHorizontal,
  searchIcon,
  borderColor,
  marginBottom,
  alignSelf,
  borderWidth,
  backgroundColor,
  isLeftIcon,
  isRightIcon,
  marginTop,
  multiline,
  placeholderTextColor,
  fontSize,
  borderBottomWidth,
  paddingTop,
  fontWeight,
  inputColor,
  leftIconSource,
  inputWidth,
  readOnly,
  family,
  onPress,
  secureTextEntry,
  shadowProps,
  right,
  textInputMarginLeft,
  errorMessage,
  IconFamily,
  size,
  onBlur,
  borderBottomLeftRadius,
  borderTopLeftRadius,
  elevation,
  rightError,
}) => {
  return (
    <View
      style={{
        width: inputWidth || '100%',
        marginBottom: marginBottom || 10,
        alignSelf: alignSelf || 'flex-start',
        marginTop: marginTop,
        paddingTop: paddingTop,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          borderRadius: borderRadius || 6,
          borderBottomLeftRadius: borderBottomLeftRadius,
          borderTopLeftRadius: borderTopLeftRadius,
          height: height || 54,
          width: inputWidth,
          borderWidth: borderWidth,
          alignSelf: 'center',
          paddingHorizontal: 10,
          alignItems: 'center',
          borderBottomWidth: borderBottomWidth,
          borderColor: borderColor || 'white',
          marginVertical: marginVertical || 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2.5,
          elevation: elevation || 4,
        }}
      >
        {withLabel && (
          <Typography
            textStyle={labelStyle}
            fontSize={14}
            fontWeight={'400'}
            color="#858585"
            label={withLabel}
            fontFamily="green"
          />
        )}
        {isRightIcon && (
          <TouchableOpacity onPress={onPress}>
            <Icons
              name={IconName}
              family={IconFamily}
              color={Colors.lightGray}
              size={size || 30}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={{
            width: searchIcon || isLeftIcon ? '92%' : '100%',
            height: '100%',
            color: inputColor || 'black',
            paddingHorizontal: 10,
            fontSize: fontSize || 14,
            fontWeight: fontWeight || 'normal',
            right: right,
          }}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          textAlignVertical={textAlignVertical}
          placeholderTextColor={placeholderTextColor}
          value={value}
          multiline={multiline}
          textAlign={textAlign}
          editable={!readOnly}
          onBlur={onBlur}
        />
        {isLeftIcon && (
          <TouchableOpacity
            onPress={onPress}
            style={{ justifyContent: 'center' }}
          >
            <Icons
              name={IconName}
              family={IconFamily}
              color={Colors.lightGray}
              size={size || 20}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ right: rightError }}>
        {errorMessage && (
          <Typography
            label={errorMessage}
            marginLeft={5}
            fontSize={10}
            color={'red'}
          />
        )}
      </View>
    </View>
  );
};

export default CustomInput;
