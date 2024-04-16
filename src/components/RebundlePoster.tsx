import { FaTruck } from "react-icons/fa"
import { Link } from "react-router-dom"

const RebundlePoster = () => {
  return (
    <div className="p-[5px] flex items-center bg-light-ev2 dark:bg-dark-ev2">
      <FaTruck className="my-0 mx-2.5" />
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
