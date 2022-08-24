const functions = require("firebase-functions");
const rapyd = require("./config");
const access_key = rapyd?.access_key;
const fetch = require("node-fetch");

// Transfer Funds Between Wallets
exports.Transfer_Funds_Between_Wallets = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!"
      );
    }

    const transferObj = data.transferObj;
    const http_method = "post";
    const url_path = "/v1/account/transfer";

    try {
      //setting data for api call
      const data = JSON.stringify({
        source_ewallet: transferObj?.source_ewallet,
        amount: transferObj.amount,
        currency: transferObj.currency,
        destination_ewallet: transferObj?.destination_ewallet,
        metadata: {
          merchant_defined: true,
        },
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
  }
);

//get wallet balance
exports.get_Wallet_Balance = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Endpoint requires authentication!"
    );
  }
  const ewalletId = data?.ewalletId;

  const http_method = "get";
  const url_path = "/v1/user/" + ewalletId + "/accounts";

  const signatureData = rapyd.getSignature(http_method, url_path);

  try {
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
      //body: data,
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
    return false;
  }
});

//get wallet transactions
exports.get_Wallet_Transactions = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!"
      );
    }
    const http_method = "get";

    const pageNumber = data.page_number ? data.page_number : 1;
    const pageSize = data.page_size ? data.page_size : 3;
    const url_path =
      "/v1/user/" +
      data.ewalletId +
      `/transactions?page_number=${pageNumber}&page_size=${pageSize}`;

    const signatureData = rapyd.getSignature(http_method, url_path);

    try {
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
        //body: data,
      });
      const json = await response.json();
      if (json?.data?.length != 0 || json?.data != undefined) {
        return json.data;
      } else {
        return "no_data";
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
