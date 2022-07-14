const functions = require("firebase-functions");
var admin = require("firebase-admin");
const serviceAccount = require("./payapp-13f92-firebase-adminsdk-2l02z-729a9eaeb1.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();
const messaging = admin.messaging();

require("firebase-functions/lib/logger/compat");
var CryptoJS = require("crypto-js");

const access_key = process.env?.RAPYD_ACCESS_KEY; //  Never transmit the secret key by itself.
const secret_key = process.env?.RAPYD_SECRET_KEY; //Hardkeyed for this example.
const url_path = process.env?.RAPYD_BASE_URI;

//function to get rapyd signature
const getSignature = (header, body) => {
  const to_sign =
    url_path +
    header?.salt +
    header?.timestamp +
    access_key +
    secret_key +
    body;

  let signature = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(to_sign, secret_key)
  );

  signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));

  return signature;
};

//Getting destination_ewallet_id  tokens

const get_user_with_EwalletId = async (destination_ewallet_id) => {
  var user;
  await firestore
    .collection("users")
    .where("ewalletId", "==", destination_ewallet_id)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        user = doc.data();
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  return user;
};

//function to check if number is linked with a user account
exports.isPhoneNumberLinked = functions.https.onCall(async (data, context) => {
  /*if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Endpoint requires authentication!"
    );
  }*/
  var result;
  await firestore
    .collection("users")
    .where("phoneNumber", "==", data.phoneNumber)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      if (querySnapshot?._size == 0) {
        result = false;
      } else {
        result = true;
      }
      /* querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });*/
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      result = error;
    });
  console.log(result);
  return result;
});

exports.rapydNotification = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(500).json({
      message: "it is not working",
    });
    return;
  }

  const signature =
    "ZGMzMmUxNThlN2UwOWUwMmIxMTQzNGIzZmNkMzYyMDJkMDk5NmUwMTljN2E4ZmFlNjM0Y2E1MGQyOTg3NGNjYw==";

  //getSignature(req.headers, req.body);

  if (signature == req.headers?.signature) {
    switch (req.body?.type) {
      case "TRANSFER_FUNDS_BETWEEN_EWALLETS_RESPONSE":
        const destinationUser = await get_user_with_EwalletId(
          req.body.data?.destination_ewallet_id
        );

        if (destinationUser?.tokens && req.body?.data?.status == "accept") {
          await messaging.sendMulticast({
            tokens: destinationUser.tokens,
            notification: {
              title: "Fund received",
              body: destinationUser?.username + " sent you some funds",
            },
            data: {
              test: "test1",
            },
          });
        }
        break;
      case "TRANSFER_FUNDS_BETWEEN_EWALLETS_CREATED":
        const destinationUsers = await get_user_with_EwalletId(
          req.body.data?.destination_ewallet_id
        );

        if (destinationUsers?.tokens) {
          await messaging.sendMulticast({
            tokens: destinationUsers.tokens,
            notification: {
              title: "Fund received",
              body: destinationUsers?.username + " sent you some funds",
            },
            data: {
              test: "test1",
            },
          });
        }
        break;

      default:
        res.end();
    }

    res.end();
  } else {
    res.status(500).json({
      message: "not vaild ",
    });
    res.end();
  }
});
