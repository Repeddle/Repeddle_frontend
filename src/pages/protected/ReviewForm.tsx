import React, { useEffect, useState } from "react";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useUser from "../../hooks/useUser";
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal";
import { imageUrl } from "../../services/api";
import useToastNotification from "../../hooks/useToastNotification";

export default function ReviewForm() {
  const { fetchProductBySlug, createProductReview } = useProducts();
  const { getUserByUsername, reviewSeller } = useUser();
  const { addNotification } = useToastNotification();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [like, setLike] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<any>(null);

  // Form errors
  const [errors, setErrors] = useState<{
    comment?: string;
    rating?: string;
    like?: string;
  }>({});

  useEffect(() => {
    const fetchItem = async () => {
      if (type === "product" && id) {
        const response = await fetchProductBySlug(id);
        setItem(response);
      }
      if (type === "seller" && id) {
        const response: any = await getUserByUsername(id);
        setItem(response.user);
      }
    };
    fetchItem();
  }, [id, type]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!comment.trim()) newErrors.comment = "Comment is required.";
    if (rating === 0) newErrors.rating = "Please select a rating.";
    if (like === undefined)
      newErrors.like = "Please indicate if you liked it or not.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (like === undefined) return;
      setLoading(true);
      if (type === "product") {
        await createProductReview(item._id, {
          comment,
          rating,
          like,
        });
      } else if (type === "seller") {
        await reviewSeller(item.username, {
          comment,
          rating,
          like,
        });
      } else {
        addNotification("Invalid type specified", "", true);
        return;
      }

      // Optional: Reset form & errors
      setComment("");
      setRating(0);
      setLike(undefined);
      setErrors({});
    } catch (error: any) {
      addNotification(error, "", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 my-20 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Leave a Review
      </h2>

      {!item ? (
        <LoadingLogoModal />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Item Info */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {type === "product" ? "Reviewing Product" : "Reviewing User"}
            </label>

            <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm bg-gray-50 dark:bg-gray-800">
              <img
                src={
                  type === "product"
                    ? imageUrl + item.images[0]
                    : imageUrl + item.image
                }
                alt={type === "product" ? item.name : item.username}
                className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
              />

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {type === "product" ? item.name : item.username}
                </h3>
                {type === "product" && item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="focus:outline-none"
                >
                  <FaStar
                    className={`h-6 w-6 transition-colors ${
                      (hover || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Comment */}
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Write your comment..."
              className="w-full p-3 border rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
            )}
          </div>

          {/* Like/Dislike */}
          <div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setLike(true)}
                className={`p-3 rounded-full border transition-colors ${
                  like === true
                    ? "bg-green-100 border-green-400 text-green-600"
                    : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-green-50"
                }`}
              >
                <FaThumbsUp className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setLike(false)}
                className={`p-3 rounded-full border transition-colors ${
                  like === false
                    ? "bg-red-100 border-red-400 text-red-600"
                    : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50"
                }`}
              >
                <FaThumbsDown className="h-5 w-5" />
              </button>
            </div>
            {errors.like && (
              <p className="text-red-500 text-sm mt-1">{errors.like}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-orange-color text-white rounded-xl font-semibold hover:bg-malon-color disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
}
