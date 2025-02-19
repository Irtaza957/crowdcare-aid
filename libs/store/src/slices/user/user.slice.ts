import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      _id: '',
      createdAt: '',
      emailVerified: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      otp: '',
      userType: '',
      profileImage: '',
    },
    fundraiserDetails: {
      title: '',
      chooseCategory: null,
      location: '',
    },

    amountDetail: {
      amount: '',
      durationDate: [],
      description: '',
    },
    images: [],
    fcmToken: '',
  },

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setFundraiserDetails: (state, action) => {
      state.fundraiserDetails = action.payload;
    },
    resetCampaignFlowDetails: (state) => {
      state.fundraiserDetails = {
        title: '',
        chooseCategory: null,
        location: '',
      };
      state.amountDetail = {
        amount: '',
        durationDate: [],
        description: '',
      };
      state.images = [];
    },

    setAmountDetail: (state, action) => {
      state.amountDetail = { ...state.amountDetail, ...action.payload };
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
  },
});

export const {
  setUserData,
  setFundraiserDetails,
  resetCampaignFlowDetails,
  setAmountDetail,
  setImages,
  setFcmToken,
} = userSlice.actions;

export default userSlice.reducer;
