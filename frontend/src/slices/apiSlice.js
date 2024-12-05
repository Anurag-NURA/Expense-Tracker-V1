import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://expense-tracker-v1-backend.vercel.app",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Expenses"],
  endpoints: (builder) => ({}),
});
