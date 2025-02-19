import { Colors, Fonts, SVGS } from '@crowdcareaid-frontend/assets';
import { Typography } from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

interface ModalProps {
  modalVisible: boolean;
  onClose: () => void;
  onSelectImage: (imagePath: string) => void;
}

const UploadMedia: React.FC<ModalProps> = ({
  modalVisible,
  onClose,
  onSelectImage,
}) => {
  const handleGalleryPress = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        cropping: true,
        width: 300,
        height: 300,
        cropperCircleOverlay: true,
      });
      onSelectImage(image.path);
    } catch (error) {
      console.log('Error selecting image from gallery:', error);
    }
    onClose();
  };

  const handleCameraPress = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        cropping: true,
        width: 300,
        height: 300,
        cropperCircleOverlay: true,
      });
      onSelectImage(image.path);
    } catch (error) {
      console.log('Error capturing image from camera:', error);
    }
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleGalleryPress}>
              <SVGS.Gallery height={60} width={60} />
              <Typography
                label="Gallery"
                fontSize={14}
                fontFamily={Fonts.Medium}
                alignSelf="center"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCameraPress}>
              <SVGS.ModalCamere height={60} width={60} />
              <Typography
                label="Camera"
                fontSize={14}
                fontFamily={Fonts.Medium}
                alignSelf="center"
              />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.ModalColor,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    elevation: 5,
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    bottom: 0,
    position: 'absolute',
    justifyContent: 'space-around',
    paddingTop: normalizeSize(50),
    alignItems: 'center',
    borderTopStartRadius: normalizeSize(22),
    borderTopRightRadius: normalizeSize(20),
  },
});

export default UploadMedia;
