import { useState } from "react";
// import PayStack from "../../components/gateway/PayStack";
import { FaWallet } from "react-icons/fa";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { PayStackCallback } from "../../types/gateway";
import useWallet from "../../hooks/useWallet";
import useToastNotification from "../../hooks/useToastNotification";
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal";
import PaymentModal from "../../components/ui/payment/PaymentModal";

type Props = {
  setShowModel: (val: boolean) => void;
  setShowSuccess?: (val: boolean) => void;
  setRefresh: (val: boolean) => void;
  refresh: boolean;
  currency: "NGN" | "ZAR";
};

const AddFund = ({ setShowSuccess, setRefresh, setShowModel }: Props) => {
  const { fundWalletFlutter, loading: loadingWallet } = useWallet();

  const { addNotification } = useToastNotification();

  const [amount, setAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onApprove = async (
    val: (FlutterWaveResponse & { type: string }) | PayStackCallback,
  ) => {
    const { error, result } = await fundWalletFlutter({
      amount,
      paymentProvider: val.type,
      transactionId: val.transaction_id.toString(),
    });

    if (!error) {
      addNotification(result);
      setRefresh(true);
      setShowSuccess && setShowSuccess(true);
      setAmount(0);
      setShowModel(false);
    } else {
      addNotification(result, undefined, true);
    }
  };

  return (
    <div className="flex flex-col items-center mt-[30px] p-5">
      {loadingWallet && <LoadingLogoModal />}
      <FaWallet size={64} className="text-orange-color" />
      <div className="font-bold mt-2.5 capitalize">Fund your Wallet</div>
      <input
        className="h-[45px] w-full border border-malon-color mx-0 my-[25px] p-[15px] numeric-arrow rounded-[5px] focus-within:border-orange-color focus-visible:outline-orange-color focus-visible:outline-1 text-black dark:text-white bg-white dark:bg-black placeholder:p-2"
        type="number"
        value={`${amount || ""}`}
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

      <button
        disabled={!amount || amount <= 0}
        onClick={() => setIsModalOpen(true)}
        className={`w-full h-11 flex items-center justify-center rounded-lg font-bold text-white uppercase transition-all ${
          !amount || amount <= 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-orange-color hover:bg-malon-color shadow-md active:scale-[0.98]"
        }`}
      >
        Proceed to Payment
      </button>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={amount}
        onApprove={onApprove}
      />
    </div>
  );
};

export default AddFund;
