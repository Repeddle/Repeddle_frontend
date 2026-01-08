import { useState } from "react";
// import PayStack from "../../components/gateway/PayStack";
import { FaWallet } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { PayStackCallback } from "../../types/gateway";
import useWallet from "../../hooks/useWallet";
import useToastNotification from "../../hooks/useToastNotification";
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal";
import FlutterWave from "../../components/gateway/FlutterWave";
import useRegion from "../../hooks/useRegion";

type Props = {
  setShowModel: (val: boolean) => void;
  setShowSuccess?: (val: boolean) => void;
  setRefresh: (val: boolean) => void;
  refresh: boolean;
  currency: "NGN" | "ZAR";
};

const AddFund = ({ setShowSuccess, setRefresh, setShowModel }: Props) => {
  const { fundWalletFlutter, loading } = useWallet();
  const { region } = useRegion();

  // const [loadingPay, setLoadingPay] = useState(false);
  const { addNotification } = useToastNotification();

  const [amount, setAmount] = useState(0);

  const { user } = useAuth();

  const onApprove = async (
    val: (FlutterWaveResponse & { type: string }) | PayStackCallback
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
      {loading && <LoadingLogoModal />}
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

      {/* <PayStack
        amount={amount}
        onApprove={onApprove}
        isLoading={loadingPay}
        setIsLoading={setLoadingPay}
      /> */}
      <FlutterWave
        amount={amount}
        currency={region === "NG" ? "NGN" : "ZAR"}
        user={user ?? undefined}
        onApprove={(res) =>
          onApprove({ type: "Flutterwave", transaction_id: res.transaction_id })
        }
      />
    </div>
  );
};

export default AddFund;
