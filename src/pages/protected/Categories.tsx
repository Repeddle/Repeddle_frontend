import { ChangeEvent, useEffect, useState } from "react"
import useCategory from "../../hooks/useCategory"
import { ICategory, ISubCategory, ISubCategoryItem } from "../../types/category"
import useToastNotification from "../../hooks/useToastNotification"
import FormModal from "../../components/FormModal"
import Modal from "../../components/ui/Modal"
import RightCategories from "../../section/categories/RightCategories"
import SubCategoriesItems from "../../section/categories/SubCategoriesItems"
import SubCategories from "../../section/categories/SubCategories"
import CategoriesImageUpload from "../../section/categories/CategoriesImageUpload"
import CategoryComp from "../../section/categories/CategoryComp"
import { compressImageUpload } from "../../utils/common"
import { getBackendErrorMessage } from "../../utils/error"
import { FaTimes } from "react-icons/fa"

export type categoriesModal = "addNameLink" | "addLink" | "addNameLink2"

const Categories = () => {
  const {
    categories,
    createCategory,
    deleteCategory,
    error,
    fetchCategories,
    updateCategory,
    loading,
  } = useCategory()
  const { addNotification } = useToastNotification()

  const [refresh, setrefresh] = useState(false)
  const [category, setCategory] = useState({
    name: "",
    isCategory: true,
    path: "",
  })
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([])
  const [itemIndex, setItemIndex] = useState<number | null>(null)
  const [editCat, setEditCat] = useState(false)
  const [editCurrentCat, setEditCurrentCat] = useState<ICategory | null>(null)
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState<
    number | null
  >(null)
  const [modal, setModal] = useState({
    addNameLink: false,
    addLink: false,
    addNameLink2: false,
  })

  const [imageUpload, setImageUpload] = useState({
    loading: false,
    image: "",
    error: "",
  })

  useEffect(() => {
    fetchCategories()
  }, [refresh])

  const openModal = (modalName: categoriesModal) => {
    setModal((prevModal) => ({
      ...prevModal,
      [modalName]: true,
    }))
  }
  const closeModal = (modalName: categoriesModal) => {
    setModal((prevModal) => ({
      ...prevModal,
      [modalName]: false,
    }))
  }

  const handleCategoryNameChange = (
    name: keyof typeof category,
    value: string | boolean
  ) => {
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const uploadImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setImageUpload((prev) => ({ ...prev, loading: true }))

      const file = e.target.files?.[0]
      if (!file) throw Error("No image found")

      const imageUrl = await compressImageUpload(file, 1024, imageUpload.image)

      setImageUpload((prev) => ({
        ...prev,
        loading: false,
        error: "",
        image: imageUrl,
      }))

      addNotification("Image uploaded")
    } catch (err) {
      setImageUpload((prev) => ({
        ...prev,
        loading: false,
        error: getBackendErrorMessage(err),
      }))
      addNotification("Failed uploading image")
      console.log(getBackendErrorMessage(err))
    }
  }

  const handleAddItem = (
    subcategoryIndex: number,
    name: string,
    isCategory: boolean,
    path: string
  ) => {
    const newSubCategories = subCategories.map((subcategory, index) => {
      if (index === subcategoryIndex) {
        const updatedItems: ISubCategoryItem[] = [
          ...subcategory.items,
          { name, isCategory, path, _id: "" },
        ]

        return {
          ...subcategory,
          items: updatedItems,
        }
      }
      return subcategory
    })

    setSubCategories(newSubCategories)
  }

  const handleEdit = async (cat: ICategory) => {
    setEditCat(true)
    setEditCurrentCat(cat)
    setCategory({ name: cat.name, path: cat.path, isCategory: true })
    setImageUpload({
      loading: false,
      image: cat.image,
      error: "",
    })
    setSubCategories(cat.subCategories)
  }

  const cancelEdit = () => {
    setEditCat(false)
    setEditCurrentCat(null)
    setCategory({ name: "", path: "", isCategory: true })
    setSubCategories([])
    setImageUpload({
      loading: false,
      image: "",
      error: "",
    })
  }

  const handleCategoryPathChange = (
    name: string,
    isCategory: boolean,
    path: string
  ) => {
    const newCategory = {
      name,
      isCategory,
      path,
    }
    setCategory(newCategory)
  }

  const handleDeleteItem = (subCateIndex: number, itemIndex: number) => {
    const newSubCategories = subCategories.map((subCate, i) => {
      if (i === subCateIndex) {
        const updatedItems = subCate.items.filter((_, idx) => idx !== itemIndex)

        return {
          ...subCate,
          items: updatedItems,
        }
      }
      return subCate
    })

    setSubCategories(newSubCategories)
  }

  const handleAddSubcategory = (
    name: string,
    isCategory: boolean,
    path: string
  ) => {
    const newSubcategory: ISubCategory = {
      name,
      isCategory,
      path,
      _id: "",
      items: [],
    }
    setSubCategories([...subCategories, newSubcategory])
  }

  const handleSubcategoryChange = (
    index: number,
    name: string,
    isCategory: boolean,
    path: string
  ) => {
    const updatedSubCategories = [...subCategories]
    updatedSubCategories[index].name = name
    updatedSubCategories[index].isCategory = isCategory
    updatedSubCategories[index].path = path
    setSubCategories(updatedSubCategories)
  }

  const handleSelectSubcategory = (index: number) => {
    setSelectedSubcategoryIndex(index)
  }

  const handleDeleteSubcategory = (subCatIndex: number) => {
    const newSubCategories = subCategories.filter(
      (_, index) => index !== subCatIndex
    )
    setSubCategories(newSubCategories)
  }

  const handleItemChange = (
    subcategoryIndex: number,
    itemIndex: number,
    name: string,
    isCategory: boolean,
    path: string
  ) => {
    const updatedSubCategories = [...subCategories]
    updatedSubCategories[subcategoryIndex].items[itemIndex].name = name
    updatedSubCategories[subcategoryIndex].items[itemIndex].isCategory =
      isCategory
    updatedSubCategories[subcategoryIndex].items[itemIndex].path = path
    setSubCategories(updatedSubCategories)
  }

  const deleteHandler = async (cate: ICategory) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${cate.name} category, this cannot be undo`
    )

    if (!confirm) return

    const res = await deleteCategory(cate._id)
    if (res) {
      addNotification("category has been deleted")
    } else {
      addNotification(error ?? "category has been deleted")
    }
  }

  const submitHandler = async () => {
    if (!category.name) {
      addNotification("Enter a valid category name")
      return
    }

    if (!imageUpload.image) {
      addNotification("upload a category image")
      return
    }

    if (!editCat) {
      const exist = categories.some((e) => e.name === category.name)
      if (exist) {
        addNotification("Category name already exist")
        return
      }

      const res = await createCategory({
        image: imageUpload.image,
        ...category,
        subCategories,
      })
      if (res) {
        addNotification("Categories Added")
      } else {
        addNotification(error ?? "Failed to create categories")
      }
    } else {
      if (!editCurrentCat) return
      const res = await updateCategory(editCurrentCat._id, {
        image: imageUpload.image,
        ...category,
        subCategories,
      })

      if (res) {
        addNotification("Categories Updated")
      } else {
        addNotification(error ?? "Failed to update categories")
      }
    }

    setCategory({ name: "", path: "", isCategory: true })
    setSubCategories([])
    setEditCurrentCat(null)
    setImageUpload({ loading: false, image: "", error: "" })
    setrefresh(!refresh)
  }

  return (
    <div className="flex-[4] mb-5 px-5 py-0">
      <h1 className="text-[calc(1.375rem_+_1.5vw)] leading-tight">
        Categories
      </h1>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="flex-1 p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
          <CategoryComp
            category={category}
            openModal={openModal}
            handleCategoryNameChange={handleCategoryNameChange}
          />

          <CategoriesImageUpload
            imageUpload={imageUpload}
            uploadImageHandler={uploadImageHandler}
          />

          <SubCategories
            openModal={openModal}
            handleSelectSubcategory={handleSelectSubcategory}
            subCategories={subCategories}
            setItemIndex={setItemIndex}
            setSelectedSubcategoryIndex={setSelectedSubcategoryIndex}
            selectedSubcategoryIndex={selectedSubcategoryIndex}
            handleDeleteSubcategory={handleDeleteSubcategory}
          />

          <SubCategoriesItems
            openModal={openModal}
            handleDeleteItem={handleDeleteItem}
            handleSelectSubcategory={handleSelectSubcategory}
            selectedSubcategoryIndex={selectedSubcategoryIndex}
            setItemIndex={setItemIndex}
            setSelectedSubcategoryIndex={setSelectedSubcategoryIndex}
            subCategories={subCategories}
          />

          <button
            className="w-[200px] bg-orange-color text-white-color cursor-pointer mx-0 my-2.5 px-2.5 py-[5px] rounded-[0.2rem] border-none"
            onClick={submitHandler}
            disabled={loading}
          >
            {editCat ? "Update Category" : "Add Category"}
          </button>

          {editCat && (
            <FaTimes onClick={() => cancelEdit()} className="ml-2.5" />
          )}

          {/* the check is necessary if not the useState does not receive the update value */}
          {modal.addNameLink && selectedSubcategoryIndex !== null && (
            <Modal
              isOpen={modal.addNameLink}
              onClose={() => closeModal("addNameLink")}
            >
              <FormModal
                onClose={() => closeModal("addNameLink")}
                handleSubAdd={handleAddItem}
                handleChange={handleItemChange}
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

          {/* the check is necessary if not the useState does not receive the update value */}
          {modal.addNameLink2 && (
            <Modal
              isOpen={modal.addNameLink2}
              onClose={() => closeModal("addNameLink2")}
            >
              <FormModal
                onClose={() => closeModal("addNameLink2")}
                handleAdd={handleAddSubcategory}
                handleSubAdd={handleSubcategoryChange}
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
                itemIndex={null}
              />
            </Modal>
          )}

          {/* the check is necessary if not the useState does not receive the update value */}
          {modal.addLink && (
            <Modal isOpen={modal.addLink} onClose={() => closeModal("addLink")}>
              <FormModal
                onClose={() => {
                  closeModal("addLink")
                }}
                category={category}
                linkLabel="Link:"
                handleAdd={handleCategoryPathChange}
                index={null}
                itemIndex={null}
              />
            </Modal>
          )}
        </div>

        <RightCategories
          categories={categories}
          deleteHandler={deleteHandler}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  )
}

export default Categories
