import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { ThemeProvider } from "./context/ThemeContext.tsx"
import { AuthProvider } from "./context/AuthContext.tsx"
import { CartProvider } from "./context/CartContext.tsx"
import router from "./routing.tsx"
import { RouterProvider } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { ToastNotificationProvider } from "./context/ToastNotificationContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ToastNotificationProvider>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </ToastNotificationProvider>
    </HelmetProvider>
  </React.StrictMode>
)
