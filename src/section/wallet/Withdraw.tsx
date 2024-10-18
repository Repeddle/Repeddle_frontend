/* eslint-disable @typescript-eslint/ban-ts-comment */
// TODO: remove this when it is resolved
import { useEffect, useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import useAuth from "../../hooks/useAuth";
import { FaQuestionCircle, FaWallet } from "react-icons/fa";
import { UserBalance } from "../../types/user";
import { region } from "../../utils/common";
import useWallet from "../../hooks/useWallet";
import useToastNotification from "../../hooks/useToastNotification";

type Props = {
  setShowModel: (val: boolean) => void;
  setRefresh: (val: boolean) => void;
  refresh: boolean;
  balance: UserBalance;
};

// TODO: account information is not part of logged in data

const Withdraw = ({ balance, refresh, setRefresh, setShowModel }: Props) => {
  const { withdrawWalletFlutter, loading } = useWallet();
  const { addNotification } = useToastNotification();

  const { user } = useAuth();

  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [errormsg, setErrormsg] = useState("");

  const handleWithdraw = async () => {
    const { error, result } = await withdrawWalletFlutter(amount);

    if (!error) {
      addNotification(result);
      setRefresh(!refresh);
      setShowModel(false);
      setAmount(0);
    } else {
      addNotification(result, undefined, true);
    }
  };

  useEffect(() => {
    const fees =
      region() === "ZAR"
        ? 10
        : amount <= 5000
        ? 10.75
        : amount > 5000 && amount <= 50000
        ? 26.88
        : 53.75;
    setFee(fees);
    const totalMoney = Number(amount) + Number(fees);
    console.log("totalMoney", totalMoney, balance.balance);
    if (totalMoney > balance.balance) {
      setErrormsg(
        "Insufficient funds, Please enter a lower amount to complete your withdrawal"
      );
      return;
    }
    if (!amount) {
      setErrormsg("Please enter the amount you want to withdraw");
      return;
    }
    setErrormsg("");
  }, [amount, balance.balance]);

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

      <div className="font-bold mt-2.5">To {user.accountName}</div>
      <div className="text-[grey] uppercase">
        {user.bankName} ({user.accountNumber})
      </div>
      {/* {error && <MessageBox className="text-[red]">{error}</MessageBox>} */}
      <div className="text-right w-full mt-[25px]">
        Balance: {balance.currency}
        {balance.balance}
      </div>
      <div className="h-[45px] w-full border border-malon-color flex items-center p-[5px] rounded-[5px]">
        <input
          className="flex-1 numeric-arrow text-lg border-0 focus-visible:outline-none placeholder:p-2.5 text-black-color dark:text-white-color bg-white-color dark:bg-black-color"
          type="number"
          value={`${amount || 0}`}
          placeholder="Enter Amount to Withdraw"
          onChange={(e) => {
            let value = e.target.value;

            const numericValue = parseFloat(value);
            if (!isNaN(numericValue)) {
              setAmount(numericValue);
            } else {
              setAmount(0);
            }
          }}
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
  );
};

export default Withdraw;
