import React, { useMemo, useState } from "react"
import { FaSortDown, FaSortUp } from "react-icons/fa"

type Header = { title: string; hide?: boolean }

type HeaderTitle = Header["title"]

type Props<T> = {
  headers: Header[]
  body: ({ [key: HeaderTitle]: { value: string | number } } & {
    action: (val: T) => React.JSX.Element
    data: T
  })[]
}

const Table = <T,>({ body, headers }: Props<T>) => {
  const [sortKey, setSortKey] = useState<{
    key: HeaderTitle
    sort: "asc" | "desc"
  }>()

  const updateSort = (key: HeaderTitle) => {
    if (sortKey?.key === key && sortKey.sort === "desc") setSortKey(undefined)
    else if (sortKey?.key === key) setSortKey({ key, sort: "desc" })
    else setSortKey({ key, sort: "asc" })
  }

  const sortedBody = useMemo(() => {
    if (sortKey) {
      return body.sort((a, b) => {
        const aVal = a[sortKey.key]
        const bVal = b[sortKey.key]

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortKey.sort === "asc" ? aVal - bVal : bVal - aVal
        }

        return sortKey.sort === "asc"
          ? aVal.toString().localeCompare(bVal.toString())
          : bVal.toString().localeCompare(aVal.toString())
      })
    }
    return body
  }, [sortKey, body])

  // TODO: table reduce width

  return (
    <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="py-2 px-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-x-hidden w-full sm:rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={i}
                    onClick={() => updateSort(header.title)}
                    scope="col"
                    className={`cursor-pointer px-3 h-14 lg:w-[14%] text-left text-sm font-medium text-black dark:text-white tracking-wider ${
                      header.hide ? "hidden lg:table-cell" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {header.title}
                      <span>
                        {header.title === sortKey?.key &&
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
              {sortedBody.map((bod) => (
                <tr key={Math.random()}>
                  {headers.map((head) => (
                    <td
                      className={`px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis ${
                        head.hide ? "hidden lg:table-cell" : ""
                      }`}
                    >
                      {bod[head.title].value}
                    </td>
                  ))}

                  <td className="px-3 flex items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                    {bod.action(bod.data)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
