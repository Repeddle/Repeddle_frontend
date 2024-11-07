import moment from "moment";
import { useState } from "react";
import LoadingBox from "./LoadingBox";
import { currency, region } from "../utils/common";
import { ITransaction } from "../types/transactions";

type Props = {
  refresh?: boolean;
  transactions: ITransaction[];
};

const WidgetLarge = ({ refresh, transactions }: Props) => {
  const loadingTrans = false;

  console.log(refresh);

  const [clickItem, setClickItem] = useState("");

  return loadingTrans ? (
    <LoadingBox />
  ) : (
    <div className="flex-[2] bg-light-ev1 dark:bg-dark-ev1 p-4 rounded-[0.2rem] w-full">
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-semibold">Latest transactions </div>
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
            <tr key={t._id}>
              <td className="capitalize mx-0 my-2.5">
                <span
                  className="block cursor-pointer w-[50px] whitespace-nowrap overflow-x-hidden text-ellipsis "
                  onClick={() => setClickItem(t._id)}
                >
                  {t._id}
                </span>
              </td>
              <td className="capitalize w-1/5 mx-0 my-2.5">
                <span
                  className="block cursor-pointer w-[50px] whitespace-nowrap overflow-x-hidden text-ellipsis "
                  onClick={() => setClickItem(t.description)}
                >
                  {t.description}
                </span>
              </td>
              <td>
                <div
                  className="block cursor-pointer w-[100px] whitespace-nowrap overflow-x-hidden text-ellipsis "
                  onClick={() =>
                    setClickItem(
                      moment(t.createdAt).format("MMM DD YY, h:mm:ss a")
                    )
                  }
                >
                  {moment(t.createdAt).format("MMM DD YY, h:mm:ss a")}
                </div>
              </td>
              <td>
                <div className="font-light ml-[15px] lg:ml-0">{t.type}</div>
              </td>
              <td>
                <div className="font-light ml-[15px] lg:ml-0">
                  {currency(region())} {t.amount}
                </div>
              </td>
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

      {transactions.length === 0 && (
        <div className="text-center mt-4">No transactions added yet</div>
      )}
    </div>
  );
};

export default WidgetLarge;
