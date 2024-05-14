import { useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import moment from "moment";
import { getMonday } from "../../utils/common";
import WidgetSmallProduct from "../../section/overview/WidgetSmallProduct";
import { productDetails } from "../../utils/data";
import WidgetLarge from "../../components/WidgetLarge";
import FeaturedInfoOverview from "../../section/overview/FeaturedInfoOverview";

const today = moment().startOf("day");

function Overview() {
  const now = new window.Date();
  const firstDay = new window.Date(now.getFullYear(), now.getMonth(), 1);

  const [from, setFrom] = useState("2022-04-24");
  const [to, setTo] = useState<string | Date>(now);

  const loading = false;
  // const orderData: unknown[] = []
  // const totalProducts = 5000
  // const totalPurchase = 5000
  // const totalOrders = 5000
  // const productData: unknown[] = []
  // const purchaseData: unknown[] = []
  // const totalSales = 5000
  // const currency = "N"
  const error = "";
  // const orders = { todayPurchases: [], todayProducts: [], todayOrders: [] }

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
                number={
                  0
                  // orders && orders.todayOrders.length
                  //   ? orders.todayOrders[0].sales
                  //   : 0
                }
              />
              <FeaturedInfoOverview
                type="order"
                number={
                  0
                  // orders && orders.todayOrders.length
                  //   ? orders.todayOrders[0].orders
                  //   : 0
                }
              />
              <FeaturedInfoOverview
                type="product"
                number={
                  0
                  // orders && orders.todayProducts.length
                  //   ? orders.todayProducts[0].numProducts
                  //   : 0
                }
              />
              <FeaturedInfoOverview
                type="purchase"
                number={
                  0
                  // orders && orders.todayPurchases.length
                  //   ? orders.todayPurchases[0].orders
                  //   : 0
                }
              />
            </div>
          </div>

          <div className="hidden items-center px-5 py-0 justify-end">
            <div
              className="font-medium cursor-pointer border border-malon-color px-2 py-px  hover:bg-malon-color hover:text-white-color"
              onClick={() => {
                setFrom(today.toDate().toString());
                setTo(moment(today).endOf("day").toDate());
              }}
            >
              Today
            </div>
            <div
              className="font-medium cursor-pointer border border-malon-color px-2 py-px  hover:bg-malon-color hover:text-white-color"
              onClick={() => {
                setFrom(getMonday(today.toDate()).toString());
                setTo(moment(today).endOf("day").toDate());
              }}
            >
              This Week
            </div>
            <div
              className="font-medium cursor-pointer border border-malon-color px-2 py-px  hover:bg-malon-color hover:text-white-color"
              onClick={() => {
                setFrom(firstDay.toString());
                setTo(moment(today).endOf("day").toDate());
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
            <div className="flex-1 flex flex-col gap-5">
              {/* <Chart
                title="Earning"
                total={`${currency} ${totalSales.toFixed(2)}`}
                data={orderData}
                dataKey="earning"
                grid
              />
              <Chart
                title="Sold Orders"
                total={totalOrders}
                data={orderData}
                dataKey="order"
                grid
              /> */}
            </div>
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
  );
}

export default Overview;
