import { FaTimes } from "react-icons/fa"
import SearchBrands from "./SearchBrands"
import SearchPrice from "./SearchPrice"
import SearchDeals from "./SearchDeals"
import SearchDropDown from "./SearchDropDown"
import { SearchOptionsObject } from "../../../types/search"
import SearchRatings from "./SearchRatings"
import SearchColor from "./SearchColor"
import SearchSizes from "./SearchSizes"

type Props = {
  setShowFilter: (val: boolean) => void
  showFilter: boolean
  setQueryBrand: (val: string) => void
  queryBrand: string
}

const SearchFilter = ({
  setShowFilter,
  showFilter,
  setQueryBrand,
  queryBrand,
}: Props) => {
  const categories: { name: string; id: string }[] = []
  const selectedCategory = ""

  const rating: { rating: number; id: string }[] = []
  const selectedRating = ""

  const sizes: { rating: number; id: string }[] = []
  const selectedSize = ""

  const colors: { rating: number; id: string }[] = []
  const selectedColor = ""

  const shipping: { name: string; id: string }[] = []
  const selectedShipping = ""

  const condition: { name: string; id: string }[] = []
  const selectedCondition = ""

  const availability: { name: string; id: string }[] = []
  const selectedAvailability = ""

  const type: { name: string; id: string }[] = []
  const selectedType = ""

  const pattern: { name: string; id: string }[] = []
  const selectedPattern = ""

  const brands: { name: string; _id: string }[] = []

  const getFilterUrl = (val: SearchOptionsObject) => {
    console.log(val)
    return ""
  }
  const deals: any[] = []

  const countProducts = 0

  const setSelectedBrand = (val: string) => {
    console.log(val)
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
          getFilterUrl={getFilterUrl}
          list={categories}
          selectedItem={selectedCategory}
        />

        <SearchBrands
          brand="all"
          getFilterUrl={getFilterUrl}
          queryBrand={queryBrand}
          searchBrand={brands}
          selectedBrand=""
          setQueryBrand={setQueryBrand}
          setSelectedBrand={setSelectedBrand}
        />

        <SearchPrice currency="N" getFilterUrl={getFilterUrl} />

        <SearchDeals deal="all" deals={deals} getFilterUrl={getFilterUrl} />

        <SearchRatings
          title="Rating"
          all={{ rating: "all" }}
          allText="& up"
          getFilterUrl={getFilterUrl}
          list={rating}
          selectedItem={selectedRating}
        />

        <SearchColor
          getFilterUrl={getFilterUrl}
          colors={colors}
          selectedColor={selectedColor}
        />

        {/* color  */}
        <SearchSizes
          getFilterUrl={getFilterUrl}
          selectedSize={selectedSize}
          sizes={sizes}
        />

        <SearchDropDown
          title="Shipping"
          all={{ shipping: "all" }}
          allText="All Product"
          getFilterUrl={getFilterUrl}
          list={shipping}
          selectedItem={selectedShipping}
        />

        <SearchDropDown
          title="Condition"
          all={{ condition: "all" }}
          allText="All Condition"
          getFilterUrl={getFilterUrl}
          list={condition}
          selectedItem={selectedCondition}
        />

        <SearchDropDown
          title="Condition"
          all={{ condition: "all" }}
          allText="All Condition"
          getFilterUrl={getFilterUrl}
          list={condition}
          selectedItem={selectedCondition}
        />

        <SearchDropDown
          title="Availability"
          all={{ availability: "all" }}
          allText="All"
          getFilterUrl={getFilterUrl}
          list={availability}
          selectedItem={selectedAvailability}
        />

        <SearchDropDown
          title="Type"
          all={{ type: "all" }}
          allText="All"
          getFilterUrl={getFilterUrl}
          list={type}
          selectedItem={selectedType}
        />

        <SearchDropDown
          title="Pattern & Printed"
          all={{ pattern: "all" }}
          allText="All"
          getFilterUrl={getFilterUrl}
          list={pattern}
          selectedItem={selectedPattern}
        />
      </div>
    </div>
  )
}

export default SearchFilter
