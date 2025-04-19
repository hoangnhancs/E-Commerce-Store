import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../lib/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["User", "Basket"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({ url: "/account/user-info", method: "GET" }),
      providesTags: ["User"],
    }),
    login: builder.mutation<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/account/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["User", "Basket"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/account/logout", method: "POST" }),
      invalidatesTags: ["User", "Basket"],
    }),
    register: builder.mutation<User, {email: string, displayName: string, password: string, confirmPassword: string}>({
      query: (credentials) => ({ 
        url: "/account/register", method: "POST", 
        body: credentials
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {useGetCurrentUserQuery, useLoginMutation, useLogoutMutation, useRegisterMutation} = userApi