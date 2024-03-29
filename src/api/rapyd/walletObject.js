import Constants from "expo-constants";
var CryptoJS = require("crypto-js");
const access_key = Constants.manifest?.extra?.rapyd_access_key; //  Never transmit the secret key by itself.
const secret_key = Constants.manifest?.extra?.rapyd_secret_key; //Hardkeyed for this example.
const base_uri = Constants.manifest?.extra?.rapyd_base_uri;
const url_path = "/v1/user"; // Portion after the base URL.
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

//getting crypto signature
const getSignature = (data, http_method) => {
  //calling method setTimeStamp and setSalt here to get updated value
  setTimeStamp(); //setting time stamp
  setSalt(); //setting salt

  const to_sign =
    http_method + url_path + salt + timeStamp + access_key + secret_key + data;

  let signature = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(to_sign, secret_key)
  );

  signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));

  return signature;
};

//create ewallet
const create_Personal_Wallet = async (user, signUpUserData) => {
  const http_method = "post";
  const userData = user?.additionalUserInfo;

  const firstname = signUpUserData
    ? signUpUserData?.firstName
    : userData?.profile?.given_name;

  const lastname = signUpUserData
    ? signUpUserData.lastName
    : userData?.profile?.family_name;
  console.log(user);
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

    //API request header
    const headers = {
      access_key,
      signature: getSignature(data, http_method),
      salt,
      timeStamp,
      "Content-Type": `application/json`,
    };

    const response = await fetch(`${base_uri + url_path}`, {
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
};

//updating ewallet
const update_Personal_Wallet = async (user) => {
  const http_method = "put";
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
    const headers = {
      access_key,
      signature: getSignature(data, http_method),
      salt,
      timeStamp,
      "Content-Type": `application/json`,
    };

    const response = await fetch(`${base_uri + url_path}`, {
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
};

//updating ewallet phonenumber after otp  verification
const update_Personal_Wallet_phonenumber = async (phoneNumber, user) => {
  const http_method = "put";
  try {
    console.log(phoneNumber);
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

    //API request header
    const headers = {
      access_key,
      signature: getSignature(data, http_method),
      salt,
      timeStamp,
      "Content-Type": `application/json`,
    };

    const response = await fetch(`${base_uri + url_path}`, {
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
};

export {
  create_Personal_Wallet,
  update_Personal_Wallet,
  update_Personal_Wallet_phonenumber,
};
