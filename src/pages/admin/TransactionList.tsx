import { useEffect, useState } from "react"

import TransactionTable from "../../components/table/TransactionTable"
import useTransactions from "../../hooks/useTransaction"
import useToastNotification from "../../hooks/useToastNotification"
import { createSearchParam } from "../../utils/common"

const TransactionList = () => {
  const [salesQuery, setSalesQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState(salesQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(salesQuery)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [salesQuery])
  const [page, setPage] = useState(1)

  const {
    error,
    fetchTransactions,
    transactions,
    loading,
    transactionsPagination,
  } = useTransactions()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    const string = createSearchParam([
      ["page", page.toString()],
      ["transactionId", debouncedQuery],
    ])

    fetchTransactions(string)
  }, [page, debouncedQuery])

  useEffect(() => {
    if (error) addNotification(error)
  }, [error])

  return (
    <div className="flex-[4] flex flex-col overflow-x-hidden mb-5 min-h-[85vh] pb-4 lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        Transactions
      </h1>
      <div className="flex mr-2.5 mb-2.5 justify-end">
        <input
          className={`w-2/5 h-[45px] border border-malon-color focus-visible:outline focus-visible:outline-orange-color p-[15px] rounded-[5px]
          placeholder:p-2.5 text-black dark:text-white bg-white dark:bg-black`}
          onChange={(e) => setSalesQuery(e.target.value)}
          placeholder="Search "
          type="search"
          value={salesQuery}
        />
      </div>

      <TransactionTable
        onPageChange={setPage}
        transactions={transactions}
        loading={loading}
        transactionPagination={transactionsPagination}
      />
    </div>
  )
}

export default TransactionList
