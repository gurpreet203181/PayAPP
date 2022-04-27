import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: null,
};

export const topUpSlice = createSlice({
  name: "topUpSlice",
  initialState,
  reducers: {
    setTopUpAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { setTopUpAmount, setTopUpPaymentMethod } = topUpSlice.actions;

export default topUpSlice.reducer;
