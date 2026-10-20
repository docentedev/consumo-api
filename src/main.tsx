import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_AndI92mAj",
  client_id: "67m91k5qpictmcapqke2odqscl",
  redirect_uri: "https://consumo-api-nine.vercel.app/",
  response_type: "code",
  scope: "email openid phone",
  // set local storage
  storage: window.localStorage,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
);
