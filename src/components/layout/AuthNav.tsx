import { FaArrowLeftLong } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import useTheme from "../../hooks/useTheme"
// import { FaArrowLeftLong } from "react-icons/fa6"

function AuthNav() {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()

  return (
    <div className="fixed z-30 flex inset-x-0 top-8 px-6 sm:px-14 sm:top-8 justify-between items-center">
      <div className="bg-white p-2 rounded-full dark:bg-dark-ev1">
        <FaArrowLeftLong
          onClick={() => navigate(-1)}
          className="text-black dark:text-white text-base cursor-pointer"
        />
      </div>
      <Link to={"/"} className="h-8 sm:h-10 cursor-pointer">
        <img
          src={
            isDarkMode
              ? "https://res.cloudinary.com/emirace/image/upload/v1666000558/Icon_White_xpdmum.gif"
              : "https://res.cloudinary.com/emirace/image/upload/v1666000541/Icon_Black_g8wcdj.gif"
          }
          alt="logo"
          className="h-full"
        />
      </Link>
    </div>
  )
}

export default AuthNav
