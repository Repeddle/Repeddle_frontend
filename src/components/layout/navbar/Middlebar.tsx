import { useMemo, useRef, useState } from "react";
import LoggedInBar from "./LoggedInBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBox from "../../SearchBox";
import { FaBell } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import IconsTooltips from "../../IconsTooltips";
import NotificationList from "./NotificationList";
import useTheme from "../../../hooks/useTheme";
import MessageIcon from "../../../assets/icons/MessageIcon.svg";
import CartIcon from "../../../assets/icons/CartIcon.svg";

function Middlebar() {
  const modelRef2 = useRef(null);
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { cart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();
  const notifications: unknown[] = [];
  const allNotification: unknown[] = [];
  const messageNotification: unknown[] = [];

  const purchaseNotification: unknown[] = [];
  const productNotification: unknown[] = [];
  const soldNotification: unknown[] = [];

  const notAllowedRoutes = ["/admin", "/dashboard"];

  const hide = useMemo(
    () => !notAllowedRoutes.every((val) => !location.pathname.startsWith(val)),
    []
  );

  return (
    <div className="flex justify-center items-center px-5 pb-2.5 pt-0 lg:py-0">
      <div className="flex-1 pr-5">
        {!hide && (
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
        )}
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
        {user && (
          <div className="text-xl relative mx-2.5 my-0 hover:text-orange-color hidden md:block group">
            <div
              onClick={() => {
                setShowNotification(!showNotification);
              }}
              className="group-hover:opacity-100 relative"
            >
              <FaBell className="pointer text-malon-color" size={25} />
              <div
                ref={modelRef2}
                className="absolute inset-0 cursor-pointer"
              />
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
        )}
        <div className="text-xl group relative px-2.5 py-0 hover:text-orange-color">
          <Link to="/cart" className="group">
            <img src={CartIcon} alt="cart" className="h-[25px] w-[25px]" />
            <IconsTooltips
              classNames="group-focus:opacity-100 group-active:opacity-0"
              tips="Cart"
            />

            {cart.length > 0 && (
              <span className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-0 top-0 bg-orange-color">
                <span>{cart.length}</span>
              </span>
            )}
          </Link>
        </div>
        {user && (
          <div className="text-xl relative md:hidden px-2.5 py-0 hover:text-orange-color">
            <FaBell
              className="text-malon-color cursor-pointer"
              size={25}
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
            productNotification={productNotification}
            purchaseNotification={purchaseNotification}
            soldNotification={soldNotification}
          />
        ) : (
          <div className="text-sm cursor-pointer ml-5 dark:text-white hover:text-orange-color hidden lg:block">
            <Link to="auth/login" className="whitespace-nowrap">
              SIGN IN / SIGN UP
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Middlebar;
