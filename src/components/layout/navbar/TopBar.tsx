import Switch from "./switch"
import { Link } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"

const TopBar = () => {
  const { user } = useAuth()

  return (
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
                className={`hidden fixed w-[250px] left-1/4 top-5 z-[9] lg:w-[300px] p-2.5 group-hover:block rounded-[0.2rem] lg:left-2/4 lg:top-10 text-white-color bg-black-color`}
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
        <Link to={user?.isSeller ? "/newproduct" : "/sell"}>
          <div className="bg-orange-color flex justify-center items-center text-white font-bold m-[5px] px-[30px] py-[5px] rounded-lg">
            Sell
          </div>
        </Link>
      </div>
    </div>
  )
}

export default TopBar
