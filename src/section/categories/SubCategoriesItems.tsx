import useToastNotification from "../../hooks/useToastNotification"
import { categoriesModal } from "../../pages/protected/Categories"
import { ISubCategory } from "../../types/category"
import { FaDotCircle, FaPen, FaTrash } from "react-icons/fa"

type Props = {
  openModal: (val: categoriesModal) => void
  subCategories: ISubCategory[]
  selectedSubcategoryIndex: number | null
  setSelectedSubcategoryIndex: (val: number) => void
  setItemIndex: (val: number | null) => void
  handleDeleteItem: (subCateIndex: number, itemIndex: number) => void
  handleSelectSubcategory: (subCateIndex: number) => void
}

const SubCategoriesItems = ({
  openModal,
  subCategories,
  selectedSubcategoryIndex,
  setSelectedSubcategoryIndex,
  handleDeleteItem,
  setItemIndex,
  handleSelectSubcategory,
}: Props) => {
  const { addNotification } = useToastNotification()

  return (
    <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold mb-2.5">
          Sub Categories Items
        </label>
        <button
          className="w-[80px] text-orange-color bg-[#fcf0e0] dark:bg-dark-ev3 mt-0 cursor-pointer mx-0 my-2.5 px-2.5 py-[5px] rounded-[0.2rem] border-none"
          onClick={() => {
            if (selectedSubcategoryIndex === null) {
              addNotification("Select sub category")
              return
            }
            setItemIndex(null)
            openModal("addNameLink")
          }}
        >
          Add
        </button>
      </div>
      {subCategories.map((subcategory, subcategoryIndex) => (
        <>
          {selectedSubcategoryIndex === subcategoryIndex && (
            <>
              <div className="text-orange-color capitalize text-[10px]">
                {subcategory.name}:
              </div>
              {subcategory.items &&
                subcategory.items.map((item, itemIndex) => (
                  <div
                    className="cursor-pointer mb-[5px] px-2.5 py-0 rounded-[0.2rem]"
                    onClick={() =>
                      setSelectedSubcategoryIndex(subcategoryIndex)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <FaDotCircle className="text-[10px] flex mr-2.5 mt-2" />
                        <div
                          onClick={() =>
                            handleSelectSubcategory(subcategoryIndex)
                          }
                        >
                          {item.name}
                          <div className="text-[10px] italic mt-[-5px]">
                            {item.path}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaPen
                          className="cursor-pointer text-[10px]"
                          onClick={() => {
                            setSelectedSubcategoryIndex(subcategoryIndex)
                            setItemIndex(itemIndex)
                            openModal("addNameLink")
                          }}
                        />
                        <FaTrash
                          className="cursor-pointer text-[10px] text-malon-color"
                          onClick={() => {
                            handleDeleteItem(subcategoryIndex, itemIndex)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </>
      ))}
    </div>
  )
}

export default SubCategoriesItems
