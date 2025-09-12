import { useEffect, useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa"
import moment from "moment"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useProducts from "../../hooks/useProducts"
import useToastNotification from "../../hooks/useToastNotification"
import { createSearchParam, currency } from "../../utils/common"
import MessageBox from "../../components/MessageBox"
import Table from "../../components/table/Table"
import { imageUrl } from "../../services/api"

const headers = [
  { title: "ID", hide: true },
  { title: "Product" },
  { title: "Stock", hide: true },
  { title: "Status", hide: true },
  { title: "Date", hide: true },
  { title: "Price" },
]

const AllProductList = () => {
  const { user } = useAuth()
  const { fetchProducts, loading, error, products, deleteProduct } =
    useProducts()
  const { addNotification } = useToastNotification()

  const [productQuery, setProductQuery] = useState("")
  const [page, setPage] = useState(1)
  const [debouncedQuery, setDebouncedQuery] = useState(productQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(productQuery)
      setPage(1)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [productQuery])

  useEffect(() => {
    const string = createSearchParam([
      ["search", debouncedQuery],
      ["page", page.toString()],
    ])

    fetchProducts(string)
  }, [debouncedQuery, user?.role, page])

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure to delete")) {
      const res = await deleteProduct(id)
      if (res.message) addNotification(res.message)
    }
  }

  return (
    <div className="flex-[4] relative mb-5 min-h-[85vh] h-full flex flex-col lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <div className="pt-5 pb-0 px-5 mb-6 flex flex-col items-start md:items-center md:flex-row gap-6 md:justify-between">
        <h1 className="text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight">
          All Products
        </h1>
      </div>
      <div className="flex mx-2.5 ml-6 gap-3 mb-2.5 justify-between">
        <Link
          to={user?.isSeller ? "/newproduct" : "/sell"}
          className="flex px-2 text-nowrap py-[5px] items-center cursor-pointer font-bold bg-orange-color text-white-color lg:px-4 lg:py-2.5 rounded-[0.2rem]"
        >
          <FaPlus className="mr-2.5" />
          Add Product
        </Link>
        <input
          className={`w-1/2 sm:w-3/5 md:w-2/5 h-[45px] border border-malon-color focus-visible:outline focus-visible:outline-orange-color p-2 sm:p-[15px] rounded-[5px]
          placeholder:p-2.5 text-black dark:text-white bg-white dark:bg-black`}
          onChange={(e) => setProductQuery(e.target.value)}
          placeholder="Search "
          type="search"
          value={productQuery}
        />
      </div>
      <div className="relative h-full w-full flex-1">
        {!loading && error && (
          <MessageBox className="text-[red]">{error}</MessageBox>
        )}

        <Table
          headers={headers}
          message={
            productQuery.length && !products.products.length
              ? "No product matches search"
              : undefined
          }
          error={error}
          itemName="products"
          totalPages={products.totalPages}
          currentPage={page}
          onPageChange={setPage}
          totalCount={products.totalCount}
          body={products.products.map((prod) => ({
            key: prod._id,
            keys: {
              ID: prod._id,
              Product: (
                <div className="flex gap-2.5 items-center">
                  <img
                    className="w-8 h-8 object-cover rounded-[50%]"
                    src={imageUrl + prod.images[0]}
                    alt={prod.name}
                  />
                  <Link
                    to={`/product/${prod.slug}`}
                    className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis hover:underline"
                  >
                    {prod.name}
                  </Link>
                </div>
              ),
              Status: prod.countInStock ? (
                <span className="text-green-color">In Stock</span>
              ) : (
                <span className="text-red-color">Out of Stock</span>
              ),
              Stock: prod.countInStock,
              Date: moment(prod.createdAt).format("MMM DD YY, h:mm a"),
              Price: currency(prod.region) + " " + prod.sellingPrice,
            },
            action: (
              <div className="flex gap-1 items-center">
                <Link to={`/dashboard/product/${prod._id}`}>
                  <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
                    Edit
                  </button>
                </Link>

                {user?.role === "Admin" && (
                  <FaTrash
                    className="cursor-pointer text-red-color hover:text-lg"
                    onClick={() => deleteHandler(prod._id)}
                  />
                )}
              </div>
            ),
          }))}
        />
      </div>
    </div>
  )
}

export default AllProductList
