import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import eventsSlice from "./slices/eventsSlice";
import eventSlice from "./slices/eventSlice";
import tagsSlice from "./slices/tagsSlice";

const store = configureStore({
  reducer: {
    event: eventSlice,
    events: eventsSlice,
    tags: tagsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
