// Sidebar.tsx
import React from "react"
import {
  AiOutlineHome,
  AiOutlineArrowRight,
  AiOutlineShopping,
  AiOutlineWallet,
  AiOutlineQuestionCircle,
} from "react-icons/ai"
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTheme from "../../hooks/useTheme"
import {
  FaChartBar,
  FaChartLine,
  FaComment,
  FaEnvelope,
  FaHome,
  FaMoneyBill,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa"
import {
  FaArrowRotateLeft,
  FaArrowRotateRight,
  FaBasketShopping,
  FaListCheck,
} from "react-icons/fa6"

const sidebarLinks = [
  {
    path: "/dashboard",
    text: "Overview",
    icon: <AiOutlineHome />,
    end: true,
  },
  {
    path: "/dashboard/productlist",
    text: "My Products",
    icon: <FaBasketShopping />,
  },
  {
    path: "/dashboard/order",
    text: "My Orders",
    icon: <AiOutlineShopping />,
  },
<<<<<<< Victor
  { path: "/dashboard/wallet", 
    text: "Wallet", 
    icon: <AiOutlineWallet /> 
  },
  { path: "/dashboard/articlelist", 
    text: "Articles", 
    icon: <AiOutlineQuestionCircle /> 
 },
=======
>>>>>>> main
  {
    path: "/dashboard/alltransaction",
    text: "All Transactions",
    icon: <FaMoneyBill />,
  },
  { path: "/dashboard/wallet", text: "Wallet", icon: <AiOutlineWallet /> },

  {
    path: "/dashboard/analytics",
    text: "Analytics",
    icon: <FaChartLine />,
  },
  {
    path: "/dashboard/categories",
    text: "Categories",
    icon: <FaListCheck />,
  },
  {
    path: "/dashboard/contact",
    text: "Contact",
    icon: <FaEnvelope />,
  },
  {
    path: "/dashboard/address",
    text: "Address Book",
    icon: <FaHome />,
  },
  {
    path: "/dashboard/newsletter",
    text: "Collected Email",
    icon: <FaMoneyBill />,
  },
  {
    path: "/dashboard/otherbrand",
    text: "Other Brands",
    icon: <FaQuestionCircle />,
  },
  {
    path: "/dashboard/messages",
    text: "Messages",
    icon: <FaComment />,
  },
  { path: "/dashboard/userlist", text: "Users", icon: <FaUser /> },
  {
    path: "/dashboard/transactionlist",
    text: "All Transactions",
    icon: <FaMoneyBill />,
  },
  { path: "/dashboard/payments", text: "Payments", icon: <FaMoneyBill /> },
  {
    path: "/dashboard/logreturns",
    text: "All Logged Returns",
    icon: <FaArrowRotateLeft />,
  },
  {
    path: "/dashboard/allreturns",
    text: "Return Queries",
    icon: <FaArrowRotateLeft />,
  },
  {
    path: "/dashboard/sellerreturns",
    text: " Sold Returns",
    icon: <FaArrowRotateLeft />,
  },
  {
    path: "/dashboard/buyerreturns",
    text: "Purchase Returns",
    icon: <FaArrowRotateRight />,
  },
  {
    path: "/dashboard/orderlist",
    text: "Purchase Orders",
    icon: <FaChartBar />,
  },
]

interface SideBarProps {
  isOpen: boolean
  setSidebarOpen: (value: boolean) => void
}

const Sidebar: React.FC<SideBarProps> = ({ isOpen, setSidebarOpen }) => {
  const { user } = useAuth()
  const { isDarkMode } = useTheme()
  const sidebarClasses = `fixed inset-y-0 left-0 z-[80] bg-orange-color scrollbar-hide bg-opacity-10 text-white w-64 h-screen transition-transform transform ${
    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  }`

  const listItemClasses =
    "mb-4 text-base hover:bg-orange-color hover:bg-opacity-10 text-malon-color transition-colors duration-300 px-4"

  return (
    <div className={sidebarClasses}>
      {/* Sidebar Header */}
      <div className="bg-orange-color py-4 px-6 shadow-lg">
        <Link to="/" className="text-2xl font-semibold flex items-center">
          <img
            src={
              isDarkMode
                ? "https://res.cloudinary.com/emirace/image/upload/v1661147636/Logo_White_3_ii3edm.gif"
                : "https://res.cloudinary.com/emirace/image/upload/v1661147778/Logo_Black_1_ampttc.gif"
            }
            alt="logo"
            className="w-3/4"
          />
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <nav className="mt-4 overflow-y-auto h-[calc(100vh-150px)] no-scrollbar">
        <ul className=" ">
          {sidebarLinks.map((link, index) => (
            <li
              key={index}
              className={listItemClasses}
              onClick={() => setSidebarOpen(false)}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center p-2 ${
                    isActive ? "text-white bg-orange-color rounded-md" : ""
                  }`
                }
                end={link.end}
              >
                {link.icon && <span className="mr-2 text-xl">{link.icon}</span>}
                {link.text}
              </NavLink>
            </li>
          ))}
          {user?.role === "Admin" && (
            <li
              className={listItemClasses}
              onClick={() => setSidebarOpen(false)}
            >
              <NavLink
                to={"/admin/dashboard"}
                className={`flex items-center justify-center gap-4 font-bold p-2`}
              >
                Admin Dashboard <AiOutlineArrowRight />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-malon-color text-center">
        <p className="text-xs text-white">© 2024 Repeddle</p>
      </div>
    </div>
  )
}

export default Sidebar
