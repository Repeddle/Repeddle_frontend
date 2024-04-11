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
  console.log(props.rating >= 0 + 1)
  return (
    <div className="items-center flex gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) =>
          props.rating >= i + 1 ? (
            <FaStar key={i} className="text-orange-color" />
          ) : props.rating >= i + 0.5 ? (
            <FaStarHalfAlt key={i} className="text-orange-color" />
          ) : (
            <FaRegStar key={i} className="text-orange-color" />
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
