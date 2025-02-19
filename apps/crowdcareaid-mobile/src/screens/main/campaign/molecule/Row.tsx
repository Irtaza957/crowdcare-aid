import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import {
  ImageModal,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { Colors } from '@crowdcareaid-frontend/assets';
import FastImage from 'react-native-fast-image';

interface RowProps {
  Text1: string;
  Text2: string;
  imageSrc?: string[];
  showImage?: boolean;
  marginVertical?: number;
}

const Row: React.FC<RowProps> = ({
  Text1,
  Text2,
  imageSrc,
  showImage,
  marginVertical,
}) => {
  const [visible, setIsVisible] = useState(false);

  const imageTypeArray = useMemo(
    () => (imageSrc || []).map((src) => ({ path: src })),
    [imageSrc]
  );

  return (
    <View style={[styles.container, { marginVertical: marginVertical }]}>
      <View style={styles.textContainer}>
        <Typography
          label={Text1}
          fontSize={14}
          color={Colors.lightGray}
          width={175}
          numberOfLines={1}
          marginTop={normalizeSize(5)}
        />
        <Typography
          label={Text2}
          fontSize={14}
          color={Colors.Black}
          marginTop={normalizeSize(5)}
          width={normalizeSize(190)}
          marginLeft={-18}
        />
      </View>
      {showImage && imageSrc?.length > 0 && (
        <View style={styles.imageContainer}>
          {imageSrc.slice(0, 2).map((src, index) => (
            <FastImage key={index} source={{ uri: src }} style={styles.image} />
          ))}
          {imageSrc.length > 2 && (
            <View style={styles.moreImageWrapper}>
              <FastImage
                source={{ uri: imageSrc[2] }}
                style={{ ...styles.image, opacity: 0.4 }}
              />
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => setIsVisible(true)}
              >
                <Text style={styles.moreText}>More images</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <ImageModal
        isVisible={visible}
        onClose={() => setIsVisible(false)}
        images={imageTypeArray}
      />
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeSize(15),
    alignSelf: 'flex-start',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '58%',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    bottom: 3,
    marginLeft: normalizeSize(-30),
  },
  image: {
    width: normalizeSize(50),
    height: normalizeSize(30),
    margin: normalizeSize(5),
    borderRadius: 5,
  },
  moreImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    height: normalizeSize(30),
    marginTop: normalizeSize(4),
  },
  moreText: {
    color: 'white',
    fontSize: normalizeSize(10),
  },
});
