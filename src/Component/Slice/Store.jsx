import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import TotalFriendSlice from "./TotalFriendSlice";

export const store = configureStore({
  reducer: {
    signinSlice: UserSlice,
    totalfriend: TotalFriendSlice,
  },
});
