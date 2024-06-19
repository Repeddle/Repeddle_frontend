import { Link } from "react-router-dom"
import { ITransaction, TransactionPagination } from "../../types/transactions"
import moment from "moment"
import { currency, region } from "../../utils/common"
import Table from "./Table"

type Props = {
  transactions: ITransaction[]
  loading?: boolean
  error?: string
  onPageChange?: (val: number) => void
  transactionPagination?: TransactionPagination
}

const headers = [
  { title: "ID" },
  { title: "Purpose", hide: true },
  { title: "Date" },
  { title: "Type", hide: true },
  { title: "Amount", hide: true },
  { title: "Status" },
]

const TransactionTable = ({
  transactions,
  loading,
  error,
  onPageChange,
  transactionPagination,
}: Props) => {
  return (
    <Table
      headers={headers}
      currentPage={transactionPagination?.currentPage}
      totalCount={transactionPagination?.totalDocs}
      totalPages={transactionPagination?.totalPages}
      error={error}
      itemName="transaction"
      onPageChange={onPageChange}
      loading={loading}
      body={transactions.map((tran) => ({
        keys: {
          ID: tran._id,
          Purpose: tran.description,
          Date: moment(tran.createdAt).format("MMM DD YY, h:mm a"),
          Type: tran.type,
          Amount: currency(region()) + " " + tran.amount,
          Status: "Done",
        },
        action: (
          <Link to={`/transaction/${tran._id}`}>
            <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
              View
            </button>
          </Link>
        ),
      }))}
    />
  )
}

export default TransactionTable
