import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {
  useAppNavigation,
  MainStackParamList,
  RootStackParamList,
} from '../../../routes';
import { useDeleteAccountMutation } from '@crowdcareaid-frontend/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MenuItem = {
  label: string;
  icon: JSX.Element;
  screen?: keyof MainStackParamList;
  url?: string;
};
const menuItems: MenuItem[] = [
  { label: 'Version 0.2.1', icon: <SVGS.Version />, screen: 'Version' },
  { label: 'FAQ', icon: <SVGS.FAQ />, url: 'https://crowdcareaid.com/faq' },
  { label: 'Change password', icon: <SVGS.Lock />, screen: 'ChangePassword' },
  { label: 'Delete Account', icon: <SVGS.Delete />, screen: 'DeleteAccount' },
];

const ProfileComponent: React.FC = () => {
  const navigation = useAppNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [DeleteAccount, { isError, isLoading, isSuccess }] =
    useDeleteAccountMutation();

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem('isAuth');
    const payload = {
      token: token,
    };
    try {
      const res = await DeleteAccount(payload);
      if (res?.data?.status === 200) {
        showToast('success', res?.data?.message);
        console.log('deleteRess=======', res);
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleLink = (url) => {
    Linking.openURL(url);
  };
  const handlePress = (screen: keyof RootStackParamList) => {
    if (screen === 'DeleteAccount') {
      setModalVisible(true);
    } else {
      navigation.navigate(screen);
    }
  };
  return (
    <View style={styles.Parent}>
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={navigation.goBack}>
          <Icons
            family="Octicons"
            name="arrow-left"
            size={normalizeSize(30)}
            color={Colors.green}
          />
        </TouchableOpacity>
        <Typography
          label={'Setting'}
          fontFamily={Fonts.Bold}
          fontSize={normalizeSize(25)}
          color={Colors.green}
          textAlign="center"
          marginBottom={normalizeSize(20)}
        />
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.main}
          onPress={() =>
            item.url ? handleLink(item.url) : handlePress(item.screen)
          }
          activeOpacity={0.8}
        >
          <View style={styles.dataView}>
            {item.icon}
            <Typography
              label={item.label}
              fontFamily={Fonts.Medium}
              fontSize={16}
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
          headerText="Delete Account"
          onPressOne={() => setModalVisible(false)}
          onPressTwo={handleDelete}
          isLoading={isLoading}
        />
      </CustomBottomSheet>
    </View>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  Parent: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical:
      Platform.OS === 'ios' ? normalizeSize(70) : normalizeSize(40),
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '100%',
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
