'use server';
import { revalidatePath } from 'next/cache';
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

export const getAllUser = async (
  id: string,
  page?: number,
  itemsPerPage?: number
) => {
  const token = getAccessToken();
  if (!token) {
    console.error('Access token is not available.');
    return null;
  }

  let url = `${BASE_URL}/api/users`;
  if (id) {
    url += `?userId=${id}`;
  } else {
    url += `?page=${page}&limit=${itemsPerPage}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
};
