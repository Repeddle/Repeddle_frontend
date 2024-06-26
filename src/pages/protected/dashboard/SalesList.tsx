import { Link } from "react-router-dom"
import MessageBox from "../../../components/MessageBox"
import useOrder from "../../../hooks/useOrder"
import { useEffect } from "react"
import moment from "moment"
import LoadingControlModal from "../../../components/ui/loadin/LoadingControlLogo"

const SalesList = () => {
  const { fetchSoldOrders, loading, error, orders } = useOrder()

  useEffect(() => {
    fetchSoldOrders()
  }, [])

  console.log(orders)

  return (
    <div className="flex-[4] relative flex flex-col">
      <div className="p-5 my-0 mx-5 min-h-[85vh] dark:bg-dark-ev1 bg-light-ev1">
        <h1 className="text-xl py-5 pl-0 pr-5 lg:text-[calc(1.375rem_+_1.5vw)]">
          Sold Product History
        </h1>
        {loading && <LoadingControlModal />}

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
                      className="flex mt-5 flex-1 gap-2.5 flex-col bg-white dark:bg-black md:flex-row shadow-lg p-2.5"
                    >
                      <img
                        src={order.items[0].product.images[0]}
                        alt={order.items[0].product.name}
                        className="aspect-square h-[104px]"
                      />
                      <div className="flex-1 flex flex-col gap-3">
                        <div>
                          <div className="capitalize font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                            {order.items[0].product.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            Order {order._id}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            {
                              order.items[0].deliveryTracking.history[
                                order.items[0].deliveryTracking.history.length -
                                  1
                              ].status
                            }
                          </div>
                          <div>
                            {moment(
                              order.items[0].deliveryTracking.history[
                                order.items[0].deliveryTracking.history.length -
                                  1
                              ].timestamp
                            ).format("MMM DD YY, h:mm a")}
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/order/${order._id}`}
                        className="text-orange-color p-1 uppercase font-medium hover:underline"
                      >
                        See Details
                      </Link>
                    </div>
                  ))}
              </div>

              {orders.length === 0 && <MessageBox>No orders yet</MessageBox>}
            </>
          ))}
      </div>
    </div>
  )
}

export default SalesList
