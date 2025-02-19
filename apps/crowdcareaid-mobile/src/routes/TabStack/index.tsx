import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/main/home';
import ProfileScreen from '../../screens/main/profile-screen';
import { Icons } from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { Colors } from '@crowdcareaid-frontend/assets';
import { RootStackParamList } from '../types';
import SearchScreen from '../../screens/main/search';
import FavoritesScreen from '../../screens/main/favorites';
import { StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator<RootStackParamList>();
const TabStack = () => {
  return (
    <View style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: Colors.PrimaryColor,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.white,
            height: normalizeSize(55),
            marginBottom: normalizeSize(15),
            width: '90%',
            alignSelf: 'center',
            borderRadius: 30,
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icons
                family="MaterialCommunityIcons"
                name="home"
                size={32}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icons
                family="MaterialIcons"
                name="search"
                size={32}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icons
                family="MaterialCommunityIcons"
                name="hand-heart"
                size={32}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icons family="FontAwesome" name="user" size={25} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabStack;
