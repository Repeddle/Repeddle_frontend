import { useEffect, useRef, useState } from "react"
import MessageBox from "../../components/MessageBox"
import useAuth from "../../hooks/useAuth"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import moment from "moment"
import IsSeller from "../../section/order/IsSeller"
import IsUser from "../../section/order/IsUser"
import PaymentDelivery from "../../section/order/PaymentDelivery"
import Return from "../../section/order/Return"
import DeliveryHistory from "../../components/DeliveryHistory"
import { IOrder, OrderItem } from "../../types/order"
import Modal from "../../components/ui/Modal"
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal"
import useOrder from "../../hooks/useOrder"
import { deliveryNumber, deliveryStatusMap } from "../../utils/common"
import useToastNotification from "../../hooks/useToastNotification"
import usePayments from "../../hooks/usePayment"

const Order = () => {
  const { id: orderId } = useParams()
  const {
    fetchOrderById,
    error,
    loading,
    updateOrderItemTracking,
    updateOrderItemStatus,
  } = useOrder()
  const { addNotification } = useToastNotification()
  const { user } = useAuth()
  const { paySeller, refundBuyer } = usePayments()

  const [isSeller, setIsSeller] = useState(false)
  const [showReturn, setShowReturn] = useState(false)
  const itemsPrice = 0
  const shippingPrice = 0
  const [showDeliveryHistory, setShowDeliveryHistory] = useState(false)
  const [currentDeliveryHistory, setCurrentDeliveryHistory] = useState(0)
  const [order, setOrder] = useState<IOrder>()
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return
      const data = await fetchOrderById(orderId)

      if (data) {
        setOrder(data)
        if (user) {
          const existSell = data.items.filter((x) => x.seller._id === user._id)
          if (existSell.length) {
            setIsSeller(true)
          }
        }
      } else {
        setShowError(true)
      }
    }

    fetchOrder()
  }, [orderId])

  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const showNextStatus = (status: string) => {
    const entries = Object.entries(deliveryStatusMap)
    const currentNumber = deliveryNumber(status)

    return entries[currentNumber]
  }

  const deliverOrderHandler = async (
    currentStatus: string,
    orderItem: OrderItem,
    trackingNumber?: string
  ) => {
    if (!order) return
    const nextStatus = showNextStatus(currentStatus)

    if (nextStatus[1] === 2) {
      if (!trackingNumber) {
        addNotification(
          "Tracking number is required to dispatch item",
          undefined,
          true
        )
        return
      }
    }

    setUpdatingStatus(true)

    const res = await updateOrderItemTracking(
      order._id,
      orderItem.product._id,
      {
        status: nextStatus[0],
        trackingNumber,
      }
    )
    if (res) {
      addNotification("Item status has been updated")
      setOrder(res)
    } else {
      addNotification(error || "Failed to update status", undefined, true)
    }

    setUpdatingStatus(false)
  }

  const handleCancelOrder = (item: OrderItem) => {
    console.log(item)
  }

  const onRefund = async (item: OrderItem) => {
    if (!order) return
    setUpdatingStatus(true)
    const data = await refundBuyer(order._id, item.product._id, order.buyer._id)

    if (typeof data !== "string") {
      addNotification(data.message)
    } else addNotification(data, undefined, true)

    setUpdatingStatus(false)
  }

  const onPaySeller = async (item: OrderItem) => {
    if (!order) return
    setUpdatingStatus(true)
    const data = await paySeller(order._id, item.product._id, item.seller._id)

    if (typeof data !== "string") {
      addNotification(data.message)
    } else addNotification(data, undefined, true)

    setUpdatingStatus(false)
  }

  const toggleOrderHoldStatus = async (item: OrderItem) => {
    if (!orderId) return

    const res = await updateOrderItemStatus(
      orderId,
      item._id,
      item.isHold ? "unhold" : "hold"
    )
    if (res) {
      setOrder(res)
      addNotification("Item status has been updated")
    } else {
      addNotification("Failed to update status", undefined, true)
    }
  }

  return !loading && showError ? (
    <MessageBox className="text-[red]">{error}</MessageBox>
  ) : (
    <div
      className="lg:m-5 dark:bg-dark-ev1 bg-light-ev1 lg:pt-5 lg:pb-0 lg:px-[5vw] print:text-black-color print:bg-white m-2.5 pt-2.5 pb-0 px-[5px]"
      ref={componentRef}
    >
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>

      {loading && <LoadingLogoModal />}
      {order && (
        <>
          <img
            className="w-[100px] print:block hidden"
            src="/images/logo/logo.png"
          />
          <div className="w-full hidden text-malon-color mb-0 p-0 print:block">
            Invoice
          </div>
          <div
            className="font-medium ml-auto text-white-color text-center w-[150px] cursor-pointer h-[30px] px-2 py-px mt-1 rounded-[0.2rem] hover:bg-malon-color bg-orange-color print:hidden"
            onClick={handlePrint}
          >
            Print as Invoice
          </div>
          <h1 className="lg:mb-0 lg:py-[15px] p-2.5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight">
            Order Details
          </h1>
          <div className="w-full mb-[30px] px-2.5 py-0 rounded-[5px] lg:text-base text-[13px] lg:px-2.5 lg:py-0">
            <div className="px-5 py-[15px] rounded-[0.2rem] print:text-black-color print:bg-white bg-light-ev2 dark:bg-dark-ev2">
              <div className="font-bold">Order number {orderId}</div>

              <div className="flex">
                {order.items.length} Item
                {order.items.length > 1 ? "s" : ""}
              </div>
              <div>
                Placed on{" "}
                {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </div>
            </div>
            <div className="flex justify-between items-center mr-5">
              <div className="uppercase font-bold py-[15px] px-0">
                Items in your order
              </div>

              {orderId && (
                <Return
                  orderItems={order.items}
                  setShowReturn={setShowReturn}
                  orderId={orderId}
                  showReturn={showReturn}
                />
              )}
            </div>
            {order.items.map((orderItem) =>
              orderItem.seller._id === user?._id ? (
                <IsSeller
                  itemsPrice={itemsPrice}
                  userOrdered={order.buyer}
                  orderItem={orderItem}
                  shippingPrice={shippingPrice}
                  deliverOrderHandler={deliverOrderHandler}
                  handleCancelOrder={handleCancelOrder}
                  paySeller={onPaySeller}
                  refund={onRefund}
                  setCurrentDeliveryHistory={setCurrentDeliveryHistory}
                  setShowDeliveryHistory={setShowDeliveryHistory}
                  updatingStatus={updatingStatus}
                  toggleOrderHoldStatus={toggleOrderHoldStatus}
                />
              ) : (
                <IsUser
                  orderItem={orderItem}
                  userOrdered={order.buyer}
                  deliverOrderHandler={deliverOrderHandler}
                  handleCancelOrder={handleCancelOrder}
                  paySeller={onPaySeller}
                  refund={onRefund}
                  setCurrentDeliveryHistory={setCurrentDeliveryHistory}
                  setShowDeliveryHistory={setShowDeliveryHistory}
                  setShowReturn={setShowReturn}
                  updatingStatus={updatingStatus}
                  toggleOrderHoldStatus={toggleOrderHoldStatus}
                />
              )
            )}
            <Modal
              isOpen={showDeliveryHistory}
              onClose={() => setShowDeliveryHistory(false)}
              size="lg"
            >
              <div className="flex items-center justify-center h-full py-12 pr-[20%] lg:pr-0">
                <DeliveryHistory status={currentDeliveryHistory} />
              </div>
            </Modal>
            <PaymentDelivery
              isSeller={isSeller}
              shippingPrice={shippingPrice}
              itemsPrice={itemsPrice}
              order={order}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Order
