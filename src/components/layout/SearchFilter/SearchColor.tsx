import { useState } from "react"
import { color1 } from "../../../utils/constants"
import { FaAngleDown } from "react-icons/fa"

type Props = {
  changeParam: (val: string) => void
  selectedColor: string
}

const SearchColor = ({ changeParam, selectedColor }: Props) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-2.5">
      <h4
        className="text-sm cursor-pointer relative z-[1] mb-2 flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        Color{" "}
        <FaAngleDown
          className={`transition-all ${!open ? "rotate-180" : ""}`}
        />
      </h4>
      <div
        className={`h-0 overflow-hidden transition-[0.5s] p-[5px] ${
          open ? "after:content-[''] after:rotate-[135deg] h-full" : ""
        }`}
      >
        <div
          onClick={() => {
            changeParam("all")
          }}
          className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3
            ${"all" === selectedColor ? "text-orange-color" : ""}`}
        >
          All
        </div>
        <div className="flex flex-wrap">
          {color1.map((c) => (
            <div
              onClick={() => {
                changeParam(c.name)
              }}
              key={c.id}
              className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3
            ${
              c.name === selectedColor
                ? "text-orange-color border-2 border-orange-color"
                : ""
            }`}
            >
              {c.name === "multiculour" ? (
                <img
                  src="https://res.cloudinary.com/emirace/image/upload/v1668595263/multi-color_s2zd1o.jpg"
                  alt="multiculour"
                  className="w-[30px] h-5 rounded-[0.2rem]"
                />
              ) : (
                <div
                  className="w-[30px] h-5 rounded-[0.2rem]"
                  style={{ backgroundColor: c.name }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchColor
