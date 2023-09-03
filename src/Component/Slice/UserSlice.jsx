import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "signin",

  initialState: {
    signin: localStorage.getItem("userdatafirebase")
      ? JSON.parse(localStorage.getItem("userdatafirebase"))
      : null,
  },

  reducers: {
    userslicereducer: (state, action) => {
      state.signin = action.payload;
    },
  },
});

export const { userslicereducer } = userSlice.actions;

export default userSlice.reducer;
