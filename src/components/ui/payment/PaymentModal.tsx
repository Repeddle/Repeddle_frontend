import React from "react";
import Modal from "../Modal";
import PaymentSelector from "./PaymentSelector";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onApprove: (val: { transaction_id: string; type: string }) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onApprove,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-4 pt-10">
        <PaymentSelector
          amount={amount}
          onApprove={onApprove}
          onClose={onClose}
        />

        <div className="mt-2 flex justify-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
