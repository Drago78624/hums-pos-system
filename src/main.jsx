import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { Toaster } from "sonner";
import ThemeProvider from "./providers/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
