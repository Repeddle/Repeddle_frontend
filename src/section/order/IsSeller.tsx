import moment from "moment"
import { DeliverStatus, OrderItem } from "../../types/order"
import LoadingBox from "../../components/LoadingBox"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"
import { FaCheck } from "react-icons/fa"
import { useState } from "react"
import { IUser } from "../../types/user"
import {
  currency,
  daydiff,
  deliveryNumber,
  deliveryStatusMap,
  region,
} from "../../utils/common"
import DeliveryStatus from "../../components/DeliveryStatus"

type Props = {
  orderItem: OrderItem
  userOrdered: IUser
  itemsPrice: number
  shippingPrice: number
  setShowDeliveryHistory: (val: boolean) => void
  setCurrentDeliveryHistory: (val: number) => void
  handleCancelOrder: (val: OrderItem) => void
  refund: (val: OrderItem) => void
  paySeller: (val: OrderItem) => void
  deliverOrderHandler: (
    deliveryStatus: string,
    orderItem: OrderItem,
    trackingNumber?: string
  ) => Promise<void>
  updatingStatus: boolean
}

const IsSeller = ({
  orderItem,
  userOrdered,
  itemsPrice,
  shippingPrice,
  setCurrentDeliveryHistory,
  setShowDeliveryHistory,
  handleCancelOrder,
  refund,
  paySeller,
  deliverOrderHandler,
  updatingStatus,
}: Props) => {
  const { user } = useAuth()

  const [trackingNumber, setTrackingNumber] = useState("")
  const [showTracking, setShowTracking] = useState(false)

  const loadingWaybill = false

  const comfirmWaybill = async () => {
    if (!trackingNumber) return

    await updateTracking()
    setShowTracking(false)
  }

  const toggleOrderHoldStatus = () => {}

  const showNextStatus = (status: string) => {
    const entries = Object.entries(deliveryStatusMap)
    const currentNumber = deliveryNumber(status)

    return entries[currentNumber]
  }

  const updateTracking = async () => {
    if (updatingStatus) return

    const nextStatus = showNextStatus(
      orderItem.deliveryTracking.currentStatus.status
    )

    if (nextStatus[1] === 2 && !trackingNumber) {
      setShowTracking(true)
    } else {
      await deliverOrderHandler(
        orderItem.deliveryTracking.currentStatus.status,
        orderItem
      )
    }
  }

  return (
    <div
      className={`h-full mb-[15px] lg:px-5 lg:py-[15px] rounded-[5px] print:text-black-color
      print:mb-[5px] print:p-[5px] print:bg-white px-[15px] py-2.5 bg-light-ev2 dark:bg-dark-ev2`}
    >
      <div className="flex justify-between w-full flex-col lg:flex-row">
        <div className="hidden">
          {(itemsPrice = itemsPrice + orderItem.price * orderItem.quantity)}
          {
            (shippingPrice =
              shippingPrice + Number(orderItem.deliveryOption.fee))
          }
        </div>
        <div>
          <div className="flex text-center">
            <DeliveryStatus
              status={
                orderItem.onHold
                  ? "Hold"
                  : (orderItem.deliveryTracking.currentStatus
                      .status as DeliverStatus)
              }
            />
            <div
              className="text-malon-color cursor-pointer text-center ml-[15px]"
              onClick={() => {
                setShowDeliveryHistory(true)
                setCurrentDeliveryHistory(
                  deliveryNumber(
                    orderItem.deliveryTracking.currentStatus.status
                  )
                )
              }}
            >
              Track Order
            </div>
          </div>
          <div className="capitalize font-semibold mb-2.5">
            On{" "}
            {moment(orderItem.deliveryTracking.currentStatus.timestamp).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </div>
        </div>
        {user &&
          userOrdered._id === user._id &&
          orderItem.deliveryTracking.currentStatus.status === "Delivered" && (
            <div
              className="cursor-pointer text-white-color bg-orange-color hover:bg-malon-color h-[30px] mr-[30px] px-[7px] py-[3px] rounded-[0.2rem]"
              onClick={() =>
                !updatingStatus && deliverOrderHandler("Received", orderItem)
              }
            >
              Comfirm you have recieved order
            </div>
          )}
        {user && (
          <div className="print:hidden">
            {showTracking ? (
              loadingWaybill ? (
                <LoadingBox />
              ) : (
                <div className="flex items-center">
                  <input
                    className={`border h-10 ml-5 p-2.5 rounded-[0.2rem]  border-[grey] text-black-color
                    dark:text-white-color focus-visible:outline focus-visible:outline-orange-color`}
                    placeholder="Enter Tracking number"
                    value={trackingNumber}
                    type="text"
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                  <div className="h-10 w-10 flex justify-center items-center cursor-pointer bg-orange-color text-white-color rounded-tr-[0.2rem] rounded-br-[0.2rem]">
                    <FaCheck
                      className="text-white-color h-10 w-10 cursor-pointer hover:bg-malon-color"
                      onClick={() => comfirmWaybill()}
                    />
                  </div>
                </div>
              )
            ) : (
              <>
                {/* {orderItem.deliveryOption._id && (
                  <label className="mr-5">
                    Tracking Number: {orderItem.deliveryOption._id}
                  </label>
                )} */}

                <div
                  onClick={updateTracking}
                  className="p-2 rounded-[0.2rem] cursor-pointer self-start ml-4 transition-all duration-300 bg-orange-color text-white hover:bg-malon-color"
                >
                  {`Mark as ${
                    showNextStatus(
                      orderItem.deliveryTracking.currentStatus.status
                    )[0]
                  }`}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {user?.role === "Admin" && (
        <div
          className="cursor-pointer text-[red] mt-[5px]"
          onClick={() => handleCancelOrder(orderItem)}
        >
          Cancel Order
        </div>
      )}

      <hr />
      <div className="flex justify-center flex-col lg:flex-row mb-2.5 lg:mb-0">
        <div className="flex mb-2.5 flex-[8]">
          <img
            className="object-cover object-top w-[100px] h-[130px]"
            src={orderItem.product.images[0]}
            alt={orderItem.product.name}
          />
          <div className="flex flex-col justify-center px-5 py-0">
            <div className="capitalize font-semibold mb-2.5">
              {orderItem.product.name}
            </div>
            <div className="mb-2.5">QTY: {orderItem.quantity}</div>
            <div className="font-bold">
              Unit Price: {currency(orderItem.product.region)}
              {orderItem.price}
            </div>
            <div className="font-bold">
              Total: {currency(orderItem.product.region)}
              {orderItem.price * orderItem.quantity}
            </div>
          </div>
        </div>

        <div className="flex-[2] print:hidden print:mb-2.5">
          <button className="bg-[#0d6efd] w-full px-3 py-[0.375rem] text-base leading-normal border-none">
            <Link to={`/product/${orderItem.product.slug}`}>Buy Again</Link>
          </button>
          {user?.role === "Admin" &&
            daydiff(orderItem.deliveryTracking.currentStatus.timestamp, 3) <=
              0 &&
            deliveryNumber(orderItem.deliveryTracking.currentStatus.status) <
              4 && (
              <button
                onClick={() => refund(orderItem)}
                className="inline-block bg-malon-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
              >
                Refund
              </button>
            )}

          {user?.role === "Admin" && (
            <button
              onClick={() => toggleOrderHoldStatus()}
              className="w-full px-3 py-[0.375rem] text-base leading-normal border-none bg-malon-color mt-2.5"
            >
              {orderItem?.onHold ? "UnHold" : "Hold"}
            </button>
          )}

          {user?.role === "Admin" &&
            daydiff(orderItem.deliveryTracking.currentStatus.timestamp, 3) <=
              0 &&
            deliveryNumber(orderItem.deliveryTracking.currentStatus.status) ===
              4 && (
              <button
                onClick={() => {
                  if (!updatingStatus) {
                    paySeller(orderItem)
                    deliverOrderHandler(
                      "Payment To Seller Initiated",
                      orderItem
                    )
                  }
                }}
                className="inline-block bg-malon-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
              >
                Pay Seller
              </button>
            )}
        </div>
      </div>
      {Object.entries(orderItem.deliveryOption).map(([key, value]) =>
        key === "total" ? (
          ""
        ) : (
          <div className="flex capitalize text-[13px]" key={key}>
            <div className="flex-1">{key}:</div>
            {key === "fee" ? (
              <div>
                {currency(region())} {value}
              </div>
            ) : (
              <div>{value}</div>
            )}
          </div>
        )
      )}
      <div className="mt-2.5">
        <div>Buyer Information</div>
        <div className="flex items-center mt-[5px]">
          <Link to={`/seller/${userOrdered._id}`}>
            <img
              className="w-10 h-10 object-cover rounded-[50%]"
              src={userOrdered.image}
              alt="img"
            />
          </Link>
          <div>
            <div className="font-bold hover:underline text-malon-color mx-5 my-0">
              <Link to={`/seller/${userOrdered._id}`}>
                @{userOrdered.username}
              </Link>
            </div>
            {user?.role === "Admin" && (
              <div className="font-bold mx-5 my-0">{userOrdered._id}</div>
            )}
            <div className="font-bold mx-5 my-0">
              {userOrdered.firstName} {userOrdered.lastName}
            </div>
          </div>
        </div>
      </div>
      {user?.role === "Admin" && (
        <div className="mt-2.5">
          <div>Seller Information</div>
          <div className="flex items-center mt-[5px]">
            <Link to={`/seller/${orderItem.seller._id}`}>
              <img
                className="w-10 h-10 object-cover rounded-[50%]"
                src={orderItem.seller.image}
                alt="img"
              />
            </Link>
            <div>
              <div className="font-bold hover:underline text-malon-color mx-5 my-0">
                <Link to={`/seller/${orderItem.seller._id}`}>
                  @{orderItem.seller.username}
                </Link>
              </div>
              {user?.role === "Admin" && (
                <div className="font-bold mx-5 my-0">
                  {orderItem.seller._id}
                </div>
              )}
              <div className="font-bold mx-5 my-0">
                {orderItem.seller.firstName} {orderItem.seller.lastName}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IsSeller

{
  /* <div className="relative">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={selectedOption}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label
          className="absolute top-0 left-3 px-1 text-gray-500 bg-white pointer-events-none"
          style={{ transform: "translateY(-50%)", transition: "0.2s" }}
        >
          Select
        </label>
      </div> */
}
