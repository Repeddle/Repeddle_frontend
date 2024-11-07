import { Link } from "react-router-dom"
import MessageBox from "../../../components/MessageBox"
import useOrder from "../../../hooks/useOrder"
import { useEffect, useState } from "react"
import LoadingControlModal from "../../../components/ui/loadin/LoadingControlLogo"
import moment from "moment"

const OrderList = () => {
  const { fetchOrders, loading, error, orders } = useOrder()

  const [orderQuery, setOrderQuery] = useState("")

  useEffect(() => {
    fetchOrders(orderQuery)
  }, [orderQuery])

  return (
    <div className="flex-[4] relative flex flex-col">
      <div className="p-2 pb-5 sm:p-5 my-0 min-h-[85vh] dark:bg-dark-ev1 bg-light-ev1">
        <h1 className="text-xl py-5 pl-0 lg:text-[calc(1.375rem_+_1.5vw)]">
          Purchase Product History
        </h1>
        {loading && <LoadingControlModal />}

        <div className="flex mr-2.5 mb-2.5 justify-end">
          <input
            className={`w-3/5 px-1 md:w-2/5 h-[45px] border border-malon-color focus-visible:outline focus-visible:outline-orange-color p-[15px] rounded-[5px]
            placeholder:p-2.5 text-black dark:text-white bg-white dark:bg-black`}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Search by order id"
            type="search"
            value={orderQuery}
          />
        </div>

        {!loading &&
          (error ? (
            <MessageBox className="text-[red]">{error}</MessageBox>
          ) : (
            <>
              <div className="flex flex-col gap-2.5">
                {orders.length > 0 &&
                  orders.map((order) => (
                    <div
                      key={order._id}
                      className="flex mt-2 sm:mt-5 flex-1 gap-2.5 bg-white dark:bg-black md:flex-row p-2.5"
                    >
                      <img
                        src={order.items[0].product.images[0]}
                        alt={order.items[0].product.name}
                        className="aspect-square self-center h-[75px] sm:h-[104px]"
                      />
                      <div className="flex gap-2 sm:gap-0 flex-col sm:flex-row flex-1 overflow-hidden">
                        <div className="flex-1 flex flex-col overflow-hidden gap-3">
                          <div>
                            <div className="capitalize font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                              {order.items[0].product.name}
                            </div>
                            <div className="text-sm text-nowrap overflow-hidden text-ellipsis w-full text-gray-600">
                              Order {order._id}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm">
                              {
                                order.items[0].deliveryTracking.currentStatus
                                  .status
                              }
                            </div>
                            <div>
                              {moment(
                                order.items[0].deliveryTracking.currentStatus
                                  .timestamp
                              ).format("MMM DD YY, h:mm a")}
                            </div>
                          </div>
                        </div>
                        <Link
                          to={`/order/${order._id}`}
                          className="text-orange-color p-1 uppercase flex-wrap font-medium hover:underline"
                        >
                          See Details
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>

              {orders.length === 0 && (
                <MessageBox>
                  {orderQuery.length
                    ? "No product matches this search"
                    : "No Purchases made yet"}
                </MessageBox>
              )}
            </>
          ))}
      </div>
    </div>
  )
}

export default OrderList
