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
import ArticleProvider from "./context/ArticleContext.tsx"
import { BrandProvider } from "./context/BrandContext.tsx"
import { NewsletterProvider } from "./context/NewsletterContext.tsx"
import { TransactionProvider } from "./context/TransactionContext.tsx"
import { ContactProvider } from "./context/ContactContext.tsx"
import { OrderProvider } from "./context/OrderContext.tsx"
import MessageProvider from "./context/MessageContext.tsx"
import { UserProvider } from "./context/UserContext.tsx"
import { WalletProvider } from "./context/WalletContext.tsx"
import { NotificationProvider } from "./context/NotificationContext.tsx"
import { ReturnProvider } from "./context/ReturnContext.tsx"
import { PaymentProvider } from "./context/PaymentContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ToastNotificationProvider>
        <ThemeProvider>
          <AuthProvider>
            <CategoryProvider>
              <ProductProvider>
                <BrandProvider>
                  <CategoryProvider>
                    <NewsletterProvider>
                      <TransactionProvider>
                        <ContactProvider>
                          <OrderProvider>
                            <CartProvider>
                              <ArticleProvider>
                                <UserProvider>
                                  <WalletProvider>
                                    <MessageProvider>
                                      <PaymentProvider>
                                        <NotificationProvider>
                                          <ReturnProvider>
                                            <RouterProvider router={router} />
                                          </ReturnProvider>
                                        </NotificationProvider>
                                      </PaymentProvider>
                                    </MessageProvider>
                                  </WalletProvider>
                                </UserProvider>
                              </ArticleProvider>
                            </CartProvider>
                          </OrderProvider>
                        </ContactProvider>
                      </TransactionProvider>
                    </NewsletterProvider>
                  </CategoryProvider>
                </BrandProvider>
              </ProductProvider>
            </CategoryProvider>
          </AuthProvider>
        </ThemeProvider>
      </ToastNotificationProvider>
    </HelmetProvider>
  </React.StrictMode>
)
