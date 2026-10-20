import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeProvider";
import { cognitoAuthConfig } from "./auth/config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
