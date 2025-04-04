import { useEffect, useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import moment from "moment"
import { useParams } from "react-router-dom"
import usePayments from "../../hooks/usePayment"
import { Payments } from "../../types/payments"
import useToastNotification from "../../hooks/useToastNotification"
import { currency, region } from "../../utils/common"
import Button from "../../components/ui/Button"

const PaymentScreen = () => {
  const params = useParams()
  const { id } = params
  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState<Payments>()
  const [approving, setApproving] = useState(false)

  const { approvePaymentWallet, fetchPaymentById } = usePayments()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    const getPay = async () => {
      setLoading(true)

      const res = await fetchPaymentById(id!)

      if (typeof res === "string") {
        addNotification(res, undefined, true)
      } else {
        setPayment(res)
      }

      setLoading(false)
    }

    getPay()
  }, [id])

  const handlePayment = async () => {
    if (!payment) return
    setApproving(true)
    const res = await approvePaymentWallet(payment._id, payment.userId._id)

    if (typeof res === "string") {
      addNotification(res, undefined, true)
    }

    setApproving(false)
  }

  return loading ? (
    <LoadingBox />
  ) : !payment ? (
    <div className="text-red-500">Failed to get error message</div>
  ) : (
    <div className="m-0 p-2.5 bg-light-ev1 dark:bg-dark-ev1 flex-[4] lg:mx-[10vw] lg:my-0 lg:p-5 rounded-[0.2rem]">
      <h1 className="text-[28px]">Confirm Payment</h1>
      <div className="px-[15px] py-2.5 h-full mb-[15px] lg:px-5 lg:py-[15px] rounded-[5px] bg-light-ev2 dark:bg-dark-ev2">
        <div className="capitalize font-semibold mb-2.5">ID</div>{" "}
        <div className="flex">{payment._id}</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">Date</div>
        <div className="flex">
          {moment(payment.createdAt).format("MMM DD YY, h:mm a")}
        </div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">User</div>
        {/* <img
          className="w-[50px] h-[50px] rounded-[50%]"
          src={imageUrl + payment.userId.image}
          alt="img"
        /> */}
        <div className="flex">{payment.userId.username}</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">Type</div>
        <div className="flex">{payment.reason}</div>
        {/* <div className="flex text-malon-color">
          <span className="mr-5">
            {payment.meta.typeName} {payment.meta.id && "id"}
          </span>
          <Link to={`/order/${payment.meta.id}`}>{payment.meta.id}</Link>
        </div> */}
        <hr />
        <div className="capitalize font-semibold mb-2.5">Amount</div>
        <div className="flex">
          {currency(region())}
          {payment.amount}
        </div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">From</div>
        <div className="flex">{payment.userId.username}</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">To</div>
        <div className="flex">{payment.to}</div>
        <hr />
        {/* {payment.to === "Account" && (
          <>
            <div className="capitalize font-semibold mb-2.5">
              Bank Account Details
            </div>
            <div className="flex capitalize text-[13px]">
              <div>Account Name:</div>{" "}
              <div className="ml-[5px]">{payment.meta.detail.accountName}</div>
            </div>
            <div className="flex capitalize text-[13px]">
              <div>Account Number:</div>{" "}
              <div className="ml-[5px]">
                {payment.meta.detail.accountNumber}
              </div>
            </div>
            <div className="flex capitalize text-[13px]">
              <div>Bank Name:</div>{" "}
              <div className="ml-[5px]">{payment.meta.detail.bankName}</div>
            </div>
            <hr />
          </>
        )} */}
        {payment.status !== "Pending" ? (
          <>
            <div
              className="capitalize font-semibold mb-2.5"
              style={{ color: "var(--orange-color)" }}
            >
              Status
            </div>
            <div
              className="flex"
              style={{ color: payment.status === "Decline" ? "red" : "green" }}
            >
              {payment.status}
            </div>
          </>
        ) : (
          <Button
            className="w-[200px] text-white bg-orange-color hover:bg-malon-color cursor-pointer mr-5 mt-[30px] px-2.5 py-[7px] rounded-[0.2rem] border-none"
            onClick={() => handlePayment()}
            isLoading={approving}
            text="Confirm Payment"
          />
        )}
      </div>
    </div>
  )
}

export default PaymentScreen
