import rapyd from "./config";
const access_key = rapyd?.access_key;
const timeStamp = rapyd?.timeStamp;
const salt = rapyd?.salt;
//create customer
const create_Customer = async (user) => {
  const http_method = "post";
  const url_path = "/v1/customer";
  const signatureData = rapyd.getSignature(http_method, url_path);

  try {
    //setting data for api call
    const data = JSON.stringify({
      email: user?.email,
      ewallet: user?.ewalletId,
      metadata: {
        merchant_defined: true,
      },
      name: user?.firstName + " " + lastName,
    });

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
};

export { create_Customer };
