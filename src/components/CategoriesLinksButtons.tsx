import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"
import { useNavigate } from "react-router-dom"

const CategoriesLinksButtons = () => {
  const theme = useContext(ThemeContext)

  const navigate = useNavigate()

  const categories = [
    { name: "Men", path: "/men" },
    { name: "Women" },
    { name: "Kid" },
    { name: "Parties" },
    { name: "Accessories" },
    { name: "Bags" },
  ]

  return (
    <div
      className={`flex scrollbar-hide lg:hidden overflow-x-auto px-0 py-2.5 ${
        theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
      }`}
    >
      {categories?.map((cat) => (
        <div
          className={`border hover:border-orange-color hover:text-white hover:bg-orange-color
        font-bold whitespace-nowrap uppercase m-2.5 px-2.5 py-[5px] rounded-[0.2rem] border-solid
        lg:hover:text-inherit lg:hover:border-transparent lg:hover:bg-transparent`}
          onClick={() => navigate(cat.path || `/search?category=${cat.name}`)}
        >
          {cat.name}
        </div>
      ))}
    </div>
  )
}

export default CategoriesLinksButtons
