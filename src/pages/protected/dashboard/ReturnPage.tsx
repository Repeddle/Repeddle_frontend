/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: remove this
import { useEffect, useState } from "react"
import {
  currency,
  // daydiff,
  deliveryNumber,
  deliveryStatusMap,
  region,
} from "../../../utils/common"
import { Link, useParams } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
import moment from "moment"
import MessageImage from "../../../components/ui/MessageImage"
import Modal from "../../../components/ui/Modal"
// import { FaCheck } from "react-icons/fa"
import DeliveryReturn from "../../../components/DeliveryReturn"
import useReturn from "../../../hooks/useReturn"
import { IReturn } from "../../../types/order"
import useToastNotification from "../../../hooks/useToastNotification"
import LoadingControlModal from "../../../components/ui/loadin/LoadingControlLogo"
import LoadingBox from "../../../components/LoadingBox"
import { FaCheck } from "react-icons/fa"
import DeliveryHistoryReturn from "../../../components/DeliveryHistoryReturn"
// import { IUser } from "../../../types/user"

const ReturnPage = () => {
  const { id: returnId } = useParams()
  const {
    fetchReturnById,
    error,
    updateReturnStatusAdmin,
    updateReturnStatus,
  } = useReturn()
  const { addNotification } = useToastNotification()

  const { user } = useAuth()

  const [reasonText, setReasonText] = useState("")
  const [showModel, setShowModel] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingReturn, setLoadingReturn] = useState(false)
  const [returned, setReturned] = useState<IReturn>()
  const [showTracking, setShowTracking] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState("")

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      if (!returnId) return addNotification("Id not found")
      const res = await fetchReturnById(returnId)
      if (res) {
        setReturned(res)
      } else {
        addNotification(error,undefined,true)
      }

      setLoading(false)
    }

    getData()
  }, [])

  const handleReturn = async (type: string) => {
    if (type === "Declined") {
      if (!reasonText.length) {
        addNotification("Enter Reason for Decline", undefined, true)
        return
      }
      setLoadingReturn(true)

      const res = await updateReturnStatusAdmin(returnId ?? "", {
        adminReason: reasonText,
        status: type,
      })

      if (res) {
        setReturned(res)
      } else {
        addNotification(
          error ? error : "failed to update status",
          undefined,
          true
        )
      }
    } else {
      setLoadingReturn(true)

      const res = await updateReturnStatusAdmin(returnId ?? "", {
        adminReason: reasonText,
        status: type,
      })

      if (res) {
        setReturned(res)
      } else {
        addNotification(
          error ? error : "failed to update status",
          undefined,
          true
        )
      }
    }

    setLoadingReturn(false)
  }

  // const refund = (val: any) => {
  //   console.log(val)
  // }

  // const paySeller = (val: any) => {
  //   console.log(val)
  // }

  // const paymentRequest = async (user: IUser, cost: number, type: string) => {
  //   console.log(user, cost, type)
  // }

  const showNextStatus = (status: string) => {
    const entries = Object.entries(deliveryStatusMap)
    const currentNumber = deliveryNumber(status)

    return entries[currentNumber]
  }

  const updateTracking = async () => {
    if (!returned) return

    const nextStatus = showNextStatus(
      returned.deliveryTracking.currentStatus.status
    )

    if (nextStatus[1] === 9 && !trackingNumber) {
      setShowTracking(true)
    } else {
      setLoadingReturn(true)
      const body: { status: string; trackingNumber?: string } = {
        status: nextStatus[0],
      }

      if (trackingNumber) body["trackingNumber"] = trackingNumber

      const res = await updateReturnStatus(returned._id, body)

      if (res) setReturned(res)
      else addNotification(error || "Failed to update status", undefined, true)

      setLoadingReturn(false)
    }
  }

  const confirmTracking = async () => {
    if (!trackingNumber) addNotification("Tracking number is required")

    await updateTracking()

    setShowTracking(false)
    setTrackingNumber("")
  }

  return loading ? (
    <LoadingControlModal />
  ) : (
    returned && (
      <div className="flex-[4] lg:mx-[10vw] lg:my-0 lg:p-5 rounded-[0.2rem] min-h-[85vh] m-0 p-2.5 bg-light-ev1 dark:bg-dark-ev2">
        <h1 className="text-xl lg:text-[28px] leading-tight">
          Return ID MRRN: {returnId}
        </h1>
        <div className="h-full mb-[15px] px-[15px] py-2.5 lg:px-5 lg:py-[15px] rounded-[5px] bg-light-ev2 dark:bg-transparent">
          <div className="capitalize font-semibold mb-2.5">Product</div>
          <div className="flex items-center">
            <img
              src={returned.productId.images[0]}
              alt={returned.productId.name}
              className="w-[100px] h-[100px] rounded-[50%] object-cover object-top"
            />
            <Link to={`/product/${returned.productId.slug}`}>
              <div className="ml-5 text-orange-color">
                {returned.productId.name}
              </div>
            </Link>
          </div>
          <hr />
          <div className="capitalize font-semibold mb-2.5">Order ID</div>
          <Link to={`/order/${returned.orderId._id}`}>
            <div className="flex text-orange-color">{returned.orderId._id}</div>
          </Link>
          <hr />
          <div className="capitalize font-semibold mb-2.5">Date</div>
          <div className="flex">
            {moment(returned.createdAt).format("MMM DD YY, h:mm a")}
          </div>
          <hr />
          <div className="capitalize font-semibold mb-2.5">Buyer</div>
          <div className="flex text-orange-color">
            <Link to={`/seller/${returned.orderId.buyer.username}`}>
              {returned.orderId.buyer.username}
            </Link>
          </div>
          <hr />

          <div className="capitalize font-semibold mb-2.5">Seller</div>
          <div className="flex">
            <Link
              to={`/seller/${returned.productId.seller.username}`}
              className="text-orange-color"
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
          <div className="flex">{returned.deliveryOption.method}</div>
          <hr />
          <div className="capitalize font-semibold mb-2.5">
            Preferred Refund Method
          </div>
          <div className="flex">{returned.refund}</div>
          <hr />
          <div className="capitalize font-semibold mb-2.5">
            Other Information
          </div>
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
              <div className="mt-5 flex flex-col">
                <label htmlFor="">Reason</label>
                <textarea
                  className="w-1/2 bg-white dark:bg-black h-[150px] p-5"
                  onChange={(e) => setReasonText(e.target.value)}
                  value={reasonText}
                >
                  Enter Reason for Decline here...
                </textarea>
              </div>
              {loadingReturn ? (
                <LoadingBox />
              ) : (
                <>
                  <button
                    className="w-[200px] text-white hover:bg-orange-color bg-orange-color cursor-pointer mr-5 mt-[30px] px-2.5 py-[7px] rounded-[0.2rem] border-none"
                    onClick={() => handleReturn("Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="w-[200px] text-white bg-orange-color cursor-pointer mr-5 mt-[30px] px-2.5 py-[7px] rounded-[0.2rem] border-none"
                    onClick={() => handleReturn("Declined")}
                  >
                    Decline
                  </button>
                </>
              )}
            </>
          ) : (
            <p className="text-[red]">Waiting Admin Approver/Decline</p>
          )}

          {returned.status === "Approved" && (
            <>
              <div className="capitalize font-semibold mb-2.5">
                Return Delivery Address
              </div>
              {returned.deliverySelected ? (
                Object.entries(returned.deliverySelected).map(
                  ([key, value]) => (
                    <div className="flex capitalize text-[13px]">
                      {key === "fee" ? (
                        <>
                          <div className="flex-[3]">{key}:</div>
                          <div className="flex-[5]">
                            {currency(region())} {value}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-[3]">{key}:</div>
                          <div className="flex-[5]">{value}</div>
                        </>
                      )}
                    </div>
                  )
                )
              ) : returned.productId.seller._id === user?._id ? (
                <button
                  className="w-[250px] text-white hover:bg-orange-color bg-orange-color cursor-pointer mr-5 mt-[10px] px-2.5 py-[7px] rounded-[0.2rem] border-none"
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

          {returned.orderId.items.map(
            (orderitem) =>
              (orderitem.product as unknown as string) ===
                returned.productId._id && (
                <>
                  {/* {user?.role === "Admin" &&
                  daydiff(orderitem.deliveredAt, 3) <= 0 &&
                  deliveryNumber(
                    orderitem.deliveryTracking.currentStatus.status
                  ) === 8 &&
                  !returned.returnDelivery &&
                  (refunding ? (
                    <LoadingBox />
                  ) : (
                    <button
                      onClick={() => refund(orderitem)}
                      className="inline-block bg-orange-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
                    >
                      Refund
                    </button>
                  ))} */}
                  {/* {user?.role === "Admin" &&
                  daydiff(orderitem.deliveredAt, 3) <= 0 &&
                  deliveryNumber(
                    orderitem.deliveryTracking.currentStatus.status
                  ) === 10 &&
                  (refunding ? (
                    <LoadingBox />
                  ) : (
                    <button
                      onClick={() => refund(orderitem)}
                      className="inline-block bg-orange-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
                    >
                      Refund
                    </button>
                  ))} */}
                  {/* {user?.role === "Admin" &&
                  daydiff(orderitem.deliveredAt, 3) <= 0 &&
                  deliveryNumber(
                    orderitem.deliveryTracking.currentStatus.status
                  ) === 8 &&
                  returned.returnDelivery && (
                    <button
                      onClick={() => {
                        paySeller(orderitem)
                      }}
                      className="inline-block bg-orange-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
                    >
                      Pay Seller
                    </button>
                  )} */}
                  {/* {user?.role === "Admin" &&
                  daydiff(orderitem.deliveredAt, 7) <= 0 &&
                  deliveryNumber(
                    orderitem.deliveryTracking.currentStatus.status
                  ) === 9 &&
                  returned.returnDelivery && (
                    <button
                      onClick={() => {
                        paySeller(orderitem)
                      }}
                      className="inline-block bg-orange-color mt-2.5 text-center whitespace-no-wrap rounded py-1 px-3 leading-normal text-white w-full"
                    >
                      Pay Seller
                    </button>
                  )} */}
                  <div className="flex justify-center mx-0 my-5">
                    {returned.productId.seller._id === user?._id ? (
                      deliveryNumber(
                        returned.deliveryTracking.currentStatus.status
                      ) === 10 &&
                      (!loadingReturn ? (
                        <div
                          onClick={updateTracking}
                          className="p-2 self-start lg:self-end rounded-[0.2rem] cursor-pointer transition-all duration-300 bg-orange-color text-white hover:bg-orange-color"
                        >
                          {`Mark as ${
                            showNextStatus(
                              returned.deliveryTracking.currentStatus.status
                            )[0]
                          }`}
                        </div>
                      ) : (
                        <LoadingBox />
                      ))
                    ) : returned.orderId.buyer._id === user?._id ? (
                      showTracking ? (
                        <div className="flex items-center">
                          <input
                            className="border h-10 ml-5 p-2.5 rounded-tl-[0.2rem] rounded-bl-[0.2rem] focus-visible:outline bg-white dark:bg-dark-ev1 outline-orange-color text-black dark:text-white border-[grey]"
                            placeholder="Enter Tracking number"
                            value={trackingNumber}
                            type="text"
                            onChange={(e) => setTrackingNumber(e.target.value)}
                          />
                          <div className="h-10 w-10 flex justify-center items-center cursor-pointer text-white-color rounded-tr-[0.2rem] rounded-br-[0.2rem] hover:text-orange-color bg-orange-color">
                            <FaCheck onClick={confirmTracking} />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row">
                          {returned?.trackingNumber && (
                            <div className="mr-5">
                              Tracking Number: {returned.trackingNumber}
                            </div>
                          )}

                          {deliveryNumber(
                            returned.deliveryTracking.currentStatus.status
                          ) > 7 &&
                            deliveryNumber(
                              returned.deliveryTracking.currentStatus.status
                            ) < 10 &&
                            (!loadingReturn ? (
                              <div
                                onClick={updateTracking}
                                className="p-2 self-start lg:self-end rounded-[0.2rem] cursor-pointer transition-all duration-300 bg-orange-color text-white hover:bg-orange-color"
                              >
                                {`Mark as ${
                                  showNextStatus(
                                    returned.deliveryTracking.currentStatus
                                      .status
                                  )[0]
                                }`}
                              </div>
                            ) : (
                              <LoadingBox />
                            ))}
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <DeliveryHistoryReturn
                    history={returned.deliveryTracking.history}
                    status={deliveryNumber(
                      orderitem.deliveryTracking.currentStatus.status
                    )}
                  />
                </>
              )
          )}
        </div>
        <Modal onClose={() => setShowModel(false)} isOpen={showModel}>
          <DeliveryReturn
            setShowModel={setShowModel}
            returned={returned}
            setReturned={setReturned}
          />
        </Modal>
      </div>
    )
  )
}

export default ReturnPage
