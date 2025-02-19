import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { LoginStyles } from './style';
import {
  AuthWrapper,
  CustomInput,
  Typography,
  CustomButton,
  showToast,
  SocialLogin,
} from '@crowdcareaid-frontend/native-components';
import { normalizeSize, validateEmail } from '@crowdcareaid-frontend/utils';
import {
  setFcmToken,
  useAppDispatch,
  useLoginMutation,
} from '@crowdcareaid-frontend/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from '@crowdcareaid-frontend/store';
import { CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';
const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [Login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    if (email.trim() === '') {
      setEmailError('Email cannot be empty.');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (password.trim() === '') {
      setPasswordError('Password cannot be empty.');
      return;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const res = await Login({ email, password, loginType: 'email' }).unwrap();
      if (res) {
        await AsyncStorage.setItem('isAuth', res?.data?.access_token);
        dispatch(setUserData(res?.data));
        showToast('success', 'Login Successful');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'TabStack' }],
          })
        );
      }
    } catch (err) {
      showToast('error', err?.data?.message);
      console.log('rerrererer==', err);
    }
  };

  const handleIconPress = () => {
    setShowPassword(!showPassword);
  };

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }
  // const getToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log('token =====>>>', token);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   requestUserPermission();
  //   getToken();
  // }, []);

  const checkApplicationPermission = async () => {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus) {
      console.log('User has notification permissions enabled');
    } else {
      console.log('User has notification permissions disabled');
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    dispatch(setFcmToken(fcmToken));
    if (!fcmToken) {
      try {
        const newToken = await messaging().getToken();
        console.log('newToken=========......', newToken);
        if (newToken) {
          await AsyncStorage.setItem('fcmToken', newToken);
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    }
  };
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  };

  const onMessageReceived = async (message) => {
    console.log('message========>>>>>>', message);
    const channelId = await notifee.createChannel({
      id: 'order',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });
    const notificationText = message.notification?.body || message.body;
    const notificationTitle = message.notification?.title || message.title;
    notifee.displayNotification({
      title: notificationTitle,

      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },

      android: {
        channelId: channelId,
        // smallIcon: 'ic_stat_name',
        // Set color of icon (Optional, defaults to white)
        color: Colors?.PrimaryColor,
        importance: AndroidImportance.HIGH,
      },
    });
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      checkApplicationPermission();
    }
    requestUserPermission();
  }, []);

  return (
    <AuthWrapper
      headerText="Welcome Back"
      textColor={Colors.white}
      bottomView={true}
      text1="Don’t have an account?"
      text2=" Sign Up"
      bottomOnPress={() => navigation.navigate('SignUpScreen')}
      statusBarColor={Colors.PrimaryColor}
      backgroundColor={Colors.PrimaryColor}
      logo={true}
    >
      <CustomInput
        placeholder="Enter Email"
        isLeftIcon={true}
        fontSize={normalizeSize(14)}
        IconName="user"
        IconFamily="Feather"
        marginTop={normalizeSize(30)}
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          setEmailError('');
        }}
        errorMessage={emailError}
      />
      <CustomInput
        placeholder="Enter Password"
        isLeftIcon={true}
        fontSize={normalizeSize(14)}
        value={password}
        IconName={showPassword ? 'eye-outline' : 'eye-off-outline'}
        IconFamily="Ionicons"
        onChangeText={(t) => {
          setPassword(t);
          setPasswordError('');
        }}
        secureTextEntry={!showPassword}
        onPress={handleIconPress}
        errorMessage={passwordError}
      />
      <View style={{ width: '40%', alignSelf: 'flex-end' }}>
        <Typography
          textStyle={{ textDecorationLine: 'underline' }}
          fontSize={14}
          label="Forgot Password"
          onPress={() =>
            navigation.navigate('ForgotPassword', { forgetPassword: true })
          }
          alignSelf="flex-end"
          color={Colors.SecondaryColor}
        />
      </View>
      <View style={{ paddingHorizontal: Platform.OS === 'ios' ? 0 : 3 }}>
        <CustomButton
          title="Sign In"
          marginTop={normalizeSize(40)}
          onPress={handleSignIn}
          loading={isLoading}
        />
      </View>
      <View style={LoginStyles.concat}>
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
        <View style={{ paddingHorizontal: 10 }}>
          <SocialLogin />
        </View>
      </View>
    </AuthWrapper>
  );
};

export default LoginScreen;
