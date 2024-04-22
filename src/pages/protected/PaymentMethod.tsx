import { FormEvent, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import useCart from "../../hooks/useCart"
import Button from "../../components/ui/Button"

type PaymentType = "card" | "wallet"

const PaymentMethod = () => {
  const [paymentMethodName, setPaymentMethod] = useState<PaymentType>()

  const { total } = useCart()
  const balance = 0

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="bs-container">
      <Helmet>
        <title>Payment Methods</title>
      </Helmet>
      <h1 className="my-4 font-medium leading-[1.2] text-[calc(1.375rem_+_1.5vw)]">
        Payment Methods
      </h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <div className="block min-h-[1.5rem] mb-0.5 pl-[1.5em]">
            <input
              type="radio"
              id="card"
              value="card"
              checked={paymentMethodName === "card"}
              onChange={(e) => setPaymentMethod(e.target.value as "card")}
            />
            <label htmlFor="card">Debit/Credit/Bank</label>
          </div>
        </div>

        <div className="mb-4">
          <div className="block min-h-[1.5rem] mb-0.5 pl-[1.5em]">
            <input
              disabled={balance === 0 || balance <= total}
              type="radio"
              id="wallet"
              value="wallet"
              checked={paymentMethodName === "wallet"}
              onChange={(e) => setPaymentMethod(e.target.value as "wallet")}
            />
            <label htmlFor="wallet">
              {/* TODO:  */}
              {/* {`Wallet (${currency}${balance.toFixed(2)})`} */}
              {`Wallet (N ${balance.toFixed(2)})`}
            </label>
          </div>
          {balance <= total && (
            <div className="text-[red] text-[13px]">
              Insufficient balance{" "}
              <Link to="/dashboard/wallet">Fund Wallet Now</Link>
            </div>
          )}
        </div>
        <div className="mb-4">
          <Button type="submit" text="Continue" />
        </div>
      </form>
    </div>
  )
}

export default PaymentMethod
