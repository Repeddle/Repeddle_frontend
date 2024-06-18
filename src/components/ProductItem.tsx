import { useMemo, useState } from "react"
import { IProduct } from "../types/product"
import { Link } from "react-router-dom"
import { FaArrowsAlt, FaHeart, FaThumbsUp } from "react-icons/fa"
import Modal from "./ui/Modal"
import { currency } from "../utils/common"
import useAuth from "../hooks/useAuth"
import useProducts from "../hooks/useProducts"
import useToastNotification from "../hooks/useToastNotification"

type Props = {
  product: IProduct
}

const ProductItem = ({ product }: Props) => {
  const { user, addToWishlist, error: wishlistError } = useAuth()
  const { likeProduct, unlikeProduct, error } = useProducts()
  const { addNotification } = useToastNotification()

  const [showModel, setShowModel] = useState(false)
  const [liking, setLiking] = useState(false)
  const [addToWish, setAddToWish] = useState(false)

  const discount = useMemo(() => {
    if (!product.costPrice || product.sellingPrice) {
      return null
    }
    if (product.costPrice < product.sellingPrice) {
      return null
    }

    return (
      ((product.costPrice - product.sellingPrice) / product.costPrice) * 100
    )
  }, [product.costPrice, product.sellingPrice])

  const liked = useMemo(() => {
    return !!product?.likes.find((like) => like === user?._id)
  }, [product?.likes, user?._id])

  const toggleLikes = async () => {
    if (!user) {
      addNotification("Sign in /  Sign Up to like", undefined, true)
      return
    }

    if (!product) return

    if (product.seller._id === user._id) {
      addNotification("You can't like your product", undefined, true)
      return
    }

    setLiking(true)

    if (liked) {
      const res = await unlikeProduct(product._id)
      if (res) addNotification(res)
      else addNotification(error, undefined, true)
    } else {
      const res = await likeProduct(product._id)
      if (res) addNotification(res)
      else addNotification(error, undefined, true)
    }

    setLiking(false)
  }

  const saveItem = async () => {
    if (!product) return

    if (!user) {
      addNotification(
        "Sign In/ Sign Up to add an item to wishlist",
        undefined,
        true
      )
      return
    }

    if (product.seller._id === user._id) {
      addNotification("You can't add your product to wishlist", undefined, true)
      return
    }

    setAddToWish(true)

    const res = await addToWishlist(product._id)
    if (res) addNotification(res)
    else
      addNotification(
        wishlistError ?? "Failed to add to wishlist",
        undefined,
        true
      )

    setAddToWish(false)
  }

  return (
    <div className="h-[342px] w-[162px] mr-2.5 lg:mr-auto mb-2.5 lg:h-[500px] lg:w-60 lg:flex-[0_0_auto] cursor-pointer">
      {/* {showNotification && (
        <Notification text="Item added to Cart" buttonText={"Checkout"} />
      )} */}
      <Modal isOpen={showModel} onClose={() => setShowModel(false)}>
        <div className="flex justify-center h-full">
          <img
            className="w-auto h-full"
            src={product.images[0]}
            alt={product.name}
          />
        </div>
      </Modal>

      <div className="h-[270px] lg:h-[400px] overflow-hidden relative w-full group">
        <Link to={`/product/${product.slug}`}>
          {product.sold ? (
            <div className="absolute text-white bg-[#808080] uppercase p-[5px] rounded-[5px] right-2.5 top-2.5">
              sold
            </div>
          ) : (
            discount && (
              <span className="absolute text-[13px] bg-white lg:text-base text-orange-color capitalize p-[5px] rounded-[5px] right-2.5 top-2.5">
                {discount.toFixed(0)}% off
              </span>
            )
          )}

          <img
            src={product.images[0]}
            className="h-[270px] object-cover w-full lg:h-[400px]"
            alt={product.name}
          />
        </Link>

        <ul className="absolute text-center w-full z-[3] left-0 bottom-[30px]">
          <li className="inline-block opacity-0 group-hover:opacity-100 relative mr-2.5 top-[100px] group-hover:top-0 justify-center items-center list-none transition-all duration-[0.4s] ease-[ease] delay-[0.15s]">
            <span
              className="cursor-pointer bg-white shadow-[0_0_25px_hsla(0,0%,9%,0.4)] text-black block text-lg h-[45px] leading-[45px] transition-all duration-500 w-[45px] rounded-[50px]"
              onClick={() => setShowModel(!showModel)}
            >
              <FaArrowsAlt className="text-lg text-orange-color inline-block relative rotate-[0] transition-all duration-[0.3s]" />
            </span>
          </li>
          <li className="inline-block opacity-0 group-hover:opacity-100 relative mr-2.5 top-[100px] group-hover:top-0 justify-center items-center list-none transition-all duration-[0.4s] ease-[ease] delay-[0.15s]">
            <span
              className="cursor-pointer bg-white shadow-[0_0_25px_hsla(0,0%,9%,0.4)] text-black block text-lg h-[45px] leading-[45px] transition-all duration-500 w-[45px] rounded-[50px]"
              onClick={!liking ? toggleLikes : undefined}
            >
              <FaThumbsUp className="text-lg text-orange-color inline-block relative rotate-[0] transition-all duration-[0.3s]" />
            </span>
          </li>
          <li className="inline-block opacity-0 group-hover:opacity-100 relative top-[100px] group-hover:top-0 justify-center items-center list-none transition-all duration-[0.4s] ease-[ease] delay-[0.2s] mr-0">
            <span
              className="cursor-pointer bg-white shadow-[0_0_25px_hsla(0,0%,9%,0.4)] text-black block text-lg h-[45px] leading-[45px] transition-all duration-500 w-[45px] rounded-[50px]"
              onClick={() => !addToWish && saveItem()}
            >
              <FaHeart className="text-lg text-orange-color inline-block relative rotate-[0] transition-all duration-[0.3s]" />
            </span>
          </li>
        </ul>
      </div>
      <div className="max-h-[100px] w-full pt-2.5">
        <h2 className="uppercase text-xl font-bold whitespace-nowrap w-full overflow-hidden text-ellipsis mb-0">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h2>
        <p className="text-xs h-4 !leading-5 opacity-50 overflow-hidden capitalize w-full lg:text-base mb-[5px]">
          {product.brand}
        </p>
        <span className="text-base lg:text-xl font-black">
          {currency(product.region)}
          {product.sellingPrice}
        </span>
        {product.costPrice &&
          (product.costPrice > product.sellingPrice ? (
            <span className="text-base ml-5 line-through text-orange-color">
              {currency(product.region)}
              {product.costPrice}
            </span>
          ) : null)}
      </div>
    </div>
  )
}

export default ProductItem
