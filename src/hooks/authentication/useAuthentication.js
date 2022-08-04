import React from "react";
import { firebaseAuth, notification, firestoreDb } from "@config/firebase";
import { useDispatch } from "react-redux";
import firestore from "@react-native-firebase/firestore";

//import crashlytics from "@react-native-firebase/crashlytics";

async function saveTokenToDatabase(token, user) {
  //  user is already signed in
  const userId = user.uid;
  console.log("user");

  console.log(user);

  // Add the token to the users datastore
  await firestoreDb
    .collection("users")
    .doc(userId)
    .update({
      fcmToken: firestore.FieldValue.arrayUnion(token),
    })
    .catch((e) => {
      console.log("use2r");

      console.log(user);
      console.log(e);
    });
}
export function useAuthentication() {
  const [user, setUser] = React.useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = firebaseAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user);
          console.log("listner onAuthStateChanged logged");

          // Get the device token
          //creating new fcm token on auth change
          notification.getToken().then((token) => {
            saveTokenToDatabase(token, user);
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
      }
    );
    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
