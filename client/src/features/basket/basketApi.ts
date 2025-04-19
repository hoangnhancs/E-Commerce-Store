import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket } from "../../lib/types";

export const basketApi = createApi({
    reducerPath: "basketApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Basket"],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket, void>({
            query: () => ({url: "/basket/mybasket", method: "GET"}),
            providesTags: ["Basket"],
        }),
        addBasketItem: builder.mutation<Basket, {productId: string, quantity: number}>({
            query: ({productId, quantity}) => ({
                url: "/basket/mybasket/items",
                method: "POST",
                body: {
                    productId,
                    quantity
                }
            }),
            invalidatesTags: ["Basket"],
        }),
        removeBasketItem: builder.mutation<Basket, {productId: string, quantity: number}>({
            query: ({productId, quantity}) => ({
                url: `/basket/mybasket/items/${productId}?quantity=${quantity}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Basket"],
        }),
    }),
})

export const {useFetchBasketQuery, useAddBasketItemMutation, useRemoveBasketItemMutation} = basketApi