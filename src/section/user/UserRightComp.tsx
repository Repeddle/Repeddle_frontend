import { ChangeEvent, FormEvent, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import { Link } from "react-router-dom"
import { FaCamera, FaCheck, FaQuestionCircle, FaTruck } from "react-icons/fa"
import moment from "moment"
import useAuth from "../../hooks/useAuth"
import { IUser } from "../../types/user"
import { timeDifference } from "../../utils/common"
import { UserFormType } from "../../pages/protected/dashboard/User"

type Props = {
  user: IUser
  id?: string
  submitHandler: (e: FormEvent) => void
  userForm: UserFormType
  handleOnUserChange: (val: string, key: keyof UserFormType) => void
  loadingUpload: boolean
  loadingUpdate: boolean
  uploadHandler: (e: ChangeEvent<HTMLInputElement>) => void
  handleNewsletter: (e: ChangeEvent) => void
  newsletterStatus: boolean
  rebundleStatus: boolean
  handleRebundle: (val: { status: boolean; count: number } | null) => void
  setRebundleStatus: (val: boolean) => void
  loadingRebundle?: boolean
  rebundleError?: string
  setRebundleError: (val: string) => void
  setRebundleCount: (val: number) => void
  bundle: string
}

const UserRightComp = ({
  user,
  id,
  handleOnUserChange,
  loadingUpdate,
  loadingUpload,
  submitHandler,
  uploadHandler,
  userForm,
  handleNewsletter,
  newsletterStatus,
  setRebundleStatus,
  rebundleStatus,
  handleRebundle,
  setRebundleCount,
  setRebundleError,
  loadingRebundle,
  rebundleError,
  bundle,
}: Props) => {
  const { user: userInfo } = useAuth()

  const [passwordType, setPasswordType] = useState("password")

  const daydiff =
    (user.usernameLastUpdate &&
      30 - timeDifference(new Date(user.usernameLastUpdate), new Date())) ??
    0

  return (
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
                updated {moment(user.usernameLastUpdate).fromNow()}, next update
                in {daydiff} days
              </div>
            )}
            <input
              className="w-[250px] h-[30px] pl-2.5 bg-transparent focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
              disabled={+daydiff > 0}
              placeholder={user.username}
              onChange={(e) => handleOnUserChange(e.target.value, "username")}
            />
          </div>
          <div className="flex flex-col mt-2.5">
            <label className="text-sm">First Name</label>
            <input
              className="w-[250px] h-[30px] pl-2.5 bg-transparent focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
              placeholder={user.firstName}
              onChange={(e) => handleOnUserChange(e.target.value, "firstName")}
            />
          </div>

          <div className="flex flex-col mt-2.5">
            <label className="text-sm">Last Name</label>
            <input
              className="w-[250px] h-[30px] pl-2.5 bg-transparent focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
              placeholder={user.lastName}
              onChange={(e) => handleOnUserChange(e.target.value, "lastName")}
            />
          </div>
          <div className="flex flex-col mt-2.5">
            <label className="text-sm">Email</label>
            <input
              className="w-[250px] h-[30px] pl-2.5 bg-transparent focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
              name="email"
              type="email"
              disabled={id ? false : true}
              placeholder={user.email}
              onChange={(e) => handleOnUserChange(e.target.value, "email")}
            />
          </div>
          <div className="flex flex-col mt-2.5">
            <label className="text-sm">DOB</label>
            <input
              className="w-[250px] h-[30px] pl-2.5 bg-transparent focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
              type="date"
              name="DOB"
              placeholder={user.dob && user.dob.toString().substring(0, 10)}
              onChange={(e) => handleOnUserChange(e.target.value, "dob")}
              value={userForm.dob}
            />
          </div>
          <div className="flex flex-col mt-2.5">
            <label className="text-sm">Phone</label>
            <input
              className="w-[250px] h-[30px] pl-2.5 bg-transparent focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
              type="text"
              name="phone"
              placeholder={user.phone}
              onChange={(e) => handleOnUserChange(e.target.value, "phone")}
            />
          </div>
          <div className="flex flex-col mt-2.5">
            <label className="text-sm">About</label>
            <textarea
              className="h-[100px] p-2.5 focus-visible:border focus-visible:border-orange-color bg-transparent focus-visible:text-black dark:focus-visible:text-white"
              onChange={(e) => handleOnUserChange(e.target.value, "about")}
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
                  userForm.image
                    ? userForm.image
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
            {id && userInfo?.role === "Admin" ? (
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
                    checked={userForm.active === "true"}
                    type="radio"
                    name="gender"
                    id="yes"
                    onChange={() => handleOnUserChange("true", "active")}
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
                    checked={userForm.active === "false"}
                    type="radio"
                    name="gender"
                    id="no"
                    onClick={() => handleOnUserChange("false", "active")}
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
                    checked={userForm.badge === "true"}
                    type="radio"
                    name="badge"
                    id="badgeyes"
                    onClick={() => handleOnUserChange("true", "badge")}
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
                    checked={userForm.badge === "false"}
                    type="radio"
                    name="badge"
                    id="badgeno"
                    onChange={() => handleOnUserChange("false", "badge")}
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
                    checked={userForm.influencer === "true"}
                    type="radio"
                    name="influencer"
                    id="influenceryes"
                    onClick={() => handleOnUserChange("true", "influencer")}
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
                    checked={userForm.influencer === "false"}
                    type="radio"
                    name="influencer"
                    id="influencerno"
                    onChange={() => handleOnUserChange("false", "influencer")}
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
                    className="w-[250px] h-[30px] pl-2.5 bg-transparent focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                    name="password"
                    type={passwordType}
                    value={userForm.password}
                    onChange={(e) =>
                      handleOnUserChange(e.target.value, "password")
                    }
                  />
                </div>
                <div className="flex flex-col mt-2.5">
                  <label className="text-sm">Confirm Password</label>
                  <input
                    className="w-[250px] h-[30px] pl-2.5 bg-transparent focus:outline-none placeholder:text-xs border-b-light-ev3 text-black dark:text-white dark:border-b-dark-ev3 border-b focus:border-b-orange-color focus:border-b"
                    name="confirmPassword"
                    type={passwordType}
                    onChange={(e) =>
                      handleOnUserChange(e.target.value, "confirmPassword")
                    }
                  />
                </div>
                <div className="flex justify-between mx-0 my-2">
                  <label className="text-sm">Subscribe To Newsletter</label>
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
                    <label className="text-sm flex items-center gap-1.5">
                      <FaTruck />
                      <span className="font-semibold">Re:Bundle</span>
                      <div
                        data-content="Re:bundle allows buyers to shop multiple items from your store and only pay for delivery once! The buyer will be charged delivery on their first purchase, and, if they make any additional purchases within the next 2 hours, free delivery will then automatically apply. Shops who enable bundling sell more and faster."
                        className={`relative lg:hover:after:w-[430px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-[13px] hover:after:z-[2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:leading-tight hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                      >
                        <FaQuestionCircle className="text-neutral-300" />
                      </div>
                    </label>
                    <input
                      className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                      checked={rebundleStatus}
                      type="checkbox"
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
                            willing to pack in delivery bag(s) for a buyer when
                            Rebundle is active
                          </div>
                          <div className="flex items-center justify-between mx-0 my-2">
                            <input
                              className="w-full h-[30px] border mr-[5] pl-2.5 placeholder:text-sm focus:outline-none bg-transparent text-black dark:text-white focus:border-orange-color"
                              type="number"
                              onChange={(e) =>
                                setRebundleCount(parseInt(e.target.value))
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
                            <div className="text-[red]">{rebundleError}</div>
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
  )
}

export default UserRightComp
