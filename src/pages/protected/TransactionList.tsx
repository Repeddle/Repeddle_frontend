import { useEffect, useState } from "react"

import TransactionTable from "../../components/table/TransactionTable"
import useTransactions from "../../hooks/useTransaction"
import useToastNotification from "../../hooks/useToastNotification"

const TransactionList = () => {
  const [salesQuery, setSalesQuery] = useState("")

  const { error, fetchTransactions, transactions } = useTransactions()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    if (error) addNotification(error)
  }, [error])

  return (
    <div className="flex-[4] overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
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

      <TransactionTable transactions={transactions} />
    </div>
  )
}

export default TransactionList
