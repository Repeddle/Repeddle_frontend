import { useEffect, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import { OrderItem } from "../../types/order"
import { FaCamera, FaChevronCircleRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import MessageBox from "../../components/MessageBox"
import Button from "../../components/ui/Button"
import { currency, daydiff, deliveryNumber } from "../../utils/common"

type TabTypes = "items" | "option" | "form"

type Props = {
  orderItems: OrderItem[]
  orderId: string
  //   deliverOrderHandler
  setShowReturn: (val: boolean) => void
}

const Return = ({ orderItems }: Props) => {
  const [tab, setTab] = useState<TabTypes>("items")
  const [current, setCurrent] = useState<OrderItem>()
  const [invalidImage] = useState("")
  const [description, setDescription] = useState("")
  const [image] = useState("")
  const error = null
  const loading = false
  const loadingUpload = false

  const addConversation = (sellerId?: string, userId?: string) => {
    if (!sellerId || userId) return
  }

  const handleImageUpload = () => {}

  const handleReturn = () => {}

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

              {/* <FormControl
                sx={{
                  width: "100%",
                  margin: 0,
                  borderRadius: "0.2rem",
                  border: `1px solid ${
                    mode === "pagebodydark"
                      ? "var(--dark-ev4)"
                      : "var(--light-ev4)"
                  }`,
                  "& .MuiOutlinedInput-root": {
                    color: `${
                      mode === "pagebodydark"
                        ? "var(--white-color)"
                        : "var(--black-color)"
                    }`,
                    "&:hover": {
                      outline: "none",
                      border: 0,
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "0 !important",
                  },
                }}
                size="small"
              >
                <Select
                  onChange={(e) => setReason(e.target.value)}
                  displayEmpty
                  id="deliveryStatus"
                >
                  <MenuItem value="Missing or wrong product, not what i ordered">
                    Missing or wrong product, not what i ordered
                  </MenuItem>
                  <MenuItem value="Product condition is significantly not as described">
                    Product condition is significantly not as described
                  </MenuItem>
                  <MenuItem value="The product is totally defective or completely demaged.">
                    The product is totally defective or completely damage
                  </MenuItem>
                </Select>
              </FormControl> */}
            </div>
            <div className="m-2.5 w-full">
              <label>Preferred Sending Method</label>

              {/* <FormControl
                sx={{
                  width: "100%",
                  margin: 0,
                  borderRadius: "0.2rem",
                  border: `1px solid ${
                    mode === "pagebodydark"
                      ? "var(--dark-ev4)"
                      : "var(--light-ev4)"
                  }`,
                  "& .MuiOutlinedInput-root": {
                    color: `${
                      mode === "pagebodydark"
                        ? "var(--white-color)"
                        : "var(--black-color)"
                    }`,
                    "&:hover": {
                      outline: "none",
                      border: 0,
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "0 !important",
                  },
                }}
                size="small"
              >
                <Select
                  onChange={(e) => setSending(e.target.value)}
                  displayEmpty
                  id="deliveryStatus"
                >
                  {console.log(current)}

                  <MenuItem value={current.deliverySelect}>
                    {current.deliverySelect["delivery Option"]}
                  </MenuItem>
                </Select>
              </FormControl> */}
            </div>
            <div className="m-2.5 w-full">
              <label>Preferred Refund Method</label>

              {/* <FormControl
                sx={{
                  width: "100%",
                  margin: 0,
                  borderRadius: "0.2rem",
                  border: `1px solid ${
                    mode === "pagebodydark"
                      ? "var(--dark-ev4)"
                      : "var(--light-ev4)"
                  }`,
                  "& .MuiOutlinedInput-root": {
                    color: `${
                      mode === "pagebodydark"
                        ? "var(--white-color)"
                        : "var(--black-color)"
                    }`,
                    "&:hover": {
                      outline: "none",
                      border: 0,
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "0 !important",
                  },
                }}
                size="small"
              >
                <Select
                  onChange={(e) => setRefund(e.target.value)}
                  displayEmpty
                  id="deliveryStatus"
                >
                  <MenuItem value="Credit my Repeddle wallet">
                    Credit my Repeddle wallet
                  </MenuItem>
                </Select>
              </FormControl> */}
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
