import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./futures/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
