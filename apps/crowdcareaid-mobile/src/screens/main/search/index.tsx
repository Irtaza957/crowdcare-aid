import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Colors, SVGS } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import DataRender from './molecule/DataRender';
import { CustomImage } from '@crowdcareaid-frontend/native-components';
import { useAppSelector } from '@crowdcareaid-frontend/store';

const SearchScreen = () => {
  const selectProfileImage = useAppSelector(
    (state) => state?.user?.userData?.profileImage
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overView}>
        <View style={styles.data}>
          <SVGS.CrowdCareaidLogo />
        </View>
        <CustomImage url={selectProfileImage} style={styles.image} />
      </View>
      <DataRender />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  overView: {
    backgroundColor: Colors.PrimaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeSize(20),
    paddingTop: normalizeSize(20),
    paddingBottom: normalizeSize(50),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  data: {
    backgroundColor: Colors.white,
    width: '50%',
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: normalizeSize(7),
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 40,
  },
});
