import { useState } from "react"
import { Link } from "react-router-dom"
import { SearchOptionsObject } from "../../../types/search"

type Props = {
  getFilterUrl: (val: SearchOptionsObject) => string
  selectedColor: string
  colors: any[]
}

const SearchColor = ({ getFilterUrl, selectedColor, colors }: Props) => {
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
        Color
      </h4>
      <div
        className={`h-0 overflow-hidden transition-[0.5s] p-[5px] ${
          open ? "after:content-[''] after:rotate-[135deg] h-full" : ""
        }`}
      >
        <Link
          className={"all" === selectedColor ? "text-bold" : ""}
          to={getFilterUrl({ color: "all" })}
        >
          <div
            className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3`}
          >
            All
          </div>
        </Link>
        <div className="flex flex-wrap">
          {colors.map((c) => (
            <Link
              key={c.id}
              className={c.name === selectedColor ? "text-bold" : ""}
              style={{
                border:
                  c.name === selectedColor
                    ? "2px solid var(--orange-color)"
                    : "",
              }}
              to={getFilterUrl({ color: c.name })}
            >
              <div
                className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3`}
              >
                {c.name === "multiculour" ? (
                  <img
                    src="https://res.cloudinary.com/emirace/image/upload/v1668595263/multi-color_s2zd1o.jpg"
                    alt="multiculour"
                    className="w-[30px] h-5 rounded-[0.2rem]"
                  />
                ) : (
                  <div
                    className={`bg-[${c.name}] w-[30px] h-5 rounded-[0.2rem]`}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchColor
