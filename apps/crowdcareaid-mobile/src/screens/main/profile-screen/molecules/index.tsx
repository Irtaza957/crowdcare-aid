import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, SVGS } from '@crowdcareaid-frontend/assets';
import {
  CustomBottomSheet,
  DataModal,
  Icons,
  showToast,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { useLogoutMutation } from '@crowdcareaid-frontend/store';
import { RootStackParamList, useAppNavigation } from '../../../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MenuItem = {
  label: string;
  icon: JSX.Element;
  screen?: keyof RootStackParamList;
  url?: string;
};
type ModalKey = 'SignOut' | 'AnotherModal';

const menuItems: MenuItem[] = [
  { label: 'My Profile', icon: <SVGS.User />, screen: 'EditProfile' },
  { label: 'Payment History', icon: <SVGS.Payment />, screen: 'PaymentScreen' },
  { label: 'Setting', icon: <SVGS.Setting />, screen: 'SettingScreen' },
  {
    label: 'Privacy policy',
    icon: <SVGS.Shield />,
    url: 'https://crowdcareaid.com/privacy-policy/',
  },
  {
    label: 'Terms & Condition',
    icon: <SVGS.Terms />,
    url: 'https://crowdcareaid.com/terms-conditions/',
  },
  { label: 'Sign Out', icon: <SVGS.SignOut /> },
];

const ProfileComponent: React.FC = () => {
  const navigation = useAppNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [Logout, { isError, isLoading, isSuccess }] = useLogoutMutation();

  const handleLinking = (url) => {
    Linking.openURL(url);
  };

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('isAuth');
    console.log('first,', token);
    const payload = {
      access_token: token,
    };
    console.log('payload===', payload);
    try {
      const res = await Logout(payload);
      console.log('first', res);
      if (res?.data?.status === 200) {
        showToast('success', res?.data?.message);
        AsyncStorage.removeItem('isAuth');
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
        console.log('Logout successful:', res);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handlePress = (key: keyof RootStackParamList) => {
    if (key) {
      navigation.navigate(key);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.main}
          activeOpacity={0.8}
          onPress={() =>
            item.url ? handleLinking(item.url) : handlePress(item.screen)
          }
        >
          <View style={styles.dataView}>
            {item.icon}
            <Typography
              label={item.label}
              fontFamily={Fonts.Medium}
              fontSize={normalizeSize(17)}
              fontWeight={'700'}
              color={Colors.green}
            />
          </View>
          <Icons name="keyboard-arrow-right" family="MaterialIcons" size={20} />
        </TouchableOpacity>
      ))}
      <CustomBottomSheet
        onClose={() => setModalVisible(false)}
        isVisible={modalVisible}
        justifyContent="center"
        height={200}
      >
        <DataModal
          buttonTitleOne="Yes"
          buttonTitleTwo="No"
          mainText="Are you sure you want to sign out this account?"
          headerText="Sign out"
          onPressOne={() => setModalVisible(false)}
          onPressTwo={handleLogout}
          isLoading={isLoading}
        />
      </CustomBottomSheet>
    </View>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '90%',
    alignItems: 'center',
    paddingHorizontal: normalizeSize(20),
    borderRadius: normalizeSize(10),
    alignSelf: 'center',
    height: normalizeSize(50),
    elevation: 4,
    marginVertical: normalizeSize(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalizeSize(30),
  },
});
