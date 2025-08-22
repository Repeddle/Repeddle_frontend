import { ChangeEvent, useEffect, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import { OrderItem } from "../../types/order"
import { FaCamera, FaChevronCircleRight, FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import MessageBox from "../../components/MessageBox"
import Button from "../../components/ui/Button"
import {
  compressImageUpload,
  currency,
  daydiff,
  deliveryNumber,
} from "../../utils/common"
import useReturn from "../../hooks/useReturn"
import useToastNotification from "../../hooks/useToastNotification"
import Modal from "../../components/ui/Modal"
import useMessage from "../../hooks/useMessage"
import { imageUrl } from "../../services/api"

type TabTypes = "items" | "option" | "form"

type Props = {
  orderItems: OrderItem[]
  orderId: string
  //   deliverOrderHandler
  setShowReturn: (val: boolean) => void
  showReturn: boolean
}

const Return = ({ orderItems, orderId, setShowReturn, showReturn }: Props) => {
  const { createReturns, error: creatingError } = useReturn()
  const { addNotification } = useToastNotification()
  const { createMessage, error: messageError } = useMessage()
  const navigate = useNavigate()

  const [tab, setTab] = useState<TabTypes>("items")
  const [current, setCurrent] = useState<OrderItem>()
  const [invalidImage] = useState("")
  const [description, setDescription] = useState("")
  const [refund, setRefund] = useState("")
  const [reason, setReason] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [error, setError] = useState("")
  const [sending, setSending] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingUpload, setLoadUpload] = useState(false)
  const [messageLoading, setMessageLoading] = useState(false)

  const addConversation = async (sellerId?: string, userId?: string) => {
    if (!sellerId || !userId) return

    setMessageLoading(true)
    try {
      const convo = await createMessage({
        participantId: sellerId,
        type: "Chat",
      })
      navigate(`/messages?conversation=${convo._id}`)
    } catch (error) {
      addNotification(messageError || (error as string))
    }

    setMessageLoading(false)
  }

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    try {
      setLoadUpload(true)

      const file = e.target.files?.[0]
      if (!file) throw Error("No image found")

      const imageUrl = await compressImageUpload(file, 1024, images[index])

      setImages([
        ...images.slice(0, index),
        imageUrl,
        ...images.slice(index + 1),
      ])
      setLoadUpload(false)

      addNotification("Image uploaded")
    } catch (err) {
      addNotification("Failed uploading image")
    }
  }

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

    setLoading(true)

    const res = await createReturns({
      images,
      image: images[0],
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
      setImages([])
      setReason("")
      setDescription("")
      setSending("")
      setRefund("")
      setShowReturn(false)
      navigate(`/return/${res._id}`)
    } else {
      addNotification(
        creatingError ? creatingError : "Failed to log a return",
        undefined,
        true
      )
    }

    setLoading(false)
  }

  const onClose = () => {
    setShowReturn(false)
    setTab("items")
    setImages([])
    setReason("")
    setDescription("")
    setSending("")
    setRefund("")
  }

  useEffect(() => {
    if (tab === "option" && !current) {
      setTab("items")
    }

    if (tab === "form" && !current) {
      setTab("items")
    }
  }, [current, tab])

  const onDeleteImage = (index: number) => {
    setImages([...images.slice(0, index), ...images.slice(index + 1)])
  }

  return (
    <Modal isOpen={showReturn} onClose={onClose} size="lg">
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
                      src={imageUrl + orderItem.product.images[0]}
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
          <div className="flex flex-col justify-center items-center">
            {current && (
              <div className="flex flex-[8] mb-2.5">
                <img
                  className="object-cover object-top w-[100px] h-[130px]"
                  src={imageUrl + current.product.images[0]}
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
              <Link to={`/newproduct?slug=${current?.product.slug}`}>
                <div className="cursor-pointer m-5 p-2.5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
                  Re-list and sell my product
                </div>
              </Link>
              {messageLoading ? (
                <div className="m-5">
                  <LoadingBox />
                </div>
              ) : (
                <div
                  className="cursor-pointer m-5 p-2.5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1"
                  onClick={() =>
                    addConversation(current?.seller._id, current?._id)
                  }
                >
                  Message seller
                </div>
              )}
              {current?.deliveryTracking.currentStatus.status &&
                deliveryNumber(
                  current.deliveryTracking.currentStatus.status
                ) === 4 &&
                daydiff(current?.deliveryTracking.currentStatus.timestamp, 3) >=
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
          <div className="flex justify-center flex-col items-center">
            {current && (
              <div className="flex flex-[8] mb-2.5">
                <img
                  className="object-cover object-top w-[100px] h-[130px]"
                  src={imageUrl + current.product.images[0]}
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
                    className="m-0 pl-2.5 dark:bg-black border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-xs sm:text-base text-black-color dark:text-white-color"
                    onBlur={() => setError("")}
                  >
                    <option value="">--Select--</option>
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
                    className="m-0 pl-2.5 text-xs sm:text-base dark:bg-black border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    onBlur={() => setError("")}
                  >
                    <option value="">--Select--</option>
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
                    className="text-xs sm:text-base m-0 pl-2.5 dark:bg-black border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    onBlur={() => setError("")}
                  >
                    <option value="">--Select--</option>
                    <option value="Credit my Repeddle wallet">
                      Credit My Repeddle Wallet
                    </option>
                  </select>
                </div>
              </div>
              <div className="m-2.5 w-full">
                <label>Other Information</label>
                <textarea
                  className={`h-[100px] bg-white dark:bg-black w-full p-2.5 rounded-[0.2rem] border focus-visible:outline focus-visible:outline-orange-color
                text-black dark:text-white-color border-light-ev4 dark:border-dark-ev4`}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="flex gap-2.5 m-2.5 flex-wrap">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl + image}
                      alt="return"
                      className="w-[100px] h-[130px]"
                    />
                    <div
                      className="absolute top-1 right-1"
                      onClick={() => onDeleteImage(index)}
                    >
                      <FaTrash className="text-red-500" />
                    </div>
                  </div>
                ))}
                {images.length < 3 ? (
                  <div className="flex gap-2.5">
                    <label
                      className="text-sm items-center flex gap-2"
                      htmlFor="return"
                    >
                      <FaCamera /> Upload Image
                    </label>
                    {invalidImage && (
                      <div className="text-[red]">{invalidImage}</div>
                    )}
                    {loadingUpload && <LoadingBox />}

                    <input
                      type="file"
                      id="return"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, images.length)}
                    />
                  </div>
                ) : null}
              </div>
              <Button
                text="Submit"
                disabled={loading}
                isLoading={loading}
                onClick={handleReturn}
              />
            </form>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default Return
