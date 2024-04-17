import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaBell } from "react-icons/fa"
import IconsTooltips from "../../IconsTooltips"
import SearchBox from "../../SearchBox"
import MessageIcon from "../../../assets/icons/MessageIcon.svg"
import CartIcon from "../../../assets/icons/CartIcon.svg"
import TopBar from "./TopBar"
import useAuth from "../../../hooks/useAuth"
import useTheme from "../../../hooks/useTheme"
import BarCategories from "./BarCategories"
import NotificationList from "./NotificationList"
import LoggedInBar from "./LoggedInBar"

function Navbar() {
  const modelRef2 = useRef(null)
  // useEffect(() => {
  //   setmodelRef1(modelRef.current);
  //   setmodelRef2(modelRef2.current);
  // }, []);

  const { isDarkMode } = useTheme()
  const { user } = useAuth()

  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingUp = currentScrollPos < prevScrollPos

      // Adjust the scroll threshold (72px) as needed
      const scrollThreshold = 72

      if (
        isScrollingUp ||
        currentScrollPos <= scrollThreshold ||
        currentScrollPos === 0
      ) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollPos])

  const notifications: unknown[] = []
  const allNotification: unknown[] = []
  const messageNotification: unknown[] = []

  const purchaseNotification: unknown[] = []
  const productNotification: unknown[] = []
  const soldNotification: unknown[] = []
  const menu = false

  const showNotification = false

  const cart = { cartItems: [] }

  return (
    <>
      <div
        className={`fixed lg:relative transition-transform duration-[0.3s] ease-[ease-in-out] z-50 mb-0 left-0 top-0 w-full lg:mb-5 dark:bg-dark-ev1 bg-light-ev1
       ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <TopBar />

        <div className="flex justify-center items-center px-5 pb-2.5 pt-0 lg:py-0">
          <div className="flex-1 pr-5">
            <Link to="/">
              <img
                className="w-4/5"
                src={
                  isDarkMode
                    ? "https://res.cloudinary.com/emirace/image/upload/v1661147636/Logo_White_3_ii3edm.gif"
                    : "https://res.cloudinary.com/emirace/image/upload/v1661147778/Logo_Black_1_ampttc.gif"
                }
              />
            </Link>
          </div>

          <div className="hidden lg:block flex-[3]">
            <SearchBox />
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="text-xl relative mx-2.5 my-0 hover:text-orange-color hidden lg:block group">
              <Link to="/messages">
                <img
                  src={MessageIcon}
                  alt="message"
                  className="h-[25px] w-[25px]"
                />
                <IconsTooltips
                  classNames="group-hover:opacity-100"
                  tips="Messages"
                />
                {messageNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{messageNotification.length}</span>
                  </span>
                )}
              </Link>
            </div>

            <div className="text-xl relative mx-2.5 my-0 hover:text-orange-color hidden lg:block group">
              <div
                onClick={() => {
                  // setShowNotification(!showNotification)
                }}
                className="group-hover:opacity-100 relative"
              >
                <FaBell className="pointer text-malon-color" size={25} />
                <div
                  ref={modelRef2}
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    cursor: "pointer",
                  }}
                ></div>
              </div>

              <IconsTooltips
                classNames="group-hover:opacity-100"
                tips="Notifications"
              />

              {allNotification.length > 0 && (
                <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                  <span>{allNotification.length}</span>
                </span>
              )}

              {showNotification && (
                <NotificationList notifications={notifications} />
              )}
            </div>

            <div className="text-xl group relative px-2.5 py-0 hover:text-orange-color">
              <Link to="/cart">
                <img src={CartIcon} alt="cart" className="h-[25px] w-[25px]" />
                <IconsTooltips
                  classNames="group-hover:opacity-100"
                  tips="Cart"
                />

                {cart.cartItems.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{cart.cartItems.length}</span>
                  </span>
                )}
              </Link>
            </div>

            {/* <Link to={auth?.user?.isSeller ? "/newproduct" : "/sell"}>
      <SellButton>Sell</SellButton>
    </Link> */}

            {user && (
              <div className="text-xl relative hidden px-2.5 py-0 hover:text-orange-color">
                <FaBell
                  className="text-malon-color cursor-pointer mt-[10px]"
                  size={20}
                  onClick={() => navigate("/notifications")}
                />
                {allNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{allNotification.length}</span>
                  </span>
                )}
              </div>
            )}

            {user ? (
              <LoggedInBar
                user={user}
                menu={menu}
                productNotification={productNotification}
                purchaseNotification={purchaseNotification}
                soldNotification={soldNotification}
              />
            ) : (
              <div className="text-sm cursor-pointer ml-5 dark:text-white hover:text-orange-color hidden lg:block">
                <Link to="signin">SIGN IN / SIGN UP</Link>
              </div>
            )}
          </div>
        </div>

        <BarCategories />
      </div>
      <div className="block lg:hidden h-[72px]" />
    </>
  )
}

export default Navbar
