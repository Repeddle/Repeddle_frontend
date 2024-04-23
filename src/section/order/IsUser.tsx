import moment from "moment"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { OrderItem } from "../../types/order"
import ModelLogin from "../../components/ModelLogin"
import { useState } from "react"
import { IUser } from "../../types/user"
import { daydiff, deliveryNumber } from "../../utils/common"

type Props = {
  orderItem: OrderItem
  userOrdered: IUser
  setShowDeliveryHistory: (val: boolean) => void
  setShowReturn: (val: boolean) => void
  setCurrentDeliveryHistory: (val: number) => void
  handleCancelOrder: (val: OrderItem) => void
  refund: (val: OrderItem) => void
  paySeller: (val: OrderItem) => void
  deliverOrderHandler: (deliveryStatus: string, orderItem: OrderItem) => void
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
}: Props) => {
  const { user } = useAuth()

  const [afterAction, setAfterAction] = useState(false)

  const placeOrderOnHold = () => {}

  const toggleOrderHoldStatus = () => {}

  const paymentRequest = () => {}

  return (
    <div
      className={`h-full mb-[15px] lg:px-5 lg:py-[15px] rounded-[5px] print:text-black-color
    print:mb-[5px] print:p-[5px] print:bg-white px-[15px] py-2.5 bg-light-ev2 dark:bg-dark-ev2`}
    >
      <div className="flex flex-col w-full lg:flex-row">
        <div>
          <div className="flex text-center">
            {/* {displayDeliveryStatus(
              orderItem.onHold ? "Hold" : orderItem.deliveryStatus
            )} */}
            <div
              className="text-malon-color cursor-pointer text-center ml-[15px]"
              onClick={() => {
                setShowDeliveryHistory(true)
                setCurrentDeliveryHistory(
                  deliveryNumber(orderItem.deliveryStatus)
                )
              }}
            >
              Track Order
            </div>
          </div>
          <div className="capitalize font-semibold mb-2.5">
            On {moment(orderItem.deliveredAt).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
        </div>
        {user &&
          userOrdered._id === user._id &&
          orderItem.deliveryStatus === "Delivered" && (
            <>
              <div
                className="cursor-pointer text-white-color bg-orange-color hover:bg-malon-color h-[30px] mr-[30px] px-[7px] py-[3px] rounded-[0.2rem]"
                onClick={() => {
                  orderItem.onHold ? placeOrderOnHold() : setAfterAction(true)
                }}
              >
                Comfirm you have recieved order
              </div>
              <ModelLogin setShowModel={setAfterAction} showModel={afterAction}>
                <div className="flex flex-col justify-center items-center h-full p-2.5">
                  <div className="flex">
                    <div
                      className="cursor-pointer text-white-color bg-orange-color hover:bg-malon-color h-[30px] mr-[30px] px-[7px] py-[3px] rounded-[0.2rem]"
                      onClick={() => {
                        paymentRequest()
                        setAfterAction(false)
                      }}
                    >
                      Comfirm you have recieved order
                    </div>
                    <div
                      className="cursor-pointer bg-malon-color hover:bg-orange-color text-white-color h-[30px] px-[7px] py-[3px] rounded-[0.2rem]"
                      onClick={() => {
                        setShowReturn(true)
                        setAfterAction(false)
                      }}
                    >
                      Log a return
                    </div>
                  </div>
                  <div className="text-[13px] max-w-[400px]">
                    Please inspect your order before confirming receipt. Kindly
                    know that you can't LOG A RETURN after order receipt
                    confirmation. However, you can re-list your product for sale
                    at this point
                  </div>
                </div>
              </ModelLogin>
            </>
          )}
        {orderItem.trackingNumber && (
          <label className="mr-5">
            Tracking Number: {orderItem.trackingNumber}
          </label>
        )}
      </div>
      {deliveryNumber(orderItem.deliveryStatus) > 3 && (
        <div className="flex gap-1 items-center justify-center">
          <div
            className="cursor-pointer flex flex-col items-center"
            onClick={() => setShowReturn(true)}
          >
            <b>Log a return</b>
          </div>
          {daydiff(orderItem.deliveredAt, 3) >= 0 && (
            <div className="text-[red]">
              {daydiff(orderItem.deliveredAt, 3)} days left
            </div>
          )}
        </div>
      )}
      {user?.isAdmin && (
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
            src={orderItem.images[0]}
            alt={orderItem.name}
          />
          <div className="flex flex-col justify-center px-5 py-0">
            <div className="capitalize font-semibold mb-2.5">
              {orderItem.name}
            </div>
            <div className="mb-2.5">QTY: {orderItem.quantity}</div>
            <div className="font-bold">
              Unit Price: N
              {/* TODO:
              {orderItem.currency} */}
              {orderItem.sellingPrice}
            </div>
            <div className="font-bold">
              Total: N
              {/* TODO:
              {orderItem.currency} */}
              {orderItem.sellingPrice * orderItem.quantity}
            </div>
          </div>
        </div>
        <div className="flex-[2] print:hidden print:mb-2.5">
          <button className="bg-[#0d6efd] w-full px-3 py-[0.375rem] text-base leading-normal border-none">
            <Link to={`/product/${orderItem.slug}`}>Buy Again</Link>
          </button>
          {user?.isAdmin &&
            daydiff(orderItem.deliveredAt, 3) <= 0 &&
            deliveryNumber(orderItem.deliveryStatus) < 4 && (
              <button
                onClick={() => refund(orderItem)}
                className="w-full px-3 py-[0.375rem] text-base leading-normal border-none bg-malon-color mt-2.5"
              >
                Refund
              </button>
            )}
          {user?.isAdmin && (
            <button
              onClick={() => toggleOrderHoldStatus()}
              className="w-full px-3 py-[0.375rem] text-base leading-normal border-none bg-malon-color mt-2.5"
            >
              {orderItem.onHold ? "UnHold" : "Hold"}
            </button>
          )}
          {user?.isAdmin &&
            daydiff(orderItem.deliveredAt, 3) <= 0 &&
            deliveryNumber(orderItem.deliveryStatus) === 4 && (
              <button
                onClick={() => {
                  paySeller(orderItem)
                  deliverOrderHandler("Payment To Seller Initiated", orderItem)
                }}
                className="w-full px-3 py-[0.375rem] text-base leading-normal border-none bg-malon-color mt-2.5"
              >
                Pay Seller
              </button>
            )}
        </div>
      </div>
      {Object.entries(orderItem.deliverySelect).map(([key, value]) =>
        key === "total" ? (
          ""
        ) : (
          <div className="flex capitalize text-[13px]" key={key}>
            <div className="flex-1">{key}:</div>
            {key === "cost" ? (
              <div className="flex-1 lg:flex-[5]">
                N {value}
                {/* TODO: */}
                {/* {currency} */}
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
            {user?.isAdmin && (
              <div className="font-bold mx-5 my-0">{orderItem.seller._id}</div>
            )}
            <div className="font-bold mx-5 my-0">
              {orderItem.seller.firstName} {orderItem.seller.lastName}
            </div>
          </div>
        </div>
      </div>
      {user?.isAdmin && (
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
              {user?.isAdmin && (
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