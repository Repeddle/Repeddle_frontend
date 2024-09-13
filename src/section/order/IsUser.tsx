import moment from "moment"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { DeliverStatus, OrderItem } from "../../types/order"
import { useState } from "react"
import { IUser } from "../../types/user"
import { currency, daydiff, deliveryNumber, region } from "../../utils/common"
import Modal from "../../components/ui/Modal"
import DeliveryStatus from "../../components/DeliveryStatus"

type Props = {
  orderItem: OrderItem
  userOrdered: IUser
  setShowDeliveryHistory: (val: boolean) => void
  setShowReturn: (val: boolean) => void
  setCurrentDeliveryHistory: (val: number) => void
  handleCancelOrder: (val: OrderItem) => void
  refund: (val: OrderItem) => void
  paySeller: (val: OrderItem) => void
  deliverOrderHandler: (
    deliveryStatus: string,
    orderItem: OrderItem
  ) => Promise<void>
  updatingStatus: boolean
}

const IsUser = ({
  orderItem,
  userOrdered,
  setShowDeliveryHistory,
  setCurrentDeliveryHistory,
  setShowReturn,
  handleCancelOrder,
  refund,
  paySeller,
  deliverOrderHandler,
  updatingStatus,
}: Props) => {
  const { user } = useAuth()

  const [afterAction, setAfterAction] = useState(true)

  const placeOrderOnHold = () => {}

  const toggleOrderHoldStatus = () => {}

  const paymentRequest = async () => {
    // the below function accepts the current status then uses the next function to update
    await deliverOrderHandler("Delivered", orderItem)
    setAfterAction(false)
  }

  return (
    <div
      className={`h-full mb-[15px] lg:px-5 lg:py-[15px] rounded-[5px] print:text-black-color
    print:mb-[5px] print:p-[5px] print:bg-white px-[15px] py-2.5 bg-light-ev2 dark:bg-dark-ev2`}
    >
      <div className="flex flex-col w-full mb-3 lg:justify-between lg:flex-row">
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
              className="text-orange-color cursor-pointer text-center ml-[15px]"
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
        <div className="flex flex-col items-start lg:items-end">
          {orderItem.trackingNumber && (
            <label className="">
              Tracking Number: {orderItem.trackingNumber}
            </label>
          )}
          {user &&
            userOrdered._id === user._id &&
            orderItem.deliveryTracking.currentStatus.status === "Delivered" && (
              <>
                <div
                  className="cursor-pointer text-white-color bg-orange-color hover:bg-malon-color h-[30px] px-[7px] py-[3px] rounded-[0.2rem]"
                  onClick={() => {
                    orderItem.onHold ? placeOrderOnHold() : setAfterAction(true)
                  }}
                >
                  Confirm you have received your order
                </div>
                <Modal
                  isOpen={afterAction}
                  onClose={() => setAfterAction(false)}
                  size="lg"
                >
                  <div className="flex flex-col justify-center items-center gap-2.5 h-full pt-10 md:pt-8 p-2.5">
                    <div className="flex justify-between gap-1.5 sm:gap-2.5 w-full max-w-sm">
                      <div
                        className="cursor-pointer text-white-color bg-orange-color sm:h-[30px] px-[7px] py-[3px] rounded-[0.2rem]"
                        onClick={() => !updatingStatus && paymentRequest()}
                      >
                        Confirm you have received order
                      </div>
                      <div
                        className="cursor-pointer bg-malon-color hover:bg-orange-color text-white-color sm:h-[30px] px-[7px] py-[3px] rounded-[0.2rem]"
                        onClick={() => {
                          if (!updatingStatus) {
                            setShowReturn(true)
                            setAfterAction(false)
                          }
                        }}
                      >
                        Log a return
                      </div>
                    </div>
                    <div className="text-[13px] max-w-[400px]">
                      Please inspect your order before confirming receipt.
                      Kindly know that you can't LOG A RETURN after order
                      receipt confirmation. However, you can re-list your
                      product for sale at this point
                    </div>
                  </div>
                </Modal>
              </>
            )}
        </div>
      </div>
      {deliveryNumber(orderItem.deliveryTracking.currentStatus.status) >= 4 &&
        daydiff(orderItem.deliveryTracking.currentStatus.timestamp, 3) >= 0 && (
          <div className="flex gap-1 items-center justify-center">
            <div
              className="cursor-pointer flex flex-col items-center"
              onClick={() => setShowReturn(true)}
            >
              <b>Log a return</b>
            </div>
            {daydiff(orderItem.deliveryTracking.currentStatus.timestamp, 3) >=
              0 && (
              <div className="text-[red]">
                {daydiff(orderItem.deliveryTracking.currentStatus.timestamp, 3)}{" "}
                days left
              </div>
            )}
          </div>
        )}
      {user?.role === "Admin" && (
        <div
          className="cursor-pointer text-[red] mt-[5px]"
          onClick={() => handleCancelOrder(orderItem)}
        >
          Cancel Order
        </div>
      )}
      <hr className="my-2.5 border-light-ev3 dark:border-dark-ev3" />

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
              Total:{currency(orderItem.product.region)}
              {orderItem.price * orderItem.quantity}
            </div>
          </div>
        </div>
        <div className="flex-[2] print:hidden print:mb-2.5">
          <button className="bg-orange-color text-white w-full px-3 py-[0.375rem] text-base leading-normal border-none">
            <Link to={`/product/${orderItem.product.slug}`}>Buy Again</Link>
          </button>
          {user?.role === "Admin" &&
            daydiff(orderItem.deliveryTracking.currentStatus.timestamp, 3) <=
              0 &&
            deliveryNumber(orderItem.deliveryTracking.currentStatus.status) <
              4 && (
              <button
                onClick={() => refund(orderItem)}
                className="w-full px-3 py-[0.375rem] text-base leading-normal border-none bg-malon-color mt-2.5"
              >
                Refund
              </button>
            )}
          {user?.role === "Admin" && (
            <button
              onClick={() => toggleOrderHoldStatus()}
              className="w-full px-3 py-[0.375rem] text-white text-base leading-normal border-none bg-malon-color mt-2.5"
            >
              {orderItem.onHold ? "UnHold" : "Hold"}
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
                className="w-full px-3 py-[0.375rem] text-base leading-normal border-none bg-malon-color mt-2.5"
              >
                Pay Seller
              </button>
            )}
        </div>
      </div>
      {Object.entries(orderItem.deliveryOption).map(([key, value]) =>
        key === "total" || key === "_id" ? (
          ""
        ) : (
          <div className="flex capitalize text-[13px]" key={key}>
            <div className="flex-1">{key}:</div>
            {key === "fee" ? (
              <div className="flex-1 lg:flex-[5]">
                {currency(region())} {value}
              </div>
            ) : (
              <div className="flex-1 lg:flex-[5]">{value}</div>
            )}
          </div>
        )
      )}
      <div className="mt-2.5">
        <div>Seller Information</div>
        <div className="flex items-center mt-[5px]">
          <Link to={`/seller/${orderItem.seller.username}`}>
            <img
              className="w-10 h-10 object-cover rounded-[50%]"
              src={orderItem.seller.image}
              alt="img"
            />
          </Link>
          <div>
            <div className="font-bold hover:underline text-malon-color mx-5 my-0">
              <Link to={`/seller/${orderItem.seller.username}`}>
                @{orderItem.seller.username}
              </Link>
            </div>
            {user?.role === "Admin" && (
              <div className="font-bold mx-5 my-0">{orderItem.seller._id}</div>
            )}
            <div className="font-bold mx-5 my-0">
              {orderItem.seller.firstName} {orderItem.seller.lastName}
            </div>
          </div>
        </div>
      </div>
      {user?.role === "Admin" && (
        <div className="mt-2.5">
          <div>Buyer Information</div>
          <div className="flex items-center mt-[5px]">
            <Link to={`/seller/${userOrdered.username}`}>
              <img
                className="w-10 h-10 object-cover rounded-[50%]"
                src={userOrdered.image}
                alt="img"
              />
            </Link>
            <div>
              <div className="font-bold hover:underline text-malon-color mx-5 my-0">
                <Link to={`/seller/${userOrdered.username}`}>
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
      )}
    </div>
  )
}

export default IsUser
