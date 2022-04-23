import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCardId: null,
};

export const selectCardSlice = createSlice({
  name: "selectCardSlice",
  initialState,
  reducers: {
    setSelectCard: (state, action) => {
      state.selectedCardId = action.payload;
    },
  },
});

export const { setSelectCard } = selectCardSlice.actions;
export default selectCardSlice.reducer;
