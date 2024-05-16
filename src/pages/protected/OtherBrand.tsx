import { useEffect, useState } from "react"
import { FaCheck, FaDotCircle, FaTimes } from "react-icons/fa"
import { IBrand } from "../../types/product"
import useBrands from "../../hooks/useBrand"
import useToastNotification from "../../hooks/useToastNotification"
import useAuth from "../../hooks/useAuth"

const OtherBrand = () => {
  const [refresh, setRefresh] = useState(true)

  const { addNotification } = useToastNotification()
  const { brands, error, fetchAdminBrands } = useBrands()

  useEffect(() => {
    fetchAdminBrands()
  }, [])

  useEffect(() => {
    if (error) addNotification(error)
  }, [error])

  return (
    <div className="flex-[4] mb-5 px-5 py-0">
      <div className="flex flex-col mr-5 mt-2.5">
        <label className="text-sm font-semibold mb-2.5">Brand List</label>
      </div>
      {brands.map((c, index) => (
        <OtherBrandRow
          key={index}
          brand={c}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ))}
    </div>
  )
}

export default OtherBrand

type Props = {
  brand: IBrand
  refresh: boolean
  setRefresh: (val: boolean) => void
}

const OtherBrandRow = ({ brand, refresh, setRefresh }: Props) => {
  const [newName, setNewName] = useState(brand.name)
  const [isEdit, setIsEdit] = useState(false)

  const { deleteBrand, updateBrand } = useBrands()
  const { addNotification } = useToastNotification()
  const { user } = useAuth()

  const handleEdit = () => {
    setIsEdit(true)
  }
  const handleEditClose = () => {
    setIsEdit(false)
  }

  // TODO:
  const handleSave = async () => {}

  const deleteHandler = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${brand.name} brand, this cannot be undo`
    )
    if (!confirm) {
      return
    }

    const data = await deleteBrand(brand._id)

    if (data.message) addNotification(data.message)
  }

  const handleSubmit = async () => {
    const data = await updateBrand(brand._id, {
      name: newName,
      published: user?.role === "Admin" ?? false,
    })
    if (data) addNotification("Brand added to list")
    setRefresh(!refresh)
    setIsEdit(false)
  }

  return (
    <div className="max-w-[300px] flex items-center justify-between text-sm capitalize mb-[5px] m-0">
      {isEdit ? (
        <>
          <input
            className="w-[250px] h-[30px] border pl-2.5 focus:outline-none placeholder:text-xs border-light-ev3 dark:border-dark-ev3 text-black-color dark:text-white-color   focus:border focus:border-orange-color"
            name="brand"
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
          <FaTimes
            onClick={handleEditClose}
            className="text-xl ml-2.5 cursor-pointer mr-2.5 text-malon-color"
          />
          <FaCheck
            className="text-xl ml-2.5 cursor-pointer mr-2.5 text-orange-color"
            onClick={handleSubmit}
          />
        </>
      ) : (
        <>
          <div className="flex items-center">
            <FaDotCircle className="text-[8px] mr-2.5" />
            <div
              className={`${brand.published ? "line-through text-[gray]" : ""}`}
            >
              {brand.name}
            </div>
          </div>
          <div>
            <button
              className="text-sm text-[grey] px-[5px] py-0.5 mr-2.5 rounded-[0.2rem] border-0 bg-[#fcf0e0] dark:bg-dark-ev3"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="text-sm text-orange-color px-[5px] mr-2.5 py-0.5 rounded-[0.2rem] border-0 bg-[#fcf0e0] dark:bg-dark-ev3"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-sm text-red-color px-[5px] py-0.5 rounded-[0.2rem] border-0 bg-[#f8d6d6] dark:bg-[#211111]"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>{" "}
        </>
      )}
    </div>
  )
}
