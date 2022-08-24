const functions = require("firebase-functions");
const rapyd = require("./config");
const access_key = rapyd?.access_key;
const fetch = require("node-fetch");

//create customer
exports.create_Customer = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Endpoint requires authentication!"
    );
  }
  const http_method = "post";
  const url_path = "/v1/customer";
  const user = data.user;

  try {
    //setting data for api call
    const data = JSON.stringify({
      email: user?.email,
      ewallet: user?.ewalletId,
      metadata: {
        merchant_defined: true,
      },
      name: user?.firstName + " " + user?.lastName,
    });
    const signatureData = rapyd.getSignature(http_method, url_path, data);

    //API request header
    const headers = {
      access_key,
      signature: signatureData?.signature,
      salt: signatureData?.salt,
      timeStamp: signatureData?.timeStamp,
      "Content-Type": `application/json`,
    };

    const response = await fetch(`${rapyd.base_uri + url_path}`, {
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
});
