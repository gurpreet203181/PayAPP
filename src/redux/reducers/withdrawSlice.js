import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  payoutMethod: null,
};

export const withdrawSlice = createSlice({
  name: "withdrawSlice",
  initialState,
  reducers: {
    setWithdrawInfo: (state, action) => {
      state.amount = action.payload.formattedAmount;

      //payout method
      state.payoutMethod = action?.payload?.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWithdrawInfo } = withdrawSlice.actions;

export default withdrawSlice.reducer;
