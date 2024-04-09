import { useRef } from "react"
import { IUser } from "../../../types/user"
import { Link } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
import RedirectButton from "../../RedirectButton"

type Props = {
  user: IUser
  purchaseNotification: any[]
  soldNotification: any[]
  productNotification: any[]
  menu: boolean
}

const LoggedInBar = ({
  user,
  productNotification,
  purchaseNotification,
  soldNotification,
  menu,
}: Props) => {
  const modelRef = useRef(null)

  const { logout } = useAuth()

  return (
    <>
      <div className="relative">
        <img
          src={user.image}
          className="w-10 h-10 cursor-pointer object-cover ml-5 rounded-[50%] hidden lg:block"
          ref={modelRef}
          // onClick={() => setMymenu(!menu)}
        />

        {menu && (
          <div className="z-[9] absolute left-[-130px] w-[200px] text-sm p-2.5 rounded-[5px] top-[50px] dark:shadow-[0_5px_16px_rgba(225,225,225,0.2)] shadow-[0_5px_16px_rgba(0,0,0,0.2)]">
            <h1 className="font-bold text-xl text-orange-color">
              Hi {user.username}
            </h1>
            <ul>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color dark:bg-dark-ev1 bg-light-ev1">
                <Link to={`/seller/${user._id}`}>My Profile</Link>

                {/* {messageNotification.length > 0 && (
      <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
        <span>{messageNotification.length}</span>
      </span>
    )} */}
              </li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color dark:bg-dark-ev1 bg-light-ev1">
                <Link to="/dashboard/orderlist">Purchased Orders</Link>

                {purchaseNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{purchaseNotification.length}</span>
                  </span>
                )}
              </li>

              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color dark:bg-dark-ev1 bg-light-ev1">
                <Link to="/dashboard/saleslist">Sold Orders</Link>

                {soldNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{soldNotification.length}</span>
                  </span>
                )}
              </li>

              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color dark:bg-dark-ev1 bg-light-ev1">
                <Link to="/earning">My Earnings</Link>

                {productNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{productNotification.length}</span>
                  </span>
                )}
              </li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color dark:bg-dark-ev1 bg-light-ev1">
                <Link to="/dashboard/wallet">My Wallet</Link>

                {productNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{productNotification.length}</span>
                  </span>
                )}
              </li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color dark:bg-dark-ev1 bg-light-ev1">
                <Link to="/dashboard/productlist">My Products</Link>

                {productNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{productNotification.length}</span>
                  </span>
                )}
              </li>

              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color dark:bg-dark-ev1 bg-light-ev1">
                <Link to="/cart?wishlist=true">
                  Wishlist{" "}
                  <span style={{ color: "var(--orange-color)" }}>
                    ({user.saved?.length})
                  </span>
                </Link>
                {productNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{productNotification.length}</span>
                  </span>
                )}
              </li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color dark:bg-dark-ev1 bg-light-ev1">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li onClick={logout}>Log Out</li>
              <li className="relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color dark:bg-dark-ev1 bg-light-ev1">
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
