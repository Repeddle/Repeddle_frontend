// AdminSidebar.tsx
import React from "react"
import { AiOutlineArrowRight, AiOutlineQuestionCircle } from "react-icons/ai"
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTheme from "../../hooks/useTheme"
import { BiChart } from "react-icons/bi"
import {
  FaChartBar,
  FaEnvelope,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa"
import {
  FaArrowRotateLeft,
  FaBasketShopping,
  FaListCheck,
  FaMoneyBill,
} from "react-icons/fa6"

const sidebarLinks = [
  {
    path: "/admin/analytic",
    text: "Analytic",
    icon: <BiChart />,
    end: true,
  },
  { path: "/admin/userlist", text: "Users", icon: <FaUser /> },
  {
    path: "/admin/categories",
    text: "Categories",
    icon: <FaListCheck />,
  },
  {
    path: "/admin/allproducts",
    text: "All Products",
    icon: <FaBasketShopping />,
  },
  {
    path: "/admin/allorders",
    text: "All Orders",
    icon: <FaChartBar />,
  },
  {
    path: "/admin/messages",
    text: "All Messages",
    icon: <FaListCheck />,
  },
  {
    path: "/admin/allreturns",
    text: "Return Queries",
    icon: <FaArrowRotateLeft />,
  },
  { path: "/admin/payments", text: "Payments", icon: <FaMoneyBill /> },
  {
    path: "/admin/transactionlist",
    text: "All Transactions",
    icon: <FaMoneyBill />,
  },
  {
    path: "/admin/articlelist",
    text: "Articles",
    icon: <AiOutlineQuestionCircle />,
  },
  {
    path: "/admin/newsletter",
    text: "Collected Email",
    icon: <FaMoneyBill />,
  },
  {
    path: "/admin/otherbrand",
    text: "Other Brands",
    icon: <FaQuestionCircle />,
  },
  {
    path: "/admin/contact",
    text: "Contact Us",
    icon: <FaEnvelope />,
  },
]

interface SideBarProps {
  isOpen: boolean
  setSidebarOpen: (value: boolean) => void
}

const AdminSidebar: React.FC<SideBarProps> = ({ isOpen, setSidebarOpen }) => {
  const { user } = useAuth()
  const { isDarkMode } = useTheme()
  const sidebarClasses = `fixed inset-y-0 left-0 z-[80] bg-orange-color bg-opacity-10 text-white w-64 h-screen transition-transform transform ${
    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  }`

  const listItemClasses =
    "mb-4 text-base hover:bg-orange-color hover:bg-opacity-10 text-malon-color transition-colors duration-300 px-4"

  return (
    <div className={sidebarClasses}>
      {/* AdminSidebar Header */}
      <div className="bg-orange-color flex-1 h-[72px] flex justify-center items-center py-4 px-6 shadow-lg">
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

      {/* AdminSidebar Navigation */}
      <nav className="mt-4 overflow-y-auto h-[calc(100vh-150px)]  scrollbar-hide">
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
                to={"/dashboard"}
                className={`flex items-center justify-center gap-4 font-bold p-2`}
              >
                User Dashboard <AiOutlineArrowRight />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {/* AdminSidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-malon-color text-center">
        <p className="text-xs text-white">© 2024 Repeddle</p>
      </div>
    </div>
  )
}

export default AdminSidebar
