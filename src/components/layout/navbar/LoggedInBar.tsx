/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import { IUser } from "../../../types/user"
import { Link } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
import RedirectButton from "../../RedirectButton"

type Props = {
  user: IUser
  purchaseNotification: any[]
  soldNotification: any[]
  productNotification: any[]
}

const LoggedInBar = ({
  user,
  productNotification,
  purchaseNotification,
  soldNotification,
}: Props) => {
  const modelRef = useRef<HTMLImageElement>(null)

  const [menu, setMenu] = useState(false)

  const changeMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelRef.current &&
        !modelRef.current.contains(event.target as Node)
      ) {
        setMenu(false)
      }
    }
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  const { logout } = useAuth()

  return (
    <>
      <div className="relative">
        <img
          src={user.image}
          className="w-10 h-10 cursor-pointer object-cover ml-5 rounded-[50%] hidden lg:block"
          onClick={() => setMenu(!menu)}
        />

        {menu && (
          <div
            ref={modelRef}
            className="z-[9] absolute left-[-130px] w-[200px] text-sm p-2.5 rounded-[5px] top-[50px] dark:shadow-[0_5px_16px_rgba(225,225,225,0.2)] shadow-[0_5px_16px_rgba(0,0,0,0.2)] bg-white dark:bg-black"
          >
            <h1 className="font-bold text-xl text-orange-color">
              Hi {user.username}
            </h1>
            <ul>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1">
                <Link onClick={changeMenu} to={`/seller/${user.username}`}>
                  My Profile
                </Link>
              </li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1">
                <Link onClick={changeMenu} to="/dashboard/orderlist">
                  Purchased Orders
                </Link>

                {purchaseNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{purchaseNotification.length}</span>
                  </span>
                )}
              </li>

              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1">
                <Link onClick={changeMenu} to="/dashboard/saleslist">
                  Sold Orders
                </Link>

                {soldNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{soldNotification.length}</span>
                  </span>
                )}
              </li>

              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1">
                <Link onClick={changeMenu} to="/earning">
                  My Earnings
                </Link>

                {productNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{productNotification.length}</span>
                  </span>
                )}
              </li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1">
                <Link onClick={changeMenu} to="/dashboard/wallet">
                  My Wallet
                </Link>

                {productNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{productNotification.length}</span>
                  </span>
                )}
              </li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1">
                <Link onClick={changeMenu} to="/dashboard/productlist">
                  My Products
                </Link>

                {productNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{productNotification.length}</span>
                  </span>
                )}
              </li>

              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1">
                <Link onClick={changeMenu} to="/dashboard/wishlist">
                  Wishlist{" "}
                  <span className="text-orange-color">
                    ({user.wishlist?.length})
                  </span>
                </Link>
                {productNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{productNotification.length}</span>
                  </span>
                )}
              </li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1">
                <Link onClick={changeMenu} to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li
                className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1"
                onClick={() => {
                  logout()
                  changeMenu()
                }}
              >
                Log Out
              </li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color hover:dark:bg-dark-ev1 hover:bg-light-ev1">
                <RedirectButton />
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default LoggedInBar
