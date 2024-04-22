import { useState } from "react"
import { SearchOptionsObject } from "../../../types/search"
import Rating from "../../Rating"

type Props = {
  changeParam: (val: string) => void
  title: string
  selectedRating: string | number
  all: SearchOptionsObject
  allText: string
  list: { rating: number; id: string }[]
}

const SearchRatings = ({
  list,
  changeParam,
  selectedRating,
  title,
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
          <div
            key={r.rating}
            onClick={() => changeParam("all")}
            className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
        dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3
        ${r.rating === +selectedRating ? "text-orange-color" : ""}`}
          >
            <Rating caption={` ${allText}`} rating={r.rating} />
          </div>
        ))}

        <div
          onClick={() => {
            changeParam("all")
          }}
          className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
        dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3
        ${selectedRating === "all" ? "text-orange-color" : ""}`}
        >
          <Rating caption={` ${allText}`} rating={0} />
        </div>
      </div>
    </div>
  )
}

export default SearchRatings