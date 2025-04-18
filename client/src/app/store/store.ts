import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/counterSlice";
import { productApi } from "../../features/products/productApi";
import uiReducer from "../../layouts/uiSlice";
import { errorApi } from "../../features/error/errorApi";
import { basketApi } from "../../features/basket/basketApi";
import { userApi } from "../../features/user/userApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer, //tạo store với 1 reducer tên productApi, chính là productApi.ts.
    [errorApi.reducerPath]: errorApi.reducer, //tạo store với 1 reducer tên errorApi, chính là errorApi.ts.
    [basketApi.reducerPath]: basketApi.reducer, //tạo store với 1 reducer tên basketApi, chính là basketApi.ts.
    [userApi.reducerPath]: userApi.reducer, //tạo store với 1 reducer tên userApi, chính là userApi.ts.
    counter: counterReducer, //tạo store với 1 reducer tên counter, chính là counterSlice.ts.
    ui : uiReducer //tạo store với 1 reducer tên ui, chính là uiSlice.ts. 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, errorApi.middleware, basketApi.middleware, userApi.middleware), //thêm middleware cho productApi vào store
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
