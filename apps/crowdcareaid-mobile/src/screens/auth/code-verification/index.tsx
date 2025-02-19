import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  AuthWrapper,
  CustomButton,
  Typography,
  OtpField,
  showToast,
} from '@crowdcareaid-frontend/native-components';
import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from '@crowdcareaid-frontend/store';

const CodeVerification = ({ navigation, route }) => {
  const { email, forgetPassword } = route.params || {};

  const [otp, setOtp] = useState('');
  const [VerifyOTP, { isError, isLoading }] = useVerifyOTPMutation();
  const [ResendOtp, { isLoading: isResendLoading }] = useResendOTPMutation();
  const [sec, setSec] = useState(120);
  const timerRef = useRef(null);

  const resendOtpHandle = async () => {
    try {
      const payload = {
        email,
      };
      const res = await ResendOtp(payload);
      console.log('resend-OTP==============', res);
      resetTimer();
      navigation.setParams({ otpCode: res?.data?.otp });
      if (res.data.status === 200) {
        showToast('success', res.data.message);
      }
    } catch (error) {
      showToast('error', error.data?.message);
    }
  };

  const handleVerify = async () => {
    try {
      const payload = {
        email,
        otp,
      };
      console.log('email========', email);
      console.log('payload===========', payload);
      const res = (await VerifyOTP(payload)) as {
        data: { status: number; message: string };
        error?: { data: { message: string } };
      };
      // console.log('res==========>>', res);

      if (res?.data?.status === 200) {
        if (forgetPassword) {
          navigation.navigate('NewPasswordScreen', {
            email,
          });
        } else {
          navigation.navigate('LoginScreen');
        }
        showToast('success', res?.data?.message);
      } else {
        showToast('error', res?.error?.data?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    const startTime = new Date().getTime();
    const endTime = startTime + 1 * 60 * 1000;
    timerRef.current = setInterval(() => {
      const currentTime = new Date().getTime();
      const differenceInSeconds = Math.floor((endTime - currentTime) / 1000);

      if (differenceInSeconds >= 0) {
        setSec(differenceInSeconds);
      } else {
        clearInterval(timerRef.current);
        setSec(0);
      }
    }, 1000);
  };

  useEffect(() => {
    resetTimer();

    return () => clearInterval(timerRef.current);
  }, []);

  const minutes = Math.floor(sec / 60);
  const remainingSeconds = sec % 60;
  return (
    <AuthWrapper
      headerText={'OTP Verification'}
      iconShow={true}
      textColor={Colors.white}
      iconColor={Colors.Black}
      onPress={navigation.goBack}
      backgroundColor={
        forgetPassword ? Colors.SecondaryColor : Colors.PrimaryColor
      }
      statusBarColor={
        forgetPassword ? Colors.SecondaryColor : Colors.PrimaryColor
      }
      logo
    >
      <Typography
        label="We sent a verification code to your email.
        Enter verification code here!"
        textAlign="center"
        alignSelf="center"
        marginTop={normalizeSize(60)}
        fontSize={normalizeSize(14)}
        color={Colors?.lightGray}
      />

      <OtpField value={otp} onChangeText={setOtp} />
      {isError && (
        <Typography
          label="Verification failed. Please try again."
          alignSelf="center"
          color={Colors.errorRed}
          marginTop={normalizeSize(20)}
        />
      )}
      <View style={styles.otpView}>
        <Typography
          label={'Didn’t receive the OTP?'}
          alignSelf="center"
          color={Colors.SecondaryColor}
          fontSize={normalizeSize(15)}
          marginTop={normalizeSize(10)}
        />
        <Typography
          label={`${
            sec > 0
              ? `${minutes}:${
                  remainingSeconds < 10 ? '0' : ''
                }${remainingSeconds}`
              : 'Resend OTP'
          }`}
          alignSelf="center"
          color={sec > 0 ? Colors?.disabled : Colors.SecondaryColor}
          fontSize={normalizeSize(15)}
          marginTop={normalizeSize(10)}
          textStyle={{ textDecorationLine: 'underline' }}
          width={100}
          onPress={resendOtpHandle}
          disabled={sec !== 0 || isResendLoading}
        />
      </View>

      <View style={styles.buttonView}>
        <CustomButton
          title="Continue"
          backgroundColor={
            forgetPassword ? Colors.SecondaryColor : Colors.PrimaryColor
          }
          borderColor={
            forgetPassword ? Colors.SecondaryColor : Colors.PrimaryColor
          }
          onPress={handleVerify}
          loading={isLoading}
        />
      </View>
    </AuthWrapper>
  );
};

export default CodeVerification;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: normalizeSize(40),
  },
  otpView: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: normalizeSize(10),
    marginLeft: normalizeSize(50),
  },
});
