import { ChangeEvent, useState } from "react"
import { FaCircleDot } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { SearchOptionsObject } from "../../../types/search"

type Props = {
  getFilterUrl: (val: SearchOptionsObject) => string
  searchBrand: { name: string; _id: string }[]
  queryBrand: string
  setQueryBrand: (val: string) => void
  selectedBrand: string
  setSelectedBrand: (val: string) => void
  brand: string
}

const SearchBrands = ({
  searchBrand,
  getFilterUrl,
  queryBrand,
  setQueryBrand,
  selectedBrand,
  setSelectedBrand,
  brand,
}: Props) => {
  const [open, setOpen] = useState(true)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSelectedBrand("")
    setQueryBrand(e.target.value)
  }

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
        Brands
      </h4>
      <div
        className={`h-0 overflow-hidden transition-[0.5s] p-[5px] ${
          open ? "after:content-[''] after:rotate-[135deg] h-full" : ""
        }`}
      >
        <input
          className="bg-transparent border border-solid border-malon-color py-[5px] px-[10px] rounded-[0.4rem] mt-[5px] text-black-color dark:text-white-color"
          type="text"
          placeholder="Search brands"
          onChange={handleInput}
          value={queryBrand || selectedBrand}
        />
        <Link
          className={"all" === brand ? "text-bold" : ""}
          to={getFilterUrl({ brand: "all" })}
          onClick={() => setQueryBrand("")}
        >
          <div
            className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3`}
          >
            <FaCircleDot size={8} className="text-malon-color mr-[5px]" />
            All
          </div>
        </Link>
        {queryBrand &&
          searchBrand &&
          searchBrand.map((p) => (
            <div key={p._id}>
              <Link
                className={p.name === brand ? "text-bold" : ""}
                to={getFilterUrl({ brand: p.name })}
                onClick={() => {
                  setQueryBrand("")
                  setSelectedBrand(p.name)
                }}
              >
                <div
                  className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3`}
                >
                  <FaCircleDot size={8} className="text-malon-color mr-[5px]" />
                  {p.name}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SearchBrands
