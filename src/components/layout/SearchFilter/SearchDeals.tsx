import { useState } from "react"
import { FaCircleDot } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { SearchOptionsObject } from "../../../types/search"

type Props = {
  getFilterUrl: (val: SearchOptionsObject) => string
  deals: any[]
  deal: string
}

const SearchDeals = ({ getFilterUrl, deals, deal }: Props) => {
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
        Deals
      </h4>
      <div
        className={`h-0 overflow-hidden transition-[0.5s] p-[5px] ${
          open ? "after:content-[''] after:rotate-[135deg] h-full" : ""
        }`}
      >
        <Link
          className={"all" === deal ? "text-bold" : ""}
          to={getFilterUrl({ deal: "all" })}
        >
          <div
            className={`cursor-pointer flex items-center capitalize p-0.5 rounded-[0.2rem]
            dark:hover:bg-dark-ev2 dark:active:bg-dark-ev2 hover:bg-light-ev3 active:bg-light-ev3`}
          >
            <FaCircleDot size={8} className="text-malon-color mr-[5px]" />
            All
          </div>
        </Link>
        {deals.map((p) => (
          <div key={p.id}>
            <Link
              className={p.value === deal ? "text-bold" : ""}
              to={getFilterUrl({ deal: p.value })}
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

export default SearchDeals
