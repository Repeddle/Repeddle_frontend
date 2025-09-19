import { Helmet } from "react-helmet-async"
import useCart from "../../hooks/useCart"
import { Link } from "react-router-dom"
import LoadingBox from "../../components/LoadingBox"
import { FaTimes } from "react-icons/fa"
import { useMemo, useState } from "react"
import WalletModel from "../../components/WalletModel"
import { currency } from "../../utils/common"
import PayStack from "../../components/gateway/PayStack"
import { PayStackCallback } from "../../types/gateway"
import FlutterWave from "../../components/gateway/FlutterWave"
import PayFund from "../../components/gateway/PayFund"
import { imageUrl } from "../../services/api"
import useRegion from "../../hooks/useRegion"
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types"
import useWallet from "../../hooks/useWallet"
import useToastNotification from "../../hooks/useToastNotification"

const OrderPreview = () => {
  const [code, setCode] = useState("")
  const [coupon, setCoupon] = useState({ code: "" })
  const [showModel, setShowModel] = useState(false)
  const [loadingPay, setLoadingPay] = useState(false)
  const { region } = useRegion()

  const { fundWalletFlutter } = useWallet()
  const { addNotification } = useToastNotification()

  const { cart, total, subtotal, paymentMethod } = useCart()

  const removeCoupon = () => {
    setCoupon({ code: "" })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const couponDiscount = (coupon: any, total: number) => {
    console.log(coupon, total)
    return 0
  }

  const discount = useMemo(
    () => (coupon ? couponDiscount(coupon, total) : 0),
    [coupon, total]
  )

  const handleCoupon = () => {}

  const WalletSuccess = () => {}

  const onApprove = async (
    val: (FlutterWaveResponse & { type: string }) | PayStackCallback
  ) => {
    const { error, result } = await fundWalletFlutter({
      amount: total,
      paymentProvider: "Flutterwave",
      transactionId: val.transaction_id.toString(),
    })

    setLoadingPay(false)
    if (!error) {
      addNotification(result)
      setShowModel(false)
    } else {
      addNotification(result, undefined, true)
    }
  }

  return (
    <div className="mx-0 my-2.5 pt-5 pb-0 px-[5px] lg:mx-0 lg:my-2.5 lg:pt-5 lg:pb-0 lg:px-[5px] bg-light-ev1 dark:bg-dark-ev1">
      <Helmet>
        <title>Order Preview</title>
      </Helmet>
      <h1 className="my-4">Order Review</h1>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="flex-[8]">
          <div className="my-5 mx-0 bg-light-ev2 dark:bg-dark-ev2">
            <div className="p-4 flex-1">
              <div className="text-xl font-medium leading-[1.2]">Items</div>
              <div className="flex flex-col mb-0 pl-0">
                {cart.map((item) => (
                  <div
                    className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b"
                    key={item._id}
                  >
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="mb-2.5 flex items-center flex-[7]">
                        <img
                          src={imageUrl + item.images[0]}
                          alt={item.name}
                          className="max-w-full bg-white border rounded h-[100px] p-1 border-[#dee2e6]"
                        />
                        <div className="ml-5">
                          <div>
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            {currency(item.region)} {item.sellingPrice}
                          </div>
                          <div>Size: {item.selectedSize}</div>
                        </div>
                      </div>
                      <div className="flex-[2]">
                        <span>x {item.quantity}</span>
                      </div>
                      <div className="flex-[3]">
                        {currency(item.region)}
                        {item.sellingPrice * item.quantity}
                      </div>
                    </div>
                    {item.deliverySelect &&
                      Object.entries(item.deliverySelect).map(([key, value]) =>
                        key === "total" ? (
                          ""
                        ) : (
                          <div className="flex capitalize text-[13px]">
                            <div className="flex-[3] lg:flex-1">{key}:</div>
                            {key === "cost" ? (
                              <div className="flex-[5]">
                                {currency(item.region)} {value}
                              </div>
                            ) : (
                              <div className="flex-[5]">{value}</div>
                            )}
                          </div>
                        )
                      )}
                  </div>
                ))}
              </div>
              <Link
                className="font-semibold text-[13px] text-orange-color hover:text-malon-color"
                to="/cart"
              >
                Edit
              </Link>
            </div>
          </div>

          <div className="my-5 mx-0 bg-light-ev2 dark:bg-dark-ev2">
            <div className="p-4 flex-1">
              <div className="text-xl font-medium leading-[1.2]">Payment</div>
              <p>
                <div className="ml-2.5 flex">
                  <div className="flex-[2] lg:flex-1">Method</div>
                  <div className="flex-[5]">{paymentMethod}</div>
                </div>
              </p>
              <Link
                className="font-semibold text-[13px] text-orange-color hover:text-malon-color"
                to="/payment"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-[4]">
          <div className="my-5 mx-0 bg-light-ev2 dark:bg-dark-ev2">
            <div className="p-4 flex-1">
              <div className="text-xl font-medium leading-[1.2]">
                Order Summary
              </div>
              <div className="flex flex-col mb-0 pl-0">
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-[3]">Items</div>
                    <div className="flex-[9]">
                      {cart.map((c) => (
                        <>
                          <div className="flex">
                            <div className="flex flex-[5]">
                              <div className="flex-1">{c.quantity} </div>
                              <div className="flex-1">x </div>
                              <div className="flex-[2]">
                                {currency(c.region)}
                                {c.sellingPrice}
                              </div>
                            </div>
                            <div className="flex-[3]">
                              {` =  ${currency(c.region)} ` +
                                c.quantity * c.sellingPrice}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">Subtotal</div>
                    <div className="flex-1">
                      {currency(region)} {subtotal.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">Shipping</div>
                    <div className="flex-1">{currency(region)} N 0.00</div>
                  </div>
                </div>

                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">Tax</div>
                    <div className="flex-1">{currency(region)} N 0.00</div>
                  </div>
                </div>
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      Discount ({coupon ? coupon.code : ""})
                      {coupon && (
                        <span onClick={removeCoupon}>
                          <FaTimes className="ml-2.5 text-malon-color" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      - {currency(region)}
                      {discount}
                    </div>
                  </div>
                </div>
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <b>Order Total</b>
                    </div>
                    <div className="flex-1">
                      <b>
                        {currency(region)} {(total - discount).toFixed(2)}
                      </b>
                    </div>
                  </div>
                </div>
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="border border-malon-color h-10 flex rounded-[0.2rem]">
                    <input
                      className="flex-[4] p-[5px] rounded-tl-[0.2rem] rounded-bl-[0.2rem] border-0 bg-light-ev1 dark:bg-dark-ev1 text-black dark:text-white"
                      onChange={(e) => setCode(e.target.value)}
                      value={code}
                      placeholder="Enter Coupon Code"
                    />
                    <button
                      className="flex-1 text-malon-color border border-malon-color rounded-tr-[0.2rem] rounded-br-[0.2rem]"
                      onClick={handleCoupon}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  {loadingPay ? (
                    <LoadingBox />
                  ) : // eslint-disable-next-line no-constant-condition
                  true ? (
                    // TODO:
                    // ) : cart.paymentMethod === "Wallet" ? (
                    <div
                      className="cursor-pointer text-white-color bg-orange-color w-full uppercase flex items-center justify-center h-10 rounded-[0.2rem]"
                      onClick={() => setShowModel(true)}
                    >
                      Proceed to Payment
                    </div>
                  ) : region === "ZA" ? (
                    // Did not write this
                    // <PayFast
                    //   user={user}
                    //   placeOrderHandler={placeOrderHandler}
                    //   totalPrice={cart.totalPrice}
                    // />
                    <PayStack
                      amount={total}
                      onApprove={onApprove}
                      isLoading={loadingPay}
                      setIsLoading={setLoadingPay}
                    />
                  ) : (
                    <FlutterWave
                      amount={total}
                      currency={region === "NG" ? "NGN" : "ZAR"}
                      onApprove={onApprove}
                    />
                  )}
                </div>

                <WalletModel showModel={showModel} setShowModel={setShowModel}>
                  <PayFund
                    onApprove={WalletSuccess}
                    setShowModel={setShowModel}
                    amount={total}
                  />
                </WalletModel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPreview
