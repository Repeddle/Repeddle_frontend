import { FaLink } from "react-icons/fa"
import { categoriesModal } from "../../pages/protected/Categories"

type Props = {
  category: {
    name: string
    isCategory: boolean
    path: string
  }
  openModal: (val: categoriesModal) => void
  handleCategoryNameChange: (
    key: "name" | "isCategory" | "path",
    val: string
  ) => void
}

const CategoryComp = ({
  openModal,
  category,
  handleCategoryNameChange,
}: Props) => {
  return (
    <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
      <label className="text-sm font-semibold mb-2.5">Category Name</label>
      <div className="flex items-center justify-between">
        <input
          className="h-10 p-2.5 rounded-[0.2rem] bg-none text-black-color bg-transparent dark:text-white-color border border-light-ev3 dark:border-dark-ev3 focus-visible:outline focus-visible:outline-orange-color"
          onChange={(e) => handleCategoryNameChange("name", e.target.value)}
          type="text"
          value={category.name}
          placeholder="Enter category name"
        />
        <FaLink
          className="cursor-pointer ml-2.5 hover:text-orange-color"
          onClick={() => openModal("addLink")}
        />
      </div>
      <div className="text-[10px] italic mt-[-5px]">{category.path}</div>
    </div>
  )
}

export default CategoryComp
