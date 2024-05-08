import { useState } from "react"
import MessageBox from "./MessageBox"
import useAuth from "../hooks/useAuth"
import LoadingBox from "./LoadingBox"
import { FaWallet } from "react-icons/fa"

type Props = {
  setShowModel: (val: boolean) => void
  setRefresh: (val: boolean) => void
  refresh: boolean
}

const PayUsers = ({ refresh, setRefresh, setShowModel }: Props) => {
  const { user } = useAuth()

  const [amount, setAmount] = useState("")
  const [userId, setUserId] = useState("")
  const [purpose, setPurpose] = useState("")

  const error = ""
  const loading = false

  const onApprove = () => {
    setRefresh(!refresh)
    setShowModel(false)
  }

  return (
    <div className="flex flex-col items-center mt-[30px] p-5">
      <FaWallet size={64} className="text-orange-color" />
      <div className="font-bold mt-2.5">Make Transfer</div>
      <div style={{ color: "grey", textTransform: "uppercase" }}>
        From {user?.username}
      </div>
      {error && <MessageBox className="text-[red]">{error}</MessageBox>}
      <input
        className="placeholder:p-2.5 text-black bg-white dark:text-white dark:bg-black h-[45px] w-full border border-malon-color mx-0 my-[25px] p-[15px] rounded-[5px]"
        type="text"
        value={userId}
        placeholder="Enter User Id"
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        className="placeholder:p-2.5 text-black bg-white dark:text-white dark:bg-black h-[45px] w-full border border-malon-color mx-0 my-[25px] p-[15px] rounded-[5px]"
        type="number"
        value={amount}
        placeholder="Enter Amount to be Added in Wallet"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="placeholder:p-2.5 text-black bg-white dark:text-white dark:bg-black h-[45px] w-full border border-malon-color mx-0 my-[25px] p-[15px] rounded-[5px]"
        type="text"
        value={purpose}
        placeholder="Enter Purpose of Payment"
        onChange={(e) => setPurpose(e.target.value)}
      />
      {loading ? (
        <LoadingBox />
      ) : (
        <div
          className="flex items-center cursor-pointer font-bold bg-orange-color text-white-color px-[50px] py-2.5 rounded-[0.2rem] hover:bg-malon-color"
          onClick={onApprove}
        >
          Continue
        </div>
      )}
    </div>
  )
}

export default PayUsers
