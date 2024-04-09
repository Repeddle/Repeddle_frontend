import { FaCopyright } from "react-icons/fa"

const ReserveAndCopyright = () => {
  return (
    <>
      <div className="text-center text-xs lg:mx-[20vw] lg:my-[5px] m-[5px]">
        All third party logos and brand names appearing on our App, Websites or
        any of our Platforms are independent trademarks of their respective
        owners. Except otherwise mentioned, Repeddle has no affiliation,
        endorsement or endorses any trademark displayed on it online or physical
        platforms.
      </div>
      <div className="flex justify-center mb-[55px] lg:mb-0 dark:text-black bg-black dark:bg-white font-bold text-white h-[50px] items-center text-sm">
        <FaCopyright className="text-xl mr-2.5" /> 2023 Repeddle. All Right
        Reserved.
      </div>
    </>
  )
}

export default ReserveAndCopyright
