import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = (state) => state.auth.userInfo?.token;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  mode: "cors",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getToken(getState());
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      //if the token exists in the browser local storage
    }
    headers.set("Accept", "application/json");
    //This is always set, regardless of whether a token exists.
    //It ensures that the server knows the client expects JSON responses.
    return headers;
  },
  //This structure ensures that every request will have an Accept header,  //but only authenticated requests will have an Authorization header.
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Expenses"],
  endpoints: (builder) => ({}),
});
