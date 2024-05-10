/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: remove this after connection
import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react"
import { user as userDetails } from "../../utils/data"
import useAuth from "../../hooks/useAuth"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import {
  FaBolt,
  FaCheck,
  FaDotCircle,
  FaEnvelope,
  FaMoneyBill,
  FaPhone,
  FaPlus,
  FaQuestionCircle,
  FaTruck,
  FaUser,
} from "react-icons/fa"
import { FaCalendarDays, FaCamera, FaLocationDot } from "react-icons/fa6"
import Modal from "../../components/ui/Modal"
import { region, timeDifference } from "../../utils/common"
import moment from "moment"
import LoadingBox from "../../components/LoadingBox"
import { states } from "../../utils/constants"

const User = () => {
  const { user: userInfo } = useAuth()

  const { id } = useParams()
  const user = userDetails

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [phone, setPhone] = useState("")
  const [about, setAbout] = useState("")
  const [image, setImage] = useState("")
  const [active, setActive] = useState("")
  const [badge, setBadge] = useState("")
  const [influencer, setInfluencer] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showModel, setShowModel] = useState(false)
  const [showModelAddress, setShowModelAddress] = useState(false)
  const [username, setUsername] = useState("")
  const [rebundleStatus, setRebundleStatus] = useState(false)
  const [rebundleCount, setRebundleCount] = useState(0)
  const [loadingRebundle, setLoadingRebundle] = useState(false)
  const [rebundleError, setRebundleError] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState(user.newsletter)
  const [banks, setBanks] = useState([{ name: "a bank", code: "123" }])

  const [input, setInput] = useState<{ [key: string]: string | number }>({})
  const [errorInput, setErrorInput] = useState<{ [key: string]: string }>({})

  const [bundle, setBundle] = useState("")

  const loadingUpload = false
  const loadingUpdate = false
  const balance = { balance: 500 }

  const daydiff =
    (user.usernameLastUpdate &&
      30 - timeDifference(new Date(user.usernameLastUpdate), new Date())) ??
    0

  const handleOnChange = (text: string, input: string) => {
    setInput((prevState) => ({ ...prevState, [input]: text }))
  }
  const handleError = (errorMessage: string, input: string) => {
    setErrorInput((prevState) => ({ ...prevState, [input]: errorMessage }))
  }

  const addressValidate = (e: MouseEvent) => {
    e.preventDefault()
  }

  const accountValidate = (e: MouseEvent) => {
    e.preventDefault()
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
  }

  const uploadHandler = async (e: ChangeEvent) => {
    console.log(e)
  }

  const handleRebundle = async (
    val: { status: boolean; count: number } | null
  ) => {
    console.log(val)
  }

  const handleNewsletter = async () => {}

  return (
    <div className="flex-[4] p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[calc(1.375rem_+_1.5vw)] leading-tight">
          Edit User
        </h1>
      </div>
      <div className="flex mt-5 flex-col gap-5 lg:flex-row lg:gap-0">
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
                <span className="font-light">
                  {user.isAdmin ? "Admin" : user.isSeller ? "Seller" : "Buyer"}
                </span>
                {user.active ? (
                  <div>
                    <FaBolt className="mr-2.5 text-orange-color" /> Active
                  </div>
                ) : (
                  <div>
                    <FaBolt className="mr-2.5 text-malon-color" /> Banned
                  </div>
                )}
              </div>
            </div>
            <div className="flex-row m-2.5 px-2.5 py-0 lg:absolute flex lg:flex-col items-center bg-light-ev3 dark:bg-dark-ev3 lg:p-2.5 rounded-[0.2rem] right-5 top-[30px]">
              <div className="text-[10px]">Wallet Balance</div>
              <div className="text-xl ml-2.5 lg:ml-0 lg:text-[25px] font-light">
                {/* TODO:  */}
                {/* {balance.currency} */}N
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
              {(userInfo?.isAdmin ||
                (!user.accountNumber && !userInfo?.isAdmin)) && (
                <div
                  className="cursor-pointer ml-[5px] p-[5px] rounded-[0.2rem] hover:bg-malon-color"
                  onClick={() => setShowModel(!showModel)}
                >
                  <FaPlus />
                </div>
              )}
              <div
                className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[-180px] hover:after:text-justify 
              hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
              lg:hover:after:top-5 hover:after:text-[11px] hover:after:left-[-90px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-white-color
              hover:after:dark:bg-black hover:after:text-black dark:hover:after:text-white 
              hover:after:content-["Note: Your Account details cannot be changed once saved, please contact admin or support  center to make any change"]`}
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
                    To become a Seller, kindly provide your banking details
                    where you can transfer your earnings deposited in your
                    Repeddle wallet
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
                        onChange={(e) =>
                          handleOnChange(e.target.value, "bankName")
                        }
                        onFocus={() => handleError("", "bankName")}
                        className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                      >
                        {region() === "NGN"
                          ? banks.map((x) => (
                              <option value={{ name: x.name, code: x.code }}>
                                {x.name}
                              </option>
                            ))
                          : banks.map((x) => (
                              <option value={{ name: x.name, code: x.code }}>
                                {x.name}
                              </option>
                            ))}
                      </select>
                    </div>
                  </div>
                  {errorInput.bankName && (
                    <div className="text-[red]">{errorInput.bankName}</div>
                  )}
                  <div className="text-malon-color">
                    Note: This cannot be change once saved, contact support to
                    make any changes.
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
                  The provided address may be use for return should there be a
                  need. This address is not displayed to buyers.
                </p>
                <div className="flex flex-col mt-2.5">
                  <label className="text-sm">Street</label>
                  <input
                    className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                    name="street"
                    type="text"
                    onChange={(e) => handleOnChange(e.target.value, "street")}
                    onFocus={() => handleError("", "street")}
                  />
                </div>
                {errorInput.street && (
                  <div className="text-[red]">{errorInput.street}</div>
                )}
                <div className="flex flex-col mt-2.5">
                  <label className="text-sm">Apartment/Complex</label>
                  <input
                    className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                    name="apartment"
                    type="text"
                    onChange={(e) =>
                      handleOnChange(e.target.value, "apartment")
                    }
                    onFocus={() => handleError("", "apartment")}
                  />
                </div>
                {errorInput.apartment && (
                  <div className="text-[red]">{errorInput.apartment}</div>
                )}
                <div className="flex flex-col mt-2.5">
                  <label className="text-sm">
                    {region() === "NGN" ? "State" : "Province"}
                  </label>
                  <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                    <select
                      value={input.state}
                      onChange={(e) => handleOnChange(e.target.value, "state")}
                      onFocus={() => handleError("", "state")}
                      className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    >
                      {region() === "NGN"
                        ? states.Nigeria.map((x) => (
                            <option value={x}>{x}</option>
                          ))
                        : states.SouthAfrican.map((x) => (
                            <option value={x}>{x}</option>
                          ))}
                    </select>
                  </div>
                </div>
                {errorInput.state && (
                  <div className="text-[red]">{errorInput.state}</div>
                )}
                <div className="flex flex-col mt-2.5">
                  <label className="text-sm">Zip Code</label>
                  <input
                    className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
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
        {/* take  */}
        <div className="flex-[2] ml-5 p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
          <span className="text-[22px] font-semibold">Edit</span>
          <form
            className="flex justify-between mt-5 lg:flex-row flex-col lg:gap-0 lg:w-auto gap-5 w-full"
            onSubmit={submitHandler}
          >
            <div>
              <div className="flex flex-col mt-2.5 ml-0">
                <label className="text-sm">Username</label>
                {+daydiff > 0 && (
                  <div className="text-xs text-malon-color">
                    updated {moment(user.usernameLastUpdate).fromNow()}, next
                    update in {daydiff} days
                  </div>
                )}
                <input
                  className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                  disabled={+daydiff > 0}
                  placeholder={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-2.5">
                <label className="text-sm">First Name</label>
                <input
                  className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                  placeholder={user.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex flex-col mt-2.5">
                <label className="text-sm">Last Name</label>
                <input
                  className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                  placeholder={user.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-2.5">
                <label className="text-sm">Email</label>
                <input
                  className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                  name="email"
                  type="email"
                  disabled={id ? false : true}
                  placeholder={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-2.5">
                <label className="text-sm">DOB</label>
                <input
                  className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                  type="date"
                  name="DOB"
                  placeholder={user.dob && user.dob.toString().substring(0, 10)}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-2.5">
                <label className="text-sm">Phone</label>
                <input
                  className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                  type="text"
                  name="phone"
                  placeholder={user.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-2.5">
                <label className="text-sm">About</label>
                <textarea
                  className="h-[100px] p-2.5 focus-visible:border focus-visible:border-orange-color bg-transparent focus-visible:text-black dark:focus-visible:text-white"
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Write a creative short description about yourself or what your store offers, including promos, response & delivery turn around time. This is attractive to buyers"
                >
                  {user.about}
                </textarea>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                {loadingUpload ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <img
                    className="w-[100px] h-[100px] object-cover mr-5 rounded-[10px]"
                    src={
                      image
                        ? image
                        : user.image
                        ? user.image
                        : "/images/pimage.png"
                    }
                    alt=""
                  />
                )}
                <label htmlFor="file">
                  <FaCamera className="cursor-pointer" />
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="file"
                  onChange={(e) => uploadHandler(e)}
                />
              </div>
              <div>
                {id && userInfo?.isAdmin ? (
                  <>
                    <label className="text-sm">Active</label>
                    <div className="text-sm text-malon-color">
                      updated {moment(user.activeLastUpdate).fromNow()}
                    </div>
                    <div className="flex items-center">
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                        after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                        checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                        checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                        after:bg-white dark:after:bg-black`}
                        checked={active === "true"}
                        type="radio"
                        name="gender"
                        id="yes"
                        onChange={(e) => setActive(e.target.value)}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="yes"
                      >
                        Yes
                      </label>
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                        after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                        checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                        checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                        after:bg-white dark:after:bg-black`}
                        checked={active === "false"}
                        type="radio"
                        name="gender"
                        id="no"
                        onClick={(e) => setActive(e.target.value)}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="no"
                      >
                        No
                      </label>
                    </div>
                    <label className="text-sm">Badge</label>
                    <div className="flex items-center">
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                        after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                        checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                        checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                        after:bg-white dark:after:bg-black`}
                        checked={badge === "true"}
                        type="radio"
                        name="badge"
                        id="badgeyes"
                        onClick={(e) => setBadge(e.target.value)}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="badgeyes"
                      >
                        Yes
                      </label>
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                        after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                        checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                        checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                        after:bg-white dark:after:bg-black`}
                        checked={badge === "false"}
                        type="radio"
                        name="badge"
                        id="badgeno"
                        onChange={(e) => setBadge(e.target.value)}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="badgeno"
                      >
                        No
                      </label>
                    </div>
                    <label className="text-sm">Influencer</label>
                    <div className="flex items-center">
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                        after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                        checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                        checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                        after:bg-white dark:after:bg-black`}
                        checked={influencer === "true"}
                        type="radio"
                        name="influencer"
                        id="influenceryes"
                        onClick={(e) => setInfluencer(e.target.value)}
                        value={"adsdssfd"}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="influenceryes"
                      >
                        Yes
                      </label>
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                        after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                        checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                        checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                        after:bg-white dark:after:bg-black`}
                        checked={influencer === "false"}
                        type="radio"
                        name="influencer"
                        id="influencerno"
                        onChange={(e) => setInfluencer(e.target.value)}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="influencerno"
                      >
                        No
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col mt-2.5">
                      <label className="text-sm">Password</label>
                      <input
                        className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col mt-2.5">
                      <label className="text-sm">Confirm Password</label>
                      <input
                        className="w-[250px] h-[30px] pl-2.5 border-none focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between mx-0 my-2">
                      <label className="text-sm">Subscribe to Newsletter</label>
                      <input
                        className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                      before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                      appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                        type="checkbox"
                        id="darkmodeSwitch"
                        role="switch"
                        checked={newsletterStatus}
                        onChange={handleNewsletter}
                      />
                    </div>
                    <div className="my-2.5 mx-0">
                      <div className="flex justify-between mx-0 my-2">
                        <label className="text-sm">
                          <FaTruck />
                          <span className="font-semibold">Re:Bundle</span>
                          <div
                            className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[-180px] hover:after:text-justify 
              hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
              lg:hover:after:top-5 hover:after:text-[11px] hover:after:left-[-90px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-white-color
              hover:after:dark:bg-black hover:after:text-black dark:hover:after:text-white 
              hover:after:content-["Re:bundle allows buyers to shop multiple items from your store and only pay for delivery once! The buyer will be charged delivery on their first purchase, and, if they make any additional purchases within the next 2 hours, free delivery will then automatically apply. Shops who enable bundling sell more and faster."]`}
                          >
                            <FaQuestionCircle className="text-neutral-300 ml-2.5" />
                          </div>
                        </label>
                        <input
                          className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                        before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                        appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                          checked={rebundleStatus}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRebundleStatus(e.target.checked)
                            } else {
                              setRebundleStatus(e.target.checked)
                              handleRebundle({ status: false, count: 0 })
                            }
                          }}
                        />
                      </div>
                      <div className="w-full h-px bg-[#d4d4d4]" />
                      {rebundleStatus && (
                        <div>
                          {bundle ? (
                            <div>
                              <FaCheck className="text-orange-color" />
                            </div>
                          ) : (
                            <>
                              <div className="text-[11px]">
                                Please input numbers of how many item(s) you are
                                willing to pack in delivery bag(s) for a buyer
                                when Rebundle is active
                              </div>
                              <div className="flex items-center justify-between mx-0 my-2">
                                <input
                                  className="w-full h-[30px] border mr-[5] pl-2.5 placeholder:text-sm focus:outline-none bg-transparent text-black dark:text-white focus:border-orange-color"
                                  type="number"
                                  onChange={(e) =>
                                    setRebundleCount(+e.target.value)
                                  }
                                  onFocus={() => setRebundleError("")}
                                />
                                {loadingRebundle ? (
                                  <LoadingBox />
                                ) : (
                                  <div
                                    className="cursor-pointer text-white-color px-[7px] py-[5px] rounded-[0.2rem] bg-orange-color hover:bg-malon-color"
                                    onClick={() => handleRebundle(null)}
                                  >
                                    Activate
                                  </div>
                                )}
                              </div>
                              {rebundleError && (
                                <div className="text-[red]">
                                  {rebundleError}
                                </div>
                              )}
                            </>
                          )}
                          <Link
                            to="/rebundle"
                            target="_blank"
                            className="text-orange-color underline"
                          >
                            More on Re:bundle
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <button
                className="cursor-pointer text-white-color bg-orange-color mt-[5px] p-[5px] rounded-[0.2rem] border-none"
                type="submit"
              >
                Update
              </button>
              {loadingUpdate ? <LoadingBox /> : ""}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default User
