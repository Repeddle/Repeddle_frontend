import { useState } from "react"
import { SearchOptionsObject } from "../../../types/search"
import { Link } from "react-router-dom"
import Rating from "../../Rating"

type Props = {
  getFilterUrl: (val: SearchOptionsObject) => string
  title: string
  selectedItem: string | number
  all: SearchOptionsObject
  allText: string
  list: { rating: number; id: string }[]
}

const SearchRatings = ({
  list,
  getFilterUrl,
  selectedItem,
  title,
  all,
  allText,
}: Props) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-2.5">
      <h4
        className={`text-sm cursor-pointer relative z-[1] after:content-["_"] after:w-2 after:h-2
          after:-translate-y-2/4 after:absolute after:border-b mb-2 after:border-solid
          after:border-l after:right-5 after:top-2/4 ${
            open ? "after:-rotate-45" : "after:rotate-[135deg]"
          }`}
        onClick={() => setOpen(!open)}
      >
        {title}
      </h4>
      <div
        className={`h-0 overflow-hidden transition-[0.5s] p-[5px] ${
          open ? "after:content-[''] after:rotate-[135deg] h-full" : ""
        }`}
      >
        {list.map((r) => (
          <div key={r.rating}>
            <Link
              className={
                `${r.rating}` === `${selectedItem}` ? "text-orange-color" : ""
              }
              to={getFilterUrl({ rating: r.rating })}
            >
              <div
                className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
        dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3`}
              >
                <Rating caption={` ${allText}`} rating={r.rating} />
              </div>
            </Link>
          </div>
        ))}
        <Link
          className={selectedItem === "all" ? "text-orange-color" : ""}
          to={getFilterUrl(all)}
        >
          <div
            className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
        dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3`}
          >
            <Rating caption={` ${allText}`} rating={0} />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SearchRatings
