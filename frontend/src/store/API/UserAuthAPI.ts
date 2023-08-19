import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserAuthAPI = createApi({
  reducerPath: "UserAuthAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      import.meta.env.VITE_APP_LOCAL_API_BASE_URL
    }/api/users/authenticate`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (signupParams) => ({
        url: "/register",
        method: "POST",
        body: signupParams,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (loginParams) => ({
        url: "/login",
        method: "POST",
        body: loginParams,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = UserAuthAPI;
