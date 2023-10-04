import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
// import { IEventData } from "../../types/interface";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../config/firebase-config";

export const EventsAPI = createApi({
  reducerPath: "EventsAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      queryFn: async () => {
        const querySnapshot = await getDocs(collection(db, "events"));
        const moviesData = querySnapshot.docs.map((doc) => doc.data());
        return { data: moviesData };
      },
      providesTags: ["Events"],
    }),
    // getOneEvent: builder.query<IEventData, string>({
    //   query: (id) => `/get-one-event/${id}`,
    //   providesTags: ["Events"],
    // }),
    // CreateEvent: builder.mutation({
    //   query: (body) => ({
    //     url: "/create-event",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Events"],
    // }),
  }),
});

export const {
  useGetAllEventsQuery,
  // useCreateEventMutation,
  // useGetOneEventQuery,
} = EventsAPI;
