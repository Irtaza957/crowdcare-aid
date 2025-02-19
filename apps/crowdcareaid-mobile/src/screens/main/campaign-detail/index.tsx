import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Animated,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  CustomBottomSheet,
  CustomButton,
  CustomImage,
  FlashList,
  Icons,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { useRoute } from '@react-navigation/native';
import ReadMore from './molecule/ReadMore';
import dayjs from 'dayjs';
import { useAppNavigation } from '../../../routes';
import ReportRender from './molecule/ReportRender';
import { styles } from './style';

const CampaignDetail = () => {
  const { width: mobileWidth } = useWindowDimensions();

  const navigation = useAppNavigation();
  const route = useRoute();
  const { item } = route.params;
  console.log('item============', item);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedWidth] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);

  const raisedAmount = parseFloat(item?.raisedAmount);
  const totalAmount = parseFloat(item?.amount);
  const percentage = totalAmount > 0 ? (raisedAmount / totalAmount) * 100 : 0;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderImageItem = ({ item: image }) => (
    <CustomImage style={[styles.image, { width: mobileWidth }]} url={image} />
  );

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {item?.images?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                borderColor:
                  activeIndex === index ? Colors.SecondaryColor : Colors.white,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FlashList
            data={item.images}
            renderItem={renderImageItem}
            keyExtractor={(image, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            pagingEnabled
            style={styles.imageList}
          />
          <View style={styles.iconMain}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.goBack()}
              activeOpacity={0.5}
            >
              <Icons
                family="Octicons"
                name="arrow-left"
                size={normalizeSize(25)}
                color={Colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.back}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.5}
            >
              <Icons
                family="AntDesign"
                name="message1"
                size={normalizeSize(25)}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>

          {renderDots()}
        </View>
        <View style={styles.detailsContainer}>
          <Typography
            label={item.title}
            marginLeft={normalizeSize(20)}
            fontFamily={Fonts.Medium}
            fontSize={20}
          />
          <ReadMore description={item.description} />
          <View style={styles.MainStyle}>
            <View style={styles.ShowDetail}>
              <Typography
                label="Total Fundraise"
                color={Colors.lightGray}
                fontSize={14}
              />
              <Typography
                label="Donation Target"
                fontSize={14}
                color={Colors.lightGray}
              />
            </View>
            <View style={styles.ShowDetail}>
              <Typography
                label={`$ ${item.raisedAmount}`}
                fontFamily={Fonts.Medium}
                fontSize={14}
                fontWeight={'700'}
              />
              <Typography
                label={`$ ${item.amount}`}
                fontFamily={Fonts.Medium}
                fontSize={14}
                fontWeight={'700'}
              />
            </View>
            <Typography
              label={`% ${percentage.toFixed(0)}`}
              fontSize={16}
              textAlign="right"
              fontFamily={Fonts.Medium}
              marginTop={normalizeSize(20)}
            />
            <View
              style={[
                styles?.BorderView,
                {
                  borderColor: Colors?.lightGray,
                  marginBottom: normalizeSize(30),
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
                    backgroundColor: Colors?.green,
                  },
                ]}
              />
            </View>

            <View style={[styles.ShowDetail]}>
              <Typography
                label="Location"
                color={Colors.lightGray}
                fontSize={14}
              />
              <Typography
                label="Donation Date"
                fontSize={14}
                color={Colors.lightGray}
              />
            </View>
            <View style={styles.ShowDetail}>
              <Typography
                label={item.location}
                fontFamily={Fonts.Medium}
                fontSize={14}
                fontWeight={'700'}
              />
              <Typography
                label={`${dayjs(item.duration[0]).format('DD-MM-YY')}  ${dayjs(
                  item.duration[1]
                ).format('DD-MM-YY')}`}
                fontFamily={Fonts.Medium}
                fontSize={14}
                fontWeight={'700'}
              />
            </View>
          </View>
          <View style={styles.button}>
            <CustomButton
              title="Donate"
              onPress={() => navigation.navigate('DonationHistory')}
            />
          </View>
        </View>
      </View>
      <CustomBottomSheet
        onClose={() => setModalVisible(false)}
        isVisible={modalVisible}
        justifyContent="flex-end"
        height={'80%'}
      >
        <ReportRender campaignId={item._id} setModalVisible={setModalVisible} />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default CampaignDetail;
