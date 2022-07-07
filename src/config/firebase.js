// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

import Constants from "expo-constants";
import functions from "@react-native-firebase/functions";

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

const auth = firebase.auth();
const firestoreDb = firebase.firestore();

// If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
const cloudFunction = functions().useEmulator("http://192.168.1.4", 5001);

firestoreDb.settings({ experimentalAutoDetectLongPolling: true });
const storage = firebase.storage();
export { auth, firestoreDb, storage, cloudFunction };
//const analytics = getAnalytics(app);
