import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FakeData } from "../components/Home/Body_Home/FakeData";
//import axios from "axios";

const menuInitial = {
  list: [],
  status: "idle",
  error: null
};

export const getInventoryApi = createAsyncThunk("inventory/getInventoryApi", async () => {
  const response = await FakeData;
  return response;
});

export const inventoryStore = createSlice({
  name: "inventorygStore",
  initialState: menuInitial,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getInventoryApi.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInventoryApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.list = state.list.concat(action.payload);
      })
      .addCase(getInventoryApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        alert(state.error);
      });
  }
});

export default inventoryStore.reducer;