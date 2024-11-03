import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import moment from "moment"
import { Link } from "react-router-dom"
import { IUsersWithPagination } from "../../types/user"
import { createSearchParam, currency, region } from "../../utils/common"
import useToastNotification from "../../hooks/useToastNotification"
import useUser from "../../hooks/useUser"
import Table from "../../components/table/Table"

const headers = [
  { title: "ID", hide: true },
  { title: "User" },
  { title: "Email", hide: true },
  { title: "Date", hide: true },
  { title: "Status" },
  { title: "Earnings" },
]

const UserList = () => {
  const [userQuery, setUserQuery] = useState("")
  const [users, setUsers] = useState<IUsersWithPagination>({
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
    users: [],
  })
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  // const [limit, setLimit] = useState(20)

  const { getAllUserAdmin, error } = useUser()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const search = createSearchParam([
        ["page", `${page}`],
        ["search", userQuery],
      ])
      const allUsers = await getAllUserAdmin(search)

      if (allUsers) {
        setUsers(allUsers)
      }

      setLoading(false)
    }

    fetchUsers()
  }, [page, userQuery])

  useEffect(() => {
    if (error) addNotification(error)
  }, [error])

  const deleteHandler = async (userId: string) => {
    if (window.confirm("Are you sure to delete")) {
      console.log(userId)
    }
  }

  return (
    <div className="flex-[4] overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        User List
      </h1>
      <div className="flex mr-2.5 mb-2.5 justify-end">
        <input
          className={`w-2/5 h-[45px] px-1 border border-malon-color focus-visible:outline focus-visible:outline-orange-color p-[15px] rounded-[5px]
          placeholder:p-2.5 text-black dark:text-white bg-white dark:bg-black`}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Search by username"
          type="search"
          value={userQuery}
        />
      </div>

      <Table
        headers={headers}
        error={error}
        loading={loading}
        itemName="user"
        currentPage={users.currentPage}
        totalCount={users.totalCount}
        totalPages={users.totalPages}
        onPageChange={setPage}
        body={users.users.map((user) => ({
          keys: {
            ID: user._id,
            User: (
              <div className="flex items-center gap-2.5">
                <img
                  className="w-8 h-8 object-cover rounded-[50%]"
                  src={user.image}
                  alt={user.username}
                />
                <span>@{user.username}</span>
              </div>
            ),
            Email: user.email,
            Date: moment(user.createdAt).format("MMM DD YY, h:mm a"),
            Status: user.active ? "active" : "banned",
            Earnings: currency(region()) + " " + (user.earnings ?? 0),
          },
          action: (
            <div className="flex items-center gap-2.5">
              <Link to={`/dashboard/user/${user._id}`}>
                <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
                  Edit
                </button>
              </Link>

              <FaTrash
                className="cursor-pointer text-red-color hover:text-lg"
                onClick={() => deleteHandler(user._id)}
              />
            </div>
          ),
        }))}
      />
    </div>
  )
}

export default UserList
