import { useState } from "react"
import { FaAngleDown } from "react-icons/fa"

type Props = {
  changeParam: (val: string) => void
  selectedSize: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sizes: any[]
}

const SearchSizes = ({ changeParam, selectedSize, sizes }: Props) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-2.5">
      <h4
        className="text-sm cursor-pointer relative z-[1] mb-2 flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        Size{" "}
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
            ${"all" === selectedSize ? "text-orange-color" : ""}`}
        >
          All
        </div>
        <div className="flex flex-wrap">
          {sizes.map((c) => (
            <div
              onClick={() => {
                changeParam(c.name)
              }}
              key={c.id}
              className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3
            ${c.name === selectedSize ? "text-orange-color" : ""}`}
            >
              <div className="justify-center uppercase w-[30px] h-5 rounded-[0.2rem]">
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchSizes
