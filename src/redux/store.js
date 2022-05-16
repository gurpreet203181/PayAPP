import { configureStore } from "@reduxjs/toolkit";
import transferSlice from "./reducers/transferSlice";
import contactSlice from "./reducers/contactSlice";
import paymentMethodSlice from "./reducers/paymentMethodSlice";
import topUpSlice from "./reducers/topUpSlice";
import withdrawSlice from "./reducers/withdrawSlice";
import userInfoSlice from "./reducers/userInfoSlice";
export const store = configureStore({
  reducer: {
    transfer: transferSlice,
    selectedContact: contactSlice,
    paymentMethod: paymentMethodSlice,
    topUp: topUpSlice,
    withdraw: withdrawSlice,
    userInfo: userInfoSlice,
  },
});
