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
  }),
});

export const {useGetCurrentUserQuery, useLoginMutation} = userApi