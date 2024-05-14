import { Link } from "react-router-dom"
import LoadingBox from "../../components/LoadingBox"
import MessageBox from "../../components/MessageBox"

const OrderList = () => {
  const loading = false
  const error = ""

  return (
    <div className="flex-[4]">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox className="text-[red]">{error}</MessageBox>
      ) : (
        <div className="p-5 my-0 mx-5 min-h-[85vh] dark:bg-dark-ev1 bg-light-ev1">
          <h1 className="text-xl py-5 pl-0 pr-5 lg:text-[calc(1.375rem_+_1.5vw)]">
            Purchase Product History
          </h1>
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 5 }).map(() => (
              <div
                key={Math.random()}
                className="flex mt-5 flex-1 gap-2.5 flex-col bg-white dark:bg-black md:flex-row shadow-lg p-2.5"
              >
                <img
                  src="https://res.cloudinary.com/emirace/image/upload/v1699446070/bkdwnhkmncbu7z7pbf7u.jpg"
                  alt="shoe"
                  className="aspect-square h-[104px]"
                />
                <div className="flex-1 flex flex-col gap-3">
                  <div>
                    <div className="capitalize font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                      The best running shoes that i know
                    </div>
                    <div className="text-sm text-gray-600">Order 12344938</div>
                  </div>
                  <div>
                    <div className="text-sm">Delivered</div>
                    <div>Nov 24 23, 11:01 am</div>
                    {/* <div>{moment(ret.createdAt).format("MMM DD YY, h:mm a")}</div> */}
                  </div>
                </div>
                <Link
                  to={`/order/id`}
                  className="text-orange-color p-1 uppercase font-medium hover:underline"
                >
                  See Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderList
