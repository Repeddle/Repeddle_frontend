import { ChangeEvent, useEffect, useState } from "react"
import {
  FaDotCircle,
  FaLink,
  FaPen,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa"
import LoadingBox from "../../components/LoadingBox"
import useCategory from "../../hooks/useCategory"
import { ISubCategory } from "../../types/category"

const Categories = () => {
  const {
    categories,
    createCategory,
    deleteCategory,
    error,
    fetchCategories,
    fetchCategoryById,
    updateCategory,
    loading,
  } = useCategory()

  const [refresh, setrefresh] = useState(false)
  const [category, setCategory] = useState({
    name: "",
    isCategory: true,
    path: "",
  })
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([])

  useEffect(() => {
    fetchCategories()
  }, [refresh])

  const handleCategoryNameChange = (
    name: keyof typeof category,
    value: string | boolean
  ) => {
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const uploadImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }

  return (
    <div className="flex-[4] mb-5 px-5 py-0">
      <h1 className="text-[calc(1.375rem_+_1.5vw)] leading-tight">
        Categories
      </h1>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="flex-1 p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
          <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
            <label className="text-sm font-semibold mb-2.5">
              Category Name
            </label>
            <div className="flex items-center justify-between">
              <input
                className="h-10 p-2.5 rounded-[0.2rem] bg-none text-black-color dark:text-white-color border border-light-ev3 dark:border-dark-ev3 focus-visible:outline focus-visible:outline-orange-color"
                onChange={(e) =>
                  handleCategoryNameChange("name", e.target.value)
                }
                type="text"
                value={category.name}
                placeholder="Enter category name"
              />
              <FaLink
                className="cursor-pointer ml-2.5"
                onClick={() => openModal("addLink")}
              />
            </div>
            <div className="text-[10px] italic mt-[-5px]">{category.path}</div>
          </div>
          <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
            <label className="text-sm font-semibold mb-2.5">
              Category Image
            </label>
            {imageUpload.loading ? (
              <LoadingBox />
            ) : imageUpload.error ? (
              <div style={{ color: "red" }}>{imageUpload.error}</div>
            ) : imageUpload.image ? (
              <img
                src={imageUpload.image}
                alt="imageupload"
                className="object-contain w-[200px] h-[200px]"
              />
            ) : (
              ""
            )}
            <input
              id="uploadimage"
              className="hidden"
              type="file"
              onChange={uploadImageHandler}
            />
            <label
              className="border border-malon-color text-sm cursor-pointer text-center mt-[5px] px-[5px] py-0.5 rounded-[0.2rem]"
              htmlFor="uploadimage"
            >
              Upload
            </label>
          </div>
          <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold mb-2.5">
                Sub Categories
              </label>
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
                    <div
                      onPress={() => handleSelectSubcategory(subcategoryIndex)}
                    >
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
          <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold mb-2.5">
                Sub Categories Items
              </label>
              <button
                className="w-[80px] text-orange-color bg-[#fcf0e0] dark:bg-dark-ev3 mt-0 cursor-pointer mx-0 my-2.5 px-2.5 py-[5px] rounded-[0.2rem] border-none"
                onClick={() => {
                  if (selectedSubcategoryIndex === null) {
                    ctxDispatch({
                      type: "SHOW_TOAST",
                      payload: {
                        message: "Select sub category",
                        showStatus: true,
                        state1: "visible1 error",
                      },
                    })
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
                                onPress={() =>
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

          <button
            className="w-[200px] bg-orange-color text-white-color cursor-pointer mx-0 my-2.5 px-2.5 py-[5px] rounded-[0.2rem] border-none"
            onClick={submitHandler}
          >
            {editCat ? "Update Category" : "Add Category"}
          </button>
          {editCat ? (
            <FaTimes onClick={() => cancelEdit()} className="ml-2.5" />
          ) : (
            ""
          )}

          {modal.addNameLink && (
            <Modal onClose={() => closeModal("addNameLink")}>
              <FormModal
                onSubmit={itemIndex !== null ? handleItemChange : handleAddItem}
                onClose={() => closeModal("addNameLink")}
                title="Add Name and Link"
                category={
                  itemIndex !== null
                    ? subCategories[selectedSubcategoryIndex].items[itemIndex]
                    : {
                        name: "",
                        isCategory: true,
                        path: "",
                      }
                }
                nameLabel="Name:"
                linkLabel="Link:"
                index={selectedSubcategoryIndex}
                itemIndex={itemIndex}
              />
            </Modal>
          )}
          {modal.addNameLink2 && (
            <Modal onClose={() => closeModal("addNameLink2")}>
              <FormModal
                onSubmit={
                  selectedSubcategoryIndex !== null
                    ? handleSubcategoryChange
                    : handleAddSubcategory
                }
                onClose={() => closeModal("addNameLink2")}
                category={
                  selectedSubcategoryIndex !== null
                    ? subCategories[selectedSubcategoryIndex]
                    : {
                        name: "",
                        isCategory: true,
                        path: "",
                      }
                }
                nameLabel="Name:"
                linkLabel="Link:"
                index={selectedSubcategoryIndex}
              />
            </Modal>
          )}
          {modal.addLink && (
            <Modal onClose={() => closeModal("addLink")}>
              <FormModal
                onSubmit={handleCategoryPathChange}
                onClose={() => {
                  closeModal("addLink")
                }}
                category={category}
                linkLabel="Link:"
              />
            </Modal>
          )}
        </div>
        <div className="flex-1 p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
          <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
            <label className="text-sm font-semibold mb-2.5">
              Categories List
            </label>
          </div>
          {categories.map((c, index) => (
            <div
              className="max-w-[300px] flex items-center justify-between text-sm capitalize mb-[5px] m-0"
              key={index}
            >
              <div>
                <FaDotCircle className="text-malon-color text-[8px] mr-2.5" />
                {c.name}
              </div>
              <div>
                <div
                  className="text-sm mr-2.5 px-[5px] py-0.5 rounded-[0.2rem] border-0 text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0]"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </div>
                <div
                  className="text-sm mr-2.5 px-[5px] py-0.5 rounded-[0.2rem] border-0 text-red-color bg-[#f8d6d6] dark:bg-[#211111]"
                  onClick={() => deleteHandler(c)}
                >
                  Delete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
