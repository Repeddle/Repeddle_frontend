import { useState } from "react"
import LoadingBox from "./LoadingBox"
import useBrands from "../hooks/useBrand"
import useAuth from "../hooks/useAuth"
import useToastNotification from "../hooks/useToastNotification"

type Props = {
  setShowOtherBrand: (val: boolean) => void
  handleOnChange: (val: string, key: "brand") => void
}

const AddOtherBrand = ({ handleOnChange, setShowOtherBrand }: Props) => {
  const { createBrand, error, loading } = useBrands()
  const { user } = useAuth()
  const { addNotification } = useToastNotification()

  const [err, setErr] = useState("")

  const [brand, setBrand] = useState("")

  const addOtherBrand = async () => {
    const res = await createBrand({
      name: brand,
      published: user?.role === "Admin" ? true : false,
    })

    if (res) {
      if (user?.role === "Admin") {
        addNotification("Brand has been added")
        handleOnChange(brand, "brand")
      } else {
        addNotification("Brand has been added and awaiting approval")
      }

      setShowOtherBrand(false)
      setBrand("")
      return
    }
    setErr(error)
  }

  return (
    <div className="p-8">
      <div className="flex flex-col mt-2.5">
        <label className="mb-[5px] text-sm mr-2.5">Enter brand name</label>
        <input
          className="w-[250px] h-[30px] border-light-ev3 dark:border-dark-ev3 border pl-2.5 bg-transparent focus:border focus:border-orange-color"
          name="brand"
          type="text"
          onChange={(e) => setBrand(e.target.value)}
          onFocus={() => setErr("")}
          value={brand}
        />
      </div>
      {err && <div className="text-[red]">{err}</div>}
      {loading ? (
        <LoadingBox />
      ) : (
        <button
          className="cursor-pointer text-white bg-orange-color mt-[5px] p-[5px] rounded-[0.2rem] border-none"
          onClick={addOtherBrand}
        >
          Add
        </button>
      )}
    </div>
  )
}

export default AddOtherBrand
