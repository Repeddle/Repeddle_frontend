import { FormEvent, useState } from "react"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa"
import LoadingBox from "../../components/LoadingBox"
import Button from "../../components/ui/Button"
import useUser from "../../hooks/useUser"
import useToastNotification from "../../hooks/useToastNotification"
import useReviews from "../../hooks/useReviews"
import { IReview } from "../../types/product"

type Props = {
  setShowModel: (val: boolean) => void
  userId: string
  addReview: (review: IReview) => void
  rating: string
  comment: string
  setRating: (val: string) => void
  setComment: (val: string) => void
  like?: boolean
  setLike: (val?: boolean) => void
  editReview?: IReview
  isEditMode?: boolean
}

const WriteReview = ({
  setShowModel,
  userId,
  addReview,
  rating,
  comment,
  setRating,
  setComment,
  setLike,
  like,
  editReview,
  isEditMode = false,
}: Props) => {
  const { error, reviewSeller } = useUser()
  const { addNotification } = useToastNotification()
  const { editUserReview } = useReviews()

  const [loading, setLoading] = useState(false)

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (!comment)
      return addNotification("Please enter a review", undefined, true)

    if (!rating) return addNotification("Please select rating", undefined, true)

    if (!like)
      return addNotification(
        "Give review a thumb up or thumb down",
        undefined,
        true
      )

    setLoading(true)

    if (isEditMode && editReview) {
      const res = await editUserReview(editReview._id, {
        comment,
        like,
        rating: +rating,
        _id: editReview._id,
        itemType: "User",
      })
      if (res) {
        addNotification("Review updated successfully")
        setComment("")
        setRating("")
        setLike(undefined)
        setShowModel(false)
      } else {
        addNotification(error || "Failed to update review", undefined, true)
      }
      setLoading(false)
      return
    }

    const res = await reviewSeller(userId, { comment, like, rating: +rating })
    if (res) {
      addNotification(res.message)
      setComment("")
      setRating("")
      setLike(undefined)
      addReview(res.review)

      setShowModel(false)
    } else addNotification(error || "Failed to create review", undefined, true)
    setLoading(false)
  }

  return (
    <div className="bs-container">
      <form onSubmit={submitHandler} className="p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit your review" : "Write a customer review"}
        </h2>
        <div className="my-4">
          <label htmlFor="rating" className="block text-sm font-medium mb-2">
            Rating
          </label>
          <select
            id="rating"
            aria-label="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full bg-transparent rounded-lg p-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-color text-black-color dark:text-white-color"
          >
            <option value="">Select...</option>
            <option value="1">1- Poor</option>
            <option value="2">2- Fair</option>
            <option value="3">3- Good</option>
            <option value="4">4- Very good</option>
            <option value="5">5- Excellent</option>
          </select>
        </div>
        <div className="my-4">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Comment
          </label>
          <textarea
            className="w-full bg-transparent border rounded-lg p-3 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-color text-black-color dark:text-white-color min-h-[100px]"
            id="comment"
            placeholder="Leave a comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex gap-4 my-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Like</span>
            <button
              type="button"
              onClick={() => setLike(true)}
              className={`p-2 rounded-full border-2 transition-colors ${
                like === true
                  ? "border-orange-color bg-orange-50 text-orange-color"
                  : "border-gray-300 text-gray-500 hover:border-orange-color"
              }`}
            >
              <FaThumbsUp size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Dislike</span>
            <button
              type="button"
              onClick={() => setLike(false)}
              className={`p-2 rounded-full border-2 transition-colors ${
                like === false
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-gray-300 text-gray-500 hover:border-red-500"
              }`}
            >
              <FaThumbsDown size={16} />
            </button>
          </div>
        </div>
        <div className="my-3 flex gap-3">
          <Button
            text={isEditMode ? "Update Review" : "Submit"}
            disabled={loading}
            type="submit"
          />

          {isEditMode && (
            <Button
              text="Cancel"
              disabled={loading}
              type="button"
              onClick={() => setShowModel(false)}
              className="bg-gray-500 text-white"
            />
          )}

          {loading && <LoadingBox></LoadingBox>}
        </div>
      </form>
    </div>
  )
}

export default WriteReview
