var CryptoJS = require("crypto-js");
const access_key = process.env?.RAPYD_ACCESS_KEY; //  Never transmit the secret key by itself.
const secret_key = process.env?.RAPYD_SECRET_KEY; //Hardkeyed for this example.
const base_uri = process.env?.RAPYD_BASE_URI;
//const url_path = "/v1/user"; // Portion after the base URL.
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
const getSignature = (http_method, url_path, data) => {
  //calling method setTimeStamp and setSalt here to get updated value
  setTimeStamp(); //setting time stamp
  setSalt(); //setting salt

  const to_sign =
    (http_method ? http_method : "") +
    (url_path ? url_path : "") +
    salt +
    timeStamp +
    access_key +
    secret_key +
    (data ? data : "");

  let signature = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(to_sign, secret_key)
  );

  signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));
  const signatureData = {
    salt,
    timeStamp,
    signature,
  };
  return signatureData;
};

module.exports = { getSignature, base_uri, access_key };
