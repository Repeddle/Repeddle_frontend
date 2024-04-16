import { useNavigate } from "react-router-dom"
import { IProduct } from "../../types/product"

const SkeletonProduct = () => (
  <div className="flex-[0_0_calc(33%_-_10px)] bg-[#f0f0f0] p-2.5 md:max-w-[240px]">
    <div className="flex-1 h-[150px] bg-[#f0f0f0] animate-[skeletonPulse_1.5s_infinite]" />
    <div className="w-4/5 h-[18px] bg-[#e0e0e0] animate-[skeletonPulse_1.5s_infinite] mt-2.5" />
    <div className="w-3/5 h-4 bg-[#e0e0e0] animate-[skeletonPulse_1.5s_infinite] mt-[5px]" />
    <div className="w-10 h-3.5 bg-[#e0e0e0] animate-[skeletonPulse_1.5s_infinite] mt-[5px]" />
  </div>
)

const TheThrill = () => {
  const products: IProduct[] = []
  const loading = false
  const error = null
  const navigate = useNavigate()

  const sliderHandler = (direction: "right" | "left") => {
    const slider = document.getElementById("slider")
    if (slider) {
      if (direction === "left") {
        slider.scrollBy(-200, 0)
        // setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : products.length - 5);
      } else {
        slider.scrollBy(200, 0)
      }
    }
  }

  const handleViewMore = () => {
    navigate("/search")
  }

  const handleClick = (slug: string) => {
    navigate(`/product/${slug}`)
  }

  const discount = (product: IProduct) => {
    const price = product.sellingPrice
    const actualPrice = product.costPrice

    if (!actualPrice) return null

    if (price <= actualPrice) {
      return null // No discount
    }

    const discountPercentage = ((price - actualPrice) / price) * 100
    return discountPercentage.toFixed() // Return with 2 decimal places
  }

  return (
    <div className="mt-5 relative">
      <div>
        <h2
          className={`lg:text-[50px] text-[30px] mb-[10px] capitalize relative lg:mb-5 px-[5vw] py-0 leading-[1.2]
        after:absolute after:content-[''] after:h-0.5 after:w-[70px] after:bg-orange-color after:left-[10vw] after:-bottom-1`}
        >
          Shop The Thrill
        </h2>
      </div>

      <button onClick={() => sliderHandler("left")} className="pre-btn1">
        <i className="fa fa-angle-left"></i>
      </button>
      <button onClick={() => sliderHandler("right")} className="next-btn1">
        <i className="fa fa-angle-right"></i>
      </button>
      {loading ? (
        <div className="flex scrollbar-hide flex-wrap w-full gap-2.5 p-2.5 md:flex-nowrap md:overflow-x-auto md:px-[5vw] md:py-2.5">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonProduct key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="flex scrollbar-hide flex-wrap w-full gap-2.5 p-2.5 md:flex-nowrap md:overflow-x-auto md:px-[5vw] md:py-2.5">
          {products.slice(0, 6).map((product) => (
            <div
              className="relative flex-[0_0_calc(33%_-_10px)] md:max-w-[200px]"
              key={product._id}
              onClick={() => handleClick(product.slug)}
            >
              <img
                className="w-full"
                src={product.images[0]}
                alt={product.name}
              />
              <h3 className="text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] mt-[5px] mb-0 mx-0 md:text-lg md:max-w-[200px]">
                {product.name}
              </h3>
              <p className="text-base font-bold mb-0">
                <span className="text-sm">
                  {/* {product.currency} */}
                  {product.sellingPrice}
                </span>
                {discount(product) && (
                  <span className="text-malon-color text-xs ml-[5px]">
                    {discount(product)}% Off
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
      <button
        className="block text-base bg-orange-color w-[95%] md:w-auto text-white font-bold cursor-pointer mt-0 mx-auto my-5 px-5 py-[5px] rounded-[0.2rem] border-none hover:bg-malon-color"
        onClick={handleViewMore}
      >
        View More
      </button>
    </div>
  )
}

export default TheThrill
