import { useState } from "react"
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"
import useAuth from "../../hooks/useAuth"
import { FlutterwaveConfig } from "flutterwave-react-v3/dist/types"
import { IUser } from "../../types/user"

type Props = {
  amount: number
  currency: string
  onApprove: (val: { transaction_id: string; type: string }) => void
  user?: IUser | { email: string; name: string; phone: string }
}

const FlutterWave = ({
  amount,
  currency,
  onApprove,
  user: userData,
}: Props) => {
  const [baseKey] = useState("FLWPUBK_TEST-6a1e30713a8c6962ecb7d6cfbda2df69-X")

  const { user } = useAuth()

  const usedUser = userData ?? user

  //   TODO: Take customer info from shipping address ??
  const config: FlutterwaveConfig = {
    public_key: baseKey,
    tx_ref: Date.now().toString(),
    amount,
    currency,
    payment_options:
      "card, account, banktransfer, mpesa, barter, nqr, ussd, credit",
    customer: {
      email: usedUser?.email ?? "",
      phone_number: usedUser?.phone ?? "",
      name:
        usedUser && "name" in usedUser
          ? `${usedUser.name}`
          : `${usedUser?.firstName} ${usedUser?.lastName}`,
    },
    customizations: {
      title: "Repeddle",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  return (
    <div className="App">
      <div
        className="cursor-pointer text-white-color w-full uppercase flex items-center justify-center h-10 mt-2.5 rounded-[0.2rem] bg-orange-color hover:bg-malon-color"
        onClick={() => {
          handleFlutterPayment({
            callback: async (response) => {
              onApprove({
                transaction_id: response.transaction_id.toString(),
                type: "flutterwave",
              })
              closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          })
        }}
      >
        Proceed to Payment
      </div>
    </div>
  )
}

export default FlutterWave
