import { FaTruck } from "react-icons/fa"
import { Link } from "react-router-dom"

const RebundlePoster = () => {
  return (
    <div className="p-[5px] flex items-center">
      <FaTruck className="my-0 mx-2.5 text-xl" />
      <div>
        Free delivery with{" "}
        <Link className="cursor-pointer text-orange-color" to="/rebundle">
          Re:bundle
        </Link>
      </div>
    </div>
  )
}

export default RebundlePoster
