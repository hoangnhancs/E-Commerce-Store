import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/counterSlice";
import { productApi } from "../../features/products/productApi";
import uiReducer from "../../layouts/uiSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer, //tạo store với 1 reducer tên productApi, chính là productApi.ts.
    counter: counterReducer, //tạo store với 1 reducer tên counter, chính là counterSlice.ts.
    ui : uiReducer //tạo store với 1 reducer tên ui, chính là uiSlice.ts. 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware), //thêm middleware cho productApi vào store
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
