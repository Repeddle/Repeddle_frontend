import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import ProductItem from "../../components/ProductItem"
import { IProduct } from "../../types/product"

type Props = {
  products: IProduct[]
}

const NewDeals = ({ products }: Props) => {
  const sliderHandler = (direction: "left" | "right") => {
    if (direction === "left") {
      const slider = document.getElementById("slider")
      slider?.scrollBy(-200, 0)
      // setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : products.length - 5);
    } else {
      const slider = document.getElementById("slider")
      slider?.scrollBy(200, 0)
    }
  }

  return (
    <section className="overflow-hidden relative px-0 py-2.5">
      <div>
        <h2
          className={`lg:text-[50px] relative capitalize text-3xl lg:mb-5 mb-2.5 px-[5vw] py-0 leading-[1.2]
            after:bg-orange-color after:content-[""] after:h-0.5 after:absolute after:w-[70px] after:left-[10vw] after:-bottom-1`}
        >
          New deals
        </h2>
      </div>
      <button
        onClick={() => sliderHandler("left")}
        className="items-center hidden cursor-pointer lg:flex h-full justify-center opacity-50 absolute w-[5vw] z-[8] border-none left-0 top-0 bg-transparent"
      >
        <FaAngleLeft size={40} opacity={0.2} />
      </button>
      <button
        onClick={() => sliderHandler("right")}
        className="items-center hidden cursor-pointer lg:flex h-full justify-center opacity-50 absolute w-[5vw] z-[8] border-none right-0 top-0 bg-transparent"
      >
        <FaAngleRight size={40} opacity={0.2} />
      </button>
      <div
        id="slider"
        className="flex gap-5 overflow-x-auto overflow-y-hidden mx-[5vw] my-0 scroll_snap scrollbar-hide"
      >
        {products.length > 0
          ? products.map((product) => (
              <div key={product._id} className="smooth1">
                <ProductItem product={product} />
              </div>
            ))
          : "No Product Found"}
      </div>
    </section>
  )
}

export default NewDeals
