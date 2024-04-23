import { Order } from "../../types/order"

type Props = {
  order: Order
  isSeller: boolean
  shippingPrice: number
  itemsPrice: number
}

const PaymentDelivery = ({
  order,
  isSeller,
  itemsPrice,
  shippingPrice,
}: Props) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 m-[5px] h-full">
        <div className="font-bold uppercase px-0 py-[15px]">Payment</div>
        <div
          className={`h-full mb-[15px] lg:px-5 lg:py-[15px] rounded-[5px] print:text-black-color
      print:mb-[5px] print:p-[5px] print:bg-white px-[15px] py-2.5 bg-light-ev2 dark:bg-dark-ev2`}
        >
          <div className="capitalize font-semibold mb-2.5">Payment Status</div>
          <div className="flex">
            {order.isPaid ? (
              <div className="text-orange-color">Paid</div>
            ) : (
              <div className="text-malon-color">Not Paid</div>
            )}
          </div>
          <hr />
          <div className="capitalize font-semibold mb-2.5">Payment Method</div>
          <div className="flex">{order.paymentMethod}</div>
          <hr />
          <div className="flex justify-between flex-col lg:flex-row">
            <div className="w-full">
              <div className="capitalize font-semibold mb-2.5">
                Payment Details
              </div>
              <div className="flex capitalize">
                <div className="flex-1">Item Total:</div>
                <div className="flex-1 lg:flex-[5]">
                  {/* TODO:
                  {currency} */}
                  N{isSeller ? itemsPrice : order.itemsPrice}
                </div>
              </div>
              <div className="flex capitalize">
                <div className="flex-1">Shipping Fee:</div>
                <div className="flex-1 lg:flex-[5]">
                  {/* TODO:
                  {currency} */}
                  N{isSeller ? shippingPrice : order.shippingPrice}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  textTransform: "capitalize",
                }}
              >
                <div className="flex-1">Total:</div>
                <div className="flex-1 lg:flex-[5]">
                  <div className="font-bold">
                    N
                    {/* TODO:
                    {currency} */}
                    {isSeller ? itemsPrice + shippingPrice : order.totalPrice}
                  </div>
                </div>
              </div>
            </div>
            {isSeller && (
              <>
                <hr />
                <div className="w-full mt-5 lg:w-1/2 lg:mt-0">
                  <div className="flex">
                    <div className="flex-[2]">Total cost:</div>
                    <div className="flex-[3]">
                      {" "}
                      N
                      {/* TODO: 
                      {currency} */}
                      {itemsPrice + shippingPrice}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-[2]">Repeddle Commision (7.9%):</div>
                    <div className="flex-[3]">
                      {" "}
                      N
                      {/* TODO:
                      {currency} */}
                      {((7.9 / 100) * (itemsPrice + shippingPrice)).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-[2]">You will Receive:</div>
                    <div className="flex-[3]">
                      {" "}
                      N
                      {/* TODO:
                      {currency} */}
                      {(
                        itemsPrice +
                        shippingPrice -
                        (7.9 / 100) * (itemsPrice + shippingPrice)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentDelivery
