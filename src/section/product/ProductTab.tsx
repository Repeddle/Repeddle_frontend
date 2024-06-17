import { useState } from "react"
import { IProduct } from "../../types/product"
import ProductComment from "./ProductComment"
import ProductReviews from "./ProductReviews"

type Props = {
  product: IProduct
}

type TabType = "comments" | "reviews"

const ProductTab = ({ product }: Props) => {
  const [tab, setTab] = useState<TabType>("comments")

  return (
    <section>
      <div className="flex border border-border-color justify-center mt-2.5 mb-[5px] mx-[30px] rounded-[5px]">
        <div
          className={`flex justify-center cursor-pointer relative capitalize min-w-[50px] m-2.5 hover:text-orange-color ${
            tab === "comments"
              ? "text-orange-color font-bold after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:-bottom-2.5 after:bg-orange-color"
              : ""
          }`}
          onClick={() => setTab("comments")}
        >
          Comments ({product.comments?.length ?? 0})
        </div>
        <div
          className={`flex justify-center cursor-pointer relative capitalize min-w-[50px] m-2.5 hover:text-orange-color ${
            tab === "reviews"
              ? "text-orange-color font-bold after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:-bottom-2.5 after:bg-orange-color"
              : ""
          }`}
          onClick={() => setTab("reviews")}
        >
          Reviews ({product.reviews.length})
        </div>
      </div>
      <div className="container">
        {tab === "comments" && (
          <ProductComment comments={product.comments} product={product} />
        )}

        {tab === "reviews" && <ProductReviews product={product} />}
      </div>
    </section>
  )
}

export default ProductTab
