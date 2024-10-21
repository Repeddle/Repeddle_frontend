import {
  FaChartBar,
  FaChartLine,
  FaComment,
  FaEnvelope,
  FaGift,
  FaHeart,
  FaHome,
  FaMailBulk,
  FaMoneyBill,
  FaQuestion,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import RedirectButton from "../../components/RedirectButton"
import {
  FaArrowRotateLeft,
  FaBasketShopping,
  FaChartColumn,
  FaListCheck,
  FaMessage,
  FaMoneyBillTransfer,
  FaRightFromBracket,
} from "react-icons/fa6"
import useTheme from "../../hooks/useTheme"
import useAuth from "../../hooks/useAuth"
import { GrDashboard } from "react-icons/gr"

const MobileProfile = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  const navigate = useNavigate()

  const { user, logout } = useAuth()

  const productNotification = []
  const soldNotification = []
  const purchaseNotification = []
  const sellerReturnNotification = []
  const buyerReturnNotification = []
  const contactNotification = []

  const signoutHandler = () => {
    logout()
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")

    navigate("/auth/login")
  }

  return (
    <div className="lg:hidden fixed bg-white dark:bg-black overflow-auto block z-[8] pt-[100px] pb-[55px] px-[15px] inset-0">
      <img
        className="w-screen h-[100px] object-cover absolute left-0 top-0"
        src="/images/categories/p8.png"
        alt="ads"
      />
      <div className="flex items-center gap-1.5 px-0 py-2.5 justify-end">
        <input
          id="darkmodeSwitch"
          role="switch"
          type="checkbox"
          className={`relative checked:bg-white appearance-none bg-black w-10 h-[15px] duration-500
         rounded-[20px] checked:before:left-[25px] before:w-[14px] before:h-[14px] before:content-[''] before:absolute 
         before:-translate-y-2/4 before:duration-500 before:rounded-[50%] before:left-0 before:top-1/2 
         before:bg-white checked:before:bg-black`}
          checked={isDarkMode}
          onChange={() => toggleTheme()}
        />
        <label htmlFor="darkmodeSwitch" className="ml-[5px]">
          {isDarkMode ? "DarkMode" : "LightMode"}
        </label>
      </div>
      <div className="text-xl font-bold text-orange-color">
        Hi {user?.username}
      </div>
      <div className="p-2.5 uppercase bg-light-ev2 dark:bg-dark-ev2">
        Dashboard
      </div>{" "}
      <Link to={user ? `/seller/${user?.username}` : "/"}>
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaUser className="mr-2.5" />
          My Profile
        </div>
      </Link>
      <Link to="/dashboard">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <GrDashboard className="mr-2.5" />
          Dashboard
        </div>
      </Link>
      <Link to="/dashboard/productlist">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaBasketShopping className="mr-2.5" />
          My Products
          {productNotification.length > 0 && (
            <span className="w-3 h-3 flex items-center justify-center text-white text-[10px] cursor-default rounded-[50%]">
              <span>{productNotification.length}</span>
            </span>
          )}
        </div>
      </Link>
      <Link to="/dashboard/orderlist">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaChartBar className="mr-2.5" />
          Purchased Orders
          {purchaseNotification.length > 0 && (
            <span className="w-3 h-3 flex items-center justify-center text-white text-[10px] cursor-default rounded-[50%]">
              <span>{purchaseNotification.length}</span>
            </span>
          )}
        </div>
      </Link>
      <Link to="/dashboard/saleslist">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaChartBar className="mr-2.5" />
          Sold Orders
          {soldNotification.length > 0 && (
            <span className="w-3 h-3 flex items-center justify-center text-white text-[10px] cursor-default rounded-[50%]">
              <span>{soldNotification.length}</span>
            </span>
          )}
        </div>
      </Link>
      <Link to="/earning">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaMoneyBillTransfer className="mr-2.5" />
          My Earnings
        </div>
      </Link>
      <Link to="/dashboard/wishlist">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaHeart className="mr-2.5" />
          My Wishlist{"  "}
          <span className="text-orange-color ml-1">
            ({user?.wishlist?.length})
          </span>
        </div>
      </Link>
      <Link to="/dashboard/sellerreturns">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaArrowRotateLeft className="mr-2.5" />
          Sold Returns
          {sellerReturnNotification.length > 0 && (
            <span className="w-3 h-3 flex items-center justify-center text-white text-[10px] cursor-default rounded-[50%]">
              <span>{sellerReturnNotification.length}</span>
            </span>
          )}
        </div>
      </Link>
      <Link to="/dashboard/buyerreturns">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaArrowRotateLeft className="mr-2.5" />
          Purchase Returns
          {buyerReturnNotification.length > 0 && (
            <span className="w-3 h-3 flex items-center justify-center text-white text-[10px] cursor-default rounded-[50%]">
              <span>{buyerReturnNotification.length}</span>
            </span>
          )}
        </div>
      </Link>
      <Link to="/dashboard/wallet">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaMoneyBillTransfer className="mr-2.5" />
          My Wallet
        </div>
      </Link>
      <Link to="/dashboard/alltransaction">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaMoneyBill className="mr-2.5" />
          All Transactions
        </div>
      </Link>
      <div className="p-2.5 uppercase bg-light-ev2 dark:bg-dark-ev2">
        Quick Menu
      </div>
      <Link to="/dashboard/address">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaHome className="mr-2.5" />
          Address Book
        </div>
      </Link>
      {user?.role === "Admin" && (
        <Link to="/dashboard/admin/coupon">
          <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
            <FaGift className="mr-2.5" />
            Coupon/Gift
          </div>
        </Link>
      )}
      {user?.role === "Admin" && (
        <>
          <div className="p-2.5 uppercase bg-light-ev2 dark:bg-dark-ev2">
            Admin
          </div>
          <Link to="/admin/analytics">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaChartLine className="mr-2.5" />
              Analytics
            </div>
          </Link>
          <Link to="/admin/userlist">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaUser className="mr-2.5" />
              Users
            </div>
          </Link>{" "}
          <Link to="/messages">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaChartColumn className="mr-2.5" />
              Reports
            </div>
          </Link>
          <Link to="/admin/categories">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaListCheck className="mr-2.5" />
              Categories
            </div>
          </Link>
          <Link to="/admin/articles">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaQuestion className="mr-2.5" />
              Articles
            </div>
          </Link>
          <Link to="/messages">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaEnvelope className="mr-2.5" />
              All Messages
            </div>
          </Link>
          <Link to="/admin/allreturns">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaArrowRotateLeft className="mr-2.5" />
              Return Querries
            </div>
          </Link>
          <Link to="/admin/logreturns">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaArrowRotateLeft className="mr-2.5" />
              All Logged Returns
            </div>
          </Link>
          <Link to="/admin/payments">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaMoneyBill className="mr-2.5" />
              Payments
            </div>
          </Link>
          <Link to="/admin/transactionlist">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaMoneyBill className="mr-2.5" />
              All Transactions
            </div>
          </Link>
          <Link to="/admin/newsletter">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaMailBulk className="mr-2.5" />
              Collected Email
            </div>
          </Link>
          <Link to="/admin/otherbrand">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaQuestionCircle className="mr-2.5" />
              Brand List
            </div>
          </Link>
          <Link to="/admin/contact">
            <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
              <FaEnvelope className="mr-2.5" />
              Contact Us
              {contactNotification.length > 0 && (
                <span className="w-3 h-3 flex items-center justify-center text-white text-[10px] cursor-default rounded-[50%]">
                  <span>{contactNotification.length}</span>
                </span>
              )}
            </div>
          </Link>
        </>
      )}
      <div className="p-2.5 uppercase bg-light-ev2 dark:bg-dark-ev2">
        Chat & Info
      </div>
      <Link to="/messages">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaMessage className="mr-2.5" />
          Messages
        </div>
      </Link>
      <Link to="/articles">
        <div className="relative p-2.5 rounded-[0.2rem] border-b-[rgba(99,91,91,0.2)] border-b flex items-center hover:bg-orange-color">
          <FaComment className="mr-2.5" />
          Support Center
        </div>
      </Link>
      <RedirectButton />
      <div
        className="m-5 text-center flex items-center justify-center"
        onClick={() => signoutHandler()}
      >
        <FaRightFromBracket className="mr-2.5" />
        Logout
      </div>
    </div>
  )
}

export default MobileProfile
