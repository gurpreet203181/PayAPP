import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //setting default recent user
  contact: {
    id: 1,
    name: "Samantha",
    phoneNumber: 3278195659,
    profileImage: require("../../assets/dummyData/boy.png"),
  },
};

export const selectedContactSilce = createSlice({
  name: "selectedContactSilce",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.contact = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedContact } = selectedContactSilce.actions;

export default selectedContactSilce.reducer;
