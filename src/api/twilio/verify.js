import Constants from "expo-constants";
const BASE_URL = Constants.manifest?.extra?.twilioBaseUrl;

const sendSmsVerification = async (phoneNumber) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      channel: "sms",
    });

    const response = await fetch(`${BASE_URL}/start-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const checkVerification = async (phoneNumber, code) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      code: code,
    });

    const response = await fetch(`${BASE_URL}/check-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { sendSmsVerification, checkVerification };
