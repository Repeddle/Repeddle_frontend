import { NavLink } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Search from "../../assets/icons/search.svg"
import { FaEnvelope, FaHouse, FaUser } from "react-icons/fa6"

const StickyNav = () => {
  const { user } = useAuth()

  // TODO:
  const messageNotification = []
  const purchaseNotification: never[] = []
  const soldNotification: never[] = []

  return (
    <div className="block lg:hidden">
      <div className="shadow-[0_0_3px_rgba(0,0,0,0.2)] flex h-[55px] justify-between fixed w-full z-[9] bottom-0 bg-white">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `items-center flex flex-col grow justify-center min-w-[50px] relative whitespace-nowrap ${
              isActive ? "text-orange-color" : "text-malon-color"
            }`
          }
        >
          <FaHouse className="text-2xl" />
          <div className="text-[11px] leading-normal">Home</div>
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `items-center text-malon-color flex flex-col grow justify-center min-w-[50px] relative whitespace-nowrap ${
              isActive ? "text-orange-color active" : "text-malon-color"
            }`
          }
        >
          <div>
            <img
              src={Search}
              alt="search icon"
              className="h-[25px] w-[25px] maroon-filter orange-filter"
            />
          </div>
          <div className="text-[11px] leading-normal filter-none">
            Categories
          </div>
        </NavLink>
        <NavLink
          to={user?.role === "Seller" ? "/newproduct" : "/sell"}
          className={({ isActive }) =>
            `items-center text-malon-color flex flex-col grow justify-center min-w-[50px] relative whitespace-nowrap ${
              isActive ? "text-orange-color" : "text-malon-color"
            }`
          }
        >
          <div className="text-[11px] leading-normal text-[white] h-[60px] w-[60px] font-bold text-lg flex justify-center items-center uppercase mt-[-30px] rounded-[50%] bg-orange-color">
            Sell
          </div>
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `items-center text-malon-color flex flex-col grow justify-center min-w-[50px] relative whitespace-nowrap ${
              isActive ? "text-orange-color" : "text-malon-color"
            }`
          }
        >
          <FaEnvelope size={24} />
          <div className="text-[11px] leading-normal">Message</div>
          {messageNotification.length > 0 && (
            <div className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-5 top-[5px] bg-orange-color">
              <span>{messageNotification.length}</span>
            </div>
          )}
        </NavLink>
        <NavLink
          to={user ? "/profilmenu" : "/auth/login"}
          className={({ isActive }) =>
            `items-center text-malon-color flex flex-col grow justify-center min-w-[50px] relative whitespace-nowrap ${
              isActive ? "text-orange-color" : "text-malon-color"
            }`
          }
        >
          <FaUser size={24} />
          <div className="text-[11px] leading-normal">Profile</div>
          {[...soldNotification, ...purchaseNotification].length > 0 && (
            <div className="w-3 h-3 flex items-center justify-center text-white text-[8px] absolute cursor-default rounded-[50%] right-5 top-[5px] bg-orange-color">
              <span>
                {[...soldNotification, ...purchaseNotification].length}
              </span>
            </div>
          )}
        </NavLink>
      </div>
      <div className="h-[60px]" />
    </div>
  )
}

export default StickyNav
