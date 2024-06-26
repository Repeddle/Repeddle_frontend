import { useEffect, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import { OrderItem } from "../../types/order"
import { FaCamera, FaChevronCircleRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import MessageBox from "../../components/MessageBox"
import Button from "../../components/ui/Button"
import { currency, daydiff, deliveryNumber } from "../../utils/common"
import useReturn from "../../hooks/useReturn"
import useToastNotification from "../../hooks/useToastNotification"

type TabTypes = "items" | "option" | "form"

type Props = {
  orderItems: OrderItem[]
  orderId: string
  //   deliverOrderHandler
  setShowReturn: (val: boolean) => void
}

const Return = ({ orderItems, orderId, setShowReturn }: Props) => {
  const { createReturns, error: creatingError } = useReturn()
  const { addNotification } = useToastNotification()

  const [tab, setTab] = useState<TabTypes>("items")
  const [current, setCurrent] = useState<OrderItem>()
  const [invalidImage] = useState("")
  const [description, setDescription] = useState("")
  const [refund, setRefund] = useState("")
  const [reason, setReason] = useState("")
  const [image, setImage] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState("")
  const loading = false
  const loadingUpload = false

  const addConversation = (sellerId?: string, userId?: string) => {
    if (!sellerId || userId) return
  }

  const handleImageUpload = () => {}

  const handleReturn = async () => {
    if (!reason.length) {
      setError("Please select a reason for return")
      return
    }
    if (!sending) {
      setError("Please select a method of sending")
      return
    }
    if (!refund.length) {
      setError("Please select a method of refund")
      return
    }

    if (!current) {
      setError("Please select the item you want to return")
      return
    }

    const res = await createReturns({
      image,
      reason,
      refund,
      productId: current.product._id, //fix
      orderId,
      deliveryOption: {
        fee: current.deliveryOption.fee,
        method: current.deliveryOption.method,
      },
      others: "",
    })

    if (res) {
      addNotification("Return logged successfully")
      setImage("")
      setShowReturn(false)
    } else {
      addNotification(
        creatingError ?? "Failed to log a return",
        undefined,
        true
      )
    }
  }

  useEffect(() => {
    if (tab === "option" && current) {
      setTab("items")
    }

    if (tab === "form" && current) {
      setTab("items")
    }
  }, [current, tab])

  return (
    <div className="p-[30px]">
      {tab === "items" && (
        <div className="flex flex-col justify-center items-center">
          <h4 className="leading-tight mb-2.5">Select a Product to Return</h4>
          {orderItems.map((orderItem) => (
            <>
              <div
                className="w-auto lg:w-3/4 hover:bg-light-ev1 dark:hover:bg-dark-ev1 flex justify-between items-center cursor-pointer p-2.5 rounded-[0.2rem]"
                key={orderItem._id}
                onClick={() => {
                  setTab("option")
                  setCurrent(orderItem)
                }}
              >
                <div className="flex flex-[8] mb-2.5">
                  <img
                    className="object-cover object-top w-[100px] bg-black h-[130px]"
                    src={orderItem.product.images[0]}
                    alt={orderItem.product.name}
                  />
                  <div className="flex flex-col justify-center p-5">
                    <div className="capitalize font-semibold mb-2.5">
                      {orderItem.product.name}
                    </div>
                    <div className="mb-2.5">QTY: {orderItem.quantity}</div>
                    <div className="font-bold">
                      {currency(orderItem.product.region)}{" "}
                      {orderItem.quantity * orderItem.price}
                    </div>
                  </div>
                </div>
                <FaChevronCircleRight className="text-2xl mr-2.5" />
              </div>
              <hr />
            </>
          ))}
        </div>
      )}

      {tab === "option" && (
        <div className="flex justify-center items-center">
          {current && (
            <div className="flex flex-[8] mb-2.5">
              <img
                className="object-cover object-top w-[100px] h-[130px]"
                src={current.product.images[0]}
                alt={current.product.name}
              />
              <div className="flex flex-col justify-center p-5">
                <div className="capitalize font-semibold mb-2.5">
                  {current.product.name}
                </div>
                <div className="mb-2.5">QTY: {current.quantity}</div>
                <div className="font-bold">
                  {currency(current.product.region)} {current.price}
                </div>
              </div>
            </div>
          )}
          <h4>Preferred Resolution Method</h4>
          <div className="w-full lg:w-2/5">
            <Link to={`/newproduct?id=${current?.product.slug}`}>
              <div className="cursor-pointer m-5 p-2.5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
                Re-list and sell my product
              </div>
            </Link>
            <div
              className="cursor-pointer m-5 p-2.5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1"
              onClick={() => addConversation(current?.seller._id, current?._id)}
            >
              Message seller
            </div>
            {current?.deliveryTracking.currentStatus.status &&
              deliveryNumber(current.deliveryTracking.currentStatus.status) ===
                4 &&
              daydiff(current?.deliveryTracking.currentStatus.status, 3) >=
                0 && (
                <div
                  className="cursor-pointer m-5 p-2.5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1"
                  onClick={() => setTab("form")}
                >
                  Return form
                </div>
              )}
          </div>
        </div>
      )}

      {tab === "form" && (
        <div className="flex justify-center items-center">
          {current && (
            <div className="flex flex-[8] mb-2.5">
              <img
                className="object-cover object-top w-[100px] h-[130px]"
                src={current.product.images[0]}
                alt={current.product.name}
              />
              <div className="flex flex-col justify-center p-5">
                <div className="capitalize font-semibold mb-2.5">
                  {current.product.name}
                </div>
                <div className="mb-2.5">QTY: {current.quantity}</div>
                <div className="font-bold">
                  {currency(current.product.region)} {current.price}
                </div>
              </div>
            </div>
          )}
          <form>
            {error && <MessageBox className="text-[red]">{error}</MessageBox>}
            <div className="m-2.5 w-full">
              <label>Reasons for Return</label>

              <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="text-base m-0 pl-2.5 dark:bg-black border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                  onBlur={() => setError("")}
                >
                  <option value="Missing or wrong product, not what i ordered">
                    Missing or wrong product, not what i ordered
                  </option>
                  <option value="Product condition is significantly not as described">
                    Product condition is significantly not as described
                  </option>
                  <option value="The product is totally defective or completely demaged.">
                    The product is totally defective or completely damage
                  </option>
                </select>
              </div>
            </div>
            <div className="m-2.5 w-full">
              <label>Preferred Sending Method</label>

              <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                <select
                  value={sending}
                  onChange={(e) => setSending(e.target.value)}
                  className="text-base m-0 pl-2.5 dark:bg-black border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                  onBlur={() => setError("")}
                >
                  <option value={current?.deliveryOption._id}>
                    {current?.deliveryOption.method}
                  </option>
                </select>
              </div>
            </div>
            <div className="m-2.5 w-full">
              <label>Preferred Refund Method</label>

              <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                <select
                  value={refund}
                  onChange={(e) => setRefund(e.target.value)}
                  className="text-base m-0 pl-2.5 dark:bg-black border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                  onBlur={() => setError("")}
                >
                  <option value="Credit my Repeddle wallet">
                    Credit my Repeddle wallet
                  </option>
                </select>
              </div>
            </div>
            <div className="m-2.5 w-full">
              <label>Other Information</label>
              <textarea
                className={`h-[100px] w-full p-2.5 rounded-[0.2rem] border focus-visible:outline focus-visible:outline-orange-color
                text-black dark:text-white-color border-light-ev4 dark:border-dark-ev4`}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="m-2.5 w-full">
              <label className="text-sm" htmlFor="return">
                <FaCamera /> Upload Image
              </label>
              {invalidImage && <div className="text-[red]">{invalidImage}</div>}
              {loadingUpload && <LoadingBox />}
              {image.length !== 0 && (
                <span className="ml-2.5 text-sm">Image Uploaded</span>
              )}
              <input
                type="file"
                id="return"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <Button text="Submit" disabled={loading} onClick={handleReturn} />
            {loading && <LoadingBox />}
          </form>
        </div>
      )}
    </div>
  )
}

export default Return
