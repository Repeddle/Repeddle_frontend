import { FormEvent, useState } from "react"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa"
import LoadingBox from "../../components/LoadingBox"
import Button from "../../components/ui/Button"
import useUser from "../../hooks/useUser"
import useToastNotification from "../../hooks/useToastNotification"
import { IReview } from "../../types/product"

type Props = {
  setShowModel: (val: boolean) => void
  userId: string
  addReview: (review: IReview) => void
}

const WriteReview = ({ setShowModel, userId, addReview }: Props) => {
  const { error, reviewSeller } = useUser()
  const { addNotification } = useToastNotification()

  const [like, setLike] = useState<boolean | undefined>()
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")
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
      <form onSubmit={submitHandler}>
        <h2>Write a customer review</h2>
        <div className="my-4">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            aria-label="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="bg-transparent rounded-[0.2rem] p-1 border-dark-ev1 dark:border-light-ev1 border ml-2.5 focus-within:outline-orange-color text-black-color dark:text-white-color"
          >
            <option value="">Select...</option>
            <option value="1">1- Poor</option>
            <option value="2">2- Fair</option>
            <option value="3">3- Good</option>
            <option value="4">4- Very good</option>
            <option value="5">5- Excellent</option>
          </select>
        </div>
        <div className="my-4 flex gap-2.5 items-start">
          <label htmlFor="comment">Comment</label>
          <textarea
            className={`bg-transparent border rounded-[0.2rem] p-1 border-black text-black-color`}
            id="comment"
            placeholder="Leave a comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div>Like</div>
            <FaThumbsUp
              // className="text-lg px-2.5"
              onClick={() => setLike(true)}
              color={like === true ? "#eb9f40" : "grey"}
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
          <Button text="Submit" disabled={loading} type="submit" />

          {loading && <LoadingBox></LoadingBox>}
        </div>
      </form>
    </div>
  )
}

export default WriteReview
