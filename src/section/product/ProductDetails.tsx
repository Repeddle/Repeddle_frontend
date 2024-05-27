import { useState } from "react"
import { IProduct } from "../../types/product"
import { currency } from "../../utils/common"

type Props = { product: IProduct }

const ProductDetails = ({ product }: Props) => {
  const [openOverview, setOpenOverview] = useState(false)
  const [openItemDetail, setOpenItemDetail] = useState(false)
  const [openCondition, setOpenCondition] = useState(false)
  const [openShipping, setOpenShipping] = useState(false)
  const [openFeatures, setOpenFeatures] = useState(false)
  const [openSpecifications, setOpenSpecifications] = useState(false)

  const conditionDetails = (item: string) => {
    if (item === "New with Tags") {
      return "New with Tags: A preowned secondhand product that has never been worn or used. These products reflect no sign of use and has its original purchase tags on it. This product shows no alterations, no defects and comes with Original purchase tags."
    } else if (item === "New with No Tags") {
      return "A preowned secondhand product that has never been worn or use but doesn’t have original purchase tags. This product should show no defects or alterations."
    } else if (item === "Excellent Condition") {
      return "A preowned secondhand Product still in an excellent condition that has only been used or worn very slightly, (perhaps 1–3 times) and carefully maintained. These Product may reflect very minimal worn or usage sign. Product do not have any damage on the fabric or material, no worn smell and no missing accessory, button or pieces. "
    } else if (item === "Good Condition") {
      return "A preowned secondhand product in a very good condition which has been used or worn and properly maintained. No remarkable defects (Tear, Hole or Rust) expected."
    } else if (item === "Fair Condition") {
      return "A preowned secondhand product which has been frequently used or worn. Products may show reasonable defects signs, scratches, worn corners or interior wear. Defects are shown on product photos and mentioned in description."
    } else {
      return "No condition Selected"
    }
  }

  return (
    <div className="flex flex-col p-[15px]">
      <div className={`w-full ${openOverview ? "active" : ""} flex flex-col`}>
        <div
          className={`cursor-pointer relative uppercase mb-[5px] before:content-['_'] before:w-2.5 before:h-2.5
          before:-translate-y-2/4 before:absolute before:border-b  before:border-l before:right-5
          before:top-2/4  sp_condition_cont before:border-black dark:before:border-white ${
            openOverview ? "before:rotate-[134deg]" : "before:-rotate-45"
          }`}
          onClick={() => setOpenOverview(!openOverview)}
        >
          Overview
        </div>
        <div
          className={`overflow-hidden relative transition-[0.5s] ${
            openOverview ? "h-auto ml-5 mb-5" : "h-0"
          }`}
        >
          <div className="w-full mt-0 mb-5 mx-5 border-collapse">
            <tbody>
              <tr>
                <td>Price</td>
                <td>
                  {currency(product.region)}
                  {product.sellingPrice}
                </td>
              </tr>
              <tr>
                <td>Brand</td>
                <td>{product.brand}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{product.category}</td>
              </tr>
              <tr>
                <td>Subcategory</td>
                <td>{product.subCategory || "nal"}</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>{product.color || "nal"}</td>
              </tr>
            </tbody>
          </div>
        </div>
      </div>
      <div className={`w-full ${openItemDetail ? "active" : ""} flex flex-col`}>
        <div
          className={`cursor-pointer relative uppercase mb-2.5 before:content-['_'] before:w-2.5 before:h-2.5
          before:-translate-y-2/4 before:absolute before:border-b  before:border-l before:right-5
          before:top-2/4 before:border-black dark:before:border-white  sp_condition_cont ${
            openItemDetail ? "before:rotate-[134deg]" : "before:-rotate-45"
          }`}
          onClick={() => setOpenItemDetail(!openItemDetail)}
        >
          Item Description
        </div>
        <div
          className={`overflow-hidden relative transition-[0.5s] ${
            openItemDetail ? "h-auto ml-5 mb-5" : "h-0"
          }`}
        >
          {product.description}
        </div>
      </div>
      <div className={`w-full ${openCondition ? "active" : ""} `}>
        <div className="">
          <div
            className={`cursor-pointer relative uppercase mb-2.5 before:content-['_'] before:w-2.5 before:h-2.5
            before:-translate-y-2/4 before:absolute before:border-b  before:border-l before:right-5
            before:top-2/4 sp_condition_cont before:border-black dark:before:border-white ${
              openCondition ? "before:rotate-[134deg]" : "before:-rotate-45"
            }`}
            onClick={() => setOpenCondition(!openCondition)}
          >
            Condition
          </div>
        </div>

        <div
          className={`overflow-hidden relative transition-[0.5s] ${
            openCondition ? "h-auto ml-5 mb-5" : "h-0"
          }`}
        >
          <div className="uppercase text-white-color text-xs flex items-center p-2.5 font-bold rounded-[10px] bg-malon-color">
            {product.condition}
          </div>
          <div className="text-justify">
            {conditionDetails(product.condition)}
          </div>
        </div>
      </div>
      <div className={`w-full ${openShipping ? "active" : ""} flex flex-col`}>
        <div
          className={`cursor-pointer relative uppercase mb-2.5 before:content-['_'] before:w-2.5 before:h-2.5
          before:-translate-y-2/4 before:absolute before:border-b  before:border-l before:right-5
          before:top-2/4 before:border-black dark:before:border-white  ${
            openShipping ? "before:rotate-[134deg]" : "before:-rotate-45"
          }`}
          onClick={() => setOpenShipping(!openShipping)}
        >
          Shipping Location
        </div>
        <div
          className={`overflow-hidden relative transition-[0.5s] ${
            openShipping ? "h-auto ml-5 mb-5" : "h-0"
          }`}
        >
          {product.region === "NGN" ? "Nigeria" : "South Africa"}
        </div>
      </div>
      {product.keyFeatures && product.keyFeatures !== "Other" && (
        <div className={`w-full ${openFeatures ? "active" : ""} flex flex-col`}>
          <div
            className={`cursor-pointer relative uppercase mb-2.5 before:content-['_'] before:w-2.5 before:h-2.5
            before:-translate-y-2/4 before:absolute before:border-b  before:border-l before:right-5
            before:top-2/4 before:border-black dark:before:border-white ${
              openFeatures ? "before:rotate-[134deg]" : "before:-rotate-45"
            }`}
            onClick={() => setOpenFeatures(!openFeatures)}
          >
            Key Features
          </div>
          <div
            className={`overflow-hidden relative transition-[0.5s] ${
              openFeatures ? "h-auto ml-5 mb-5" : "h-0"
            }`}
          >
            {product.keyFeatures}
          </div>
        </div>
      )}
      {product.specification && (
        <div
          className={`w-full ${
            openSpecifications ? "active" : ""
          } flex flex-col`}
        >
          <div
            className={`cursor-pointer relative uppercase mb-2.5 before:content-['_'] before:w-2.5 before:h-2.5
            before:-translate-y-2/4 before:absolute before:border-b  before:border-l before:right-5
            before:top-2/4 before:border-black dark:before:border-white ${
              openSpecifications
                ? "before:rotate-[134deg]"
                : "before:-rotate-45"
            }`}
            onClick={() => setOpenSpecifications(!openSpecifications)}
          >
            Specification
          </div>
          <div
            className={`overflow-hidden relative transition-[0.5s] ${
              openSpecifications ? "h-auto ml-5 mb-5" : "h-0"
            }`}
          >
            {product.specification}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
