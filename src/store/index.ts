// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./ApiSlice/authSlice";
import articleSlice from "./ApiSlice/articleSlice";

const reducers = combineReducers({
  auth: authSlice,
  articles: articleSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "articles"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const isProd = window?.location?.href?.includes("https");

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: !isProd,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
