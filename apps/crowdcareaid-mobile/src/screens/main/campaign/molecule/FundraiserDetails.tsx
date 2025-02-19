import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CustomButton,
  CustomDropdown,
  CustomInput,
} from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { useEffect } from 'react';

import {
  RootState,
  setFundraiserDetails,
  useAllCategoryQuery,
  useAppDispatch,
  useAppSelector,
} from '@crowdcareaid-frontend/store';
import { AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';

interface FundraiserDetailsProps {
  onContinue: () => void;
  onBack: () => void;
}

const FundraiserDetails: React.FC<FundraiserDetailsProps> = ({
  onContinue,
  onBack,
}) => {
  const { data: categoriesApiData, error, isLoading } = useAllCategoryQuery();
  const [chooseCategory, setChooseCategory] =
    useState<AutocompleteDropdownItem | null>(null);
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();
  const maintainExistingFundraiserDetails = useAppSelector(
    (state: RootState) => state.user.fundraiserDetails
  );
  useEffect(() => {
    setTitle(maintainExistingFundraiserDetails?.title);
    setChooseCategory({
      id: maintainExistingFundraiserDetails?.chooseCategory?.id,
      title: maintainExistingFundraiserDetails?.chooseCategory?.title,
    });
    setLocation(maintainExistingFundraiserDetails?.location);
  }, [dispatch, maintainExistingFundraiserDetails]);

  const handleContinue = () => {
    const errorMessages = validateInputs();

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    dispatch(
      setFundraiserDetails({
        title: title,
        chooseCategory: chooseCategory,
        location: location,
      })
    );
    onContinue();
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!location.trim()) {
      newErrors.location = 'Address is required';
    }

    if (!chooseCategory) {
      newErrors.Category = 'Category is required';
    }

    return newErrors;
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ paddingHorizontal: 5 }}>
          <CustomInput
            placeholder="Enter Title"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) {
                setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
              }
            }}
            placeholderTextColor={Colors.lightGray}
            errorMessage={errors.title}
            borderWidth={1}
            borderColor={errors.title ? Colors.errorRed : ''}
          />
          <CustomDropdown
            data={categoriesApiData}
            placeholder="Choose Category"
            onSelectItem={(item) => {
              setChooseCategory(item);
              if (errors.Category) {
                setErrors((prevErrors) => ({ ...prevErrors, Category: '' }));
              }
            }}
            initialValue={
              chooseCategory?.id ||
              maintainExistingFundraiserDetails.chooseCategory?.id
            }
            marginTop={normalizeSize(10)}
            errorMessage={errors.Category}
            fontSize={14}
            placeholderTextColor={Colors.lightGray}
            inputHeight={normalizeSize(50)}
            width={'100%'}
          />
          <CustomInput
            placeholder="Enter Address"
            marginTop={normalizeSize(20)}
            value={location}
            onChangeText={(text) => {
              setLocation(text);
              if (errors.location) {
                setErrors((prevErrors) => ({ ...prevErrors, location: '' }));
              }
            }}
            placeholderTextColor={Colors.lightGray}
            errorMessage={errors.location}
            borderWidth={1}
            borderColor={errors.location ? Colors.errorRed : ''}
          />
        </View>
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
          fontSize={18}
        />
        <CustomButton
          title="Continue"
          height={55}
          width={'45%'}
          onPress={handleContinue}
          backgroundColor={Colors.SecondaryColor}
          borderColor={Colors.SecondaryColor}
          fontFamily={Fonts.Medium}
          fontSize={18}
        />
      </View>
    </View>
  );
};

export default FundraiserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: normalizeSize(20),
  },
});
