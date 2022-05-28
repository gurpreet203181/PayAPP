import Constants from "expo-constants";

const service_id = Constants.manifest?.extra?.emailjsServiceId;
const template_Id = Constants.manifest?.extra?.emailjsTemplateId;
const public_key = Constants.manifest?.extra?.emailjsPublicKey;

const sendContactEmail = async () => {
  try {
    var data = JSON.stringify({
      service_id: service_id,
      template_id: template_Id,
      user_id: public_key,
      template_params: {
        username: "James",
        "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...",
      },
    });

    const response = await fetch(
      `https://api.emailjs.com/api/v1.0/email/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );

    const json = await response.text();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { sendContactEmail };
