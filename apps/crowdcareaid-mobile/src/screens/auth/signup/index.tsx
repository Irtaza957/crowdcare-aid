import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import {
  AuthWrapper,
  CustomButton,
  CustomInput,
  SocialLogin,
  Typography,
  showToast,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { useSignUpMutation } from '@crowdcareaid-frontend/store';
import { LoginStyles } from '../login/style';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [SignUp, { isLoading }] = useSignUpMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/g;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onPressRegister = async () => {
    setPasswordError('');
    setConfirmPasswordError('');
    setEmailError('');
    setFirstNameError('');
    setLastNameError('');
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    } else if (!specialCharacterPattern.test(password)) {
      setPasswordError('Password must contain at least one special character');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const res = await SignUp({
        email,
        password,
        firstName,
        lastName,
      }).unwrap();
      console.log('SignUp================', res);
      if (res.status === 201 && res?.data?.emailVerified) {
        navigation.navigate('Login');
      } else {
        showToast('success', res?.message);
        navigation.navigate('CodeVerification', {
          email,
          otpCode: res?.data?.otp,
        });
      }
    } catch (err) {
      if (err.data && err.data.message) {
        showToast('error', err.data.message);
      } else {
        showToast('error', 'An unexpected error occurred');
      }
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPasswordVisibilityToggle = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <AuthWrapper
      backgroundColor={Colors.PrimaryColor}
      bottomView={true}
      textColor={Colors.white}
      logo
      iconColor={Colors.Black}
      onPress={navigation.goBack}
      statusBarColor={Colors.PrimaryColor}
      text1="Already have an account? "
      bottomOnPress={() => navigation.navigate('LoginScreen')}
      text2="Sign in"
      headerText="Create Your Account"
    >
      <ScrollView contentContainerStyle={LoginStyles.scrollViewContent}>
        <View style={LoginStyles.mainContainer}>
          <CustomInput
            placeholder="First Name"
            inputWidth={normalizeSize(160)}
            value={firstName}
            onChangeText={(newFirstName) => {
              setFirstName(newFirstName);
              if (firstNameError && newFirstName.trim()) {
                setFirstNameError('');
              }
            }}
            errorMessage={firstNameError}
          />
          <CustomInput
            placeholder="Last Name"
            inputWidth={normalizeSize(160)}
            value={lastName}
            onChangeText={(newLastName) => {
              setLastName(newLastName);
              if (lastNameError && newLastName.trim()) {
                setLastNameError('');
              }
            }}
            errorMessage={lastNameError}
          />
        </View>
        <View style={{ paddingHorizontal: normalizeSize(4) }}>
          <CustomInput
            placeholder="Enter Email"
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail);
              if (emailError) {
                if (!newEmail.trim()) {
                  setEmailError('Email is required');
                } else if (!emailPattern.test(newEmail)) {
                  setEmailError('Please enter a valid email');
                } else {
                  setEmailError('');
                }
              }
            }}
            errorMessage={emailError}
          />
        </View>
        <CustomInput
          placeholder="Enter Password"
          isLeftIcon={true}
          IconName={showPassword ? 'eye' : 'eye-off'}
          family="Feather"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(newPassword) => {
            setPassword(newPassword);
            if (passwordError) {
              if (
                newPassword.length >= 8 &&
                specialCharacterPattern.test(newPassword)
              ) {
                setPasswordError('');
              } else if (newPassword.length >= 8) {
                setPasswordError(
                  'Password must contain at least one special character'
                );
              } else if (specialCharacterPattern.test(newPassword)) {
                setPasswordError('Password must be at least 8 characters long');
              }
            }
            if (confirmPasswordError && newPassword === confirmPassword) {
              setConfirmPasswordError('');
            }
          }}
          onPress={handlePasswordVisibilityToggle}
          errorMessage={passwordError}
        />

        <CustomInput
          placeholder="Confirm Password"
          isLeftIcon={true}
          IconName={showConfirmPassword ? 'eye' : 'eye-off'}
          family="Feather"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={(newConfirmPassword) => {
            setConfirmPassword(newConfirmPassword);
            if (confirmPasswordError && password === newConfirmPassword) {
              setConfirmPasswordError('');
            }
          }}
          onPress={handleConfirmPasswordVisibilityToggle}
          errorMessage={confirmPasswordError}
        />

        <CustomButton
          title="Sign Up"
          marginTop={normalizeSize(25)}
          onPress={onPressRegister}
          loading={isLoading}
          marginBottom={normalizeSize(30)}
        />

        <View style={LoginStyles.lineView}>
          <View style={LoginStyles.bar} />
          <Typography
            fontSize={normalizeSize(14)}
            label="OR"
            color={Colors.lightGray}
            fontFamily={Fonts.Medium}
            marginLeft={10}
            marginRight={10}
          />
          <View style={LoginStyles.bar} />
        </View>

        <View
          style={{ paddingHorizontal: 10, marginBottom: normalizeSize(10) }}
        >
          <SocialLogin />
        </View>
      </ScrollView>
    </AuthWrapper>
  );
};

export default SignUpScreen;
