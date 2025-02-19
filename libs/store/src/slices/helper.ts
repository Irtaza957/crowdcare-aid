import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { API_ROUTES } from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseQuery = fetchBaseQuery({
  baseUrl: API_ROUTES.BASE_URL,
  credentials: 'same-origin',

  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('isAuth');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryRtk: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};
