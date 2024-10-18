import { useState } from "react";
import PayStack from "../../components/gateway/PayStack";
import { FaWallet } from "react-icons/fa";
import { region } from "../../utils/common";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import useAuth from "../../hooks/useAuth";
import {
  FlutterWaveResponse,
  FlutterwaveConfig,
} from "flutterwave-react-v3/dist/types";
import { PayStackCallback } from "../../types/gateway";
import useWallet from "../../hooks/useWallet";
import useToastNotification from "../../hooks/useToastNotification";
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal";

// TODO: ask about this, fetching in one part and in env in another part
// const BASE_KEY = process.env.REACT_APP_FLUTTERWAVE_KEY
const BASE_KEY = "FLWPUBK_TEST-6a1e30713a8c6962ecb7d6cfbda2df69-X";

type Props = {
  setShowModel: (val: boolean) => void;
  setShowSuccess?: (val: boolean) => void;
  setRefresh: (val: boolean) => void;
  refresh: boolean;
  currency: "NGN" | "ZAR";
};

const AddFund = ({
  currency,
  setShowSuccess,
  setRefresh,
  setShowModel,
}: Props) => {
  const { fundWalletFlutter, loading } = useWallet();
  const { addNotification } = useToastNotification();

  const [amount, setAmount] = useState(0);

  const { user } = useAuth();

  const config: FlutterwaveConfig = {
    public_key: BASE_KEY!,
    // tx_ref: v4(),
    // TODO: used uuid in previous code
    tx_ref: Date.now().toString(),
    amount,
    currency,
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
  };

  const handleFlutterPayment = useFlutterwave(config);

  const onApprove = async (
    val: (FlutterWaveResponse & { type: string }) | PayStackCallback
  ) => {
    const { error, result } = await fundWalletFlutter({
      amount,
      paymentProvider: "Flutterwave",
      transactionId: val.transaction_id.toString(),
    });

    if (!error) {
      addNotification(result);
      setRefresh(true);
      setShowSuccess(true);
      setAmount(0);
      setShowModel(false);
    } else {
      addNotification(result, undefined, true);
    }
  };

  return (
    <div className="flex flex-col items-center mt-[30px] p-5">
      {loading && <LoadingLogoModal />}
      <FaWallet size={64} className="text-orange-color" />
      <div className="font-bold mt-2.5 capitalize">Fund your Wallet</div>
      <input
        className="h-[45px] w-full border border-malon-color mx-0 my-[25px] p-[15px] numeric-arrow rounded-[5px] focus-within:border-orange-color focus-visible:outline-orange-color focus-visible:outline-1 text-black dark:text-white bg-white dark:bg-black placeholder:p-2"
        type="number"
        value={amount}
        placeholder="Enter Amount to be Added in Wallet"
        onChange={(e) => {
          const value = e.target.value;

          const parsedValue =
            value.startsWith("0") && value.length > 1
              ? value.replace(/^0+/, "")
              : value;

          setAmount(parsedValue ? parseFloat(parsedValue) : 0);
        }}
      />
      {region() === "NGN" ? (
        <div
          className="flex items-center cursor-pointer font-bold hover:bg-malon-color bg-orange-color text-white-color mt-2.5 px-[50px] py-2.5 rounded-[0.2rem]"
          onClick={() => {
            console.log(config);
            handleFlutterPayment({
              callback: async (response) => {
                console.log(response);
                onApprove({ ...response, type: "flutterwave" });
                closePaymentModal(); // this will close the modal programmatically
              },
              onClose: () => {},
            });
          }}
        >
          Continue
        </div>
      ) : (
        <PayStack amount={amount} onApprove={onApprove} />
      )}
    </div>
  );
};

export default AddFund;
