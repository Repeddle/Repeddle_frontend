import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"

type Props =
  | {
      rating: number
      caption: string
    }
  | {
      rating: number
      numReviews: number
    }

const Rating = (props: Props) => {
  return (
    <div className="items-center flex gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) =>
          props.rating >= i + 1 ? (
            <FaStar key={i} className="text-orange-color text-lg" />
          ) : props.rating >= i + 0.5 ? (
            <FaStarHalfAlt key={i} className="text-orange-color text-lg" />
          ) : (
            <FaRegStar key={i} className="text-orange-color text-lg" />
          )
        )}
      </div>
      <span>
        {" "}
        {"caption" in props ? (
          <span>{` ${props.caption}`}</span>
        ) : (
          <span>{" " + props.numReviews + " reviews"}</span>
        )}
      </span>
    </div>
  )
}

export default Rating
