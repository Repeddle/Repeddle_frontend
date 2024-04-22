import { useSearchParams } from "react-router-dom"
import MessageBox from "../../components/MessageBox"
import LoadingBox from "../../components/LoadingBox"
import { Helmet } from "react-helmet-async"
import Product from "../../components/Product"
import { IProduct } from "../../types/product"
import SearchBox from "../../components/SearchBox"
import { BiFilter } from "react-icons/bi"
import { useEffect, useState } from "react"
import SearchFilter from "../../components/layout/SearchFilter"
import { SearchOptionsKey } from "../../types/search"

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const changeParam = (key: SearchOptionsKey, val: string | number) => {
    setSearchParams((prev) => {
      prev.set(key, val.toString())
      return prev
    })
  }

  useEffect(() => {
    console.log(searchParams)
  }, [searchParams])

  const loading = false
  const rLoading = false
  const error = false
  const products: IProduct[] = []
  const rProducts: IProduct[] = []
  const pages = 0

  const page = 0

  const [showFilter, setShowFilter] = useState(false)
  const [queryBrand] = useState("")
  const [order] = useState("")

  const categories: { name: string; id: string }[] = []
  const rating: { rating: number; id: string }[] = []
  const sizes: { rating: number; id: string }[] = []
  const colors: { rating: number; id: string }[] = []
  const shipping: { name: string; id: string }[] = []
  const condition: { name: string; id: string }[] = []
  const availability: { name: string; id: string }[] = []
  const type: { name: string; id: string }[] = []
  const pattern: { name: string; id: string }[] = []
  const brands: { name: string; _id: string }[] = []
  const deals: any[] = []
  const maxPrice = 50000
  const minPrice = 0

  return (
    <div>
      <Helmet>
        <title>Search Product</title>
      </Helmet>
      <div className="flex mt-2.5">
        <SearchFilter
          // searchBrand={searchBrand}
          queryBrand={queryBrand}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          categories={categories}
          // order={order}
          // page={page}
          maxPrice={maxPrice}
          minPrice={minPrice}
          // query={query}
          rating={rating}
          brands={brands}
          colors={colors}
          sizes={sizes}
          deals={deals}
          shipping={shipping}
          condition={condition}
          availability={availability}
          type={type}
          pattern={pattern}
          // countProducts={countProducts}
        />
        <div className="flex-[4] dark:bg-dark-ev1 bg-light-ev1 mb-2.5 m-0 pt-20 lg:mb-5 lg:mx-2.5 lg:my-0 lg:pt-2.5 md:pt-24 p-2.5 rounded-[0.2rem]">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox className="text-red-500">{error}</MessageBox>
          ) : (
            <>
              <div className="block lg:hidden mb-[15px]">
                <SearchBox />
              </div>

              <div className="flex justify-between items-center">
                <div
                  className="bg-orange-color flex text-white-color items-center gap-1 lg:hidden px-[7px] py-[5px] rounded-[0.2rem]"
                  onClick={() => setShowFilter(true)}
                >
                  <BiFilter /> Filters
                </div>
                <div className="hidden lg:flex mb-[5px]">
                  {/* {countProducts === 0 ? "No" : countProducts} Results
                  {query !== "all" && " : " + query}
                  {category !== "all" && " : " + category}
                  {brand !== "all" && "  Brand: " + brand}
                  {color !== "all" && "  Brand: " + color}
                  {condition !== "all" && "  Brand: " + condition}
                  {availability !== "all" && "  Brand: " + availability}
                  {pattern !== "all" && "  Brand: " + pattern}
                  {size !== "all" && "  Brand: " + size}
                  {shipping !== "all" && "  Brand: " + shipping}
                  {rating !== "all" && "  Rating:" + rating + " & up"}
                  {query !== "all" ||
                  category !== "all" ||
                  rating !== "all" ||
                  brand !== "all" ||
                  color !== "all" ||
                  condition !== "all" ||
                  availability !== "all" ||
                  pattern !== "all" ||
                  shipping !== "all" ||
                  size !== "all" ? (
                    <Button variant="none" onClick={() => navigate("/search")}>
                      <i className="fas fa-times-circle"></i>
                    </Button>
                  ) : null} */}
                </div>
                <div>
                  Sort by{"  "}
                  <select
                    className="max-w-[200px] bg-inherit text-inherit border-[#767676] border focus:outline outline-black"
                    value={order}
                    onChange={(e) => {
                      changeParam("order", e.target.value)
                    }}
                  >
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="newest"
                    >
                      Newly Arrived
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="shared"
                    >
                      Just Shared
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="likes"
                    >
                      Likes
                    </option>
                    {/* <option className="bg-white text-black-color dark:bg-black-color dark:text-white-color" value="prices">
                      Recent Prices Drop
                    </option> */}
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="relevance"
                    >
                      Relevance
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="lowest"
                    >
                      Price: Low to High
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="highest"
                    >
                      Price: High to Low
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="toprated"
                    >
                      Avg. Customer Reviews
                    </option>
                  </select>
                </div>
              </div>
              {products.length === 0 && (
                <>
                  <MessageBox>
                    <div
                      style={{
                        marginBottom: "15px",
                      }}
                    >
                      🔎Cant't find what you're looking for? Try related
                      products!
                    </div>
                  </MessageBox>
                  {rLoading ? (
                    <LoadingBox />
                  ) : (
                    <div className="flex-1 flex flex-wrap mt-2.5">
                      {rProducts.map((product) => (
                        <div
                          className="w-1/2 lg:w-1/4 flex justify-center"
                          key={product._id}
                        >
                          <Product product={product}></Product>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className="flex flex-1 flex-wrap mt-2.5">
                {products.map((product) => (
                  <div
                    className="w-1/2 lg:w-1/4 flex justify-center"
                    key={product._id}
                  >
                    <Product product={product}></Product>
                  </div>
                ))}
              </div>
              <div className="flex gap-2.5 justify-center items-center mt-5">
                {page > 1 && (
                  <p
                    className="border w-[100px] text-center font-medium p-1 rounded-[0.2rem] border-solid hover:bg-light-ev3 dark:hover:bg-dark-ev2"
                    onClick={() =>
                      changeParam("page", +(searchParams.get("page") ?? 1) - 1)
                    }
                  >
                    Previous
                  </p>
                )}
                {pages > 1 && products.length === 40 && (
                  <p
                    className="border w-[100px] text-center font-medium p-1 rounded-[0.2rem] border-solid hover:bg-light-ev3 dark:hover:bg-dark-ev2"
                    onClick={() =>
                      changeParam("page", +(searchParams.get("page") ?? 1) + 1)
                    }
                  >
                    Next
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search