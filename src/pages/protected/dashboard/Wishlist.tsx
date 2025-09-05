import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Table from "../../../components/table/Table";
import { currency } from "../../../utils/common";
import useCart from "../../../hooks/useCart";
import useProducts from "../../../hooks/useProducts";
import { IProduct } from "../../../types/product";
import useToastNotification from "../../../hooks/useToastNotification";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/ui/Modal";
import { Wishlist as WishlistType } from "../../../types/user";
import { Link } from "react-router-dom";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { imageUrl } from "../../../services/api";
import useRegion from "../../../hooks/useRegion";

const headers = [
  // { title: "ID", hide: true },
  { title: "Product" },
  { title: "Stock" },
  { title: "Price" },
];

const Wishlist = () => {
  const { removeFromWishlist, user, error, getWishlist } = useAuth();
  const { addToCart, cart } = useCart();
  const { fetchProductBySlug } = useProducts();
  const { addNotification } = useToastNotification();
  const { region } = useRegion();

  const navigate = useNavigate();

  const [removeItem, setRemoveItem] = useState<IProduct>();
  const [addToCartItem, setAddToCartItem] = useState<IProduct>();
  const [removeFromWish, setRemoveFromWish] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistType[]>([]);
  const [selectSize, setSelectSize] = useState<string>();
  const [size, setSize] = useState("");

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const res = await getWishlist();
      if (res) setWishlist(res);
      else addNotification(error ? error : "An error occurred");
      setLoading(false);
    };

    getList();
  }, [refresh]);

  const openRemove = (item: IProduct) => {
    setRemoveItem(item);
    setShowRemove(true);
  };

  const closeRemove = () => {
    setShowRemove(false);
    setRemoveItem(undefined);
  };

  const closeShowSize = () => {
    setShowSize(false);
    setAddToCartItem(undefined);
  };

  const submitSize = async () => {
    if (!addToCartItem) return;

    if (!selectSize) {
      addNotification("Select Size");
      return;
    }

    addToCartHandler(addToCartItem);
  };

  const addToCartHandler = async (product: IProduct) => {
    const existItem = cart.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (user && product.seller._id === user._id) {
      addNotification("You can't buy your product");
      return;
    }

    if (!selectSize && product.sizes.length > 0) {
      addNotification("Select Size");
      setAddToCartItem(product);
      setShowSize(true);
      return;
    }

    const data = await fetchProductBySlug(product.slug);

    if (!data?.countInStock || data?.countInStock < quantity) {
      addNotification("Sorry. Product is out of stock");
      return;
    }

    addToCart({
      ...product,
      quantity,
      selectedSize: selectSize,
      // selectedColor?: string;
    });

    addNotification("Item added to Cart", "View Cart", false, () =>
      navigate("/cart")
    );

    const res = await removeFromWishlist(product._id);
    if (res) {
      setRefresh(true);
      addNotification(res);
      closeRemove();
    } else
      addNotification(
        error ? error : "Failed to remove from wishlist",
        undefined,
        true
      );

    closeShowSize();
  };

  const removeWishlistItem = async () => {
    if (!removeItem) return closeRemove();

    setRemoveFromWish(true);

    const res = await removeFromWishlist(removeItem._id);
    if (res) {
      setRefresh(true);
      addNotification(res);
      closeRemove();
    } else
      addNotification(
        error ? error : "Failed to remove from wishlist",
        undefined,
        true
      );

    setRemoveFromWish(false);
  };

  const sizeHandler = (item: string) => {
    if (!addToCartItem) return;

    const current = addToCartItem?.sizes.filter((s) => s.size === item) ?? [];

    if (current.length > 0) {
      setSize(`${item} ( ${current[0].quantity} left)`);
      setSelectSize(item);
    } else {
      setSize("Out of stock");
      setSelectSize(undefined);
    }
  };

  return (
    <div className="flex-[4] flex flex-col overflow-x-hidden mb-5 min-h-[85vh] lg:mx-5 lg:my-0 bg-light-ev1 dark:bg-dark-ev1 rounded-[0.2rem] mx-[5px] my-5">
      <h1 className="pt-5 pb-0 px-5 text-[calc(1.375rem_+_1.5vw)] font-medium leading-tight mb-2">
        Wishlist
      </h1>

      <Table
        headers={headers}
        itemName="product"
        loading={loading || removeFromWish}
        body={(wishlist ?? []).map((wish) => ({
          keys: {
            ID: wish._id,
            Product: (
              <div className="flex flex-1 gap-2.5 items-center">
                <img
                  className="w-8 h-8 object-cover rounded-[50%]"
                  src={imageUrl + wish.images[0]}
                  alt={wish.name}
                />
                <Link
                  to={`/product/${wish.slug}`}
                  className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis hover:underline"
                >
                  {wish.name}
                </Link>
              </div>
            ),
            Stock: wish.countInStock,
            Price: currency(region) + " " + wish.sellingPrice,
          },
          action: (
            <div className="flex gap-6 items-center">
              <FaCartPlus
                onClick={() => addToCartHandler(wish)}
                className="text-orange-color cursor-pointer text-xl"
              />

              <FaTrash
                onClick={() => openRemove(wish)}
                className="text-malon-color cursor-pointer text-xl"
              />
            </div>
          ),
        }))}
        messageJsx={
          <div>
            No product added yet. {"  "}
            <Link
              className="font-bold text-[15px] text-orange-color hover:text-malon-color"
              to={`/`}
            >
              Go Shopping
            </Link>
          </div>
        }
      />

      <Modal isOpen={showRemove} onClose={() => setShowRemove(false)}>
        <div className="p-2 items-center">
          <p className="text-lg mb-[15px] text-center mt-[25px]">
            Are you sure you want to remove this item
          </p>
          <div className="flex w-full gap-2.5 justify-end">
            <button
              className="flex items-center text-white-color bg-malon-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
              onClick={closeRemove}
              disabled={removeFromWish}
            >
              No
            </button>
            <button
              onClick={removeWishlistItem}
              disabled={removeFromWish}
              className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showSize} onClose={() => setShowSize(false)}>
        <div className="p-2 items-center">
          <div className="capitalize mx-0 my-2.5">select size: {size} </div>
          <div className="flex">
            {addToCartItem?.sizes.map(
              (size) =>
                size.quantity > 0 && (
                  <span key={size.size}>
                    <label
                      className={`w-[35px] text-sm h-[35px] flex justify-center items-center mr-5 rounded-[50%] border-2 border-orange-color ${
                        selectSize === size.size
                          ? "bg-orange-color text-white"
                          : ""
                      }  `}
                      onClick={() => sizeHandler(size.size)}
                    >
                      {size.size}
                    </label>
                  </span>
                )
            )}
          </div>
          <div className="flex w-full gap-2.5 justify-end">
            <button
              className="flex items-center text-white-color bg-malon-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
              onClick={closeShowSize}
            >
              Cancel
            </button>
            <button
              className="flex items-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
              onClick={submitSize}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Wishlist;
