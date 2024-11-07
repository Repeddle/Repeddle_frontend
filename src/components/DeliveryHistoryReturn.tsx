import { FaCheck } from "react-icons/fa"
import { OrderItem } from "../types/order"
import { deliveryStatusMap } from "../utils/common"

type Props = {
  status: number
  history: OrderItem["deliveryTracking"]["history"]
}

const DeliveryHistoryReturn = ({ history }: Props) => {
  // console.log(statusArray)
  console.log(history)

  const showValue = (key: string, num: number) => {
    if (num < 6) {
      return false
    }

    if (
      key === "Return Declined" &&
      history.find((val) => val.status === "Return Approved")
    ) {
      return false
    }

    if (
      key === "Refunded" &&
      history.find((val) => val.status === "Return Declined")
    ) {
      return false
    }

    if (
      key === "Payment to Seller Initiated" &&
      history.find((val) => val.status === "Return Approved")
    ) {
      return false
    }

    return true
  }

  const statusArray = Object.entries(deliveryStatusMap).filter((item) =>
    showValue(item[0], item[1])
  )

  return (
    <div className="flex pb-[30px]">
      <div className="flex flex-col lg:flex-row items-center">
        {statusArray.map(([key], i) => (
          <>
            {i !== 0 && (
              <div
                className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] ${
                  history.find((val) => val.status === key)
                    ? key === "Return Declined"
                      ? "bg-[red]"
                      : "bg-[green]"
                    : "bg-[grey]"
                }`}
              />
            )}
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center  ${
                  history.find((val) => val.status === key)
                    ? key === "Return Declined"
                      ? "bg-[red]"
                      : "bg-[green]"
                    : "bg-[grey]"
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                {key}
              </div>
            </div>
            {i < statusArray.length - 1 && (
              <div
                className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] ${
                  history.find((val) => val.status === key)
                    ? key === "Return Declined"
                      ? "bg-[red]"
                      : "bg-[green]"
                    : "bg-[grey]"
                }`}
              />
            )}
          </>
        ))}
      </div>
    </div>
  )
}

export default DeliveryHistoryReturn
