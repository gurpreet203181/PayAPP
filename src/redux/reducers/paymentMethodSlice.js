import { createSlice } from "@reduxjs/toolkit";

//payment method object
const paymentMethodDetail = {
  name: null,
  id: null,
};

const initialState = {
  paymentMethodDetail,
};

export const selectPaymentMethod = createSlice({
  name: "selectCardSlice",
  initialState,
  reducers: {
    setPaymentMethodName: (state, action) => {
      state.paymentMethodDetail.name = action.payload;
    },
    setIdNumber: (state, actions) => {
      state.paymentMethodDetail.id = actions.payload;
    },
  },
});

export const { setPaymentMethodName, setIdNumber } =
  selectPaymentMethod.actions;
export default selectPaymentMethod.reducer;
