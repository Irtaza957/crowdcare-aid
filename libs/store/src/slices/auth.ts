import { createApi } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../routes';
import { baseQueryRtk } from './helper';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['UserProfile'],
  baseQuery: baseQueryRtk,
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.LOGIN,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['UserProfile'],
    }),

    SignUp: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.SIGNUP,
        method: 'POST',
        body: payload,
      }),
    }),

    VerifyOTP: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.VERIFY_OTP,
        method: 'POST',
        body: payload,
      }),
    }),

    ResendOTP: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.RESEND_OTP,
        method: 'POST',
        body: payload,
      }),
    }),

    ForgotPassword: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.FORGOT_PASSWORD,
        method: 'POST',
        body: payload,
      }),
    }),

    CreateNewPassword: builder.mutation<ResetPasswordResponse, NewPassword>({
      query: (payload) => ({
        url: API_ROUTES.ResetPassword,
        method: 'POST',
        body: payload,
      }),
    }),

    changePassword: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.CHANGE_PASSWORD,
        method: 'PATCH',
        body: payload,
      }),
    }),
    Logout: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.LOGOUT,
        method: 'POST',
        headers: {
          payload,
        },
      }),
    }),
    DeleteAccount: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.DELETE,
        method: 'DELETE',
        body: payload,
      }),
    }),

    EditProfile: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.EDIT_PROFILE,
        method: 'PATCH',
        body: payload,
      }),
    }),

    UserProfile: builder.query<UserData, void>({
      query: () => ({
        url: API_ROUTES.GET_USER_PROFILE,
        method: 'GET',
      }),
      providesTags: ['UserProfile'],
    }),
    SocialSignup: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.SOCIAL_SIGNUP,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useForgotPasswordMutation,
  useCreateNewPasswordMutation,
  useUserProfileQuery,
  useChangePasswordMutation,
  useLogoutMutation,
  useEditProfileMutation,
  useDeleteAccountMutation,
  useSocialSignupMutation,
} = authApi;
