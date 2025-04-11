import { useEffect, useState } from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import Modal from "../../components/ui/Modal"
import PayUsers from "../../components/PayUsers"
import usePayments from "../../hooks/usePayment"
import useToastNotification from "../../hooks/useToastNotification"
import Table from "../../components/table/Table"
import { createSearchParam } from "../../utils/common"

const headers = [
  { title: "ID", key: "_id", hide: true },
  { title: "User", key: "username" },
  { title: "Amount", key: "amount", hide: true },
  { title: "Status", key: "status" },
  { title: "Type", key: "type", hide: true },
  { title: "Date", key: "createdAt", hide: true },
]

const Payments = () => {
  const { fetchPayments, payments, error } = usePayments()
  const { addNotification } = useToastNotification()

  const [productQuery, setProductQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState(productQuery)
  const [page, setPage] = useState(1)
  const [showModelWallet, setShowModelWallet] = useState(false)
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(productQuery)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [productQuery])

  useEffect(() => {
    const getPayment = async () => {
      const search = createSearchParam([
        ["page", `${page}`],
        ["search", debouncedQuery],
      ])
      const res = await fetchPayments(search)

      if (!res)
        addNotification(error || "Failed to fetch payments", undefined, true)
    }

    getPayment()
  }, [page, debouncedQuery])

  return (
    <div className="flex-[4] overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        Payments
      </h1>
      <div className="flex mr-2.5 mb-2.5 justify-end">
        <input
          className={`w-2/5  max-w-[300px] h-[45px] border border-malon-color focus-visible:outline focus-visible:outline-orange-color p-[15px] rounded-[5px]
          placeholder:p-2.5 text-black dark:text-white bg-white dark:bg-black`}
          onChange={(e) => setProductQuery(e.target.value)}
          placeholder="Search "
          type="search"
          value={productQuery}
        />
      </div>

      <button
        onClick={() => setShowModelWallet(true)}
        className="text-white-color ml-5 px-[7px] py-[5px] rounded-[0.2rem] border- bg-orange-color"
      >
        Make Payment
      </button>

      <Modal onClose={() => setShowModelWallet(false)} isOpen={showModelWallet}>
        <PayUsers
          setShowModel={setShowModelWallet}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      </Modal>

      <Table
        headers={headers}
        currentPage={payments.pagination?.currentPage}
        totalCount={payments.pagination?.totalItems}
        totalPages={payments.pagination?.totalPages}
        onPageChange={setPage}
        message={
          productQuery.length && !payments.payments.length
            ? "No product matches search"
            : undefined
        }
        error={error}
        itemName="payments"
        body={payments.payments.map((pay) => ({
          key: pay._id,
          keys: {
            ID: pay._id,
            User: (
              <Link
                to={`/seller/${pay.userId._id}`}
                className="w-[60px] whitespace-nowrap overflow-hidden text-ellipsis hover:underline"
              >
                {pay.userId.username}
              </Link>
            ),
            Amount: pay.amount,
            Status: pay.status,
            Type: pay.reason,
            Date: moment(pay.createdAt).format("MMM DD YY, h:mm a"),
          },
          action: (
            <Link to={`/admin/payments/${pay._id}`}>
              <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
                View
              </button>
            </Link>
          ),
        }))}
      />
    </div>
  )
}

export default Payments
