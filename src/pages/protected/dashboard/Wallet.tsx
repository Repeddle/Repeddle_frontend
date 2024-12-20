import { useEffect, useState } from "react"
import WidgetLarge from "../../../components/WidgetLarge"
import { FaPlus } from "react-icons/fa"
import Modal from "../../../components/ui/Modal"
import Withdraw from "../../../section/wallet/Withdraw"
import AddFund from "../../../section/wallet/AddFund"
import useWallet from "../../../hooks/useWallet"
import useToastNotification from "../../../hooks/useToastNotification"
import LoadingControlModal from "../../../components/ui/loadin/LoadingControlLogo"
import useAuth from "../../../hooks/useAuth"
import useTransactions from "../../../hooks/useTransaction"
import Success from "../../../section/wallet/Success"
import { createSearchParam } from "../../../utils/common"

const Wallet = () => {
  const { error, fetchWallet, loading, wallet } = useWallet()
  const { user } = useAuth()
  const { addNotification } = useToastNotification()
  const {
    fetchUserTransactions,
    transactions,
    transactionsPagination,
    loading: loadingTrans,
  } = useTransactions()

  const [refresh, setRefresh] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const [withdrawShowModel, setWithdrawShowModel] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchWallet()
  }, [refresh])

  useEffect(() => {
    const string = createSearchParam([["page", page.toString()]])
    fetchUserTransactions(string)
  }, [refresh, page])

  useEffect(() => {
    if (error) addNotification(error)
  }, [])

  return (
    <div className="flex-[4] relative lg:ml-5 min-h-[85vh] lg:p-5 rounded-[0.2rem] mb-2.5 m-0 p-2.5 bg-light-ev1 dark:bg-dark-ev1">
      <div className="flex items-center justify-between px-4 py-5 gap-1 sm:p-5 rounded-lg bg-[#fcf0e0] dark:bg-dark-ev3 mb-5">
        <div>
          {loading ? (
            <LoadingControlModal />
          ) : (
            <div className="font-bold leading-tight text-xl font-sans lg:text-[50px] text-orange-color">
              {`${wallet.currency} ${Math.floor(wallet.balance * 100) / 100}`}
            </div>
          )}
          <div className="font-bold text-orange-color text-[11px] lg:text-base">
            Current Repeddle Wallet Balance
          </div>
        </div>
        <div>
          <div
            className="flex text-xs capitalize px-[7px] py-[5px] lg:text-base items-center cursor-pointer font-bold bg-orange-color text-white-color lg:px-[30px] lg:py-2.5 rounded-[0.2rem]"
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
          setShowSuccess={setShowSuccess}
          setRefresh={setRefresh}
          refresh={refresh}
          currency={wallet.currency}
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
          balance={{ ...wallet, userId: user?._id ?? "" }}
        />
      </Modal>
      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
        <Success onClose={() => setShowSuccess(false)} />
      </Modal>
      <WidgetLarge
        refresh={refresh}
        loading={loadingTrans}
        transactions={transactions}
        transactionsPagination={transactionsPagination}
        onPageChange={setPage}
      />
    </div>
  )
}

export default Wallet
