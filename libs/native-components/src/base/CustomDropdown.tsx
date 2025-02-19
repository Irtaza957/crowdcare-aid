import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';
import Typography from './Typography';

type CustomDropdownProps = {
  data: AutocompleteDropdownItem[];
  placeholder?: string;
  onSelectItem: (item: AutocompleteDropdownItem | null) => void;
  initialValue?: any;
  marginBottom?: number;
  marginTop?: number;
  errorMessage?: string;
  fontSize?: number;
  placeholderTextColor?: string;
  inputHeight?: number;
  width?: number | string;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  placeholder,
  onSelectItem,
  initialValue,
  marginTop,
  marginBottom,
  errorMessage,
  fontSize,
  placeholderTextColor,
  inputHeight,
  width,
}) => {
  return (
    <>
      <View
        style={[
          styles.container,
          { marginTop: marginTop, marginBottom: marginBottom },
        ]}
      >
        <View>
          <AutocompleteDropdown
            dataSet={data}
            onSelectItem={onSelectItem}
            initialValue={initialValue}
            textInputProps={{
              placeholder: placeholder,
              placeholderTextColor: placeholderTextColor,
              autoCapitalize: 'none',
              style: {
                backgroundColor: Colors.white,
                color: Colors.Black,
                paddingLeft: 18,
                fontSize: fontSize,
              },
            }}
            suggestionsListTextStyle={{ backgroundColor: Colors.white }}
            inputContainerStyle={{
              backgroundColor: Colors.white,
              borderRadius: 5,
              elevation: 4,
              width: width as number | undefined,
            }}
            suggestionsListContainerStyle={{ backgroundColor: Colors.white }}
            inputHeight={inputHeight}
            debounce={600}
          />
        </View>
      </View>
      {errorMessage && (
        <Typography
          label={errorMessage}
          marginLeft={5}
          fontSize={10}
          top={normalizeSize(10)}
          color={Colors.errorRed}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: Colors.gray10,
  },
});

export default CustomDropdown;
