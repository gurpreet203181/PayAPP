// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { initializeAuth } from "firebase/auth";

import Constants from "expo-constants";
import { getReactNativePersistence } from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};

// Initialize Firebase
let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
  /*initializeAuth(Firebase, {
    persistence: getReactNativePersistence(AsyncStorage),
  });*/
} else Firebase = firebase.app();

const auth = firebase.auth();
const firestoreDb = firebase.firestore();

firestoreDb.settings({ experimentalAutoDetectLongPolling: true });
const storage = firebase.storage();
export { auth, firestoreDb, storage };
//const analytics = getAnalytics(app);
