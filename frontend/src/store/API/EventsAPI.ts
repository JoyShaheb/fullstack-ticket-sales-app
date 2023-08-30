import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEventData } from "../../types/interface";

export const EventsAPI = createApi({
  reducerPath: "EventsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_LOCAL_API_BASE_URL}/api/events`,
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getAllEvents: builder.query<IEventData[], null>({
      query: () => "/get-all-events",
      providesTags: ["Events"],
    }),
    getOneEvent: builder.query<IEventData, string>({
      query: (id) => `/get-one-event/${id}`,
      providesTags: ["Events"],
    }),
    CreateEvent: builder.mutation({
      query: (body) => ({
        url: "/create-event",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useGetOneEventQuery,
} = EventsAPI;
