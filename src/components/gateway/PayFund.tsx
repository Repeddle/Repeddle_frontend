import useTheme from "../../hooks/useTheme";
import { FaWallet } from "react-icons/fa";
import MessageBox from "../MessageBox";
import LoadingBox from "../LoadingBox";
import { PayStackCallback } from "../../types/gateway";
import { currency } from "../../utils/common";
import useRegion from "../../hooks/useRegion";

type Props = {
  amount: number;
  onApprove: (val: PayStackCallback) => void;
  setShowModel: (val: boolean) => void;
};

const PayFund = ({ amount }: Props) => {
  const { isDarkMode } = useTheme();
  const { region } = useRegion();

  const error = null;
  const loading = false;

  const handlePayment = () => {};

  return (
    <div className="mt-[30px]">
      <img
        className="h-[15px]"
        src={
          isDarkMode
            ? "https://res.cloudinary.com/emirace/image/upload/v1661147636/Logo_White_3_ii3edm.gif"
            : "https://res.cloudinary.com/emirace/image/upload/v1661147778/Logo_Black_1_ampttc.gif"
        }
      />
      <div className="flex flex-col items-center">
        <FaWallet size={64} className="text-orange-color " />
        <div className="font-bold mt-2.5">
          Make payment from your Repeddle Wallet
        </div>
        {error && <MessageBox className="text-[red]">{error}</MessageBox>}
        <div className="font-bold my-5 mx-0 text-orange-color text-[40px]">
          {currency(region)} {amount}
        </div>
        {loading ? (
          <LoadingBox />
        ) : (
          <div
            className="flex items-center cursor-pointer font-bold bg-orange-color hover:bg-malon-color text-white-color px-[50px] py-2.5 rounded-[0.2rem]"
            onClick={() => {
              handlePayment();
            }}
          >
            Continue
          </div>
        )}
      </div>
    </div>
  );
};

export default PayFund;
