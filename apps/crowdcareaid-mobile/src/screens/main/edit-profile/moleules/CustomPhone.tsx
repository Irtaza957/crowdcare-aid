import React, { FC, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import examples from 'libphonenumber-js/mobile/examples';
import { getExampleNumber } from 'libphonenumber-js';
import {
  CustomBottomSheet,
  CustomInput,
  FlashList,
  Icons,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { countryCodes } from './db';
import { normalizeSize } from '@crowdcareaid-frontend/utils';

interface CustomPhoneInputProps {
  label?: string;
  value: string;
  onChange: (text: string) => void;
  onPress?: (dialCode: string) => void;
  phoneCodeVal?: string;
  codeDisabled?: boolean;
  onBlur?: () => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  error?: string;
}

const CustomPhone: FC<CustomPhoneInputProps> = ({
  value,
  onChange,
  onPress,
  setCountryCode,
  countryCode,
  codeDisabled,
  onBlur,
  error,
}) => {
  const [visible, setVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(countryCodes);
  const [search, setSearch] = useState('');
  const [placeholder, setPlaceHolder] = useState('Enter Number');

  const filterData = (text: string) => {
    if (text?.length == 0) {
      setFilteredData(countryCodes);
    } else {
      const filtered = countryCodes.filter((item) =>
        item?.name?.toLowerCase()?.includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        style={styles.renderCountryCode}
        activeOpacity={0.6}
        onPress={() => {
          const exampleNumber = getExampleNumber(item.code, examples);

          setPlaceHolder(exampleNumber?.nationalNumber || '');
          setVisible(false);
          setCountryCode(item.code);
          onPress(item.dial_code);
        }}
      >
        <Image
          source={{
            uri: `https://flagcdn.com/48x36/${item.code.toLowerCase()}.png`,
            width: normalizeSize(25),
            height: normalizeSize(20),
          }}
          resizeMode="contain"
        />
        <Typography
          label={item.name}
          fontSize={15}
          fontFamily={Fonts.Regular}
          marginRight={5}
          marginLeft={10}
        />
        <Typography
          label={`(+${item.dial_code})`}
          fontSize={15}
          fontFamily={Fonts.Regular}
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputRow,
          {
            borderColor: Colors.lightGray,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.countryCodeView}
          activeOpacity={0.7}
          onPress={() => setVisible(true)}
          disabled={codeDisabled}
        >
          <Typography
            label={`+${countryCode}`}
            fontSize={15}
            fontFamily={Fonts.Regular}
          />
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <CustomInput
            value={value}
            onChangeText={(text) => {
              onChange(text);
            }}
            borderBottomLeftRadius={1}
            rightError={45}
            marginVertical={3}
            borderTopLeftRadius={1}
            placeholder={placeholder}
            placeholderTextColor={Colors?.lightGray}
            keyboardType="numeric"
            inputWidth={277}
            paddingTop={error ? 15 : 0}
            inputColor={Colors.Black}
            borderRadius={10}
            onBlur={onBlur}
            errorMessage={error}
            height={53}
            elevation={2}
          />
        </View>
      </View>

      <CustomBottomSheet
        isVisible={visible}
        height={'100%'}
        onClose={() => setVisible(false)}
      >
        <View style={styles.IconContainer}>
          <View style={styles.IconMain}>
            <View style={styles.Icon}>
              <Icons
                name="close"
                family="AntDesign"
                size={26}
                onPress={() => setVisible(false)}
              />
            </View>
            <View>
              <CustomInput
                placeholder="Enter Country Name"
                value={search}
                inputWidth={290}
                onChangeText={(text) => {
                  setSearch(text);
                  filterData(text);
                }}
                inputColor={Colors.Black}
                fontSize={14}
                height={50}
                width={'50%'}
              />
            </View>
          </View>
          <FlashList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            keyExtractor={(item) => item.code}
            renderItem={renderItem}
          />
        </View>
      </CustomBottomSheet>
    </View>
  );
};

export default CustomPhone;

const styles = StyleSheet.create({
  container: { marginVertical: normalizeSize(20) },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.white,
    elevation: 2,
    width: '100%',
    height: normalizeSize(55),
  },
  IconContainer: { height: '100%', paddingTop: 10, backgroundColor: 'white' },
  IconMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalizeSize(20),
    height: normalizeSize(35),
    justifyContent: 'space-around',
    width: '100%',
    marginTop: normalizeSize(20),
  },
  Icon: {
    height: '120%',
    width: '10%',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    elevation: 3,
    borderRadius: 20,
  },
  countryCodeView: {
    width: '15%',
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderCountryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors?.lightGray,
    paddingBottom: 5,
    marginBottom: 15,
    marginHorizontal: normalizeSize(20),
  },
});
