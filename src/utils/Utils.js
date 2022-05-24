import { t } from "@hooks/UseI18n";

function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value == "") {
    setEmailError("email is requierd");
  } else if (isValidEmail(value)) {
    setEmailError("");
  } else {
    setEmailError("Invalid Email");
  }
}

function validatePassword(value, setPasswordError) {
  if (value.length < 6) {
    setPasswordError(t("passwordError"));
  } else {
    setPasswordError("");
  }
}
function validateInput(value, minLength, setError) {
  if (value.length < minLength) {
    setError("Invalid Input");
  } else {
    setError("");
  }
}

function calculateAngle(coordinates) {
  let startLat = coordinates[0]["latitude"];
  let startLng = coordinates[0]["longitude"];
  let endLat = coordinates[1]["latitude"];
  let endLng = coordinates[1]["longitude"];
  let dx = endLat - startLat;
  let dy = endLng - startLng;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
}
function validateCredentials(credentials, setError, policyChecked) {
  var errorMsg = "";

  if (credentials.password.length < 6) errorMsg = t("passwordError");

  if (credentials.username.length < 3) errorMsg = t("usernameError");

  if (!isValidEmail(credentials.email)) errorMsg = t("emailError");

  if (!policyChecked) errorMsg = t("checkPolicyError");

  if (errorMsg == "") {
    return true;
  } else {
    setError(errorMsg);
    return false;
  }
}

function editAccountValidateCredentials(credentials, setError) {
  var errorMsg = "";

  if (!isValidEmail(credentials.email)) errorMsg = t("emailError");

  if (
    credentials.phoneNumber?.length < 4 ||
    credentials.phoneNumber == undefined ||
    isNaN(credentials.phoneNumber)
  ) {
    errorMsg = t("phoneNumberInvaildErorr");
  }

  if (credentials.username.length < 3) errorMsg = t("usernameError");

  if (credentials.lastName?.length == "" || credentials.lastName == undefined)
    errorMsg = t("lastNameError");

  if (credentials.firstName?.length == "" || credentials.firstName == undefined)
    errorMsg = t("firstNameError");

  if (errorMsg == "") {
    setError();
    return true;
  } else {
    setError(errorMsg);
    return false;
  }
}
const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validateInput,
  calculateAngle,
  validateCredentials,
  editAccountValidateCredentials,
};

export default utils;
