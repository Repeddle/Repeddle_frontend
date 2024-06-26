import useAuth from "../../hooks/useAuth"
import { region } from "../../utils/common"
import { usePaystackPayment } from "react-paystack"
import { HookConfig } from "react-paystack/dist/types"
import { PaystackResponse, PayStackCallback } from "../../types/gateway"

type Props = {
  amount: number
  onApprove: (val: PayStackCallback) => void
}

const PayStack = ({ amount, onApprove }: Props) => {
  const { user } = useAuth()

  const config: HookConfig = {
    reference:
      "REP_" +
      Math.floor(Math.random() * 1000 + 1) +
      new Date().getTime().toString(),
    email: user?.email,
    amount: amount * 100,
    publicKey: "pk_live_96998e69a31a4a9d1afc9ec874dec535657ce0ad",
    currency: region(),
  }

  // you can call this function anything
  //   TODO: confirm response type
  const onSuccess = (reference: PaystackResponse) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference)
    onApprove({ transaction_id: reference.reference, type: "paystack" })
  }

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed")
    // onClose();
  }

  const initializePayment = usePaystackPayment(config)

  return (
    <div
      className="cursor-pointer text-white-color w-full uppercase flex items-center justify-center h-10 mt-2.5 rounded-[0.2rem] bg-orange-color hover:bg-malon-color"
      onClick={() => {
        initializePayment({ onSuccess, onClose })
      }}
    >
      Continue to Payment
    </div>
  )
}

export default PayStack
