import { createSlice } from "@reduxjs/toolkit";

//userobject
const user = {
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  profileUrl: null,
  phoneNumber: null,
  phoneNumberVerified: false,
  uid: null,
  balance: 0,
  cardsID: [null],
  ewalletId: null,
  friendList: [],
};
const initialState = {
  user,
};

export const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      // Clear all data in redux store to initial.
      if (action.payload?.type === "DESTROY_SESSION") {
        state = initialState;
      }
      const payload = action.payload;
      //email
      state.user.email = payload?.email;
      //username
      state.user.username = payload?.username;

      //firstName
      state.user.firstName = payload?.firstName;

      //lastName
      state.user.lastName = payload?.lastName;

      //profileurl
      state.user.profileUrl = payload?.profileUrl;
      //uid
      state.user.uid = payload?.uid;

      //phoneNumber
      state.user.phoneNumber = payload?.phoneNumber;

      //ewallet ID
      state.user.ewalletId = payload?.ewalletId;
      //friend list with uid of all add friend
      state.user.friendList = payload?.friendList;
      //phoneNumber verified
      // setting user number verfied to true after it verfied with tiwil otp and
      //phone number in update in database
      state.user.phoneNumberVerified = payload?.phoneNumberVerified;
    },
    setUserBalance: (state, action) => {
      state.user.balance = action?.payload;
    },
    setUserCardsId: (state, action) => {
      state.user.cardsID = action?.payload;
    },
  },
});

export const { setUserInfo, setUserBalance, setUserCardsId } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
