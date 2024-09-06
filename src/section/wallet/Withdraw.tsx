/* eslint-disable @typescript-eslint/ban-ts-comment */
// TODO: remove this when it is resolved
import { ChangeEvent, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import useAuth from "../../hooks/useAuth"
import { FaQuestionCircle, FaWallet } from "react-icons/fa"
import MessageBox from "../../components/MessageBox"
import { UserBalance } from "../../types/user"

type Props = {
  setShowModel: (val: boolean) => void
  setRefresh: (val: boolean) => void
  refresh: boolean
  balance: UserBalance
}

// TODO: account information is not part of logged in data

const Withdraw = ({ balance }: Props) => {
  const loading = false
  const error = ""

  const { user } = useAuth()

  const [amount, setAmount] = useState(0)
  const [fee] = useState("")
  const [errormsg] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value)
    // dispatch({ type: "FETCH_FAIL", payload: "" });
  }

  const handleWithdraw = () => {}

  return loading ? (
    <LoadingBox />
  ) : // @ts-ignore
  !user?.accountName ? (
    <div className="w-full h-full flex justify-center items-center p-10">
      <div className="text-center">
        <h5>ADD A BANK ACCOUNT DETAILS</h5>
        <p>
          Go to your Profile, Edit and Add your Bank Account to request for a
          Withdrawal
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center mt-[30px] p-5">
      <FaWallet size={64} className="text-orange-color" />
      {/* @ts-ignore */}
      <div className="font-bold mt-2.5">To {user.accountName}</div>
      <div className="text-[grey] uppercase">
        {/* @ts-ignore */}
        {user.bankName} ({user.accountNumber})
      </div>
      {error && <MessageBox className="text-[red]">{error}</MessageBox>}
      <div className="text-right w-full mt-[25px]">bal: {balance.balance}</div>
      <div className="h-[45px] w-full border border-malon-color flex items-center p-[5px] rounded-[5px]">
        <input
          className="flex-1 text-lg border-0 focus-visible:outline-none placeholder:p-2.5 text-black-color dark:text-white-color bg-white-color dark:bg-black-color"
          type="number"
          value={amount}
          placeholder="Enter Amount to Withdraw"
          onChange={handleChange}
        />
        <div
          className="text-orange-color font-bold cursor-pointer"
          onClick={() => setAmount(Math.floor(balance.balance * 100) / 100)}
        >
          All
        </div>
      </div>
      {errormsg ? (
        <div className="text-[red] text-[11px]">{errormsg}</div>
      ) : null}
      {amount ? (
        <div className="text-[11px] flex items-center gap-2">
          <FaQuestionCircle /> You will be charged {balance.currency}
          {fee} for payment gateway withdrawal processing fee
        </div>
      ) : null}
      <div
        className="flex items-center cursor-pointer font-bold hover:bg-malon-color bg-orange-color text-white-color mt-2.5 px-[50px] py-2.5 rounded-[0.2rem]"
        onClick={errormsg ? undefined : handleWithdraw}
      >
        Withdraw
      </div>
    </div>
  )
}

export default Withdraw
