import { useState } from "react"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { SearchOptionsKey } from "../../../types/search"

type Props = {
  currency: string
  changeParam: (key: SearchOptionsKey, val: number) => void
  minPrice: number
  maxPrice: number
}

const SearchPrice = ({ currency, changeParam, maxPrice, minPrice }: Props) => {
  const [open, setOpen] = useState(true)
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const handleAfterPriceChange = (values: number[]) => {
    const [minValue, maxValue] = priceRange
    const [newMinValue, newMaxValue] = values
    if (minValue !== newMinValue) {
      changeParam("minPrice", newMinValue)
    }

    if (maxValue !== newMaxValue) {
      changeParam("maxPrice", newMaxValue)
    }
  }

  return (
    <div className="mb-2.5">
      <h4
        className={`text-sm cursor-pointer relative z-[1] after:content-["_"] after:w-2 after:h-2
        after:-translate-y-2/4 after:absolute after:border-b mb-2 after:border-solid
        after:border-l after:right-5 after:top-2/4 ${
          open ? "after:-rotate-45" : "after:rotate-[135deg]"
        }`}
        onClick={() => setOpen(!open)}
      >
        Prices
      </h4>
      <div
        className={`h-0 overflow-hidden transition-[0.5s] p-[5px] pl-5 ${
          open ? "after:content-[''] after:rotate-[135deg] h-full" : ""
        }`}
      >
        <div className="mb-[5px]">
          Minimum Price: {currency} {priceRange[0]}
          <br />
          Maximum Price: {currency} {priceRange[1]}
        </div>
        <Slider
          range
          min={0}
          max={currency === "R " ? 100000 : 500000}
          value={priceRange}
          onChange={(val) => Array.isArray(val) && handlePriceChange(val)}
          onChangeComplete={(val) =>
            Array.isArray(val) && handleAfterPriceChange(val)
          }
          styles={{
            track: { backgroundColor: "var(--orange-color)", height: "8px" },
            rail: { backgroundColor: "grey", height: "8px" },
            handle: {
              borderColor: "#F79533",
              height: "14px",
              width: "14px",
              marginLeft: "-7px",
              marginTop: "-3px",
              backgroundColor: "white",
            },
          }}
        />
      </div>
    </div>
  )
}

export default SearchPrice
