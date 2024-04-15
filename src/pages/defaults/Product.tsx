import LoadingBox from "../../components/LoadingBox"
import MessageBox from "../../components/MessageBox"
import { Helmet } from "react-helmet-async"
import { productDetails as product } from "../../utils/data"
import { useMemo, useState } from "react"
import {
  FaEye,
  FaFlag,
  FaHeart,
  FaPlay,
  FaTag,
  FaThumbsUp,
} from "react-icons/fa"
import { Link } from "react-router-dom"
import Rating from "../../components/Rating"
import useAuth from "../../hooks/useAuth"
import IconsTooltips from "../../components/IconsTooltips"
import useCart from "../../hooks/useCart"
import { FaMessage } from "react-icons/fa6"
import Report from "../../section/product/Report"
import ProtectionRight from "../../section/product/ProtectionRight"
import ProductDetails from "../../section/product/ProductDetails"
import ProductSustain from "../../section/product/ProductSustain"
import ProductTab from "../../section/product/ProductTab"
import ProductItem from "../../components/Product"
import SizeChart from "../../section/product/SizeChart"

const Product = () => {
  const loading = false
  const error = null

  const { user } = useAuth()
  const { addToCart } = useCart()

  const [selectedImage, setSelectedImage] = useState("")
  const [showModel, setShowModel] = useState(false)
  const [size, setSize] = useState("")
  const [selectSize, setSelectSize] = useState("")

  const following = useMemo(() => {
    if (
      user &&
      product.seller.followers &&
      product.seller.followers.find((x) => x === user._id)
    )
      return "Following"

    return "Follow"
  }, [user])

  const liked = useMemo(() => {
    return !!(user && product.likes.find((x) => x === user._id))
  }, [user])

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
  }, [])

  const addToCartHandler = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: selectSize,
      // selectedColor?: string;
    })
  }

  const saved = useMemo(() => {
    return !!(
      user &&
      user.saved &&
      // TODO:
      // user.saved.find((x) => x._id === product._id))
      user.saved.find((x) => x === product._id)
    )
  }, [user])

  const saveItem = () => {}

  const toggleFollow = () => {}

  const isOnlineCon = (userId: string) => {
    console.log(userId)
    return true
  }

  const addConversation = () => {}

  const toggleLikes = () => {}

  const sizeHandler = (item: string) => {
    const current = product.sizes.filter((s) => s.size === item)
    if (current.length > 0) {
      setSize(`${item} ( ${current[0].quantity} left)`)
      setSelectSize(item)
    } else {
      setSize("Out of stock")
      setSelectSize("")
    }
  }

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox className="text-red-500">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      {/* <RebundleLabel
        userId={product.seller._id}
        active={product.seller.rebundle.status}
      /> */}
      <div className="flex px-[5vw] py-[30px] flex-col lg:flex-row">
        <div className="lg:flex flex-1 flex-col items-center hidden">
          {product.images.map(
            (x, index) =>
              x && (
                <div
                  key={index}
                  className={`w-full p-[5px] ${
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
                      selectedImage === x ? "active1" : ""
                    }`}
                  />
                </div>
              )
          )}
          {product.video && (
            <div
              className="w-full p-[5px]"
              onClick={() => setSelectedImage("video")}
            >
              <div
                className="w-full h-[60px] flex justify-center items-center"
                style={{
                  // backgroundImage: `url('${product.image}')`,
                  backgroundImage: `url('${product.images[0]}')`,
                }}
              >
                <FaPlay />
              </div>
            </div>
          )}
        </div>

        <div className="d-md-none mb-4">
          {/* <CustomCarousel>
            {[product.image, ...product.images, product.video]
              .filter((image) => image)
              .map(
                (image) =>
                  image && (
                    <div
                      key={image}
                      style={{
                        width: "100vw",
                        marginLeft: "-20px",
                        height: "500px",
                      }}
                    >
                      {checkFileTypeByExtension(image) === "image" ? (
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
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
          </CustomCarousel> */}
        </div>
        <div className="flex-[3] z-[9] hidden lg:block">
          {selectedImage === "video" ? (
            <video width="100%" controls muted autoPlay>
              <source src={product.video} type="video/mp4" />
            </video>
          ) : (
            <></>
            // <ReactImageMagnify
            //   {...{
            //     smallImage: {
            //       alt: "Wristwatch by Ted Baker London",
            //       isFluidWidth: true,
            //       src: selectedImage || product.image,
            //     },
            //     largeImage: {
            //       src: selectedImage || product.image,
            //       width: 1200,
            //       height: 1800,
            //     },
            //     // enlargedImagePosition: "over",
            //   }}
            // />
          )}
        </div>

        <div className="flex-[3] flex flex-col overflow-y-auto h-screen lg:pl-[70px] px-2.5 scrollbar-hide">
          <div className="flex">
            <Link className="relative" to={`/seller/${product.seller._id}`}>
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
                  to={`/seller/${product.seller._id}`}
                  className="text-malon-color"
                >
                  @{product.seller.username}
                </Link>
              </div>
              <div>
                {product.seller?.address?.state}, {/* TODO:  */}
                {/* {product.seller.region === "NGN" ? "Nigeria" : "South Africa"} */}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setShowModel(!showModel)}
              >
                <Rating
                  // rating={product.seller.rating}
                  // TODO:
                  rating={product.seller.numReviews}
                  numReviews={product.seller.numReviews}
                />
              </div>
              {/* <ModelLogin showModel={showModel} setShowModel={setShowModel}>
                <ReviewLists
                  userId={product.seller._id}
                  setShowModel={setShowModel}
                />
              </ModelLogin> */}

              <div
                className="text-white-color text-center cursor-pointer mt-[5px] px-2.5 py-0 rounded-[10px] bg-orange-color"
                onClick={toggleFollow}
              >
                {following}
              </div>
            </div>
          </div>
          <div className="flex mt-[15px] justify-between lg:justify-normal">
            <div className="mr-[50px]">
              <FaTag />
              {product.seller.sold.length < 5
                ? "< 5"
                : product.seller.sold.length}{" "}
              sold
              <span>
                <FaEye className="ml-2.5" />
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
          {/* {product.seller.rebundle.status && (
            <RebundlePoster style={{ marginTop: "5px" }} />
          )} */}

          <div className="items-center flex relative mt-[30px] mb-2.5 justify-between px-[10vw] py-0 lg:p-0">
            <div className="relative mr-[30px] group">
              {product.likes.length}
              <FaThumbsUp
                className={`ml-[5px] ${liked ? "text-orange-color" : ""}`}
                onClick={toggleLikes}
              />
              <IconsTooltips
                classNames="group-hover:opacity-100"
                tips="Like Product "
              />
            </div>
            {/* <ShareModal
              url={window.location.href}
              product={product}
              dispatch={dispatch}
            /> */}
            <div className="relative mr-[30px] group">
              <FaHeart
                className={saved ? "text-orange-color" : ""}
                onClick={saveItem}
              />
              <IconsTooltips
                classNames="group-hover:opacity-100"
                tips="Add to wishlist "
              />
            </div>

            {/* <ModelLogin
              showModel={showLoginModel}
              setShowModel={setShowLoginModel}
            >
              <Signin />
            </ModelLogin> */}
            <div className="relative mr-[30px] group">
              <FaMessage onClick={addConversation} />
              <IconsTooltips
                classNames="group-hover:opacity-100"
                tips="Message Seller "
              />
            </div>
          </div>
          {/* TODO:  */}
          {/* <div>Listed {moment(product.createdAt).fromNow()}</div> */}
          <div>Listed 2hrs ago</div>

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
              {/* TODO:  */}
              {/* {product.currency} */}N {product?.costPrice}
            </div>
            {product.costPrice ?? 0 < product.sellingPrice ? (
              <div className="line-through text-xl text-[#5b5b5b] mr-5">
                {/* TODO:  */}
                {/* {product.currenncy} */}N {product.sellingPrice}
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
                  <Link to={`/search?query=${t}`}>
                    <div className="border m-0.5 px-2.5 py-0 rounded-[10px] border-solid">
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
                <button className="w-full text-white-color text-lg font-[bold] uppercase mb-5 p-2.5 rounded-[5px] border-0 bg-gray-500 cursor-not-allowed">
                  Not Available
                </button>
              ) : product.countInStock > 0 ? (
                <button
                  onClick={addToCartHandler}
                  className="w-full text-white-color text-lg font-[bold] uppercase mb-5 p-2.5 rounded-[5px] border-0 bg-orange-color hover:bg-malon-color"
                >
                  add to cart
                </button>
              ) : (
                <button className="w-full text-white-color text-lg font-[bold] uppercase mb-5 p-2.5 rounded-[5px] border-0 bg-gray-500 cursor-not-allowed">
                  sold out
                </button>
              )}

              <button className="sp_wishlist_btn " onClick={saveItem}>
                wishlist
              </button>
            </div>

            <ProductDetails product={product} />

            <ProtectionRight />

            <ProductSustain />
            <div
              style={{ display: "flex", gap: "20px", justifyContent: "end" }}
            >
              {user && user.isAdmin && (
                <div className="pointer text-malon-color text-right">
                  <FaFlag /> Flag As Invalid
                </div>
              )}
              <div
                className="pointer text-malon-color text-right"
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

      <section className="product1">
        <div className="product-title">
          <h2 className="product-category1">Recently Viewed</h2>
        </div>
        <button
          // TODO:
          // onClick={() => sliderHandler("left")}
          className="pre-btn1"
        >
          <i className="fa fa-angle-left"></i>
        </button>
        <button
          // TODO:
          // onClick={() => sliderHandler("right")}
          className="next-btn1"
        >
          <i className="fa fa-angle-right"></i>
        </button>
        <div
          id="slider"
          className="product-container1 scroll_snap"
          // style={{
          //   transform: sliderstyle,
          // }}
        >
          {JSON.parse(localStorage.getItem("recentlyView") || "[]").map(
            (product) => (
              <div key={product.productId} className="smooth1">
                <ProductItem product={product.product} />
              </div>
            )
          )}
        </div>
      </section>

      <ProductTab product={product} />
    </div>
  )
}

export default Product
