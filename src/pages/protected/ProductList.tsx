import { useMemo, useState } from "react"
import { FaSortDown, FaSortUp, FaTrash } from "react-icons/fa"
import { productDetails } from "../../utils/data"
import moment from "moment"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { IProduct } from "../../types/product"

const headers = [
  { title: "ID", key: "_id", hide: true },
  { title: "Product", key: "name" },
  { title: "Stock", key: "countInStock", hide: true },
  { title: "Status", key: "active", hide: true },
  { title: "Date", key: "createdAt", hide: true },
  { title: "Price", key: "sellingPrice" },
]

type ProdKey = keyof IProduct

//   TODO:
const currency = "N"

const ProductList = () => {
  const { user } = useAuth()

  const [productQuery, setProductQuery] = useState("")

  const [sortKey, setSortKey] = useState<{
    key: string
    sort: "asc" | "desc"
  }>()

  const updateSort = (key: string) => {
    if (sortKey?.key === key && sortKey.sort === "desc") setSortKey(undefined)
    else if (sortKey?.key === key) setSortKey({ key, sort: "desc" })
    else setSortKey({ key, sort: "asc" })
  }

  const deleteHandler = async (userId: string) => {
    if (window.confirm("Are you sure to delete")) {
      console.log(userId)
    }
  }

  const sortedProducts = useMemo(() => {
    if (sortKey && productDetails[sortKey.key as ProdKey]) {
      return [productDetails].sort((a, b) => {
        const aVal = a[sortKey.key as ProdKey] ?? ""
        const bVal = b[sortKey.key as ProdKey] ?? ""
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortKey.sort === "asc" ? aVal - bVal : bVal - aVal
        }

        return sortKey.sort === "asc"
          ? aVal.toString().localeCompare(bVal.toString())
          : bVal.toString().localeCompare(aVal.toString())
      })
    }
    return [productDetails]
  }, [sortKey])

  return (
    <div className="flex-[4] overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        My Products
      </h1>
      <div className="flex mr-2.5 mb-2.5 justify-end">
        <input
          className={`w-2/5 h-[45px] border border-malon-color focus-visible:outline focus-visible:outline-orange-color p-[15px] rounded-[5px]
          placeholder:p-2.5 text-black dark:text-white bg-white dark:bg-black`}
          onChange={(e) => setProductQuery(e.target.value)}
          placeholder="Search "
          type="search"
          value={productQuery}
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
                {sortedProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {product._id}
                    </td>

                    <td className="px-3 flex gap-2.5 items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      <img
                        className="w-8 h-8 object-cover rounded-[50%]"
                        src={product.images[0]}
                        alt={product.name}
                      />
                      <Link
                        to={`/product/${product.slug}`}
                        className="w-[60px] whitespace-nowrap overflow-hidden text-ellipsis hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>

                    <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {product.countInStock}
                    </td>

                    <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {product.countInStock ? (
                        <span className="text-green-color">In Stock</span>
                      ) : (
                        <span className="text-red-color">Out of Stock</span>
                      )}
                    </td>

                    <td className="px-3 hidden lg:table-cell h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {moment(product.createdAt).format("MMM DD YY, h:mm a")}
                    </td>

                    <td className="px-3 h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      {currency} {product.sellingPrice}
                    </td>

                    <td className="px-3 flex items-center h-[52px] whitespace-nowrap w-auto overflow-hidden text-ellipsis">
                      <Link to={`/dashboard/product/${product._id}`}>
                        <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
                          Edit
                        </button>
                      </Link>

                      {user?.isAdmin && (
                        <FaTrash
                          className="cursor-pointer text-red-color hover:text-lg"
                          onClick={() => deleteHandler(product._id)}
                        />
                      )}
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

export default ProductList