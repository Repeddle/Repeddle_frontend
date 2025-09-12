import { FormEvent, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import useCart from "../../hooks/useCart"
import Button from "../../components/ui/Button"
import { currency, region } from "../../utils/common"
import useWallet from "../../hooks/useWallet"

const PaymentMethod = () => {
  const { total, paymentMethod, changePaymentMethod } = useCart()
  const navigate = useNavigate()

  const { wallet, fetchWallet } = useWallet()

  useEffect(() => {
    fetchWallet()
  }, [])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    navigate("/placeorder")
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
          <div className="flex items-center gap-2.5 min-h-[1.5rem] mb-0.5 pl-[1.5em]">
            <input
              type="radio"
              id="card"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={() => changePaymentMethod("Card")}
            />
            <label htmlFor="card">Debit/Credit/Bank</label>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2.5 min-h-[1.5rem] mb-4 pl-[1.5em]">
            <input
              disabled={wallet.balance === 0 || wallet.balance <= total}
              type="radio"
              id="wallet"
              value="Wallet"
              checked={paymentMethod === "Wallet"}
              onChange={() => changePaymentMethod("Wallet")}
            />
            <label htmlFor="wallet">
              {`Wallet (${currency(region())} ${wallet.balance.toFixed(2)})`}
            </label>
          </div>
          {wallet.balance <= total && (
            <div className="text-[red] text-[13px] pl-[2em]">
              Insufficient balance{" "}
              <Link
                to="/dashboard/wallet"
                className="text-orange-color hover:text-malon-color"
              >
                Fund Wallet Now
              </Link>
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
