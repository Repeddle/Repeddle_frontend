import React from "react";

const Success: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 p-4">
      <h2 className="text-xl font-bold mb-4">Wallet Funded Successfully!</h2>
      <p className="mb-6 dark:text-gray-300 text-center">
        Your wallet has been successfully funded. You can now use the balance to
        make purchases.
      </p>
      <button
        onClick={onClose}
        className=" bg-orange-color hover:bg-malon-color text-white font-semibold py-2 px-4 rounded-lg focus:outline-none "
      >
        Continue
      </button>
    </div>
  );
};

export default Success;
