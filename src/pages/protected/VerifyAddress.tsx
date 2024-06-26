import { FormEvent, useState } from "react"
import { Helmet } from "react-helmet-async"
import InputWithLabel2 from "../../components/ui/InputWithLabel2"
import { region } from "../../utils/common"
import { states } from "../../utils/constants"
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import useToastNotification from "../../hooks/useToastNotification"
import useAuth from "../../hooks/useAuth"

const VerifyAddress = () => {
  const { updateUser, loading, error: userError } = useAuth()
  const { addNotification } = useToastNotification()
  const navigate = useNavigate()

  const [input, setInput] = useState({
    street: "",
    apartment: "",
    zipcode: "",
    state: "",
  })

  const [error, setError] = useState({
    street: "",
    apartment: "",
    zipcode: "",
    state: "",
  })

  const handleOnChange = (text: string, inputVal: keyof typeof input) => {
    setInput((prevState) => ({ ...prevState, [inputVal]: text }))
  }

  const handleError = (errorMessage: string, inputVal: keyof typeof error) => {
    setError((prevState) => ({ ...prevState, [inputVal]: errorMessage }))
  }

  const validate = (e: FormEvent) => {
    e.preventDefault()
    let valid = true
    if (!input.street) {
      handleError("Enter your street", "street")
      valid = false
    }
    if (!input.apartment) {
      handleError("Enter your apartment", "apartment")
      valid = false
    }
    if (!input.state) {
      handleError("Select your state/province", "state")
      valid = false
    }
    if (!input.zipcode) {
      handleError("Enter your zip code", "zipcode")
      valid = false
    }

    if (valid) {
      submitHandler()
    }
  }
  const submitHandler = async () => {
    const res = await updateUser({
      address: {
        state: input.state,
        street: input.street,
        apartment: input.apartment,
        zipcode: +input.zipcode,
      },
    })
    if (res) {
      addNotification("Address Verified Successfully")
      navigate("/newproduct")
    } else {
      addNotification(userError ?? "Failed to verify address")
    }
  }

  return (
    <div className="max-w-[800px] bg-light-ev1 dark:bg-dark-ev1 mx-auto my-10 p-[50px] rounded-[10px]">
      <Helmet>
        <title>Verify Address</title>
      </Helmet>

      <h3 className="my-4 text-[calc(1.3rem_+_0.6vw)] leading-[1.2]">
        Provide Your Receive/Return Address
      </h3>
      <p>
        The provided address may be use for return should there be a need. This
        address is not displayed to buyers.
      </p>
      <form onSubmit={validate} className="my-2">
        <div className="my-4">
          <InputWithLabel2
            label="Street"
            error={error.street}
            value={input.street}
            onFocus={() => handleError("", "street")}
            onChange={(e) => handleOnChange(e, "street")}
          />
        </div>

        <div className="y-4">
          <InputWithLabel2
            type="number"
            label="Apartment Number"
            error={error.apartment}
            value={input.apartment}
            onFocus={() => handleError("", "apartment")}
            onChange={(e) => handleOnChange(e, "apartment")}
          />
        </div>

        <div className="flex flex-col mt-2.5">
          <label className="text-sm">State</label>
          <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] my-2.5  border border-light-ev4 dark:border-dark-ev4">
            <select
              onChange={(e) => handleOnChange(e.target.value, "state")}
              onFocus={() => handleError("", "state")}
              className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
            >
              {region() === "NGN"
                ? states.Nigeria.map((x) => <option value={x}>{x}</option>)
                : states.SouthAfrican.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
            </select>
          </div>
        </div>

        <div className="my-4">
          <InputWithLabel2
            label="Zip Code"
            type="number"
            error={error.zipcode}
            value={input.zipcode}
            onFocus={() => handleError("", "zipcode")}
            onChange={(e) => handleOnChange(e, "zipcode")}
          />
        </div>

        <div className="text-malon-color my-2.5">
          Note: This can be edited later in your profile screen
        </div>

        <div className="mb-3">
          <Button text="Save" type="submit" isLoading={loading} />
        </div>
      </form>
    </div>
  )
}

export default VerifyAddress
