import LoadingBox from "../../components/LoadingBox"
import MessageBox from "../../components/MessageBox"
import { useParams } from "react-router-dom"
import { currency, region } from "../../utils/common"
import moment from "moment"
import useAuth from "../../hooks/useAuth"
import useTransactions from "../../hooks/useTransaction"
import { useEffect, useState } from "react"
import { ITransaction } from "../../types/transactions"

const Transaction = () => {
  const params = useParams()
  const { id: transactionId } = params

  const [transaction, setTransaction] = useState<ITransaction>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { user, loading: loadingUser } = useAuth()
  const { fetchTransactionById } = useTransactions()

  useEffect(() => {
    const fetchData = async () => {
      if (!transactionId) return

      setLoading(true)

      const data = await fetchTransactionById(transactionId)

      if (typeof data !== "string") {
        setTransaction(data)
      } else setError(data)

      setLoading(false)
    }

    fetchData()
  }, [transactionId])

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    transaction && (
      <div className="lg:mx-[10vw] mx-[5vw] my-0">
        <div className="flex flex-col">
          <div className="flex-1">
            <div className="p-2.5">
              <h4 className="pt-5 pb-0 px-5 text-[calc(1.275rem_+_0.3vw)] font-medium leading-[1.2] mt-0 mb-2">
                Transaction information
              </h4>
              <hr className="my-4" />
              <div className="flex items-center">
                <div className="font-semibold flex-1 mx-0 my-2.5">
                  Transaction Id
                </div>
                <div className="flex-[2] mx-0 my-2.">{transactionId}</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold flex-1 mx-0 my-2.5">
                  Reference
                </div>
                <div className="flex-[2] mx-0 my-2.">{transaction.type}</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold flex-1 mx-0 my-2.5">Amount</div>
                <div className="flex-[2] mx-0 my-2.">
                  {currency(region())}
                  {transaction.amount}{" "}
                  {/* {transaction?.metadata?.purpose === "Withdrawal Request" && (
                  <span className="text-[red]" >
                    (fee: {currency(region())}10 )
                  </span>
                )} */}
                </div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold flex-1 mx-0 my-2.5">Type</div>
                <div className="flex-[2] mx-0 my-2.">{transaction.type}</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold flex-1 mx-0 my-2.5">Purpose</div>
                <div className="flex-[2] mx-0 my-2.">
                  {transaction.description}
                </div>
              </div>
            </div>
            <div className="p-2.5">
              <h4 className="pt-5 pb-0 px-5 text-[calc(1.275rem_+_0.3vw)] font-medium leading-[1.2] mt-0 mb-2">
                Customer information
              </h4>
              <hr className="my-4" />
              {loadingUser ? (
                <LoadingBox />
              ) : (
                <>
                  <img
                    className="w-[100px] h-[100px] rounded-[50%]"
                    src={user?.image}
                    alt="img"
                  />
                  <div>
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div>@{user?.username}</div>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 border m-[5vw] border-black dark:border-white">
            <div className="p-2.5">
              <h4 className="pt-5 pb-0 px-5 text-[calc(1.275rem_+_0.3vw)] font-medium leading-[1.2] mt-0 mb-2">
                Transaction time
              </h4>

              {moment(transaction.createdAt).format("MMM Do, h:mm a")}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Transaction
