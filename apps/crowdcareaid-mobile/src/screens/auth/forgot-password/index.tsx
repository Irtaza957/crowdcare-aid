import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import {
  AuthWrapper,
  CustomButton,
  CustomInput,
  showToast,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize, validateEmail } from '@crowdcareaid-frontend/utils';
import { useForgotPasswordMutation } from '@crowdcareaid-frontend/store';

const ForgotPassword = ({ navigation, route }) => {
  const { forgetPassword } = route.params || {};

  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [ForgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handlePassword = async () => {
    if (email.trim() === '') {
      setError('Email not be empty.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const payload = {
        email,
      };
      // console.log('payload===========', payload);
      const res = (await ForgotPassword(payload)) as {
        data: {
          [x: string]: any;
          status: number;
          message: string;
        };
        error?: { data: { message: string } };
      };
      // console.log('res==========', res);

      if (res?.data?.status === 200) {
        navigation.navigate('CodeVerification', {
          email,
          forgetPassword,
          otpCode: res?.data?.otp,
        });
        showToast('success', res?.data?.message);
      } else {
        showToast('error', res?.error?.data?.message);
      }
    } catch (error) {
      showToast('error', error?.data?.message);
    }
  };
  return (
    <AuthWrapper
      headerText="Forgot Password"
      iconShow
      logo
      textColor={Colors.white}
      iconColor={Colors.Black}
      onPress={navigation.goBack}
      backgroundColor={
        forgetPassword ? Colors.SecondaryColor : Colors.PrimaryColor
      }
      statusBarColor={Colors.SecondaryColor}
    >
      <View style={{ flex: 0.5, paddingHorizontal: normalizeSize(4) }}>
        <CustomInput
          placeholder="Enter Email"
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          marginTop={normalizeSize(30)}
          errorMessage={error}
        />
      </View>
      <View style={styles.buttonView}>
        <CustomButton
          title="Send"
          backgroundColor={Colors.SecondaryColor}
          borderColor={Colors.SecondaryColor}
          onPress={handlePassword}
          loading={isLoading}
        />
      </View>
    </AuthWrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  Parent: {
    flex: 1,
  },
  buttonView: {
    flex: 0.5,
    justifyContent: 'flex-end',
    marginBottom: normalizeSize(30),
  },
});
