import { Dispatch, SetStateAction } from "react"
import InputWithLabel2 from "../../components/ui/InputWithLabel2"
import { ICategory } from "../../types/category"

type InputProps = {
  name: string
  product: string
  category: string
  subCategory: string
}

type InputData = InputProps & {
  brand: string
  tag: string
  condition: string
  material: string
  description: string
  price: string
  color: string
  selectedSize: string
  specification: string
  keyFeatures: string
  image: string
}

type Props = {
  categories: ICategory[]
  input: InputProps
  setInput: Dispatch<SetStateAction<InputData>>
  validationError: InputProps
  handleError: (text: string, key: keyof InputProps) => void
}

const Details = ({
  categories,
  input,
  setInput,
  validationError,
  handleError,
}: Props) => {
  const handleOnChange = (text: string, inputVal: keyof typeof input) => {
    setInput((prevState) => ({ ...prevState, [inputVal]: text }))
  }

  return (
    <div className="flex flex-col gap-3">
      <InputWithLabel2
        label="Name"
        value={input.name}
        onChange={(e) => handleOnChange(e, "name")}
        onBlur={() => handleError("", "name")}
        error={validationError.name}
      />
      <div className="relative flex flex-col mr-5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Main Category</label>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.product}
            onChange={(e) => handleOnChange(e.target.value, "product")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
            onBlur={() => handleError("", "product")}
          >
            {categories.length > 0 &&
              categories.map((cat) => (
                <option value={cat.name}>{cat.name}</option>
              ))}
          </select>
        </div>
        {validationError.product && (
          <span className="text-sm text-[red]">{validationError.product}</span>
        )}
      </div>

      <div className="relative flex flex-col mr-5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Category</label>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.category}
            onChange={(e) => handleOnChange(e.target.value, "category")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
          >
            {categories.length > 0 &&
              categories.map(
                (cat) =>
                  cat.name === input.product &&
                  cat.subCategories.map((sub) => (
                    <option value={sub.name}>{sub.name}</option>
                  ))
              )}
          </select>
        </div>
      </div>

      <div className="relative flex flex-col mr-5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Sub Category</label>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.subCategory}
            onChange={(e) => handleOnChange(e.target.value, "subCategory")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
          >
            {categories.length > 0 &&
              categories.map(
                (cat) =>
                  cat.name === input.product &&
                  cat.subCategories.map(
                    (sub) =>
                      sub.name === input.category &&
                      sub.items.map((item) => (
                        <option value={item.name}>{item.name}</option>
                      ))
                  )
              )}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Details
