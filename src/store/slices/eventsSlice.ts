import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventItem } from "models/event.model";
import { eventsRepository } from "repositories/events/events.repository";

interface EventsState {
  items: EventItem[];
  loading: boolean;
  error: boolean;
}

const initialState: EventsState = {
  items: [],
  loading: true,
  error: false,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  return await eventsRepository.getEvents();
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.items = [];
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.items = [];
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = false;
      });
  },
});

export default eventsSlice.reducer;
