import { ChangeEvent, useEffect, useState } from "react"
import moment from "moment"
import { currency, getMonday, region } from "../../utils/common"
import LoadingBox from "../../components/LoadingBox"
import { FaCircleQuestion } from "react-icons/fa6"
import { IOrderSummary } from "../../types/order"
import useOrder from "../../hooks/useOrder"
import Chart from "../../components/Chart"
import Table from "../../components/table/Table"
import { Link } from "react-router-dom"

const today = moment().startOf("day")

const headers = [
  { title: "ID", hide: true },
  { title: "Order" },
  { title: "Delivery Status", hide: true },
  { title: "Payment Status" },
  { title: "Date", hide: true },
  { title: "Amount", hide: true },
]

function Earning() {
  const now = new window.Date()
  const firstDay = new window.Date(now.getFullYear(), now.getMonth(), 1)

  const { getOrdersSummary, loading, fetchSoldOrders, orders } = useOrder()

  const [from, setFrom] = useState("2022-04-24")
  const [to, setTo] = useState(now)
  const [select, setSelect] = useState("All")

  const [orderSummary, setOrderSummary] = useState<IOrderSummary>()

  useEffect(() => {
    const getSummary = async () => {
      const res = await getOrdersSummary({
        startDate: from,
        endDate: to.toString(),
      })
      if (res) setOrderSummary(res)
    }

    getSummary()
  }, [from, to])

  useEffect(() => {
    fetchSoldOrders()
  }, [])

  const changeDate = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(select)
    if (e.target.value === "Today") {
      setFrom(today.toDate().toString())
      setTo(moment(today).endOf("day").toDate())
      setSelect("Today")
    } else if (e.target.value === "This Week") {
      setFrom(getMonday(today.toDate()).toString())
      setTo(moment(today).endOf("day").toDate())
      setSelect("This Week")
    } else if (e.target.value === "This Month") {
      setFrom(firstDay.toString())
      setTo(moment(today).endOf("day").toDate())
      setSelect("This Month")
    } else if (e.target.value === "All") {
      setFrom("2022-04-24")
      setTo(moment(today).endOf("day").toDate())
      setSelect("All")
    }
  }

  return (
    <div className="flex-[4] min-w-0 px-5 py-0">
      <h1 className="font-medium leading-[1.2] text-[calc(1.375rem_+_1.5vw)] mt-0 mb-2">
        Your Earnings
      </h1>

      <select
        onChange={(e) => {
          changeDate(e)
        }}
        className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal dark:bg-dark-ev1 bg-light-ev1 focus-within:outline-orange-color min-w-[220px] text-black-color dark:text-white-color"
      >
        <option value="Today">Today</option>
        <option value="This Week">This Week</option>
        <option value="This Month">This Month</option>
        <option value="All">All</option>
      </select>

      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <div className="flex lg:flex-row flex-col gap-8 p-2.5">
            <div className="flex-1 px-10 py-4 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
              <div className="flex">
                <div className="text-[13px] font-[bold] mr-10 mb-2.5">
                  Your Total Earnings
                </div>
                <span
                  className={`hover:after:text-[11px] hover:after:left-[-70px] after:bg-white after:dark:bg-dark-ev1 hover:after:w-[170px] hover:after:top-2.5 hover:after:content-[attr(data-content)]
                  relative lg:hover:after:w-[200px] hover:after:absolute lg:hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg lg:hover:after:left-[30px]`}
                  data-content="Your total earnings is the total (price) amount of your sold product inclusive expenses and net."
                >
                  <FaCircleQuestion className="text-black dark:text-white" />
                </span>
              </div>
              <div className="text-[40px] pb-2 text-right">
                {currency(region())}
                {(orderSummary ? orderSummary.soldOrders.numSales : 0).toFixed(
                  2
                )}
              </div>
            </div>
            <div className="flex-1 px-10 py-4 rounded-[0.2rem] bg-malon-color text-white">
              <div className="flex">
                <div className="text-[13px] font-[bold] mr-10 mb-2.5">
                  Expenses (7.9%)
                </div>
                <span
                  className={`hover:after:text-[11px] hover:after:left-[-70px] after:bg-white after:dark:bg-dark-ev1 hover:after:w-[170px] hover:after:top-2.5 hover:after:content-[attr(data-content)]
                  relative lg:hover:after:w-[200px] hover:after:absolute lg:hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg lg:hover:after:left-[30px]`}
                  data-content="Expenses is Repeddle commission charged against your total earnings that’s less when a sale is successfully completed and paid for."
                >
                  <FaCircleQuestion className="text-white" />
                </span>
              </div>
              <div className="text-[40px] pb-2 text-right">
                {currency(region())}
                {(
                  ((orderSummary ? orderSummary.soldOrders.numOrders : 0) *
                    7.9) /
                  100
                ).toFixed(2)}
              </div>
            </div>
            <div className="flex-1 px-10 py-4 rounded-[0.2rem] bg-orange-color text-white">
              <div className="flex">
                <div className="text-[13px] font-[bold] mr-10 mb-2.5">
                  Your Net Earnings
                </div>
                <span
                  className={`hover:after:text-[11px] hover:after:left-[-70px] after:bg-white after:dark:bg-dark-ev1 hover:after:w-[170px] hover:after:top-2.5 hover:after:content-[attr(data-content)]
                  relative lg:hover:after:w-[200px] hover:after:absolute lg:hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg lg:hover:after:left-[30px]`}
                  data-content="Net earnings is your actual withdrawable balance you receive into your Repeddle wallet. I.E. Total Earnings (- minus) Expenses (=) Net earnings."
                >
                  <FaCircleQuestion className="text-white" />
                </span>
              </div>
              <div className="text-[40px] pb-2 text-right">
                {currency(region())}
                {(
                  ((orderSummary ? orderSummary.soldOrders.numOrders : 0) *
                    92.1) /
                  100
                ).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="p-2.5">
            <Chart
              title="Earnings"
              total={`${currency(
                region()
              )} ${orderSummary?.soldOrders.numSales.toFixed(2)}`}
              data={
                orderSummary?.dailySoldOrders.map((x) => {
                  return { name: `${x._id}`, order: x.sales }
                }) ?? []
              }
              dataKey="order"
              grid
            />
          </div>
          <div className="p-2.5">
            <div className="text-[30px] font-bold">Sales Order History</div>
            <Table
              headers={headers}
              loading={loading}
              message={!orders.length ? "No product matches search" : undefined}
              itemName="sales"
              body={orders.map((order) => ({
                key: order._id,
                keys: {
                  ID: order._id,
                  Order: (
                    <Link
                      to={`/order/${order._id}`}
                      className="flex gap-2.5 items-center"
                    >
                      <img
                        className="w-8 h-8 object-cover rounded-[50%]"
                        src={order.items[0].product.images[0]}
                        alt={order.items[0].product.name}
                      />

                      {order.items[0].product.name}
                    </Link>
                  ),
                  "Delivery Status":
                    order.items[0].deliveryTracking.currentStatus.status,
                  payStatus: "Paid",
                  Date: moment(order.createdAt).format("MMM DD YY, h:mm a"),
                  Price: currency(region()) + " " + order.totalAmount,
                },
                action: (
                  <div className="flex gap-1 items-center">
                    <Link to={`/order/${order._id}`}>
                      <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
                        View
                      </button>
                    </Link>
                  </div>
                ),
              }))}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Earning
