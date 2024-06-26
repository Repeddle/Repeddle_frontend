import { FormEvent, useRef, useState } from "react"
import { Link } from "react-router-dom"
import LoadingBox from "../../components/LoadingBox"
import { IProduct } from "../../types/product"
import MessageBox from "../../components/MessageBox"
import useAuth from "../../hooks/useAuth"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa"
import Button from "../../components/ui/Button"
import Rating from "../../components/Rating"
import { FaFaceSmile } from "react-icons/fa6"
import useToastNotification from "../../hooks/useToastNotification"
import useProducts from "../../hooks/useProducts"

type Props = {
  product: IProduct
  setProduct: (val: IProduct) => void
}

const ProductReviews = ({ product, setProduct }: Props) => {
  const { user } = useAuth()
  const { addNotification } = useToastNotification()
  const { createProductReview, error } = useProducts()

  const [comment, setComment] = useState("")
  const [like, setLike] = useState<boolean>()
  const [rating, setRating] = useState("")
  const [loadingCreateReview, setLoadingCreateReview] = useState(false)

  const reviewRef = useRef(null)

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (!comment) {
      addNotification("Please enter review")
      return
    }

    if (!rating) {
      addNotification("Please select rating")
      return
    }

    if (!like) {
      addNotification("Give review a thumb up or thumb down")
      return
    }

    setLoadingCreateReview(true)

    const res = await createProductReview(product._id, {
      comment,
      like: like,
      rating: +rating,
    })

    if (res) {
      const newProd = product
      newProd.reviews = [...newProd.reviews, res.review]
      setProduct(newProd)
    } else {
      addNotification(error)
    }

    setLoadingCreateReview(false)
  }

  const deleteReview = async (id: string) => {
    console.log(id)
  }

  return (
    <>
      <div className="my-3 mx-4 bs-container">
        <div className="my-3" ref={reviewRef}>
          {product.reviews.length === 0 && (
            <MessageBox>There is no reviews</MessageBox>
          )}
        </div>
        <div className="flex flex-col mb-0 pl-0">
          {product.reviews.map((review) => (
            <div
              className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b"
              key={review._id}
            >
              <strong>{review.user.username}</strong>{" "}
              {review.like ? (
                <FaThumbsUp color="#eb9f40" className="text-lg ml-2.5" />
              ) : review.like === false ? (
                <FaThumbsDown color="red" className="text-lg ml-2.5" />
              ) : (
                <FaFaceSmile color="grey" className="text-lg ml-2.5" />
              )}
              <Rating rating={review.rating} caption=" " />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
              {user?.role === "Admin" && (
                <div
                  className="text-[red] cursor-pointer"
                  onClick={() => deleteReview(review._id)}
                >
                  delete
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="my-3">
          {user && product?.buyers.includes(user._id) ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <div className="my-4">
                <label htmlFor="rating">Rating</label>
                <select
                  id="rating"
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  // className="bg-transparent"
                  className="text-base ml-2.5 pl-2.5 pr-6 text-ellipsis whitespace-nowrap leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color appearance-none text-black-color dark:text-white-color"
                >
                  <option value="">Select...</option>
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excellent</option>
                </select>
              </div>
              <div className="relative my-4">
                <textarea
                  className={`w-full block text-base font-normal rounded border text-black-color dark:text-white-color
                    min-h-[calc(1.5em_+_0.75rem_+_2px)] bg-transparent h-[calc(3.5rem_+_2px)] leading-tight px-3 py-4  border-[#a2a3a5]
                    bg-none`}
                  style={{
                    transition:
                      "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                  }}
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div>Like</div>
                  <FaThumbsUp
                    onClick={() => setLike(true)}
                    color={like ? "#eb9f40" : "grey"}
                  />{" "}
                </div>
                <div className="flex items-center gap-1">
                  <div>Dislike</div>
                  <FaThumbsDown
                    onClick={() => setLike(false)}
                    color={like === false ? "#eb9f40" : "grey"}
                  />
                </div>
              </div>
              <div className="my-3">
                <Button
                  text="Submit"
                  type="submit"
                  disabled={loadingCreateReview}
                />
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <div>
              Please{" "}
              <Link
                className="font-bold text-orange-color hover:text-malon-color text-[15px]"
                to={`/auth/login?redirect=/product/${product.slug}`}
              >
                Sign In
              </Link>{" "}
              to write a review
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductReviews
