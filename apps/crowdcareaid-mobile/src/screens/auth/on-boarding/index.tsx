import React, { useState, useRef, useCallback } from 'react';
import { SafeAreaView, View, FlatList, Image, Dimensions } from 'react-native';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import {
  CustomButton,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { styles } from './style';
import { OnBoardingData } from './data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const OnBoarding = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);
  const renderSlider = useCallback(({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={item.svgOnBoarding}
          style={styles.image}
          resizeMode="contain"
        />
        <Typography
          label={item.data}
          fontSize={25}
          fontFamily={Fonts.Bold}
          alignSelf="center"
          color={Colors.green}
          marginBottom={30}
        />
        <Typography
          label={item.heading}
          textAlign="center"
          width={width * 0.8}
          fontSize={14}
          color={Colors.lightGray}
          fontFamily={Fonts.Regular}
          marginBottom={normalizeSize(60)}
        />
      </View>
    );
  }, []);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentPage = Math.round(scrollPosition / width);
    setCurrentPage(currentPage);
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {OnBoardingData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: index === currentPage ? 1 : 0.3 }]}
          />
        ))}
      </View>
    );
  };

  const handleNextPress = async () => {
    if (currentPage < OnBoardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentPage + 1 });
    } else {
      navigation.navigate('LoginScreen');
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    }
  };

  const handleBackPress = () => {
    if (currentPage > 0) {
      flatListRef.current.scrollToIndex({ index: currentPage - 1 });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={OnBoardingData}
          renderItem={renderSlider}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        {renderDots()}
      </View>
      <View style={styles.buttonContainer}>
        {currentPage > 0 && currentPage < 2 && (
          <Typography
            label="Back"
            color={Colors.white}
            marginTop={normalizeSize(40)}
            onPress={handleBackPress}
            fontFamily={Fonts.Medium}
            fontSize={20}
          />
        )}
        <CustomButton
          title={
            currentPage === OnBoardingData.length - 1 ? 'Get Started' : 'Next'
          }
          backgroundColor={Colors.white}
          color={Colors.green}
          marginTop={normalizeSize(40)}
          onPress={handleNextPress}
          width={currentPage === 1 ? 160 : '100%'}
          fontSize={20}
          textMarginTop={normalizeSize(6)}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;
