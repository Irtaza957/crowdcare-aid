'use server';

import { BASE_URL } from '@crowdcareaid-frontend/utils';
import { url } from 'inspector';
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

export const getCampaignCateogries = async () => {
  const token = getAccessToken();
  if (!token) {
    console.error('Access token is not available.');
    return null;
  }

  const response = await fetch(`${BASE_URL}/api/getCategories`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
};

export const getPopularCampaigns = async () => {
  const token = getAccessToken();
  if (!token) {
    console.error('Access token is not available.');
    return null;
  }

  const response = await fetch(`${BASE_URL}/api/getPopularCampaigns`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
};

export const getCountryDataToken = async () => {
  const response = await fetch(
    `https://www.universal-tutorial.com/api/getaccesstoken`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'api-token':
          'Eh2ZBY3xRi-8THfnUIqJyK0jUhecKs10hXEQKlQi6hRZM3L3fokNNk5uZaQUFf8CYPI',
        'user-email': 'qaseem.dev@gmail.com',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error fetching token:', errorText);
    throw new Error(
      `Failed to fetch token: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.auth_token;
};

export const getAllCountries = async () => {
  const token = await getCountryDataToken();

  const response = await fetch(
    `https://www.universal-tutorial.com/api/countries/`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }

  const data = await response.json();
  return data;
};

export const createCampaign = async (payload: CreateCampaignPayload) => {
  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/api/createCampaign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (data.status === 200 || data.status === 201) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

export const uploadImages = async (payload: { image: File[] }) => {
  const token = getAccessToken();
  const formData = new FormData();

  payload.image.forEach((file) => {
    formData.append('image[]', file);
  });

  try {
    const response = await fetch(`${BASE_URL}/api/uploadImage`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Upload failed:', errorData);
      return { success: false, message: `Upload failed: ${errorData}` };
    }

    const data = await response.json();
    return { success: true, message: data.message, ...data };
  } catch (error) {
    console.error('Error uploading images:', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const getAllCampaigns = async () => {
  const token = getAccessToken();
  if (!token) {
    console.error('Access token is not available.');
    return null;
  }

  const response = await fetch(`${BASE_URL}/api/getAllCampaigns`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
};

export const updateCampaignStatus = async (payload) => {
  const token = getAccessToken();
  const response = await fetch(
    `${BASE_URL}/api/updateCampaignStatus/${payload.id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: payload.status }),
    }
  );

  const data = await response.json();

  if (data.status === 200) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

export const getAuthUserCampaigns = async () => {
  const token = getAccessToken();
  if (!token) {
    console.error('Access token is not available.');
    return null;
  }

  const response = await fetch(`${BASE_URL}/api/getAuthUserCampaign`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
};

export const getFilteredCampaigns = async (keyword?: string) => {
  const token = getAccessToken();
  if (!token) {
    console.error('Access token is not available.');
    return null;
  }

  let url = `${BASE_URL}/api/getAllCampaigns`;
  if (keyword) {
    url += `?status=approved&keyword=${keyword}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data;
};

export const getCampaignDetails = async (id: string) => {
  const token = getAccessToken();
  if (!token) {
    console.error('Access token is not available.');
    return null;
  }

  const response = await fetch(
    `${BASE_URL}/api/getAllCampaigns?campaignId=${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  return data;
};
