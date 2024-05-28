import React, { useMemo, useState } from "react"
import { FaSortDown, FaSortUp } from "react-icons/fa"
import Pagination from "../layout/Pagination"
import LoadingControlModal from "../ui/loadin/LoadingControlLogo"

type Header = { title: string; hide?: boolean }
type Headers = Header[]

type HeaderTitle = Header["title"]

type Props<> = {
  headers: Header[]
  body: {
    keys: {
      [key in Headers[number]["title"]]: string | number | React.JSX.Element
    }

    action: React.JSX.Element
  }[]
  loading?: boolean
  error?: string | null
  itemName?: string
  totalPages?: number
  currentPage?: number
  totalCount?: number
  onPageChange?: (val: number) => void
  message?: string
}

const Table = ({
  body,
  headers,
  error,
  itemName,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  message,
}: Props) => {
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
        const aVal = a.keys[sortKey.key]
        const bVal = b.keys[sortKey.key]

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

  return (
    <div className="relative w-full h-full flex-1">
      {loading && (
        <div className="absolute bg-white/50 inset-0">
          <LoadingControlModal />
        </div>
      )}

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
                {sortedBody.length
                  ? sortedBody.map((bod) => (
                      <tr key={Math.random()}>
                        {headers.map((head) => (
                          <td
                            key={head.title}
                            className={`px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis ${
                              head.hide ? "hidden lg:table-cell" : ""
                            }`}
                          >
                            {bod.keys[head.title]}
                          </td>
                        ))}

                        <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                          {bod.action}
                        </td>
                      </tr>
                    ))
                  : undefined}
              </tbody>
            </table>

            {!loading && !error && sortedBody.length === 0 && (
              <div className="text-center my-10">
                {message
                  ? message
                  : `No ${itemName ? itemName : "data"} added yet`}
              </div>
            )}
          </div>
        </div>
      </div>

      {totalPages && totalPages >= 2 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

export default Table
