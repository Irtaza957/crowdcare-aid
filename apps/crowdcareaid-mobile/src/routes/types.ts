import { useNavigation, NavigationProp } from '@react-navigation/native';

// types.ts
export type AuthStackParamList = {
  InitialScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotPassword: undefined;
  CodeVerification: undefined;
  NewPasswordScreen: undefined;
};

export type MainStackParamList = {
  HomeScreen: undefined;
  OnBoarding: undefined;
  EditProfile: undefined;
  SettingScreen: undefined;
  CampaignScreen: undefined;
  CampaignDetail: { item: any };
  TabStack: undefined;
  FAQ: undefined;
  ChangePassword: undefined;
  PaymentScreen: undefined;
  PrivacyPolicy: undefined;
  TermsCondition: undefined;
  DonationHistory: undefined;
  Version: undefined;
  DeleteAccount: undefined;
};

export type TabStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  SearchScreen: undefined;
  FavoritesScreen: undefined;
};
// Combined stack navigator types
export type RootStackParamList = AuthStackParamList &
  MainStackParamList &
  TabStackParamList;

export type ScreenNavigationProp = NavigationProp<RootStackParamList>;
export const useAppNavigation: () => ScreenNavigationProp = useNavigation;
