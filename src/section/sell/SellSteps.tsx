import { FaArrowLeft, FaArrowRight, FaCircle } from "react-icons/fa"
import OrangeButton from "../../components/ui/OrangeButton"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const SellSteps = () => {
  const { user } = useAuth()

  return (
    <section className="flex flex-col items-center mx-0 lg:my-10 my-5">
      <div className="flex w-full justify-center items-center">
        <h4 className="font-bold text-xs lg:text-base text-center mx-[5px] my-0">
          <FaArrowLeft />
        </h4>
        <h2 className="flex lg:text-[calc(1.325rem_+_0.9vw)] text-center justify-center font-bold lg:text-base text-[15px] mx-[5px] my-0">
          THREE EASY STEPS
        </h2>
        <h4 className="font-bold text-xs lg:text-base text-center mx-[5px] my-0">
          <FaArrowRight />
        </h4>
      </div>
      <div className="flex w-full justify-center items-center">
        <h4 className="font-bold text-xs lg:text-[calc(1.275rem_+_0.3vw)] lg:text-base text-malon-color mx-[5px] my-0">
          SNAP
        </h4>
        <h4 className="font-bold text-xs lg:text-2xl text-center m-0">
          - LIST -
        </h4>
        <h4 className="font-bold text-xs lg:text-[calc(1.275rem_+_0.3vw)] lg:text-base text-orange-color mx-[5px] my-0">
          CASH-OUT.
        </h4>
      </div>
      <div className="flex flex-col lg:flex-row w-[80%] justify-center items-center">
        <div className="flex-1 flex flex-col items-center mx-0 my-2.5">
          <img
            className="w-[200px] mb-2.5 lg:w-[350px] lg:mb-5"
            src="https://res.cloudinary.com/emirace/image/upload/v1660107093/phonescreen_opkx9a.png"
            alt="imag"
          />
        </div>
        <div className="flex-1 flex flex-col items-center mx-0 my-2.5">
          <div className="mx-5 w-[300px] m-2.5 my-2.5 flex-1 flex flex-col items-center h-[200px] lg:w-[350px] lg:m-5 justify-start dark:bg-dark-ev2 bg-light-ev2 p-2.5 rounded-[0.2rem]">
            <h4 className="font-bold text-xs lg:text-base text-center mx-[5px] my-0">
              1. TAKE A PICS
            </h4>
            <p className="text-sm text-center lg:text-base mb-2.5">
              Your wardrobe getting cluttered or Storage keeps pilling up? Don't
              panic, we got you! Just take <b className="font-bold">nice</b>{" "}
              pics using a good source of natural lighting. Always remember
              "Great quality pictures sale fast"
            </p>
          </div>
          <div className="mx-5 w-[300px] m-2.5 my-2.5 flex-1 flex flex-col items-center h-[200px] lg:w-[350px] lg:m-5 justify-start dark:bg-dark-ev2 bg-light-ev2 p-2.5 rounded-[0.2rem]">
            <h4 className="font-bold text-xs lg:text-base text-center mx-[5px] my-0">
              2. LIST & SHARE
            </h4>
            <p className="text-sm text-center lg:text-base mb-2.5">
              Listing is easier than you think. With{" "}
              <b className="font-bold">10,400 brand</b> names to choose from our
              database, it's just a click away! List and describe your item with
              all information buyer needs to know, set your price and share to
              help buyers discover your listing.{" "}
            </p>
          </div>
          <div className="mx-5 w-[300px] m-2.5 my-2.5 flex-1 flex flex-col items-center h-[200px] lg:w-[350px] lg:m-5 justify-start dark:bg-dark-ev2 bg-light-ev2 p-2.5 rounded-[0.2rem]">
            <h4 className="font-bold text-xs lg:text-base text-center mx-[5px] my-0">
              3. CASH-OUT
            </h4>
            <p className="text-sm text-center lg:text-base mb-2.5">
              When your item is sold, ship your item with the preferred selected
              delivery method, once the buyer receives your item, you cash-out.
            </p>
          </div>
          <Link to={user ? "/newproduct" : "/auth/login"}>
            <OrangeButton>
              <h2 className="flex text-center justify-center font-bold lg:text-base text-[15px] mx-[5px] my-0">
                SELL NOW
              </h2>
            </OrangeButton>
          </Link>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-xs lg:text-[calc(1.275rem_+_0.3vw)] leading-tight text-center mx-[5px] my-0">
          THRIFT - BUY - SELL - CHAT - CASHOUT - REPEAT
        </h4>
        <div className="flex w-full justify-center items-center">
          <FaCircle />
          <h2 className="flex lg:text-[calc(1.325rem_+_0.9vw)] leading-tight text-center justify-center text-malon-color font-bold text-[15px] mx-[5px] my-0">
            ALL IN
          </h2>
          <h2 className="flex lg:text-[calc(1.325rem_+_0.9vw)] leading-tight text-center justify-center font-bold text-[15px] mx-[5px] my-0">
            ONE
          </h2>
          <h2 className="flex lg:text-[calc(1.325rem_+_0.9vw)] leading-tight text-center justify-center text-orange-color font-bold text-[15px] mx-[5px] my-0">
            PLACE
          </h2>
          <FaCircle />
        </div>
      </div>
    </section>
  )
}

export default SellSteps
