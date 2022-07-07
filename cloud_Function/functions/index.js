const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.listProducts = functions.https.onCall((data, context) => {
  console.log("working");
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Endpoint requires authentication!"
    );
  }

  return 2;
});
