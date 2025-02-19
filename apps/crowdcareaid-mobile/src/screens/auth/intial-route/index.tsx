import { ActivityIndicator, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@crowdcareaid-frontend/assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppNavigation } from '../../../routes';

const InitialScreen = () => {
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('isAuth');
        const hasCompletedOnboarding = await AsyncStorage.getItem(
          'hasCompletedOnboarding'
        );

        console.log(
          'hasCompletedOnboarding=============',
          hasCompletedOnboarding
        );

        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabStack' }],
          });
          console.log('Token found, navigating to TabStack', token);
        } else if (hasCompletedOnboarding === 'true') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });

          console.log('Onboarding not completed, navigating to OnBoarding');
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'OnBoarding' }],
          });
          console.log('Onboarding completed, navigating to GetStarted');
        }
      } catch (error) {
        console.error('Error retrieving data', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={Colors.SecondaryColor}
          size={'large'}
        />
      ) : null}
    </View>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
