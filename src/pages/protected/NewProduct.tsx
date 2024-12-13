import { useEffect, useMemo, useRef, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import useCategory from "../../hooks/useCategory"
import Details from "../../section/newProduct/Details"
import { Helmet } from "react-helmet-async"
import Button from "../../components/ui/Button"
import InverseButton from "../../components/ui/InverseButton"
import Media from "../../section/newProduct/Media"
import useToastNotification from "../../hooks/useToastNotification"
import Price from "../../section/newProduct/Price"
import {
  IDeliveryOption,
  IProduct,
  ISize,
  ProductMeta,
} from "../../types/product"
import useProducts from "../../hooks/useProducts"
import { currency, region } from "../../utils/common"
import MessageBox from "../../components/MessageBox"
import Description from "../../section/newProduct/Description"
import Features from "../../section/newProduct/Features"
import Modal from "../../components/ui/Modal"
import { FaArrowRight, FaRegCheckCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal"

const stepsItems = [
  {
    id: 1,
    name: "Details",
  },
  {
    id: 2,
    name: "Media",
  },
  {
    id: 3,
    name: "Price",
  },
  {
    id: 4,
    name: "Description",
  },
  {
    id: 5,
    name: "Features",
  },
]

type InputData = {
  name: string
  product: string
  category: string
  subCategory: string
  condition: string
  material: string
  description: string
  price: string
  color: string[]
  keyFeatures: string
  image: string
  selectedSize: string
  specification: string
  brand: string
  tag: string
}

const NewProduct = () => {
  const [params] = useSearchParams()

  const { user } = useAuth()
  const { addNotification } = useToastNotification()
  const { fetchProductBySlug } = useProducts()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.accountNumber) {
      return navigate("/verifyaccount")
    }

    if (!user?.address) {
      return navigate("/verifyaddress")
    }
  }, [navigate, user?.accountNumber, user?.address])

  const { categories, fetchCategories } = useCategory()
  const { createProduct, error } = useProducts()
  const [newProduct, setNewProduct] = useState<IProduct>()

  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const slug = params.get("slug")
    const fetchProduct = async () => {
      if (slug) {
        setIsLoadingProduct(true)

        const product = await fetchProductBySlug(slug)

        if (!product) {
          addNotification("Failed to get product details", undefined, true)
          return
        }

        setInput({
          brand: product.brand || "",
          category: product.category || "",
          color: product.color || [],
          condition: product.condition,
          description: product.description,
          image: "",
          keyFeatures: product.keyFeatures || "",
          material: product.material || "",
          name: product.name,
          price: product.sellingPrice.toString(),
          product: product.mainCategory,
          specification: product.specification || "",
          subCategory: product.subCategory || "",
          selectedSize: "",
          tag: "",
        })

        setMediaInput({
          image1: product.images[0] || "",
          image2: product.images[1] || "",
          image3: product.images[2] || "",
          image4: product.images[3] || "",
          luxury: product.luxury || false,
          luxuryImage: product.luxuryImage || "",
          video: product.video || "",
          vintage: product.vintage || false,
        })

        setPriceInput({
          costPrice: product.costPrice?.toString() || "",
          deliveryOption: "",
          sellingPrice: product.sellingPrice.toString(),
          discount: "",
        })

        setTags(product.tags)
        setSizes(product.sizes)
        setCountInStock(product.countInStock)

        setIsLoadingProduct(false)
      }
    }

    fetchProduct()
  }, [params])

  const [showModal, setShowModal] = useState(false)
  const [isLoadingProduct, setIsLoadingProduct] = useState(false)
  const [createProductLoading, setCreateProductLoading] = useState(false)
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
  const [meta, setMeta] = useState<ProductMeta>({})

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

  const [mediaInput, setMediaInput] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    video: "",
    luxury: false,
    luxuryImage: "",
    vintage: false,
  })

  const [priceInput, setPriceInput] = useState({
    costPrice: "",
    sellingPrice: "",
    discount: "",
    deliveryOption: "",
  })

  const [priceValidation, setPriceValidation] = useState({
    costPrice: "",
    sellingPrice: "",
    discount: "",
    deliveryOption: "",
  })
  const [deliveryOption, setDeliveryOption] = useState<IDeliveryOption[]>([])
  const [video, setVideo] = useState("")
  const [sizes, setSizes] = useState<ISize[]>([])
  const [countInStock, setCountInStock] = useState(1)
  const [tags, setTags] = useState<string[]>([])
  const [addSize, setAddSize] = useState(false)

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
      setInput({ ...input, tag: "" })
    }
  }

  const removeTags = (tag: string) => {
    const newtags = tags.filter((data) => data != tag)
    setTags(newtags)
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

  const handlePriceError = (
    errorMessage: string,
    input: keyof typeof priceValidation
  ) => {
    setPriceValidation((prevState) => ({
      ...prevState,
      [input]: errorMessage,
    }))
  }

  const [showTopInfo, setShowTopInfo] = useState(false)

  const [step, setStep] = useState(1)

  const jumpStep = (val: number) => {
    if (step > val) {
      setStep(val)
      topRef.current?.scrollIntoView({ behavior: "smooth" })
      return
    }

    if (val > 1 && !validateDetails()) {
      return
    }

    if (val > 2 && !validateMedia()) {
      return
    }

    if (val > 3 && !validatePrice()) {
      return
    }
    if (val > 4 && !validateDescription()) {
      return
    }

    setStep(val)
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const discount = useMemo(() => {
    if (
      parseInt(priceInput.costPrice) < parseInt(priceInput?.sellingPrice ?? "0")
    )
      return 0
    return (
      ((parseInt(priceInput.costPrice) -
        parseInt(priceInput?.sellingPrice ?? "0")) /
        parseInt(priceInput.costPrice)) *
      100
    )
  }, [priceInput.costPrice, priceInput?.sellingPrice])

  const costPrice = useMemo(
    () =>
      priceInput.sellingPrice
        ? parseInt(priceInput.sellingPrice) < parseInt(priceInput.costPrice)
          ? `${currency(region())}${priceInput.costPrice}`
          : null
        : null,
    [priceInput.costPrice, priceInput.sellingPrice]
  )

  const costPriceNumber = useMemo(
    () =>
      priceInput.sellingPrice
        ? parseInt(priceInput.sellingPrice) < parseInt(priceInput.costPrice)
          ? parseInt(priceInput.costPrice)
          : parseInt(priceInput.sellingPrice)
        : parseInt(priceInput.costPrice),
    [priceInput.costPrice, priceInput.sellingPrice]
  )

  const sellingPrice = useMemo(
    () =>
      priceInput.sellingPrice
        ? parseInt(priceInput.sellingPrice)
        : parseInt(priceInput.costPrice),
    [priceInput.costPrice, priceInput.sellingPrice]
  )

  const validateDetails = () => {
    if (input.name.length === 0) {
      handleError("Name is required", "name")
      return false
    }

    if (input.name.length < 3) {
      handleError("Name must be at least 3 characters", "name")
      return false
    }

    if (input.product === "") {
      handleError("Main category is required", "product")
      return false
    }

    return true
  }

  const validateMedia = () => {
    if (
      Object.values(mediaInput).every((val) => {
        if (typeof val === "string") {
          return val === ""
        }
        return true
      })
    ) {
      step === 2 && addNotification("At least one image is required")
      return false
    }

    return true
  }

  const validatePrice = () => {
    if (sellingPrice < 1) {
      handlePriceError("price must be greater than 1", "costPrice")
      return false
    }

    if (deliveryOption.length === 0) {
      handlePriceError("Delivery option is required", "deliveryOption")
      return false
    }

    return true
  }

  const validateDescription = () => {
    if (!input.brand) {
      handleError("Select brand", "brand")
      return false
    }

    if (!input.description) {
      handleError("Enter description", "description")
      return false
    }

    if (addSize) {
      if (countInStock < 1) {
        handleError("Enter count in stock", "selectedSize")
        return false
      }
    } else {
      if (!sizes.length || sizes.some((obj) => !obj.quantity)) {
        handleError("Enter a valid size and quantity available", "selectedSize")
        return false
      }
    }
    return true
  }
  const validateFeatures = () => {
    if (!input.condition) {
      handleError("Select condition", "condition")
      return false
    }

    if (!input.color) {
      handleError("Select color", "color")
      return false
    }

    return true
  }

  const handleCreate = async () => {
    if (!validateFeatures()) return

    const images: string[] = []
    if (mediaInput.image1) images.push(mediaInput.image1)
    if (mediaInput.image2) images.push(mediaInput.image2)
    if (mediaInput.image3) images.push(mediaInput.image3)
    if (mediaInput.image4) images.push(mediaInput.image4)

    setCreateProductLoading(true)

    const res = await createProduct({
      name: input.name,
      images,
      video,
      mainCategory: input.product,
      subCategory: input.subCategory,
      category: input.category,
      description: input.description,
      brand: input.brand,
      sellingPrice,
      costPrice: costPriceNumber,
      deliveryOption,
      meta: meta,
      tags,
      specification: input.specification,
      sizes,
      condition: input.condition,
      keyFeatures: input.keyFeatures,
      luxury: mediaInput.luxury,
      vintage: mediaInput.vintage,
      material: input.material,
      color: input.color,
      luxuryImage: mediaInput.luxuryImage,
      // addSize,
      countInStock,
    })

    if (res) {
      setNewProduct(res)
      setShowModal(true)
    } else {
      addNotification(error)
    }

    setCreateProductLoading(false)
  }

  const addAnother = () => {
    setShowModal(false)
    setNewProduct(undefined)
    setStep(1)
    setInput({
      brand: "",
      category: "",
      color: [],
      condition: "",
      description: "",
      image: "",
      keyFeatures: "",
      material: "",
      name: "",
      price: "",
      product: "",
      selectedSize: "",
      specification: "",
      subCategory: "",
      tag: "",
    })
    setMediaInput({
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      luxury: false,
      luxuryImage: "",
      video: "",
      vintage: false,
    })
    setPriceInput({
      costPrice: "",
      discount: "",
      sellingPrice: "",
      deliveryOption: "",
    })
    setMeta({})
    setDeliveryOption([])
    setVideo("")
    setSizes([])
    setCountInStock(1)
    setTags([])
    setAddSize(true)
  }

  return (
    <>
      <Helmet>
        <title>New Product</title>
      </Helmet>

      {isLoadingProduct && <LoadingLogoModal />}
      <div className="pb-20 px-8 lg:pb-12">
        <div className="mb-1 mt-6 text-center flex flex-col gap-4" ref={topRef}>
          <h1 className="text-[28px]">New Product</h1>
          <div
            className="text-[red] text-center mx-auto cursor-pointer"
            onClick={() => setShowTopInfo(!showTopInfo)}
          >
            How to add an item?
          </div>
          <div
            className={`transition-all ease-in-out mx-auto max-w-2xl duration-500 overflow-hidden text-sm mb-[5px] ${
              showTopInfo ? "h-auto" : "h-0"
            }`}
          >
            When adding product, do not ignore to fill all relevant fields and
            following the product adding rules. Always remember; The best
            picture and descriptions sells faster. Ensure to upload high quality
            product photos with all details showing.
          </div>
        </div>

        <div className="flex items-center justify-center w-full mb-12">
          <ul className="relative flex justify-between max-w-2xl w-full flex-row gap-x-2">
            {stepsItems.map((stepsItem) => (
              <li className=" group overflow-hidden " key={stepsItem.id}>
                <div
                  className={`min-w-7 group min-h-7 w-full inline-flex items-center text-sm align-middle ${
                    step > stepsItem.id ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="flex flex-col justify-center items-center">
                    <span
                      onClick={() => jumpStep(stepsItem.id)}
                      className={`size-7 flex justify-center transition-all duration-300 items-center flex-shrink-0 font-medium rounded-full ${
                        step === stepsItem.id
                          ? "bg-orange-color text-white"
                          : "bg-light-ev1 dark:bg-dark-ev1 text-black dark:text-white"
                      } ${
                        step > stepsItem.id
                          ? "group-hover:bg-orange-color group-hover:text-white"
                          : ""
                      }`}
                    >
                      {stepsItem.id}
                    </span>
                    <div className="mt-3">
                      <span
                        onClick={() =>
                          step > stepsItem.id && jumpStep(stepsItem.id)
                        }
                        className={`block font-medium font-sans overflow-hidden text-nowrap text-ellipsis ${
                          step > stepsItem.id ? "cursor-pointer" : ""
                        } ${
                          step === stepsItem.id
                            ? "text-orange-color dark:text-orange-color"
                            : "dark:text-white text-black"
                        }`}
                      >
                        {stepsItem.name}
                      </span>
                    </div>
                  </div>
                  <div className="ms-2 w-full h-px flex-1 bg-light-ev2 dark:bg-dark-ev2 group-last:hidden"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {error && <MessageBox className="text-[red] my-2">{error}</MessageBox>}

        <div className="flex flex-col">
          <div className="max-w-3xl w-full mx-auto">
            {step === 1 && (
              <Details
                categories={categories}
                input={input}
                setInput={setInput}
                validationError={validationError}
                handleError={handleError}
              />
            )}

            {step === 2 && (
              <Media
                input={mediaInput}
                setInput={setMediaInput}
                video={video}
                setVideo={setVideo}
              />
            )}

            {step === 3 && (
              <Price
                setInput={setPriceInput}
                handleError={handlePriceError}
                validationError={priceValidation}
                discount={discount}
                sellingPrice={sellingPrice}
                costPrice={costPrice}
                deliveryOption={deliveryOption}
                setDeliveryOption={setDeliveryOption}
                meta={meta}
                setMeta={setMeta}
              />
            )}

            {step === 4 && (
              <Description
                handleError={handleError}
                input={input}
                setInput={setInput}
                validationError={validationError}
                countInStock={countInStock}
                setCountInStock={setCountInStock}
                setSizes={setSizes}
                sizes={sizes}
                handleTags={handleTags}
                removeTags={removeTags}
                tags={tags}
                addSize={addSize}
                setAddSize={setAddSize}
              />
            )}

            {step === 5 && (
              <Features
                input={input}
                setInput={setInput}
                validationError={validationError}
              />
            )}
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto flex justify-between items-center gap-2">
          {step > 1 && (
            <InverseButton
              text="Previous"
              disabled={createProductLoading}
              onClick={() => jumpStep(step - 1)}
            />
          )}
          <Button
            text={step === stepsItems.length ? "Create" : "Next"}
            disabled={createProductLoading}
            isLoading={createProductLoading}
            className="ml-auto"
            onClick={() =>
              step === stepsItems.length ? handleCreate() : jumpStep(step + 1)
            }
          />
        </div>
      </div>

      <Modal
        isOpen={showModal}
        dontShowClose
        onClose={() => setShowModal(false)}
        size="lg"
      >
        <div className="h-full items-center pt-4 md:px-8 md:py-6 rounded-lg flex flex-col gap-3">
          <FaRegCheckCircle className="text-orange-color text-[90px] md:text-[120px]" />
          <h1 className="text-3xl">Product Created</h1>
          <div className="max-w-3xl text-justify mb-1">
            Congratulations, Your product was created successfully
          </div>
          <div className="max-w-3xl flex gap-2.5 flex-wrap">
            <button
              className="flex items-center justify-center w-32 capitalize text-center text-white-color bg-malon-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
              onClick={addAnother}
            >
              Add product
            </button>
            {newProduct && (
              <Link
                to={`/product/${newProduct?.slug}`}
                className="flex w-32 capitalize justify-center items-center text-center text-white-color bg-orange-color cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
              >
                View product
              </Link>
            )}
          </div>
          <div className="flex items-center text-black dark:text-white hover:text-orange-color">
            <Link
              to="/dashboard/productlist"
              className="flex items-center capitalize cursor-pointer px-2 py-[3px] rounded-[0.2rem] border-none"
            >
              View My Products
            </Link>
            <FaArrowRight />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default NewProduct
