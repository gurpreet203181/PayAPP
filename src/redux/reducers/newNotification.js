import { createSlice } from "@reduxjs/toolkit";

//payment method object
const isnewNotification = false;

const initialState = {
  isnewNotification,
};

export const newNotification = createSlice({
  name: "newNotification",
  initialState,
  reducers: {
    setNewNotification: (state, action) => {
      state.isnewNotification = action.payload;
    },
  },
});

export const { setNewNotification } = newNotification.actions;
export default newNotification.reducer;
