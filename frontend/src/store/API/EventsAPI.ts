import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEventData } from "../../types/interface";
import { addDoc, collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

const collectionName = "events";

export const EventsAPI = createApi({
  reducerPath: "EventsAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getAllEvents: builder.query<IEventData[], null>({
      queryFn: async () => {
        try {
          const refID = await getDocs(collection(db, collectionName));
          const eventsData = refID.docs.map((doc) => {
            const documentID = doc.id;
            const data = doc.data();
            return {
              id: documentID,
              ...data,
            };
          });
          return {
            data: eventsData as IEventData[],
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
    }),
    getOneEvent: builder.query<IEventData, string>({
      queryFn: async (id) => {
        const refID = doc(db, collectionName, id);
        const eventsSnapshot = await getDoc(refID);
        try {
          return {
            data: eventsSnapshot?.data() as IEventData,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      providesTags: ["Events"],
    }),
    CreateEvent: builder.mutation({
      queryFn: async (body) => {
        try {
          await addDoc(collection(db, collectionName), body);
          return {
            data: "Event created successfully",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: (body) => ({
        url: `/update-event/${body._id}`,
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
