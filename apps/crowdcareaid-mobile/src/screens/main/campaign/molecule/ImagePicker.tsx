import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, SVGS } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Icons, ImageModal } from '@crowdcareaid-frontend/native-components';
import { useAppSelector } from '@crowdcareaid-frontend/store';

const ImagePicker = ({ onImagesSelected }) => {
  const [cameraImages, setCameraImages] = useState([]);
  const [visible, setIsVisible] = useState(false);

  const existingImages = useAppSelector((state) => state.user.images);
  useEffect(() => {
    if (existingImages.length > 0) {
      setCameraImages(existingImages);
    }
  }, [existingImages]);

  // const handleGalleryPress = async () => {
  //   try {
  //     const image = await ImageCropPicker.openPicker({
  //       cropping: true,
  //       width: 300,
  //       height: 300,
  //       cropperCircleOverlay: true,
  //       multiple: true,
  //     });
  //     const newImages = [...cameraImages, { path: image.path }];
  //     setCameraImages(newImages);
  //     onImagesSelected(newImages);
  //   } catch (error) {
  //     console.log('Error selecting image from gallery:', error);
  //   }
  // };

  const handleGalleryPress = async () => {
    try {
      const images = await ImageCropPicker.openPicker({
        cropping: true,
        width: 300,
        height: 300,
        cropperCircleOverlay: true,
        multiple: true,
      });
      const newImages = images.map((image) => ({
        path: image.path,
      }));
      const updatedImages = [...cameraImages, ...newImages];
      setCameraImages(updatedImages);
      onImagesSelected(updatedImages);
    } catch (error) {
      console.log('Error selecting images from gallery:', error);
    }
  };

  const handleCameraPress = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        cropping: true,
        width: 300,
        height: 300,
        cropperCircleOverlay: true,
        multiple: true,
      });
      const newImages = [...cameraImages, { path: image.path }];
      setCameraImages(newImages);
      onImagesSelected(newImages);
    } catch (error) {
      console.log('Error capturing image from camera:', error);
    }
  };

  const removeImage = (index) => {
    const updatedImages = cameraImages.filter((_, i) => i !== index);
    setCameraImages(updatedImages);
    onImagesSelected(updatedImages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleCameraPress}
        >
          <SVGS.ModalCamere height={20} width={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleGalleryPress}
        >
          <SVGS.Gallery height={20} width={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.imagesContainer}>
        {cameraImages.length > 0 &&
          cameraImages.slice(0, 5).map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image.path }} style={styles.image} />
              <TouchableOpacity
                style={styles.crossIcon}
                onPress={() => removeImage(index)}
              >
                <Icons family="Entypo" name="cross" color={Colors.white} />
              </TouchableOpacity>
            </View>
          ))}
        {cameraImages.length > 5 && (
          <View style={styles.moreImageWrapper}>
            <Image
              source={{ uri: cameraImages[5].path }}
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
        <ImageModal
          isVisible={visible}
          onClose={() => setIsVisible(false)}
          images={cameraImages}
        />
      </View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: normalizeSize(15),
    width: '100%',
    elevation: 4,
    height: normalizeSize(125),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2.5,
  },
  buttonContainer: {
    justifyContent: 'center',
    gap: normalizeSize(10),
  },
  cameraButton: {
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalizeSize(8),
    borderColor: Colors.green,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: normalizeSize(15),
    gap: normalizeSize(14),
  },
  image: {
    height: 40,
    width: 66,
    borderRadius: 6,
  },
  imageWrapper: {
    position: 'relative',
  },
  crossIcon: {
    position: 'absolute',
    bottom: normalizeSize(23),
    right: normalizeSize(-5),
    backgroundColor: Colors.Black,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
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
  },
  moreText: {
    color: 'white',
    fontSize: 12,
  },
});
