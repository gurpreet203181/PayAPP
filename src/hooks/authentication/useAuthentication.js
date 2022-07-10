import React from "react";
import { auth, notification, firestoreDb } from "@config/firebase";
import { useDispatch } from "react-redux";
//import crashlytics from "@react-native-firebase/crashlytics";

async function saveTokenToDatabase(token, user) {
  console.log(token);
  console.log(user);
  //  user is already signed in
  const userId = user.uid;

  // Add the token to the users datastore
  await firestoreDb
    .collection("users")
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
}
export function useAuthentication() {
  const [user, setUser] = React.useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        console.log("listner onAuthStateChanged logged");

        // Get the device token
        notification.getToken().then((token) => {
          return saveTokenToDatabase(token, user);
        });

        // you may need to get the APNs token instead for iOS:
        // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

        // Listen to whether the token changes
        return notification.onTokenRefresh((token) => {
          saveTokenToDatabase(token, user);
        });
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
