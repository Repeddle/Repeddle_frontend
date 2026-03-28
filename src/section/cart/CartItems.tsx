import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { currency } from "../../utils/common";
import useToastNotification from "../../hooks/useToastNotification";
import { imageUrl } from "../../services/api";
import { ICartItem } from "../../types/cart";
import { useUpdateCart } from "../../querry/cart";

type Props = {
  item: ICartItem;
  setCurrentItem: (val: ICartItem) => void;
  setRemove: (val: boolean) => void;
  setShowModel: (val: boolean) => void;
};

const CartItems = ({
  item,
  setCurrentItem,
  setRemove,
  setShowModel,
}: Props) => {
  const { mutate: updateCart } = useUpdateCart();

  const { addNotification } = useToastNotification();

  return (
    <div className="lg:mt-0 lg:mb-5 lg:mx-2.5 p-5 rounded-[0.2rem] mx-0 my-2.5 bg-light-ev1 dark:bg-dark-ev1">
      <div className="flex items-center mb-4">
        <div className="mr-3.5 h-5 w-5 accent-orange-color cursor-pointer" />
        <img
          className="flex w-10 h-10 object-cover rounded-[50%]"
          src={imageUrl + item.product.seller.image}
          alt="img"
        />
        <div className="font-bold mx-5 my-0 text-malon-color cursor-pointer">
          <Link to={`/seller/${item.product.seller.username}`}>
            {item.product.seller.username}
          </Link>
        </div>
      </div>
      <hr className="mb-2" />
      {item.product.sold && <div className="text-[red]">Product out stock</div>}
      <div className="flex md:hidden">
        <div className="flex items-center mr-3">
          <input
            type="checkbox"
            checked={item.selected}
            className="h-4 w-4 accent-orange-color cursor-pointer"
            onChange={() =>
              updateCart({
                productId: item.product._id,
                selected: !item.selected,
              })
            }
          />
        </div>
        <img
          src={imageUrl + item.product.images[0]}
          alt={item.product.name}
          className={`max-w-full bg-white border rounded h-[100px] p-1 border-[#dee2e6] ${
            item.product.sold ? "opacity-50" : ""
          }`}
        />
        <div className="flex flex-col capitalize ml-5 justify-between">
          <div className={`${item.product.sold ? "opacity-50" : ""}`}>
            <Link to={`/product/${item.product.slug}`}>
              {item.product.name}
            </Link>

            <div>
              {currency(item.product.region)} {item.product.sellingPrice}
            </div>
            <span>Size: {item?.selectedSize}</span>
          </div>
          <div className="col-3 flex items-center flex-[3]">
            <button
              className={`text-black dark:text-white text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
              onClick={() =>
                updateCart({
                  productId: item.product._id,
                  quantity: item.quantity - 1,
                })
              }
              disabled={item.quantity === 1 || item.product.sold}
            >
              <FaMinus />
            </button>{" "}
            <span>{item.quantity}</span>{" "}
            <button
              className={`text-black dark:text-white text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
              onClick={() =>
                updateCart({
                  productId: item.product._id,
                  quantity: item.quantity + 1,
                })
              }
              disabled={
                item.quantity === item.product.countInStock || item.product.sold
              }
            >
              <FaPlus />
            </button>
            <div>
              <button
                className={`text-black dark:text-white text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
                onClick={() => {
                  setCurrentItem(item);
                  setRemove(true);
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
          <input
            type="checkbox"
            checked={item.selected}
            className="mr-5 h-5 w-5 accent-orange-color cursor-pointer"
            onChange={() =>
              updateCart({
                productId: item.product._id,
                selected: !item.selected,
              })
            }
          />
          <img
            src={imageUrl + item.product.images[0]}
            alt={item.product.name}
            className={`max-w-full bg-white border rounded h-[100px] p-1 border-[#dee2e6] ${
              item.product.sold ? "opacity-50" : ""
            }`}
          />
          <div
            className={`className="flex flex-col capitalize ml-5 justify-between ${
              item.product.sold ? "opacity-50" : ""
            }`}
          >
            <Link to={`/product/${item.product.slug}`}>
              {item.product.name}
            </Link>

            <div>
              {currency(item.product.region)} {item.product.sellingPrice}
            </div>
            <span>Size: {item.selectedSize}</span>
          </div>
        </div>
        <div className="col-3 d-flex align-items-center">
          <button
            className={`text-[0.8rem] text-orange-color rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
            onClick={() =>
              updateCart({
                productId: item.product._id,
                quantity: item.quantity - 1,
              })
            }
            disabled={item.quantity === 1 || item.product.sold}
          >
            <FaMinus />
          </button>{" "}
          <span>{item.quantity}</span>{" "}
          <button
            className={`text-[0.8rem] text-orange-color rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
            onClick={() =>
              updateCart({
                productId: item.product._id,
                quantity: item.quantity + 1,
              })
            }
            disabled={
              item.quantity === item.product.countInStock || item.product.sold
            }
          >
            <FaPlus />
          </button>
        </div>
        <div className="col-2">
          <button
            className={`text-malon-color text-[0.8rem] rounded cursor-pointer inline-block font-normal leading-normal text-center no-underline mx-[5px] my-0 px-3 py-1.5 border-none disabled:opacity-50 disabled:pointer-events-none`}
            onClick={() => {
              setCurrentItem(item);
              setRemove(true);
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className={`mt-5 flex ${item.product.sold ? "opacity-50" : ""}`}>
        <div className="ml-0 md:ml-10">
          Delivery:
          {item.deliverySelect ? (
            <span className="ml-5">
              {item.deliverySelect["delivery Option"]} +{" "}
              {currency(item.product.region)}
              {item.deliverySelect.cost}
            </span>
          ) : (
            ""
          )}
        </div>
        <div
          className="text-orange-color text-[15px] cursor-pointer ml-5 border-0 hover:text-malon-color"
          onClick={() => {
            if (item.product.sold) {
              addNotification("out of stock");
              return;
            }
            setCurrentItem(item);
            setShowModel(true);
          }}
        >
          {!item.deliverySelect ? (
            <div className="bg-orange-color text-white cursor-pointer py-[3px] px-[7px] rounded-[0.2rem] hover:bg-malon-color">
              Select delivery option
            </div>
          ) : (
            <div className="font-bold">Change</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
