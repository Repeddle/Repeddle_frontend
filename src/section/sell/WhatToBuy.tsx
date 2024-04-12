import { Link } from "react-router-dom"

const WhatToBuy = () => {
  return (
    <section
      className="flex flex-col bg-no-repeat bg-cover bg-center relative items-center mx-0 lg:my-10 my-5"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/emirace/image/upload/v1666772704/charlesdeluvio-1-nx1QR5dTE-unsplash_dzdawl.jpg)",

        //   backgroundPosition: "center center",
      }}
    >
      <div className="flex lg:flex-row items-center justify-around w-full z-[9] lg:p-2.5 rounded-[0.2rem] flex-col p-[5px]">
        <h3 className="text-[13px] text-white-color lg:text-[25px] font-bold">
          WONDERING WHAT TO BUY?
        </h3>
        <Link to="/search" className="ml-auto">
          <div className="cursor-pointer ml-auto lg:mx-2.5 text-white uppercase mt-5 mb-0 mx-2.5 px-2.5 py-[5px] rounded-[0.2rem] bg-malon-color">
            <div className="font-bold text-[13px] lg:text-[25px]">SHOP NOW</div>
          </div>
        </Link>
      </div>
      <div className="absolute left-0 top-0 opacity-40 bg-malon-color w-full h-full" />
    </section>
  )
}

export default WhatToBuy
