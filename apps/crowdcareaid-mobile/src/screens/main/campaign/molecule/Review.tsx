import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import React from 'react';
import {
  CustomButton,
  CustomInput,
  Typography,
  showToast,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import Row from './Row';
import {
  useAppSelector,
  useCreateCampaignMutation,
  useUploadImageMutation,
} from '@crowdcareaid-frontend/store';
import { useAppNavigation } from '../../../../routes';
import { CommonActions } from '@react-navigation/native';

interface Review {
  onContinue: () => void;
  onBack: () => void;
}

const Review: React.FC<Review> = ({ onContinue, onBack }) => {
  const fundraiserDetails = useAppSelector(
    (state) => state.user.fundraiserDetails
  );
  const amountDetail = useAppSelector((state) => state.user.amountDetail);

  const images = useAppSelector((state) => state.user.images);
  const [createCampaign] = useCreateCampaignMutation();
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const navigation = useAppNavigation();

  const handleCreateCampaign = async () => {
    try {
      const uploadedImageUrls = await handleImageUpload();
      const payload = {
        title: fundraiserDetails.title,
        category: fundraiserDetails.chooseCategory.id,
        location: fundraiserDetails.location,
        amount: amountDetail.amount,
        duration: amountDetail.durationDate,
        images: uploadedImageUrls,
        description: amountDetail.description,
      };
      const result = await createCampaign(payload);
      showToast('success', result?.data?.message);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        })
      );
      onContinue();
    } catch (error) {
      console.error('Create Campaign Error:', error);
    }
  };

  const RowData1 = [
    { Text1: 'Fundraiser Title', Text2: fundraiserDetails?.title },
    {
      Text1: 'Choose Category',
      Text2: fundraiserDetails?.chooseCategory?.title,
      marginVertical: 10,
    },
    {
      Text1: 'Location',
      Text2: fundraiserDetails?.location,
      isLocation: true,
    },
  ];

  const durationDateString = amountDetail.durationDate.join(' - ');

  const RowData2 = [
    { Text1: 'Amount', Text2: amountDetail.amount },
    {
      Text1: 'Duration Date',
      Text2: `${durationDateString.slice(0, 19)}...`,
      marginVertical: 10,
    },
    {
      Text1: 'Attach Image',
      imageSrc: images.map((image) => image.path),
      showImage: true,
    },
  ];

  const handleImageUpload = async () => {
    try {
      if (images && images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append('image', {
            uri: image.path,
            type: 'image/jpeg',
            name: 'jpg',
          });
        });

        const result = await uploadImage(formData);
        console.log('Image Upload Result:', result?.data?.data);
        const uploadedImageUrls = result?.data?.data;
        return uploadedImageUrls;
      } else {
        console.warn('No images available for upload');
      }
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Typography
          label="Fundraiser Details"
          fontFamily={Fonts.Medium}
          fontSize={21}
          marginBottom={normalizeSize(17)}
          color={Colors.green}
          marginTop={normalizeSize(15)}
          marginLeft={normalizeSize(5)}
        />
        <View style={styles.RowDataContainer}>
          {RowData1.map((item, index) => (
            <Row
              key={index}
              Text1={item.Text1}
              Text2={item.Text2}
              marginVertical={item.marginVertical}
            />
          ))}
        </View>
        <Typography
          label="Amount Details"
          fontFamily={Fonts.Medium}
          fontSize={21}
          color={Colors.green}
          marginBottom={normalizeSize(15)}
          marginTop={normalizeSize(25)}
          marginLeft={normalizeSize(5)}
        />
        <View style={styles.RowDataContainer}>
          {RowData2.map((item, index) => (
            <Row
              key={index}
              Text1={item.Text1}
              Text2={item.Text2}
              imageSrc={item.imageSrc}
              showImage={item.showImage}
              marginVertical={item.marginVertical}
            />
          ))}
        </View>
        <Typography
          label="Description"
          fontFamily={Fonts.Medium}
          fontSize={21}
          color={Colors.green}
          marginBottom={normalizeSize(15)}
          marginTop={normalizeSize(25)}
          marginLeft={normalizeSize(5)}
        />
        <CustomInput
          placeholder="Description write here"
          height={135}
          textAlignVertical={'top'}
          multiline={true}
          readOnly
          value={amountDetail.description}
          borderWidth={1}
          borderColor={Colors.lightGray}
          elevation={0.1}
          marginTop={-6}
        />
        <View style={styles.ButtonView}>
          <CustomButton
            title="Back"
            height={55}
            width={'45%'}
            fontFamily={Fonts.Medium}
            backgroundColor={Colors.white}
            borderColor={Colors.SecondaryColor}
            color={Colors.SecondaryColor}
            onPress={onBack}
          />
          <CustomButton
            title="Create"
            height={55}
            width={'45%'}
            onPress={handleCreateCampaign}
            backgroundColor={Colors.SecondaryColor}
            borderColor={Colors.SecondaryColor}
            fontFamily={Fonts.Medium}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: normalizeSize(20),
  },
  RowDataContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingVertical: normalizeSize(20),
    borderRadius: 10,
  },
  ButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalizeSize(20),
  },
});
