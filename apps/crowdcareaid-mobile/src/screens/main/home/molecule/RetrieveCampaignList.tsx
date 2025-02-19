import { StyleSheet, View, Animated } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomButton,
  CustomImage,
  FlashList,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { useNavigation } from '@react-navigation/native';

interface RetrieveCampaignListProps {
  Data: {
    id: string;
    title: string;
    image: React.ReactElement;
    start: string;
    end: string;
    des: string;
    city: string;
    raisedAmount: string;
    amount: string;
  }[];
  setContainerWidth?: (width: number) => void;
  containerWidth?: number;
  onPress?: (item: any) => void;
}

const RetrieveCampaignList: React.FC<RetrieveCampaignListProps> = ({
  Data = [],
  setContainerWidth,
  containerWidth,
  onPress,
}) => {
  const onLayout = useCallback(
    (event) => {
      const { width } = event.nativeEvent.layout;
      if (setContainerWidth) {
        setContainerWidth(width);
      }
    },
    [setContainerWidth]
  );

  const [animatedWidth] = useState(new Animated.Value(0));
  const navigation = useNavigation<RootStackNavigationProp<'CampaignDetail'>>();

  const calculatePercentage = (raisedAmount: string, totalAmount: string) => {
    const raisedAmountFloat = parseFloat(raisedAmount);
    const totalAmountFloat = parseFloat(totalAmount);
    return totalAmountFloat > 0
      ? (raisedAmountFloat / totalAmountFloat) * 100
      : 0;
  };

  useEffect(() => {
    Data.forEach((item) => {
      const percentage = calculatePercentage(item.raisedAmount, item.amount);
      Animated.timing(animatedWidth, {
        toValue: percentage,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  }, [Data]);

  const renderItem = useCallback(
    ({ item, index }) => {
      const percentage = calculatePercentage(item.raisedAmount, item.amount);

      return (
        <View style={styles.itemContainer} onLayout={onLayout}>
          <View style={{ bottom: normalizeSize(10) }}>{item.image}</View>
          {item?.images && (
            <CustomImage
              style={[
                styles.imageContainer,
                {
                  height: containerWidth ? containerWidth * 0.68 : 200,
                  width: containerWidth || 300,
                },
              ]}
              url={item?.images?.[0]}
            />
          )}
          <Typography
            label={item.title}
            fontSize={16}
            textAlign="center"
            fontFamily={Fonts.Medium}
            marginTop={normalizeSize(10)}
            fontWeight={'600'}
          />
          <Typography
            label={`${percentage.toFixed(0)}%`}
            fontSize={16}
            textAlign="right"
            marginRight={normalizeSize(12)}
            fontFamily={Fonts.Regular}
            marginTop={normalizeSize(5)}
          />
          <View
            style={[
              styles.BorderView,
              {
                borderColor: Colors.lightGray,
                marginBottom: normalizeSize(15),
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
          <View style={styles.heading}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Typography
                label={'Raised of'}
                fontSize={14}
                color={Colors.lightGray}
              />
              <Typography
                label={`$ ${item?.raisedAmount}`}
                fontSize={16}
                color={Colors.Black}
                fontFamily={Fonts.Medium}
                bottom={3}
                fontWeight={'700'}
                marginTop={normalizeSize(3)}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Typography
                label={item.end || 'Target'}
                fontSize={14}
                color={Colors.lightGray}
              />
              <Typography
                label={item.Amount2 || `$ ${item?.amount}`}
                fontSize={16}
                color={Colors.Black}
                fontFamily={Fonts.Medium}
                bottom={3}
                fontWeight={'700'}
                marginTop={normalizeSize(3)}
              />
            </View>
          </View>
          <View style={styles.heading}>
            <Typography
              label={item.des || item.category?.name}
              fontSize={normalizeSize(16)}
              color={Colors.lightGray}
            />
            <Typography
              label={item.city || item?.location}
              fontSize={normalizeSize(15)}
              color={Colors.lightGray}
              textAlign="right"
              width={normalizeSize(130)}
              numberOfLines={1}
            />
          </View>
          <CustomButton
            title="View"
            width={'48%'}
            height={40}
            fontSize={14}
            fontFamily={Fonts.Regular}
            marginVertical={normalizeSize(16)}
            onPress={() =>
              onPress
                ? onPress(item)
                : navigation.navigate('CampaignDetail', { item })
            }
          />
        </View>
      );
    },
    [animatedWidth, containerWidth, onLayout, onPress]
  );

  return (
    <FlashList
      data={Data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    borderRadius: normalizeSize(15),
    marginHorizontal: normalizeSize(15),
    marginVertical: normalizeSize(15),
    marginBottom: normalizeSize(30),
    width: normalizeSize(290),
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeSize(13),
    marginTop: normalizeSize(8),
  },
  showBarContainer: {
    marginVertical: normalizeSize(5),
    marginLeft: normalizeSize(10),
  },
  ShowBar: {
    height: 4,
    borderRadius: 5,
  },
  BorderView: {
    width: '95%',
    borderWidth: 1,
    height: normalizeSize(6),
    borderRadius: normalizeSize(10),
    position: 'relative',
    backgroundColor: Colors.lightGray,
    marginTop: normalizeSize(5),
    alignSelf: 'center',
  },
  animatedView: {
    height: normalizeSize(6),
    borderRadius: 20,
    bottom: normalizeSize(3),
  },
  imageContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default RetrieveCampaignList;
