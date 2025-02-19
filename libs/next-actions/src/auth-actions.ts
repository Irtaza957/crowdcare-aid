'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { BASE_URL } from '@crowdcareaid-frontend/utils';

export const signup = async (payload: SignUpPayload) => {
  const response = await fetch(`${BASE_URL}/api/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (data.status === 200 || data.status === 201) {
    const cookieJar = cookies();
    cookieJar.set('email', payload.email);
    cookieJar.set('routeTo', '/login');
    cookieJar.set('tempOTP', data.data.otp);

    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

export const login = async (payload: LoginPayload) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log('data', data);

  if (data.status === 200) {
    const cookieJar = cookies();
    cookieJar.set('token', data?.data?.access_token);
    cookieJar.set('userId', data?.data?._id);

    revalidatePath('/');
    return { success: true, message: data.message };
  } else return { success: false, message: data.message };
};

export const resetPassword = async (payload: ResetPayload) => {
  const response = await fetch(`${BASE_URL}/api/forgotPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log('OTP:', data);

  if (data.status === 200 || data.status === 201) {
    const cookieJar = cookies();
    cookieJar.set('email', payload.email);
    cookieJar.set('routeTo', '/changePassword');
    cookieJar.set('tempOTP', data.otp);
    revalidatePath('/');
    return { success: true, message: data.message };
  } else return { success: false, message: data.message };
};

export const verifyOTP = async (payload: VerifyOTPPayload) => {
  const response = await fetch(`${BASE_URL}/api/verifyOtp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.status === 200) {
    const cookieJar = cookies();
    cookieJar.delete('tempOTP');

    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

export const resendOTP = async (payload: ResetPayload) => {
  const response = await fetch(`${BASE_URL}/api/resendOtp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.status === 200) {
    const cookieJar = cookies();
    cookieJar.delete('tempOTP');
    cookieJar.set('tempOTP', data.otp);
    revalidatePath('/otpVerification');
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

export const changePassword = async (payload: NewPassword) => {
  const response = await fetch(`${BASE_URL}/api/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (data.status === 200) {
    const cookieJar = cookies();
    cookieJar.delete('email');
    cookieJar.delete('routeTo');

    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};
