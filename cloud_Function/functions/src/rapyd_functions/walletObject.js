const functions = require("firebase-functions");
const rapyd = require("./config");
const access_key = rapyd?.access_key;
const fetch = require("node-fetch");

//create ewallet
exports.create_Personal_Wallet = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!"
      );
    }

    const http_method = "post";
    const url_path = "/v1/user"; // Portion after the base URL.

    const userData = data.user?.additionalUserInfo;
    const user = data?.user;

    const firstname = data.signUpUserData
      ? data.signUpUserData?.firstName
      : userData?.profile?.given_name;

    const lastname = data.signUpUserData
      ? data.signUpUserData.lastName
      : userData?.profile?.family_name;
    try {
      //setting data for api call
      const data = JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        ewallet_reference_id: user?.user?.uid,
        metadata: {
          merchant_defined: true,
        },
        type: "person",
        contact: {
          phone_number: "",
          email: userData?.profile?.email,
          first_name: firstname,
          last_name: lastname,
          mothers_name: "",
          contact_type: "personal",
          identification_type: "",
          identification_number: "",
          date_of_birth: "",
          country: "",
          nationality: "",
          metadata: {
            merchant_defined: true,
          },
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
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

//updating ewallet
exports.update_Personal_Wallet = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!"
      );
    }
    const http_method = "put";
    const url_path = "/v1/user";
    const user = data.value;
    try {
      //  console.log(user);
      //setting data for api call
      const data = JSON.stringify({
        ewallet: user?.ewalletId,
        first_name: user?.firstName,
        last_name: user?.lastName,
        //phone_number: "+393278195621",
        metadata: {
          merchant_defined: "updated",
        },
        contact: {
          // phone_number: "",
          first_name: user?.firstName,
          last_name: user?.lastName,
          mothers_name: "",
          contact_type: "personal",
          identification_type: "",
          identification_number: "",
          date_of_birth: "",
          country: "",
          nationality: "",
          metadata: {
            merchant_defined: true,
          },
        },
      });

      //API request header
      const signatureData = rapyd.getSignature(http_method, url_path, data);

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
      console.log(json);

      return json;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
);

//updating ewallet phonenumber after otp  verification

exports.update_Personal_Wallet_phonenumber = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!"
      );
    }
    const http_method = "put";
    const url_path = "/v1/user";
    const user = data.user;
    const phoneNumber = data.phoneNumber;
    try {
      //setting data for api call
      const data = JSON.stringify({
        ewallet: user?.ewalletId,
        phone_number: phoneNumber,
        metadata: {
          merchant_defined: "updated",
        },
        contact: {
          phone_number: phoneNumber,
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
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
