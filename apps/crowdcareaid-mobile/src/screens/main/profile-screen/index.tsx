import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
  CustomImage,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts, SVGS } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import ProfileComponent from './molecules';
import { useUserProfileQuery } from '@crowdcareaid-frontend/store';
import { useAppNavigation } from '../../../routes';
import { DEFAULT_PROFILE_IMAGE_URL } from '../../constant';

const ProfileScreen = () => {
  const { data: userProfileData, isLoading } = useUserProfileQuery();
  console.log('profileData================', userProfileData);
  const navigation = useAppNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileView}>
        <CustomImage
          url={userProfileData?.data?.profileImage || DEFAULT_PROFILE_IMAGE_URL}
          style={styles.profilePhoto}
        />
        <View style={{ marginLeft: 10 }}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <>
              <Typography
                label={`${userProfileData?.data?.firstName} ${userProfileData?.data?.lastName}`}
                fontFamily={Fonts.Bold}
                fontSize={normalizeSize(25)}
                color={Colors.white}
                marginRight={normalizeSize(25)}
              />
              <Typography
                label={userProfileData?.data?.email}
                color={Colors.white}
                fontFamily={Fonts.Medium}
                fontSize={normalizeSize(14)}
                marginTop={normalizeSize(8)}
              />
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.iconView}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <SVGS.edit2 height={15} width={15} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <ProfileComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  profileView: {
    width: '100%',
    backgroundColor: Colors.PrimaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: normalizeSize(70),
    paddingBottom: normalizeSize(35),
    borderBottomRightRadius: normalizeSize(20),
    borderBottomLeftRadius: normalizeSize(20),
  },
  iconView: {
    backgroundColor: Colors.SecondaryColor,
    borderRadius: normalizeSize(8),
    alignSelf: 'flex-end',
    height: normalizeSize(32),
    width: normalizeSize(32),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: normalizeSize(5),
  },
  profilePhoto: { height: 55, width: 55, borderRadius: 50 },
});
