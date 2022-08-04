import rapyd from "./config";

const access_key = rapyd?.access_key;
//create customer
const create_Payout = async (user, payout) => {
  const http_method = "post";
  const url_path = "/v1/payouts";

  try {
    //setting data for api call
    const data = JSON.stringify({
      beneficiary: payout?.beneficiaryObject,
      beneficiary_country: payout?.beneficiaryObject?.country,
      beneficiary_entity_type: "individual",
      description: payout?.beneficiaryObject?.name,
      merchant_reference_id: user?.uid,
      ewallet: user?.ewalletId,
      payout_amount: payout?.amount,
      payout_currency: user?.currency,
      payout_method_type: payout?.payoutMethod,
      sender: payout?.senderObject,
      sender_country: payout?.senderObject?.country,
      sender_currency: user?.currency,
      sender_entity_type: "individual",
      statement_descriptor: "GHY* Limited Access 800-123-4567",
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
};

const get_List_Payout_Method_Types = async (user) => {
  const http_method = "get";
  const url_path = `/v1/payouts/supported_types?beneficiary_country=${user?.country}&payout_currency=${user?.currency}`;
  const signatureData = rapyd.getSignature(http_method, url_path);
  try {
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
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const get_Payout_Required_Fields = async (user, amount, payoutMethod) => {
  const http_method = "get";
  const url_path = `/v1/payouts/${payoutMethod}/details?sender_country=${user?.country}&sender_currency=${user?.currency}&beneficiary_country=${user?.country}&payout_currency=${user?.currency}&sender_entity_type=individual&beneficiary_entity_type=individual&payout_amount=${amount}`;
  const signatureData = rapyd.getSignature(http_method, url_path);

  try {
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
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {
  create_Payout,
  get_List_Payout_Method_Types,
  get_Payout_Required_Fields,
};
