import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EventItem } from "models/event.model";
import { eventsRepository } from "repositories/events/events.repository";

interface EventState {
  data: EventItem | null;
  loading: boolean;
  error: boolean;
}

const initialState: EventState = {
  data: null,
  loading: true,
  error: false,
};

export const fetchEventById = createAsyncThunk(
  "event/fetchEventById",
  async (eventId: string) => await eventsRepository.getEventById(eventId)
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventById.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchEventById.rejected, (state) => {
        state.data = null;
        state.loading = false;
        state.error = true;
      });
  },
});

export default eventSlice.reducer;
