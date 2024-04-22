import { useState } from "react"
import { FaCircleDot } from "react-icons/fa6"
import { SearchOptionsObject } from "../../../types/search"

type Props = {
  changeParam: (val: string) => void
  title: string
  selectedItem: string
  all: SearchOptionsObject
  allText: string
  list: { name: string; id: string }[]
}

const SearchDropDown = ({
  changeParam,
  title,
  selectedItem,
  allText,
  list,
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
        <div
          onClick={() => changeParam("all")}
          className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3
            ${"all" === selectedItem ? "text-orange-color" : ""}`}
        >
          <FaCircleDot size={8} className="text-malon-color mr-[5px]" />
          {allText}
        </div>
        {list.length > 0 &&
          list.map((c) => (
            <div
              key={c.id}
              onClick={() => changeParam(c.name)}
              className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3
            ${c.name === selectedItem ? "text-orange-color" : ""}`}
            >
              <FaCircleDot size={8} className="text-malon-color mr-[5px]" />
              {c.name}
            </div>
          ))}
      </div>
    </div>
  )
}

export default SearchDropDown