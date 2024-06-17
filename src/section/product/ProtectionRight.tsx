import { useState } from "react"
import { FaKey } from "react-icons/fa"
import BuyersPro from "../../components/BuyersPro"
import Modal from "../../components/ui/Modal"

const ProtectionRight = () => {
  const [showModel, setShowModel] = useState(false)

  return (
    <div>
      <div
        className="flex cursor-pointer items-center m-[5px] p-5 rounded-[0.2rem] border dark:border-dark-ev3 border-light-ev3 dark:bg-dark-ev1 bg-light-ev1"
        onClick={() => setShowModel(!showModel)}
      >
        <FaKey size={25} className="text-orange-color mr-2.5" /> Buyer's &
        Seller's Protection !
      </div>
      <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
        <BuyersPro />
      </Modal>
    </div>
  )
}

export default ProtectionRight
