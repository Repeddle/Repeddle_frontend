import { useState } from "react"
import LoadingBox from "../../components/LoadingBox"
import moment from "moment"
import { Link } from "react-router-dom"

const PaymentScreen = () => {
  const [loading] = useState(false)

  const payment = {
    _id: "",
    createdAt: "",
    meta: {
      type: "",
      typeName: "",
      id: "",
      currency: "",
      from: "",
      to: "",
      detail: {
        bankName: "",
        accountNumber: "",
        accountName: "",
      },
    },
    userId: {
      image: "",
      username: "",
    },
    amount: 0,
    status: "",
  }

  const handlePayment = () => {}

  return loading ? (
    <LoadingBox />
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
        <img
          className="w-[50px] h-[50px] rounded-[50%]"
          src={payment.userId.image}
          alt="img"
        />
        <div className="flex">{payment.userId.username}</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">Type</div>
        <div className="flex">{payment.meta.type}</div>
        <div className="flex text-malon-color">
          <span className="mr-5">
            {payment.meta.typeName} {payment.meta.id && "id"}
          </span>
          <Link to={`/order/${payment.meta.id}`}>{payment.meta.id}</Link>
        </div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">Amount</div>
        <div className="flex">
          {payment.meta.currency}
          {payment.amount}
        </div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">From</div>
        <div className="flex">{payment.meta.from}</div>
        <hr />
        <div className="capitalize font-semibold mb-2.5">To</div>
        <div className="flex">{payment.meta.to}</div>
        <hr />
        {payment.meta.to === "Account" && (
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
        )}
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
          <button
            className="w-[200px] text-white bg-orange-color hover:bg-malon-color cursor-pointer mr-5 mt-[30px] px-2.5 py-[7px] rounded-[0.2rem] border-none"
            onClick={() => handlePayment()}
          >
            Confirm Payment
          </button>
        )}
      </div>
    </div>
  )
}

export default PaymentScreen
