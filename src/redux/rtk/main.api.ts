import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MainApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
  tagTypes: ['ChatItem', 'Message'],
  endpoints: () => ({}),
});

