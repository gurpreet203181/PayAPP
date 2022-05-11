import React from "react";
import { auth, firestoreDb } from "@config/firebase";
//import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export function useAuthentication() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);

        console.log("listner onAuthStateChanged logged");
      } else {
        // User is signed out
        setUser(undefined);
        console.log("listner onAuthStateChanged undefined");
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
