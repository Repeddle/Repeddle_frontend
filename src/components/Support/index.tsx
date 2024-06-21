import { RiCustomerService2Fill } from "react-icons/ri";
import { CgChevronDown } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { LuSend } from "react-icons/lu";

export default function Support() {
  const [showSupport, setShowSupport] = useState(false);
  const [screen] = useState("home");

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return (
          <div className="absolute top-0 bottom-0 right-0 left-0 overflow-y-auto z-10">
            <div className="p-4">
              <div className="h-32 " />
              <div className="border-t border-orange-color shadow-lg p-4 h-40 mb-5 bg-white rounded-md">
                <div className="font-semibold mb-4">FAQ</div>
                <div className="flex items-center border border-black p-2 py-1 rounded-full">
                  <FiSearch className="text-lg" />
                  <input
                    className="flex-1 px-2 focus:bottom-0 focus:outline-none"
                    placeholder="Search question"
                  />
                </div>
              </div>
              <div className="p-4 border-t border-orange-color shadow-lg bg-white rounded-md">
                <div className="font-semibold mb-4">Start a conversation</div>
                <div className="flex gap-5 items-center ">
                  <img src="" className="w-16 h-16 bg-black rounded-full" />
                  <div>
                    We will reply as soon as we can, but usually within 2hrs
                  </div>
                </div>
                <div className="border mt-4 border-black p-2 rounded-md flex items-center justify-center gap-2">
                  <LuSend /> <div>Send us a message</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <div
      className={`fixed  z-50  ${
        showSupport
          ? "bottom-0 top-0 right-0 left-0 md:bottom-2  md:right-5 md:top-auto md:left-auto"
          : "bottom-[60px] right-5 md:bottom-2"
      }`}
    >
      {showSupport && (
        <div
          className={`relative h-full w-full md:h-[80vh] md:w-[25rem] mb-2 lg:rounded-md overflow-hidden flex-col bg-white `}
        >
          <div
            className="absolute top-5 right-5 z-20 cursor-pointer"
            onClick={() => setShowSupport(!showSupport)}
          >
            <CgChevronDown className="text-3xl text-orange-color " />
          </div>

          <div className="bg-black p-5 ">
            <img
              className="w-[40%]"
              src="https://res.cloudinary.com/emirace/image/upload/v1661147636/Logo_White_3_ii3edm.gif"
              alt="logo"
            />
            <div className="text-4xl text-orange-color font-bold my-10">
              Hello Guest
            </div>
          </div>
          <div className="text-black">{renderScreen()}</div>
        </div>
      )}
      <div
        className={`justify-end shadow-2xl shadow-gray-500 ${
          showSupport ? "hidden md:flex" : "md:flex"
        }`}
      >
        <div
          onClick={() => setShowSupport(!showSupport)}
          className="p-3 bg-black dark:bg-white rounded-full "
        >
          {showSupport ? (
            <CgChevronDown className="text-3xl text-orange-color curs" />
          ) : (
            <RiCustomerService2Fill className="text-3xl text-orange-color " />
          )}
        </div>
      </div>
    </div>
  );
}
