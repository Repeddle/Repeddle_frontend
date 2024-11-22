import { Link } from "react-router-dom"
import moment from "moment"
import { IReturn } from "../../types/order"
import Table from "./Table"

type Props = {
  returns: IReturn[]
  error?: string
  loading?: boolean
}

const headers = [
  { title: "ID" },
  { title: "Product" },
  { title: "Buyer", hide: true },
  { title: "Seller", hide: true },
  { title: "Order", hide: true },
  { title: "Date" },
]

const ReturnTable = ({ returns, error, loading }: Props) => {
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
                  src={ret.productId.images[0]}
                  alt={ret.productId.name}
                />
                {ret.productId.name}
              </Link>
            </div>
          ),
          Buyer: ret.orderId.buyer?.username ?? "",
          Seller: ret.productId.seller.username,
          Order: ret.orderId._id,
          Date: moment(ret.createdAt).format("MMM DD YY, h:mm a"),
        },
        action: (
          <Link to={`/return/${ret._id}?orderId=${ret.orderId._id}`}>
            <button className="text-orange-color dark:bg-dark-ev3 bg-[#fcf0e0] cursor-pointer mr-2.5 px-3 py-[5px] rounded-[0.2rem] border-none">
              View
            </button>
          </Link>
        ),
      }))}
    />
  )
}

export default ReturnTable
