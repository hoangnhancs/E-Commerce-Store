import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../../layouts/uiSlice";


const customBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
})

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading())//start loading

    await sleep()
    const result = await customBaseQuery(args, api, extraOptions)
    
    api.dispatch(stopLoading())//stop loading
    if (result.error) {
        const {status, data} = result.error
        //handle error
        console.log(status, data)
    }

    return result
}

// Tham số:
// args: Là tham số bạn gửi đi để xác định endpoint và các parameters cho query. Có thể là URL (string) hoặc là một object kiểu FetchArgs.
//{url: "/products", method: "GET"}
// api: Là context, cung cấp thông tin về dispatch, getState, v.v.
// api = {
//     dispatch: ...,
//     getState: ...,
//     extra: { token: "xyz" },  // Nếu bạn truyền thêm extraOptions
//     endpoint: "fetchProducts",  // Tên endpoint đang được gọi
//     type: "query"  // Loại call: query hay mutation
// }
// extraOptions: Cung cấp các thông tin bổ sung nếu cần (thường dùng cho thêm options tùy chỉnh, chẳng hạn như headers, config,...).
// const extraOptions = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };