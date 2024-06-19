import { Dispatch, SetStateAction, useState } from "react"
import { colors } from "../../utils/constants"
import { FaQuestionCircle } from "react-icons/fa"
import Modal from "../../components/ui/Modal"
import Condition from "../../pages/defaults/info/Condition"
import MultiSelect from "../../components/ui/MultiSelect"

type InputProps = {
  keyFeatures: string
  color: string[]
  condition: string
  material: string
}

type errorsProps = {
  keyFeatures: string
  color: string
  condition: string
  material: string
}

type InputData = InputProps & {
  selectedSize: string
  specification: string
  brand: string
  tag: string
  name: string
  product: string
  category: string
  subCategory: string
  description: string
  price: string
  image: string
}

type Props = {
  input: InputProps
  validationError: errorsProps
  setInput: Dispatch<SetStateAction<InputData>>
}

const Features = ({ input, validationError, setInput }: Props) => {
  const [showConditionModal, setShowConditionModal] = useState(false)

  const handleOnChange = (
    text: string | string[],
    inputVal: keyof typeof input
  ) => {
    setInput((prevState) => ({ ...prevState, [inputVal]: text }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative flex flex-col mr-5 w-full gap-2">
        <label className=" flex items-center">
          Color{" "}
          <div
            data-content="How can I ensure that color of the 
                  product is clear? For you to get accuracy in 
                  color. Please take photos using a good source 
                  of natural light to ensure clear color. The 
                  best and 
                  accurate photos always sale 95% faster"
            className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
          >
            <FaQuestionCircle className="text-black ml-2.5 dark:text-white" />
          </div>
        </label>
        <div className="w-auto lg:w-[70%] text-sm leading-[1.2]">
          Specify the main colour of the product (choose 2 colours minimum)
        </div>

        <MultiSelect
          onChange={(values) => handleOnChange(values, "color")}
          options={colors}
          selected={input.color}
        />
        {validationError.color && (
          <div className="text-[red] text-xs">{validationError.color}</div>
        )}
      </div>

      <div className="relative flex flex-col mr-5 w-full gap-2">
        <label className="flex items-center">
          Material{" "}
          <div
            data-content="How do I know what the primary material of the product is? This information is mostly indicated on the Product labels, please refer to the label detailing the composition of your Product."
            className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
          >
            <FaQuestionCircle className="text-black ml-2.5 dark:text-white" />
          </div>
        </label>

        <div className="w-auto lg:w-[70%] text-sm leading-[1.2]">
          Specify Product's primary material.
        </div>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.material}
            onChange={(e) => handleOnChange(e.target.value, "material")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-dark-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
          >
            <option value="">-- select --</option>
            <option value="Acrylic">Acrylic</option>
            <option value="Cashmere">Cashmere</option>
            <option value="Cloth">Cloth</option>
            <option value="Cotton">Cotton</option>
            <option value="Exotic leathers">Exotic leathers</option>
            <option value="Faux fur">Faux fur</option>
            <option value="Fur">Fur</option>
            <option value="Faux Leather">Faux Leather</option>
            <option value="Leather">Leather</option>
            <option value="Linen">Linen</option>
            <option value="Polyester">Polyester</option>
            <option value="Polyurethane">Polyurethane</option>
            <option value="Pony-style calfskin">Pony-style calfskin</option>
            <option value="Suede">Suede</option>
            <option value="Silk">Silk</option>
            <option value="Rayon">Rayon</option>
            <option value="Synthetic">Synthetic</option>
            <option value="Spandex">Spandex</option>
            <option value="Tweed">Tweed</option>
            <option value="Vegan leather">Vegan leather</option>
            <option value="Velvet">Velvet</option>
            <option value="Wool">Wool</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {validationError.material && (
          <div className="text-[red] text-xs">{validationError.material}</div>
        )}
      </div>

      <div className="relative flex flex-col mr-5 w-full gap-2">
        <label className="flex items-center">
          Condition{" "}
          <div
            data-content="What happens if I’m not certain of my product condition?
                  Should you not be certain which condition your product falls under when listing, we suggest you choose between the last three option depending on what you see (if your product isn’t NEW or with TAG) and take very clear visible photos indicating every little details. Also, to avoid returns and help you sell fast, give every possible information in your product description so as to clearly inform buyer about your product’s condition."
            className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
          >
            <FaQuestionCircle className="text-black ml-2.5 dark:text-white" />
          </div>{" "}
          <span
            className="underline text-[11px] font-normal cursor-pointer ml-2.5 hover:text-orange-color"
            onClick={() => setShowConditionModal(true)}
          >
            help?
          </span>
        </label>
        <Modal
          onClose={() => setShowConditionModal(false)}
          isOpen={showConditionModal}
        >
          <Condition />
        </Modal>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.condition}
            onChange={(e) => handleOnChange(e.target.value, "condition")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 dark:bg-dark-ev1 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
          >
            <option value="">-- select --</option>
            <option value="New with Tags">New with Tags</option>
            <option value="New with No Tags">New with No Tags</option>
            <option value="Excellent Condition">Excellent Condition</option>
            <option value="Good Condition">Good Condition</option>
            <option value="Fair Condition">Fair Condition</option>
          </select>
        </div>
        {validationError.condition && (
          <div className="text-[red] text-xs">{validationError.condition}</div>
        )}
      </div>

      <div className="relative flex flex-col mr-5 w-full gap-2">
        <label className="">Key Features: Pattern & Printed</label>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.keyFeatures}
            onChange={(e) => handleOnChange(e.target.value, "keyFeatures")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
          >
            <option value="">-- select --</option>
            <option value="Abstract">Abstract</option>
            <option value="Argyle">Argyle</option>
            <option value="Camo">Camo</option>
            <option value="Checked">Checked</option>
            <option value="Chevron & Herringbone">Chevron & Herringbone</option>
            <option value="Color Block">Color Block</option>
            <option value="Crocodile">Crocodile</option>
            <option value="Floral">Floral</option>
            <option value="Gingham">Gingham</option>
            <option value="Graphic">Graphic</option>
            <option value="Houndstooth">Houndstooth</option>
            <option value="Leopard">Leopard</option>
            <option value="Metalic">Metalic</option>
            <option value="Paisley">Paisley</option>
            <option value="Plain">Plain</option>
            <option value="Polkadot">Polkadot</option>
            <option value="Snakeskin">Snakeskin</option>
            <option value="Stripes">Stripes</option>
            <option value="Stars">Stars</option>
            <option value="Solid">Solid</option>
            <option value="Tartan">Tartan</option>
            <option value="Tie-Dye">Tie-Dye</option>
            <option value="Tropical">Tropical</option>
            <option value="Tweed">Tweed</option>
            <option value="Zebra">Zebra</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {validationError.keyFeatures && (
          <div className="text-[red] text-xs">
            {validationError.keyFeatures}
          </div>
        )}
      </div>
    </div>
  )
}

export default Features
