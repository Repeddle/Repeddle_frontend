import { useSearchParams } from "react-router-dom"
import MessageBox from "../../components/MessageBox"
import LoadingBox from "../../components/LoadingBox"
import { Helmet } from "react-helmet-async"
import ProductItem from "../../components/ProductItem"
import { IProduct } from "../../types/product"
import SearchBox from "../../components/SearchBox"
import { BiFilter } from "react-icons/bi"
import { useEffect, useMemo, useState } from "react"
import SearchFilter from "../../components/layout/SearchFilter"
import { SearchOptionsKey } from "../../types/search"
import useCategory from "../../hooks/useCategory"
import useProducts from "../../hooks/useProducts"
import { FaTimes } from "react-icons/fa"
import useBrands from "../../hooks/useBrand"
import { createSearchParam } from "../../utils/common"
// import { colors } from "../../utils/constants"

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { categories } = useCategory()
  const { products, fetchProducts, loading, error } = useProducts()

  const { brands, fetchBrands } = useBrands()

  const changeParam = (key: "page" | "sort", val: string | number) => {
    if (val === "") {
      setSearchParams((prev) => {
        prev.delete(key)
        return prev
      })
      return
    }

    setSearchParams((prev) => {
      prev.set(key, val.toString())
      return prev
    })
  }

  const joinParm = (param: { [key: string]: string }) => {
    const params = Object.keys(param)
      .map((obj) => `${obj}:${param[obj]}`)
      .join(",")
    return params
  }

  const removeFilterParam = (key: SearchOptionsKey) => {
    const filterParam = filterParamObj

    delete filterParam[key]

    if (Object.keys(filterParam).length === 0) {
      setSearchParams((prev) => {
        prev.delete("filter")
        return prev
      })
      return
    }

    const param = joinParm(filterParam)

    setSearchParams((prev) => {
      prev.set("filter", param)
      return prev
    })
  }

  const [queryBrand] = useState("")
  const rating: { rating: number; id: string }[] = []

  const maxPrice = 500000
  const minPrice = 0

  useEffect(() => {
    const fetch = async () => {
      const params: string[][] = []

      searchParams.forEach((val, key) => params.push([key, val]))

      const string = new URLSearchParams(params).toString()

      await fetchProducts(string)
    }

    fetch()
  }, [searchParams])

  useEffect(() => {
    const params = [["search", queryBrand]]

    const string = createSearchParam(params)

    fetchBrands(string)
  }, [queryBrand])

  const filterParamObj = useMemo(() => {
    const param = searchParams.get("filter")
    const paramObj: { [key: string]: string } = {}
    if (param) {
      const paramArray = param.split(",")

      paramArray.map((val) => {
        const paramSplit = val.split(":")
        if (paramSplit.length === 2) {
          paramObj[paramSplit[0]] = paramSplit[1]
        }
      })
    }
    return paramObj
  }, [searchParams])

  const sortObj = useMemo(() => {
    const param = searchParams.get("sort")
    if (param) {
      return param
    }
  }, [searchParams])

  const rLoading = false
  const rProducts: IProduct[] = []

  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    if (showFilter) {
      document.body.classList.add("modal-open")
    }
    return () => {
      document.body.classList.remove("modal-open")
    }
  }, [showFilter])

  return (
    <div>
      <Helmet>
        <title>Search Product</title>
      </Helmet>
      <div className="flex mt-2.5">
        <SearchFilter
          queryBrand={queryBrand}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          categories={categories}
          maxPrice={maxPrice}
          minPrice={minPrice}
          rating={rating}
          brands={brands}
        />
        <div className="flex-[4] dark:bg-dark-ev1 bg-light-ev1 mb-2.5 m-0 lg:mb-5 lg:mx-2.5 lg:my-0 lg:pt-2.5 md:pt-24 p-2.5 rounded-[0.2rem]">
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
                <div className="hidden lg:flex mb-[5px] flex-col">
                  <span>
                    {products.totalCount === 0 ? "No" : products.totalCount}{" "}
                    Results
                  </span>
                </div>
                <div>
                  Sort by{"  "}
                  <select
                    className="max-w-[200px] bg-inherit text-inherit border-[#767676] border focus:outline outline-black"
                    value={sortObj}
                    onChange={(e) => {
                      changeParam("sort", e.target.value)
                    }}
                  >
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="createdAt:desc"
                    >
                      Newly Arrived
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="shared:desc"
                    >
                      Just Shared
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="likes:desc"
                    >
                      Likes
                    </option>

                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value=""
                    >
                      Relevance
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="sellingPrice:asc"
                    >
                      Price: Low to High
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="sellingPrice:desc"
                    >
                      Price: High to Low
                    </option>
                    <option
                      className="bg-white text-black-color dark:bg-black-color dark:text-white-color"
                      value="rating:desc"
                    >
                      Avg. Customer Reviews
                    </option>
                  </select>
                </div>
              </div>

              <div className="hidden lg:flex gap-2 mt-2">
                {Object.entries(filterParamObj).map((val) => (
                  <span
                    key={val[0]}
                    className="flex gap-2 items-center bg-orange-color hover:bg-malon-color text-white dark:text-black px-2.5 py-1.5 rounded-lg"
                  >
                    <FaTimes
                      className="cursor-pointer"
                      onClick={() =>
                        removeFilterParam(val[0] as SearchOptionsKey)
                      }
                    />
                    <span className="first-letter:capitalize">
                      {val[0]} : {val[1]}
                    </span>
                  </span>
                ))}
              </div>

              {products.products.length === 0 && (
                <>
                  <MessageBox>
                    <div className="mb-[15px]">
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
                          <ProductItem product={product}></ProductItem>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className="flex flex-1 flex-wrap mt-2.5">
                {products.products.map((product) => (
                  <div
                    className="w-1/2 lg:w-1/4 flex justify-center"
                    key={product._id}
                  >
                    <ProductItem product={product}></ProductItem>
                  </div>
                ))}
              </div>
              <div className="flex gap-2.5 justify-center items-center mt-5">
                {products.currentPage > 1 && (
                  <p
                    className="border w-[100px] text-center font-medium p-1 rounded-[0.2rem]  hover:bg-light-ev3 dark:hover:bg-dark-ev2"
                    onClick={() =>
                      changeParam("page", +(searchParams.get("page") ?? 1) - 1)
                    }
                  >
                    Previous
                  </p>
                )}
                {products.totalPages > 1 && (
                  <p
                    className="border w-[100px] text-center font-medium p-1 rounded-[0.2rem]  hover:bg-light-ev3 dark:hover:bg-dark-ev2"
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
