import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  bankId: null,
  // paymentMethod: null,
};

export const withdrawSlice = createSlice({
  name: "withdrawSlice",
  initialState,
  reducers: {
    setWithdrawAmount: (state, action) => {
      state.amount = action.payload.amount;
    },
    setWithdrawBankId: (state, action) => {
      state.bankId = action.payload.bankId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWithdrawAmount, setWithdrawBankId } = withdrawSlice.actions;

export default withdrawSlice.reducer;
