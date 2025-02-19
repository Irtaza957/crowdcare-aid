import {
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomInput,
  Typography,
  DatePicker,
  CustomButton,
  CustomDropdown,
  CustomImage,
  showToast,
  Icons,
} from '@crowdcareaid-frontend/native-components';
import {
  normalizeSize,
  validatePhoneNumber,
} from '@crowdcareaid-frontend/utils';
import { Colors, Fonts, SVGS } from '@crowdcareaid-frontend/assets';
import IconView from './moleules/IconView';
import {
  setUserData,
  useAppDispatch,
  useAppSelector,
  useEditProfileMutation,
  useUploadImageMutation,
  useUserProfileQuery,
} from '@crowdcareaid-frontend/store';
import UploadMedia from './moleules/ModalPicker';
import { AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';
import { styles } from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomPhone from './moleules/CustomPhone';
import { useAppNavigation } from '../../../routes';

const EditProfile = () => {
  const [EditProfile, { isError, isLoading, isSuccess }] =
    useEditProfileMutation();
  const { data: userProfileData, refetch: refetchUserProfile } =
    useUserProfileQuery();
  const [UploadImage, { isLoading: isImageLoading }] = useUploadImageMutation();
  console.log('data-================', userProfileData);

  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.user);
  const navigation = useAppNavigation();
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('1');
  const [gender, setGender] = useState(null);
  const [aboutMe, setAboutMe] = useState('');
  const [dob, setDob] = useState('05/06/1997');
  const [address, setAddress] = useState('');
  const [isVisibleDate, setIsVisibleDate] = useState(false);

  const [firstError, setFirstError] = useState(null);
  const [lastErrors, setLastErrors] = useState(null);
  const [numErrors, setNumErrors] = useState(null);
  const [desErrors, setDesErrors] = useState(null);
  const [addressErrors, setAddressErrors] = useState(null);
  const [dateErrors, setDateErrors] = useState(null);
  const [genderErrors, setGenderErrors] = useState(null);

  const [countryCode, setCountryCode] = useState('1');
  const handlePhoneChange = (text: string) => {
    setPhone(text);
    if (text) {
      setNumErrors('');
    }
  };

  const handlePress = (dialCode: string) => {
    console.log(`Selected Dial Code: ${dialCode}`);
  };

  const handleNext = () => {
    if (!phone) {
      setNumErrors('Phone number is required');
    } else {
      console.log('PhoneNumber is valid', `Phone Number: ${phone}`);
    }
  };
  useEffect(() => {
    setFirstName(userProfileData?.data?.firstName);
    setLastName(userProfileData?.data?.lastName);
    setAddress(userProfileData?.data?.address);
    setAboutMe(userProfileData?.data?.aboutMe);
    setPhone(userProfileData?.data?.phone);
    setGender({
      id: userProfileData?.data?.gender,
    });
    setDob(userProfileData?.data?.dob);
    setCountryCode(userProfileData?.data?.countryCode || '1');
  }, [userProfileData]);
  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString();
    setDob(formattedDate);
    setIsVisibleDate(false);
    setDateErrors('');
  };

  console.log('gender=====================', gender);
  const handleImage = async () => {
    if (!validatePhoneNumber(phone, countryCode)) {
      setNumErrors('enter phone number');
      return;
    }

    setFirstError(firstName ? '' : 'Please fill in your first name');
    setLastErrors(lastName ? '' : 'Please fill in your last name');
    setNumErrors(phone ? '' : 'Please enter your phone number ');
    setDesErrors(aboutMe ? '' : 'Please provide a description');
    setAddressErrors(address ? '' : 'Please fill in your address');
    setDateErrors(dob ? '' : 'Please select a date');
    setGenderErrors(gender ? '' : 'Please select your gender');

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !aboutMe ||
      !address ||
      !dob ||
      !gender
    ) {
      return;
    }

    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        const res = await UploadImage(formData);

        console.log('halloooo============', res);
        const uploadedImage = res?.data?.data[0];
        dispatch(
          setUserData({
            ...userData,
            profileImage: uploadedImage,
          })
        );
        await handleSaveData(uploadedImage);
      } else {
        await handleSaveData();
      }
    } catch (error) {
      console.log('Image upload error:', error);
    }
  };

  const handleSaveData = async (uploadedImage?: string) => {
    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        gender: gender.id,
        phone: phone,
        aboutMe: aboutMe,
        dob: dob,
        address: address,
        countryCode: countryCode,
      };
      if (uploadedImage) {
        payload.profileImage = uploadedImage;
      }
      console.log('Payload:', payload);
      const res = await EditProfile(payload);
      console.log('Data saved:===========', res);
      showToast('success', res?.data?.message);

      if (res?.data) {
        refetchUserProfile();
      }
      console.log('Failed to save data:', res);

      return res;
    } catch (error) {
      console.log('Data save error:', error);
    }
  };
  const getGenderLabel = (id) => {
    if (id == 1) {
      return 'Male';
    }
    if (id == 2) {
      return 'Female';
    }
  };

  const data = [
    {
      id: '1',
      label: userProfileData?.data?.dob,
      icon: <SVGS.Calendar />,
    },
    { id: '2', label: userProfileData?.data?.address, icon: <SVGS.location /> },
    {
      id: '3',
      label: getGenderLabel(userProfileData?.data?.gender),
      icon: <SVGS.Gender />,
    },
    {
      id: '4',
      label: userProfileData?.data?.phone,
      icon: <SVGS.mobile />,
    },
  ];

  const AchievementsData = [
    {
      id: 0,
      title: '3',
      label: 'Compaigns',
    },
    {
      id: 1,
      title: '$ 5,000',
      label: 'Donated',
    },
    {
      id: 2,
      title: '$ 5,000',
      label: 'Generated',
    },
  ];

  interface GenderItem {
    id: number;
    title: string;
  }
  const Gender: GenderItem[] = [
    {
      id: 1,
      title: 'Male',
    },
    {
      id: 2,
      title: 'Female',
    },
  ];

  const transformedGender: AutocompleteDropdownItem[] = Gender.map((item) => ({
    id: item.id.toString(),
    title: item.title,
  }));
  const renderItem = useCallback(
    ({ item }) => (
      <View>
        <IconView label={item.label} RightIcon={item.icon} />
      </View>
    ),
    []
  );

  const renderEditScreen = () => (
    <View>
      <View style={styles.renderMain}>
        <CustomInput
          placeholder={'John'}
          fontSize={normalizeSize(16)}
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            if (firstError) {
              setFirstError('');
            }
          }}
          inputWidth={normalizeSize(150)}
          placeholderTextColor={Colors.lightGray}
          borderRadius={normalizeSize(8)}
          errorMessage={firstError}
        />
        <CustomInput
          placeholder={'Cooper'}
          fontSize={normalizeSize(16)}
          onChangeText={(text) => {
            setLastName(text);
            if (lastErrors) {
              setLastErrors('');
            }
          }}
          value={lastName}
          inputWidth={normalizeSize(150)}
          placeholderTextColor={Colors.lightGray}
          borderRadius={normalizeSize(8)}
          errorMessage={lastErrors}
        />
      </View>
      <CustomInput
        fontSize={normalizeSize(16)}
        value={userProfileData?.data?.email}
        borderRadius={normalizeSize(8)}
        inputColor={Colors.lightGray}
        readOnly
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.parent}>
      <StatusBar hidden={true} />
      <View
        style={[
          {
            opacity: !isEditVisible ? 0.5 : null,
          },
          styles.opacityMainView,
        ]}
      >
        <View style={styles.PositionView}>
          {!isEditVisible && (
            <View style={styles.crossIcon}>
              <Icons
                family="AntDesign"
                name="arrowleft"
                color={Colors.white}
                size={30}
                onPress={() => navigation.goBack()}
              />
            </View>
          )}
          <CustomImage
            url={
              selectedImage
                ? selectedImage
                : userProfileData?.data?.profileImage
            }
            style={styles.image}
            shouldUseDirectImage={!!selectedImage}
          />
          <View style={styles.ImagePosition}>
            {isEditVisible && (
              <TouchableOpacity
                onPress={() => setIsEditVisible(false)}
                style={styles.BackCross}
                activeOpacity={0.6}
              >
                <SVGS.WhiteCross />
              </TouchableOpacity>
            )}

            <View style={styles.PersonalData}>
              {!isEditVisible && (
                <View>
                  <Typography
                    label={
                      userProfileData?.data?.firstName +
                      ' ' +
                      userProfileData?.data?.lastName
                    }
                    fontSize={25}
                    color={Colors.white}
                    fontFamily={Fonts.Bold}
                  />
                  <Typography
                    label={userProfileData?.data?.email}
                    fontSize={12}
                    color={Colors.white}
                  />
                </View>
              )}
              <View>
                {isEditVisible ? (
                  <View style={styles.CameraPosition}>
                    <TouchableOpacity
                      style={styles.CameraView}
                      activeOpacity={0.8}
                      onPress={() => setShowModal(true)}
                    >
                      <SVGS.Camera />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setIsEditVisible(true)}
                  >
                    <SVGS.Edit width={30} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>

      <KeyboardAwareScrollView
        style={styles.infoView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ImageModal}>
          {isEditVisible ? (
            <>
              {renderEditScreen()}
              <UploadMedia
                onSelectImage={(imageUri) => {
                  setSelectedImage(imageUri);
                  setShowModal(false);
                }}
                modalVisible={showModal}
                onClose={() => setShowModal(false)}
              />
              <CustomPhone
                value={phone}
                onChange={handlePhoneChange}
                error={numErrors}
                onPress={handlePress}
                phoneCodeVal={'1'}
                onBlur={handleNext}
                setCountryCode={setCountryCode}
                countryCode={countryCode}
              />
              <View style={styles.MainDate}>
                <View style={styles.Date}>
                  <DatePicker
                    title={dob || 'Select Date'}
                    fontSize={normalizeSize(16)}
                    isVisible={isVisibleDate}
                    onPress={() => setIsVisibleDate(true)}
                    onConfirm={handleConfirm}
                    onCancel={() => setIsVisibleDate(false)}
                    color={Colors.Black}
                    minimumDate={new Date(new Date().getFullYear() - 100, 0, 1)}
                    maximumDate={new Date(new Date().getFullYear() - 18, 0, 1)}
                  />
                  {dateErrors && (
                    <Typography
                      label="Select the Date"
                      marginTop={8}
                      fontSize={10}
                      color={Colors.errorRed}
                    />
                  )}
                </View>
                <View style={styles.GenderWidth}>
                  <CustomDropdown
                    initialValue={{ id: gender?.id }}
                    marginTop={genderErrors ? 20 : 0}
                    placeholder={'Select Gender'}
                    placeholderTextColor={Colors.lightGray}
                    onSelectItem={(item) => {
                      setGender(item);
                      setGenderErrors('');
                    }}
                    data={transformedGender}
                    errorMessage={genderErrors}
                    inputHeight={normalizeSize(52)}
                    width={'100%'}
                  />
                </View>
              </View>
              <CustomInput
                placeholder="Add Address"
                fontSize={normalizeSize(16)}
                marginTop={normalizeSize(4)}
                value={address}
                onChangeText={(text) => {
                  setAddress(text);
                  if (setAddressErrors) {
                    setAddressErrors('');
                  }
                }}
                placeholderTextColor={Colors.lightGray}
                borderRadius={normalizeSize(8)}
                errorMessage={addressErrors}
              />
              <CustomInput
                placeholder={'Description write here'}
                placeholderTextColor={Colors.lightGray}
                value={aboutMe}
                width={200}
                fontSize={16}
                onChangeText={(text) => {
                  setAboutMe(text);
                  if (desErrors) {
                    setDesErrors('');
                  }
                }}
                height={135}
                textAlignVertical={'top'}
                multiline={true}
                errorMessage={desErrors}
              />
              <CustomButton
                title="Save"
                onPress={handleImage}
                loading={isImageLoading || isLoading}
                marginBottom={normalizeSize(10)}
              />
            </>
          ) : (
            <>
              <Typography
                label="My Info"
                fontSize={23}
                color={Colors.PrimaryColor}
                fontFamily={Fonts.Bold}
                marginBottom={normalizeSize(25)}
              />

              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.FlashListStyle}
              />
              <Typography
                label="About Me"
                color={Colors.PrimaryColor}
                fontSize={23}
                fontFamily={Fonts.Bold}
                marginBottom={normalizeSize(20)}
              />
              <Typography
                label={userProfileData?.data?.aboutMe}
                fontSize={13}
                marginBottom={normalizeSize(20)}
              />
              <Typography
                label="Contribution"
                color={Colors.PrimaryColor}
                fontSize={23}
                fontFamily={Fonts.Bold}
                marginBottom={normalizeSize(20)}
              />
              <View style={styles.Achievement}>
                {AchievementsData.map((item, index) => {
                  return (
                    <View
                      style={[
                        styles.AchievementData,
                        {
                          borderRightWidth:
                            index < AchievementsData.length - 1 ? 1 : 0,
                        },
                      ]}
                      key={item.id}
                    >
                      <Typography
                        label={item.title}
                        fontSize={18}
                        fontFamily={Fonts.Medium}
                        marginBottom={5}
                        color={Colors.white}
                      />
                      <Typography
                        label={item.label}
                        fontSize={16}
                        fontFamily={Fonts.Medium}
                        color={Colors.white}
                      />
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
