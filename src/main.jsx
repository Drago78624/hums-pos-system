import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { OrderProvider } from "./providers/OrderProvider.jsx";
import { Toaster } from "sonner";
import ThemeProvider from "./providers/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <OrderProvider>
        <ThemeProvider>
          <App />
          <Toaster />
        </ThemeProvider>
      </OrderProvider>
    </AuthProvider>
  </StrictMode>
);
