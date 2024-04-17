import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import ModelLogin from "../../components/ModelLogin"
import LoadingBox from "../../components/LoadingBox"
import MessageBox from "../../components/MessageBox"
import { productDetails, user } from "../../utils/data"
import useAuth from "../../hooks/useAuth"
import { FaGlobe, FaLink, FaPen, FaTag, FaUser } from "react-icons/fa"
import Rating from "../../components/Rating"
import RebundlePoster from "../../components/RebundlePoster"
import { FaLocationDot } from "react-icons/fa6"
import { IProduct } from "../../types/product"
import SellerTabItems from "../../section/seller/SellerTabItems"
import Report from "../../section/product/Report"
import ReviewLists from "../../components/ReviewLists"
import WriteReview from "../../section/seller/WriteReview"

const tabs = ["all", "selling", "sold", "liked"] as const
type DisplayTabs = (typeof tabs)[number] | "saved"

const Seller = () => {
  const [displayTab, setDisplayTab] = useState<DisplayTabs>("all")
  const [showLoginModel, setShowLoginModel] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const [showWriteReview, setShowWriteReview] = useState(false)

  const [searchParams] = useSearchParams()
  const page = useMemo(() => +(searchParams.get("page") ?? 1), [searchParams])

  const loadingUser = false
  const loading = false
  const error = null
  const products: IProduct[] = [productDetails]
  const pages = 0

  const { user: userInfo } = useAuth()

  const isOnlineCon = (c: string) => {
    console.log(c)
    return false
  }

  const toggleFollow = () => {}

  const getFilterUrl = (filter: { page: number }) => {
    const filterPage = filter.page || page
    return `?page=${filterPage}`
  }

  const handleReport = (id: string) => {
    console.log(id)
  }

  const handleShare = () => {}

  const addConversation = (id: string, type: string) => {
    console.log(id, type)
  }

  return (
    <div className="flex lg:mx-[1vw] lg:my-0 lg:flex-row flex-col mx-2.5 my-[30px]">
      <div className="flex-[2]">
        {loadingUser ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox className="text-red-500">{error}</MessageBox>
        ) : (
          <>
            <div className="relative flex flex-col items-center mb-2.5 px-[15px] py-0 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
              <div className="relative">
                <img
                  src={user.image}
                  className="relative w-[150px] h-[150px] object-cover object-top mt-[60px] rounded-[50%]"
                  alt={user.username}
                />
                <div className="absolute rounded-[50%] right-2.5 bottom-[25px]">
                  {user.badge && (
                    <img
                      className="w-5 object-cover"
                      src="https://res.cloudinary.com/emirace/image/upload/v1661148671/Icons-28_hfzerc.png"
                    />
                  )}
                </div>
              </div>
              <Link to="/dashboard/user">
                {userInfo && userInfo._id === user._id && (
                  <FaPen className="absolute left-[30px] top-[30px]" />
                )}
              </Link>
              {isOnlineCon(user._id) ? (
                <div className="border-orange-color text-orange-color absolute capitalize px-2.5 py-0 rounded-[15px] border-[0.1rem] border-solid right-[30px] top-[30px]">
                  online
                </div>
              ) : (
                <div className="border-gray-500 text-gray-500 absolute capitalize px-2.5 py-0 rounded-[15px] border-[0.1rem] border-solid right-[30px] top-[30px]">
                  offline
                </div>
              )}
              <div className="font-bold mt-2.5">@{user.username}</div>
              <div className="w-full flex justify-around mx-0 my-2.5">
                <div className="flex">
                  <div className="font-bold mr-[5px]">
                    {user.followers && user.followers.length}
                  </div>
                  <div className="">Followers</div>
                </div>
                <div className="flex">
                  <div className="font-bold mr-[5px]">
                    {user.following && user.following.length}
                  </div>
                  <div className="">Following</div>
                </div>
                {userInfo && userInfo._id !== user._id && (
                  <button
                    type="button"
                    onClick={toggleFollow}
                    className="seller_follow_btn"
                  >
                    {userInfo &&
                    user.followers &&
                    user.followers.find((x) => x === userInfo._id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="pointer" onClick={() => setShowModel(!showModel)}>
                <Rating rating={user.rating} numReviews={user.numReviews} />
              </div>
              {userInfo && user.buyers.includes(userInfo._id) && (
                <div
                  className="cursor-pointer"
                  onClick={() => setShowWriteReview(true)}
                >
                  Leave a review
                </div>
              )}

              <ModelLogin showModel={showModel} setShowModel={setShowModel}>
                <ReviewLists setShowModel={setShowModel} />
              </ModelLogin>
              <ModelLogin
                showModel={showWriteReview}
                setShowModel={setShowWriteReview}
              >
                <WriteReview
                  userId={user._id}
                  setShowModel={setShowWriteReview}
                />
              </ModelLogin>
              <button
                className="flex items-center border-none my-2.5 mx-0 bg-none"
                onClick={handleShare}
              >
                <div className="cursor-pointer underline text-malon-color">
                  {window.location.hostname}
                  {user.region === "NGN" ? "/ng/" : "/za/"}
                  {user.username}
                </div>
                <FaLink
                  className="ml-[5px] cursor-pointer text-malon-color"
                  size="sm"
                />
              </button>
              <button
                onClick={() => addConversation(user._id, "user")}
                type="button"
                className="w-full text-white-color mb-5 px-0 py-1 rounded-[5px] border-0 bg-orange-color"
              >
                Message Me
              </button>
              {user.rebundle.status && <RebundlePoster />}
              <div className="border-t-border-color w-full mt-[5px] px-0 py-[15px] border-t border-solid">
                <div className="flex justify-between mb-2.5">
                  <div>
                    <FaTag className="mr-2.5" /> Sold
                  </div>
                  <div className="font-bold">
                    {user.sold && user.sold.length < 5
                      ? "< 5"
                      : user?.sold?.length}
                  </div>
                </div>

                <div className="flex justify-between mb-2.5">
                  <div>
                    <FaUser className="mr-2.5" /> Member since
                  </div>
                  <div className="font-bold">
                    {user.createdAt &&
                      user.createdAt.toString().substring(0, 10)}
                  </div>
                </div>
                <div className="flex justify-between mb-2.5">
                  <div>
                    <FaLocationDot className="mr-2.5" /> From
                  </div>
                  <div className="font-bold">
                    {user.region === "NGN" ? "Nigeria" : "South Africa"}
                  </div>
                </div>
                <div className="flex justify-between mb-2.5">
                  <div>
                    <FaGlobe className="mr-2.5" /> Language
                  </div>
                  <div className="font-bold">English</div>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col items-center mb-2.5 px-[15px] py-0 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
              <div className="w-full mt-[5px] px-0 py-[15px] border-none">
                <div className="font-bold mt-[15px]">About</div>
                <div className="">{user.about}</div>
              </div>
            </div>
            <button
              onClick={() => handleReport(user._id)}
              type="button"
              className="w-full text-malon-color border border-malon-color mx-0 my-2.5 px-0 py-1 rounded-[5px]"
            >
              Report Seller
            </button>
            <ModelLogin
              showModel={showLoginModel}
              setShowModel={setShowLoginModel}
            >
              <Report reportedUser={user._id} />
            </ModelLogin>
          </>
        )}
      </div>
      <div className="flex-[7] lg:mx-[15px] lg:my-0 m-0">
        <div className="flex justify-center mb-[5px] rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
          {tabs.map((tab) => (
            <div
              className={`flex justify-center cursor-pointer relative capitalize min-w-[70px] m-2.5 hover:text-orange-color ${
                displayTab === tab
                  ? "text-orange-color font-bold after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:-bottom-2.5 after:bg-orange-color"
                  : ""
              }`}
              key={tab}
              onClick={() => setDisplayTab(tab)}
            >
              All
            </div>
          ))}
          {userInfo && userInfo._id === user._id && (
            <div
              className={`flex justify-center cursor-pointer relative capitalize min-w-[70px] m-2.5 hover:text-orange-color ${
                displayTab === "saved"
                  ? "text-orange-color font-bold after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:-bottom-2.5 after:bg-orange-color"
                  : ""
              }`}
              onClick={() => setDisplayTab("saved")}
            >
              Saved
            </div>
          )}
        </div>

        <SellerTabItems
          displayTab={displayTab}
          loading={loading}
          products={products}
          user={user}
          error={error}
        />

        <div className="flex gap-2.5 justify-center items-center mt-5">
          {page > 1 && (
            <Link to={getFilterUrl({ page: page - 1 })}>
              <div className="border w-[100px] text-center font-medium p-1 rounded-[0.2rem] hover:bg-light-ev3 dark:hover:bg-dark-ev2">
                Previous
              </div>
            </Link>
          )}
          {pages > 1 && products.length === 40 && (
            <Link to={getFilterUrl({ page: page + 1 })}>
              <div className="border w-[100px] text-center font-medium p-1 rounded-[0.2rem] hover:bg-light-ev3 dark:hover:bg-dark-ev2">
                Next
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Seller
