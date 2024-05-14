import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ITransaction } from "../../types/transactions";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import moment from "moment";

type Props = {
  transactions: ITransaction[];
};

const headers = [
  { title: "ID", key: "_id" },
  { title: "Purpose", key: "purpose", hide: true },
  { title: "Date", key: "createdAt" },
  { title: "Type", key: "type", hide: true },
  { title: "Amount", key: "amount", hide: true },
  { title: "Status", key: "status" },
];

type tranKey = keyof ITransaction;

//   TODO:
const currency = "N";

const TransactionTable = ({ transactions }: Props) => {
  const [sortKey, setSortKey] = useState<{
    key: string;
    sort: "asc" | "desc";
  }>();

  const updateSort = (key: string) => {
    if (sortKey?.key === key && sortKey.sort === "desc") setSortKey(undefined);
    else if (sortKey?.key === key) setSortKey({ key, sort: "desc" });
    else setSortKey({ key, sort: "asc" });
  };

  const sortedTransactions = useMemo(() => {
    console.log("tran");
    if (sortKey && transactions[0][sortKey.key as tranKey]) {
      return transactions.sort((a, b) => {
        const aVal = a[sortKey.key as tranKey] ?? "";
        const bVal = b[sortKey.key as tranKey] ?? "";
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortKey.sort === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortKey.sort === "asc"
          ? aVal.toString().localeCompare(bVal.toString())
          : bVal.toString().localeCompare(aVal.toString());
      });
    }
    return transactions;
  }, [sortKey, transactions]);

  // TODO: table reduce width

  return (
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
              {sortedTransactions.map((tran) => (
                <tr key={tran._id}>
                  <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {tran._id}
                  </td>

                  <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {tran.meta.purpose}
                  </td>

                  <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {moment(tran.createdAt).format("MMM DD YY, h:mm a")}
                  </td>

                  <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {tran.type}
                  </td>

                  <td className="px-3 h-[52px] hidden lg:table-cell whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {currency} {tran.amount}
                  </td>

                  <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    Done
                  </td>

                  <td className="px-3 flex items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    <Link to={`/transaction/${tran._id}`}>
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
  );
};

export default TransactionTable;
