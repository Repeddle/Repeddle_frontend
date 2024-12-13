import { useState } from "react"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import useAuth from "../hooks/useAuth"
import { IReview } from "../types/product"
import MessageBox from "./MessageBox"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa"
import moment from "moment"
import { imageUrl } from "../services/api"

type Props = {
  setShowModel: (val: boolean) => void
  reviews?: IReview[]
}

const ReviewLists = ({ setShowModel, reviews }: Props) => {
  return (
    <div className="p-[30px]">
      <div className="text-3xl font-bold mb-5">Reviews</div>
      <div className="mb-5">
        {!reviews || reviews.length === 0 ? (
          <MessageBox>There is no reviews</MessageBox>
        ) : (
          reviews.map((item) => (
            <ReviewItem item={item} setShowModel={setShowModel} />
          ))
        )}
      </div>
    </div>
  )
}

type ReviewItemProps = {
  setShowModel: (val: boolean) => void
  item: IReview
}

const ReviewItem = ({ setShowModel, item }: ReviewItemProps) => {
  const { user } = useAuth()
  // const { replyProductComment } = useProducts()
  // const { addNotification } = useToastNotification()

  const [replyText, setReplyText] = useState("")
  const [replyVisible, setReplyVisible] = useState(false)
  const [currentReview] = useState(item)
  const [loading, setLoading] = useState(false)

  const handleReply = () => {
    setReplyVisible(true)
  }

  const handleReplySubmit = async () => {
    try {
      // if (!replyText) {
      //   addNotification("Enter a reply",)
      //   return
      // }

      setLoading(true)

      //   const { data } = await axios.put(
      //     `/api/reviews/${item._id}`,
      //     { comment: replyText },
      //     {
      //       headers: { Authorization: `Bearer ${userInfo.token}` },
      //     }
      //   )
      //   setCurrentReview(data)
      //   setReplyText("")
      //   setReplyVisible(false)
      //   ctxDispatch({
      //     type: "SHOW_TOAST",
      //     payload: {
      //       message: "Reply submitted successfully",
      //       showStatus: true,
      //       state1: "visible1 success",
      //     },
      //   })
      //   socket.emit("post_data", {
      //     userId: currentReview.buyerId._id,
      //     itemId: currentReview._id,
      //     notifyType: "review",
      //     msg: `${userInfo.username} responded to your review`,
      //     mobile: { path: "MyAccount", id: currentReview.sellerId._id },
      //     link: `/seller/${currentReview.sellerId._id}`,
      //     userImage: userInfo.image,
      //   })
      //   setLoading(false)
    } catch (error) {
      //   ctxDispatch({
      //     type: "SHOW_TOAST",
      //     payload: {
      //       message: getError(error),
      //       showStatus: true,
      //       state1: "visible1 error",
      //     },
      //   })
    }
  }

  return (
    <div className="flex items-start mb-5 p-4">
      <div className="flex items-center flex-col justify-center mr-2.5">
        <Link
          to={`/seller/${currentReview?.user?.username}`}
          onClick={() => setShowModel(false)}
        >
          <img
            className="w-[50px] h-[50px] mr-0 rounded-[25px]"
            src={imageUrl + currentReview?.user?.image}
            alt="Reviewer"
          />
        </Link>
        <div className="flex flex-col justify-center items-center">
          <Link
            to={`/seller/${currentReview?.user?.username}`}
            onClick={() => setShowModel(false)}
          >
            <div className="font-bold text-base text-malon-color">
              {currentReview?.user?.username}
            </div>
          </Link>
          <div className="text-xs text-[#999999]">
            {moment(currentReview.createdAt).fromNow()}
          </div>
        </div>
      </div>
      <div className="flex-1 ml-4">
        <div className="flex items-center">
          <Rating rating={currentReview.rating} caption=" " />
          {currentReview.like ? (
            <FaThumbsUp className="ml-[30px]" color="#eb9f40" size={"lg"} />
          ) : (
            <FaThumbsDown className="ml-[30px]" color="red" size={"lg"} />
          )}
        </div>
        <div className="text-sm mb-2">{currentReview.comment}</div>
        // TODO:
        {/* {currentReview.sellerReply && ( */}
        {currentReview.user && (
          <div className=" mb-2 p-2 rounded-[5px] bg-light-ev2 dark:bg-dark-ev2">
            <div
              className="flex items-center mb-[5px]"
              onClick={() => setShowModel(false)}
            >
              <img
                className="w-5 h-5 mr-2.5 rounded-[25px]"
                // TODO:
                // src={currentReview?.sellerId?.image}
                src={imageUrl + currentReview?.user?.image}
                alt="Reviewer"
              />
              <div className="text-xs text-malon-color">
                // TODO:
                {/* {currentReview?.sellerId?.username} */}
                {currentReview?.user?.username}
              </div>
            </div>
            // TODO:
            {/* {currentReview.sellerReply} */}
            {currentReview.comment}
          </div>
        )}
        {!replyVisible &&
          // TODO:
          //   !currentReview.sellerReply &&
          //   user?._id === currentReview?.sellerId?._id && (
          !currentReview.comment &&
          user?._id === currentReview?.user?._id && (
            <div
              className="bg-orange-color items-center justify-center text-white font-bold text-sm px-4 py-2 rounded-[5px] border-0"
              onClick={handleReply}
            >
              Reply
            </div>
          )}
        {replyVisible && (
          <div className="mt-2.5">
            <textarea
              className="max-h-[100px] mb-2.5 p-2 placeholder:text-gray-500 rounded-lg bg-light-ev2 dark:bg-dark-ev2 text-black dark:text-white"
              placeholder="Type your reply"
              onChange={(e) => setReplyText(e.target.value)}
              value={replyText}
            />
            <button
              className="items-center justify-center text-white font-bold text-sm px-4 py-2 rounded-[5px] border-0 bg-orange-color"
              onClick={handleReplySubmit}
              disabled={loading}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewLists
