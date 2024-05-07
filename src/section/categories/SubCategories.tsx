import { FaDotCircle, FaPen, FaPlus, FaTrash } from "react-icons/fa"
import { categoriesModal } from "../../pages/protected/Categories"
import { ISubCategory } from "../../types/category"

type Props = {
  openModal: (val: categoriesModal) => void
  subCategories: ISubCategory[]
  handleSelectSubcategory: (subCateIndex: number) => void
  setSelectedSubcategoryIndex: (val: number | null) => void
  setItemIndex: (val: number | null) => void
  selectedSubcategoryIndex: number | null
  handleDeleteSubcategory: (val: number) => void
}

const SubCategories = ({
  openModal,
  subCategories,
  handleSelectSubcategory,
  setSelectedSubcategoryIndex,
  setItemIndex,
  selectedSubcategoryIndex,
  handleDeleteSubcategory,
}: Props) => {
  return (
    <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold mb-2.5">Sub Categories</label>
        <button
          className="w-[80px] text-orange-color bg-[#fcf0e0] dark:bg-dark-ev3 mt-0 cursor-pointer mx-0 my-2.5 px-2.5 py-[5px] rounded-[0.2rem] border-none"
          onClick={() => {
            setSelectedSubcategoryIndex(null)
            setItemIndex(null)
            openModal("addNameLink2")
          }}
        >
          <FaPlus className="text-orange-color" />
        </button>
      </div>
      {subCategories.map((subcategory, subcategoryIndex) => (
        <div
          className={`cursor-pointer mb-[5px] px-2.5 py-0 rounded-[0.2rem] ${
            selectedSubcategoryIndex === subcategoryIndex
              ? "border border-orange-color dark:bg-dark-ev3 bg-[#fcf0e0]"
              : ""
          }`}
          onClick={() => setSelectedSubcategoryIndex(subcategoryIndex)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <FaDotCircle className="text-[10px] flex mr-2.5 mt-2" />
              <div onClick={() => handleSelectSubcategory(subcategoryIndex)}>
                {subcategory.name}
                <div className="text-[10px] italic mt-[-5px]">
                  {subcategory.path}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaPen
                className="cursor-pointer text-[10px]"
                onClick={() => {
                  setSelectedSubcategoryIndex(subcategoryIndex)
                  openModal("addNameLink2")
                }}
              />
              <FaTrash
                className="cursor-pointer text-[10px] text-malon-color"
                onClick={() => {
                  handleDeleteSubcategory(subcategoryIndex)
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SubCategories
