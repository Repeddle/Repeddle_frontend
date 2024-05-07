import { FaArrowDown, FaMoneyBill, FaUser } from "react-icons/fa"
import { FaBagShopping, FaBasketShopping } from "react-icons/fa6"

const featureType = {
  user: {
    title: "USERS",
    isMoney: false,
    link: "See all users",
    to: "/dashboard/userlist",
    icon: (
      <FaUser className="text-malon-color dark:bg-[#332021] bg-[#ecdada] text-lg self-end p-[5px] rounded-[0.2rem]" />
    ),
  },
  order: {
    title: "TOTAL SOLD ORDERS",
    isMoney: false,
    to: "/dashboard/orderlist",
    link: "view all orders",
    icon: (
      <FaBagShopping className="text-malon-color dark:bg-[#473527] bg-[#fcf0e0] text-lg self-end p-[5px] rounded-[0.2rem]" />
    ),
  },

  earning: {
    title: "TOTAL EARNINGS",
    isMoney: true,
    to: "/dashboard/earning",
    link: "view all net earning",
    icon: (
      <FaMoneyBill className="text-malon-color dark:bg-[#1d3b23] bg-[#d6f5dc] text-lg self-end p-[5px] rounded-[0.2rem]" />
    ),
  },
  product: {
    title: "TOTAL PRODUCTS LISTED",
    isMoney: false,
    to: "/dashboard/productlist",
    link: "View product list",
    icon: (
      <FaBasketShopping className="text-malon-color dark:bg-[#464646] bg-[#d9d9d9] text-lg self-end p-[5px] rounded-[0.2rem]" />
    ),
  },
  purchase: {
    title: "TOTAL PURCHASED ORDERS",
    isMoney: false,
    to: "/dashboard/productlist",
    link: "View product list",
    icon: (
      <FaBagShopping className="text-malon-color dark:bg-[#473527] bg-[#fcf0e0] text-lg self-end p-[5px] rounded-[0.2rem]" />
    ),
  },
}

export type FeaturedInfoOverviewKey = keyof typeof featureType

type Props = {
  type: FeaturedInfoOverviewKey
  number: number
}

const FeaturedInfoOverview = ({ type, number }: Props) => {
  const currency = "N"

  return (
    <div className="w-full flex justify-between">
      <div className="flex bg-light-ev2 dark:bg-dark-ev2 justify-between flex-1 border-l-orange-color p-5 rounded-[0.2rem] border-l-2">
        <div className="flex flex-col justify-between">
          <span className="text-sm font-light">{featureType[type].title}</span>
          <span className="text-[28px] font-light">
            {featureType[type].isMoney && currency} {number}
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-center">
            {<FaArrowDown className="text-xs text-[red] mr-[5px]" />}
            20%
          </div>
          {featureType[type].icon}
        </div>
      </div>
    </div>
  )
}

export default FeaturedInfoOverview
