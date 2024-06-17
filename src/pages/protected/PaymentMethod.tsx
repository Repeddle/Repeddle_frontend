import { FormEvent, useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import useCart from "../../hooks/useCart"
import Button from "../../components/ui/Button"
import { currency, region } from "../../utils/common"
import useAuth from "../../hooks/useAuth"

const PaymentMethod = () => {
  const { total, paymentMethod, changePaymentMethod } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    navigate("/placeorder")
  }

  const balance = useMemo(() => user?.balance ?? 0, [user?.balance])

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
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) => changePaymentMethod(e.target.value as "Card")}
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
              value="Wallet"
              checked={paymentMethod === "Wallet"}
              onChange={(e) => changePaymentMethod(e.target.value as "Wallet")}
            />
            <label htmlFor="wallet">
              {`Wallet (${currency(region())} ${balance.toFixed(2)})`}
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
