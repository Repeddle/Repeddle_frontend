import React, { useState } from "react";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { usePaystackPayment } from "react-paystack";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import useAuth from "../../../hooks/useAuth";
import useRegion from "../../../hooks/useRegion";
import { HookConfig as PaystackHookConfig } from "react-paystack/dist/types";
import { FlutterwaveConfig } from "flutterwave-react-v3/dist/types";
import { PaystackResponse } from "../../../types/gateway";
import { FaShieldAlt } from "react-icons/fa";
import {
  generatePayfastSignatureService,
  initPayFastOnsiteService,
} from "../../../services/payment";

export type PaymentMethod = "paystack" | "flutterwave" | "payfast";

const nigerianFlutterwaveKey = "FLWPUBK-31cf11f493d975fb1607f21f6499b416-X";
const southAfricanFlutterwaveKey = "FLWPUBK-31cf11f493d975fb1607f21f6499b416-X";

const nigerianPaystackKey = "pk_live_2bfc97de7257e01817c882ad874486227cebd17d";
const southAfricanPaystackKey =
  "pk_live_96998e69a31a4a9d1afc9ec874dec535657ce0ad";

interface PaymentSelectorProps {
  amount: number;
  onApprove: (val: { transaction_id: string; type: string }) => void;
  onClose: () => void;
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  amount,
  onApprove,
  onClose,
}) => {
  const { user } = useAuth();
  const { region } = useRegion();
  const [loadingMethod, setLoadingMethod] = useState<PaymentMethod | null>(
    null,
  );

  const reference =
    "REP_" +
    Math.floor(Math.random() * 1000 + 1) +
    new Date().getTime().toString();

  // Paystack Configuration
  const paystackConfig: PaystackHookConfig = {
    reference,
    email: user?.email ?? "",
    amount: amount * 100,
    publicKey: region === "NG" ? nigerianPaystackKey : southAfricanPaystackKey,
    currency: region === "NG" ? "NGN" : "ZAR",
  };

  const initializePaystack = usePaystackPayment(paystackConfig);

  // Flutterwave Configuration
  const flutterwaveConfig: FlutterwaveConfig = {
    public_key:
      region === "NG" ? nigerianFlutterwaveKey : southAfricanFlutterwaveKey,
    tx_ref: reference,
    amount,
    currency: region === "NG" ? "NGN" : "ZAR",
    payment_options:
      "card, account, banktransfer, mpesa, barter, nqr, ussd, credit",
    customer: {
      email: user?.email ?? "",
      phone_number: user?.phone ?? "",
      name: user ? `${user.firstName} ${user.lastName}` : "Customer",
    },
    customizations: {
      title: "Repeddle",
      description: "Payment",
      logo: "https://res.cloudinary.com/emirace/image/upload/v1666953838/Repeddle_Logo-02_ztvmtx.png",
    },
  };

  const handleFlutterwave = useFlutterwave(flutterwaveConfig);

  const handleSelect = (method: PaymentMethod) => {
    setLoadingMethod(method);

    if (method === "paystack") {
      initializePaystack({
        onSuccess: (res: PaystackResponse) => {
          setLoadingMethod(null);
          onApprove({ transaction_id: res.reference, type: "Paystack" });
          onClose();
        },
        onClose: () => {
          setLoadingMethod(null);
          console.log("Paystack closed");
        },
      });
    } else if (method === "flutterwave") {
      handleFlutterwave({
        callback: async (response) => {
          setLoadingMethod(null);
          onApprove({
            transaction_id: response.transaction_id.toString(),
            type: "Flutterwave",
          });
          closePaymentModal();
          onClose();
        },
        onClose: () => {
          setLoadingMethod(null);
          console.log("Flutterwave closed");
        },
      });
    } else if (method === "payfast") {
      const handlePayFast = async () => {
        try {
          const merchantId = "21331397";
          const merchantKey = "f6dtd8f8khb4m";

          const myData: Record<string, string> = {
            merchant_id: merchantId,
            merchant_key: merchantKey,
            return_url: "https://www.repeddle.com/success",
            cancel_url: "https://www.repeddle.com/cancel",
            notify_url: "https://www.repeddle.com/api/payments/payfast-notify",
            name_first: user?.firstName || "User",
            name_last: user?.lastName || "",
            email_address: user?.email || "",
            m_payment_id: reference,
            amount: String(amount),
            item_name: `Payment`,
          };

          const signature = await generatePayfastSignatureService(myData);

          myData["signature"] = signature.signature;

          const uuid = await initPayFastOnsiteService(myData);
          console.log("uuid", uuid);
          window.payfast_do_onsite_payment({ uuid }, (result: boolean) => {
            setLoadingMethod(null);
            console.log(result);
            if (result) {
              onApprove({ transaction_id: reference, type: "Payfast" });
              onClose();
            }
          });
        } catch (error) {
          setLoadingMethod(null);
          console.error("PayFast error:", error);
        }
      };
      handlePayFast();
    }
  };

  const methods = [
    {
      id: "paystack" as PaymentMethod,
      name: "Paystack",
      description: "Fast and secure checkout",
      icon: <FaCreditCard className="text-blue-500" size={24} />,
      color: "border-blue-500",
    },
    {
      id: "flutterwave" as PaymentMethod,
      name: "Flutterwave",
      description: "Pay with card or bank transfer",
      icon: <FaMoneyBillWave className="text-green-500" size={24} />,
      color: "border-green-500",
    },
    ...(region === "ZA"
      ? [
          {
            id: "payfast" as PaymentMethod,
            name: "PayFast Onsite",
            description: "Secure checkout via PayFast",
            icon: <FaShieldAlt className="text-red-500" size={24} />,
            color: "border-red-500",
          },
        ]
      : []),
  ];

  return (
    <div className="w-full space-y-4 my-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        Select Payment Method
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => !loadingMethod && handleSelect(method.id)}
            className={`cursor-pointer flex items-center p-4 border-2 rounded-xl transition-all duration-200 transform hover:scale-[1.01] ${
              loadingMethod === method.id
                ? "border-orange-color bg-gray-50 dark:bg-gray-800"
                : "border-gray-100 dark:border-gray-800 hover:border-orange-color"
            }`}
          >
            <div className="flex-shrink-0 p-3 rounded-full bg-white dark:bg-gray-900 shadow-sm border border-gray-50 dark:border-gray-800">
              {loadingMethod === method.id ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-orange-color"></div>
              ) : (
                method.icon
              )}
            </div>
            <div className="ml-4 text-left">
              <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {method.name}
              </p>
              <p className="text-xs text-gray-500">{method.description}</p>
            </div>
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSelector;
