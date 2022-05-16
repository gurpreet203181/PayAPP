import { createSlice } from "@reduxjs/toolkit";

//userobject
const user = {
  email: null,
  username: null,
  profileUrl: null,
  phoneNumber: null,
  uid: null,
  balance: 0,
  cardsID: [null],
};
const initialState = {
  user,
};

export const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const payload = action.payload;
      //email
      payload.email != null && (state.user.email = payload.email);
      //username
      payload.username != null && (state.user.username = payload.username);
      //profileurl
      payload.profileUrl != null &&
        (state.user.profileUrl = payload.profileUrl);
      //uid
      payload.uid != null && (state.user.uid = payload.uid);

      //phoneNumber
      payload.phoneNumber != null &&
        (state.user.phoneNumber = payload.phoneNumber);
    },
    setUserBalance: (state, action) => {
      state.user.balance = action.payload;
    },
    setUserCardsId: (state, action) => {
      state.user.cardsID = action.payload;
    },
  },
});

export const { setUserInfo, setUserBalance, setUserCardsId } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
