import { FormEvent, useRef, useState } from "react"
import { Link } from "react-router-dom"
import LoadingBox from "../../components/LoadingBox"
import { IProduct } from "../../types/product"
import MessageBox from "../../components/MessageBox"
import useAuth from "../../hooks/useAuth"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa"

type Props = {
  product: IProduct
}

const ProductReviews = ({ product }: Props) => {
  const [comment, setComment] = useState("")
  const [like, setLike] = useState("yes")
  const loadingCreateReview = false

  const { user } = useAuth()

  const reviewRef = useRef(null)

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="my-3 mx-4">
        <div className="my-3" ref={reviewRef}>
          {product.reviews.length === 0 && (
            <MessageBox>There is no reviews</MessageBox>
          )}
        </div>
        {/* TODO: no reviews to use as example  */}
        {/* <ListGroup>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>{" "}
              <FontAwesomeIcon
                style={{ marginLeft: "10px" }}
                icon={
                  review.like === "yes"
                    ? faThumbsUp
                    : review.like === "no"
                    ? faThumbsDown
                    : faFaceSmile
                }
                color={
                  review.like === "yes"
                    ? "#eb9f40"
                    : review.like === "no"
                    ? "red"
                    : "grey"
                }
                size={"lg"}
              />
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
              {user && user.isAdmin && (
                <div
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => deleteReview(review._id)}
                >
                  delete
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup> */}
        <div className="my-3">
          {user &&
            //   TODO: does not exist
            // product?.userBuy.includes(user._id) &&
            (user ? (
              <form onSubmit={submitHandler}>
                <h2>Write a customer review</h2>
                {/* TODO: no example to use  */}
                {/* <Form.Group className="my-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    aria-label="Rating"
                    value={rating}
                    onChange={(e) => setRAting(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1- Poor</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very good</option>
                    <option value="5">5- Excelent</option>
                  </Form.Select>
                </Form.Group> */}
                <div className="relative my-4">
                  <textarea
                    className={`w-full block text-base font-normal rounded border text-black-color dark:text-white-color
                    min-h-[calc(1.5em_+_0.75rem_+_2px)] h-[calc(3.5rem_+_2px)] leading-tight px-3 py-4 border-solid border-[#a2a3a5]
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
                <div className="flex">
                  <div>Like</div>
                  <FaThumbsUp
                    onClick={() => setLike("yes")}
                    color={like === "yes" ? "#eb9f40" : "grey"}
                  />{" "}
                  <div>Dislike</div>
                  <FaThumbsDown
                    onClick={() => setLike("no")}
                    color={like === "no" ? "#eb9f40" : "grey"}
                  />
                </div>
                <div className="my-3">
                  <button
                    className="search-btn1"
                    disabled={loadingCreateReview}
                    type="submit"
                  >
                    Submit
                  </button>
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
            ))}
        </div>
      </div>
    </>
  )
}

export default ProductReviews
