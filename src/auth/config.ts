const CLIENT_ID = "67m91k5qpictmcapqke2odqscl";
const COGNITO_DOMAIN =
  "https://us-east-2andi92maj.auth.us-east-2.amazoncognito.com";

const redirectUri = `${window.location.origin}/`;

export const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_AndI92mAj",
  client_id: CLIENT_ID,
  redirect_uri: redirectUri,
  response_type: "code",
  scope: "email openid phone",
  storage: window.localStorage,
};

export const signOutFromCognito = (): void => {
  window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${encodeURIComponent(redirectUri)}`;
};
