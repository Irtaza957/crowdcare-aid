import { StyleSheet, View, TextStyle } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  CustomButton,
  CustomDatePicker,
  CustomInput,
  Typography,
  showToast,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import ImagePicker from './ImagePicker';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import {
  setAmountDetail,
  useAppDispatch,
  useAppSelector,
  setImages as setImagesAction,
  RootState,
} from '@crowdcareaid-frontend/store';
import dayjs from 'dayjs';

const AmountDetail = ({ onContinue, onBack }) => {
  const [amount, setAmount] = useState('');
  const [durationDate, setDurationDate] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useAppDispatch();

  const maintainExistingAmountDetails = useAppSelector(
    (state: RootState) => state.user.amountDetail
  );

  const maintainExistingImage = useAppSelector((state) => state.user.images);
  console.log('hiii______>>>>', maintainExistingImage);
  const handleContinue = () => {
    const errorMessages = validateInputs();

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }
    dispatch(
      setAmountDetail({
        amount: amount,
        durationDate: durationDate,
        description: description,
      })
    );
    onContinue();
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    }

    if (!durationDate.length) {
      newErrors.durationDate = 'Start and End date is required';
    }

    if (!description) {
      newErrors.description = 'description is required';
    }
    if (!images || images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    return newErrors;
  };

  const amountDetail = useAppSelector((state) => state.user.amountDetail);

  console.log('amountDetail====', amountDetail);

  const handleImagesSelected = (images) => {
    dispatch(setImagesAction(images));
    if (errors.images) {
      setErrors((prevErrors) => ({ ...prevErrors, images: '' }));
    }
  };
  const images = useAppSelector((state) => state.user.images);
  console.log('setImages', images);

  const handleSave = () => {
    const startDate = selectedStartDate
      ? dayjs(selectedStartDate).format('DD-MM-YYYY')
      : null;
    if (!startDate) {
      return showToast('error', 'Please enter start date and end date');
    }
    const endDate = selectedEndDate
      ? dayjs(selectedEndDate).format('DD-MM-YYYY')
      : dayjs(selectedStartDate).format('DD-MM-YYYY');
    setDurationDate([startDate, endDate]);
    setDatePickerVisible(false);
    setSelectedEndDate(null);
    setSelectedStartDate(null);
    if (errors.durationDate) {
      setErrors((prevErrors) => ({ ...prevErrors, durationDate: '' }));
    }
  };

  const handleDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') => {
    if (type === 'START_DATE') {
      setSelectedStartDate(date);
    } else {
      setSelectedEndDate(date);
    }
  };

  const HandleClose = () => {
    setDatePickerVisible(false);
    setSelectedEndDate(null);
    setSelectedStartDate(null);
  };

  useEffect(() => {
    setAmount(maintainExistingAmountDetails.amount);
    setDurationDate(maintainExistingAmountDetails.durationDate);
    setDescription(maintainExistingAmountDetails.description);
  }, [maintainExistingAmountDetails]);

  const durationDateString = durationDate.length
    ? durationDate.join(' - ')
    : 'Duration Date';

  return (
    <View style={styles.container}>
      <View>
        <CustomInput
          placeholder="Enter Amount"
          value={amount}
          keyboardType="numeric"
          onChangeText={(text) => {
            setAmount(text);
            if (errors.amount) {
              setErrors((prevErrors) => ({ ...prevErrors, amount: '' }));
            }
          }}
          placeholderTextColor={Colors.lightGray}
          errorMessage={errors.amount}
          borderWidth={1}
          borderColor={errors.amount ? Colors.errorRed : ''}
        />
        <View
          style={[
            styles.DateView,
            {
              borderWidth: 1,
              borderColor: errors.durationDate ? Colors.errorRed : Colors.white,
            },
          ]}
        >
          <Typography
            label={durationDateString}
            onPress={() => setDatePickerVisible(true)}
            marginLeft={normalizeSize(20)}
            fontSize={normalizeSize(15)}
            color={durationDate.length ? Colors.Black : Colors.lightGray}
          />
        </View>
        {errors.durationDate && (
          <Typography
            label={errors.durationDate}
            fontSize={10}
            color={Colors.errorRed}
            top={10}
          />
        )}
        <View
          style={[
            styles.ImageView,
            {
              borderWidth: 1,
              borderColor: errors.images ? Colors.errorRed : Colors.white,
            },
          ]}
        >
          <ImagePicker onImagesSelected={handleImagesSelected} />
        </View>
        {errors.images && (
          <Typography
            label={errors.images}
            fontSize={10}
            color={Colors.errorRed}
            top={10}
          />
        )}
        <CustomInput
          placeholder="Description write here"
          height={135}
          textAlignVertical={'top'}
          multiline={true}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (errors.description) {
              setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
            }
          }}
          marginTop={normalizeSize(20)}
          placeholderTextColor={Colors.lightGray}
          errorMessage={errors.description}
          borderWidth={1}
          borderColor={errors.description ? Colors.errorRed : ''}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
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
          title="Continue"
          height={55}
          width={'45%'}
          onPress={handleContinue}
          backgroundColor={Colors.SecondaryColor}
          borderColor={Colors.SecondaryColor}
          fontFamily={Fonts.Medium}
        />
        <CustomDatePicker
          isVisible={isDatePickerVisible}
          onClose={HandleClose}
          onSave={handleSave}
          selectedEndDate={selectedEndDate}
          selectedStartDate={selectedStartDate}
          onDateChange={handleDateChange}
        />
      </View>
    </View>
  );
};

export default AmountDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: normalizeSize(20),
    paddingHorizontal: normalizeSize(4),
  },

  DateView: {
    marginTop: normalizeSize(10),
    height: normalizeSize(53),
    borderColor: Colors.disabled,
    elevation: 4,
    backgroundColor: Colors.white,
    borderRadius: normalizeSize(8),
    justifyContent: 'center',
  },
  ImageView: {
    marginTop: normalizeSize(20),
    borderRadius: 10,
  },
});
