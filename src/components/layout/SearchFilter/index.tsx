import { FaTimes } from "react-icons/fa"
import SearchBrands from "./SearchBrands"
import SearchPrice from "./SearchPrice"
import SearchDeals from "./SearchDeals"
import SearchDropDown from "./SearchDropDown"
import { SearchOptionsKey } from "../../../types/search"
import SearchRatings from "./SearchRatings"
import SearchColor from "./SearchColor"
import SearchSizes from "./SearchSizes"
import { useSearchParams } from "react-router-dom"

type Props = {
  setShowFilter: (val: boolean) => void
  showFilter: boolean
  queryBrand: string
  categories: { name: string; id: string }[]
  rating: { rating: number; id: string }[]
  sizes: { rating: number; id: string }[]
  colors: { rating: number; id: string }[]
  shipping: { name: string; id: string }[]
  condition: { name: string; id: string }[]
  availability: { name: string; id: string }[]
  type: { name: string; id: string }[]
  pattern: { name: string; id: string }[]
  brands: { name: string; _id: string }[]
  deals: any[]
  minPrice: number
  maxPrice: number
}

const SearchFilter = ({
  setShowFilter,
  showFilter,
  queryBrand,
  availability,
  brands,
  categories,
  colors,
  condition,
  deals,
  pattern,
  rating,
  shipping,
  sizes,
  type,
  maxPrice,
  minPrice,
}: Props) => {
  const countProducts = 0

  const [searchParams, setSearchParams] = useSearchParams()

  const getParam = (key: SearchOptionsKey) => searchParams.get(key) ?? "all"

  const changeParam = (key: SearchOptionsKey, val: string | number) => {
    setSearchParams((prev) => {
      prev.set(key, val.toString())
      return prev
    })
  }

  return (
    <div
      className={`flex-1 lg:block lg:z-0 lg:transition-none lg:sticky mb-5 rounded-[0.2rem] lg:top-[168px] lg:h-auto 
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
          className="fixed -translate-x-1/2 bg-orange-color w-full text-center z-[9] text-white-color px-[7px] py-[5px] left-1/2 bottom-0"
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
          changeParam={(val: string) => changeParam("category", val)}
          list={categories}
          selectedItem={getParam("category")}
        />

        <SearchBrands
          brand="all"
          changeParam={(val: string) => changeParam("brand", val)}
          queryBrand={queryBrand}
          searchBrand={brands}
          selectedBrand={getParam("brand")}
        />

        <SearchPrice
          maxPrice={maxPrice}
          minPrice={minPrice}
          currency="N"
          changeParam={changeParam}
        />

        <SearchDeals
          selectedDeal={getParam("deal")}
          deals={deals}
          changeParam={(val: string) => changeParam("deal", val)}
        />

        <SearchRatings
          title="Rating"
          all={{ rating: "all" }}
          allText="& up"
          changeParam={(val: string) => changeParam("rating", val)}
          list={rating}
          selectedRating={getParam("rating")}
        />

        <SearchColor
          changeParam={(val: string) => changeParam("color", val)}
          colors={colors}
          selectedColor={getParam("color")}
        />

        <SearchSizes
          changeParam={(val: string) => changeParam("size", val)}
          selectedSize={getParam("size")}
          sizes={sizes}
        />

        <SearchDropDown
          title="Shipping"
          all={{ shipping: "all" }}
          allText="All Product"
          changeParam={(val: string) => changeParam("shipping", val)}
          list={shipping}
          selectedItem={getParam("shipping")}
        />

        <SearchDropDown
          title="Condition"
          all={{ condition: "all" }}
          allText="All Condition"
          changeParam={(val: string) => changeParam("condition", val)}
          list={condition}
          selectedItem={getParam("condition")}
        />

        <SearchDropDown
          title="Availability"
          all={{ availability: "all" }}
          allText="All"
          changeParam={(val: string) => changeParam("availability", val)}
          list={availability}
          selectedItem={getParam("availability")}
        />

        <SearchDropDown
          title="Type"
          all={{ type: "all" }}
          allText="All"
          changeParam={(val: string) => changeParam("type", val)}
          list={type}
          selectedItem={getParam("type")}
        />

        <SearchDropDown
          title="Pattern & Printed"
          all={{ pattern: "all" }}
          allText="All"
          changeParam={(val: string) => changeParam("pattern", val)}
          list={pattern}
          selectedItem={getParam("pattern")}
        />
      </div>
    </div>
  )
}

export default SearchFilter
