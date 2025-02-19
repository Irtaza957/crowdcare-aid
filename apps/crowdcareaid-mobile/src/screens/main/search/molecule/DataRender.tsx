import { TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomImage,
  CustomInput,
  FlashList,
  ProgressBar,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts, SVGS } from '@crowdcareaid-frontend/assets';
import { useLazySearchCampaignQuery } from '@crowdcareaid-frontend/store';
import dayjs from 'dayjs';
import { styles } from './style';
import { useAppNavigation } from '../../../../routes';
import debounce from 'lodash/debounce';

const DataRender = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trigger, result] = useLazySearchCampaignQuery();
  const { data: campaignData, error, isError, isLoading, isFetching } = result;
  console.log('data==========', campaignData, 'error', error);

  const navigation = useAppNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async (e) => {
      setSearchQuery('');
      trigger('');
    });

    return () => unsubscribe();
  }, [navigation, trigger]);
  const raisedAmount = parseFloat(campaignData?.data?.raisedAmount);
  console.log('raisedAmount=====', raisedAmount);
  const totalAmount = parseFloat(campaignData?.data?.amount);
  console.log('totalAmount=====', totalAmount);

  const handleSearchChange = (text) => {
    trigger(text);
  };

  const debouncedSearch = useCallback(debounce(handleSearchChange, 1000), []);
  const renderItem = useCallback(
    ({ item }) => {
      console.log('Rendering item:', item);
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('CampaignDetail', { item })}
        >
          <CustomImage style={styles.photo} url={item?.images?.[0]} />
          <View style={styles.Main}>
            <Typography
              label={item?.title}
              fontFamily={Fonts.Medium}
              fontSize={14}
              width={150}
              numberOfLines={1}
            />
            <ProgressBar
              totalAmount={totalAmount}
              raisedAmount={raisedAmount}
            />
            <View style={styles.location}>
              <View style={styles.ShowDetail}>
                <Typography
                  label="Donation Time"
                  color={Colors.lightGray}
                  fontSize={12}
                  width={105}
                />
                <Typography
                  label={`${dayjs(item.duration[0]).format(
                    'DD-MM-YYYY'
                  )} ${dayjs(item.duration[1]).format('DD-MM-YYYY')}`}
                  fontFamily={Fonts.Medium}
                  numberOfLines={1}
                  width={100}
                  fontSize={12}
                />
              </View>
              <View style={styles.ShowDetail}>
                <Typography
                  label="Location"
                  fontSize={12}
                  color={Colors.lightGray}
                />
                <Typography
                  label={item.location}
                  numberOfLines={1}
                  width={100}
                  fontFamily={Fonts.Medium}
                  fontSize={12}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation, raisedAmount, totalAmount]
  );

  return (
    <View style={styles.content}>
      <CustomInput
        placeholder="search"
        isRightIcon={true}
        height={50}
        inputWidth={330}
        alignSelf="center"
        IconName="search"
        fontSize={16}
        borderRadius={10}
        IconFamily="MaterialIcons"
        searchIcon={true}
        onChangeText={(t) => {
          debouncedSearch(t);
          setSearchQuery(t);
        }}
        value={searchQuery}
      />

      <FlashList
        data={campaignData?.data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.MainContainer}>
            <SVGS.Nodata />
            <Typography
              label="No data available to show
in Please search"
              textAlign="center"
              color={Colors.lightGray}
            />
          </View>
        }
      />
    </View>
  );
};

export default DataRender;
