import { useMemo, useState } from "react";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import { couponDiscount, currency } from "../../utils/common";
import PayStack from "../../components/gateway/PayStack";
import FlutterWave from "../../components/gateway/FlutterWave";
import Modal from "../../components/ui/Modal";
import PayFund from "../../components/gateway/PayFund";
import { FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Coupon } from "../../types/product";
import { PayStackCallback } from "../../types/gateway";
import useOrder from "../../hooks/useOrder";
import useToastNotification from "../../hooks/useToastNotification";
import { imageUrl } from "../../services/api";
import useRegion from "../../hooks/useRegion";

const PlaceOrder = () => {
  const { cart, subtotal, total, paymentMethod, clearCart } = useCart();
  const { createOrder, error } = useOrder();
  const { user } = useAuth();
  const { addNotification } = useToastNotification();
  const { region } = useRegion();

  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [showModel, setShowModel] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  const handleCoupon = async () => {
    console.log(code);
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const discount = useMemo(
    () => (coupon ? couponDiscount(coupon, total) : 0),
    [coupon]
  );

  const placeOrderHandler = async (paymentMet: string, transId?: string) => {
    setLoadingPay(true);
    const res = await createOrder({
      items: cart,
      paymentMethod: paymentMet,
      totalAmount: total,
      transactionId: transId,
    });

    if (res) {
      addNotification(res.message);
      setLoadingPay(false);
      clearCart();
      navigate(`/order/${res.order._id}`);
      return res.order;
    } else {
      addNotification(error);
    }
  };

  const WalletSuccess = async (
    response: PayStackCallback,
    paymentMethod: string
  ) => {
    console.log(response);
    await placeOrderHandler(paymentMethod, response.transaction_id);
  };

  const onApprove = async (
    response: {
      transaction_id: string;
      type: string;
    },
    paymentMethod: string
  ) => {
    console.log(response);
    await placeOrderHandler(paymentMethod, response.transaction_id);
  };

  return (
    <div className="mx-0 my-2.5 pt-5 pb-0 px-[5px] lg:m-5 lg:pt-5 lg:pb-0 lg:px-[3vw] bg-light-ev1 dark:bg-dark-ev1">
      <Helmet>
        <title>Order Preview</title>
      </Helmet>
      <h1 className="my-3">Order Preview</h1>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="flex-[8]">
          <div className="mx-0 my-5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
            <div className="p-5">
              <div className="text-xl mb-3">Items</div>
              <div className="flex flex-col mb-0 pl-0">
                {cart.map((item) => (
                  <div
                    className="relative block px-5 py-3 border-0 border-[1px_solid_rgba(0,0,0,0.125)] last:rounded-br-[inherit] last:rounded-bl-[inherit] last:border-b-0 first:rounded-t-[inherit]"
                    key={item._id}
                  >
                    <div className="flex flex-wrap mr-[-15px] ml-[-15px]">
                      <div className="flex-[0_0_58.333333%] max-w-[58.333333%] flex items-center mb-2.5 relative w-full px-[15px]">
                        <img
                          src={imageUrl + item.images[0]}
                          alt={item.name}
                          className="rounded bg-white border max-w-full h-auto max-h-[100px] p-1 border-solid border-[#dee2e6]"
                        />
                        <div className="ml-5">
                          <div>
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            {currency(item.region)}
                            {item.sellingPrice}
                          </div>
                          <div>Size: {item.selectedSize}</div>
                        </div>
                      </div>
                      <div className="relative w-full flex-[0_0_16.666667%] max-w-[16.666667%] px-[15px]">
                        <span>x {item.quantity}</span>
                      </div>
                      <div className="relative w-full flex-[0_0_25%] max-w-[25%] px-[15px]">
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
                            {key === "fee" ? (
                              <div className="flex-[5]">
                                {currency(item.region)}
                                {value}
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
                className="text-[13px] font-semibold text-orange-color hover:text-malon-color"
                to="/cart"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="mx-0 my-5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
            <div className="p-5">
              <div className="text-xl mb-3">Payment</div>
              <div className="mb-4">
                <div className="ml-5 flex">
                  <div className="flex-1">Method</div>
                  <div className="flex[5]">{paymentMethod}</div>
                </div>
              </div>
              <Link
                className="text-[13px] font-semibold text-orange-color hover:text-malon-color"
                to="/payment"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-[4]">
          <div className="mx-0 my-5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
            <div className="p-5">
              <div className="text-xl mb-3">Order Summary</div>
              <div className="flex flex-col mb-0 pl-0">
                <div className="relative block px-5 py-3 border-0 border-[1px_solid_rgba(0,0,0,0.125)] last:rounded-br-[inherit] last:rounded-bl-[inherit] last:border-b-0 first:rounded-t-[inherit]">
                  <div className="flex flex-wrap mr-[-15px] ml-[-15px]">
                    <div className="col-3">Items</div>
                    <div className="col-9">
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
                              {` =  ${currency(c.region)}` +
                                c.quantity * c.sellingPrice}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative block px-5 py-3 border-0 border-[1px_solid_rgba(0,0,0,0.125)] last:rounded-br-[inherit] last:rounded-bl-[inherit] last:border-b-0 first:rounded-t-[inherit]">
                  <div className="flex flex-wrap mr-[-15px] ml-[-15px]">
                    <div className="basis-0 grow max-w-full">Subtotal</div>
                    <div className="basis-0 grow max-w-full">
                      {currency(cart[0].region)}
                      {subtotal.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="relative block px-5 py-3 border-0 border-[1px_solid_rgba(0,0,0,0.125)] last:rounded-br-[inherit] last:rounded-bl-[inherit] last:border-b-0 first:rounded-t-[inherit]">
                  <div className="flex flex-wrap mr-[-15px] ml-[-15px]">
                    <div className="basis-0 grow max-w-full">Shipping</div>
                    <div className="basis-0 grow max-w-full">
                      {currency(cart[0].region)} 0{/* TODO:  */}
                      {/* {cart.shippingPrice.toFixed(2)} */}
                    </div>
                  </div>
                </div>

                <div className="relative block px-5 py-3 border-0 border-[1px_solid_rgba(0,0,0,0.125)] last:rounded-br-[inherit] last:rounded-bl-[inherit] last:border-b-0 first:rounded-t-[inherit]">
                  <div className="flex flex-wrap mr-[-15px] ml-[-15px]">
                    <div className="basis-0 grow max-w-full">Tax</div>
                    <div className="basis-0 grow max-w-full">
                      {currency(cart[0].region)} 0{/* TODO:  */}
                      {/* {cart.taxPrice.toFixed(2)} */}
                    </div>
                  </div>
                </div>
                <div className="relative block px-5 py-3 border-0 border-[1px_solid_rgba(0,0,0,0.125)] last:rounded-br-[inherit] last:rounded-bl-[inherit] last:border-b-0 first:rounded-t-[inherit]">
                  <div className="flex flex-wrap mr-[-15px] ml-[-15px]">
                    <div className="basis-0 grow max-w-full">
                      Discount ({coupon ? code : ""})
                      {coupon && (
                        <div onClick={removeCoupon}>
                          <FaTimes className="ml-2.5 text-red-color" />
                        </div>
                      )}
                    </div>
                    <div className="basis-0 grow max-w-full">
                      - {currency(cart[0].region)}
                      {discount}
                    </div>
                  </div>
                </div>
                <div className="relative block px-5 py-3 border-0 border-[1px_solid_rgba(0,0,0,0.125)] last:rounded-br-[inherit] last:rounded-bl-[inherit] last:border-b-0 first:rounded-t-[inherit]">
                  <div className="flex flex-wrap mr-[-15px] ml-[-15px]">
                    <div className="basis-0 grow max-w-full">
                      <b>Order Total</b>
                    </div>
                    <div className="basis-0 grow max-w-full">
                      <b>
                        {currency(cart[0].region)}
                        {(total - discount).toFixed(2)}
                      </b>
                    </div>
                  </div>
                </div>
                <div className="relative block px-5 py-3 border-0 border-[1px_solid_rgba(0,0,0,0.125)] last:rounded-br-[inherit] last:rounded-bl-[inherit] last:border-b-0 first:rounded-t-[inherit]">
                  <div className="h-10 flex rounded-[0.2rem] border border-malon-color">
                    <input
                      className="flex-[4] p-[5px] rounded-tl-[0.2rem] rounded-bl-[0.2rem] border-0 bg-transparent text-black dark:text-white"
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter Coupon Code"
                    />
                    <button
                      className="flex-1 text-malon-color border border-malon-color rounded-tr rounded-br"
                      onClick={handleCoupon}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div className="relative block px-5 py-3 border-0 border-[1px_solid_rgba(0,0,0,0.125)] last:rounded-br-[inherit] last:rounded-bl-[inherit] last:border-b-0 first:rounded-t-[inherit]">
                  {loadingPay ? (
                    <LoadingBox />
                  ) : paymentMethod === "Wallet" ? (
                    <div
                      className="cursor-pointer text-white w-full uppercase flex items-center justify-center h-10 rounded-[0.2rem] bg-orange-color"
                      onClick={async () =>
                        await placeOrderHandler(paymentMethod)
                      }
                    >
                      Place Order
                    </div>
                  ) : region === "ZA" ? (
                    // <PayFast
                    //   user={user}
                    //   placeOrderHandler={placeOrderHandler}
                    //   totalPrice={cart.totalPrice}
                    // />
                    <PayStack
                      amount={total}
                      onApprove={(res) => onApprove(res, "Paystack")}
                      isLoading={loadingPay}
                      setIsLoading={setLoadingPay}
                    />
                  ) : (
                    <PayStack
                      amount={total}
                      onApprove={(res) => onApprove(res, "Paystack")}
                    />
                    // <FlutterWave
                    //   amount={total}
                    //   currency={cart[0].region ? "NGN" : "ZAR"}
                    //   user={user ?? undefined}
                    //   onApprove={(res) => onApprove(res, "Flutterwave")}
                    // />
                  )}
                </div>

                <Modal isOpen={showModel} onClose={() => setShowModel(false)}>
                  <PayFund
                    onApprove={(res) => WalletSuccess(res, "Payfund")}
                    setShowModel={setShowModel}
                    amount={total}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
