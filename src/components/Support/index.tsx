import { RiCustomerService2Fill } from "react-icons/ri";
import { CgChevronDown } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function Support() {
  const [showSupport, setShowSupport] = useState(false);
  const [screen, setScreen] = useState("home");

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <div>Home</div>;

      default:
        break;
    }
  };
  return (
    <div className={`fixed bottom-5 z-50 right-5 lg:right-10`}>
      {showSupport && (
        <div
          className={`relative h-[80vh] w-[22rem] mb-2 lg:rounded-md shadow-2xl shadow-gray-500 overflow-hidden flex-col bg-white `}
        >
          <div className="bg-black p-5">
            <img
              className="w-[40%]"
              src="https://res.cloudinary.com/emirace/image/upload/v1661147636/Logo_White_3_ii3edm.gif"
              alt="logo"
            />
            <div className="text-4xl text-orange-color font-bold my-10">
              Hello Guest
            </div>
          </div>
          <div className="">{renderScreen()}</div>
          <div className="absolute top-0 bottom-0 right-0 left-0 overflow-y-auto z-10">
            <div className="p-4">
              <div className="h-32 " />
              <div className="border-t border-orange-color shadow-lg p-4 h-40 mb-5 bg-white rounded-md">
                <div className="font-semibold mb-4">FAQ</div>
                <div className="flex items-center border border-black p-2 py-1 rounded-full">
                  <FiSearch className="text-lg" />
                  <input
                    className="flex-1 px-2"
                    placeholder="Search question"
                  />
                </div>
              </div>
              <div className="p-4 border-t border-orange-color shadow-lg h-40 bg-white rounded-md">
                <div className="font-semibold">Start a conversation</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end">
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
