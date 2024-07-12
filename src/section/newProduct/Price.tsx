import { Dispatch, SetStateAction, useState } from "react"
import InputWithLabel2 from "../../components/ui/InputWithLabel2"
import Modal from "../../components/ui/Modal"
import DeliveryOption from "../../components/DeliveryOption"
import { currency, region } from "../../utils/common"
import { IDeliveryOption, ProductMeta } from "../../types/product"
import { FaCheck, FaQuestionCircle } from "react-icons/fa"
import FeeStructure from "../../pages/defaults/info/FeeStructure"

type InputProps = {
  costPrice: string
  sellingPrice: string
  discount: string
  deliveryOption: string
}

type Props = {
  setDeliveryOption: (val: IDeliveryOption[]) => void
  deliveryOption: IDeliveryOption[]
  setInput: Dispatch<SetStateAction<InputProps>>
  validationError: InputProps
  handleError: (text: string, key: keyof InputProps) => void
  costPrice?: string | null
  sellingPrice: number
  discount: () => number
  meta: ProductMeta
  setMeta: (val: ProductMeta) => void
}

const Price = ({
  deliveryOption,
  setDeliveryOption,
  validationError,
  handleError,
  setInput,
  discount,
  sellingPrice,
  costPrice,
  meta,
  setMeta,
}: Props) => {
  const [showDelivery, setShowDelivery] = useState(false)
  const [showComissionModal, setShowComissionModal] = useState(false)
  const [paxi, setPaxi] = useState(region() === "ZAR")
  const [gig, setGig] = useState(false)
  const [pudoLocker, setPudoLocker] = useState(false)
  const [pudoDoor, setPudoDoor] = useState(false)
  const [postnet, setPostnet] = useState(false)
  const [aramex, setAramex] = useState(false)
  const [pickup, setPickup] = useState(false)
  const [bundle, setBundle] = useState(false)

  const handleOnChange = (text: string, input: keyof InputProps) => {
    setInput((prevState) => ({ ...prevState, [input]: text }))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <InputWithLabel2
          label="Cost Price"
          type="number"
          onChange={(e) => handleOnChange(e, "costPrice")}
          onBlur={() => handleError("", "costPrice")}
          error={validationError.costPrice}
        />
        <InputWithLabel2
          label="Selling Price"
          type="number"
          onChange={(e) => handleOnChange(e, "sellingPrice")}
          onBlur={() => handleError("", "sellingPrice")}
          error={validationError.sellingPrice}
        />
      </div>
      {sellingPrice ? (
        <div className="">
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
          </div>{" "}
          {discount() ? (
            <span className="text-[11px] text-center">
              {discount().toFixed(0)}% discount
            </span>
          ) : null}
          <div className="text-xs flex flex-col gap-1">
            <div className="flex">
              <div className="flex-[3]">Total cost:</div>
              <div className="flex-1">
                {currency(region())}
                {sellingPrice.toFixed(2)}
              </div>
            </div>
            <div className="flex">
              <div className="flex-[3]">Repeddle Commision (7.9%):</div>
              <div className="flex-1">
                {currency(region())}
                {((7.9 / 100) * sellingPrice).toFixed(2)}
              </div>
            </div>
            <div className="flex">
              <div className="flex-[3] flex items-center gap-2.5">
                Estimated amount you will Receive
                <div
                  data-content="Amount shown here is an estimated withdrawable amount you will receive in your Repeddle wallet. Final amount pay is determined by the delivery cost when product sells"
                  className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                >
                  <FaQuestionCircle className="text-black dark:text-white" />
                </div>
              </div>
              <div className="flex-1">
                {currency(region())}
                {((92.1 / 100) * sellingPrice).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
        <label className="text-sm mt-[15px] mb-2.5">Delivery Option</label>
        {deliveryOption.map((d) => (
          <div className="flex items-center" key={d.name}>
            <FaCheck className="mr-2.5 text-orange-color" />
            {d.name}
          </div>
        ))}
        <div
          className="text-orange-color cursor-pointer text-center"
          onClick={() => setShowDelivery(true)}
        >
          Add delivery option
        </div>
        {validationError.deliveryOption && (
          <span className="text-sm text-[red]">
            {validationError.deliveryOption}
          </span>
        )}
        <Modal
          onClose={() => setShowDelivery(false)}
          isOpen={showDelivery}
          size="lg"
        >
          <DeliveryOption
            setShowModel={setShowDelivery}
            paxi={paxi}
            setPaxi={setPaxi}
            gig={gig}
            setGig={setGig}
            pudoLocker={pudoLocker}
            pudoDoor={pudoDoor}
            setPudoLocker={setPudoLocker}
            setPudoDoor={setPudoDoor}
            aramex={aramex}
            setAramex={setAramex}
            postnet={postnet}
            setPostnet={setPostnet}
            pickup={pickup}
            setPickup={setPickup}
            bundle={bundle}
            setBundle={setBundle}
            setDeliveryOption={setDeliveryOption}
            meta={meta}
            setMeta={setMeta}
            deliveryOption={deliveryOption}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Price
