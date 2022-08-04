// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import firebase from "@react-native-firebase/app";

import Constants from "expo-constants";

//using React Native Firebase is the officially recommended
//collection of packages that brings React Native support for all Firebase services on both Android and iOS apps.
import functions from "@react-native-firebase/functions";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

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
} else Firebase = firebase.app();

const firebaseAuth = auth();
const firestoreDb = firestore();

// Use a local emulator in development
if (__DEV__) {
  // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
  // functions().useFunctionsEmulator("http://localhost:5001");
}

const cloudFunction = functions();
const notification = messaging();
firestoreDb.settings({ experimentalAutoDetectLongPolling: true });
//const storage = firebase.storage();
export { firebaseAuth, firestoreDb, cloudFunction, notification };
//const analytics = getAnalytics(app);
