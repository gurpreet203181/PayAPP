const functions = require("firebase-functions");
const rapyd = require("./config");
const access_key = rapyd?.access_key;
const fetch = require("node-fetch");

//create ewallet
exports.topUp_Ewallet = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Endpoint requires authentication!"
    );
  }

  const http_method = "post";
  const url_path = "/v1/checkout";
  const user = data.user;
  const amount = data.amount;
  const customerId = data.customerId;
  try {
    //setting data for api call
    const data = JSON.stringify({
      amount: amount,
      complete_checkout_url: "https://payapptransaction.page.link/success",
      cancel_checkout_url: "https://payapptransaction.page.link/back",
      country: user?.country,
      currency: user?.currency,
      customer: customerId,
      error_payment_url: "https://payapptransaction.page.link/error_payment",
      merchant_reference_id: user?.uid,
      language: user.language,
      ewallet: user?.ewalletId,
      metadata: {
        merchant_defined: true,
      },
      payment_method_type_categories: ["card"],
      //  expiration: Math.floor(new Date().getTime()) + 60 * 60 * 24 * 1000, // Current Unix time +24h .
    });
    const signatureData = rapyd.getSignature(http_method, url_path, data);

    //API request header
    const headers = {
      access_key,
      signature: signatureData.signature,
      salt: signatureData.salt,
      timeStamp: signatureData.timeStamp,
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

exports.addPaymentMethod = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Endpoint requires authentication!"
    );
  }
  const http_method = "post";
  const url_path = `/v1/hosted/collect/card`;
  const user = data.user;
  const customerId = data.customerId;
  try {
    //setting data for api call
    const data = JSON.stringify({
      country: user?.country,
      customer: customerId,
      cancel_url: "https://payapptransaction.page.link/back",
      complete_url: "https://payapptransaction.page.link/cardAdded",
    });
    const signatureData = rapyd.getSignature(http_method, url_path, data);

    //API request header
    const headers = {
      access_key,
      signature: signatureData.signature,
      salt: signatureData.salt,
      timeStamp: signatureData.timeStamp,
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
