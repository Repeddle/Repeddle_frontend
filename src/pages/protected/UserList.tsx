import { useEffect, useMemo, useState } from "react"
import { FaSortDown, FaSortUp, FaTrash } from "react-icons/fa"
import moment from "moment"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { IUser } from "../../types/user"
import { currency, region } from "../../utils/common"
import useToastNotification from "../../hooks/useToastNotification"

const headers = [
  { title: "ID", key: "_id", hide: true },
  { title: "User", key: "username" },
  { title: "Email", key: "email", hide: true },
  { title: "Date", key: "createdAt", hide: true },
  { title: "Status", key: "active" },
  { title: "Earnings", key: "earnings" },
] as const
type headerKey = (typeof headers)[number]["key"]

const UserList = () => {
  const [userQuery, setUserQuery] = useState("")
  const [users, setUsers] = useState<IUser[]>([])

  const { getAllUser, error } = useAuth()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUser()

      if (allUsers) setUsers(allUsers)
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    if (error) addNotification(error)
  }, [error])

  const [sortKey, setSortKey] = useState<{
    key: headerKey
    sort: "asc" | "desc"
  }>()

  const updateSort = (key: headerKey) => {
    if (sortKey?.key === key && sortKey.sort === "desc") setSortKey(undefined)
    else if (sortKey?.key === key) setSortKey({ key, sort: "desc" })
    else setSortKey({ key, sort: "asc" })
  }

  const deleteHandler = async (userId: string) => {
    if (window.confirm("Are you sure to delete")) {
      console.log(userId)
    }
  }

  const sortedUsers = useMemo(() => {
    if (sortKey) {
      return users.sort((a, b) => {
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
    return users
  }, [sortKey, users])

  return (
    <div className="flex-[4] overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        User List
      </h1>
      <div className="flex mr-2.5 mb-2.5 justify-end">
        <input
          className={`w-2/5 h-[45px] border border-malon-color focus-visible:outline focus-visible:outline-orange-color p-[15px] rounded-[5px]
          placeholder:p-2.5 text-black dark:text-white bg-white dark:bg-black`}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Search by id"
          type="search"
          value={userQuery}
        />
      </div>

      {/* TODO: table reduce width  */}
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
                      className={`cursor-pointer px-3 h-14 w-[14%] text-left text-sm font-medium text-black dark:text-white tracking-wider ${
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
                {sortedUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {user._id}
                    </td>

                    <td className="px-3 flex gap-2.5 items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      <img
                        className="w-8 h-8 object-cover rounded-[50%]"
                        src={user.image}
                        alt={user.username}
                      />
                      <span>@{user.username}</span>
                    </td>

                    <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {user.email}
                    </td>

                    <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {moment(user.createdAt).format("MMM DD YY, h:mm a")}
                    </td>

                    <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {user.active ? "active" : "banned"}
                    </td>

                    <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {currency(region())} {user.earnings}
                    </td>

                    <td className="px-3 flex items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      <Link to={`/dashboard/user/${user._id}`}>
                        <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
                          Edit
                        </button>
                      </Link>

                      <FaTrash
                        className="cursor-pointer text-red-color hover:text-lg"
                        onClick={() => deleteHandler(user._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList
