import { useEffect, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import MessageBox from "../../components/MessageBox"
import moment from "moment"
import { getMonday } from "../../utils/common"
import WidgetSmallProduct from "../../section/overview/WidgetSmallProduct"
import { productDetails } from "../../utils/data"
import WidgetLarge from "../../components/WidgetLarge"
import FeaturedInfoOverview from "../../section/overview/FeaturedInfoOverview"
import useOrder from "../../hooks/useOrder"
import { IOrderSummary } from "../../types/order"

const today = moment().startOf("day")

function Overview() {
  const { getOrdersSummary, error, loading } = useOrder()

  const now = new window.Date()
  const firstDay = new window.Date(now.getFullYear(), now.getMonth(), 1)

  const [from, setFrom] = useState("2022-04-24")
  const [to, setTo] = useState<string | Date>(now)
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

  return (
    <div className="flex-[4]">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox className="text-[red]">{error}</MessageBox>
      ) : (
        <>
          <div className="p-5 my-0 mx-5 dark:bg-dark-ev1 bg-light-ev1">
            <h3>Today</h3>
            <div className="flex gap-5 flex-wrap lg:flex-nowrap">
              <FeaturedInfoOverview
                type="earning"
                number={orderSummary ? orderSummary.soldOrders.numSales : 0}
              />
              <FeaturedInfoOverview
                type="order"
                number={orderSummary ? orderSummary.soldOrders.numOrders : 0}
              />
              <FeaturedInfoOverview
                type="product"
                number={
                  orderSummary ? orderSummary.purchaseOrders.numOrders : 0
                }
              />
              <FeaturedInfoOverview
                type="purchase"
                number={orderSummary ? orderSummary.purchaseOrders.numSales : 0}
              />
            </div>
          </div>

          <div className="hidden items-center px-5 py-0 justify-end">
            <div
              className="font-medium cursor-pointer border border-malon-color px-2 py-px  hover:bg-malon-color hover:text-white-color"
              onClick={() => {
                setFrom(today.toDate().toString())
                setTo(moment(today).endOf("day").toDate())
              }}
            >
              Today
            </div>
            <div
              className="font-medium cursor-pointer border border-malon-color px-2 py-px  hover:bg-malon-color hover:text-white-color"
              onClick={() => {
                setFrom(getMonday(today.toDate()).toString())
                setTo(moment(today).endOf("day").toDate())
              }}
            >
              This Week
            </div>
            <div
              className="font-medium cursor-pointer border border-malon-color px-2 py-px  hover:bg-malon-color hover:text-white-color"
              onClick={() => {
                setFrom(firstDay.toString())
                setTo(moment(today).endOf("day").toDate())
              }}
            >
              This Month
            </div>
            <Date>
              From:
              <input
                className="w-[100px] pl-[5px] pr-0 py-[5px] rounded-[0.2rem] border-0 text-black-color dark:text-white-color focus-visible:outline-none"
                id="fromdate"
                onChange={(e) => setFrom(e.target.value)}
                type="date"
                value={moment(from).format("YYYY-MM-DD").toString()}
              />
            </Date>
            <Date>
              To:{" "}
              <input
                className="w-[100px] pl-[5px] pr-0 py-[5px] rounded-[0.2rem] border-0 text-black-color dark:text-white-color focus-visible:outline-none"
                onChange={(e) => setTo(e.target.value)}
                type="date"
                value={moment(to).format("YYYY-MM-DD").toString()}
              />
            </Date>
          </div>
          <div className="flex flex-1 gap-5 m-5 flex-col lg:flex-row">
            {/* <div className="flex-1 flex flex-col gap-5">
              <Chart
                title="Earning"
                total={`${currency(
                  region()
                )} ${orderSummary?.soldOrders.numSales.toFixed(2)}`}
                data={orderSummary?.dailySoldOrders ?? []}
                dataKey="earning"
                grid
              />
              <Chart
                title="Sold Orders"
                total={orderSummary?.soldOrders.numSales}
                data={orderSummary?.dailySoldOrders ?? []}
                dataKey="order"
                grid
              />
            </div> */}
            <div className="flex-1 flex flex-col gap-5">
              {/* <Chart
                title="Product"
                total={totalProducts}
                data={productData}
                dataKey="products"
                grid
              />
              <Chart
                title="Purchase Order"
                data={purchaseData}
                dataKey="order"
                total={totalPurchase}
                grid
              /> */}
            </div>
          </div>
          <div className="m-5 flex gap-2.5 items-start flex-col lg:flex-row lg:items-stretch lg:gap-0">
            <WidgetSmallProduct products={[productDetails]} />

            <WidgetLarge />
          </div>
        </>
      )}
    </div>
  )
}

export default Overview
