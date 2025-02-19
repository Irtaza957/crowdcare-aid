import React, { useEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, SVGS } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import Typography from './Typography';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useSocialSignupMutation } from 'libs/store/src/slices/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData, useAppDispatch } from '@crowdcareaid-frontend/store';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';
import { Item } from '@radix-ui/react-select';

interface ButtonData {
  label: string;
  svg: JSX.Element;
  onPress: () => void;
}

const SocialLogin: React.FC = () => {
  const [SocialSignUp, { isLoading }] = useSocialSignupMutation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '322108436824-76oo59vm24ajj17scienefvtr6ae904n.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '322108436824-0k70qc6s5bffv6efa0he76goabr058g1.apps.googleusercontent.com',
    });
  }, []);

  const HandleSocialLogin = async (
    socialSite: string,
    SocialId: string | null
  ) => {
    const payload = {
      socialSite,
      accessToken: SocialId,
    };
    console.log('payload===>>>', payload);
    try {
      const res = await SocialSignUp(payload);

      await AsyncStorage.setItem('isAuth', res?.data?.data?.access_token);
      dispatch(setUserData(res?.data?.data));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'TabStack' }],
        })
      );
      console.log('res==>>>>>>', res);
    } catch (err) {
      console.error('Social Login', err);
    }
  };

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      await HandleSocialLogin('Google', response?.data?.idToken);
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const { code } = error as { code: string };
        if (code === statusCodes.SIGN_IN_CANCELLED) {
          alert('User cancelled the login flow!');
        } else if (code === statusCodes.IN_PROGRESS) {
          alert('Signin in progress');
        } else if (code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          alert('Google Play services not available or outdated!');
        } else {
          console.log(error.code);
        }
      } else {
        console.log('Unknown error:', error);
      }
    }
  };

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('==> Login cancelled');
        } else {
          console.log(result);
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log('data=====>>>>>>', data);
            HandleSocialLogin('Facebook', data?.accessToken);
          });
        }
      },
      function (error) {
        console.log('==> Login fail with error: ' + error);
      }
    );
  };

  const buttonData: ButtonData[] = [
    {
      label: 'Continue With Google',
      svg: <SVGS.Google />,
      onPress: () => GoogleSingUp(),
    },
    {
      label: 'Continue With Facebook',
      svg: <SVGS.Facebook />,
      onPress: () => loginWithFacebook(),
    },
  ];

  return (
    <View>
      {buttonData.map((button, index) => (
        <TouchableOpacity
          style={styles.container}
          key={index}
          activeOpacity={0.7}
          onPress={button.onPress}
        >
          {button.svg}
          <Typography
            fontSize={12}
            label={button.label}
            marginLeft={normalizeSize(60)}
            color={Colors.Black}
            fontFamily={Fonts.Medium}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: 54,
    paddingHorizontal: normalizeSize(20),
    borderRadius: normalizeSize(7),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalizeSize(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 2,
    borderWidth: 0,
    borderColor: '#ccc',
  },
});
