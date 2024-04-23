import { Link } from "react-router-dom"
import { CartItem } from "../../context/CartContext"
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa"
import useCart from "../../hooks/useCart"

type Props = {
  item: CartItem
  setCurrentItem: (val: CartItem) => void
  setRemove: (val: boolean) => void
  setShowModel: (val: boolean) => void
}

const CartItems = ({
  item,
  setCurrentItem,
  setRemove,
  setShowModel,
}: Props) => {
  const { addToCart } = useCart()

  return (
    <div className="lg:mt-0 lg:mb-5 lg:mx-2.5 p-5 rounded-[0.2rem] mx-0 my-2.5 bg-light-ev1 dark:bg-dark-ev1">
      <div className="flex items-center mb-5">
        <img
          className="flex w-10 h-10 object-cover rounded-[50%]"
          src={item.seller.image}
          alt="img"
        />
        <div className="font-bold mx-5 my-0">
          <Link to={`/seller/${item.seller._id}`}>{item.seller.username}</Link>
        </div>
      </div>
      <hr />
      {item.sold && <div className="text-[red]">Product out stock</div>}
      <div className="flex md:hidden">
        <img
          src={item.images[0]}
          alt={item.name}
          className={`max-w-full bg-white border rounded h-[100px] p-1 border-[#dee2e6] ${
            item.sold ? "opacity-50" : ""
          }`}
        />
        <div className="flex flex-col capitalize ml-5 justify-between">
          <div className={`${item.sold ? "opacity-50" : ""}`}>
            <Link to={`/product/${item.slug}`}>{item.name}</Link>

            <div>
              {" "}
              {/* TODO:  */}
              {/* {item.currency} */}N {item.sellingPrice}
            </div>
            <span>Size: {item?.selectedSize}</span>
          </div>
          <div className="col-3 flex items-center flex-[3]">
            <button
              className={`text-white text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
              onClick={() =>
                addToCart({ ...item, quantity: item.quantity - 1 })
              }
              disabled={item.quantity === 1 || item.sold}
            >
              <FaMinus />
            </button>{" "}
            <span>{item.quantity}</span>{" "}
            <button
              className={`text-white text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
              onClick={() =>
                addToCart({ ...item, quantity: item.quantity + 1 })
              }
              disabled={item.quantity === item.countInStock || item.sold}
            >
              <FaPlus />
            </button>
            <div>
              <button
                className={`text-white text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
                onClick={() => {
                  setCurrentItem(item)
                  setRemove(true)
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="items-center hidden md:flex justify-between">
        <div className="col-5 flex flex-[5] items-center">
          <img
            src={item.images[0]}
            alt={item.name}
            className={`max-w-full bg-white border rounded h-[100px] p-1 border-[#dee2e6] ${
              item.sold ? "opacity-50" : ""
            }`}
          />
          <div
            className={`className="flex flex-col capitalize ml-5 justify-between ${
              item.sold ? "opacity-50" : ""
            }`}
          >
            <Link to={`/product/${item.slug}`}>{item.name}</Link>

            <div>
              {" "}
              {/* TODO:  */}
              {/* {item.currency} */}N {item.sellingPrice}
            </div>
            <span>Size: {item.selectedSize}</span>
          </div>
        </div>
        <div className="col-3 d-flex align-items-center">
          <button
            className={`text-white text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
            onClick={() => addToCart({ ...item, quantity: item.quantity - 1 })}
            disabled={item.quantity === 1 || item.sold}
          >
            <FaMinus />
          </button>{" "}
          <span>{item.quantity}</span>{" "}
          <button
            className={`text-white text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
            onClick={() => addToCart({ ...item, quantity: item.quantity + 1 })}
            disabled={item.quantity === item.countInStock || item.sold}
          >
            <FaPlus />
          </button>
        </div>
        <div className="col-2">
          <button
            className={`text-white text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
            onClick={() => {
              setCurrentItem(item)
              setRemove(true)
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className={`mt-5 flex ${item.sold ? "opacity-50" : ""}`}>
        <div>
          Delivery: {/* TODO: not on type  */}
          {/* {item.deliverySelect ? (
            <span className="ml-5">
              {item.deliverySelect["delivery Option"]} + {currency}
              {item.deliverySelect.cost}
            </span>
          ) : (
            ""
          )} */}
        </div>
        <div
          className="text-orange-color text-[15px] cursor-pointer ml-5 border-0 hover:text-malon-color"
          onClick={() => {
            if (item.sold) {
              //  TODO:  show alert out of stock
            }
            setCurrentItem(item)
            setShowModel(true)
          }}
        >
          {/* TODO: no on type */}
          {/* {!item.deliverySelect ? (
            <div className="bg-orange-color text-white cursor-pointer py-[3px] px-[7px] rounded-[0.2rem] hover:bg-malon-color">
              Select delivery option
            </div>
          ) : (
            <div style={{ fontWeight: "bold" }}>Change</div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default CartItems