import { useState } from "react"
import WidgetLarge from "../../components/WidgetLarge"
import LoadingBox from "../../components/LoadingBox"
import { FaPlus } from "react-icons/fa"
import Modal from "../../components/ui/Modal"
import Withdraw from "../../section/wallet/Withdraw"
import { balanceData as balance } from "../../utils/data"
import AddFund from "../../section/wallet/AddFund"

const Wallet = () => {
  const loading = false

  const [refresh, setRefresh] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const [withdrawShowModel, setWithdrawShowModel] = useState(false)

  return (
    <div className="flex-[4] lg:ml-5 min-h-[85vh] lg:p-5 rounded-[0.2rem] mb-2.5 m-0 p-2.5 bg-light-ev1 dark:bg-dark-ev1">
      <div className="flex items-center justify-between p-5 rounded-lg bg-[#fcf0e0] dark:bg-dark-ev3 mb-5">
        <div>
          {loading ? (
            <LoadingBox />
          ) : (
            <div className="font-bold leading-tight text-xl font-sans lg:text-[50px] text-orange-color">
              {`${balance.currency} ${Math.floor(balance.balance * 100) / 100}`}
            </div>
          )}
          <div className="font-bold text-orange-color text-[11px] lg:text-base">
            Current Repeddle Wallet Balance
          </div>
        </div>
        <div>
          <div
            className="flex text-xs px-[7px] py-[5px] lg:text-base items-center cursor-pointer font-bold bg-orange-color text-white-color lg:px-[30px] lg:py-2.5 rounded-[0.2rem]"
            onClick={() => setShowModel(true)}
          >
            <FaPlus className="mr-2.5" />
            Fund my Wallet
          </div>
          <div
            className="font-bold text-orange-color text-[11px] lg:text-base cursor-pointer"
            onClick={() => setWithdrawShowModel(true)}
          >
            Request Payout
          </div>
        </div>
      </div>
      <Modal isOpen={showModel} onClose={() => setShowModel(false)}>
        <AddFund
          setShowModel={setShowModel}
          setRefresh={setRefresh}
          refresh={refresh}
          currency={balance.currency}
        />
      </Modal>
      <Modal
        isOpen={withdrawShowModel}
        onClose={() => setWithdrawShowModel(false)}
      >
        <Withdraw
          setShowModel={setWithdrawShowModel}
          setRefresh={setRefresh}
          refresh={refresh}
          balance={balance}
        />
      </Modal>
      <WidgetLarge refresh={refresh} />
    </div>
  )
}

export default Wallet
