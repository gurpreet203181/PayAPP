import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //setting default recent user
  contact: {
    ewalletId: null,
    username: null,
    image: null,
    name: null,
  },
};

export const selectedContactSilce = createSlice({
  name: "selectedContactSilce",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.contact.ewalletId = action.payload?.ewalletId;
      state.contact.username = action.payload?.username;
      state.contact.image = action.payload?.profileURL;
      state.contact.name = `${action.payload?.firstName} ${action.payload?.lastName}`;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedContact } = selectedContactSilce.actions;

export default selectedContactSilce.reducer;
