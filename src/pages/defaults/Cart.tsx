/* eslint-disable @typescript-eslint/ban-ts-comment */
// TODO: remove the above
import { useRef, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import { Helmet } from "react-helmet-async"
import useCart from "../../hooks/useCart"
import MessageBox from "../../components/MessageBox"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Button from "../../components/ui/Button"
import { IProduct } from "../../types/product"
import CartItems from "../../section/cart/CartItems"
import { CartItem } from "../../context/CartContext"
import AlertComponent from "../../section/cart/AlertComponent"
import Modal from "../../components/ui/Modal"
import { checkDeliverySelect, currency, region } from "../../utils/common"
import DeliveryOptionScreen from "../../components/DeliveryOptionScreen"
import useToastNotification from "../../hooks/useToastNotification"

function Cart() {
  const { cart, addToCart, removeFromCart, subtotal, total } = useCart()
  const { user } = useAuth()
  const { addNotification } = useToastNotification()

  const navigate = useNavigate()

  const loading = false

  const [showModel, setShowModel] = useState(false)
  const [currentItem, setCurrentItem] = useState<CartItem | null>(null)
  const [remove, setRemove] = useState(false)

  const scrollref = useRef(null)

  const saveItem = (prod: IProduct) => {
    console.log(prod)
  }

  const checkoutHandler = () => {
    if (!user) {
      addNotification("Login to continue")
      navigate("/signin?redirect=cart")
      return
    }

    if (!checkDeliverySelect(cart)) {
      addNotification("Select delivery method")
      return
    }

    if (cart.length === 0) {
      addNotification("Cart is empty")
    } else {
      if (user.isVerifiedEmail) {
        navigate("/payment")
      } else {
        navigate("/verifyemail")
      }
    }

    navigate("/payment")
  }

  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <div className="m-[5px] lg:m-5">
        <h1 className="text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] font-medium leading-tight mt-0 mb-2">
          Shopping Cart
        </h1>

        <div className="flex lg:gap-5 lg:flex-row flex-col gap-[5px]">
          <div className="flex-[3]">
            <div className="text-[grey] text-center w-full">
              Placing an item in your shopping cart does not reserve that item
              or price. We only reserve the stock for your order once payment is
              received.
            </div>
            <div className="mt-0 mb-5 mx-0">
              {cart.length === 0 ? (
                <MessageBox>
                  <div>
                    Cart is empty.{" "}
                    <Link
                      className="font-bold text-[15px] text-orange-color hover:text-malon-color"
                      to={`/`}
                    >
                      Go Shopping
                    </Link>
                  </div>
                </MessageBox>
              ) : (
                <>
                  {cart.map((item) => (
                    <CartItems
                      key={item._id}
                      item={item}
                      setCurrentItem={setCurrentItem}
                      setRemove={setRemove}
                      setShowModel={setShowModel}
                    />
                  ))}
                  <MessageBox>
                    <div>
                      <Link
                        className="font-bold text-[15px] text-orange-color hover:text-malon-color"
                        to={`/search`}
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </MessageBox>
                </>
              )}
              <Modal isOpen={remove} onClose={() => setRemove(false)}>
                <AlertComponent
                  message="Are you sure you want to remove item from cart?"
                  onConfirm={() => {
                    currentItem && removeFromCart(currentItem?._id)
                    setRemove(false)
                  }}
                  onWishlist={() => currentItem && saveItem(currentItem)}
                />
              </Modal>

              {currentItem && (
                <Modal
                  isOpen={showModel}
                  onClose={() => setShowModel(false)}
                  size="lg"
                >
                  <DeliveryOptionScreen
                    setShowModel={setShowModel}
                    item={currentItem}
                  />
                </Modal>
              )}
            </div>
            {user && (
              <div
                className="mt-0 mb-5 mx-0 p-2.5 bg-light-ev1 dark:bg-dark-ev1 lg:p-5 rounded-[0.2rem]"
                ref={scrollref}
              >
                <h1 className="text-[28px] leading-tight mb-2.5">Wishlist</h1>
                {user.wishlist && user.wishlist.length === 0 ? (
                  <MessageBox>No save item</MessageBox>
                ) : (
                  user.wishlist &&
                  user.wishlist.map((product, index) => {
                    const existItem = cart.find((x) => x._id === product._id)
                    return (
                      !existItem && (
                        <div
                          className="lg:mt-0 lg:mb-5 lg:mx-2.5 p-5 rounded-[0.2rem] mx-0 my-2.5 bg-light-ev1 dark:bg-dark-ev1"
                          key={index}
                        >
                          <div className="flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex flex-[7] items-center col-7">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="max-w-full bg-white border rounded h-[100px] p-1 border-[#dee2e6]"
                              />
                              <div className="flex flex-col capitalize ml-5">
                                <Link to={`/product/${product.slug}`}>
                                  {product.name}
                                </Link>
                                <div>
                                  {currency(product.region)} {product.costPrice}
                                </div>
                              </div>
                            </div>
                            <div className="flex-[4] col-4">
                              <button
                                onClick={() =>
                                  addToCart({
                                    ...product,
                                    quantity: 1,
                                  })
                                }
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  })
                )}
              </div>
            )}
          </div>
          <div className="flex-1 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
            <div className="p-4 flex-1">
              <div className="flex flex-col mb-0 pl-0">
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-[3] col-3">Items</div>
                    <div className="flex-[9] col-9">
                      {cart.map((c) => (
                        <>
                          <div className="flex">
                            <div className="flex flex-[5]">
                              <div className="flex-1">{c.quantity} </div>
                              <div className="flex-1">x </div>
                              <div className="flex-[2]">
                                {currency(c.region)} {c.sellingPrice}
                              </div>
                            </div>
                            <div className="flex-[3]">
                              {/* TODO: */}
                              {/* {` =  ${currency}` + c.quantity * c.actualPrice} */}
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
                    <div className="flex-1">SubTotal</div>
                    <div className="flex-1">
                      {currency(region())} {subtotal}
                    </div>
                  </div>
                </div>
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">Shipping</div>
                    <div className="flex-1">
                      {currency(region())}
                      {/* TODO: */}
                      {/* {currentCart.shippingPrice.toFixed(2)} */} 0.00
                    </div>
                  </div>
                </div>
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)] border-b">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <b>Total</b>
                    </div>
                    <div className="flex-1">
                      <b>
                        {currency(region())}N {total}.00
                      </b>
                    </div>
                  </div>
                </div>
                <div className="block relative mb-2.5 px-4 py-2 border-[rgba(99,91,91,0.2)]">
                  <div className="mt-[30px] grid">
                    <Button
                      type="button"
                      text="Proceed to Checkout"
                      onClick={checkoutHandler}
                      className="!px-[30px] !py-2.5"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full">{/* summary  */}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
