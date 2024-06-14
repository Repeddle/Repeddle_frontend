import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import useCategory from "../../hooks/useCategory"
import Details from "../../section/newProduct/Details"
import { Helmet } from "react-helmet-async"
import Button from "../../components/ui/Button"
import InverseButton from "../../components/ui/InverseButton"
import Media from "../../section/newProduct/Media"
import useToastNotification from "../../hooks/useToastNotification"
import Price from "../../section/newProduct/Price"
import { IDeliveryOption, ISize, ProductMeta } from "../../types/product"
import useProducts from "../../hooks/useProducts"
import { currency, region } from "../../utils/common"
import MessageBox from "../../components/MessageBox"
import Description from "../../section/newProduct/Description"
import Features from "../../section/newProduct/Features"

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

const NewProduct = () => {
  const { user } = useAuth()
  const { addNotification } = useToastNotification()

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
  const { createProduct, loading, error } = useProducts()

  useEffect(() => {
    fetchCategories()
  }, [])

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

  const [input, setInput] = useState({
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
  })

  const [priceValidation, setPriceValidation] = useState({
    costPrice: "",
    sellingPrice: "",
    discount: "",
  })
  const [deliveryOption, setDeliveryOption] = useState<IDeliveryOption[]>([
    { name: "Pick up from Seller", value: 0 },
  ])
  const [video, setVideo] = useState("")
  const [sizes, setSizes] = useState<ISize[]>([])
  const [countInStock, setCountInStock] = useState(1)
  const [tags, setTags] = useState<string[]>([])
  const [addSize, setAddSize] = useState(true)

  const handleTags = (tag: string) => {
    if (tag.includes(" ")) {
      addNotification("Please remove unnecessary space")
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
    setStep(val)
  }

  const discount = () => {
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
  }

  const costPrice = priceInput.sellingPrice
    ? parseInt(priceInput.sellingPrice) < parseInt(priceInput.costPrice)
      ? `${currency(region())}${priceInput.costPrice}`
      : null
    : null

  const costPriceNumber = priceInput.sellingPrice
    ? parseInt(priceInput.sellingPrice) < parseInt(priceInput.costPrice)
      ? parseInt(priceInput.costPrice)
      : undefined
    : undefined

  const sellingPrice = priceInput.sellingPrice
    ? parseInt(priceInput.sellingPrice)
    : parseInt(priceInput.costPrice)

  const next = () => {
    if (step === 1 && validateDetails()) {
      jumpStep(step + 1)
    }

    if (step === 2 && validateMedia()) {
      jumpStep(step + 1)
    }

    if (step === 3 && validatePrice()) {
      jumpStep(step + 1)
    }
    if (step === 4 && validateDescription()) {
      jumpStep(step + 1)
    }

    if (step === 5 && validateFeatures()) {
      jumpStep(step + 1)
    }
  }

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
      addNotification("At least one image is required")
      return false
    }

    return true
  }

  const validatePrice = () => {
    if (sellingPrice < 1) {
      handlePriceError("price must be greater than 1", "costPrice")
      return false
    }

    return true
  }

  const validateDescription = () => {
    if (!input.brand) {
      handleError("Select brand", "brand")
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
    const images: string[] = []
    if (mediaInput.image1) images.push(mediaInput.image1)
    if (mediaInput.image2) images.push(mediaInput.image2)
    if (mediaInput.image3) images.push(mediaInput.image3)
    if (mediaInput.image4) images.push(mediaInput.image4)

    await createProduct({
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
  }

  return (
    <>
      <Helmet>
        <title>New Product</title>
      </Helmet>
      <div className="pb-20 px-8 lg:pb-12">
        <div className="mb-1 mt-6 text-center flex flex-col gap-4">
          <h1 className="text-[28px]">NewProduct</h1>
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
                      onClick={() =>
                        step > stepsItem.id && jumpStep(stepsItem.id)
                      }
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
                        className={`block font-medium font-sans text-black dark:text-white overflow-hidden text-nowrap text-ellipsis ${
                          step > stepsItem.id ? "cursor-pointer" : ""
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
              disabled={loading}
              onClick={() => jumpStep(step - 1)}
            />
          )}
          <Button
            text={step === stepsItems.length ? "Create" : "Next"}
            // disabled={loading}
            // isLoading={loading}
            className="ml-auto"
            onClick={() =>
              step === stepsItems.length ? handleCreate() : next()
            }
          />
        </div>
      </div>
    </>
  )
}

export default NewProduct
