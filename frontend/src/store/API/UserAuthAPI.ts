import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase-config";

interface IUserSignInData {
  email: string;
  password: string;
}

export const UserAuthAPI = createApi({
  reducerPath: "UserAuthAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User", "UpdateUser"],
  endpoints: (builder) => ({
    emailSignup: builder.mutation({
      queryFn: async (user: IUserSignInData) => {
        try {
          const { email, password } = user;
          const response: UserCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
    }),
    emailLogin: builder.mutation({
      queryFn: async (user: IUserSignInData) => {
        try {
          const { email, password } = user;
          const response: UserCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    googleSignup: builder.mutation({
      queryFn: async () => {
        try {
          const response: UserCredential = await signInWithPopup(
            auth,
            googleProvider
          );
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    // update them later
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UpdateUser"],
    }),
    getUser: builder.query({
      query: ({ id }) => `/get-one-user/:${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useEmailSignupMutation,
  useEmailLoginMutation,
  useGoogleSignupMutation,
} = UserAuthAPI;
