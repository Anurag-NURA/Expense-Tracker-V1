import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  //baseUrl: "http://localhost:5000",
  baseUrl: "https://expense-tracker-v1-server.vercel.app/",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Expenses"],
  endpoints: (builder) => ({}),
});
