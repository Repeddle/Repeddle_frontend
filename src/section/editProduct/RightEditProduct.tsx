import { FaQuestionCircle } from "react-icons/fa"
import { InputData, IProduct, ISize } from "../../types/product"
import { currency, region } from "../../utils/common"
import Modal from "../../components/ui/Modal"
import FeeStructure from "../../pages/defaults/info/FeeStructure"
import AddOtherBrand from "../../components/AddOtherBrand"
import useBrands from "../../hooks/useBrand"
import { colors } from "../../utils/constants"

type Props = {
  product: IProduct
  price: string
  setPrice: (val: string) => void
  priceInput: { costPrice: string; sellingPrice: string }
  setPriceInput: (val: { costPrice: string; sellingPrice: string }) => void
  sellingPrice: number
  costPrice: string | null
  discount: number
  validationError: { [key: string]: string }
  input: InputData
  showComissionModal: boolean
  setShowComissionModal: (val: boolean) => void
  addSize: boolean
  setAddSize: (val: boolean) => void
  showOtherBrand: boolean
  setShowOtherBrand: (val: boolean) => void
  brandQuery: string
  setBrandQuery: (val: string) => void
  handleOnChange: (text: string, inputVal: keyof InputData) => void
  sizes: ISize[]
  setSizes: (val: ISize[]) => void
  countInStock: number
  setCountInStock: (val: number) => void
  smallSizeHandler: (label: string, value: string) => void
  handleError: (errorMessage: string, input: string | number) => void
  sizeHandler: (sizenow: string) => void
}

const RightEditProduct = ({
  product,
  price,
  setPrice,
  setPriceInput,
  priceInput,
  costPrice,
  sellingPrice,
  discount,
  setShowComissionModal,
  showComissionModal,
  input,
  validationError,
  brandQuery,
  setBrandQuery,
  handleOnChange,
  setShowOtherBrand,
  showOtherBrand,
  addSize,
  setAddSize,
  setSizes,
  sizes,
  countInStock,
  setCountInStock,
  handleError,
  smallSizeHandler,
  sizeHandler,
}: Props) => {
  const { brands: searchBrand } = useBrands()

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-start flex-col lg:flex-row lg:items-center">
        <div className="relative flex flex-col lg:w-[118px] mr-[5px] mt-2.5 w-full">
          <label className="text-sm mt-[15px] mb-2.5">Cost Price</label>
          <input
            className="border h-10 bg-transparent p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
            type="number"
            placeholder={product.costPrice?.toString()}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="relative flex flex-col lg:w-[118px] mr-[5px] mt-2.5 w-full">
          <label className="text-sm mt-[15px] mb-2.5">Selling Price</label>
          <div className="flex items-center">
            <input
              className="border h-10 bg-transparent p-2.5 w-[100px] mr-[5px] rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
              placeholder={product.sellingPrice.toString()}
              type="number"
              onChange={(e) => {
                setPriceInput({
                  ...priceInput,
                  sellingPrice: e.target.value,
                })
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2.5">
        <div
          className={`text-2xl text-malon-color mt-3 ${
            sellingPrice && "line-through"
          }`}
        >
          {costPrice}
        </div>
        <div className="text-2xl text-orange-color mt-3 font-light">
          {currency(region())}
          {sellingPrice}
        </div>
        {discount ? (
          <span className="text-[11px] self-end">
            {discount.toFixed(0)}% discount
          </span>
        ) : null}
      </div>
      <div className="flex m-2.5">
        <div className="text-[25px] font-light mr-5 text-orange-color">
          {currency(product.region)}
          {discount || price}
        </div>
        <div className="text-[25px] font-light line-through text-malon-color">
          {discount
            ? discount < parseInt(price)
              ? `${currency(product.region)}${price}`
              : null
            : null}
        </div>
      </div>
      <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
        <div
          onClick={() => setShowComissionModal(true)}
          className="text-[red] text-xs underline cursor-pointer"
        >
          Our Commission
        </div>
      </div>
      <Modal
        onClose={() => setShowComissionModal(false)}
        isOpen={showComissionModal}
        size="lg"
      >
        <FeeStructure />
      </Modal>
      <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Brands</label>
        <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
          Can't find the brand you're listing? Search & use Other
        </div>
        <input
          className="border h-10 bg-transparent p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
          placeholder="Search Brand"
          type="search"
          value={input.brand.length > 0 ? input.brand : brandQuery}
          onChange={(e) => {
            handleOnChange("", "brand")
            setBrandQuery(e.target.value)
          }}
          onBlur={() => input.brand.length > 0 && setBrandQuery("")}
        />
        <div className="absolute max-h-[300px] overflow-auto z-[9] rounded-br-[0.2rem] rounded-bl-[0.2rem] top-[120px] bg-light-ev2 dark:bg-dark-ev2">
          {searchBrand &&
            brandQuery.length > 0 &&
            [...searchBrand, { name: "Other", _id: Math.random() }].map((b) => (
              <div
                className="text-[15px] cursor-pointer px-5 py-2.5 hover:bg-light-ev3 dark:hover:bg-dark-ev3"
                key={b._id}
                onClick={() => {
                  if (b.name === "Other") {
                    setShowOtherBrand(true)
                  } else {
                    handleOnChange(b.name, "brand")
                  }
                  setBrandQuery("")
                }}
              >
                {b.name}
              </div>
            ))}
        </div>

        <Modal onClose={() => setShowOtherBrand(false)} isOpen={showOtherBrand}>
          <AddOtherBrand
            setShowOtherBrand={setShowOtherBrand}
            handleOnChange={handleOnChange}
          />
        </Modal>
        {validationError.brand && (
          <div className="text-[red] text-xs">{validationError.brand}</div>
        )}
      </div>
      <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
        <label className="text-sm mt-[15px] flex mb-2.5 items-center">
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
            <FaQuestionCircle className="text-black ml-2.5" />
          </div>
        </label>
        <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
          Specify the main colour of the product (choose 2 colours minimum)
        </div>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.color}
            multiple
            onChange={(e) => handleOnChange(e.target.value, "color")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
          >
            <option value="">-- select --</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {validationError.color && (
          <div className="text-[red] text-xs">{validationError.color}</div>
        )}
      </div>
      <div className="flex mt-5 mb-2.5 items-center">
        <label className="mr-2.5">Item do not require size</label>
        <input
          type="checkbox"
          className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
  before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
  appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
          checked={addSize}
          onChange={(e) => {
            setSizes([])
            setAddSize(e.target.checked)
          }}
        />
      </div>
      <div className="flex lg:flex-row lg:gap-5 flex-col gap-0 m-0 lg:mb-5">
        {!addSize ? (
          <div className="flex-1">
            <>
              <div className="relative flex flex-col lg:w-[400px] mr-5 mt-0 w-full">
                <label className="text-sm flex items-center mt-[15px] mb-2.5">
                  Add Size
                  <div
                    data-content="If I feel the product and the size seems to differ from what indicated on the label, what should I do?
            Please be advised to list the product with the size printed on the label. Mentioning the size discrepancy, you noticed in the product description helps a great deal for buyers to make informed size decision. If buyers are forewarned, they will not be disappointed. This minimizes the chances of your products been returned as a result of unfit size."
                    className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
            hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
            lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
          hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                  >
                    <FaQuestionCircle className="text-black ml-2.5" />
                  </div>
                </label>

                <div className="flex bg-transparent overflow-hidden items-center border h-10 rounded-[0.2rem] border-light-ev4 dark:border-dark-ev4">
                  <input
                    className="flex-1 h-10 p-2.5 border-0 focus-visible:outline-none bg-transparent"
                    value={input.selectedSize}
                    type="text"
                    maxLength={4}
                    placeholder="Add size"
                    onChange={(e) => {
                      handleOnChange(e.target.value.slice(0, 4), "selectedSize")
                      handleError("", "selectedSize")
                    }}
                  />
                  <div
                    className="text-white cursor-pointer mx-[5px] my-0 px-[5px] py-0.5 bg-malon-color"
                    onClick={() => sizeHandler(input.selectedSize)}
                  >
                    Add
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
                  Provide the exact size as indicated on your product's label.
                </div>
                {sizes.map((s) => (
                  <div className="m-2.5">
                    <label className="text-sm mt-[15px] mb-2.5">{s.size}</label>
                    :
                    <input
                      className="bg-transparent numeric-arrow ml-[5px] text-xs border h-5 w-10 p-2.5 rounded-[0.2rem] text-black dark:text-white focus-visible:outline focus-visible:outline-orange-color"
                      placeholder="qty"
                      type="number"
                      maxLength={4}
                      value={s.quantity}
                      onChange={(e) => {
                        smallSizeHandler(s.size, e.target.value.slice(0, 4))
                        handleError("", "selectedSize")
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          </div>
        ) : (
          <div className="relative flex flex-col lg:w-[400px] mr-5 mt-0 w-full">
            <label className="text-sm mt-[15px] mb-2.5">Count in stock</label>
            <input
              className="border h-10 bg-transparent p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(+e.target.value)}
            />
          </div>
        )}
      </div>
      {validationError.selectedSize && (
        <div className="text-[red] text-xs">{validationError.selectedSize}</div>
      )}
      <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Specification</label>
        <textarea
          className="h-[100px] p-2.5 rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4 text-black dark:text-white bg-transparent focus-visible:outline focus-visible:outline-orange-color"
          value={input.specification}
          placeholder="FOR CHILDREN'S WEAR/SH0ES, Please manually enter the Size/Age
brackets as shown on the label of clothes/shoes"
          onChange={(e) => handleOnChange(e.target.value, "specification")}
        />
      </div>
      <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">
          Key Features: Pattern & Printed
        </label>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
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

export default RightEditProduct
