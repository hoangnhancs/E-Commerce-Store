import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../lib/types";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => ({url: "/account/user-info", method: "GET"}),
        }),
    }),
})

export const {useGetCurrentUserQuery} = userApi