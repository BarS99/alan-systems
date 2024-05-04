import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventsRepository } from "repositories/events/events.repository";

interface TagsState {
  items: string[];
  error: boolean;
  loading: boolean;
}

const initialState: TagsState = {
  items: [],
  error: false,
  loading: false,
};

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  return await eventsRepository.getTags();
});

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.items = [];
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchTags.rejected, (state) => {
        state.items = [];
        state.loading = false;
        state.error = true;
      });
  },
});

export default tagsSlice.reducer;
