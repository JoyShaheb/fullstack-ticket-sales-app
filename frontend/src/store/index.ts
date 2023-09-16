import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { systemSlice } from "./Slices/systemSlice";
import { UserAuthAPI } from "./API/UserAuthApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "./Slices/userSlice";
import { EventsAPI } from "./API/EventsAPI";
import { BookMarkAPI } from "./API/BookMarkAPI";
import { searchSlice } from "./Slices/SearchSlice";
import { basketSlice } from "./Slices/basket";
import { salesAPI } from "./API/SalesApi";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSystemReducer = persistReducer(
  persistConfig,
  systemSlice.reducer
);

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);
const persistedBasketReducer = persistReducer(
  persistConfig,
  basketSlice.reducer
);

export const store = configureStore({
  reducer: {
    system: persistedSystemReducer,
    user: persistedUserReducer,
    [UserAuthAPI.reducerPath]: UserAuthAPI.reducer,
    [EventsAPI.reducerPath]: EventsAPI.reducer,
    [BookMarkAPI.reducerPath]: BookMarkAPI.reducer,
    [salesAPI.reducerPath]: salesAPI.reducer,
    SearchTerm: searchSlice.reducer,
    Basket: persistedBasketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      EventsAPI.middleware,
      UserAuthAPI.middleware,
      BookMarkAPI.middleware
    ),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
