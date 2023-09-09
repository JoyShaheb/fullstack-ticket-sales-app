import { createSlice } from '@reduxjs/toolkit';

interface IEventData {
    date: Date | string;
    description: string;
    image: string;
    location: string;
    title: string;
    price: number;
    type: "concert" | "comedy" | string;
    _id?: string;
    id?: string;
}

const initialState: IEventData[] = []; // Initialize as an empty array

export const eventSlice = createSlice({
    name: 'Events',
    initialState,
    reducers: {
        deleteEventSuccess: (state, action) => {
            const eventID = action.payload;
            return state.filter((event) => event._id !== eventID);
        },
    },
});

export const { deleteEventSuccess } = eventSlice.actions;
