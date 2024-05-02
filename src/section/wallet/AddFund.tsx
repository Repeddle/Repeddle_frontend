import { useState } from "react"
import PayStack from "../../components/gateway/PayStack"
import { FaWallet } from "react-icons/fa"
import { region } from "../../utils/common"
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3"
import useAuth from "../../hooks/useAuth"
import {
  FlutterWaveResponse,
  FlutterwaveConfig,
} from "flutterwave-react-v3/dist/types"
import { PayStackCallback } from "../../types/gateway"

// TODO: ask about this, fetching in one part and in env in another part
const BASE_KEY = process.env.REACT_APP_FLUTTERWAVE_KEY

type Props = {
  setShowModel: (val: boolean) => void
  setRefresh: (val: boolean) => void
  refresh: boolean
  currency: string
}

const AddFund = ({ currency }: Props) => {
  const [amount, setAmount] = useState(0)

  const { user } = useAuth()

  const config: FlutterwaveConfig = {
    public_key: BASE_KEY!,
    // tx_ref: v4(),
    // TODO: used uuid in previous code
    tx_ref: Date.now().toString(),
    amount,
    currency: currency === "N " ? "NGN" : "ZAR",
    //currency: "ZAR",
    //country: "ZAR",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email ?? "",
      phone_number: user?.phone ?? "",
      name: `${user?.firstName} ${user?.lastName}`,
    },
    customizations: {
      title: "Repeddle",
      description: "Funding Repeddle Wallet",
      logo: "https://res.cloudinary.com/emirace/image/upload/v1669632933/qepvcjzw8pfl3q8cw9xf.png",
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  const onApprove = (
    val: (FlutterWaveResponse & { type: string }) | PayStackCallback
  ) => {
    console.log(val)
  }

  return (
    <div className="flex flex-col items-center mt-[30px] p-5">
      <FaWallet size={64} className="text-orange-color" />
      <div className="font-bold mt-2.5">Fund your Wallet</div>
      <input
        className="flex-1 text-lg border-0 focus-visible:outline-none placeholder:p-2.5 text-black-color dark:text-white-color bg-white-color dark:bg-black-color"
        type="number"
        value={amount}
        placeholder="Enter Amount to be Added in Wallet"
        onChange={(e) => setAmount(+e.target.value)}
      />
      {region() === "NGN" ? (
        <div
          className="flex items-center cursor-pointer font-bold hover:bg-malon-color bg-orange-color text-white-color mt-2.5 px-[50px] py-2.5 rounded-[0.2rem]"
          onClick={() => {
            handleFlutterPayment({
              callback: async (response) => {
                console.log(response)
                onApprove({ ...response, type: "flutterwave" })
                closePaymentModal() // this will close the modal programmatically
              },
              onClose: () => {},
            })
          }}
        >
          Continue
        </div>
      ) : (
        <PayStack amount={amount} onApprove={onApprove} />
      )}
    </div>
  )
}

export default AddFund
