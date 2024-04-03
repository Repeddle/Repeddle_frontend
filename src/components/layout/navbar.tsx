import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ThemeContext from "../../context/ThemeContext"
import { FaBell } from "react-icons/fa"
import moment from "moment"
import IconsTooltips from "../IconsTooltips"
import { AuthContext } from "../../context/AuthContext"
import Switch from "../switch"
import SearchBox from "../SearchBox"
import MessageIcon from "../../icons/MessageIcon.svg"
import CartIcon from "../../icons/CartIcon.svg"

function Navbar() {
  const modelRef = useRef(null)
  const modelRef2 = useRef(null)
  // useEffect(() => {
  //   setmodelRef1(modelRef.current);
  //   setmodelRef2(modelRef2.current);
  // }, []);

  const theme = useContext(ThemeContext)
  const auth = useContext(AuthContext)

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
  const categories: unknown[] = []
  const showNotification = false
  const menu = false
  const cart = { cartItems: [] }

  return (
    <div
      className={`fixed lg:relative transition-transform duration-[0.3s] ease-[ease-in-out] z-50 mb-0 left-0 top-0 w-full lg:mb-5 ${
        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex justify-center items-center mb-2.5 px-5 py-0 bg-black">
        <div className="flex-1 hidden lg:flex items-center">
          <Switch />
        </div>

        <div className="flex-[2] text-white overflow-x-hidden">
          <div className="flex relative animate-[slideh_linear_30s_infinite] right-0 top-0 animation-pause">
            <span className="flex w-full shrink-0 box-border justify-center text-[11px] lg:text-base">
              <div className="text-orange-color group group underline relative cursor-pointer mx-[5px] my-0">
                {/* .style:hover .text {
                @apply block;
                }  */}
                <Link to="signup">SIGN UP</Link>
              </div>
              , List All Item For Free{" "}
            </span>

            <span className="flex w-full shrink-0 box-border justify-center text-[11px] lg:text-base">
              Selling made Super Easy. Buy, Sell, Cash-Out & Repeat!{" "}
              <div className="text-orange-color group underline relative cursor-pointer mx-[5px] my-0">
                DETAILS
                <p
                  className={`hidden fixed w-[250px] left-1/4 top-5 z-[9] lg:w-[300px] p-2.5 group-hover:block rounded-[0.2rem] lg:left-2/4 lg:top-10 ${
                    theme?.isDarkMode
                      ? "text-white-color bg-black-color"
                      : "text-black-color bg-white-color"
                  }`}
                >
                  Sell more than 10,400 brand names you love. Listing is just a
                  few steps away!
                </p>
              </div>
            </span>
            <span className="flex w-full shrink-0 box-border justify-center text-[11px] lg:text-base">
              {" "}
              Explore Repeddle on{" "}
              <span className="text-orange-color group underline relative cursor-pointer mx-[5px] my-0">
                IOS
              </span>{" "}
              and{" "}
              <span className="text-orange-color underline relative cursor-pointer mx-[5px] my-0">
                ANDRIOD
              </span>{" "}
              - Coming soon.
            </span>
          </div>
        </div>

        <div className="flex-1 content-[''] hidden lg:flex justify-end">
          <Link to={auth?.user?.isSeller ? "/newproduct" : "/sell"}>
            <div className="bg-orange-color flex justify-center items-center text-white font-bold m-[5px] px-[30px] py-[5px] rounded-lg">
              Sell
            </div>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center px-5 pb-2.5 pt-0 lg:py-0">
        <div className="flex-1 pr-5">
          <Link to="/">
            <img
              className="w-4/5"
              src={
                theme?.isDarkMode
                  ? "https://res.cloudinary.com/emirace/image/upload/v1661147636/Logo_White_3_ii3edm.gif"
                  : "https://res.cloudinary.com/emirace/image/upload/v1661147778/Logo_Black_1_ampttc.gif"
              }
            />
          </Link>
        </div>

        <div className="hidden lg:block flex-[3]">
          {/* TODO: add back  */}
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
              <div
                className={`w-[270px] max-h-[70vh] overflow-auto absolute z-[9] -translate-x-2/4 p-2.5 rounded-[0.2rem] left-2/4 top-[50px] ${
                  theme?.isDarkMode
                    ? "bg-black shadow-[0_5px_16px_rgba(225,225,225,0.2)]"
                    : "bg-white shadow-[0_5px_16px_rgba(0,0,0,0.2)]"
                }`}
              >
                <div
                  className={`font-bold mb-2.5 ${
                    theme?.isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Notifications
                </div>
                {notifications.length < 0 ? (
                  <b>No Notification</b>
                ) : (
                  notifications.map((not) => (
                    <Link to={not.link}>
                      <div
                        className={`flex items-center relative mb-[5px] p-[3px] ${
                          theme?.isDarkMode
                            ? "hover:bg-dark-ev1"
                            : "hover:bg-light-ev1"
                        }`}
                        key={not._id}
                        onClick={() => {
                          // socket.emit("remove_id_notifications", not._id)
                        }}
                      >
                        <img
                          className="w-[50px] h-[50px] rounded-[50%]"
                          src={not.userImage}
                          alt="img"
                        />
                        <div className="text-sm flex-1 ml-[5px]">
                          <p
                            className={`${
                              theme?.isDarkMode ? "text-white" : "text-black"
                            }`}
                          >
                            {not.msg}
                          </p>
                          <p className="text-orange-color">
                            {moment(not.createdAt).fromNow()}
                          </p>
                        </div>
                        {!not.read && (
                          <div
                            className="bg-orange-color w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0"
                            style={{
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          />
                        )}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="text-xl group relative px-2.5 py-0 hover:text-orange-color">
            <Link to="/cart">
              <img src={CartIcon} alt="cart" className="h-[25px] w-[25px]" />
              <IconsTooltips classNames="group-hover:opacity-100" tips="Cart" />

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

          {auth?.user && (
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

          {auth?.user ? (
            <div className="relative">
              <img
                src={auth?.user.image}
                className="w-10 h-10 cursor-pointer object-cover ml-5 rounded-[50%] hidden lg:block"
                ref={modelRef}
                // onClick={() => setMymenu(!menu)}
              />

              {menu && (
                <div
                  className={`z-[9] absolute left-[-130px] w-[200px] text-sm p-2.5 rounded-[5px] top-[50px] ${
                    theme?.isDarkMode
                      ? "shadow-[0_5px_16px_rgba(225,225,225,0.2)]"
                      : "shadow-[0_5px_16px_rgba(0,0,0,0.2)]"
                  }`}
                >
                  <h1 className="font-bold text-xl text-orange-color">
                    Hi {auth?.user.username}
                  </h1>
                  <ul>
                    <li
                      className={`relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color ${
                        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                      }`}
                    >
                      <Link to={`/seller/${auth?.user._id}`}>My Profile</Link>

                      {/* {messageNotification.length > 0 && (
                  <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                    <span>{messageNotification.length}</span>
                  </span>
                )} */}
                    </li>
                    <li
                      className={`relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color ${
                        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                      }`}
                    >
                      <Link to="/dashboard/orderlist">Purchased Orders</Link>

                      {purchaseNotification.length > 0 && (
                        <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                          <span>{purchaseNotification.length}</span>
                        </span>
                      )}
                    </li>

                    <li
                      className={`relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color ${
                        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                      }`}
                    >
                      <Link to="/dashboard/saleslist">Sold Orders</Link>

                      {soldNotification.length > 0 && (
                        <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                          <span>{soldNotification.length}</span>
                        </span>
                      )}
                    </li>

                    <li
                      className={`relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color ${
                        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                      }`}
                    >
                      <Link to="/earning">My Earnings</Link>

                      {productNotification.length > 0 && (
                        <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                          <span>{productNotification.length}</span>
                        </span>
                      )}
                    </li>
                    <li
                      className={`relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color ${
                        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                      }`}
                    >
                      <Link to="/dashboard/wallet">My Wallet</Link>

                      {productNotification.length > 0 && (
                        <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                          <span>{productNotification.length}</span>
                        </span>
                      )}
                    </li>
                    <li
                      className={`relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color ${
                        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                      }`}
                    >
                      <Link to="/dashboard/productlist">My Products</Link>

                      {productNotification.length > 0 && (
                        <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                          <span>{productNotification.length}</span>
                        </span>
                      )}
                    </li>

                    <li
                      className={`relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color ${
                        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                      }`}
                    >
                      <Link to="/cart?wishlist=true">
                        Wishlist{" "}
                        <span style={{ color: "var(--orange-color)" }}>
                          ({auth.user?.saved?.length})
                        </span>
                      </Link>
                      {productNotification.length > 0 && (
                        <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                          <span>{productNotification.length}</span>
                        </span>
                      )}
                    </li>
                    <li
                      className={`relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color ${
                        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                      }`}
                    >
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li onClick={() => auth.logout()}>Log Out</li>
                    <li
                      className={`relative whitespace-nowrap cursor-pointer px-[30px] py-[5px] hover:text-orange-color ${
                        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                      }`}
                    >
                      TODO: add back
                      {/* <RedirectButton /> */}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm cursor-pointer ml-5 hover:text-orange-color hidden lg:block">
              <Link to="signin">SIGN IN / SIGN UP</Link>
            </div>
          )}
        </div>
      </div>

      <ul className="relative hidden group lg:flex justify-center items-center">
        {categories.length > 0 &&
          categories.map((c) => (
            <div className="mx-5 my-2.5 group-hover:flex">
              <li className="font-medium text-[15px] uppercase cursor-pointer hover:text-orange-color">
                <Link to={c.path || `/search?category=${c.name}`}>
                  {c.name}
                </Link>
                {/* <Link to={`/category/${c.name}`}>{c.name}</Link>  */}
              </li>

              <ul
                className={`hidden flex-col items-center z-[9] flex-wrap w-screen h-[550px] absolute px-[120px] py-10 left-0 top-8 ${
                  theme?.isDarkMode
                    ? "bg-black shadow-[0_0_3px_rgba(225,225,225,0.2)]"
                    : "bg-white shadow-[0_0_3px_rgba(0,0,0,0.2)]"
                }`}
              >
                {c.subCategories.length > 0 &&
                  c.subCategories.map((s) => {
                    if (s.items.length === 0) {
                      return (
                        <li className="whitespace-nowrap text-xs uppercase font-medium cursor-pointer pb-2.5 hover:text-orange-color hover:underline self-start">
                          <Link to={s.path || `/search?query=${s.name}`}>
                            {s.name}
                          </Link>
                        </li>
                      )
                    } else {
                      return (
                        <div className="mb-2.5 self-start">
                          <li className="uppercase font-[bold] whitespace-nowrap text-xs self-start">
                            {s.name}
                          </li>
                          <ul className="flex flex-col">
                            {s.items.map((l) => (
                              <Link to={l.path || `/search?query=${l.name}`}>
                                <li className="text-xs cursor-pointer hover:text-orange-color hover:underline">
                                  {l.name}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </div>
                      )
                    }
                  })}
              </ul>
            </div>
          ))}
        <div className="mx-5 my-2.5 group-hover:flex">
          <Link to="/brand">
            <li className="font-medium text-[15px] uppercase cursor-pointer hover:text-orange-color">
              SHOP BY BRAND
            </li>
          </Link>
        </div>
        <div className="mx-5 my-2.5 group-hover:flex">
          <Link to="/recurated">
            <li className="font-medium text-[15px] uppercase cursor-pointer hover:text-orange-color">
              RE:CURATED
            </li>
          </Link>
        </div>
      </ul>
    </div>
  )
}

export default Navbar
