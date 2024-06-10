import OrangeButton from "../../components/ui/OrangeButton"
import { Link } from "react-router-dom"
import { FaChartColumn, FaMessage, FaShield } from "react-icons/fa6"
import { FaMoneyBill } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"

const WhatYouGetSell = () => {
  const { user } = useAuth()

  return (
    <section className="flex flex-col items-center mx-0 lg:my-10 my-5">
      <h2 className="flex text-center justify-center font-bold lg:text-[calc(1.325rem_+_0.9vw)] text-[15px] mx-[5px] my-0">
        WHAT YOU WILL GET
      </h2>
      <div className="flex w-[80vw] justify-center flex-col lg:flex-row items-center">
        <div className="mx-5 my-2.5 flex-1 flex flex-col items-center h-[220px] m-5 lg:m-[10px] justify-start dark:bg-dark-ev2 bg-light-ev2 p-2.5 rounded-[0.2rem]">
          <div className="h-[64px]">
            <FaMessage size={64} className="text-orange-color h-[64px]" />
          </div>
          <p className="text-sm text-center sm:text-base mb-2.5">
            Real-time notification on transactions, Repeddle community
            engagements with{" "}
            <b className="font-bold text-malon-color">
              DIRECT IN APP/MESSAGE SYSTEM
            </b>{" "}
            for you and your buyers to make sale communication easy and fast.
          </p>
        </div>
        <div className="mx-5 my-2.5 flex-1 flex flex-col items-center h-[220px] m-5 lg:m-[10px] justify-start dark:bg-dark-ev2 bg-light-ev2 p-2.5 rounded-[0.2rem]">
          <div className="h-[64px]">
            <FaShield size={64} className="text-orange-color h-[64px]" />
          </div>
          <p className="text-sm text-center sm:text-base mb-2.5">
            Protected transactions for sellers and buyers with (
            <b className="font-bold text-malon-color">
              REPEDDLE BUYER & SELLERS PROTECTION
            </b>
            ), a personalized wallet and world class secured payment system.
          </p>
        </div>
        <div className="mx-5 my-2.5 flex-1 flex flex-col items-center h-[220px] m-5 lg:m-[20px] justify-start dark:bg-dark-ev2 bg-light-ev2 p-2.5 rounded-[0.2rem]">
          <div className="h-[64px]">
            <FaMoneyBill size={64} className="text-orange-color h-[64px]" />
          </div>
          <p className="text-sm text-center sm:text-base mb-2.5">
            Coupons and campaigns:{" "}
            <b className="font-bold text-malon-color">
              ACCESS TO DISCOUNT, GIFT CARD, PROMOTION AND FREE DELIVERY.
            </b>{" "}
            Offering creating tools to drive sales for your store.
          </p>
        </div>
        <div className="mx-5 my-2.5 flex-1 flex flex-col items-center h-[220px] m-5 lg:m-10 justify-start dark:bg-dark-ev2 bg-light-ev2 p-2.5 rounded-[0.2rem]">
          <div className="h-[64px]">
            <FaChartColumn size={64} className="text-orange-color h-[64px]" />
          </div>
          <p className="text-sm text-center sm:text-base mb-2.5">
            Customized marketing tools and algorithm to help your listing get
            the popularity it needs and sell fast, including{" "}
            <b className="font-bold text-malon-color">
              REPEDDLE VIP VERIFICATION SHIELD.
            </b>
          </p>
        </div>
      </div>
      <Link to={user ? "/newproduct" : "/auth/login"}>
        <OrangeButton>
          <h2 className="flex text-center justify-center font-bold lg:text-[calc(1.325rem_+_0.9vw)] leading-tight text-[15px] mx-[5px] my-0">
            SELL NOW
          </h2>
        </OrangeButton>
      </Link>
    </section>
  )
}

export default WhatYouGetSell
