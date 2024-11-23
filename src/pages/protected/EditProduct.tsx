import { FormEvent, useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { currency, region } from "../../utils/common"
import useCategory from "../../hooks/useCategory"
import useToastNotification from "../../hooks/useToastNotification"
import Chart from "../../components/Chart"
import useBrands from "../../hooks/useBrand"
import useProducts from "../../hooks/useProducts"
import {
  IDeliveryOption,
  IProduct,
  ISize,
  InputData,
  ProductMeta,
} from "../../types/product"
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal"
import MessageBox from "../../components/MessageBox"
import Button from "../../components/ui/Button"
import LeftEditProduct from "../../section/editProduct/LeftEditProduct"
import RightEditProduct from "../../section/editProduct/RightEditProduct"
import ImageUploadEditProduct from "../../section/editProduct/ImageUploadEditProduct"

const EditProduct = () => {
  const params = useParams()
  const { id } = params

  const { fetchCategories } = useCategory()
  const { fetchBrands } = useBrands()
  const { fetchProductById, makeUnavailable, updateProduct } = useProducts()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    fetchCategories()
  }, [])

  const [sizes, setSizes] = useState<ISize[]>([])

  const [active, setActive] = useState(false)
  const [badge, setBadge] = useState(false)
  const [price, setPrice] = useState("")

  const [showUploadingImage, setShowUploadingImage] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const [showConditionModal, setShowConditionModal] = useState(false)
  const [showOtherBrand, setShowOtherBrand] = useState(false)
  const [showComissionModal, setShowComissionModal] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)
  const [countInStock, setCountInStock] = useState(1)
  const [addSize, setAddSize] = useState(sizes.length < 1)
  const [priceInput, setPriceInput] = useState({
    costPrice: "",
    sellingPrice: "",
  })

  const [brandQuery, setBrandQuery] = useState("")

  const [deliveryOption, setDeliveryOption] = useState<IDeliveryOption[]>([
    { name: "Pick up from Seller", value: 0 },
  ])
  const [validationError, setValidationError] = useState<{
    [object: string]: string
  }>({})
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
    selectedSize: "",
    specification: "",
    keyFeatures: "",
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
  const [currentImage, setCurrentImage] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [color, setColor] = useState<string[]>([])
  const [product, setProduct] = useState<IProduct>()
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [availableLoading, setAvailableLoading] = useState(false)
  const [soldLoading, setSoldLoading] = useState(false)
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
          setImages(data.images)
          setColor(data.color ?? [])
          setInput({
            ...input,
            brand: data.brand ?? input.brand,
            category: data.category ?? input.category,
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
          setDeliveryOption(data.deliveryOption)
          setPriceInput({
            costPrice: data.costPrice?.toString() || priceInput.costPrice,
            sellingPrice:
              data.sellingPrice?.toString() || priceInput.sellingPrice,
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

  const notifyError = () => {
    const firstError = Object.keys(validationError)[0]
    addNotification(validationError[firstError], undefined, true)
  }

  const removeError = (key: string) => {
    if (key in validationError) {
      setValidationError((prev) => {
        const newState = { ...prev }
        delete newState[key]
        return newState
      })
    }
  }

  const validation = async (e: FormEvent) => {
    e.preventDefault()

    const valid = [
      validateDescription(),
      validateDetails(),
      validateFeatures(),
      validatePrice(),
      validateMedia(),
    ].every((val) => val)

    if (valid) await handleCreate()
    else notifyError()
  }

  const notAvailable = async () => {
    if (!product) return
    setAvailableLoading(true)

    const res = await makeUnavailable(product._id)
    if (typeof res !== "string") {
      if (res.message) addNotification(res.message)
      setProduct({ ...product, isAvailable: res.product.isAvailable })
    } else {
      addNotification(error as string, undefined, true)
    }

    setAvailableLoading(false)
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

  const validatePrice = () => {
    if (sellingPrice < 1) {
      handleError("price must be greater than 1", "costPrice")
      return false
    }

    if (deliveryOption.length === 0) {
      handleError("Delivery option is required", "deliveryOption")
      return false
    }

    return true
  }

  const validateMedia = () => {
    if (images.length < 1) {
      handleError("There must be at least one image", "image")
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

    if (!color.length) {
      handleError("Select color", "color")
      return false
    }

    return true
  }

  const handleCreate = async () => {
    if (!product) return

    setUpdateLoading(true)

    const res = await updateProduct(product._id, {
      name: input.name,
      images,
      video: product.video,
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
      luxury: product.luxury,
      vintage: product.vintage,
      material: input.material,
      color,
      luxuryImage: product.luxuryImage,
      active,
      badge,
      // addSize,
      countInStock,
    })

    if (typeof res !== "string") {
      setProduct(res)
    } else {
      addNotification(res, undefined, true)
    }

    setUpdateLoading(false)
  }

  const handleSold = async () => {
    if (!product) return
    setSoldLoading(true)

    const sold = product.sold !== true ? false : true

    const res = await updateProduct(product._id, { sold })
    if (typeof res !== "string") {
      setProduct(res)
      addNotification("Product updated")
    } else {
      addNotification(res, undefined, true)
    }

    setSoldLoading(false)
  }

  const handleOnChange = (text: string, inputVal: keyof typeof input) => {
    setInput((prevState) => ({ ...prevState, [inputVal]: text }))
    if (validationError[inputVal]) {
      removeError(inputVal)
    }
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
      </div>

      {error && <MessageBox className="text-[red]">{error}</MessageBox>}
      {loading && <LoadingLogoModal />}
      {product && (
        <>
          <div className="flex items-start max-w-[1190px] justify-between my-2.5">
            {!product.sold && (
              <Button
                className="text-white !bg-malon-color cursor-pointer mb-2.5 px-5 py-[5px] rounded-[0.2rem] border-none"
                onClick={notAvailable}
                text={
                  product.isAvailable
                    ? "No Longer Available"
                    : "Mark as Available"
                }
                isLoading={availableLoading}
              />
            )}

            <Link to="/newproduct" className="justify-self-end">
              <button className="w-20 text-white-color bg-orange-color cursor-pointer p-[5px] rounded-[0.2rem] border-none">
                Create
              </button>
            </Link>
          </div>

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
              <LeftEditProduct
                badge={badge}
                handleOnChange={handleOnChange}
                handleSold={handleSold}
                handleTags={handleTags}
                input={input}
                product={product}
                removeTags={removeTags}
                setActive={setActive}
                setBadge={setBadge}
                setShowConditionModal={setShowConditionModal}
                setShowDelivery={setShowDelivery}
                showConditionModal={showConditionModal}
                showDelivery={showDelivery}
                soldLoading={soldLoading}
                tags={tags}
                validationError={validationError}
                active={active}
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

              <RightEditProduct
                addSize={addSize}
                brandQuery={brandQuery}
                costPrice={costPrice}
                countInStock={countInStock}
                discount={discount}
                handleError={handleError}
                handleOnChange={handleOnChange}
                input={input}
                price={price}
                priceInput={priceInput}
                product={product}
                sellingPrice={sellingPrice}
                setAddSize={setAddSize}
                setBrandQuery={setBrandQuery}
                setCountInStock={setCountInStock}
                setPrice={setPrice}
                setPriceInput={setPriceInput}
                setShowComissionModal={setShowComissionModal}
                setShowOtherBrand={setShowOtherBrand}
                setSizes={setSizes}
                showComissionModal={showComissionModal}
                showOtherBrand={showOtherBrand}
                sizeHandler={sizeHandler}
                sizes={sizes}
                smallSizeHandler={smallSizeHandler}
                validationError={validationError}
                color={color}
                setColor={setColor}
              />

              <div className="flex flex-col justify-between flex-1">
                <ImageUploadEditProduct
                  currentImage={currentImage}
                  setImages={setImages}
                  images={images}
                  product={product}
                  setCurrentImage={setCurrentImage}
                  setShowUploadingImage={setShowUploadingImage}
                  showUploadingImage={showUploadingImage}
                  validationError={validationError}
                />
                <Button
                  isLoading={updateLoading}
                  className="text-white bg-orange-color cursor-pointer mt-2.5 p-[5px] rounded-[0.2rem] border-none"
                  type="submit"
                  text="Update"
                />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default EditProduct
