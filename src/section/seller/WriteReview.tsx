import { FormEvent, useState } from "react"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa"
import LoadingBox from "../../components/LoadingBox"
import Button from "../../components/ui/Button"

type Props = {
  setShowModel: (val: boolean) => void
  userId: string
}

const WriteReview = ({ setShowModel, userId }: Props) => {
  const [like, setLike] = useState(false)
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")

  const loading = false

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    console.log(userId, setShowModel)
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
          >
            <option value="">Select...</option>
            <option value="1">1- Poor</option>
            <option value="2">2- Fair</option>
            <option value="3">3- Good</option>
            <option value="4">4- Very good</option>
            <option value="5">5- Excelent</option>
          </select>
        </div>
        <div className="my-4">
          <label htmlFor="comment">Comment</label>
          <textarea
            className={`bg-white-color text-black-color`}
            id="comment"
            placeholder="Leave a comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex">
          <div>Like</div>
          <FaThumbsUp
            className="text-lg px-2.5"
            onClick={() => setLike(true)}
            color={like ? "#eb9f40" : "grey"}
          />{" "}
          <div>Dislike</div>
          <FaThumbsDown
            onClick={() => setLike(false)}
            color={!like ? "#eb9f40" : "grey"}
          />
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
