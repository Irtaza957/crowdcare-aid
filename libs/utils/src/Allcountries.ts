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
  try {
    const token = await getCountryDataToken();

    const response = await fetch(
      'https://www.universal-tutorial.com/api/countries/',
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
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
