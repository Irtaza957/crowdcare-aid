import React, { useState } from 'react';
import {
  AuthWrapper,
  CustomButton,
  CustomInput,
  Typography,
  showToast,
} from '@crowdcareaid-frontend/native-components';
import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { Alert, View, StyleSheet } from 'react-native';
import { useCreateNewPasswordMutation } from '@crowdcareaid-frontend/store';

const NewPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params || {};
  const [showPassword, setShowPassword] = useState(false);
  const [confrim, setConfrim] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [createPassword, { isLoading }] = useCreateNewPasswordMutation();

  const handelCreatePassword = async () => {
    if (password.trim() === '' || confirmPassword.trim() === '') {
      setError('Password and Confirm Password not be empty empty.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password must be match');
      return;
    }
    try {
      const payload = {
        email: email,
        newPassword: password,
      };
      const res = await createPassword(payload);
      console.log('response========>>>>', res);
      if (res?.data?.status === 200) {
        navigation.navigate('LoginScreen');
        showToast('success', res.data.message);
      } else {
        Alert.alert('Error', res?.error?.data?.message);
      }
    } catch (error) {
      showToast('error', error.data.message);
    }
  };

  const handleIconPress = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirm = () => {
    setConfrim(!confrim);
  };
  return (
    <AuthWrapper
      headerText="New Password"
      iconShow={true}
      textColor={Colors.white}
      iconColor={Colors.Black}
      logo
      onPress={navigation.goBack}
      backgroundColor={Colors.SecondaryColor}
      statusBarColor={Colors.SecondaryColor}
    >
      <CustomInput
        placeholder="Enter New Password"
        isLeftIcon={true}
        value={password}
        secureTextEntry={!showPassword}
        onPress={handleIconPress}
        IconName={showPassword ? 'eye-outline' : 'eye-off-outline'}
        marginTop={normalizeSize(30)}
        onChangeText={(text) => {
          setPassword(text);
          setError('');
        }}
      />
      <CustomInput
        placeholder="Confirm Password"
        isLeftIcon={true}
        value={confirmPassword}
        secureTextEntry={!confrim}
        onPress={handleConfirm}
        IconName={confrim ? 'eye-outline' : 'eye-off-outline'}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setError('');
        }}
        errorMessage={error}
      />
      {/* {error ? (
          <Typography
            label={error}
            alignSelf="center"
            color={Colors.errorRed}
          />
        ) : null} */}
      <View style={styles.buttonView}>
        <CustomButton
          title="Send"
          backgroundColor={Colors.SecondaryColor}
          borderColor={Colors.SecondaryColor}
          marginTop={normalizeSize(40)}
          onPress={handelCreatePassword}
          loading={isLoading}
        />
      </View>
    </AuthWrapper>
  );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: normalizeSize(40),
  },
});
