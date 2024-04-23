import { useRef, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import MessageBox from "../../components/MessageBox"
import useAuth from "../../hooks/useAuth"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import moment from "moment"
import { orderData as order } from "../../utils/data"
import ModelLogin from "../../components/ModelLogin"
import IsSeller from "../../section/order/IsSeller"
import IsUser from "../../section/order/IsUser"
import PaymentDelivery from "../../section/order/PaymentDelivery"
import Return from "../../section/order/Return"
import DeliveryHistory from "../../components/DeliveryHistory"
import { OrderItem } from "../../types/order"

const Order = () => {
  const loading = false
  const error = null
  const isSeller = false
  const [showReturn, setShowReturn] = useState(false)
  const itemsPrice = 0
  const shippingPrice = 0
  const [showDeliveryHistory, setShowDeliveryHistory] = useState(false)
  const [currentDeliveryHistory, setCurrentDeliveryHistory] = useState(0)

  const componentRef = useRef(null)
  const { id: orderId } = useParams()

  const { user } = useAuth()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const deliverOrderHandler = (
    deliveryStatus: string,
    orderItem: OrderItem
  ) => {
    console.log(deliveryStatus, orderItem)
  }

  const handleCancelOrder = (item: OrderItem) => {
    console.log(item)
  }

  const refund = (item: OrderItem) => {
    console.log(item)
  }

  const paySeller = (item: OrderItem) => {
    console.log(item)
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox className="text-[red]">{error}</MessageBox>
  ) : (
    <div
      className="lg:m-5 dark:bg-dark-ev1 bg-light-ev1 lg:pt-5 lg:pb-0 lg:px-[5vw] print:text-black-color print:bg-white m-2.5 pt-2.5 pb-0 px-[5px]"
      ref={componentRef}
    >
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <img
        className="w-[100px] print:block hidden"
        src="/images/logo/logo.png"
      />
      <div className="w-full hidden text-malon-color mb-0 p-0 print:block">
        Invoice
      </div>
      <div className="flex justify-between">
        <h1 className="lg:mb-0 lg:px-[30px] lg:py-[15px] text-xl mt-[15px] p-2.5">
          Order Details
        </h1>
        <div
          className="font-medium text-white-color text-center w-[150px] cursor-pointer h-[30px] px-2 py-px rounded-[0.2rem] hover:bg-malon-color bg-orange-color print:hidden"
          onClick={handlePrint}
        >
          Print as Invoice
        </div>
      </div>
      <div className="w-full mb-[30px] px-[30px] py-0 rounded-[5px] lg:text-base text-[13px] lg:px-2.5 lg:py-0">
        <div className="px-5 py-[15px] rounded-[0.2rem] print:text-black-color print:bg-white bg-light-ev2 dark:bg-dark-ev2">
          <div className="font-bold">Order number {orderId}</div>

          <div className="flex">
            {order.orderItems.length} Item
            {order.orderItems.length > 1 ? "s" : ""}
          </div>
          <Date>
            Placed on{" "}
            {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Date>
        </div>
        <div className="flex justify-between items-center mr-5">
          <div className="uppercase font-bold py-[15px] px-0">
            Items in your order
          </div>

          <ModelLogin setShowModel={setShowReturn} showModel={showReturn}>
            {orderId && (
              <Return
                // deliverOrderHandler={deliverOrderHandler}
                orderItems={order.orderItems}
                // deliveryMethod={order.deliveryMethod}
                setShowReturn={setShowReturn}
                orderId={orderId}
              />
            )}
          </ModelLogin>
        </div>
        {order.orderItems.map((orderItem) =>
          isSeller ? (
            orderItem.seller._id === user?._id && (
              <IsSeller
                itemsPrice={itemsPrice}
                userOrdered={order.user}
                orderItem={orderItem}
                shippingPrice={shippingPrice}
                deliverOrderHandler={deliverOrderHandler}
                handleCancelOrder={handleCancelOrder}
                paySeller={paySeller}
                refund={refund}
                setCurrentDeliveryHistory={setCurrentDeliveryHistory}
                setShowDeliveryHistory={setShowDeliveryHistory}
              />
            )
          ) : (
            <IsUser
              orderItem={orderItem}
              userOrdered={order.user}
              deliverOrderHandler={deliverOrderHandler}
              handleCancelOrder={handleCancelOrder}
              paySeller={paySeller}
              refund={refund}
              setCurrentDeliveryHistory={setCurrentDeliveryHistory}
              setShowDeliveryHistory={setShowDeliveryHistory}
              setShowReturn={setShowReturn}
            />
          )
        )}
        <ModelLogin
          showModel={showDeliveryHistory}
          setShowModel={setShowDeliveryHistory}
        >
          <div className="flex items-center justify-center h-full">
            <DeliveryHistory status={currentDeliveryHistory} />
          </div>
        </ModelLogin>
        <PaymentDelivery
          isSeller={isSeller}
          shippingPrice={shippingPrice}
          itemsPrice={itemsPrice}
          order={order}
        />
      </div>
    </div>
  )
}

export default Order