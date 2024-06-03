import { FormEvent, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const SearchBox = () => {
  const [query, setQuery] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query) navigate(`/search?search=${query}`)
    navigate(`/search`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex mr-auto rounded-[50px] border-2  border-[#dfdfdf]"
    >
      <div className="items-center shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)] flex flex-wrap relative w-full rounded-[50rem] border-0">
        <div className="border-0 ml-4">
          <button
            className="relative z-[2] cursor-pointer text-[0.8rem] shadow-none font-normal underline leading-normal text-center mx-[5px] my-0 px-3 py-1.5 rounded-[50rem] border-0"
            type="submit"
            id="button-search"
          >
            <FaSearch className="text-orange-color" />
          </button>
        </div>
        <input
          type="search"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search anything..."
          aria-label="Search Products..."
          aria-describedby="button-search"
          className="flex-auto min-w-0 relative w-[1%] text-black-color appearance-none block text-base font-normal leading-normal -outline-offset-2 -ml-px px-3 py-1.5 rounded-[50rem] bg-transparent focus:shadow-[0_0_0_0.25rem_rgba(247,154,35,0.1)] focus:outline-none"
          style={{
            transition:
              "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          }}
        />
      </div>
    </form>
  )
}

export default SearchBox
