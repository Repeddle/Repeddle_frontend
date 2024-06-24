import { FaTimes } from "react-icons/fa"
import SearchBrands from "./SearchBrands"
import SearchPrice from "./SearchPrice"
import SearchDeals from "./SearchDeals"
import SearchDropDown from "./SearchDropDown"
import { SearchOptions, SearchOptionsKey } from "../../../types/search"
import SearchRatings from "./SearchRatings"
import SearchColor from "./SearchColor"
import SearchSizes from "./SearchSizes"
import { useSearchParams } from "react-router-dom"
import { ICategory } from "../../../types/category"
import {
  availabilitylist,
  conditionlist,
  deals,
  patternlist,
  ratings,
  shippinglist,
  sizelist,
  typelist,
} from "../../../utils/constants"
import { useCallback, useEffect, useState } from "react"

type Props = {
  setShowFilter: (val: boolean) => void
  showFilter: boolean
  queryBrand: string
  categories: ICategory[]
  rating: { rating: number; id: string }[]
  brands: { name: string; _id: string }[]
  minPrice: number
  maxPrice: number
}

const SearchFilter = ({
  setShowFilter,
  showFilter,
  queryBrand,
  brands,
  categories,
  maxPrice,
  minPrice,
}: Props) => {
  const countProducts = 0

  const [searchParams, setSearchParams] = useSearchParams()

  const [params, setParams] = useState<SearchOptions>({})

  const getParam = (key: SearchOptionsKey) => params[key]?.toString() ?? "all"

  const changeFilterParam = (key: SearchOptionsKey, val: string | number) => {
    if (val === "all") return removeFilterParam(key)
    const filterParam = getFilterParamObj()
    filterParam[key] = val.toString()

    const param = joinFilterParm(filterParam)

    setSearchParams((prev) => {
      prev.set("filter", param)
      prev.delete("page")

      return prev
    })
  }

  const getFilterParamObj = useCallback(() => {
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

  const joinFilterParm = (param: { [key: string]: string }) => {
    const params = Object.keys(param)
      .map((obj) => `${obj}:${param[obj]}`)
      .join(",")
    return params
  }

  const removeFilterParam = (key: SearchOptionsKey) => {
    const filterParam = getFilterParamObj()

    delete filterParam[key]

    if (Object.keys(filterParam).length === 0) {
      setSearchParams((prev) => {
        prev.delete("filter")
        return prev
      })
      return
    }

    const param = joinFilterParm(filterParam)

    setSearchParams((prev) => {
      prev.set("filter", param)
      return prev
    })
  }

  useEffect(() => {
    const val = getFilterParamObj()
    setParams(val)
  }, [getFilterParamObj])

  return (
    <div
      className={`flex-1 lg:block lg:z-0 lg:transition-none pt-20 pb-20 lg:pt-0 lg:sticky mb-5 rounded-[0.2rem] lg:top-[168px] lg:h-auto 
      dark:bg-dark-ev1 bg-light-ev1 transition-[left] duration-[2s] z-[9] fixed h-screen
      lg:overflow-visible overflow-auto lg:w-auto w-screen top-0 ${
        showFilter ? "left-0 block" : "hidden -left-[100vw]"
      }`}
    >
      <div
        className="flex py-2.5 px-5 justify-end lg:hidden"
        onClick={() => setShowFilter(false)}
      >
        <FaTimes size={15} />
      </div>
      {showFilter && (
        <div
          className="fixed lg:hidden -translate-x-1/2 bg-orange-color w-1/2 text-center z-[9] text-white-color rounded-[0.2rem] px-[7px] py-[5px] left-1/2 bottom-20"
          onClick={() => {
            setShowFilter(false)
            window.scrollTo(0, 0)
          }}
        >
          Apply Filter ({countProducts ? countProducts : 0})
        </div>
      )}

      <div className="p-5 pt-10">
        <SearchDropDown
          title="Categories"
          all={{ category: "all" }}
          allText="All"
          changeParam={(val: string) =>
            val === "all"
              ? removeFilterParam("category")
              : changeFilterParam("category", val)
          }
          list={categories}
          selectedItem={getParam("category")}
        />

        <SearchBrands
          brand="all"
          changeParam={(val: string) =>
            val === "all"
              ? removeFilterParam("brand")
              : changeFilterParam("brand", val)
          }
          queryBrand={queryBrand}
          searchBrand={brands}
          selectedBrand={getParam("brand")}
        />

        <SearchPrice
          maxPrice={maxPrice}
          minPrice={minPrice}
          currency="N"
          changeParam={changeFilterParam}
        />

        <SearchDeals
          selectedDeal={getParam("deal")}
          deals={deals}
          changeParam={(val: string) => changeFilterParam("deal", val)}
        />

        <SearchRatings
          title="Rating"
          all={{ rating: "all" }}
          changeParam={(val: string) => changeFilterParam("rating", val)}
          list={ratings}
          selectedRating={getParam("rating")}
        />

        <SearchColor
          changeParam={(val: string) => changeFilterParam("color", val)}
          selectedColor={getParam("color")}
        />

        <SearchSizes
          changeParam={(val: string) => changeFilterParam("size", val)}
          selectedSize={getParam("size")}
          sizes={sizelist}
        />

        <SearchDropDown
          title="Shipping"
          all={{ shipping: "all" }}
          allText="All"
          changeParam={(val: string) =>
            val === "all"
              ? removeFilterParam("shipping")
              : changeFilterParam("shipping", val)
          }
          list={shippinglist}
          selectedItem={getParam("shipping")}
        />

        <SearchDropDown
          title="Condition"
          all={{ condition: "all" }}
          allText="All Condition"
          changeParam={(val: string) =>
            val === "all"
              ? removeFilterParam("condition")
              : changeFilterParam("condition", val)
          }
          list={conditionlist}
          selectedItem={getParam("condition")}
        />

        <SearchDropDown
          title="Availability"
          all={{ availability: "all" }}
          allText="All"
          changeParam={(val: string) =>
            val === "all"
              ? removeFilterParam("availability")
              : changeFilterParam("availability", val)
          }
          list={availabilitylist}
          selectedItem={getParam("availability")}
        />

        <SearchDropDown
          title="Type"
          all={{ type: "all" }}
          allText="All"
          changeParam={(val: string) =>
            val === "all"
              ? removeFilterParam("type")
              : changeFilterParam("type", val)
          }
          list={typelist}
          selectedItem={getParam("type")}
        />

        <SearchDropDown
          title="Pattern & Printed"
          all={{ pattern: "all" }}
          allText="All"
          changeParam={(val: string) =>
            val === "all"
              ? removeFilterParam("pattern")
              : changeFilterParam("pattern", val)
          }
          list={patternlist}
          selectedItem={getParam("pattern")}
        />
      </div>
    </div>
  )
}

export default SearchFilter
