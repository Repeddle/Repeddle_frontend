import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ITopSellersWithPagination } from "../../types/user"
import { createSearchParam, currency, region } from "../../utils/common"
import useToastNotification from "../../hooks/useToastNotification"
import useUser from "../../hooks/useUser"
import Table from "../../components/table/Table"
import { imageUrl } from "../../services/api"

const headers = [
  { title: "ID" },
  { title: "User" },
  { title: "Date" },
  { title: "Earnings" },
]

const TopSellersPage = () => {
  const [users, setUsers] = useState<ITopSellersWithPagination>()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  // const [limit, setLimit] = useState(20)

  const { getTopSellers, error } = useUser()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const search = createSearchParam([["page", `${page}`]])
      const allUsers = await getTopSellers(search)

      if (typeof allUsers !== "string") {
        setUsers(allUsers)
      }

      setLoading(false)
    }

    fetchUsers()
  }, [page])

  useEffect(() => {
    if (error) addNotification(error)
  }, [error])

  return (
    <div className="flex-[4] overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        Top Sellers
      </h1>
      <div className="flex mr-2.5 mb-2.5 justify-end"></div>

      <Table
        headers={headers}
        error={error}
        loading={loading}
        itemName="user"
        currentPage={users?.currentPage}
        totalCount={users?.totalSellers}
        totalPages={users?.totalPages}
        onPageChange={setPage}
        body={
          !users
            ? []
            : users?.sellers.map((user) => ({
                keys: {
                  ID: user._id,
                  User: (
                    <div className="flex items-center gap-2.5">
                      <img
                        className="w-8 h-8 object-cover rounded-[50%]"
                        src={imageUrl + user.image}
                        alt={user.username}
                      />
                      <span>@{user.username}</span>
                    </div>
                  ),
                  Date: "",
                  Earnings:
                    currency(region()) + " " + (user.totalEarnings ?? 0),
                },
                action: (
                  <div className="flex items-center gap-2.5">
                    <Link to={`/dashboard/user/${user._id}`}>
                      <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
                        Edit
                      </button>
                    </Link>
                  </div>
                ),
              }))
        }
      />
    </div>
  )
}

export default TopSellersPage
