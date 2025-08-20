import Search from "./pages/defaults/Search"
import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorPage from "./pages/ErrorPage"
import Default from "./pages/defaults"
import Home from "./pages/defaults/Home"
import Protected from "./pages/protected"
import Cart from "./pages/defaults/Cart"
import Login from "./pages/auth/login"
import Auth from "./pages/auth"
import Register from "./pages/auth/register"
import About from "./pages/defaults/info/About"
import Returns from "./pages/defaults/info/Returns"
import Sell from "./pages/defaults/Sell"
import Product from "./pages/defaults/Product"
import Seller from "./pages/defaults/Seller"
import PaymentMethod from "./pages/protected/PaymentMethod"
import Order from "./pages/protected/Order"
import PrivacyPolicy from "./pages/defaults/info/PrivacyPolicy"
import Terms from "./pages/defaults/info/Terms"
import Vipshield from "./pages/defaults/info/Vipshield"
import SupportArticles from "./pages/defaults/info"
import ContactUs from "./pages/defaults/ContactUs"
import Sustainability from "./pages/defaults/info/sustainability"
import Rebundle from "./pages/defaults/info/rebundle"
import ForgetPassword from "./pages/auth/login/forgetPassword"
import Verify from "./pages/auth/register/verify"
import Articles from "./pages/defaults/articles"
import ArticleContent from "./pages/defaults/articles/articleContent"
import ResetPassword from "./pages/auth/login/resetPassword"
import Wallet from "./pages/protected/dashboard/Wallet"
import Analytics from "./pages/admin/Analytics"
import Contact from "./pages/admin/Contact"
import NewsletterList from "./pages/admin/NewsletterList"
import OtherBrand from "./pages/admin/OtherBrand"
import Message from "./pages/protected/message"
import Condition from "./pages/defaults/info/Condition"
import FeeStructure from "./pages/defaults/info/FeeStructure"
import BuyersProtection from "./pages/defaults/info/BuyersProtection"
import Brand from "./pages/defaults/brands/Brand"
import HowToLogAreturn from "./pages/defaults/info/HowToLogAreturn"
import Rebundlesimplified from "./pages/defaults/info/Rebundlesimplified"
import Buyersguide from "./pages/defaults/info/Buyersguide"
import Categories from "./pages/admin/Categories"
import OrderList from "./pages/protected/dashboard/OrderList"
import AddressBook from "./pages/protected/dashboard/AddressBook"
import UserList from "./pages/admin/UserList"
import ProductList from "./pages/protected/dashboard/ProductList"
import TransactionList from "./pages/admin/TransactionList"
import Payments from "./pages/admin/Payments"
import AllReturnsLog from "./pages/admin/AllReturnsLog"
import AllReturns from "./pages/admin/AllReturns"
import SoldReturns from "./pages/protected/dashboard/SoldReturn"
import PurchaseReturn from "./pages/protected/dashboard/PurchaseReturn"
import TransactionListUser from "./pages/protected/dashboard/TransactionListUser"
import ReturnPage from "./pages/protected/dashboard/ReturnPage"
import User from "./pages/protected/dashboard/User"
import Transaction from "./pages/protected/dashboard/Transaction"
import MobileProfile from "./pages/defaults/MobileProfile"
import MobileNotification from "./pages/protected/MobileNotification"
import CategoryMobile from "./pages/defaults/CategoryMobile"
import EditProduct from "./pages/protected/EditProduct"
import SalesList from "./pages/protected/dashboard/SalesList"
import NewProduct from "./pages/protected/NewProduct"
import VerifyAccount from "./pages/protected/VerifyAccount"
import VerifyAddress from "./pages/protected/VerifyAddress"
import HowRepeddleWork from "./pages/defaults/info/HowRepeddleWork"
import Dashboard from "./pages/protected/dashboard"
import Overview from "./pages/protected/dashboard/overview"
import AdminLayout from "./pages/admin"
import Earning from "./pages/protected/earning"
import Wishlist from "./pages/protected/dashboard/Wishlist"
import PlaceOrder from "./pages/protected/PlaceOrder"
import ShopByOutfit from "./pages/defaults/ShopByOutfit"
import Coupon from "./pages/admin/Coupon"
import BrandMore from "./pages/defaults/brands/More"
import AllProductList from "./pages/admin/AllProductList"
import AllOrders from "./pages/admin/AllOrders"
import ArticleList from "./pages/protected/articles"
import CreateArticle from "./pages/protected/articles/CreateArticles"
import TopSellersPage from "./pages/admin/TopSellers"
import PaymentScreen from "./pages/admin/PaymentScreen"
import UserReviews from "./pages/protected/dashboard/UserReviews"

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
          { path: "product/:slug", element: <Product /> },
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
          { path: "contact-Us", element: <ContactUs /> },
          { path: "feestructure", element: <FeeStructure /> },
          { path: "buyerprotection", element: <BuyersProtection /> },
          { path: "how-repeddle-work", element: <HowRepeddleWork /> },
          {
            path: "brands",
            element: <Brand />,
          },
          {
            path: "/brands/:id",
            element: <BrandMore />,
          },
          { path: "categories", element: <CategoryMobile /> },
          { path: "recurated", element: <ShopByOutfit /> },
        ],
      },
      {
        path: "/",
        element: <Protected />,
        children: [
          { path: "payment", element: <PaymentMethod /> },
          { path: "placeorder", element: <PlaceOrder /> },
          { path: "messages", element: <Message /> },
          { path: "order/:id", element: <Order /> },
          { path: "/return/:id", element: <ReturnPage /> },
          { path: "/notifications", element: <MobileNotification /> },
          { path: "profilmenu", element: <MobileProfile /> },
          { path: "newproduct", element: <NewProduct /> },
          { path: "verifyaccount", element: <VerifyAccount /> },
          { path: "verifyaddress", element: <VerifyAddress /> },
          { path: "earning", element: <Earning /> },
          { path: "transaction/:id", element: <Transaction /> },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "", element: <Overview /> },
          { path: "wallet", element: <Wallet /> },
          { path: "orderlist", element: <OrderList /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "salesList", element: <SalesList /> },
          { path: "address", element: <AddressBook /> },
          { path: "productlist", element: <ProductList /> },
          { path: "alltransaction", element: <TransactionListUser /> },
          { path: "sellerreturns", element: <SoldReturns /> },
          { path: "buyerreturns", element: <PurchaseReturn /> },
          { path: "return/:id", element: <ReturnPage /> },
          { path: "user/:id", element: <User /> },
          { path: "product/:id", element: <EditProduct /> },
          { path: "userreviews", element: <UserReviews /> },
        ],
      },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { path: "analytics", element: <Analytics /> },
          { path: "categories", element: <Categories /> },
          { path: "userlist", element: <UserList /> },
          { path: "allreturns", element: <AllReturns /> },
          { path: "allproducts", element: <AllProductList /> },
          { path: "allorders", element: <AllOrders /> },
          { path: "payments", element: <Payments /> },
          { path: "payments/:id", element: <PaymentScreen /> },
          { path: "transactionlist", element: <TransactionList /> },
          { path: "newsletter", element: <NewsletterList /> },
          { path: "otherbrand", element: <OtherBrand /> },
          { path: "logreturns", element: <AllReturnsLog /> },
          { path: "contact", element: <Contact /> },
          { path: "coupon", element: <Coupon /> },
          { path: "articlelist", element: <ArticleList /> },
          { path: "create-article", element: <CreateArticle /> },
          { path: "topsellers", element: <TopSellersPage /> },
        ],
      },
    ],
  },
])

export default router
