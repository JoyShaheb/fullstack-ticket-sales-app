import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const BookMarkAPI = createApi({
    reducerPath: "BookMarkAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_APP_LOCAL_API_BASE_URL}/api/bookmarks`,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");
            if (token) {
                headers.set("authorization", `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Bookmarks"],
    endpoints: (builder) => ({
        getAllBookMarks: builder.query({
            query: () => "/get-bookmarks",
            providesTags: ["Bookmarks"],
        }),
        saveToBookMark: builder.mutation({
            query: (body) => ({
                url: "/save-to-bookmark",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Bookmarks"],
        }),
        removeEventFromBookMark: builder.mutation({
            query: (body) => ({
                url: "/remove-from-bookmark",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Bookmarks"],
        }),
    }),
});

export const {
    useGetAllBookMarksQuery,
    useSaveToBookMarkMutation,
    useRemoveEventFromBookMarkMutation,
} = BookMarkAPI;