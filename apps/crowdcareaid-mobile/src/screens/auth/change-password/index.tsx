import { View } from 'react-native';
import React, { useState } from 'react';
import {
  AuthWrapper,
  CustomButton,
  CustomInput,
  showToast,
} from '@crowdcareaid-frontend/native-components';
import { Colors } from '@crowdcareaid-frontend/assets';
import { useAppNavigation } from '../../../routes';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { useChangePasswordMutation } from '@crowdcareaid-frontend/store';

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useAppNavigation();

  const [ChangePassword, { isError, isLoading, isSuccess }] =
    useChangePasswordMutation();

  const handlePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Password do not match.');
      return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Fields Are Required.');
      return;
    }

    try {
      const payload = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      const res = await ChangePassword(payload);
      if (res?.data?.status === 200) {
        showToast('success', res?.data?.message);
        console.log('ChangePassword=======', res);
        navigation.navigate('LoginScreen');
      } else {
        showToast('error', res?.error?.data?.message);
        setError('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconPress = (type) => {
    switch (type) {
      case 'old':
        setShowOldPassword(!showOldPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <AuthWrapper
      headerText="Change Password"
      backgroundColor={Colors.PrimaryColor}
      iconShow={true}
      iconColor={Colors.Black}
      logo
      textColor={Colors.white}
      onPress={navigation.goBack}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <CustomInput
            placeholder="Old Password"
            isLeftIcon={true}
            value={oldPassword}
            secureTextEntry={!showOldPassword}
            onPress={() => handleIconPress('old')}
            IconName={showOldPassword ? 'eye-outline' : 'eye-off-outline'}
            marginTop={normalizeSize(30)}
            onChangeText={(text) => setOldPassword(text)}
            errorMessage={error}
          />
          <CustomInput
            placeholder="Enter New Password"
            isLeftIcon={true}
            value={newPassword}
            secureTextEntry={!showNewPassword}
            onPress={() => handleIconPress('new')}
            IconName={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
            onChangeText={(text) => setNewPassword(text)}
            errorMessage={error}
          />
          <CustomInput
            placeholder="Confirm Password"
            isLeftIcon={true}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
            onPress={() => handleIconPress('confirm')}
            IconName={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
            onChangeText={(text) => setConfirmPassword(text)}
            errorMessage={error}
          />
        </View>
        <CustomButton
          title="Continue"
          marginBottom={normalizeSize(20)}
          onPress={handlePassword}
          loading={isLoading}
        />
      </View>
    </AuthWrapper>
  );
};

export default ChangePassword;
