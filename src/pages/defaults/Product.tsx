import MessageBox from "../../components/MessageBox"
import { Helmet } from "react-helmet-async"
import { useEffect, useMemo, useState } from "react"
import ReactImageMagnify from "react-image-magnify"
import { FaEye, FaFlag, FaHeart, FaPlay, FaTag } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"
import Rating from "../../components/Rating"
import useAuth from "../../hooks/useAuth"
import IconsTooltips from "../../components/IconsTooltips"
import useCart from "../../hooks/useCart"
import { FaMessage, FaThumbsUp } from "react-icons/fa6"
import Report from "../../section/product/Report"
import ProtectionRight from "../../section/product/ProtectionRight"
import ProductDetails from "../../section/product/ProductDetails"
import ProductSustain from "../../section/product/ProductSustain"
import ProductTab from "../../section/product/ProductTab"
import SizeChart from "../../section/product/SizeChart"
import RebundleLabel from "../../section/product/RebundleLabel"
import ReviewLists from "../../components/ReviewLists"
import RebundlePoster from "../../components/RebundlePoster"
import ShareModal from "../../section/product/ShareModal"
import CustomCarousel from "../../section/product/CustomCarousel"
import RecentlyViewedProducts from "../../section/product/RecentlyViewedProducts"
import Modal from "../../components/ui/Modal"
import useProducts from "../../hooks/useProducts"
import { IProduct } from "../../types/product"
import useToastNotification from "../../hooks/useToastNotification"
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal"
import { currency } from "../../utils/common"
import moment from "moment"

const Product = () => {
  const params = useParams()
  const { slug } = params

  const navigate = useNavigate()

  const { fetchProductBySlug, error, likeProduct, unlikeProduct } =
    useProducts()
  const { addNotification } = useToastNotification()

  const {
    user,
    followUser,
    unFollowUser,
    addToWishlist,
    error: wishListError,
  } = useAuth()
  const { addToCart, cart } = useCart()

  const [selectedImage, setSelectedImage] = useState("")
  const [showModel, setShowModel] = useState(false)
  const [liking, setLiking] = useState(false)
  const [addToWish, setAddToWish] = useState(false)
  const [loading, setLoading] = useState(true)
  const [addLoading, setAddLoading] = useState(true)
  const [size, setSize] = useState("")
  const [selectSize, setSelectSize] = useState("")
  const [product, setProduct] = useState<IProduct>()

  // update product TODO:

  useEffect(() => {
    const viewItem = async () => {
      setLoading(true)
      if (!slug) {
        setLoading(false)
        return addNotification("invalid slug")
      }

      const data = await fetchProductBySlug(slug)
      if (!data) {
        setLoading(false)
        return addNotification("Failed to get Product", undefined, true)
      }

      setProduct(data)

      setLoading(false)

      const factor = 0.9

      const newView = {
        score: factor,
        numViews: 1,
        productId: data._id,
        product: data,
      }
      const views: (typeof newView)[] = JSON.parse(
        localStorage.getItem("recentlyView") || "[]"
      )
      const existing = views.find((x) => x.productId === data._id)

      const newViews = existing
        ? views.map((item) =>
            item.productId === existing.productId
              ? {
                  score: existing.score + factor,
                  numViews: existing.numViews + 1,
                  productId: existing.productId,
                  product: existing.product,
                }
              : item
          )
        : [...views, newView]

      localStorage.setItem("recentlyView", JSON.stringify(newViews))
      if (newViews) {
        const newViews1 = newViews.map((v) =>
          data._id !== v.productId
            ? {
                score: v.score * factor,
                productId: v.productId,
                product: v.product,
                numViews: v.numViews,
              }
            : v
        )
        localStorage.setItem("recentlyView", JSON.stringify(newViews1))
      }
    }
    viewItem()
  }, [slug])

  const following = useMemo(() => {
    if (user && user?.following.find((x) => x === product?.seller._id))
      return "Following"

    return "Follow"
  }, [product?.seller._id, user])

  const liked = useMemo(() => {
    return !!product?.likes.find((like) => like === user?._id)
  }, [product?.likes, user?._id])

  const discount = useMemo(() => {
    if (!product?.costPrice || product.sellingPrice) {
      return null
    }
    if (product.costPrice < product.sellingPrice) {
      return null
    }

    return (
      ((product.costPrice - product.sellingPrice) / product.costPrice) * 100
    )
  }, [product?.costPrice, product?.sellingPrice])

  const addToCartHandler = async () => {
    setAddLoading(true)
    if (!product) return setAddLoading(false)

    const existItem = cart.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (!selectSize && product.sizes.length > 0) {
      addNotification("Select Size", undefined, true)
      return setAddLoading(false)
    }

    if (user && product.seller._id === user._id) {
      addNotification("You can't buy your product", undefined, true)
      return setAddLoading(false)
    }

    const data = await fetchProductBySlug(product.slug)

    if (!data?.countInStock || data?.countInStock < quantity) {
      addNotification("Sorry. Product is out of stock", undefined, true)
      return setAddLoading(false)
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

    setAddLoading(false)
  }

  const saved = useMemo(() => {
    return !!(user?.wishlist && user.wishlist.find((x) => x === product?._id))
  }, [product, user])

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
        wishListError ?? "Failed to add to wishlist",
        undefined,
        true
      )

    setAddToWish(false)
  }

  const toggleFollow = async () => {
    if (!product || !slug) {
      return
    }

    if (!user) {
      addNotification("Login to follow a user")
      return
    }

    if (following === "Following") {
      const res = await unFollowUser(product.seller._id)
      if (res) addNotification(res)
      else addNotification(error, undefined, true)
    } else {
      const res = await followUser(product.seller._id)
      if (res) addNotification(res)
      else addNotification(error, undefined, true)
    }

    const data = await fetchProductBySlug(slug)
    if (!data) return

    setProduct(data)
  }

  const isOnlineCon = (userId: string) => {
    console.log(userId)
    return true
  }

  const addConversation = () => {}

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
      if (res) {
        const newProd = product
        newProd.likes = res.likes
        setProduct(newProd)
        addNotification(res.message)
      } else addNotification(error, undefined, true)
    } else {
      const res = await likeProduct(product._id)
      if (res) {
        const newProd = product
        newProd.likes = res.likes
        setProduct(newProd)
        addNotification(res.message)
      } else addNotification(error, undefined, true)
    }

    setLiking(false)
  }

  const checkFileTypeByExtension = (fileUrl: string) => {
    const extension = fileUrl.split(".").pop()?.toLowerCase() ?? ""

    if (["jpg", "jpeg", "png", "gif", "bmp"].includes(extension)) {
      return "image"
    } else if (["mp4", "avi", "mov", "mkv"].includes(extension)) {
      return "video"
    } else {
      return "unknown"
    }
  }

  const sizeHandler = (item: string) => {
    const current = product?.sizes.filter((s) => s.size === item) ?? []
    if (current.length > 0) {
      setSize(`${item} ( ${current[0].quantity} left)`)
      setSelectSize(item)
    } else {
      setSize("Out of stock")
      setSelectSize("")
    }
  }

  return !loading && error ? (
    <MessageBox className="text-red-500">{error}</MessageBox>
  ) : (
    <>
      {loading && <LoadingLogoModal />}
      {product && (
        <div>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>

          {product.seller.rebundle?.status && (
            <RebundleLabel userId={product.seller._id} />
          )}

          <div className="flex px-[5vw] py-[30px] flex-col lg:flex-row">
            <div className="lg:flex flex-1 flex-col items-center hidden">
              {product.images.map(
                (x, index) =>
                  x && (
                    <div
                      key={index}
                      className={`w-[100px] p-[5px] ${
                        selectedImage === x
                          ? "border-[0.1rem] border-orange-color"
                          : ""
                      }`}
                      onClick={() => setSelectedImage(x)}
                    >
                      <img
                        src={x}
                        alt=""
                        className={`w-full object-cover ${
                          selectedImage === x ? "opacity-50" : ""
                        }`}
                      />
                    </div>
                  )
              )}
              {product.video && (
                <div
                  className="w-[100px] p-[5px]"
                  onClick={() => setSelectedImage("video")}
                >
                  <div
                    className="w-full h-[60px] flex justify-center items-center"
                    style={{
                      backgroundImage: `url('${product.images[0]}')`,
                    }}
                  >
                    <FaPlay />
                  </div>
                </div>
              )}
            </div>

            <div className="md:hidden mb-6">
              <CustomCarousel>
                {[...product.images, product.video]
                  .filter((image) => image)
                  .map(
                    (image) =>
                      image && (
                        <div key={image} className="w-screen -ml-5 h-[500px]">
                          {checkFileTypeByExtension(image) === "image" ? (
                            <img
                              className="h-full w-full object-contain"
                              src={image}
                              alt="product"
                            />
                          ) : (
                            <video width="100%" controls muted autoPlay>
                              <source src={product.video} type="video/mp4" />
                            </video>
                          )}
                        </div>
                      )
                  )}
              </CustomCarousel>
            </div>
            <div className="flex-[3] z-[9] hidden lg:block">
              {selectedImage === "video" ? (
                <video width="100%" controls muted autoPlay>
                  <source src={product.video} type="video/mp4" />
                </video>
              ) : (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: selectedImage || product.images[0],
                    },
                    largeImage: {
                      src: selectedImage || product.images[0],
                      width: 1200,
                      height: 1800,
                    },
                  }}
                />
              )}
            </div>

            <div className="flex-[3] flex flex-col overflow-y-auto h-screen lg:pl-[70px] px-2.5 scrollbar-hide">
              <div className="flex">
                <Link
                  className="relative"
                  to={`/seller/${product.seller.username}`}
                >
                  <img
                    className="object-cover object-top h-[100px] w-[100px] mr-5 rounded-[50%]"
                    src={product.seller.image}
                    alt={product.seller.username}
                  />
                  {product.seller.badge && (
                    <div className="absolute rounded-[50%] right-0 bottom-0">
                      <img
                        className="w-5 h-[23px] object-cover rounded-none"
                        src="https://res.cloudinary.com/emirace/image/upload/v1661148671/Icons-28_hfzerc.png"
                      />
                    </div>
                  )}
                </Link>
                <div className="flex flex-col justify-center">
                  <div className="items-center flex font-bold gap-2 capitalize">
                    <Link
                      to={`/seller/${product.seller.username}`}
                      className="text-malon-color"
                    >
                      @{product.seller.username}
                    </Link>
                  </div>
                  <div>
                    {product.seller?.address?.state},
                    {product.seller?.address?.region === "NGN"
                      ? "Nigeria"
                      : "South Africa"}
                    Nigeria
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowModel(!showModel)}
                  >
                    <Rating
                      rating={product.seller.rating}
                      numReviews={product.seller.numReviews}
                    />
                  </div>
                  <Modal isOpen={showModel} onClose={() => setShowModel(false)}>
                    <ReviewLists setShowModel={setShowModel} />
                  </Modal>

                  <div
                    className="text-white-color text-center cursor-pointer mt-[5px] px-2.5 py-0 rounded-[10px] bg-orange-color"
                    onClick={toggleFollow}
                  >
                    {following}
                  </div>
                </div>
              </div>
              <div className="flex mt-[15px] justify-between lg:justify-normal">
                <div className="mr-[50px] flex items-center">
                  <FaTag className="mr-[5px] text-orange-color" />
                  {product.seller.sold.length < 5
                    ? "< 5"
                    : product.seller.sold.length}{" "}
                  sold
                  <span className="flex items-center">
                    <FaEye className="ml-2.5 mr-[5px] text-orange-color" />
                    {product.viewcount.length}
                  </span>
                </div>
                {isOnlineCon(product.seller._id) ? (
                  <div className="px-2.5 py-0 rounded-[10px] border-[0.1rem] text-orange-color border-orange-color">
                    online
                  </div>
                ) : (
                  <div className="px-2.5 py-0 rounded-[10px] border-[0.1rem] text-gray-500 border-gray-500">
                    offline
                  </div>
                )}
              </div>
              {product.seller.rebundle?.status && <RebundlePoster />}

              <div className="items-center flex relative mt-[30px] mb-2.5 justify-between lg:justify-normal px-[10vw] py-0 lg:p-0">
                <div className="relative mr-[30px] flex cursor-pointer text-lg items-center">
                  {product.likes.length}
                  <FaThumbsUp
                    className={`ml-[5px] peer hover:text-orange-color ${
                      liked ? "text-orange-color" : ""
                    }`}
                    onClick={!liking ? toggleLikes : undefined}
                  />
                  <IconsTooltips
                    classNames="peer-hover:opacity-100"
                    tips="Like Product "
                  />
                </div>
                <ShareModal url={window.location.href} product={product} />
                <div className="relative mr-[30px] flex cursor-pointer text-lg group items-center">
                  <FaHeart
                    className={`peer hover:text-orange-color ${
                      saved ? "text-orange-color" : ""
                    }`}
                    onClick={!addToWish ? saveItem : undefined}
                  />
                  <IconsTooltips
                    classNames="peer-hover:opacity-100"
                    tips="Add to wishlist "
                  />
                </div>

                <div className="relative mr-[30px] flex cursor-pointer text-lg group items-center">
                  <FaMessage
                    className="peer hover:text-orange-color"
                    onClick={addConversation}
                  />
                  <IconsTooltips
                    classNames="peer-hover:opacity-100"
                    tips="Message Seller "
                  />
                </div>
              </div>
              <div>Listed {moment(product.createdAt).fromNow()}</div>

              <div className="flex items-center">
                <h4 className="text-[25px] font-medium capitalize mt-2.5">
                  {product.name}
                </h4>
                <h4 className="ml-5 font-normal text-gray-500 text-[15px] capitalize mt-2.5">
                  {product.brand}
                </h4>
              </div>
              <div className="items-center flex">
                <div className="text-[25px] font-bold mr-5">
                  {currency(product.region)} {product?.costPrice}
                </div>
                {product.costPrice &&
                product.costPrice < product.sellingPrice ? (
                  <div className="line-through text-xl text-[#5b5b5b] mr-5">
                    {currency(product.region)} {product.sellingPrice}
                  </div>
                ) : null}
                {discount ? (
                  <div className="text-sm text-orange-color">
                    (-{discount.toString().substring(0, 5)}% )
                  </div>
                ) : (
                  ""
                )}
              </div>
              {product.tags && (
                <div className="flex gap-[5px] mt-2.5">
                  Tags:
                  <div className="flex flex-wrap">
                    {product.tags.map((t) => (
                      <Link to={`/search?search=${t}`}>
                        <div className="border m-0.5 px-2.5 py-0 rounded-[10px] border-black">
                          {t}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="">
                {product.sizes.length > 0 && (
                  <>
                    <div className="capitalize mx-0 my-2.5">
                      select size: {size}{" "}
                    </div>
                    <div className="flex">
                      {product.sizes.map(
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
                  </>
                )}
                <div className="my-5 mx-0">
                  {!product.isAvailable ? (
                    <button className="w-full text-white-color text-lg font-bold uppercase mb-5 p-2.5 rounded-[5px] border-0 bg-gray-500 cursor-not-allowed">
                      Not Available
                    </button>
                  ) : product.countInStock > 0 ? (
                    <button
                      disabled={addLoading}
                      onClick={addToCartHandler}
                      className="w-full text-white-color text-lg font-bold uppercase mb-5 p-2.5 rounded-[5px] border-0 bg-orange-color hover:bg-malon-color"
                    >
                      add to cart
                    </button>
                  ) : (
                    <button className="w-full text-white-color text-lg font-bold uppercase mb-5 p-2.5 rounded-[5px] border-0 bg-gray-500 cursor-not-allowed">
                      sold out
                    </button>
                  )}

                  <button
                    className="w-full font-bold text-lg text-orange-color border-orange-color hover:text-malon-color  hover:border-malon-color uppercase p-[5px] rounded-[10px] border-[0.1rem]"
                    onClick={saveItem}
                  >
                    wishlist
                  </button>
                </div>

                <ProductDetails product={product} />

                <ProtectionRight />

                <ProductSustain />
                <div className="flex gap-5 justify-end">
                  {user && user.role === "Admin" && (
                    <div className="pointer flex gap-1 items-center text-malon-color text-right">
                      <FaFlag /> Flag As Invalid
                    </div>
                  )}
                  <div
                    className="cursor-pointer text-malon-color text-right"
                    // TODO:
                    // onClick={() => handlereport(product.seller._id, product._id)}
                  >
                    Report Item
                  </div>
                </div>

                <Report
                  reportedUser={product.seller._id}
                  productName={product.name}
                />
              </div>
            </div>
          </div>

          <RecentlyViewedProducts />

          <ProductTab setProduct={setProduct} product={product} />
        </div>
      )}
    </>
  )
}

export default Product
