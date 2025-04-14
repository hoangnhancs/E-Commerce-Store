import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../lib/types";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://localhost:5001/api"}),
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[], void>({
            query: () => ({url: "/products", method: "GET"}),
        }),
        fetchProductById: builder.query<Product, string>({
            query: (id) => ({url: `/products/${id}`, method: "GET"}),
        }),
    })
})

export const {useFetchProductsQuery, useFetchProductByIdQuery} = productApi