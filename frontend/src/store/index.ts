import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { systemSlice } from "./Slices/systemSlice";
import { UserAuthAPI } from "./API/UserAuthAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "./Slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSystemReducer = persistReducer(
  persistConfig,
  systemSlice.reducer
);

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    system: persistedSystemReducer,
    user: persistedUserReducer,
    [UserAuthAPI.reducerPath]: UserAuthAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthAPI.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
