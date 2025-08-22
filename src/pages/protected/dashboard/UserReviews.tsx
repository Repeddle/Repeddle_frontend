import React, { useState, useEffect, useCallback } from "react"
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaEdit,
  FaEllipsisV,
  FaTrash,
} from "react-icons/fa"
import moment from "moment"
import useAuth from "../../../hooks/useAuth"
import { IReview } from "../../../types/product"
import { IUser } from "../../../types/user"
import { imageUrl } from "../../../services/api"
import { deleteUserReviewService } from "../../../services/review"
import useToastNotification from "../../../hooks/useToastNotification"
import LoadingModal from "../../../components/ui/loadin/LoadingModal"
import useReviews from "../../../hooks/useReviews"

const UserReviews = () => {
  const { user } = useAuth()
  const { addNotification } = useToastNotification()
  const { fetchUserReviews } = useReviews()

  // State management
  const [reviews, setReviews] = useState<IReview[]>([])
  const [numReviews, setNumReviews] = useState(0)
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<IReview | null>(null)

  const loadReviews = useCallback(async () => {
    setLoading(true)
    const result = await fetchUserReviews()
    if (typeof result === "string") {
      addNotification(result, undefined, true)
    } else {
      setReviews(result.reviews || [])
      setNumReviews(result.numReviews || 0)
      setRating(result.rating || 0)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  const handleEditReview = (review: IReview) => {
    // Navigate to edit review page - you can implement this navigation
    console.log("Edit review:", review)
    addNotification("Edit functionality will be implemented", undefined, false)
  }

  const handleDeleteReview = (review: IReview) => {
    setReviewToDelete(review)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (reviewToDelete) {
      try {
        await deleteUserReviewService(reviewToDelete._id)
        addNotification("Review deleted successfully")
        loadReviews() // Reload reviews after deletion
      } catch (error) {
        addNotification(error as string, undefined, true)
      } finally {
        setDeleteModalOpen(false)
        setReviewToDelete(null)
      }
    }
  }

  const cancelDelete = () => {
    setDeleteModalOpen(false)
    setReviewToDelete(null)
  }

  return (
    <div className="flex-[4] flex flex-col overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        User Reviews
      </h1>
      {loading && <LoadingModal />}

      {/* Content */}
      <div className="px-6 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-ev2 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-orange-color bg-opacity-10 rounded-full">
                <FaStar className="text-orange-color text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Average Rating
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {rating.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-ev2 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 bg-opacity-10 rounded-full">
                <FaRegStar className="text-blue-500 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Reviews
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {numReviews}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white dark:bg-dark-ev2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                All Reviews
              </h2>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <FaRegStar className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You haven't received any reviews yet. Keep up the great work!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {reviews.map((review) => (
                <ReviewItem
                  key={review._id}
                  review={review}
                  currentUser={user}
                  onEdit={handleEditReview}
                  onDelete={handleDeleteReview}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-ev2 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
                <FaTrash className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Delete Review
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete this review? This action cannot
                be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Rating Component
const Rating = ({ rating, caption }: { rating: number; caption: string }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) =>
          rating >= i + 1 ? (
            <FaStar key={i} className="text-orange-color text-lg" />
          ) : rating >= i + 0.5 ? (
            <FaStarHalfAlt key={i} className="text-orange-color text-lg" />
          ) : (
            <FaRegStar key={i} className="text-orange-color text-lg" />
          )
        )}
      </div>
      <span className="text-gray-600 dark:text-gray-400">{caption}</span>
    </div>
  )
}

// Review Item Component
const ReviewItem = ({
  review,
  currentUser,
  onEdit,
  onDelete,
}: {
  review: IReview
  currentUser: IUser | null
  onEdit: (review: IReview) => void
  onDelete: (review: IReview) => void
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const isOwnReview = currentUser?._id === review.user._id

  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start space-x-4">
        {/* Reviewer Avatar */}
        <div className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={
              review.user.image
                ? imageUrl + review.user.image
                : "/default-avatar.png"
            }
            alt={review.user.username}
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.png"
            }}
          />
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {review.user.username}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {moment(review.createdAt).fromNow()}
                </span>
              </div>

              {/* Rating and Like/Dislike */}
              <div className="flex items-center space-x-4 mb-3">
                <Rating rating={review.rating} caption="" />
                <div className="flex items-center space-x-1">
                  {review.like ? (
                    <FaThumbsUp className="text-green-500 text-sm" />
                  ) : (
                    <FaThumbsDown className="text-red-500 text-sm" />
                  )}
                  <span
                    className={`text-sm ${
                      review.like
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {review.like ? "Positive" : "Negative"}
                  </span>
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>

            {/* Action Menu */}
            {isOwnReview && (
              <div className="relative flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(review)}
                    className="p-2 text-gray-400 hover:text-orange-color hover:bg-orange-color hover:bg-opacity-10 rounded-full transition-colors"
                    title="Edit Review"
                  >
                    <FaEdit className="text-sm" />
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      title="More options"
                    >
                      <FaEllipsisV className="text-sm" />
                    </button>

                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-ev2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onEdit(review)
                              setShowMenu(false)
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <FaEdit className="mr-2 text-sm" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDelete(review)
                              setShowMenu(false)
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <FaTrash className="mr-2 text-sm" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserReviews
