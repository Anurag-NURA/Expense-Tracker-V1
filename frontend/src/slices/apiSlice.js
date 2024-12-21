import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = (state) => state.auth.userInfo?.token;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  mode: 'cors',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getToken(getState());
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Expenses"],
  endpoints: (builder) => ({}),
});