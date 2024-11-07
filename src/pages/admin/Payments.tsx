import { useEffect, useState } from "react"
import { FaSortDown, FaSortUp } from "react-icons/fa"
import moment from "moment"
import { Link } from "react-router-dom"
import Modal from "../../components/ui/Modal"
import PayUsers from "../../components/PayUsers"
import usePayments from "../../hooks/usePayment"
import useToastNotification from "../../hooks/useToastNotification"

const headers = [
  { title: "ID", key: "_id", hide: true },
  { title: "User", key: "username" },
  { title: "Amount", key: "amount", hide: true },
  { title: "Status", key: "status" },
  { title: "Type", key: "type", hide: true },
  { title: "Date", key: "createdAt", hide: true },
]

// type PayKey = keyof IPayment

const Payments = () => {
  const { fetchPayments, payments, error } = usePayments()
  const { addNotification } = useToastNotification()

  const [productQuery, setProductQuery] = useState("")
  const [showModelWallet, setShowModelWallet] = useState(false)
  const [refresh, setRefresh] = useState(true)

  const [sortKey, setSortKey] = useState<{
    key: string
    sort: "asc" | "desc"
  }>()

  const updateSort = (key: string) => {
    if (sortKey?.key === key && sortKey.sort === "desc") setSortKey(undefined)
    else if (sortKey?.key === key) setSortKey({ key, sort: "desc" })
    else setSortKey({ key, sort: "asc" })
  }

  useEffect(() => {
    const getPayment = async () => {
      const res = await fetchPayments()

      if (!res)
        addNotification(error || "Failed to fetch payments", undefined, true)
    }

    getPayment()
  }, [])

  // TODO: check if this is still needed
  // const sortedPayments = useMemo(() => {
  //   if (sortKey && payments[0][sortKey.key as PayKey]) {
  //     return payments.sort((a, b) => {
  //       const aVal = a[sortKey.key as PayKey] ?? ""
  //       const bVal = b[sortKey.key as PayKey] ?? ""
  //       if (typeof aVal === "number" && typeof bVal === "number") {
  //         return sortKey.sort === "asc" ? aVal - bVal : bVal - aVal
  //       }

  //       return sortKey.sort === "asc"
  //         ? aVal.toString().localeCompare(bVal.toString())
  //         : bVal.toString().localeCompare(aVal.toString())
  //     })
  //   }
  //   return payments
  // }, [sortKey])

  return (
    <div className="flex-[4] overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        Payments
      </h1>
      <div className="flex mr-2.5 mb-2.5 justify-end">
        <input
          className={`w-2/5 h-[45px] border border-malon-color focus-visible:outline focus-visible:outline-orange-color p-[15px] rounded-[5px]
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

      {/* TODO: use new table  */}
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 px-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-hidden w-full sm:rounded-lg">
            <table className="w-full">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header.key}
                      onClick={() => updateSort(header.key)}
                      scope="col"
                      className={`cursor-pointer px-3 h-14 lg:w-[14%] text-left text-sm font-medium text-black dark:text-white tracking-wider ${
                        "hide" in header ? "hidden lg:table-cell" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {header.title}
                        <span>
                          {header.key === sortKey?.key &&
                            (sortKey.sort === "desc" ? (
                              <FaSortDown className="text-black text-lg dark:text-white" />
                            ) : (
                              <FaSortUp className="text-black text-lg dark:text-white" />
                            ))}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="cursor-pointer px-3 h-14 text-left text-sm font-medium text-black dark:text-white tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {payments.map((pay) => (
                  <tr key={pay._id}>
                    <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {pay._id}
                    </td>

                    <td className="px-3 flex gap-2.5 items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      <Link
                        to={`/seller/${pay.userId._id}`}
                        className="w-[60px] whitespace-nowrap overflow-hidden text-ellipsis hover:underline"
                      >
                        {pay.userId.username}
                      </Link>
                    </td>

                    <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {pay.amount}
                    </td>

                    <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {pay.status}
                    </td>

                    <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {pay.reason}
                    </td>

                    <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {moment(pay.createdAt).format("MMM DD YY, h:mm a")}
                    </td>

                    <td className="px-3 flex items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      <Link to={`/payment/${pay._id}`}>
                        <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payments
