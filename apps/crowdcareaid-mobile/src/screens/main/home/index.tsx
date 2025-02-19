import {
  View,
  SafeAreaView,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  CustomButton,
  CustomImage,
  CustomInput,
  Icons,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts, IMAGES } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { styles } from './style';
import Category from './molecule/Category';
import {
  setUserData,
  useAllCampaignQuery,
  useAllCategoryQuery,
  useAppDispatch,
  useAppSelector,
  useGetPapularCampaignsQuery,
  useUserProfileQuery,
} from '@crowdcareaid-frontend/store';
import RetrieveCampaignList from './molecule/RetrieveCampaignList';
import { DEFAULT_PROFILE_IMAGE_URL } from '../../constant';

const HomeScreen = ({ navigation }) => {
  const { height: mobileHeight } = useWindowDimensions();
  const selectProfileImage = useAppSelector(
    (state) => state.user.userData?.profileImage
  );

  const dispatch = useAppDispatch();
  const { data: categoriesApiData, isLoading: categoriesLoading } =
    useAllCategoryQuery();

  const { data: userProfileData } = useUserProfileQuery();
  useEffect(() => {
    dispatch(setUserData(userProfileData?.data));
  }, []);
  const [containerWidth, setContainerWidth] = useState(0);
  const {
    data: campaignApiData,
    error: campaignError,
    isLoading: campaignLoading,
  } = useAllCampaignQuery();

  const { data: GetPapularCampaigns } = useGetPapularCampaignsQuery({});
  console.log('GetPapularCampaignsGetPapularCampaigns', GetPapularCampaigns);

  return (
    <SafeAreaView
      style={{ height: mobileHeight, flex: 1, backgroundColor: Colors.white }}
    >
      <StatusBar backgroundColor={Colors.PrimaryColor} />
      <View style={styles.main}>
        <View style={styles.wrapper}>
          <View style={styles.dataWrapper}>
            <Icons
              family="MaterialCommunityIcons"
              name="bell-ring-outline"
              size={30}
              color={Colors.white}
            />
            <CustomImage
              url={selectProfileImage || DEFAULT_PROFILE_IMAGE_URL}
              style={styles.profileImage}
            />
          </View>
        </View>
        <View style={styles.Title}>
          <Typography
            label="Welcome"
            fontFamily={Fonts.Bold}
            color={Colors.SecondaryColor}
            fontSize={30}
          />
          <Icons
            family="MaterialCommunityIcons"
            name="hand-wave-outline"
            color={Colors.SecondaryColor}
            size={30}
          />
        </View>
        <Typography
          label="What do you want to donate today ?"
          fontFamily={Fonts.Medium}
          color={Colors.white}
          marginTop={normalizeSize(10)}
          width={'75%'}
          fontSize={20}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          activeOpacity={0.8}
        >
          <CustomInput
            placeholder="Search"
            isLeftIcon={true}
            IconFamily="Feather"
            IconName="search"
            borderRadius={normalizeSize(12)}
            height={normalizeSize(45)}
            size={normalizeSize(25)}
            marginTop={normalizeSize(20)}
            marginBottom={normalizeSize(15)}
            readOnly
            onPress={() => navigation.navigate('SearchScreen')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.Campaign}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              <Typography
                fontSize={25}
                fontFamily={Fonts.Medium}
                fontWeight={'700'}
                color={Colors.white}
                marginBottom={normalizeSize(15)}
                label="Start Your
Own Funding"
              />
              <CustomButton
                title="Start Campaign"
                backgroundColor={Colors.SecondaryColor}
                width={'50%'}
                height={45}
                onPress={() => navigation.navigate('CampaignScreen')}
                fontSize={14}
                borderColor={Colors.SecondaryColor}
                alignSelf="flex-start"
              />
            </View>
          </View>
        </ImageBackground>
        <Typography
          label="Category"
          fontFamily={Fonts.Bold}
          fontSize={25}
          marginLeft={normalizeSize(20)}
          color={Colors.green}
          marginTop={normalizeSize(15)}
        />
        <Category categories={categoriesApiData} />
        <Typography
          label="Top Campaigns"
          fontFamily={Fonts.Bold}
          fontSize={25}
          marginLeft={normalizeSize(20)}
          color={Colors.green}
          marginTop={normalizeSize(15)}
        />
        <RetrieveCampaignList
          Data={GetPapularCampaigns?.data}
          containerWidth={containerWidth}
          setContainerWidth={setContainerWidth}
        />
        <Typography
          label="Recent Projects"
          fontFamily={Fonts.Bold}
          fontSize={25}
          marginLeft={normalizeSize(20)}
          color={Colors.green}
          marginTop={normalizeSize(20)}
        />
        <RetrieveCampaignList
          Data={campaignApiData?.data}
          containerWidth={containerWidth}
          setContainerWidth={setContainerWidth}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
