import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  //baseUrl: "http://localhost:5000",
  baseUrl: import.meta.env.VITE_API_URL,
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Expenses"],
  endpoints: (builder) => ({}),
});
