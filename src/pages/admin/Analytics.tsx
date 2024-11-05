import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"
import moment from "moment"
import { FaEye, FaPen } from "react-icons/fa"
import FeatureInfo from "../../components/FeatureInfo"
import { useEffect, useState } from "react"
import { Analytics } from "../../types/user"
import useUser from "../../hooks/useUser"
import useToastNotification from "../../hooks/useToastNotification"
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal"

const Analytics = () => {
  const { user } = useAuth()
  const { addNotification } = useToastNotification()
  const { fetchAnalytics } = useUser()

  const [analytics, setAnalytics] = useState<Analytics>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetchAnalytics()
      if (typeof res !== "string") {
        console.log(res)
        setAnalytics(res)
      } else {
        addNotification(res, undefined, true)
        setError(res)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="flex-[4] min-w-0 lg:px-5 py-0">
      {loading ? (
        <LoadingLogoModal />
      ) : !analytics ? (
        error
      ) : (
        <div className="flex gap-5 ml-0 mt-0 mb-5 flex-wrap lg:flex-nowrap">
          {user?.role === "Admin" ? (
            <FeatureInfo type="user" number={analytics.totalUsers} />
          ) : (
            ""
          )}
          <FeatureInfo type="order" number={analytics.totalOrders} />
          <FeatureInfo type="product" number={analytics.totalProducts} />
          <FeatureInfo type="earning" number={analytics.totalEarnings} />
        </div>
      )}
      <div className="min-w-0 flex-1 mb-5 p-5 rounded-[0.2rem] w-full lg:w-auto mr-0 bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex items-center mb-2 justify-between w-full">
          <div className="lg:text-[22px] font-semibold text-xl">
            New Joined Members
          </div>
          <Link to="/admin/userlist">See All</Link>
        </div>

        <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
          {analytics && analytics.newMembers.length ? (
            analytics.newMembers.map((user) => (
              <div className="relative w-[180px] bg-light-ev2 dark:bg-dark-ev2">
                <img
                  className="w-[180px] h-[180px] object-cover rounded-[0.2rem]"
                  src={user.image}
                  alt="item"
                />

                <div className="font-bold capitalize whitespace-nowrap w-[180px] overflow-hidden text-ellipsis m-[5px]">
                  {/* {user.firstName} {user.lastName} */}
                  {user.username}
                </div>
                <div className="mx-0.5 my-0">
                  {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </div>

                <div className="flex justify-between items-center w-[170px] m-[5px]">
                  <Link to={`/seller/${user.username}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaEye className="text-base mr-[5px]" /> View
                    </div>
                  </Link>
                  <Link to={`/dashboard/user/${user._id}`}>
                    <div className="flex items-center text-white-color bg-malon-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaPen className="text-base mr-[5px]" /> Edit
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="my-4 text-center">No new member</div>
          )}
        </div>
      </div>
      <div className="min-w-0 flex-1 mb-5 p-5 rounded-[0.2rem] w-full lg:w-auto mr-0 bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex items-center mb-2 justify-between w-full">
          <div className="lg:text-[22px] font-semibold text-xl">
            Top Sellers
          </div>
          <Link to="/admin/topsellers">See All</Link>
        </div>

        <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
          {analytics && analytics.topSellers.length ? (
            analytics.topSellers.map((user) => (
              <div className="relative w-[180px] bg-light-ev2 dark:bg-dark-ev2">
                <img
                  className="w-[180px] h-[180px] object-cover rounded-[0.2rem]"
                  src={user.image}
                  alt="item"
                />

                <div className="font-bold capitalize whitespace-nowrap w-[180px] overflow-hidden text-ellipsis m-[5px]">
                  {user.username}
                </div>
                <div className="mx-0.5 my-0">
                  {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </div>
                <div className="mx-0.5 my-0">{user.totalSales} sold</div>

                <div className="flex justify-between items-center w-[170px] m-[5px]">
                  <Link to={`/seller/${user._id}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaEye className="text-base mr-[5px]" /> View
                    </div>
                  </Link>
                  <Link to={`/dashboard/user/${user._id}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaPen className="text-base mr-[5px]" /> Edit
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="my-4 text-center">No Top Sellers</div>
          )}
        </div>
      </div>
      <div className="min-w-0 flex-1 mb-5 p-5 rounded-[0.2rem] w-full lg:w-auto mr-0 bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="lg:text-[22px] font-semibold text-xl truncate">
            Recently Added Products
          </div>
          <Link to="/admin/allproducts/" className="text-nowrap">
            See All
          </Link>
        </div>

        <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
          {analytics && analytics.recentProducts.length ? (
            analytics.recentProducts.map((product) => (
              <div className="relative w-[180px] bg-light-ev2 dark:bg-dark-ev2">
                <img
                  className="w-[180px] h-[180px] object-cover rounded-[0.2rem]"
                  src={product.images[0]}
                  alt="item"
                />

                <div className="font-bold capitalize whitespace-nowrap w-[180px] overflow-hidden text-ellipsis m-[5px]">
                  {product.name}
                </div>
                <div className="mx-0.5 my-0">
                  {moment(product.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </div>
                <div className="flex justify-between items-center w-[170px] m-[5px]">
                  <Link to={`/product/${product.slug}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaEye className="text-base mr-[5px]" /> View
                    </div>
                  </Link>
                  <Link to={`/dashboard/product/${product._id}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaPen className="text-base mr-[5px]" /> Edit
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="my-4 text-center">No new member</div>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1 mb-5 p-5 rounded-[0.2rem] w-full lg:w-auto mr-0 bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex items-center justify-between w-full">
          <div className="lg:text-[22px] font-semibold text-xl">
            Out Of Stock Products
          </div>
          <Link to="/admin/allproducts">See All</Link>
        </div>

        <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
          {analytics && analytics.outOfStockProducts.length ? (
            analytics.outOfStockProducts.map((product) => (
              <div className="relative w-[180px] bg-light-ev2 dark:bg-dark-ev2">
                <img
                  className="w-[180px] h-[180px] object-cover rounded-[0.2rem]"
                  src={product.images[0]}
                  alt="item"
                />
                <div className="flex items-center justify-center opacity-50 w-[180px] h-[180px] absolute rounded-[0%] left-0 top-0 bg-white-color dark:bg-black-color">
                  <div className="font-bold text-orange-color text-xl">
                    SOLD
                  </div>
                </div>

                <div className="font-bold capitalize whitespace-nowrap w-[180px] overflow-hidden text-ellipsis m-[5px]">
                  {product.name}
                </div>
                <div className="mx-0.5 my-0">
                  {moment(product.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </div>
                <div className="flex justify-between items-center w-[170px] m-[5px]">
                  <Link to={`/product/${product.slug}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaEye className="text-base mr-[5px]" /> View
                    </div>
                  </Link>
                  <Link to={`/dashboard/product/${product._id}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaPen className="text-base mr-[5px]" /> Edit
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="my-4 text-center">No out of stock products</div>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1 mb-5 p-5 rounded-[0.2rem] w-full lg:w-auto mr-0 bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex items-center justify-between w-full">
          <div className="lg:text-[22px] font-semibold text-xl">
            Most Viewed Products
          </div>
          <Link to="/dashboard/allproducts">See All</Link>
        </div>

        <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
          {analytics && analytics.mostViewedProducts.length ? (
            analytics.mostViewedProducts.map((product) => (
              <div className="relative w-[180px] bg-light-ev2 dark:bg-dark-ev2">
                <img
                  className="w-[180px] h-[180px] object-cover rounded-[0.2rem]"
                  src={product.images[0]}
                  alt="item"
                />

                <div className="font-bold capitalize whitespace-nowrap w-[180px] overflow-hidden text-ellipsis m-[5px]">
                  {product.name}
                </div>
                <div className="mx-0.5 my-0">
                  {product.viewcount?.length} Views
                </div>
                <div className="flex justify-between items-center w-[170px] m-[5px]">
                  <Link to={`/product/${product.slug}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaEye className="text-base mr-[5px]" /> View
                    </div>
                  </Link>
                  <Link to={`/dashboard/product/${product._id}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaPen className="text-base mr-[5px]" /> Edit
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="my-4 text-center">No most Viewed products</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics
