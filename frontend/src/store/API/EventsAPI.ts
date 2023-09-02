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
    updateEvent: builder.mutation({
      query: (body) => ({
        url: `/update-event/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Events"],
    }),
    getMultipleEvents: builder.mutation({
      query: (body) => ({
        url: "/multiple-events",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/delete-event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
    searchEvents: builder.query({
      query: (searchTerm) => `/search-events?search=${searchTerm}`,
      providesTags: ["Events"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useGetOneEventQuery,
  useUpdateEventMutation,
  useGetMultipleEventsMutation,
  useDeleteEventMutation,
  useSearchEventsQuery,
} = EventsAPI;
