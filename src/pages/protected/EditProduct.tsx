import { FormEvent, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { currency, region, uploadImage } from "../../utils/common"
import useAuth from "../../hooks/useAuth"
import Modal from "../../components/ui/Modal"
import FeeStructure from "../defaults/info/FeeStructure"
import {
  FaCheck,
  FaCheckCircle,
  FaQuestionCircle,
  FaTimes,
  FaUpload,
} from "react-icons/fa"
import Condition from "../defaults/info/Condition"
import MessageImage from "../../components/ui/MessageImage"
import LoadingBox from "../../components/LoadingBox"
import useCategory from "../../hooks/useCategory"
import useToastNotification from "../../hooks/useToastNotification"
import CropImage from "../../components/cropImage/CropImage"
import Chart from "../../components/Chart"
import AddOtherBrand from "../../components/AddOtherBrand"
import useBrands from "../../hooks/useBrand"
import useProducts from "../../hooks/useProducts"
import DeliveryOption from "../../components/DeliveryOption"
import {
  IDeliveryOption,
  IProduct,
  ISize,
  InputData,
  ProductMeta,
} from "../../types/product"
import { colors } from "../../utils/constants"
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal"
import MessageBox from "../../components/MessageBox"

const EditProduct = () => {
  const params = useParams()
  const { id } = params

  const { user } = useAuth()
  const { fetchCategories, categories } = useCategory()
  const { fetchBrands, brands: searchBrand } = useBrands()
  const { fetchProductById } = useProducts()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    fetchCategories()
  }, [])

  const [sizes, setSizes] = useState<ISize[]>([])

  const [active, setActive] = useState(false)
  const [badge, setBadge] = useState(false)
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")

  const [showUploadingImage, setShowUploadingImage] = useState(false)

  const [showConditionModal, setShowConditionModal] = useState(false)
  const [showOtherBrand, setShowOtherBrand] = useState(false)
  const [showComissionModal, setShowComissionModal] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)
  const [countInStock, setCountInStock] = useState(1)
  const [addSize, setAddSize] = useState(sizes.length < 1)

  const [brandQuery, setBrandQuery] = useState("")

  const [deliveryOption, setDeliveryOption] = useState<IDeliveryOption[]>([
    { name: "Pick up from Seller", value: 0 },
  ])
  const [validationError, setValidationError] = useState({
    name: "",
    product: "",
    category: "",
    subCategory: "",
    brand: "",
    tag: "",
    condition: "",
    material: "",
    description: "",
    price: "",
    color: "",
    selectedSize: "",
    specification: "",
    keyFeatures: "",
    image: "",
  })
  const [input, setInput] = useState<InputData>({
    name: "",
    product: "",
    category: "",
    subCategory: "",
    brand: "",
    tag: "",
    condition: "",
    material: "",
    description: "",
    price: "",
    color: [],
    selectedSize: "",
    specification: "",
    keyFeatures: "",
    image: "",
  })

  const [paxi, setPaxi] = useState(region() === "ZAR")
  const [gig, setGig] = useState(false)
  const [pudoLocker, setPudoLocker] = useState(false)
  const [pudoDoor, setPudoDoor] = useState(false)
  const [postnet, setPostnet] = useState(false)
  const [aramex, setAramex] = useState(false)
  const [pickup, setPickup] = useState(true)
  const [bundle, setBundle] = useState(false)
  const [meta, setMeta] = useState<ProductMeta>({})
  const [currentImage, setCurrentImage] = useState("image1")
  const [product, setProduct] = useState<IProduct>()
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getFilterBrand = async () => {
      const params: string[][] = [["search", brandQuery]]

      const string = new URLSearchParams(params).toString()

      await fetchBrands(string)
    }

    if (brandQuery) getFilterBrand()
  }, [brandQuery])

  useEffect(() => {
    const getProductData = async () => {
      if (id) {
        setLoading(true)
        const data = await fetchProductById(id)
        if (typeof data !== "string") {
          setProduct(data)
          setCurrentImage(data.images[0])
          setInput({
            ...input,
            brand: data.brand ?? input.brand,
            category: data.category ?? input.category,
            color: data.color ?? input.color,
            condition: data.condition ?? input.condition,
            description: data.description ?? input.description,
            keyFeatures: data.keyFeatures ?? input.keyFeatures,
            material: data.material ?? input.material,
            name: data.name ?? input.name,
            price: data.sellingPrice.toString() ?? input.price,
            product: data.mainCategory ?? input.product,
            specification: data.specification ?? input.specification,
            subCategory: data.subCategory ?? input.subCategory,
          })
          setAddSize(!data.sizes.length)
          setSizes(data.sizes)
          setActive(data?.active ?? false)
          setTags(data.tags)
        } else setError(data)
      }
      setLoading(false)
    }

    getProductData()
  }, [id])

  const [loadingUpload, setLoadingUpload] = useState(false)

  const validation = (e: FormEvent) => {
    e.preventDefault()
  }

  const notAvailable = async () => {}

  const handleSold = async () => {}

  const handleOnChange = (text: string, inputVal: keyof typeof input) => {
    setInput((prevState) => ({ ...prevState, [inputVal]: text }))
  }

  const handleError = (
    errorMessage: string,
    input: keyof typeof validationError
  ) => {
    setValidationError((prevState) => ({
      ...prevState,
      [input]: errorMessage,
    }))
  }

  const handleTags = (tag: string) => {
    if (tag.includes(" ")) {
      addNotification("Please remove space")
      return
    }

    if (tags.length > 5) {
      addNotification("You can't add more five tags ")

      return
    }
    if (tag.length > 0) {
      setTags([...tags, tag])
      handleOnChange("", "tag")
    }
  }
  const removeTags = (tag: string) => {
    const newtags = tags.filter((data) => data != tag)
    setTags(newtags)
  }

  const discountCalc = () => {
    if (parseInt(price) < parseInt(discount)) return null
    return ((parseInt(price) - parseInt(discount)) / parseInt(price)) * 100
  }

  const smallSizeHandler = (label: string, value: string) => {
    setSizes((prevSizes) => {
      const sizeIndex = prevSizes.findIndex((x) => x.size === label)
      if (sizeIndex !== -1) {
        const updatedSizes = [...prevSizes]
        updatedSizes[sizeIndex].quantity = +value
        return updatedSizes
      }
      return prevSizes
    })
  }

  const uploadHandler = async (file: File, fileType: string) => {
    setLoadingUpload(true)
    try {
      const res = await uploadImage(file)
      handleOnChange(res, fileType as keyof typeof input)
    } catch (error) {
      addNotification(error as string)
    }
  }

  const sizeHandler = (sizenow: string) => {
    if (!sizenow) {
      addNotification("Please enter size")
      return
    }

    const exist = sizes.some((s) => s.size === sizenow)

    if (exist) {
      const newSizes = sizes.filter((s) => s.size !== sizenow)
      setSizes(newSizes)
    } else {
      setSizes((prevSizes) => [...prevSizes, { size: sizenow, quantity: 1 }])
    }

    setInput((prev) => ({ ...prev, selectedSize: "" }))
  }

  const productData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
  ]

  return (
    <div className="flex-[4]">
      <div className="flex items-center justify-between">
        <h1 className="text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] font-medium leading-tight">
          Product
        </h1>
        {product && (
          <Link to="/dashboard/newproduct">
            <button className="w-20 text-white-color bg-orange-color cursor-pointer p-[5px] rounded-[0.2rem] border-none">
              Create
            </button>
          </Link>
        )}
      </div>

      {error && <MessageBox className="text-[red]">{error}</MessageBox>}
      {loading && <LoadingLogoModal />}
      {product && (
        <>
          {!product.sold &&
            (product.isAvailable ? (
              <button
                className="text-white bg-malon-color cursor-pointer mb-2.5 px-5 py-[5px] rounded-[0.2rem] border-none"
                onClick={notAvailable}
              >
                No Longer Available
              </button>
            ) : (
              <button
                className="text-white bg-malon-color cursor-pointer mb-2.5 px-5 py-[5px] rounded-[0.2rem] border-none"
                onClick={notAvailable}
              >
                Mark as Available
              </button>
            ))}

          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
              <Chart
                title="Sales Performance"
                data={productData}
                dataKey="uv"
              />
            </div>
            <div className="mx-[5px] my-2.5 flex-1 lg:mx-5 lg:my-0 p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 object-cover mr-5 rounded-[50%]"
                  src={product.images[0]}
                  alt=""
                />
                <div className="font-semibold">{product.name}</div>
              </div>
              <div className="mt-2.5">
                <div className="flex items-center w-full">
                  <div className="capitalize flex-1">id:</div>
                  <div className="capitalize flex-1 font-light">
                    {product._id}
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="capitalize flex-1">seller:</div>
                  <div className="capitalize flex-1 font-light">
                    {product.seller.username}
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="capitalize flex-1">product status:</div>
                  <div
                    className={`capitalize flex-1 font-light ${
                      product.active ? "text-[green]" : "text-malon-color"
                    }`}
                  >
                    {product.active ? "active" : "not active"}
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="capitalize flex-1">in stock:</div>
                  <div className="capitalize flex-1 font-light">
                    {product.countInStock > 0 ? "yes" : "no"}
                  </div>
                </div>
                <Link
                  className="text-sm text-orange-color"
                  to={`/product/${product.slug}`}
                >
                  Click to view full details
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:m-5 bg-light-ev1 dark:bg-dark-ev1 p-5 rounded-[0.2rem] mx-[5px] my-5">
            <form
              className="flex justify-between flex-col lg:flex-row"
              onSubmit={validation}
            >
              <div className="flex flex-col flex-1">
                <label className="text-sm mt-[15px] mb-2.5">Product Name</label>
                <input
                  className="w-[250px] mb-2.5 p-[5px] focus-visible:outline-0 border-b-light-ev3 bg-transparent dark:border-b-dark-ev3 text-black dark:text-white border-b  focus-visible:border-b-orange-color focus-visible:border-b"
                  type="text"
                  value={input.name}
                  onChange={(e) => handleOnChange(e.target.value, "name")}
                />
                {user?.role === "Admin" && (
                  <>
                    <label className="text-sm mt-[15px] mb-2.5">Active</label>
                    <div className="flex items-center">
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                  after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                  checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                  checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                  after:bg-white dark:after:bg-black p-[5px]`}
                        type="radio"
                        name="active"
                        id="active"
                        value="yes"
                        checked={active}
                        onChange={() => {
                          setActive(true)
                        }}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="active"
                      >
                        Yes
                      </label>
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                    after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                    checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                    checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                    after:bg-white dark:after:bg-black p-[5px]`}
                        type="radio"
                        name="active"
                        id="active2"
                        value="no"
                        checked={!active}
                        onChange={() => setActive(false)}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="active2"
                      >
                        No
                      </label>
                    </div>
                    <label className="text-sm mt-[15px] mb-2.5">Badge</label>
                    <div className="flex items-center">
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                    after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                    checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                    checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                    after:bg-white dark:after:bg-black p-[5px]`}
                        type="radio"
                        name="badge"
                        id="badgeyes"
                        value="yes"
                        checked={badge}
                        onChange={() => setBadge(true)}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="badgeyes"
                      >
                        Yes
                      </label>
                      <input
                        className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                    after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                    checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                    checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                    after:bg-white dark:after:bg-black p-[5px]`}
                        type="radio"
                        name="badge"
                        id="badgeno"
                        value="no"
                        checked={!badge}
                        onChange={() => setBadge(false)}
                      />
                      <label
                        className="text-lg font-light mx-2.5 my-0"
                        htmlFor="badgeno"
                      >
                        No
                      </label>
                    </div>
                  </>
                )}
                {user?.role === "Admin" && (
                  <div
                    className={`w-6/12 flex items-center justify-center mx-0 my-2.5 p-[5px] rounded-[0.2rem]
                ${
                  product.sold
                    ? "text-white bg-malon-color cursor-not-allowed"
                    : "text-white bg-orange-color cursor-pointer"
                }`}
                    onClick={!product.sold ? handleSold : undefined}
                  >
                    <FaCheckCircle className="mr-[5px]" /> Mark
                    {product.sold ? "ed" : ""} as sold
                  </div>
                )}
                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] mb-2.5">
                    Main Category
                  </label>

                  <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                    <select
                      value={input.product}
                      onChange={(e) =>
                        handleOnChange(e.target.value, "product")
                      }
                      className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    >
                      {categories.length > 0 &&
                        categories.map((cat) => (
                          <option value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] mb-2.5">Category</label>

                  <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                    <select
                      value={input.category}
                      onChange={(e) =>
                        handleOnChange(e.target.value, "category")
                      }
                      className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    >
                      {categories.length > 0 &&
                        categories.map(
                          (cat) =>
                            cat.name === input.product &&
                            cat.subCategories.map((sub) => (
                              <option value={sub.name}>{sub.name}</option>
                            ))
                        )}
                    </select>
                  </div>
                </div>

                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] mb-2.5">
                    Sub Category
                  </label>

                  <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                    <select
                      value={input.subCategory}
                      onChange={(e) =>
                        handleOnChange(e.target.value, "subCategory")
                      }
                      className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    >
                      {categories.length > 0 &&
                        categories.map(
                          (cat) =>
                            cat.name === input.product &&
                            cat.subCategories.map(
                              (sub) =>
                                sub.name === input.category &&
                                sub.items.map((item) => (
                                  <option value={item.name}>{item.name}</option>
                                ))
                            )
                        )}
                    </select>
                  </div>
                </div>
                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] flex mb-2.5 items-center">
                    Condition{" "}
                    <div
                      data-content="What happens if I’m not certain of my product condition?
                  Should you not be certain which condition your product falls under when listing, we suggest you choose between the last three option depending on what you see (if your product isn’t NEW or with TAG) and take very clear visible photos indicating every little details. Also, to avoid returns and help you sell fast, give every possible information in your product description so as to clearly inform buyer about your product’s condition."
                      className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                    >
                      <FaQuestionCircle className="text-black ml-2.5" />
                    </div>{" "}
                    <span
                      className="underline text-[11px] font-normal cursor-pointer ml-2.5 hover:text-orange-color"
                      onClick={() => setShowConditionModal(true)}
                    >
                      help?
                    </span>
                  </label>
                  <Modal
                    onClose={() => setShowConditionModal(false)}
                    isOpen={showConditionModal}
                  >
                    <Condition />
                  </Modal>

                  <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                    <select
                      value={input.condition}
                      onChange={(e) =>
                        handleOnChange(e.target.value, "condition")
                      }
                      className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    >
                      <option value="">-- select --</option>
                      <option value="New with Tags">New with Tags</option>
                      <option value="New with No Tags">New with No Tags</option>
                      <option value="Excellent Condition">
                        Excellent Condition
                      </option>
                      <option value="Good Condition">Good Condition</option>
                      <option value="Fair Condition">Fair Condition</option>
                    </select>
                  </div>
                  {validationError.condition && (
                    <div className="text-[red] text-xs">
                      {validationError.condition}
                    </div>
                  )}
                </div>
                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] flex mb-2.5 items-center">
                    Material{" "}
                    <div
                      data-content="How do I know what the primary material of the product is? This information is mostly indicated on the Product labels, please refer to the label detailing the composition of your Product."
                      className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                    >
                      <FaQuestionCircle className="text-black ml-2.5" />
                    </div>
                  </label>

                  <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
                    Specify Product's primary material.
                  </div>

                  <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                    <select
                      value={input.material}
                      onChange={(e) =>
                        handleOnChange(e.target.value, "material")
                      }
                      className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    >
                      <option value="">-- select --</option>
                      <option value="Acrylic">Acrylic</option>
                      <option value="Cashmere">Cashmere</option>
                      <option value="Cloth">Cloth</option>
                      <option value="Cotton">Cotton</option>
                      <option value="Exotic leathers">Exotic leathers</option>
                      <option value="Faux fur">Faux fur</option>
                      <option value="Fur">Fur</option>
                      <option value="Faux Leather">Faux Leather</option>
                      <option value="Leather">Leather</option>
                      <option value="Linen">Linen</option>
                      <option value="Polyester">Polyester</option>
                      <option value="Polyurethane">Polyurethane</option>
                      <option value="Pony-style calfskin">
                        Pony-style calfskin
                      </option>
                      <option value="Suede">Suede</option>
                      <option value="Silk">Silk</option>
                      <option value="Rayon">Rayon</option>
                      <option value="Synthetic">Synthetic</option>
                      <option value="Spandex">Spandex</option>
                      <option value="Tweed">Tweed</option>
                      <option value="Vegan leather">Vegan leather</option>
                      <option value="Velvet">Velvet</option>
                      <option value="Wool">Wool</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {validationError.material && (
                    <div className="text-[red] text-xs">
                      {validationError.material}
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] mb-2.5">
                    Description
                  </label>
                  <textarea
                    className="h-[100px] p-2.5 rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4 text-black dark:text-white bg-transparent focus-visible:outline focus-visible:outline-orange-color"
                    value={input.description}
                    placeholder="Describe your product by giving buyers more information. Start with Headline, Condition, Material, Style & Size.

            Be concise and only use relevant keywords."
                    onChange={(e) =>
                      handleOnChange(e.target.value, "description")
                    }
                  />
                </div>

                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] mb-2.5">
                    Delivery Option
                  </label>
                  {deliveryOption.map((d) => (
                    <div className="flex items-center" key={d.name}>
                      <FaCheck className="mr-2.5 text-orange-color" />
                      {d.name}
                    </div>
                  ))}
                  <div
                    className="text-orange-color cursor-pointer text-center"
                    onClick={() => setShowDelivery(true)}
                  >
                    Add delivery option
                  </div>
                  <Modal
                    onClose={() => setShowDelivery(false)}
                    isOpen={showDelivery}
                    size="lg"
                  >
                    <DeliveryOption
                      setShowModel={setShowDelivery}
                      paxi={paxi}
                      setPaxi={setPaxi}
                      gig={gig}
                      setGig={setGig}
                      pudoLocker={pudoLocker}
                      pudoDoor={pudoDoor}
                      setPudoLocker={setPudoLocker}
                      setPudoDoor={setPudoDoor}
                      aramex={aramex}
                      setAramex={setAramex}
                      postnet={postnet}
                      setPostnet={setPostnet}
                      pickup={pickup}
                      setPickup={setPickup}
                      bundle={bundle}
                      setBundle={setBundle}
                      setDeliveryOption={setDeliveryOption}
                      meta={meta}
                      setMeta={setMeta}
                      deliveryOption={deliveryOption}
                    />
                  </Modal>
                </div>

                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] mb-2.5">Add Tags #</label>
                  <div>
                    <div className="flex items-center overflow-hidden border h-10 bg-transparent rounded-[0.2rem] border-light-ev4 dark:border-dark-ev4">
                      <input
                        className="flex-1 h-10 p-2.5 border-none focus-visible:outline-none bg-transparent"
                        value={input.tag}
                        placeholder="Add tags"
                        type="text"
                        onChange={(e) => handleOnChange(e.target.value, "tag")}
                      />
                      <div
                        className="text-white cursor-pointer mx-[5px] my-0 px-[5px] py-0.5 bg-malon-color"
                        onClick={() => handleTags(input.tag)}
                      >
                        Add
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      {tags.map((t, i) => (
                        <div
                          className="flex items-center m-[5px] px-[5px] py-0.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2"
                          key={i}
                        >
                          {t}
                          <FaTimes
                            onClick={() => removeTags(t)}
                            className="ml-2.5 text-[11px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-start flex-col lg:flex-row lg:items-center">
                  <div className="relative flex flex-col lg:w-[118px] mr-[5px] mt-2.5 w-full">
                    <label className="text-sm mt-[15px] mb-2.5">
                      Cost Price
                    </label>
                    <input
                      className="border h-10 bg-transparent p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
                      type="number"
                      placeholder={product.costPrice?.toString()}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="relative flex flex-col lg:w-[118px] mr-[5px] mt-2.5 w-full">
                    <label className="text-sm mt-[15px] mb-2.5">
                      Selling Price
                    </label>
                    <div className="flex items-center">
                      <input
                        className="border h-10 bg-transparent p-2.5 w-[100px] mr-[5px] rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
                        placeholder={product.sellingPrice.toString()}
                        type="number"
                        onChange={(e) => {
                          setDiscount(e.target.value)
                        }}
                      />
                      <span>
                        {discountCalc() ? (
                          <span className="text-[11px]">
                            {discountCalc()?.toFixed(0)}% discount
                          </span>
                        ) : null}
                      </span>
                    </div>
                  </div>
                </div>{" "}
                <div className="flex m-2.5">
                  <div className="text-[25px] font-light mr-5 text-orange-color">
                    {currency(product.region)}
                    {discount || price}
                  </div>
                  <div className="text-[25px] font-light line-through text-malon-color">
                    {discount
                      ? parseInt(discount) < parseInt(price)
                        ? `${currency(product.region)}${price}`
                        : null
                      : null}
                  </div>
                </div>
                <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
                  <div
                    onClick={() => setShowComissionModal(true)}
                    className="text-[red] text-xs underline cursor-pointer"
                  >
                    Our Commission
                  </div>
                </div>
                <Modal
                  onClose={() => setShowComissionModal(false)}
                  isOpen={showComissionModal}
                  size="lg"
                >
                  <FeeStructure />
                </Modal>
                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] mb-2.5">Brands</label>
                  <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
                    Can't find the brand you're listing? Search & use Other
                  </div>
                  <input
                    className="border h-10 bg-transparent p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
                    placeholder="Search Brand"
                    type="search"
                    value={input.brand.length > 0 ? input.brand : brandQuery}
                    onChange={(e) => {
                      handleOnChange("", "brand")
                      setBrandQuery(e.target.value)
                    }}
                    onBlur={() => input.brand.length > 0 && setBrandQuery("")}
                  />
                  <div className="absolute max-h-[300px] overflow-auto z-[9] rounded-br-[0.2rem] rounded-bl-[0.2rem] top-[120px] bg-light-ev2 dark:bg-dark-ev2">
                    {searchBrand &&
                      brandQuery.length > 0 &&
                      [
                        ...searchBrand,
                        { name: "Other", _id: Math.random() },
                      ].map((b) => (
                        <div
                          className="text-[15px] cursor-pointer px-5 py-2.5 hover:bg-light-ev3 dark:hover:bg-dark-ev3"
                          key={b._id}
                          onClick={() => {
                            if (b.name === "Other") {
                              setShowOtherBrand(true)
                            } else {
                              handleOnChange(b.name, "brand")
                            }
                            setBrandQuery("")
                          }}
                        >
                          {b.name}
                        </div>
                      ))}
                  </div>

                  <Modal
                    onClose={() => setShowOtherBrand(false)}
                    isOpen={showOtherBrand}
                  >
                    <AddOtherBrand
                      setShowOtherBrand={setShowOtherBrand}
                      handleOnChange={handleOnChange}
                    />
                  </Modal>
                  {validationError.brand && (
                    <div className="text-[red] text-xs">
                      {validationError.brand}
                    </div>
                  )}
                </div>
                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] flex mb-2.5 items-center">
                    Color{" "}
                    <div
                      data-content="How can I ensure that color of the 
                  product is clear? For you to get accuracy in 
                  color. Please take photos using a good source 
                  of natural light to ensure clear color. The 
                  best and 
                  accurate photos always sale 95% faster"
                      className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                    >
                      <FaQuestionCircle className="text-black ml-2.5" />
                    </div>
                  </label>
                  <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
                    Specify the main colour of the product (choose 2 colours
                    minimum)
                  </div>

                  <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                    <select
                      value={input.color}
                      multiple
                      onChange={(e) => handleOnChange(e.target.value, "color")}
                      className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    >
                      <option value="">-- select --</option>
                      {colors.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  {validationError.color && (
                    <div className="text-[red] text-xs">
                      {validationError.color}
                    </div>
                  )}
                </div>
                <div className="flex mt-5 mb-2.5 items-center">
                  <label className="mr-2.5">Item do not require size</label>
                  <input
                    type="checkbox"
                    className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                    checked={addSize}
                    onChange={(e) => {
                      setSizes([])
                      setAddSize(e.target.checked)
                    }}
                  />
                </div>
                <div className="flex lg:flex-row lg:gap-5 flex-col gap-0 m-0 lg:mb-5">
                  {!addSize ? (
                    <div className="flex-1">
                      <>
                        <div className="relative flex flex-col lg:w-[400px] mr-5 mt-0 w-full">
                          <label className="text-sm flex items-center mt-[15px] mb-2.5">
                            Add Size
                            <div
                              data-content="If I feel the product and the size seems to differ from what indicated on the label, what should I do?
                          Please be advised to list the product with the size printed on the label. Mentioning the size discrepancy, you noticed in the product description helps a great deal for buyers to make informed size decision. If buyers are forewarned, they will not be disappointed. This minimizes the chances of your products been returned as a result of unfit size."
                              className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                          hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                          lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                        hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                            >
                              <FaQuestionCircle className="text-black ml-2.5" />
                            </div>
                          </label>

                          <div className="flex bg-transparent overflow-hidden items-center border h-10 rounded-[0.2rem] border-light-ev4 dark:border-dark-ev4">
                            <input
                              className="flex-1 h-10 p-2.5 border-0 focus-visible:outline-none bg-transparent"
                              value={input.selectedSize}
                              type="text"
                              maxLength={4}
                              placeholder="Add size"
                              onChange={(e) => {
                                handleOnChange(
                                  e.target.value.slice(0, 4),
                                  "selectedSize"
                                )
                                handleError("", "selectedSize")
                              }}
                            />
                            <div
                              className="text-white cursor-pointer mx-[5px] my-0 px-[5px] py-0.5 bg-malon-color"
                              onClick={() => sizeHandler(input.selectedSize)}
                            >
                              Add
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap">
                          <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
                            Provide the exact size as indicated on your
                            product's label.
                          </div>
                          {sizes.map((s) => (
                            <div className="m-2.5">
                              <label className="text-sm mt-[15px] mb-2.5">
                                {s.size}
                              </label>
                              :
                              <input
                                className="bg-transparent numeric-arrow ml-[5px] text-xs border h-5 w-10 p-2.5 rounded-[0.2rem] text-black dark:text-white focus-visible:outline focus-visible:outline-orange-color"
                                placeholder="qty"
                                type="number"
                                maxLength={4}
                                value={s.quantity}
                                onChange={(e) => {
                                  smallSizeHandler(
                                    s.size,
                                    e.target.value.slice(0, 4)
                                  )
                                  handleError("", "selectedSize")
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    </div>
                  ) : (
                    <div className="relative flex flex-col lg:w-[400px] mr-5 mt-0 w-full">
                      <label className="text-sm mt-[15px] mb-2.5">
                        Count in stock
                      </label>
                      <input
                        className="border h-10 bg-transparent p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
                        type="number"
                        value={countInStock}
                        onChange={(e) => setCountInStock(+e.target.value)}
                      />
                    </div>
                  )}
                </div>
                {validationError.selectedSize && (
                  <div className="text-[red] text-xs">
                    {validationError.selectedSize}
                  </div>
                )}
                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] mb-2.5">
                    Specification
                  </label>
                  <textarea
                    className="h-[100px] p-2.5 rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4 text-black dark:text-white bg-transparent focus-visible:outline focus-visible:outline-orange-color"
                    value={input.specification}
                    placeholder="FOR CHILDREN'S WEAR/SH0ES, Please manually enter the Size/Age
            brackets as shown on the label of clothes/shoes"
                    onChange={(e) =>
                      handleOnChange(e.target.value, "specification")
                    }
                  />
                </div>
                <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
                  <label className="text-sm mt-[15px] mb-2.5">
                    Key Features: Pattern & Printed
                  </label>

                  <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                    <select
                      value={input.keyFeatures}
                      onChange={(e) =>
                        handleOnChange(e.target.value, "keyFeatures")
                      }
                      className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    >
                      <option value="">-- select --</option>
                      <option value="Abstract">Abstract</option>
                      <option value="Argyle">Argyle</option>
                      <option value="Camo">Camo</option>
                      <option value="Checked">Checked</option>
                      <option value="Chevron & Herringbone">
                        Chevron & Herringbone
                      </option>
                      <option value="Color Block">Color Block</option>
                      <option value="Crocodile">Crocodile</option>
                      <option value="Floral">Floral</option>
                      <option value="Gingham">Gingham</option>
                      <option value="Graphic">Graphic</option>
                      <option value="Houndstooth">Houndstooth</option>
                      <option value="Leopard">Leopard</option>
                      <option value="Metalic">Metalic</option>
                      <option value="Paisley">Paisley</option>
                      <option value="Plain">Plain</option>
                      <option value="Polkadot">Polkadot</option>
                      <option value="Snakeskin">Snakeskin</option>
                      <option value="Stripes">Stripes</option>
                      <option value="Stars">Stars</option>
                      <option value="Solid">Solid</option>
                      <option value="Tartan">Tartan</option>
                      <option value="Tie-Dye">Tie-Dye</option>
                      <option value="Tropical">Tropical</option>
                      <option value="Tweed">Tweed</option>
                      <option value="Zebra">Zebra</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {validationError.keyFeatures && (
                    <div className="text-[red] text-xs">
                      {validationError.keyFeatures}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center mt-[15px]">
                    {!loadingUpload ? (
                      <img
                        className="w-[100px] h-[100px] object-cover object-top mr-5 rounded-[10px]"
                        src={currentImage}
                        alt=""
                      />
                    ) : (
                      <LoadingBox />
                    )}

                    <label
                      className="text-sm mt-[15px] mb-2.5"
                      onClick={() => setShowUploadingImage(true)}
                    >
                      <FaUpload />
                    </label>
                  </div>
                  <Modal
                    onClose={() => setShowUploadingImage(false)}
                    isOpen={showUploadingImage}
                    size="lg"
                  >
                    <CropImage
                      currentImage={currentImage}
                      uploadHandler={uploadHandler}
                      setShowModel={setShowUploadingImage}
                    />
                  </Modal>
                  <div className="flex">
                    {product.images.map((img, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 flex justify-center items-center cursor-pointer ml-0 mr-[7px] mt-2.5 mb-0 p-[5px] rounded-[0.2rem] bg-light-ev3 dark:bg-dark-ev3"
                        onClick={() => setCurrentImage(img)}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  {validationError.image && (
                    <div className="text-[red] text-xs">
                      {validationError.image}
                    </div>
                  )}
                  {user?.role === "Admin" ? (
                    (product.luxury || product.vintage) &&
                    product.luxuryImage ? (
                      <MessageImage url={product.luxuryImage} />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
                <button
                  className="text-white bg-orange-color cursor-pointer mt-2.5 p-[5px] rounded-[0.2rem] border-none"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default EditProduct
