import OrangeButton from "../../components/ui/OrangeButton"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const WhatToSell = () => {
  const { user } = useAuth()

  return (
    <section className="flex flex-col items-center mx-0 lg:my-10 my-5 p-[10px] rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
      <h4 className="font-bold text-xs lg:text-[calc(1.275rem_+_0.3vw)] leading-tight text-center mx-[5px] my-0">
        WHAT TO SELL?
      </h4>
      <p className="text-sm text-center sm:text-base leading-normal mb-2.5">
        FASHION - BEAUTY - FINE JEWLERY - HOME & ARTS - PET - CARE & GROOMING -
        GADGETS
      </p>
      <p className="text-sm text-center sm:text-base leading-normal mb-2.5">
        We accept all your pre-loved precious Items our community are constantly
        looking for, willing to love, and give a warm home.{" "}
      </p>

      <div className="flex w-full gap-2.5 overflow-x-auto lg:overflow-x-visible justify-start lg:justify-center items-center">
        <img
          className="w-[220px] h-[220px] object-cover mt-5"
          src="https://res.cloudinary.com/emirace/image/upload/v1661221989/james-ree-ZmeFtu11Hpc-unsplash_xzwcxb.webp"
          alt="img"
        />
        <img
          className="w-[220px] h-[220px] object-cover mt-5"
          src="https://res.cloudinary.com/emirace/image/upload/v1661221989/Screen_Shot_2022-08-06_at_2.16.31_PM_obdxfj.webp"
          alt="img"
        />
        <img
          className="w-[220px] h-[220px] object-cover mt-5"
          src="https://res.cloudinary.com/emirace/image/upload/v1661221989/john-torcasio-TJrkkhdB39E-unsplash_gjmphx.webp"
          alt="img"
        />
        <img
          className="w-[220px] h-[220px] object-cover mt-5"
          src="https://res.cloudinary.com/emirace/image/upload/v1661221989/arno-senoner-ZT16YkAYueo-unsplash_mhdyxh.webp"
          alt="img"
        />
        <img
          className="w-[220px] h-[220px] object-cover mt-5"
          src="https://res.cloudinary.com/emirace/image/upload/v1661221989/aditya-chinchure-jMh1p7EiV8Q-unsplash_1_dqffwg.webp"
          alt="img"
        />
      </div>

      <Link to={user ? "/newproduct" : "/auth/login"}>
        <OrangeButton>
          <h2 className="flex text-center justify-center font-bold lg:text-base text-[15px] mx-[5px] my-0">
            Start Selling
          </h2>
        </OrangeButton>
      </Link>
    </section>
  )
}

export default WhatToSell
