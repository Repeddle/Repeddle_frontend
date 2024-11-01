import LoadingBox from "../../components/LoadingBox"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"
import {
  bestSeller,
  productDetails,
  summary,
  user as userData,
  viewedProduct,
} from "../../utils/data"
import moment from "moment"
import { FaEye, FaPen } from "react-icons/fa"
import FeatureInfo from "../../components/FeatureInfo"

const Analytics = () => {
  const { user } = useAuth()

  const error = ""

  const users = [userData, userData]
  const bestseller = [bestSeller]
  const products = [productDetails]
  const soldProducts = [productDetails]
  const mostView = [viewedProduct]
  const users2 = []

  return (
    <div className="flex-[4] min-w-0 lg:px-5 py-0">
      {error ? (
        error
      ) : !summary ? (
        <LoadingBox />
      ) : (
        <div className="flex gap-5 ml-0 mt-0 mb-5 flex-wrap lg:flex-nowrap">
          {user?.role === "Admin" && summary.orders ? (
            <FeatureInfo type="user" number={summary.users[0].numUsers} />
          ) : (
            ""
          )}
          <FeatureInfo
            type="order"
            number={
              summary.orders.length > 0 && user?.role === "Admin"
                ? summary.orders[0].numOrders
                : users2.length
            }
          />
          <FeatureInfo
            type="product"
            number={
              summary.orders.length > 0 && user?.role === "Admin"
                ? summary.products[0].numProducts
                : products
                ? products?.length
                : 0
            }
          />
          <FeatureInfo
            type="earning"
            number={
              summary.earnings.length > 0 && user?.role === "Admin"
                ? summary.earnings[0].numSales
                : 0
            }
          />
        </div>
      )}
      <div className="min-w-0 flex-1 mb-5 p-5 rounded-[0.2rem] w-full lg:w-auto mr-0 bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex items-center mb-2 justify-between w-full">
          <div className="lg:text-[22px] font-semibold text-xl">
            New Joined Members
          </div>
          <Link to="/admin/userlist">See All</Link>
        </div>
        {!users ? (
          <LoadingBox />
        ) : (
          <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
            {users.map((user) => (
              <div className="relative w-[180px] bg-light-ev2 dark:bg-dark-ev2">
                <img
                  className="w-[180px] h-[180px] object-cover rounded-[0.2rem]"
                  src={user.image}
                  alt="item"
                />

                <div className="font-bold capitalize whitespace-nowrap w-[180px] overflow-hidden text-ellipsis m-[5px]">
                  {user.firstName} {user.lastName}
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
            ))}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 mb-5 p-5 rounded-[0.2rem] w-full lg:w-auto mr-0 bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex items-center mb-2 justify-between w-full">
          <div className="lg:text-[22px] font-semibold text-xl">
            Top Sellers
          </div>
          <Link to="/admin/topsellers">See All</Link>
        </div>
        {!bestseller ? (
          <LoadingBox />
        ) : (
          <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
            {bestseller.map((user) => (
              <div className="relative w-[180px] bg-light-ev2 dark:bg-dark-ev2">
                <img
                  className="w-[180px] h-[180px] object-cover rounded-[0.2rem]"
                  src={user.userId.image}
                  alt="item"
                />

                <div className="font-bold capitalize whitespace-nowrap w-[180px] overflow-hidden text-ellipsis m-[5px]">
                  {user.userId.username}
                </div>
                <div className="mx-0.5 my-0">
                  {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </div>
                <div className="mx-0.5 my-0">
                  {user.userId.sold.length} sold
                </div>

                <div className="flex justify-between items-center w-[170px] m-[5px]">
                  <Link to={`/seller/${user.userId._id}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaEye className="text-base mr-[5px]" /> View
                    </div>
                  </Link>
                  <Link to={`/dashboard/user/${user.userId._id}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaPen className="text-base mr-[5px]" /> Edit
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
        {error ? (
          error
        ) : !products ? (
          <LoadingBox />
        ) : (
          <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
            {products.map((product) => (
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
            ))}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 mb-5 p-5 rounded-[0.2rem] w-full lg:w-auto mr-0 bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex items-center justify-between w-full">
          <div className="lg:text-[22px] font-semibold text-xl">
            Out Of Stock Products
          </div>
          <Link to="/admin/allproducts">See All</Link>
        </div>
        {error ? (
          error
        ) : !soldProducts ? (
          <LoadingBox />
        ) : (
          <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
            {soldProducts.map((product) => (
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
            ))}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 mb-5 p-5 rounded-[0.2rem] w-full lg:w-auto mr-0 bg-light-ev1 dark:bg-dark-ev1">
        <div className="flex items-center justify-between w-full">
          <div className="lg:text-[22px] font-semibold text-xl">
            Most Viewed Products
          </div>
          <Link to="/dashboard/allproducts">See All</Link>
        </div>
        {error ? (
          error
        ) : !mostView ? (
          <LoadingBox />
        ) : (
          <div className="flex scroll-smooth gap-5 overflow-x-auto scrollbar-hide snap">
            {mostView.map((product) => (
              <div className="relative w-[180px] bg-light-ev2 dark:bg-dark-ev2">
                <img
                  className="w-[180px] h-[180px] object-cover rounded-[0.2rem]"
                  src={product.productId.image}
                  alt="item"
                />

                <div className="font-bold capitalize whitespace-nowrap w-[180px] overflow-hidden text-ellipsis m-[5px]">
                  {product.productId.name}
                </div>
                <div className="mx-0.5 my-0">{product.numViews} Views</div>
                <div className="flex justify-between items-center w-[170px] m-[5px]">
                  <Link to={`/product/${product.productId.slug}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaEye className="text-base mr-[5px]" /> View
                    </div>
                  </Link>
                  <Link to={`/dashboard/product/${product.productId._id}`}>
                    <div className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none">
                      <FaPen className="text-base mr-[5px]" /> Edit
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics
