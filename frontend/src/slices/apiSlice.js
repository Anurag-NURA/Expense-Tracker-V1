import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  mode: 'cors',
  credentials: 'include',
  prepareHeaders: (headers) => {
    if (localStorage.token) {
      headers.set("authorization", `Bearer ${localStorage.token}`);
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