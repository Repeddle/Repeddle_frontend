import ArticleList from "./pages/protected/articles";
import Search from "./pages/defaults/Search";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Default from "./pages/defaults";
import Home from "./pages/defaults/Home";
import Protected from "./pages/protected";
import Cart from "./pages/defaults/Cart";
import Login from "./pages/auth/login";
import Auth from "./pages/auth";
import Register from "./pages/auth/register";
import Dashboard from "./pages/protected/overview";
import About from "./pages/defaults/info/About";
import Returns from "./pages/defaults/info/Returns";
import Sell from "./pages/defaults/Sell";
import Product from "./pages/defaults/Product";
import Seller from "./pages/defaults/Seller";
import PaymentMethod from "./pages/protected/PaymentMethod";
import OrderPreview from "./pages/protected/OrderPreview";
import Order from "./pages/protected/Order";
import PrivacyPolicy from "./pages/defaults/info/PrivacyPolicy";
import Terms from "./pages/defaults/info/Terms";
import Vipshield from "./pages/defaults/info/Vipshield";
import SupportArticles from "./pages/defaults/info";
import ContactUs from "./pages/defaults/ContactUs";
import Sustainability from "./pages/defaults/info/sustainability";
import Rebundle from "./pages/defaults/info/rebundle";
import ForgetPassword from "./pages/auth/login/forgetPassword";
import Verify from "./pages/auth/register/verify";
import Articles from "./pages/defaults/articles";
import ArticleContent from "./pages/defaults/articles/articleContent";
import ResetPassword from "./pages/auth/login/resetPassword";
import Wallet from "./pages/protected/Wallet";
import Analytics from "./pages/protected/Analytics";
import Contact from "./pages/protected/Contact";
import NewsletterList from "./pages/protected/NewsletterList";
import OtherBrand from "./pages/protected/OtherBrand";
import Message from "./pages/protected/message";
import Condition from "./pages/defaults/info/Condition";
import FeeStructure from "./pages/defaults/info/FeeStructure";
import BuyersProtection from "./pages/defaults/info/BuyersProtection";
import Brand from "./pages/defaults/brands/Brand";
import HowToLogAreturn from "./pages/defaults/info/HowToLogAreturn";
import Rebundlesimplified from "./pages/defaults/info/Rebundlesimplified";
import Buyersguide from "./pages/defaults/info/Buyersguide";
import Categories from "./pages/protected/Categories";
import OrderList from "./pages/protected/OrderList";
import AddressBook from "./pages/protected/AddressBook";
import UserList from "./pages/protected/UserList";
import ProductList from "./pages/protected/ProductList";
import TransactionList from "./pages/protected/TransactionList";
import Payments from "./pages/protected/Payments";
import AllReturnsLog from "./pages/protected/AllReturnsLog";
import AllReturns from "./pages/protected/AllReturns";
import SoldReturns from "./pages/protected/SoldReturn";
import PurchaseReturn from "./pages/protected/PurchaseReturn";
import TransactionListUser from "./pages/protected/TransactionListUser";
import ReturnPage from "./pages/protected/ReturnPage";
import User from "./pages/protected/User";
import Transaction from "./pages/protected/Transaction";
import AllMessage from "./pages/protected/admin/message";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth/",
        element: <Auth />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "verify/:token", element: <Verify /> },
          { path: "forget-password", element: <ForgetPassword /> },
          { path: "reset-password/:token", element: <ResetPassword /> },
        ],
      },
      {
        path: "/",
        element: <Default />,
        children: [
          { path: "", element: <Home /> },
          { path: "search", element: <Search /> },
          { path: "sell", element: <Sell /> },
          { path: "product/:id", element: <Product /> },
          { path: "seller/:slug", element: <Seller /> },
          { path: "cart", element: <Cart /> },
          { path: "about", element: <About /> },
          { path: "returns", element: <Returns /> },
          { path: "privacypolicy", element: <PrivacyPolicy /> },
          { path: "terms", element: <Terms /> },
          { path: "vipshield", element: <Vipshield /> },
          { path: "rebundle", element: <Rebundle /> },
          { path: "sustainability", element: <Sustainability /> },
          { path: "Support-Articles", element: <SupportArticles /> },
          { path: "buyersguide", element: <Buyersguide /> },
          { path: "condition", element: <Condition /> },
          { path: "rebundle-simplified", element: <Rebundlesimplified /> },
          { path: "howtologreturn", element: <HowToLogAreturn /> },
          { path: "articles", element: <Articles /> },
          { path: "articles/:id", element: <ArticleContent /> },
          { path: "Contact-Us", element: <ContactUs /> },
          { path: "feestructure", element: <FeeStructure /> },
          { path: "buyerprotection", element: <BuyersProtection /> },
          { path: "brands", element: <Brand /> },
          { path: "messages", element: <Message /> },
        ],
      },
      {
        path: "/",
        element: <Protected />,
        children: [
          { path: "payment", element: <PaymentMethod /> },
          { path: "placeorder", element: <OrderPreview /> },
          { path: "messages", element: <Message /> },
          { path: "order/:id", element: <Order /> },
          { path: "/return/:id", element: <ReturnPage /> },
        ],
      },
      {
        path: "dashboard",
        element: <Protected />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "wallet", element: <Wallet /> },
          { path: "categories", element: <Categories /> },
          { path: "analytics", element: <Analytics /> },
          { path: "contact", element: <Contact /> },
          { path: "newsletter", element: <NewsletterList /> },
          { path: "otherbrand", element: <OtherBrand /> },
          { path: "articlelist", element: <ArticleList /> },
          // { path: "createarticle", element: <CreateArticle onCancel={() => {}} /> },
          { path: "messages", element: <AllMessage /> },
          { path: "order", element: <OrderList /> },
          { path: "address", element: <AddressBook /> },
          { path: "userlist", element: <UserList /> },
          { path: "productlist", element: <ProductList /> },
          { path: "transactionlist", element: <TransactionList /> },
          { path: "alltransaction", element: <TransactionListUser /> },
          { path: "payments", element: <Payments /> },
          { path: "logreturns", element: <AllReturnsLog /> },
          { path: "allreturns", element: <AllReturns /> },
          { path: "sellerreturns", element: <SoldReturns /> },
          { path: "buyerreturns", element: <PurchaseReturn /> },
          { path: "return/:id", element: <ReturnPage /> },
          { path: "user/:id", element: <User /> },
          { path: "transaction/:id", element: <Transaction /> },
          // { path: "product/:id", element: <EditProduct /> },
        ],
      },
    ],
  },
]);

export default router;
