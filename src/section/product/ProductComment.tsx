import { ChangeEvent, FormEvent, useRef, useState } from "react"
import MessageBox from "../../components/MessageBox"
import useAuth from "../../hooks/useAuth"
import LoadingBox from "../../components/LoadingBox"
import { IProduct } from "../../types/product"
import { Link, useParams } from "react-router-dom"
import Comment from "./Comment"

type Props = {
  comments: any[]
  product: IProduct
}

const ProductComment = ({ comments, product }: Props) => {
  const [comment, setComment] = useState("")

  const { user } = useAuth()

  const params = useParams()
  const { slug } = params

  const reviewRef = useRef(null)

  const loadingCreateReview = false

  const submitCommentHandler = (e: FormEvent) => {
    e.preventDefault()
  }

  const uploadImageHandler = (e: ChangeEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="my-3 mx-4">
        <div className="my-3" ref={reviewRef}>
          {comments.length === 0 && (
            <MessageBox>There is no comments</MessageBox>
          )}
        </div>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment._id} slug={slug ?? ""} commentC={comment} />
          ))}
        <div className="my-3">
          {user ? (
            <form onSubmit={submitCommentHandler}>
              <h4 className="text-[calc(1.275rem_+_0.3vw)] lg:text-2xl">
                Write Comment
              </h4>
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
                <input
                  className="mt-[5px]"
                  type="file"
                  onChange={(e) => uploadImageHandler(e)}
                />
              </div>
              <div className="my-4">
                <button
                  className="text-white-color text-[0.8rem] mx-[5px] my-0 border-0"
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
              to write a comment
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductComment
