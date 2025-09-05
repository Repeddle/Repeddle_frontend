import {
  FaArrowDown,
  FaMoneyBill,
  FaShoppingBasket,
  FaUser,
} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { currency } from "../utils/common";
import useRegion from "../hooks/useRegion";

const featureTypes = {
  user: {
    title: " TOTAL USERS",
    isMoney: false,
    link: "See all users",
    to: "/admin/userlist",
    icon: (
      <div className="bg-[#ecdada] dark:bg-[#332021] self-end p-[5px] rounded-[0.2rem]">
        <FaUser className="text-lg text-malon-color" />
      </div>
    ),
  },
  order: {
    title: " TOTAL ORDERS",
    isMoney: false,
    to: "/admin/allorders",
    link: "view all orders",
    icon: (
      <div className="bg-[#fcf0e0] dark:bg-[#473527] self-end p-[5px] rounded-[0.2rem]">
        <FaBagShopping className="text-lg text-orange-color" />
      </div>
    ),
  },
  earning: {
    title: " TOTAL EARNINGS",
    isMoney: true,
    to: "/admin/transactionlist",
    link: "view all net earning",
    icon: (
      <div className="bg-[#d6f5dc] dark:bg-[#1d3b23] self-end p-[5px] rounded-[0.2rem]">
        <FaMoneyBill className="text-lg text-green-color" />
      </div>
    ),
  },
  today: {
    title: " TOTAL TODAY",
    isMoney: true,
    to: "",
    link: "view all net earning",
    icon: (
      <div className="bg-[#d6f5dc] dark:bg-[#1d3b23] self-end p-[5px] rounded-[0.2rem]">
        <FaMoneyBill className="text-lg text-green-color" />
      </div>
    ),
  },
  product: {
    title: " TOTAL PRODUCTS",
    isMoney: false,
    to: "/admin/allproducts",
    link: "View product list",
    icon: (
      <div className="bg-[#d9d9d9] dark:bg-[#464646] self-end p-[5px] rounded-[0.2rem]">
        <FaShoppingBasket className="text-lg text-white" />
      </div>
    ),
  },
};

type Props = {
  type: keyof typeof featureTypes;
  number: number;
};

const FeatureInfo = ({ number, type }: Props) => {
  const { region } = useRegion();

  const currencyVal = currency(region);

  return (
    <div className="w-full flex justify-between">
      <div className="flex justify-between flex-1 p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex flex-col justify-between">
          <div className="text-sm font-semibold">
            {featureTypes[type].title}
          </div>
          <div className="text-[28px] font-light">
            {featureTypes[type].isMoney && currencyVal}{" "}
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
  );
};

export default FeatureInfo;
