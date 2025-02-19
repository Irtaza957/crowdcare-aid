import { createApi } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../routes';
import { baseQueryRtk } from './helper';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: baseQueryRtk,
  endpoints: (builder) => ({
    AllCategory: builder.query<CategoriesData, void>({
      query: () => ({
        url: API_ROUTES.GET_ALL_CATGORIES,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse): CategoriesData => {
        console.log('res====>>>', response);
        return response.data.map((item: CategoryItem) => ({
          id: item._id,
          title: item.name,
          img: item.logo,
        }));
      },
    }),
    AllCampaign: builder.query<UserData, void>({
      query: () => ({
        url: API_ROUTES.GET_ALL_CAMPAIGN,
        method: 'GET',
      }),
    }),

    SearchCampaign: builder.query({
      query: (searchQuery) => ({
        url: `${API_ROUTES.GET_ALL_CAMPAIGN}? status=approved&keyword=${searchQuery}`,
        method: 'GET',
      }),
    }),
    CreateCampaign: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.CREATE_CAMPAIGN,
        method: 'POST',
        body: payload,
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: API_ROUTES.UPLOAD_IMAGE,
        method: 'POST',
        body: formData,
      }),
    }),
    GetImage: builder.query({
      query: (imageKey) => ({
        url: `${API_ROUTES.GET_IMAGES}?key=${imageKey}`,
        method: 'GET',
      }),
    }),

    GetPapularCampaigns: builder.query({
      query: () => ({
        url: API_ROUTES.PAPULAR_CAMPAIGNS,
        method: 'GET',
      }),
    }),

    CreateReport: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.CREATE_REPORT,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useAllCategoryQuery,
  useAllCampaignQuery,
  useCreateCampaignMutation,
  useUploadImageMutation,
  useGetImageQuery,
  useLazySearchCampaignQuery,
  useCreateReportMutation,
  useGetPapularCampaignsQuery,
} = homeApi;
