import { useState } from "react"
import { brandsData } from "../../utils/data"
import { IBrand } from "../../types/message"
import { FaCheck, FaDotCircle, FaTimes } from "react-icons/fa"

const OtherBrand = () => {
  const [refresh, setRefresh] = useState(true)

  const brands = brandsData

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

const OtherBrandRow = ({ brand }: Props) => {
  const [newName, setNewName] = useState(brand.name)
  const [isEdit, setIsEdit] = useState(false)

  const handleEdit = () => {
    setIsEdit(true)
  }
  const handleEditClose = () => {
    setIsEdit(false)
  }

  const handleSave = async () => {}

  const deleteHandler = async () => {}

  const handleSubmit = async () => {}

  return (
    <div className="max-w-[300px] flex items-center justify-between text-sm capitalize mb-[5px] m-0">
      {isEdit ? (
        <>
          <input
            className="w-[250px] h-[30px] border pl-2.5 focus:outline-none placeholder:text-xs border-light-ev3 dark:border-dark-ev3 text-black-color dark:text-white-color border-solid focus:border focus:border-orange-color"
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
              className={`${brand.isAdded ? "line-through text-[gray]" : ""}`}
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
