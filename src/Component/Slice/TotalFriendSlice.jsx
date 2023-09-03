import { createSlice } from "@reduxjs/toolkit";

const totalfriendSlice = createSlice({
  name: "Totalfriend",
  initialState: {
    totalfriend: localStorage.getItem("totalfriend")
      ? JSON.parse(localStorage.getItem("totalfriend"))
      : [],
  },
  reducers: {
    collectTotalfriend: (state, action) => {
      state.totalfriend = action.payload;
    },
  },
});

export const { collectTotalfriend } = totalfriendSlice.actions;
export default totalfriendSlice.reducer;
