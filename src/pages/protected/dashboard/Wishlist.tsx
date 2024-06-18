import { useState } from "react"
import useAuth from "../../../hooks/useAuth"
import Table from "../../../components/table/Table"
import { currency, region } from "../../../utils/common"
import useCart from "../../../hooks/useCart"
import useProducts from "../../../hooks/useProducts"
import { IProduct } from "../../../types/product"
import useToastNotification from "../../../hooks/useToastNotification"
import { useNavigate } from "react-router-dom"
import Modal from "../../../components/ui/Modal"
import SizeChart from "../../../section/product/SizeChart"

const headers = [
  { title: "ID", hide: true },
  { title: "Product" },
  { title: "Stock" },
  { title: "Price" },
]

const Wishlist = () => {
  const { removeFromWishlist, user, error } = useAuth()
  const { addToCart, cart } = useCart()
  const { fetchProductBySlug } = useProducts()
  const { addNotification } = useToastNotification()

  const navigate = useNavigate()

  const [removeItem, setRemoveItem] = useState<IProduct>()
  const [addToCartItem, setAddToCartItem] = useState<IProduct>()
  const [removeFromWish, setRemoveFromWish] = useState(false)
  const [showRemove, setShowRemove] = useState(false)
  const [showSize, setShowSize] = useState(false)
  const [selectSize, setSelectSize] = useState<string>()
  const [size, setSize] = useState("")

  const openRemove = (item: IProduct) => {
    setRemoveItem(item)
    setShowRemove(true)
  }

  const closeRemove = () => {
    setShowRemove(false)
    setRemoveItem(undefined)
  }

  const closeShowSize = () => {
    setShowSize(false)
    setAddToCartItem(undefined)
  }

  const submitSize = async () => {
    if (!addToCartItem) return

    if (!selectSize) {
      addNotification("Select Size")
      return
    }

    addToCartHandler(addToCartItem)
  }

  const addToCartHandler = async (product: IProduct) => {
    const existItem = cart.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (user && product.seller._id === user._id) {
      addNotification("You can't buy your product")
      return
    }

    if (!selectSize && product.sizes.length > 0) {
      addNotification("Select Size")
      setAddToCartItem(product)
      setShowSize(true)
      return
    }

    const data = await fetchProductBySlug(product.slug)

    if (!data?.countInStock || data?.countInStock < quantity) {
      addNotification("Sorry. Product is out of stock")
      return
    }

    addToCart({
      ...product,
      quantity,
      selectedSize: selectSize,
      // selectedColor?: string;
    })

    addNotification("Item added to Cart", "View Cart", false, () =>
      navigate("/cart")
    )
  }

  const removeWishlistItem = async () => {
    if (!removeItem) return closeRemove()

    setRemoveFromWish(true)

    const res = await removeFromWishlist(removeItem._id)
    if (res) addNotification(res)
    else addNotification(error ?? "Failed to add to wishlist", undefined, true)

    setRemoveFromWish(false)
  }

  const sizeHandler = (item: string) => {
    if (!addToCartItem) return

    const current = addToCartItem?.sizes.filter((s) => s.size === item) ?? []

    if (current.length > 0) {
      setSize(`${item} ( ${current[0].quantity} left)`)
      setSelectSize(item)
    } else {
      setSize("Out of stock")
      setSelectSize(undefined)
    }
  }

  return (
    <div className="flex-[4] flex flex-col overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        Wishlist
      </h1>

      <Table
        headers={headers}
        itemName="transaction"
        loading={removeFromWish}
        body={(user?.wishlist ?? []).map((wish) => ({
          keys: {
            ID: wish._id,
            Product: wish.name,
            Stock: wish.countInStock,
            Price: currency(region()) + " " + wish.sellingPrice,
          },
          action: (
            <div className="flex gap-2.5 items-center">
              <button
                onClick={() => addToCartHandler(wish)}
                className="text-white bg-orange-color cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none"
              >
                Add To Cart
              </button>
              <button
                onClick={() => openRemove(wish)}
                className="text-white bg-orange-color cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none"
              >
                Remove
              </button>
            </div>
          ),
        }))}
      />

      <Modal isOpen={showRemove} onClose={() => setShowRemove(false)}>
        <div className="p-2 items-center">
          <p className="text-lg mb-[15px] text-center mt-[25px]">
            Are you sure you want to remove this item
          </p>
          <div className="flex w-full gap-2.5 justify-end">
            <button
              className="flex items-center text-white-color bg-malon-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
              onClick={closeRemove}
              disabled={removeFromWish}
            >
              <span className="text-malon-color text-lg">No</span>
            </button>
            <button
              onClick={removeWishlistItem}
              disabled={removeFromWish}
              className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showSize} onClose={() => setShowSize(false)}>
        <div className="p-2 items-center">
          <div className="capitalize mx-0 my-2.5">select size: {size} </div>
          <div className="flex">
            {addToCartItem?.sizes.map(
              (size) =>
                size.quantity > 0 && (
                  <span key={size.size}>
                    <label
                      className={`w-[35px] text-sm h-[35px] flex justify-center items-center mr-5 rounded-[50%] border-2 border-orange-color ${
                        selectSize === size.size
                          ? "bg-orange-color text-white"
                          : ""
                      }  `}
                      onClick={() => sizeHandler(size.size)}
                    >
                      {size.size}
                    </label>
                  </span>
                )
            )}

            <SizeChart />
          </div>
          <div className="flex w-full gap-2.5 justify-end">
            <button
              className="flex items-center text-white-color bg-malon-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
              onClick={closeShowSize}
            >
              Cancel
            </button>
            <button
              className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
              onClick={submitSize}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Wishlist
