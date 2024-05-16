/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: remove this
import { useState } from "react"
import DeliveryHistory from "../../components/DeliveryHistory"
import { daydiff, deliveryNumber } from "../../utils/common"
import { Link, useParams } from "react-router-dom"
import LoadingBox from "../../components/LoadingBox"
import useAuth from "../../hooks/useAuth"
import { returns } from "../../utils/data"
import moment from "moment"
import MessageImage from "../../components/ui/MessageImage"
import Modal from "../../components/ui/Modal"
import { FaCheck } from "react-icons/fa"
import DeliveryReturn from "../../components/DeliveryReturn"
import { IUser } from "../../types/user"

const ReturnPage = () => {
  const { id: returnId } = useParams()

  const { user } = useAuth()

  const [reasonText, setReasonText] = useState("")
  const [showModel, setShowModel] = useState(false)
  const [enterwaybil, setEnterwaybil] = useState(false)
  const [waybillNumber, setWaybillNumber] = useState("")

  const loading = false
  const returned = returns[0]
  const refunding = false
  const dispatch = false

  const handleReturn = (val: string) => {
    console.log(val)
  }

  const refund = (val: any) => {
    console.log(val)
  }

  const paySeller = (val: any) => {
    console.log(val)
  }

  const confirmWaybill = (val: any) => {
    console.log(val)
  }

  const paymentRequest = async (user: IUser, cost: number, type: string) => {
    console.log(user, cost, type)
  }
  const deliverOrderHandler = async (
    deliveryStatus: string,
    productId: string
  ) => {
    console.log(deliveryStatus, productId)
  }

  return loading ? (
    <LoadingBox />
  ) : (
    <div className="flex-[4] lg:mx-[10vw] lg:my-0 lg:p-5 rounded-[0.2rem] min-h-[85vh] m-0 p-2.5 bg-light-ev1 dark:bg-dark-ev1">
      <h1 className="text-xl lg:text-[28px] leading-tight">
        Return ID MRRN: {returnId}
      </h1>
      <div className="h-full mb-[15px] px-[15px] py-2.5 lg:px-5 lg:py-[15px] rounded-[5px] bg-light-ev2 dark:bg-dark-ev2">
        <div className="capitalize font-semibold mb-2.5">Product</div>
        <div className="flex items-center">
          <img
            src={returned.productId.images[0]}
            alt={returned.productId.name}
            className="w-[100px] h-[100px] rounded-[50%] object-cover object-top"
          />
          <Link to={`/product/${returned.productId.slug}`}>
            <div className="ml-5 text-malon-color">
              {returned.productId.name}
            </div>
          </Link>
        </div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">Order ID</div>
        <Link to={`/order/${returned.orderId._id}`}>
          <div className="flex text-malon-color">{returned.orderId._id}</div>
        </Link>
        <hr />
        <div className="capitalize font-semibold mb-2.5">Date</div>
        <div className="flex">
          {moment(returned.createdAt).format("MMM DD YY, h:mm a")}
        </div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">Buyer</div>
        <div className="flex text-malon-color">
          <Link to={`/seller/${returned.orderId.user._id}`}>
            {returned.orderId.user.username}
          </Link>
        </div>
        <hr />

        <div className="capitalize font-semibold mb-2.5">Seller</div>
        <div className="flex">
          <Link
            to={`/seller/${returned.productId.seller._id}`}
            className="text-malon-color"
          >
            {returned.productId.seller.username}
          </Link>
        </div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">
          Preferred Resolution Method
        </div>
        <div className="flex">Report Form</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">
          Reasons for Return
        </div>
        <div className="flex">{returned.reason}</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">
          Preferred Sending Method
        </div>
        <div className="flex">{returned.sending["delivery Option"]}</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">
          Preferred Refund Method
        </div>
        <div className="flex">{returned.refund}</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">Other Information</div>
        <div className="flex">{returned.others}</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">Image</div>
        <div className="flex">
          {returned.image && (
            <>
              <MessageImage url={returned.image} />
            </>
          )}
        </div>
        {returned.status !== "Pending" ? (
          <>
            <hr />
            <div className="capitalize font-semibold mb-2.5 text-orange-color">
              Status
            </div>
            <div
              className={`flex ${
                returned.status === "Decline" ? "text-[red]" : "text-[green]"
              }`}
            >
              {returned.status}
            </div>
            {returned.status === "Decline" && (
              <div className="flex">Reason: {returned.adminReason}</div>
            )}
            <hr />
          </>
        ) : user?.role === "Admin" ? (
          <>
            <div className="mt-5">
              <textarea
                className="w-1/2 h-[150px] p-5"
                onChange={(e) => setReasonText(e.target.value)}
                value={reasonText}
              >
                Enter Reason for Declince here...
              </textarea>
            </div>
            <button
              className="w-[200px] text-white hover:bg-malon-color bg-orange-color cursor-pointer mr-5 mt-[30px] px-2.5 py-[7px] rounded-[0.2rem] border-none"
              onClick={() => handleReturn("Approved")}
            >
              Approve
            </button>
            <button
              className="w-[200px] text-white bg-malon-color cursor-pointer mr-5 mt-[30px] px-2.5 py-[7px] rounded-[0.2rem] border-none"
              onClick={() => handleReturn("Decline")}
            >
              Decline
            </button>
          </>
        ) : (
          <p className="text-[red]">Waiting Admin Approver/Decline</p>
        )}
        {returned.status === "Approved" && (
          <>
            <div className="capitalize font-semibold mb-2.5">
              Return Delivery Address
            </div>
            {returned.returnDelivery ? (
              Object.entries(returned.returnDelivery).map(([key, value]) => (
                <div className="flex capitalize text-[13px]">
                  {key === "cost" ? (
                    <>
                      <div className="flex-[3]">{key}:</div>
                      <div className="flex-[5]">
                        {/* TODO:  */}
                        {/* {returned.productId.currency} */}N {value}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-[3]">{key}:</div>
                      <div className="flex-[5]">{value}</div>
                    </>
                  )}
                </div>
              ))
            ) : returned.productId.seller._id === user?._id ? (
              <button
                className="w-[250px] text-white hover:bg-malon-color bg-orange-color cursor-pointer mr-5 mt-[10px] px-2.5 py-[7px] rounded-[0.2rem] border-none"
                onClick={() => setShowModel(true)}
              >
                Add Return Delivery Address
              </button>
            ) : (
              <div className="text-red-color">
                Waiting Seller's delivery address
              </div>
            )}
          </>
        )}

        {returned.orderId.orderItems.map(
          (orderitem) =>
            orderitem._id === returned.productId._id && (
              <>
                {user?.role === "Admin" &&
                  daydiff(orderitem.deliveredAt, 3) <= 0 &&
                  deliveryNumber(orderitem.deliveryStatus) === 8 &&
                  !returned.returnDelivery &&
                  (refunding ? (
                    <LoadingBox />
                  ) : (
                    <button
                      onClick={() => refund(orderitem)}
                      className="inline-block bg-malon-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
                    >
                      Refund
                    </button>
                  ))}

                {user?.role === "Admin" &&
                  daydiff(orderitem.deliveredAt, 3) <= 0 &&
                  deliveryNumber(orderitem.deliveryStatus) === 10 &&
                  (refunding ? (
                    <LoadingBox />
                  ) : (
                    <button
                      onClick={() => refund(orderitem)}
                      className="inline-block bg-malon-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
                    >
                      Refund
                    </button>
                  ))}

                {user?.role === "Admin" &&
                  daydiff(orderitem.deliveredAt, 3) <= 0 &&
                  deliveryNumber(orderitem.deliveryStatus) === 8 &&
                  returned.returnDelivery && (
                    <button
                      onClick={() => {
                        paySeller(orderitem)
                      }}
                      className="inline-block bg-malon-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
                    >
                      Pay Seller
                    </button>
                  )}
                {user?.role === "Admin" &&
                  daydiff(orderitem.deliveredAt, 7) <= 0 &&
                  deliveryNumber(orderitem.deliveryStatus) === 9 &&
                  returned.returnDelivery && (
                    <button
                      onClick={() => {
                        paySeller(orderitem)
                      }}
                      className="inline-block bg-malon-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
                    >
                      Pay Seller
                    </button>
                  )}
                <div className="flex justify-center mx-0 my-5">
                  {/* TODO: raised label  */}
                  {returned.productId.seller._id === user?._id ? (
                    <div className="flex flex-col gap-2 relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                      <label className="text-black dark:text-white">
                        Update Delivery Status
                      </label>
                      <select
                        onChange={(e) => {
                          deliverOrderHandler(
                            e.target.value,
                            returned.productId._id
                          )
                          returned.orderId.orderItems.map(async (item) => {
                            if (item._id === returned.productId._id) {
                              await paymentRequest(
                                returned.orderId.user as IUser,
                                // TODO: remove the above
                                returned.returnDelivery?.cost * 2 +
                                  returned.productId.sellingPrice, // dont forget to add quantity {item.quantity}
                                "Return Completed"
                              )
                            }
                          })
                        }}
                        className="text-base min-w-[220px] m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-white border-light-ev4 dark:border-dark-ev4 dark:bg-black focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                      >
                        <option
                          disabled={
                            deliveryNumber(orderitem.deliveryStatus) !== 10
                          }
                          value="Return Received"
                        >
                          Return Received
                        </option>
                      </select>
                    </div>
                  ) : returned.orderId.user._id === user?._id ? (
                    enterwaybil ? (
                      <div className="flex items-center">
                        <input
                          className="border h-10 ml-5 p-2.5 rounded-tl-[0.2rem] rounded-bl-[0.2rem] focus-visible:outline outline-orange-color text-black dark:text-white border-[grey]"
                          placeholder="Enter Tracking number"
                          value={waybillNumber}
                          type="text"
                          onChange={(e) => setWaybillNumber(e.target.value)}
                        />
                        <div className="h-10 w-10 flex justify-center items-center cursor-pointer text-white-color rounded-tr-[0.2rem] rounded-br-[0.2rem] hover:text-malon-color bg-orange-color">
                          <FaCheck onClick={() => confirmWaybill(orderitem)} />
                        </div>
                      </div>
                    ) : (
                      <>
                        {orderitem.returnTrackingNumber && (
                          <div className="mr-5">
                            Tracking Number: {orderitem.returnTrackingNumber}
                          </div>
                        )}
                        {/* TODO: raised label  */}
                        <div className="flex flex-col gap-2 relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                          <label className="text-black dark:text-white">
                            Update Delivery Status
                          </label>
                          <select
                            onChange={(e) => {
                              if (
                                e.target.value === "Return Dispatched" &&
                                returned.sending["delivery Option"] !==
                                  "Pick up from Seller"
                              ) {
                                setEnterwaybil(true)
                              } else {
                                deliverOrderHandler(
                                  e.target.value,
                                  returned.productId._id
                                )
                              }
                            }}
                            className="text-base min-w-[220px] m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-white border-light-ev4 dark:border-dark-ev4 dark:bg-black focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                          >
                            <option
                              disabled={
                                deliveryNumber(orderitem.deliveryStatus) !==
                                  8 || !returned.returnDelivery
                              }
                              value="Return Dispatched"
                            >
                              Return Dispatched
                            </option>

                            <option
                              disabled={
                                deliveryNumber(orderitem.deliveryStatus) !== 9
                              }
                              value="Return Delivered"
                            >
                              Return Delivered
                            </option>
                          </select>
                        </div>
                      </>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <DeliveryHistory
                  status={deliveryNumber(orderitem.deliveryStatus)}
                />
              </>
            )
        )}
      </div>
      <Modal onClose={() => setShowModel(false)} isOpen={showModel}>
        <DeliveryReturn
          setShowModel={setShowModel}
          dispatch={dispatch}
          returned={returned}
        />
      </Modal>
    </div>
  )
}

export default ReturnPage
