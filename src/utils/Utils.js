import { t } from "@hooks/UseI18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cloudFunction } from "src/config/firebase";
import JailMonkey from "jail-monkey";
import { View, Text } from "react-native";
//number format to currency
function ammountFormat(amount, currency) {
  return Number(amount)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

//checking if username is already used
async function isUsernameUsed(username) {
  let result;
  await cloudFunction
    .httpsCallable("isUsernameUsed")({
      username: username.toLowerCase(),
    })
    .then((response) => {
      if (response.data) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}
//set item data
function cleanItem(data) {
  const date = new Date(data?.created_at * 1000);
  var itemObj = {
    amount: data?.amount,
    type: null,
    description: null,
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}   ${date.getHours()}:${date.getMinutes()}`,
  };
  switch (data.type) {
    case "p2p_transfer":
      if (!data?.source_ewallet_id) {
        itemObj.type = "Fund received";
        itemObj.description = "";
      } else if (data?.source_ewallet_id) {
        itemObj.type = "Fund transferred";
        itemObj.description = "";
      }

      break;
    case "payment_funds_in":
      itemObj.type = "Fund Add";
      itemObj.description = "";

      break;

    default:
      break;
  }
  return itemObj;
}
//set notifications in async storage
const setNotificationsAsyncStorage = async (value) => {
  let data = await AsyncStorage.getItem("@notifications");

  let arr = data ? JSON.parse(data) : [];
  const notificationObj = {
    id: value?.messageId,
    title: value?.notification?.title,
    description: value?.notification?.body + " 😘",
    //date: value.sentTime.format("dd/mm/yyyy"),
  };

  arr.push(notificationObj);

  const jsonValue = JSON.stringify(arr);
  console.log(jsonValue);
  await AsyncStorage.setItem("@notifications", jsonValue);
};

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

  if (credentials.firstName.trim().length == "") {
    errorMsg = t("firstnameError");
  }
  if (credentials.lastName.trim() == "") errorMsg = t("lastNameError");

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
function suspiciousActivityTracked() {
  if (JailMonkey?.isJailBroken()) return true;
  if (JailMonkey?.canMockLocation()) return true;
  if (__DEV__) {
    if (JailMonkey?.isDebuggedMode()) return false;
  } else {
    if (JailMonkey?.isDebuggedMode()) return true;
  }
  if (JailMonkey?.AdbEnabled()) return true;
  if (JailMonkey?.isOnExternalStorage()) return true; //android
  if (JailMonkey?.hookDetected()) return true; //android

  return false;
}

function UIName(name) {
  let uiName;
  switch (name) {
    case "first_name":
      uiName = t("firstName");
      break;
    case "last_name":
      uiName = t("lastName");
      break;
    case "iban":
      uiName = "Iban";
      break;
    case "banK_account":
      uiName = t("bankAccount");
      break;
    case "city":
      uiName = t("city");
      break;
    case "address":
      uiName = t("address");
      break;
    case "date_of_birth":
      uiName = t("dateOfBirth");
      break;
    default:
      uiName = name;
      break;
  }
  return uiName;
}
const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validateInput,
  calculateAngle,
  validateCredentials,
  editAccountValidateCredentials,
  setNotificationsAsyncStorage,
  cleanItem,
  ammountFormat,
  isUsernameUsed,
  suspiciousActivityTracked,
  UIName,
};

export default utils;
