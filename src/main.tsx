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
import { CategoryProvider } from "./context/CategoryContext.tsx"
import { ProductProvider } from "./context/ProductContext.tsx"
import { HelmetProvider } from 'react-helmet-async';
import ArticleProvider from './context/ArticleContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ToastNotificationProvider>
        <ThemeProvider>
          <AuthProvider>
            <CategoryProvider>
              <ProductProvider>
                <CartProvider>
                  <ArticleProvider>
                  <RouterProvider router={router} />
                    </ArticleProvider>
                </CartProvider>
              </ProductProvider>
            </CategoryProvider>
          </AuthProvider>
        </ThemeProvider>
      </ToastNotificationProvider>
    </HelmetProvider>
  </React.StrictMode>
);
