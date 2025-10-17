import { useState } from "react"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import useAuth from "../hooks/useAuth"
import { IReview } from "../types/product"
import MessageBox from "./MessageBox"
import { FaThumbsDown, FaThumbsUp, FaEdit, FaTrash } from "react-icons/fa"
import moment from "moment"
import { imageUrl } from "../services/api"
import useReviews from "../hooks/useReviews"
import useToastNotification from "../hooks/useToastNotification"

type Props = {
  setShowModel: (val: boolean) => void
  reviews?: IReview[]
  onEditReview?: (review: IReview) => void
  linkToSeller?: string
}

const ReviewLists = ({
  setShowModel,
  reviews,
  onEditReview,
  linkToSeller,
}: Props) => {
  return (
    <div className="p-[30px]">
      <div className="text-3xl font-bold mb-5">Reviews</div>
      {linkToSeller && (
        <div className="text-sm text-gray-500 mb-5">
          <Link to={linkToSeller}>Leave a Review</Link>
        </div>
      )}
      <div className="mb-5">
        {!reviews || reviews.length === 0 ? (
          <MessageBox>There is no reviews</MessageBox>
        ) : (
          reviews.map((item) => (
            <ReviewItem
              item={item}
              setShowModel={setShowModel}
              onEditReview={onEditReview}
            />
          ))
        )}
      </div>
    </div>
  )
}

type ReviewItemProps = {
  setShowModel: (val: boolean) => void
  item: IReview
  onEditReview?: (review: IReview) => void
}

const ReviewItem = ({
  setShowModel,
  item: currentReview,
  onEditReview,
}: ReviewItemProps) => {
  const { user } = useAuth()
  const { deleteUserReview } = useReviews()
  const { addNotification } = useToastNotification()

  // const [replyText, setReplyText] = useState("")
  // const [replyVisible, setReplyVisible] = useState(false)
  // const [currentReview, setCurrentReview] = useState(item)
  const [deleting, setDeleting] = useState(false)

  // const handleReply = () => {
  //   setReplyVisible(true)
  // }

  // const handleReplySubmit = async () => {
  //   try {
  //     if (!replyText) {
  //       addNotification("Enter a reply", undefined, true)
  //       return
  //     }

  //     setLoading(true)
  //     // TODO: Implement reply functionality
  //     addNotification("Reply functionality coming soon")
  //     setReplyText("")
  //     setReplyVisible(false)
  //     setLoading(false)
  //   } catch (error) {
  //     addNotification("Failed to submit reply", undefined, true)
  //     setLoading(false)
  //   }
  // }

  const handleDeleteReview = async () => {
    if (!confirm("Are you sure you want to delete this review?")) {
      return
    }

    setDeleting(true)
    try {
      const result = await deleteUserReview(currentReview._id)
      if (typeof result === "string") {
        addNotification(result, undefined, true)
      } else {
        addNotification("Review deleted successfully")
        setShowModel(false)
      }
    } catch (error) {
      addNotification("Failed to delete review", undefined, true)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex items-center mb-5 p-4">
      <div className="flex items-center flex-col justify-center mr-2.5">
        <Link
          to={`/seller/${currentReview?.user?.username}`}
          onClick={() => setShowModel(false)}
        >
          <img
            className="w-[40px] h-[40px] mr-0 rounded-full"
            src={imageUrl + currentReview?.user?.image}
            alt="Reviewer"
          />
        </Link>
        <div className="flex flex-col justify-center items-center">
          <Link
            to={`/seller/${currentReview?.user?.username}`}
            onClick={() => setShowModel(false)}
          >
            <div className="font-bold text-sm text-malon-color">
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
            <FaThumbsUp className="ml-[30px]" color="#eb9f40" size={24} />
          ) : (
            <FaThumbsDown className="ml-[30px]" color="red" size={24} />
          )}
        </div>
        <div className="text-sm mb-2">{currentReview.comment}</div>
        {/* Edit and Delete buttons for review owner */}
        {user?._id === currentReview.user._id && (
          <div className="flex items-center gap-3 mb-2">
            <button
              className="text-orange-color hover:text-malon-color text-sm underline flex items-center gap-1"
              onClick={() => {
                onEditReview?.(currentReview)
              }}
            >
              <FaEdit size={12} />
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700 text-sm underline flex items-center gap-1"
              onClick={handleDeleteReview}
              disabled={deleting}
            >
              <FaTrash size={12} />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}

        {/* {!replyVisible &&
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
        )} */}
      </div>
    </div>
  )
}

export default ReviewLists
