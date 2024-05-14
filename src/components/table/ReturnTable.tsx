import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import moment from "moment";
import { IReturn } from "../../types/order";

type Props = {
  returns: IReturn[];
};

const headers = [
  { title: "ID", key: "_id", hide: true },
  { title: "Product", key: "name" },
  { title: "Buyer", key: "username", hide: true },
  { title: "Seller", key: "seller", hide: true },
  { title: "Order", key: "orderId", hide: true },
  { title: "Date", key: "createdAt" },
];

type RetKey = keyof IReturn;

const ReturnTable = ({ returns }: Props) => {
  const [sortKey, setSortKey] = useState<{
    key: string;
    sort: "asc" | "desc";
  }>();

  const updateSort = (key: string) => {
    if (sortKey?.key === key && sortKey.sort === "desc") setSortKey(undefined);
    else if (sortKey?.key === key) setSortKey({ key, sort: "desc" });
    else setSortKey({ key, sort: "asc" });
  };

  const sortedReturns = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (sortKey && returns[sortKey.key as RetKey]) {
      return returns.sort((a, b) => {
        const aVal = a[sortKey.key as RetKey] ?? "";
        const bVal = b[sortKey.key as RetKey] ?? "";
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortKey.sort === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortKey.sort === "asc"
          ? aVal.toString().localeCompare(bVal.toString())
          : bVal.toString().localeCompare(aVal.toString());
      });
    }
    return returns;
  }, [returns, sortKey]);

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
              {sortedReturns.map((ret) => (
                <tr key={ret._id}>
                  <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {ret._id}
                  </td>

                  <td className="px-3 flex gap-2.5 items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    <Link
                      to={`/product/${ret.productId.slug}`}
                      className="hover:underline flex gap-2 items-center"
                    >
                      <img
                        className="w-8 h-8 object-cover rounded-[50%]"
                        src={ret.productId.images[0]}
                        alt={ret.productId.name}
                      />
                      {ret.productId.name}
                    </Link>
                  </td>

                  <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {ret.orderId.user.username}
                  </td>

                  <td className="px-3 h-[52px] hidden lg:table-cell whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {ret.productId.seller.username}
                  </td>

                  <td className="px-3 h-[52px] hidden lg:table-cell whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {ret.orderId._id}
                  </td>

                  <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {moment(ret.createdAt).format("MMM DD YY, h:mm a")}
                  </td>

                  <td className="px-3 flex items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    <Link to={`/return/${ret._id}?orderId=${ret.orderId._id}`}>
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

export default ReturnTable;
