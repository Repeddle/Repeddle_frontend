import { IUser } from "../../types/user"
import {
  FaDotCircle,
  FaEnvelope,
  FaMoneyBill,
  FaPhone,
  FaPlus,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa"
import { currency, region } from "../../utils/common"
import { FaBolt, FaCalendarDays, FaLocationDot } from "react-icons/fa6"
import useAuth from "../../hooks/useAuth"
import Modal from "../../components/ui/Modal"
import { banks, states } from "../../utils/constants"
import { MouseEvent, useState } from "react"
import { InputType } from "../../pages/protected/dashboard/User"

type Props = {
  user: IUser
  balance?: {
    balance: number
  }
  input: InputType
  handleOnChange: (val: string, key: keyof InputType) => void
  errorInput: InputType
  handleError: (val: string, key: keyof InputType) => void
  addressValidate: (e: MouseEvent) => void
  accountValidate: (e: MouseEvent) => void
}

const UserLeftComp = ({
  user,
  balance,
  input,
  handleOnChange,
  errorInput,
  handleError,
  addressValidate,
  accountValidate,
}: Props) => {
  const { user: userInfo } = useAuth()

  const [showModel, setShowModel] = useState(false)
  const [showModelAddress, setShowModelAddress] = useState(false)

  return (
    <div className="flex-1 p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
      <div className="flex items-center relative flex-col lg:flex-row">
        <div className="flex items-center">
          <div className="relative">
            <img
              className="w-10 h-10 object-cover object-top rounded-[50%]"
              src={user.image}
              alt="p"
            />
            {user.badge && (
              <div className="absolute rounded-[50%] right-0 bottom-0">
                <img
                  className="w-5 object-cover"
                  src="https://res.cloudinary.com/emirace/image/upload/v1661148671/Icons-28_hfzerc.png"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col ml-5">
            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>
            <span className="font-light">{user.role}</span>
            {user.active ? (
              <div className="flex items-center text-orange-color">
                <FaBolt className="mr-2.5" /> Active
              </div>
            ) : (
              <div className="flex text-malon-color">
                <FaBolt className="mr-2.5" /> Banned
              </div>
            )}
          </div>
        </div>
        <div className="flex-row m-2.5 px-2.5 py-0 lg:absolute flex lg:flex-col items-center bg-light-ev3 dark:bg-dark-ev3 lg:p-2.5 rounded-[0.2rem] right-5 top-[30px]">
          <div className="text-[10px]">Wallet Balance</div>
          <div className="text-xl ml-2.5 lg:ml-0 lg:text-[25px] font-light">
            {currency(region())}
            {balance && balance.balance.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="mt-2.5">
        <div className="text-sm font-semibold">Account Details</div>
        <div className="flex items-center mx-0 my-5">
          <FaUser className="text-sm" />
          <div className="ml-2.5">@{user.username}</div>
        </div>
        <div className="flex items-center mx-0 my-5">
          <FaDotCircle className="text-sm" />
          <div className="ml-2.5">@{user._id}</div>
        </div>
        <div className="flex items-center mx-0 my-5">
          <FaCalendarDays className="text-sm" />
          <div className="ml-2.5">
            DOB {user.dob && user.dob.toString().substring(0, 10)}
          </div>
        </div>
        <div className="text-sm font-semibold">Account Details</div>

        <div className="flex items-center mx-0 my-5">
          <FaPhone className="text-sm" />
          <div className="ml-2.5">{user.phone}</div>
        </div>
        <div className="flex items-center mx-0 my-5">
          <FaEnvelope className="text-sm" />
          <div className="ml-2.5">{user.email}</div>
        </div>
        <div className="flex items-center mx-0 my-5">
          <FaLocationDot className="text-sm" />
          <div className="ml-2.5">Address Information</div>

          <div
            className="cursor-pointer ml-[5px] p-[5px] rounded-[0.2rem] hover:bg-malon-color"
            onClick={() => {
              setShowModelAddress(!showModelAddress)
            }}
          >
            <FaPlus />
          </div>
        </div>
        {user?.address?.street && (
          <div className="px-5 py-0">
            <div className="flex items-center mx-0 my-[5px]">
              <div className="flex-1">Street</div>
              <div className="ml-4 flex-[2]">{user.address.street}</div>
            </div>
            <div className="flex items-center mx-0 my-[5px]">
              <div className="flex-1">Apartment / Complex</div>
              <div className="ml-4 flex-[2]">{user.address.apartment}</div>
            </div>
            <div className="flex items-center mx-0 my-[5px]">
              <div className="flex-1">State</div>
              <div className="ml-4 flex-[2]">{user.address.state}</div>
            </div>
            <div className="flex items-center mx-0 my-[5px]">
              <div className="flex-1">Zipcode</div>
              <div className="ml-4 flex-[2]">{user.address.zipcode}</div>
            </div>
          </div>
        )}
        <div className="flex items-center mx-0 my-5">
          <FaMoneyBill className="text-sm" />
          <div className="ml-2.5">Bank Account Detail</div>
          {(userInfo?.role === "Admin" ||
            (!user.accountNumber && userInfo?.role !== "Admin")) && (
            <div
              className="cursor-pointer ml-[5px] p-[5px] rounded-[0.2rem] hover:bg-malon-color"
              onClick={() => setShowModel(!showModel)}
            >
              <FaPlus />
            </div>
          )}
          <div
            data-content="Note: Your Account details cannot be changed once saved, please contact admin or support  center to make any change"
            className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
          >
            <FaQuestionCircle className="text-neutral-300 ml-2.5" />
          </div>
          <Modal
            size="sm"
            isOpen={showModel}
            onClose={() => setShowModel(false)}
          >
            <form className="flex flex-col m-[30px]">
              <p>
                To become a Seller, kindly provide your banking details where
                you can transfer your earnings deposited in your Repeddle wallet
              </p>
              <div className="flex flex-col mt-2.5">
                <label className="text-sm">Account Name</label>
                <input
                  className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                  name="accountName"
                  placeholder={user.accountName}
                  type="text"
                  onChange={(e) =>
                    handleOnChange(e.target.value, "accountName")
                  }
                  onFocus={() => handleError("", "accountName")}
                />
              </div>
              {errorInput.accountName && (
                <div className="text-[red]">{errorInput.accountName}</div>
              )}
              <div className="flex flex-col mt-2.5">
                <label className="text-sm">Account Number</label>
                <input
                  className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                  placeholder={user.accountNumber?.toString() ?? ""}
                  name="accountNumber"
                  type="number"
                  onChange={(e) =>
                    handleOnChange(e.target.value, "accountNumber")
                  }
                  onFocus={() => handleError("", "accountNumber")}
                />
              </div>
              {errorInput.accountNumber && (
                <div className="text-[red]">{errorInput.accountNumber}</div>
              )}
              <div className="flex flex-col mt-2.5">
                <label className="text-sm">Bank Name</label>
                <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                  <select
                    onChange={(e) => handleOnChange(e.target.value, "bankName")}
                    onFocus={() => handleError("", "bankName")}
                    className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                  >
                    {region() === "NGN"
                      ? banks.Nigeria.map((x) => (
                          <option value={x.name}>{x.name}</option>
                        ))
                      : banks.SouthAfrica.map((x) => (
                          <option value={x.name}>{x.name}</option>
                        ))}
                  </select>
                </div>
              </div>
              {errorInput.bankName && (
                <div className="text-[red]">{errorInput.bankName}</div>
              )}
              <div className="text-malon-color">
                Note: This cannot be change once saved, contact support to make
                any changes.
              </div>
              <button
                className="cursor-pointer text-white-color mt-[5px] p-[5px] rounded-[0.2rem] border-none"
                onClick={accountValidate}
              >
                Update
              </button>
            </form>
          </Modal>
        </div>
        {user.accountNumber && (
          <div className="px-5 py-0">
            <div className="flex items-center mx-0 my-[5px]">
              <div className="flex-1">Account Name</div>
              <div className="ml-4 flex-[2]">{user.accountName}</div>
            </div>
            <div className="flex items-center mx-0 my-[5px]">
              <div className="flex-1">Account Number</div>
              <div className="ml-4 flex-[2]">{user.accountNumber}</div>
            </div>
            <div className="flex items-center mx-0 my-[5px]">
              <div className="flex-1">Bank Name</div>
              <div className="ml-4 flex-[2]">{user.bankName}</div>
            </div>
          </div>
        )}
        <Modal
          isOpen={showModelAddress}
          onClose={() => setShowModelAddress(false)}
          size="sm"
        >
          <form className="flex flex-col m-[30px]">
            <p>
              The provided address may be use for return should there be a need.
              This address is not displayed to buyers.
            </p>
            <div className="flex flex-col gap-1 mt-2.5">
              <label className="text-sm">Street</label>
              <input
                className="w-[250px] dark:bg-dark-ev1 bg-light-ev1 h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                name="street"
                type="text"
                onChange={(e) => handleOnChange(e.target.value, "street")}
                onFocus={() => handleError("", "street")}
              />
            </div>
            {errorInput.street && (
              <div className="text-[red]">{errorInput.street}</div>
            )}
            <div className="flex flex-col gap-1 mt-2.5">
              <label className="text-sm">Apartment/Complex</label>
              <input
                className="w-[250px] dark:bg-dark-ev1 bg-light-ev1 h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                name="apartment"
                type="text"
                onChange={(e) => handleOnChange(e.target.value, "apartment")}
                onFocus={() => handleError("", "apartment")}
              />
            </div>
            {errorInput.apartment && (
              <div className="text-[red]">{errorInput.apartment}</div>
            )}
            <div className="flex flex-col gap-1 mt-2.5">
              <label className="text-sm">
                {region() === "NGN" ? "State" : "Province"}
              </label>
              <div className="block dark:bg-dark-ev1 relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] w-[250px] border border-light-ev4 dark:border-dark-ev4">
                <select
                  value={input.state}
                  onChange={(e) => handleOnChange(e.target.value, "state")}
                  onFocus={() => handleError("", "state")}
                  className="text-base m-0 pl-2.5 border-light-ev4 dark:bg-dark-ev1 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                >
                  {region() === "NGN"
                    ? states.Nigeria.map((x) => <option value={x}>{x}</option>)
                    : states.SouthAfrican.map((x) => (
                        <option value={x}>{x}</option>
                      ))}
                </select>
              </div>
            </div>
            {errorInput.state && (
              <div className="text-[red]">{errorInput.state}</div>
            )}
            <div className="flex flex-col gap-1 mt-2.5">
              <label className="text-sm">Zip Code</label>
              <input
                className="w-[250px] dark:bg-dark-ev1 bg-light-ev1 h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                name="zipcode"
                value={input.zipcode}
                type="number"
                onChange={(e) => handleOnChange(e.target.value, "zipcode")}
                onFocus={() => handleError("", "zipcode")}
              />
            </div>
            <div className="text-malon-color">
              Note: This can be edited later in your profile screen
            </div>
            {errorInput.zipcode && (
              <div className="text-[red]">{errorInput.zipcode}</div>
            )}
            <button
              className="cursor-pointer text-white-color mt-[5px] p-[5px] rounded-[0.2rem] border-none"
              onClick={addressValidate}
            >
              Update
            </button>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default UserLeftComp
