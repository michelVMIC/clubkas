const raboSmartPayEndpoint = "https://betalen.rabobank.nl/omnikassa-api-sandbox";

interface RefreshCallOutput {
  token: string;
  validUntil: string;
  durationInMillis: number;
}

interface AnnounceOrderInput {
  timestamp: string;
  paymentBrand: string;
  paymentBrandForce: string;
  paymentBrandMetaData: {
    issuerId: string;
  };
  merchantReturnUrl: string;
  merchantOrderId: number;
  amount: {
    amount: number;
    currency: string;
  };
}

interface AnnounceOrderOutput {
  redirectUrl: string;
  omnikassaOrderId: string;
}

interface IssuerListOutput {
  issuers: Array<{
    name: string;
    id: string;
    logos: Array<{ url: string; mimeType: string }>;
  }>;
}

/** Gets an access token from the Rabobank API. Using this token we can announce an order.
 *
 * @returns
 */
export const postRefreshCall = async (refreshToken: string): Promise<RefreshCallOutput> => {
  const getRefreshResponse = await fetch(`${raboSmartPayEndpoint}/gatekeeper/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      accept: "application/json",
    },
  });

  const refreshOutput: RefreshCallOutput = await getRefreshResponse.json();
  return refreshOutput;
};

/** Announce an iDEAL order at the Rabobank API. This registers a new payment attempt at their side.
 *
 * @param orderId an order id created by MIC to identify the order
 * @param accessToken a token used to authenticate
 * @param bankIdentifier an iDEAL bank identifier.
 * @param returnUrl
 * @returns
 */
export const announceOrder = async (
  orderId: number,
  accessToken: string,
  amount: number,
  bankIdentifier: string,
  returnUrl: string
): Promise<AnnounceOrderOutput> => {
  const currentDate = new Date().toISOString();

  const payload: AnnounceOrderInput = {
    timestamp: currentDate,
    paymentBrand: "IDEAL",
    merchantOrderId: orderId,
    merchantReturnUrl: returnUrl,
    paymentBrandForce: "FORCE_ALWAYS",
    paymentBrandMetaData: {
      issuerId: bankIdentifier,
    },
    amount: {
      amount: amount,
      currency: "EUR",
    },
  };

  const announceOrderResponse = await fetch(`${raboSmartPayEndpoint}/order/server/api/v2/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      accept: `application/json`,
    },
    body: JSON.stringify(payload),
  });

  const result: AnnounceOrderOutput = await announceOrderResponse.json();
  return result;
};

/** Get a list of banks used in a iDEAL payment
 *
 * @param refreshToken token used for authenticating
 * @returns  a list of banks with their iDEAL identifiers
 */
export const getIssuerList = async (refreshToken: string) => {
  const issuerListResponse = await fetch(`${raboSmartPayEndpoint}/ideal/server/api/v2/issuers`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      accept: "application/json",
    },
  });

  const result: IssuerListOutput = await issuerListResponse.json();
  return result;
};
