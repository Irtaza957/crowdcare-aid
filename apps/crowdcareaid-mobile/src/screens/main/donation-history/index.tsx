import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Colors, Fonts, SVGS } from '@crowdcareaid-frontend/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CustomHeader,
  CustomImage,
  CustomInput,
  ImageModal,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { useAppNavigation } from 'apps/crowdcareaid-mobile/src/routes';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { styles } from './style';

const DonationHistory = () => {
  const navigation = useAppNavigation();
  const [activeSection, setActiveSection] = useState('Fundraiser');
  const [expandedItemsFundraiser, setExpandedItemsFundraiser] = useState({});
  const [expandedItemsDonation, setExpandedItemsDonation] = useState({});
  const [visible, setIsVisible] = useState(false);

  const [animatedWidth] = useState(new Animated.Value(0));

  const Fundraiser = [
    {
      id: '1',
      title: 'Fund for children education',
      description:
        'Lorem ipsum dolor sit , consectetur  , sed do  temPor incident ut lahore et Lorem ipsum dolor sit amat, consectetur advising edit, sed do elusion temper incident ut lahore et',
      amountTarget: '$1,000',
      Fundraiser: '$500',
      durationDate: '15-06-24  20-06-24',
      location: 'York',
    },
    {
      id: '2',
      title: 'Fund for children education',
      description:
        'Lorem ipsum dolor sit , consectetur  , sed do  temPor incident ut lahore et Lorem ipsum dolor sit amat, consectetur advising edit, sed do elusion temper incident ut lahore et',
      Fundraiser: '$500',
      amountTarget: '$1,000',
      durationDate: '15-06-24  20-06-24',
      location: 'New York',
    },
    {
      id: '3',
      title: 'Fund for children education',
      description:
        'Lorem ipsum dolor sit , consectetur  , sed do  temPor incident ut lahore et Lorem ipsum dolor sit amat, consectetur advising edit, sed do elusion temper incident ut lahore et',
      amountTarget: '$1,000',
      Fundraiser: '$500',
      durationDate: '15-06-24  20-06-24',
      location: 'York',
    },
  ];

  const donationDetailsData = [
    {
      id: '1',
      title: 'Donation for poverty',
      amount: 500,
      description:
        'Lorem ipsum dolor sit , consectetur  , sed do  temPor incident ut lahore et Lorem ipsum dolor sit amat, consectetur advising edit, sed do elusion temper incident ut lahore et',
      Fundraiser: '$500',
      amountTarget: '$1,000',
      durationDate: '15-06-24  20-06-24',
      location: 'New York',
      cardHeadingLeft: 'Debit Card',
      cardHeadingRight: 'Amount',
      debitNumber: '********1234',
      debitAmount: '$300',
      dayHeading: 'Day / Date',
      timeHeading: 'Time',
      date: 'Mon,15-05-2024',
      time: '10:30 am',
    },
    {
      id: '2',
      title: 'Donation for poverty',
      amount: 500,
      description:
        'Lorem ipsum dolor sit , consectetur  , sed do  temPor incident ut lahore et Lorem ipsum dolor sit amat, consectetur advising edit, sed do elusion temper incident ut lahore et',
      Fundraiser: '$500',
      amountTarget: '$1,000',
      durationDate: '15-06-24  20-06-24',
      location: 'New York',
      cardHeadingLeft: 'Debit Card',
      cardHeadingRight: 'Amount',
      debitNumber: '********1234',
      debitAmount: '$300',
      dayHeading: 'Day / Date',
      timeHeading: 'Time',
      date: 'Mon,15-05-2024',
      time: '10:30 am',
    },
    {
      id: '3',
      title: 'Donation for poverty',
      amount: 500,
      description:
        'Lorem ipsum dolor sit , consectetur  , sed do  temPor incident ut lahore et Lorem ipsum dolor sit amat, consectetur advising edit, sed do elusion temper incident ut lahore et',
      amountTarget: '$1,000',
      Fundraiser: '$500',
      durationDate: '15-06-24  20-06-24',
      location: 'New York',
      cardHeadingLeft: 'Debit Card',
      cardHeadingRight: 'Amount',
      debitNumber: '********1234',
      debitAmount: '$300',
      dayHeading: 'Day / Date',
      timeHeading: 'Time',
      date: 'Mon,15-05-2024',
      time: '10:30 am',
    },
  ];

  const images = [
    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
  ];

  const toggleExpandItemFundraiser = (id) => {
    setExpandedItemsFundraiser((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const toggleExpandItemDonation = (id) => {
    setExpandedItemsDonation((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const imageTypeArray = useMemo(
    () => (images || []).map((src) => ({ path: src })),
    [images]
  );

  const renderItems = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          gap: 20,
          marginLeft: index === 0 ? 0 : normalizeSize(6),
        }}
      >
        <CustomImage
          style={{
            height: normalizeSize(28),
            width: normalizeSize(50),
            borderRadius: 5,
          }}
          url={item.path}
          shouldUseDirectImage
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const isExpanded =
      activeSection === 'Fundraiser'
        ? expandedItemsFundraiser[item.id]
        : expandedItemsDonation[item.id];
    return (
      <>
        <View
          style={[
            styles.container,
            {
              flex: 1,
            },
          ]}
        >
          <View style={styles.rowBetween}>
            <Typography
              label={item.title}
              fontSize={16}
              fontFamily={Fonts.Medium}
              fontWeight={'500'}
              display={isExpanded ? 'none' : 'flex'}
            />
            {activeSection === 'Donation Details' ? (
              <SVGS.ArrowUp />
            ) : (
              <SVGS.ArrowDown />
            )}
          </View>
          <Typography
            label={item.description}
            fontSize={14}
            marginTop={normalizeSize(10)}
            display={isExpanded ? 'none' : 'flex'}
          />
          <View
            style={[
              styles.imageContainer,
              { display: isExpanded ? 'none' : 'flex' },
            ]}
          >
            <>
              {images.length > 0 && (
                <>
                  <FlashList
                    data={imageTypeArray.slice(0, 5)}
                    renderItem={renderItems}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // estimatedItemSize={50}
                  />
                  {images.length > 5 && (
                    <View style={styles.moreImageWrapper}>
                      <CustomImage
                        url={images[2]}
                        style={{ ...styles.image, opacity: 0.4 }}
                        shouldUseDirectImage
                      />
                      <TouchableOpacity
                        style={styles.moreButton}
                        onPress={() => setIsVisible(true)}
                      >
                        <Text style={styles.moreText}>More images</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </>
          </View>
          <View style={[styles.rowBetween, styles.marginTop15]}>
            <View style={styles.row}>
              <Typography
                label="Amount Target"
                fontSize={14}
                color={Colors.lightGray}
              />
              <Typography
                label={item.amountTarget}
                fontSize={16}
                color={Colors.Black}
                fontFamily={Fonts.Medium}
                fontWeight={'700'}
                bottom={normalizeSize(4)}
              />
            </View>
            <View style={styles.row}>
              <Typography
                label="Fundraiser"
                fontSize={14}
                color={Colors.lightGray}
              />
              <Typography
                label={item.Fundraiser}
                fontSize={16}
                color={Colors.Black}
                fontFamily={Fonts.Medium}
                fontWeight={'700'}
                bottom={normalizeSize(4)}
              />
            </View>
          </View>

          <Typography
            label={'0 %'}
            fontSize={16}
            textAlign="right"
            fontFamily={Fonts.Regular}
            marginTop={normalizeSize(15)}
          />
          <View
            style={[
              styles.BorderView,
              {
                borderColor: Colors.lightGray,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.animatedView,
                {
                  width: animatedWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                  backgroundColor: Colors.green,
                },
              ]}
            />
          </View>

          <View style={[styles.rowBetween, styles.marginTop15]}>
            <Typography
              label="Duration Date"
              color={Colors.lightGray}
              fontFamily={Fonts.Medium}
              fontSize={14}
            />
            <Typography
              label="Location"
              color={Colors.lightGray}
              fontFamily={Fonts.Medium}
              fontSize={14}
            />
          </View>
          <View
            style={[
              styles.rowBetween,
              styles.marginTop5,
              { marginBottom: normalizeSize(20) },
            ]}
          >
            <Typography
              label={item.durationDate}
              fontFamily={Fonts.Medium}
              fontSize={14}
            />
            <Typography
              label={item.location}
              fontFamily={Fonts.Medium}
              fontSize={14}
            />
          </View>

          {item.cardHeadingLeft && (
            <View
              style={[
                styles.rowBetween,
                styles.marginTop15,
                { display: isExpanded ? 'none' : 'flex' },
              ]}
            >
              <Typography
                label={item.cardHeadingLeft}
                fontFamily={Fonts.Medium}
                fontSize={14}
                color={Colors.lightGray}
              />
              <Typography
                label={item.cardHeadingRight}
                fontFamily={Fonts.Medium}
                fontSize={14}
                color={Colors.lightGray}
              />
            </View>
          )}
          {item.debitNumber && (
            <View
              style={[
                styles.rowBetween,
                styles.marginTop5,
                { display: isExpanded ? 'none' : 'flex' },
              ]}
            >
              <View style={styles.row}>
                <SVGS.Credit />
                <Typography
                  label={item.debitNumber}
                  fontFamily={Fonts.Medium}
                  fontSize={16}
                  marginTop={normalizeSize(5)}
                />
              </View>
              <Typography
                label={item.debitAmount}
                fontFamily={Fonts.Medium}
                fontSize={16}
              />
            </View>
          )}
          {item.dayHeading && (
            <View
              style={[
                styles.rowBetween,
                styles.marginTop15,
                { display: isExpanded ? 'none' : 'flex' },
              ]}
            >
              <Typography
                label={item.dayHeading}
                fontFamily={Fonts.Medium}
                fontSize={16}
                color={Colors.lightGray}
              />
              <Typography
                label={item.timeHeading}
                fontFamily={Fonts.Medium}
                fontSize={16}
                color={Colors.lightGray}
              />
            </View>
          )}
          {item.date && (
            <View
              style={[
                styles.rowBetween,
                styles.marginTop5,
                {
                  display: isExpanded ? 'none' : 'flex',
                  marginBottom: normalizeSize(20),
                },
              ]}
            >
              <Typography
                label={item.date}
                fontFamily={Fonts.Medium}
                fontSize={16}
              />
              <Typography
                label={item.time}
                fontFamily={Fonts.Medium}
                fontSize={16}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            activeSection === 'Fundraiser'
              ? toggleExpandItemFundraiser(item.id)
              : toggleExpandItemDonation(item.id)
          }
          style={styles.ArrowBottom}
          activeOpacity={0.8}
        >
          <SVGS.ArrowSwipe />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.Parent}>
      <CustomHeader
        label="Donation History"
        onPress={navigation.goBack}
        iconColor={Colors.green}
      />
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setActiveSection('Fundraiser')}
          style={[
            styles.tab,
            activeSection === 'Fundraiser' && styles.activeTab,
          ]}
        >
          <Typography
            label="Fundraiser details"
            fontSize={14}
            marginTop={normalizeSize(6)}
            color={activeSection === 'Fundraiser' && Colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveSection('Donation Details')}
          style={[
            styles.tab,
            activeSection === 'Donation Details' && styles.activeTab,
          ]}
        >
          <Typography
            label="Donation Details"
            fontSize={14}
            marginTop={normalizeSize(6)}
            color={activeSection === 'Donation Details' && Colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <CustomInput
          inputWidth={
            Platform.OS === 'ios' ? normalizeSize(270) : normalizeSize(280)
          }
          placeholder="Search"
          borderRadius={36}
          marginTop={normalizeSize(12)}
          height={normalizeSize(43)}
        />
        <SVGS.Filter height={normalizeSize(40)} />
      </View>
      <FlashList
        data={activeSection === 'Fundraiser' ? Fundraiser : donationDetailsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={350}
      />
      <ImageModal
        isVisible={visible}
        onClose={() => setIsVisible(false)}
        images={imageTypeArray}
      />
    </SafeAreaView>
  );
};

export default DonationHistory;
