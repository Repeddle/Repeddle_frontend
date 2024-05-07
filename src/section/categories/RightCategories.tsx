import { ICategory } from "../../types/category"
import { FaDotCircle } from "react-icons/fa"

type Props = {
  categories: ICategory[]
  handleEdit: (cat: ICategory) => void
  deleteHandler: (cat: ICategory) => void
}

const RightCategories = ({ categories, deleteHandler, handleEdit }: Props) => {
  return (
    <div className="flex-1 p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
      <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
        <label className="text-sm font-semibold mb-2.5">Categories List</label>
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
  )
}

export default RightCategories
