import React from "react";
import { auth } from "@config/firebase";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@redux/reducers/userInfoSlice";
export function useAuthentication() {
  const [user, setUser] = React.useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        //   const storeData = firestoreDb.collection("users").doc(user?.uid).get();
        dispatch(
          setUserInfo({
            email: user?.email,
            //username: user?.displayName,
            profileUrl: user?.photoURL,
            uid: user?.uid,
            phoneNumber: user?.phoneNumber,
          })
        );

        console.log("listner onAuthStateChanged logged");
      } else {
        // User is signed out
        setUser(false);
        console.log("listner onAuthStateChanged undefined");
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
