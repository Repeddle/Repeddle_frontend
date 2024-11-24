import LoadingBox from "./LoadingBox"
import { ITransaction, TransactionPagination } from "../types/transactions"
import TransactionTable from "./table/TransactionTable"

type Props = {
  refresh?: boolean
  loading?: boolean
  transactions: ITransaction[]
  transactionsPagination?: TransactionPagination
  onPageChange?: (val: number) => void
}

const WidgetLarge = ({
  loading,
  transactions,
  transactionsPagination,
  onPageChange,
}: Props) => {
  // const [clickItem, setClickItem] = useState("")

  return loading ? (
    <LoadingBox />
  ) : (
    <div className="flex-[2] bg-light-ev1 dark:bg-dark-ev1 p-4 rounded-[0.2rem] w-full">
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-semibold">Latest transactions </div>
        {/* <span className="bg-orange-color text-white">{clickItem}</span> */}
      </div>

      <TransactionTable
        onPageChange={onPageChange}
        transactions={transactions}
        loading={loading}
        transactionPagination={transactionsPagination}
      />
    </div>
  )
}

export default WidgetLarge
