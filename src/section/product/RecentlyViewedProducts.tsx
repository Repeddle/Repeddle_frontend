import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import ProductItem from "../../components/ProductItem"
import { RecentlyViewed } from "../../types/product"

const RecentlyViewedProducts = () => {
  const sliderHandler = (direction: "right" | "left") => {
    const slider = document.getElementById("slider")
    if (slider) {
      if (direction === "left") {
        slider.scrollBy(-350, 0)
        // setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : products.length - 5);
      } else {
        slider.scrollBy(350, 0)
      }
    }
  }

  return (
    <section className="relative overflow-hidden px-0 py-2.5">
      <div className="">
        <h2
          className={`lg:text-[50px] text-[30px] mb-[10px] capitalize relative lg:mb-5 px-[5vw] py-0 leading-[1.2]
        after:absolute after:content-[''] after:h-0.5 after:w-[70px] after:bg-orange-color after:left-[10vw] after:-bottom-1`}
        >
          Recently Viewed
        </h2>
      </div>
      <button
        onClick={() => sliderHandler("left")}
        className="w-[5vw] h-full absolute flex justify-center opacity-50 items-center cursor-pointer z-[8] border-none top-0 left-0"
      >
        <FaAngleLeft size={40} opacity={0.2} />
      </button>

      <button
        onClick={() => sliderHandler("right")}
        className="w-[5vw] h-full absolute flex justify-center opacity-50 items-center cursor-pointer z-[8] border-none top-0 right-0"
      >
        <FaAngleRight size={40} opacity={0.2} />
      </button>
      <div
        id="slider"
        className="flex gap-5 overflow-x-auto overflow-y-hidden scroll-smooth mx-[5vw] my-0 scrollbar-hide scroll_snap"
      >
        {(
          JSON.parse(
            localStorage.getItem("recentlyView") || "[]"
          ) as RecentlyViewed[]
        ).map((item) => (
          <div key={item.product._id} className="smooth1">
            <ProductItem product={item.product} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentlyViewedProducts
