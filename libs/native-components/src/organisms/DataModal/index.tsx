import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import Typography from '../../base/Typography';
import CustomButton from '../../base/Button';

type DataModalProps = {
  buttonTitleOne: string;
  buttonTitleTwo: string;
  onPressOne: () => void;
  onPressTwo: () => void;
  isLoading: boolean;
  headerText: string;
  mainText: string;
};

const DataModal: React.FC<DataModalProps> = ({
  buttonTitleOne,
  buttonTitleTwo,
  isLoading,
  headerText,
  onPressTwo,
  onPressOne,
  mainText,
}) => {
  const buttons = [
    {
      title: buttonTitleTwo,
      backgroundColor: Colors.SecondaryColor,
      borderColor: Colors.SecondaryColor,
      fontFamily: Fonts.Medium,
      onPress: onPressOne,
      loading: false,
    },
    {
      title: buttonTitleOne,
      fontFamily: Fonts.Medium,
      onPress: onPressTwo,
      loading: isLoading,
    },
  ];
  return (
    <View style={styles.modalContainer}>
      <View style={styles.ModalData}>
        <Typography
          label={headerText}
          fontSize={20}
          color={Colors.white}
          backgroundColor={Colors.PrimaryColor}
          fontFamily={Fonts.Bold}
          alignSelf="center"
        />
      </View>
      <Typography
        label={mainText}
        textAlign="center"
        marginTop={normalizeSize(25)}
        fontSize={16}
        fontFamily={Fonts.Medium}
      />
      <View style={styles.buttonView}>
        {buttons.map((button, index) => (
          <CustomButton
            key={index}
            title={button.title}
            width={'50%'}
            borderRadius={1}
            backgroundColor={button.backgroundColor}
            borderColor={button.borderColor}
            fontSize={16}
            height={45}
            fontFamily={button.fontFamily}
            onPress={button.onPress}
            loading={button.loading}
          />
        ))}
      </View>
    </View>
  );
};

export default DataModal;

const styles = StyleSheet.create({
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalizeSize(30),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  ModalData: {
    backgroundColor: Colors.PrimaryColor,
    width: '100%',
    paddingVertical: normalizeSize(20),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonView: { flexDirection: 'row', marginTop: normalizeSize(30) },
});
