import { useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Link } from "react-router-dom";
import { FaGlobe, FaLink, FaPen, FaTag, FaUser } from "react-icons/fa";
import ReviewLists from "../../components/ReviewLists";
import WriteReview from "./WriteReview";
import RebundlePoster from "../../components/RebundlePoster";
import { FaLocationDot } from "react-icons/fa6";
import Report from "../product/Report";
import Rating from "../../components/Rating";
import { UserByUsername } from "../../types/user";
import Modal from "../../components/ui/Modal";
import useAuth from "../../hooks/useAuth";

type Props = {
  loadingUser: boolean;
  error?: string | null;
  usernameData?: UserByUsername;
};

const SellerLeft = ({ loadingUser, error, usernameData }: Props) => {
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);

  const { user: userInfo } = useAuth();

  const isOnlineCon = (c: string) => {
    console.log(c);
    return false;
  };

  console.log(usernameData);

  const toggleFollow = () => {};

  const handleReport = (id: string) => {
    console.log(id);
  };

  const handleShare = () => {};

  const addConversation = (id: string, type: string) => {
    console.log(id, type);
  };

  return (
    <div className="flex-[2]">
      {loadingUser ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox className="text-red-500">{error}</MessageBox>
      ) : (
        usernameData?.user && (
          <div>
            <div className="relative flex flex-col items-center mb-2.5 px-[15px] py-0 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
              <div className="relative">
                <img
                  src={usernameData.user.image}
                  className="relative w-[150px] h-[150px] object-cover object-top mt-[60px] rounded-[50%]"
                  alt={usernameData.user.username}
                />
                <div className="absolute rounded-[50%] right-2.5 bottom-[25px]">
                  {usernameData.user.badge && (
                    <img
                      className="w-5 object-cover"
                      src="https://res.cloudinary.com/emirace/image/upload/v1661148671/Icons-28_hfzerc.png"
                    />
                  )}
                </div>
              </div>
              <Link to="/dashboard/user">
                {userInfo && userInfo._id === usernameData.user._id && (
                  <FaPen className="absolute left-[30px] top-[30px]" />
                )}
              </Link>
              {isOnlineCon(usernameData.user._id) ? (
                <div className="border-orange-color text-orange-color absolute capitalize px-2.5 py-0 rounded-[15px] border-[0.1rem]  right-[30px] top-[30px]">
                  online
                </div>
              ) : (
                <div className="border-gray-500 text-gray-500 absolute capitalize px-2.5 py-0 rounded-[15px] border-[0.1rem]  right-[30px] top-[30px]">
                  offline
                </div>
              )}
              <div className="font-bold mt-2.5">
                @{usernameData.user.username}
              </div>
              <div className="w-full flex justify-around mx-0 my-2.5">
                <div className="flex">
                  <div className="font-bold mr-[5px]">
                    {usernameData.user.followers &&
                      usernameData.user.followers.length}
                  </div>
                  <div className="">Followers</div>
                </div>
                <div className="flex">
                  <div className="font-bold mr-[5px]">
                    {usernameData.user.following &&
                      usernameData.user.following.length}
                  </div>
                  <div className="">Following</div>
                </div>
                {userInfo && userInfo._id !== usernameData.user._id && (
                  <button
                    type="button"
                    onClick={toggleFollow}
                    className="w-[72px] text-white-color text-sm px-[5px] py-0 rounded-[5px] border-none bg-orange-color"
                  >
                    {userInfo &&
                    usernameData.user.followers &&
                    usernameData.user.followers.find((x) => x === userInfo._id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setShowModel(!showModel)}
              >
                <Rating
                  rating={usernameData.user.rating ?? 0}
                  numReviews={usernameData.user.numReviews}
                />
              </div>
              {userInfo && usernameData.user.buyers?.includes(userInfo._id) && (
                <div
                  className="cursor-pointer"
                  onClick={() => setShowWriteReview(true)}
                >
                  Leave a review
                </div>
              )}

              <Modal isOpen={showModel} onClose={() => setShowModel(false)}>
                <ReviewLists setShowModel={setShowModel} />
              </Modal>
              <Modal
                isOpen={showWriteReview}
                onClose={() => setShowWriteReview(false)}
              >
                <WriteReview
                  userId={usernameData.user._id}
                  setShowModel={setShowWriteReview}
                />
              </Modal>
              <button
                className="flex items-center border-none my-2.5 mx-0 bg-none"
                onClick={handleShare}
              >
                <div className="cursor-pointer underline text-malon-color">
                  {window.location.hostname}
                  {usernameData.user.region === "NGN" ? "/ng/" : "/za/"}
                  {usernameData.user.username}
                </div>
                <FaLink className="ml-[5px] text-base cursor-pointer text-malon-color" />
              </button>
              <button
                onClick={() => addConversation(usernameData.user._id, "user")}
                type="button"
                className="w-full text-white-color mb-5 px-0 py-1 rounded-[5px] border-0 bg-orange-color"
              >
                Message Me
              </button>
              {usernameData.user?.rebundle?.status && <RebundlePoster />}
              <div className="border-t-border-color w-full mt-[5px] px-0 py-[15px] border-t ">
                <div className="flex justify-between mb-2.5">
                  <div className="flex items-center">
                    <FaTag className="mr-2.5 text-[15px]" /> Sold
                  </div>
                  <div className="font-bold">
                    {usernameData.products.sold &&
                    usernameData.products.sold.length < 5
                      ? "< 5"
                      : usernameData.products.sold.length}
                  </div>
                </div>

                <div className="flex justify-between mb-2.5">
                  <div className="flex items-center">
                    <FaUser className="mr-2.5 text-[15px]" /> Member since
                  </div>
                  <div className="font-bold">
                    {usernameData.user.createdAt &&
                      usernameData.user.createdAt.toString().substring(0, 10)}
                  </div>
                </div>
                <div className="flex justify-between mb-2.5">
                  <div className="flex items-center">
                    <FaLocationDot className="mr-2.5 text-[15px]" /> From
                  </div>
                  <div className="font-bold">
                    {usernameData.user.region === "NGN"
                      ? "Nigeria"
                      : "South Africa"}
                  </div>
                </div>
                <div className="flex justify-between mb-2.5">
                  <div className="flex items-center">
                    <FaGlobe className="mr-2.5 text-[15px]" /> Language
                  </div>
                  <div className="font-bold">English</div>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col items-center mb-2.5 px-[15px] py-0 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
              <div className="w-full mt-[5px] px-0 py-[15px] border-none">
                <div className="font-bold mb-[15px]">About</div>
                <div className="">{usernameData.user?.about}</div>
              </div>
            </div>
            <button
              onClick={() => handleReport(usernameData.user._id)}
              type="button"
              className="w-full text-malon-color border border-malon-color mx-0 my-2.5 px-0 py-1 rounded-[5px]"
            >
              Report Seller
            </button>
            <Modal
              isOpen={showLoginModel}
              onClose={() => setShowLoginModel(false)}
            >
              <Report reportedUser={usernameData.user._id} />
            </Modal>
          </div>
        )
      )}
    </div>
  );
};

export default SellerLeft;
