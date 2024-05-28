import { ChangeEvent, useState } from "react"
import { FaAngleDown } from "react-icons/fa"
import { FaCircleDot } from "react-icons/fa6"

type Props = {
  changeParam: (val: string) => void
  searchBrand: { name: string; _id: string }[]
  queryBrand: string
  selectedBrand: string
  brand: string
}

const SearchBrands = ({
  searchBrand,
  changeParam,
  queryBrand,
  selectedBrand,
}: Props) => {
  const [open, setOpen] = useState(true)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    changeParam(e.target.value)
  }

  return (
    <div className="mb-2.5">
      <h4
        className={`text-sm cursor-pointer relative z-[1] after:content-["_"] after:w-2 after:h-2
        after:-translate-y-2/4 after:absolute after:border-b mb-2 flex justify-between items-center 
        after:border-l after:right-5 after:top-2/4 ${
          open ? "after:-rotate-45" : "after:rotate-[135deg]"
        }`}
        onClick={() => setOpen(!open)}
      >
        Brands <FaAngleDown />
      </h4>
      <div
        className={`h-0 overflow-hidden transition-[0.5s] p-[5px] ${
          open ? "after:content-[''] after:rotate-[135deg] h-full" : ""
        }`}
      >
        <input
          className="bg-transparent border  border-malon-color py-[5px] px-[10px] rounded-[0.4rem] mt-[5px] text-black-color dark:text-white-color"
          type="text"
          placeholder="Search brands"
          onChange={handleInput}
          value={queryBrand || selectedBrand}
        />

        <div
          onClick={() => {
            changeParam("all")
          }}
          className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3
            ${"all" === selectedBrand ? "text-orange-color" : ""}`}
        >
          <FaCircleDot size={8} className="text-malon-color mr-[5px]" />
          All
        </div>
        {queryBrand &&
          searchBrand &&
          searchBrand.map((p) => (
            <div
              key={p._id}
              onClick={() => {
                changeParam(p.name)
              }}
              // {/* TODO: setQueryBrand("") */}
              className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3
            ${p.name === selectedBrand ? "text-orange-color" : ""}`}
            >
              <FaCircleDot size={8} className="text-malon-color mr-[5px]" />
              {p.name}
            </div>
          ))}
      </div>
    </div>
  )
}

export default SearchBrands
