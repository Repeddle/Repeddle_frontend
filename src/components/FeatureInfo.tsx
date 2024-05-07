import {
  FaArrowDown,
  FaMoneyBill,
  FaShoppingBasket,
  FaUser,
} from "react-icons/fa"
import { FaBagShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"

const featureTypes = {
  user: {
    title: " TOTAL USERS",
    isMoney: false,
    link: "See all users",
    to: "/dashboard/userlist",
    icon: (
      <FaUser className="text-lg p-[5px] self-end rounded-[0.2rem] text-malon-color bg-[#ecdada] dark:bg-[#332021]" />
    ),
  },
  order: {
    title: " TOTAL ORDERS",
    isMoney: false,
    to: "/admin/allOrderList/",
    link: "view all orders",
    icon: (
      <FaBagShopping className="text-lg p-[5px] self-end rounded-[0.2rem] text-orange-color bg-[#fcf0e0] dark:bg-[#473527]" />
    ),
  },
  earning: {
    title: " TOTAL EARNINGS",
    isMoney: true,
    to: "/dashboard/earning",
    link: "view all net earning",
    icon: (
      <FaMoneyBill className="text-lg p-[5px] self-end rounded-[0.2rem] text-green-color bg-[#d6f5dc] dark:bg-[#1d3b23]" />
    ),
  },
  today: {
    title: " TOTAL TODAY",
    isMoney: true,
    to: "",
    link: "view all net earning",
    icon: (
      <FaMoneyBill className="text-lg p-[5px] self-end rounded-[0.2rem] text-green-color bg-[#d6f5dc] dark:bg-[#1d3b23]" />
    ),
  },
  product: {
    title: " TOTAL PRODUCTS",
    isMoney: false,
    to: "/admin/allProductList/",
    link: "View product list",
    icon: (
      <FaShoppingBasket className="text-lg p-[5px] self-end rounded-[0.2rem] text-white bg-[#d9d9d9] dark:bg-[#464646]" />
    ),
  },
}

type Props = {
  type: keyof typeof featureTypes
  number: number
}

const FeatureInfo = ({ number, type }: Props) => {
  // TODO:
  const currency = "N"

  return (
    <div className="w-full flex justify-between">
      <div className="flex justify-between flex-1 p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex flex-col justify-between">
          <div className="text-sm font-semibold">
            {featureTypes[type].title}
          </div>
          <div className="text-[28px] font-light">
            {featureTypes[type].isMoney && currency}{" "}
            {featureTypes[type].isMoney ? number.toFixed(2) : number}
          </div>
          {featureTypes[type].to && (
            <div className="text-xs cursor-pointer w-max border-b border-light-ev3 dark:bg-dark-ev3">
              <Link to={featureTypes[type].to}>{featureTypes[type].link}</Link>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-center">
            {<FaArrowDown className="text-xs mr-[5px] text-[red]" />}
            20 %
          </div>
          {featureTypes[type].icon}
        </div>
      </div>
    </div>
  )
}

export default FeatureInfo
