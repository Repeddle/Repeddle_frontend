import { FormEvent, useMemo, useState } from "react"
import { FaHeart, FaTrash } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import moment from "moment"
import { IComment, ICommentReply, IProduct } from "../../types/product"
import useProducts from "../../hooks/useProducts"
import useToastNotification from "../../hooks/useToastNotification"

type Props = {
  comment: IComment
  product: IProduct
}

const Comment = ({ comment, product }: Props) => {
  const { user } = useAuth()
  const {
    likeProductComment,
    unlikeProductComment,
    replyProductComment,
    likeProductCommentReply,
    unlikeProductCommentReply,
    error,
  } = useProducts()
  const { addNotification } = useToastNotification()

  const [reply, setReply] = useState("")
  const [replyArea, setReplyArea] = useState(false)
  const [loading, setLoading] = useState(false)

  const liked = useMemo(
    () => !!comment.likes.find((like) => like === user?._id),
    [comment.likes, user?._id]
  )

  const likeComment = async () => {
    if (!user) return

    if (comment.userId === user._id) {
      addNotification("You can't like your comment")
      return
    }

    setLoading(true)

    if (liked) {
      const res = await unlikeProductComment(product._id, comment._id)

      if (res) addNotification(res)
      else addNotification(error)
    } else {
      const res = await likeProductComment(product._id, comment._id)

      if (res) addNotification(res)
      else addNotification(error)
    }

    setLoading(false)
  }

  const likeReplyHandler = async (reply: ICommentReply) => {
    if (!user) return

    if (reply.userId === user._id) {
      addNotification("You can't like your reply")
      return
    }

    setLoading(true)

    if (reply.likes.find((x) => x === user._id)) {
      const res = await unlikeProductCommentReply(
        product._id,
        comment._id,
        reply._id
      )

      if (res) addNotification(res)
      else addNotification(error)
    } else {
      const res = await likeProductCommentReply(
        product._id,
        comment._id,
        reply._id
      )

      if (res) addNotification(res)
      else addNotification(error)
    }

    setLoading(false)
  }

  const submitReplyHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (!reply) {
      addNotification("Enter a reply")
      return
    }

    setLoading(true)

    const res = await replyProductComment(product._id, comment._id, reply)

    if (res) {
      addNotification(res)
      setReply("")
    } else addNotification(error)

    setLoading(false)
  }

  const deleteComment = () => {}

  return (
    <>
      <div className="flex mt-[15px] p-2.5 lg:p-5 rounded-[0.2rem] dark:bg-dark-ev1 bg-light-ev1">
        <img
          className="w-[50px] h-[50px] object-cover rounded-[50%]"
          src={comment.userId}
          alt="pimage"
        />
        <div className="ml-5">
          <div>
            <div className="flex items-center">
              <div className="font-bold mr-2.5">{comment.userId}</div>
              <div className="text-xs">
                {moment(comment.createdAt).fromNow()}
              </div>
              {user && user.role === "Admin" && (
                <div
                  className="text-red-500 ml-2.5 cursor-pointer"
                  onClick={deleteComment}
                >
                  <FaTrash />
                </div>
              )}
            </div>
            <div className="mb-2.5">{comment.comment}</div>
            <div className="flex justify-between items-center w-[125px]">
              <div
                className="text-[13px] cursor-pointer underline hover:text-malon-color"
                onClick={() => setReplyArea(!replyArea)}
              >
                {comment?.replies?.length} reply
              </div>
              <div className="text-[13px]">{comment.likes.length} like</div>
              <FaHeart
                className={liked ? "text-orange-color" : ""}
                onClick={() => !loading && likeComment()}
              />
            </div>
          </div>
          <div>
            {/* {comment.image && <MessageImage url={comment.image} />} */}
            {/* {comment.image && <CommentImg src={comment.image} alt="d" />}*/}
          </div>
        </div>
      </div>
      {replyArea && (
        <>
          {comment.replies.map((r) => (
            <div className="ml-[25px] mr-0 my-[5px] p-2.5 dark:bg-dark-ev1 bg-light-ev1 flex lg:ml-[90px] lg:mr-0 lg:my-[5px] lg:p-5 rounded-[0.2rem]">
              <img
                className="w-[30px] h-[30px] object-cover rounded-[50%]"
                src={r.userId}
                alt="pimage"
              />
              <div className="ml-5">
                <div className="flex items-center">
                  <div className="font-bold mr-2.5">{r.userId}</div>
                  <div className="text-xs">{moment(r.createdAt).fromNow()}</div>
                </div>
                <div className="m-2.5">{r.comment}</div>
                <div className="flex justify-between items-center w-20">
                  <div className="text-[13px]">{r.likes.length} like</div>
                  <FaHeart onClick={() => !loading && likeReplyHandler(r)} />
                </div>
              </div>
            </div>
          ))}
          <form onSubmit={submitReplyHandler}>
            <textarea
              className={`w-full m-0 lg:w-4/5 lg:ml-[90px] lg:mr-0 lg:mt-2.5 lg:mb-0 p-2.5 rounded-[0.2rem] focus-visible:border
              focus-visible:border-orange-color focus-visible:shadow-[0_0_0_0.25rem_rgb(247_154_35_/_10%)] focus-visible:outline-1
              focus-visible:outline-orange-color bg-white-color dark:bg-black-color text-black-color dark:text-white-color`}
              placeholder="Leave a reply here"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div>
              <button
                className="m-0 text-white-color text-xs lg:ml-[90px] px-[7px] py-[5px] rounded-[0.2rem] border-0"
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

export default Comment
