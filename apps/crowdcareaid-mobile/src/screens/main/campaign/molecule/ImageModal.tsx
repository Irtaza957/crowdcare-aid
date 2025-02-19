import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import {
  CustomBottomSheet,
  CustomImage,
  FlashList,
  Icons,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import FastImage from 'react-native-fast-image';
type ImageType = {
  path: string;
};

interface ImageModalProps {
  isVisible: boolean;
  onClose: () => void;
  images: ImageType[];
}
const ImageModal: React.FC<ImageModalProps> = ({
  isVisible,
  onClose,
  images,
}) => {
  return (
    <CustomBottomSheet
      isVisible={isVisible}
      onClose={onClose}
      height={'50%'}
      justifyContent="flex-end"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.backArrow}
            activeOpacity={0.7}
          >
            <Icons
              family="Octicons"
              name="arrow-left"
              size={normalizeSize(20)}
              color={Colors.white}
            />
          </TouchableOpacity>
          <Typography
            label="All Images"
            color={Colors.green}
            fontSize={20}
            fontFamily={Fonts.Medium}
            alignSelf="center"
            marginTop={normalizeSize(30)}
          />
        </View>
        <FlashList
          data={images}
          renderItem={({ item }) => (
            <CustomImage
              url={item.path}
              style={styles.image}
              shouldUseDirectImage
            />
          )}
          numColumns={3}
          estimatedItemSize={100}
          contentContainerStyle={styles.imageContainer}
        />
      </View>
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: normalizeSize(20),
    borderTopLeftRadius: normalizeSize(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: normalizeSize(10),
  },
  imageContainer: {
    paddingHorizontal: normalizeSize(25),
    paddingVertical: normalizeSize(25),
  },
  image: {
    width: normalizeSize(100),
    height: normalizeSize(62),
    borderRadius: normalizeSize(7),
    marginBottom: normalizeSize(25),
  },
  backArrow: {
    backgroundColor: Colors.green,
    width: normalizeSize(30),
    marginTop: normalizeSize(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalizeSize(15),
    height: normalizeSize(30),
    borderRadius: 10,
  },
});

export default ImageModal;
