import React, { FormEvent } from "react"
import { Link } from "react-router-dom"
import LoadingBox from "../../components/LoadingBox"
import MessageBox from "../../components/MessageBox"
import useAuth from "../../hooks/useAuth"
import { Props } from "./ProductReviews"

export const ProductReviews = ({ product }: Props) => {
  const loadingCreateReview = false

  const { user } = useAuth()

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
            product?.userBuy.includes(user._id) &&
            (user ? (
              <form onSubmit={submitHandler}>
                <h2>Write a customer review</h2>
                TODO: no example to use
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
                <FloatingLabel
                  controlId="floatingTextarea"
                  lablel="Coments"
                  className="my-3"
                >
                  <Form.Control
                    className={` ${
                      mode === "pagebodydark" ? "" : "color_black"
                    }`}
                    as="textarea"
                    placeholder="Leave a comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FloatingLabel>
                <Thumbs>
                  <div>Like</div>
                  <FaThumbsUp
                    onClick={() => setLike("yes")}
                    color={like === "yes" ? "#eb9f40" : "grey"}
                  />{" "}
                  <div>Dislike</div>
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    onClick={() => setLike("no")}
                    color={like === "no" ? "#eb9f40" : "grey"}
                  />
                </Thumbs>
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
                  to={`/signin?redirect=/product/${product.slug}`}
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
