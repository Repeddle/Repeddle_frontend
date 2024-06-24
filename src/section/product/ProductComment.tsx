import { ChangeEvent, FormEvent, useRef, useState } from "react"
import MessageBox from "../../components/MessageBox"
import useAuth from "../../hooks/useAuth"
import LoadingBox from "../../components/LoadingBox"
import { IComment, IProduct } from "../../types/product"
import { Link } from "react-router-dom"
import Comment from "./Comment"
import useProducts from "../../hooks/useProducts"
import useToastNotification from "../../hooks/useToastNotification"
import { compressImageUpload } from "../../utils/common"

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments?: IComment[]
  product: IProduct
  setProduct: (val: IProduct) => void
}

const ProductComment = ({ comments, product, setProduct }: Props) => {
  const { user } = useAuth()
  const { commentProduct, error } = useProducts()
  const { addNotification } = useToastNotification()

  const [comment, setComment] = useState("")
  const [loadingCreateReview, setLoadingCreateReview] = useState(false)

  const reviewRef = useRef(null)

  const submitCommentHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (!comment) {
      addNotification("Enter a comment")
      return
    }
    setLoadingCreateReview(true)

    const res = await commentProduct(product._id, comment)

    if (res) {
      const newProd = product
      newProd.comments = [...(newProd.comments ?? []), res.comment]
      setProduct(newProd)
      addNotification("Comment added to product")
    } else addNotification(error)

    setLoadingCreateReview(false)
  }

  const uploadImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: are we using image
    const file = e.target.files?.[0]
    if (!file) throw Error("No image found")

    const imageUrl = await compressImageUpload(file, 1024)
    console.log(imageUrl)
  }

  return (
    <>
      <div className="my-3 mx-4 bs-container">
        <div className="my-3" ref={reviewRef}>
          {(!comments || comments?.length === 0) && (
            <MessageBox>There is no comments</MessageBox>
          )}
        </div>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              product={product}
              comment={comment}
              setProduct={setProduct}
            />
          ))}
        <div className="my-3">
          {user ? (
            <form onSubmit={submitCommentHandler}>
              <h4 className="text-[calc(1.275rem_+_0.3vw)] lg:text-2xl">
                Write Comment
              </h4>
              <div className="relative my-4">
                <textarea
                  className={`w-full block text-base font-normal rounded bg-transparent border text-black-color dark:text-white-color
              min-h-[calc(1.5em_+_0.75rem_+_2px)] h-[calc(3.5rem_+_2px)] leading-tight px-3 py-4  border-[#a2a3a5]
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
                {!loadingCreateReview && (
                  <button
                    className="text-white-color bg-orange-color px-3.5 py-2 rounded-[0.2rem] text-[0.8rem] mx-[5px] my-0 border-0"
                    disabled={loadingCreateReview}
                    type="submit"
                  >
                    Submit
                  </button>
                )}
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
              to write a comment
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductComment
