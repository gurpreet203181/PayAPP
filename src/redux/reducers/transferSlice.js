import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  contact: null,
  // paymentMethod: null,
};

export const transferSlice = createSlice({
  name: "transferSlice",
  initialState,
  reducers: {
    setTransferDetails: (state, action) => {
      state.amount = action.payload.formattedAmount;
      state.contact = action.payload.selectedContact;
      // state.paymentMethod = action.payload.paymentMethod
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTransferDetails, setPaymentMethod } = transferSlice.actions;

export default transferSlice.reducer;
