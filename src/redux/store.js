import { configureStore } from "@reduxjs/toolkit";
import transferSlice from "./reducers/transferSlice";
import selectedContactSlice from "./reducers/selectedContactSlice";
import selectedCardSlice from "./reducers/selectedCardSlice";

export const store = configureStore({
  reducer: {
    transfer: transferSlice,
    selectedContact: selectedContactSlice,
    selectedCard: selectedCardSlice,
  },
});
