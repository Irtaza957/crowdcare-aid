'use server';

import { BASE_URL } from '@crowdcareaid-frontend/utils';
import { cookies } from 'next/headers';

const getAccessToken = () => {
  try {
    const token = cookies().get('token');

    return token ? token.value : null;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};

export const getUserById = async () => {
  const token = getAccessToken();
  if (!token) {
    console.error('Access token is not available.');
    return null;
  }

  const response = await fetch(`${BASE_URL}/api/getUserProfile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
};

export const editUserById = async (payload: UserDataPayload) => {
  const token = getAccessToken();

  if (!token) {
    console.error('Access Token Expired');
    return null;
  }

  console.log('payload...................>', payload);

  const response = await fetch(`${BASE_URL}/api/editProfile`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (data.status === 200) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};
