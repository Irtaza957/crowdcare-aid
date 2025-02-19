import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../screens/auth/signup';
import LoginScreen from '../screens/auth/login';
import ForgotPassword from '../screens/auth/forgot-password';
import NewPasswordScreen from '../screens/auth/new-password';
import CodeVerification from '../screens/auth/code-verification';
import OnBoarding from '../screens/auth/on-boarding';
import TabStack from './TabStack';
import EditProfile from '../screens/main/edit-profile';
import SettingScreen from '../screens/main/setting';
import CampaignScreen from '../screens/main/campaign';
import CampaignDetail from '../screens/main/campaign-detail';
import InitialScreen from '../screens/auth/intial-route';
import { RootStackParamList } from './types';
import ChangePassword from '../screens/auth/change-password';
import PaymentScreen from '../screens/main/payment';
import PrivacyPolicy from '../screens/main/privacy';
import TermsCondition from '../screens/main/terms-condition';
import DonationHistory from '../screens/main/donation-history';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="InitialScreen"
      >
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CodeVerification" component={CodeVerification} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="CampaignScreen" component={CampaignScreen} />
        <Stack.Screen name="CampaignDetail" component={CampaignDetail} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="TermsCondition" component={TermsCondition} />
        <Stack.Screen name="DonationHistory" component={DonationHistory} />
        <Stack.Screen name="TabStack" component={TabStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

export * from './types';
