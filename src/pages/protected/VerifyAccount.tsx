import { FormEvent, useState } from "react"
import { Helmet } from "react-helmet-async"
import { region } from "../../utils/common"
import { banks } from "../../utils/constants"
import Button from "../../components/ui/Button"
import InputWithLabel2 from "../../components/ui/InputWithLabel2"
import useAuth from "../../hooks/useAuth"
import useToastNotification from "../../hooks/useToastNotification"
import { useNavigate } from "react-router-dom"

const VerifyAccount = () => {
  const { updateUser, loading, error: userError } = useAuth()
  const { addNotification } = useToastNotification()
  const navigate = useNavigate()

  const [input, setInput] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
  })

  const [error, setError] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
  })

  const handleOnChange = (text: string, inputVal: keyof typeof input) => {
    setInput((prevState) => ({ ...prevState, [inputVal]: text }))
  }

  const handleError = (errorMessage: string, inputVal: keyof typeof error) => {
    setError((prevState) => ({ ...prevState, [inputVal]: errorMessage }))
  }

  const submitHandler = async () => {
    const res = await updateUser({
      accountName: input.accountName,
      accountNumber: +input.accountNumber,
      bankName: input.bankName,
    })
    if (res) {
      addNotification("Account Verified Successfully")
      navigate("/newproduct")
    } else {
      addNotification(userError ? userError : "Failed to verify account")
    }
  }

  const validate = (e: FormEvent) => {
    e.preventDefault()
    let valid = true
    if (!input.accountNumber) {
      handleError("Enter a valid account number", "accountNumber")
      valid = false
    }
    if (!input.accountName) {
      handleError("Enter a valid account name", "accountName")
      valid = false
    }
    if (!input.bankName) {
      handleError("Select a valid bank", "bankName")
      valid = false
    }

    if (valid) {
      submitHandler()
    }
  }

  return (
    <div className="max-w-[800px] bg-light-ev1 dark:bg-dark-ev1 mx-auto my-10 p-[50px] rounded-[10px]">
      <Helmet>
        <title>Verify Account</title>
      </Helmet>

      <h3 className="my-4 text-[calc(1.3rem_+_0.6vw)] leading-[1.2]">
        Provide Your Bank Account Detail
      </h3>
      <p>
        To become a Seller, kindly provide your banking details where you can
        transfer your earnings deposited in your Repeddle wallet
      </p>

      <form onSubmit={validate} className="my-2">
        <div className="my-4">
          <InputWithLabel2
            label="Account Name"
            error={error.accountName}
            value={input.accountName}
            onFocus={() => handleError("", "accountName")}
            onChange={(e) => handleOnChange(e, "accountName")}
          />
        </div>

        <div className="y-4">
          <InputWithLabel2
            type="number"
            label="Account Number"
            error={error.accountNumber}
            value={input.accountNumber}
            onFocus={() => handleError("", "accountNumber")}
            onChange={(e) => handleOnChange(e, "accountNumber")}
          />
        </div>

        <div className="flex flex-col mt-2.5">
          <label className="text-sm">Bank Name</label>
          <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] my-2.5  border border-light-ev4 dark:border-dark-ev4">
            <select
              onChange={(e) => handleOnChange(e.target.value, "bankName")}
              onFocus={() => handleError("", "bankName")}
              className="text-base m-0 pl-2.5 border-light-ev4 dark:border-[grey] pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
            >
              {region() === "NGN"
                ? banks.Nigeria.map((x) => (
                    <option value={x.name}>{x.name}</option>
                  ))
                : banks.SouthAfrica.map((x) => (
                    <option value={x.name}>{x.name}</option>
                  ))}
            </select>
          </div>
        </div>
        <div className="text-malon-color my-2.5">
          Note: This cannot be change once saved, contact support to make any
          changes.
        </div>
        <div className="mb-3">
          <Button text="Save" type="submit" disabled={loading} />
        </div>
      </form>
    </div>
  )
}

export default VerifyAccount
