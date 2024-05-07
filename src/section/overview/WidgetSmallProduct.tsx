import { IProduct } from "../../types/product"
import { FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"

type Props = {
  products?: IProduct[]
}

const WidgetSmallProduct = ({ products }: Props) => {
  return (
    <div className="flex-1 mr-5 p-5 rounded-[0.2rem] w-full lg:w-auto bg-light-ev1 dark:bg-dark-ev1">
      <div className="text-[22px] font-semibold">My New Added Product</div>
      <ul>
        {products &&
          products.map((u, index) => (
            <li
              className="flex items-center justify-between mx-0 my-5"
              key={index}
            >
              <img
                className="w-10 h-10 object-cover rounded-[50%]"
                src={u.images[0]}
                alt="profile"
              />
              <div className="flex flex-col">
                <span className="font-semibold w-20 whitespace-nowrap overflow-hidden text-ellipsis">
                  {u.name}
                </span>
                <span className="font-light">{u.category}</span>
              </div>
              <Link to={`/product/${u.slug}`}>
                <button className="flex items-center bg-orange-color text-white-color cursor-pointer px-2.5 py-[5px] rounded-[0.2rem] border-none">
                  <FaEye className="text-base mr-[5px]" /> View
                </button>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default WidgetSmallProduct
