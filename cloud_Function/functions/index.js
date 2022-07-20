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
const fetch = require("node-fetch");

const access_key = process.env?.RAPYD_ACCESS_KEY; //  Never transmit the secret key by itself.
const secret_key = process.env?.RAPYD_SECRET_KEY; //Hardkeyed for this example.
const url_path = process.env?.FUNCTION_RAPYD_NOTIFICATION_URL;
const base_uri = process.env?.RAPYD_BASE_URI;

let timeStamp = "";
let salt = "";

// set timeStamp
const setTimeStamp = () => {
  timeStamp = (Math.floor(new Date().getTime() / 1000) - 10).toString(); // Current Unix time (seconds).
};
//set salt
const setSalt = () => {
  salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
};

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
const get_post_request_Signature = (http_method, path, data) => {
  //calling method setTimeStamp and setSalt here to get updated value
  setTimeStamp(); //setting time stamp
  setSalt(); //setting salt

  const to_sign =
    http_method + path + salt + timeStamp + access_key + secret_key + data;

  console.log(to_sign);
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

//sending accept request to rapyd for accepting fund trasnferd for users
const accept_Fund = async (id, status) => {
  const http_method = "post";
  const path = "/v1/account/transfer/response";

  try {
    //setting data for api call
    const data = JSON.stringify({
      id: id,
      metadata: {
        merchant_defined: "accepted",
      },
      status: status,
    });

    //API request header
    const headers = {
      access_key,
      signature: get_post_request_Signature(http_method, path, data),
      salt,
      timeStamp,
      "Content-Type": `application/json`,
    };

    const response = await fetch(`${base_uri + path}`, {
      method: http_method,
      headers: headers,
      body: data,
    });
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);

    return false;
  }
};

//sending data of friend list
exports.getFriendListData = functions.https.onCall(async (data, context) => {
  const friendList = data?.friendList;
  console.log(friendList);
  var promises = [];
  var result = [];
  friendList.forEach((uid) => {
    const p = firestore.collection("users").doc(uid).get();

    promises.push(p);
  });
  if (promises.length) {
    const latestEventDataSnapshot = await Promise.all(promises);

    latestEventDataSnapshot.forEach((querySnapshot) => {
      const userInFo = {
        uid: querySnapshot.data()?.uid,
        username: querySnapshot.data()?.username,
        firstName: querySnapshot.data()?.firstName,
        lastName: querySnapshot.data()?.lastName,
        ewalletId: querySnapshot.data()?.ewalletId,
        profileURL: querySnapshot.data()?.ewalletId.profileURL,
      };
      result.push(userInFo);
    });
  }

  return result;
});
exports.isUsernameUsed = functions.https.onCall(async (data, context) => {
  /*if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Endpoint requires authentication!"
    );
  }*/
  var result;
  await firestore
    .collection("users")
    .where("username", "==", data.username)
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

exports.searchFriendByUsername = functions.https.onCall(
  async (data, context) => {
    const searchPhrase = data?.searchPhrase.toLowerCase();
    let result = [];
    await firestore
      .collection("users")
      .where("username", "==", searchPhrase)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data());
          result.push(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    return result;
  }
);
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
  const signature = getSignature(req.headers, JSON.stringify(req.body));
  console.log(signature);
  console.log(req.headers?.signature);
  console.log(req.body?.data);

  // "ZGMzMmUxNThlN2UwOWUwMmIxMTQzNGIzZmNkMzYyMDJkMDk5NmUwMTljN2E4ZmFlNjM0Y2E1MGQyOTg3NGNjYw==";

  if (signature == req.headers?.signature) {
    switch (req.body?.type) {
      /*case "TRANSFER_FUNDS_BETWEEN_EWALLETS_RESPONSE":
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
        break;*/

      //on Transfer fund created by user A
      case "TRANSFER_FUNDS_BETWEEN_EWALLETS_CREATED":
        //with accept_Fund() function accepting automatically transfered fund from user A for User B
        const status = "accept";

        await accept_Fund(req.body?.data?.id, status).then((response) => {
          console.log(response);
          if (response?.status?.status == "SUCCESS")
            switch (response?.response_metadata?.merchant_defined) {
              //if trasnfer is completed response is accepted
              case "accepted":
                get_user_with_EwalletId(
                  req.body.data?.destination_ewallet_id
                ).then((destinationUsers) => {
                  if (destinationUsers?.tokens) {
                    messaging.sendMulticast({
                      tokens: destinationUsers.tokens,
                      notification: {
                        title: "Fund received",
                        body:
                          destinationUsers?.username + " sent you some funds",
                      },
                      data: {
                        test: "test1",
                      },
                    });
                  }
                });
                break;
              case "declined":
                const status = "cancel";
                accept_Fund(req.body?.data?.id, status);
                break;
              case "canceled":
                break;

              default:
                break;
            }
        });

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
/*
exports.getRegisteredConatcts = functions.https.onCall(
  async (data, context) => {
    if (!data || data.phoneNumbers.length == 0) return;

    const promises = [];

    data.phoneNumbers.map((number) => {
      const q = firestore
        .collection("users")
        .where("phoneNumber", "==", number)
        .limit(1)
        .get();

      promises.push(q);
    });

    const querryData = await Promise.all(promises);

    return querryData;
  }
);*/
