import { Link } from "react-router-dom"
import moment from "moment"
import { IReturn } from "../../types/order"
import Table from "./Table"
import { imageUrl } from "../../services/api"

type Props = {
  returns: IReturn[]
  error?: string
  loading?: boolean
  totalPages?: number
  currentPage?: number
  totalCount?: number
  onPageChange?: (val: number) => void
}

const headers = [
  { title: "ID", hide: true },
  { title: "Product" },
  { title: "Buyer", hide: true },
  { title: "Order", hide: true },
  { title: "Date" },
]

const UserReturnTable = ({ returns, error, loading }: Props) => {
  return (
    <Table
      headers={headers}
      error={error}
      itemName="return"
      loading={loading}
      body={returns.map((ret) => ({
        keys: {
          ID: ret._id,
          Product: (
            <div className="flex items-center gap-2.5">
              <Link
                to={`/product/${ret.productId.slug}`}
                className="hover:underline flex gap-2 items-center"
              >
                <img
                  className="w-8 h-8 object-cover rounded-[50%]"
                  src={imageUrl + ret.productId.images[0]}
                  alt={ret.productId.name}
                />
                {ret.productId.name}
              </Link>
            </div>
          ),
          Buyer: ret.orderId.buyer.username,
          Order: ret.orderId._id,
          Date: moment(ret.createdAt).format("MMM DD YY, h:mm a"),
        },
        action: (
          <Link to={`/return/${ret._id}`}>
            <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
              View
            </button>
          </Link>
        ),
      }))}
    />
  )
}

export default UserReturnTable
