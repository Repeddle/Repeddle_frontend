import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import useAuth from "../../hooks/useAuth";
import { FlutterwaveConfig } from "flutterwave-react-v3/dist/types";
import { IUser } from "../../types/user";

const nigerianFlutterwaveKey = "FLWPUBK-31cf11f493d975fb1607f21f6499b416-X";
const southAfricanFlutterwaveKey = "FLWPUBK-31cf11f493d975fb1607f21f6499b416-X";

type Props = {
  amount: number;
  currency: "ZAR" | "NGN";
  onApprove: (val: { transaction_id: string; type: string }) => void;
  user?: IUser | { email: string; name: string; phone: string };
};

const FlutterWave = ({
  amount,
  currency,
  onApprove,
  user: userData,
}: Props) => {
  const { user } = useAuth();

  const usedUser = userData ?? user;

  //   TODO: Take customer info from shipping address ??
  const config: FlutterwaveConfig = {
    public_key:
      currency === "NGN" ? nigerianFlutterwaveKey : southAfricanFlutterwaveKey,
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
      description: "Payment",
      logo: "https://res.cloudinary.com/emirace/image/upload/v1666953838/Repeddle_Logo-02_ztvmtx.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <div
        className="cursor-pointer px-4 rounded-md text-white-color w-full uppercase flex items-center justify-center h-10 mt-2.5 bg-orange-color hover:bg-malon-color"
        onClick={() => {
          handleFlutterPayment({
            callback: async (response) => {
              onApprove({
                transaction_id: response.transaction_id.toString(),
                type: "Flutterwave",
              });
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Proceed to Payment
      </div>
    </div>
  );
};

export default FlutterWave;
