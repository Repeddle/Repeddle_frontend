import moment from "moment"
import { useState } from "react"
import LoadingBox from "./LoadingBox"
import { currency, region } from "../utils/common"
import { ITransaction } from "../types/transactions"

type Props = {
  refresh?: boolean
  transactions: ITransaction[]
}

const WidgetLarge = ({ refresh, transactions }: Props) => {
  const loadingTrans = false

  console.log(refresh)

  const [clickItem, setClickItem] = useState("")

  return loadingTrans ? (
    <LoadingBox />
  ) : (
    <div className="flex-[2]">
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-semibol">Latest transactions </div>
        <span className="bg-orange-color text-white">{clickItem}</span>
      </div>
      <table className="w-full border-spacing-5">
        <tbody>
          <tr>
            <th className="text-left font-bold px-0 py-2.5">Id</th>
            <th className="text-left font-bold px-0 py-2.5">Purpose</th>
            <th className="text-left font-bold px-0 py-2.5">Date</th>
            <th className="text-left font-bold px-0 py-2.5">Type</th>
            <th className="text-left font-bold px-0 py-2.5">Amount</th>
            <th className="text-left font-bold px-0 py-2.5">Status</th>
          </tr>
          {transactions.map((t) => (
            <tr>
              <td className="capitalize w-1/5 mx-0 my-2.5">
                <div
                  className="relative w-[50px] whitespace-nowrap overflow-x-hidden text-ellipsis lg:overflow-x-visible"
                  onClick={() => setClickItem(t._id)}
                >
                  {t._id}
                </div>
              </td>
              <td className="capitalize w-1/5 mx-0 my-2.5">
                <div
                  className="relative w-[50px] whitespace-nowrap overflow-x-hidden text-ellipsis lg:overflow-x-visible"
                  onClick={() => setClickItem(t.description)}
                >
                  {t.description}
                </div>
              </td>
              <Date>
                <div
                  className="relative w-[50px] whitespace-nowrap overflow-x-hidden text-ellipsis lg:overflow-x-visible"
                  onClick={() =>
                    setClickItem(
                      moment(t.createdAt).format("MMM DD YY, h:mm:ss a")
                    )
                  }
                >
                  {moment(t.createdAt).format("MMM DD YY, h:mm:ss a")}
                </div>
              </Date>
              <div className="font-light ml-[15px] lg:ml-0">{t.type}</div>
              <div className="font-light ml-[15px] lg:ml-0">
                {currency(region())} {t.amount}
              </div>
              <td>
                <button
                  className={`px-[7px] py-[5px] rounded-[0.2rem] border-0 text-green-color bg-[#d6f5dc] dark:bg-[#112014]`}
                >
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WidgetLarge
