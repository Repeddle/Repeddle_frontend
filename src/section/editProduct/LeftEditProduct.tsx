import {
  FaCheck,
  FaCheckCircle,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa"
import LoadingBox from "../../components/LoadingBox"
import Modal from "../../components/ui/Modal"
import Condition from "../../pages/defaults/info/Condition"
import DeliveryOption from "../../components/DeliveryOption"
import {
  IDeliveryOption,
  InputData,
  IProduct,
  ProductMeta,
} from "../../types/product"
import useAuth from "../../hooks/useAuth"
import useCategory from "../../hooks/useCategory"

type Props = {
  input: InputData
  handleOnChange: (text: string, inputVal: keyof InputData) => void
  handleSold: () => Promise<void>
  product: IProduct
  deliveryOption: IDeliveryOption[]
  setDeliveryOption: (val: IDeliveryOption[]) => void
  active: boolean
  setActive: (val: boolean) => void
  showConditionModal: boolean
  setShowConditionModal: (val: boolean) => void
  badge: boolean
  setBadge: (val: boolean) => void
  showDelivery: boolean
  setShowDelivery: (val: boolean) => void
  soldLoading: boolean
  validationError: { [key: string]: string }
  removeTags: (tag: string) => void
  tags: string[]
  handleTags: (tag: string) => void
  paxi: boolean
  setPaxi: (val: boolean) => void
  pudoLocker: boolean
  setPudoLocker: (val: boolean) => void
  pudoDoor: boolean
  setPudoDoor: (val: boolean) => void
  postnet: boolean
  setPostnet: (val: boolean) => void
  aramex: boolean
  setAramex: (val: boolean) => void
  gig: boolean
  setGig: (val: boolean) => void
  pickup: boolean
  setPickup: (val: boolean) => void
  bundle: boolean
  setBundle: (val: boolean) => void
  meta: ProductMeta
  setMeta: (val: ProductMeta) => void
}

const LeftEditProduct = ({
  input,
  handleOnChange,
  active,
  setActive,
  badge,
  setBadge,
  soldLoading,
  handleSold,
  product,
  setShowConditionModal,
  showConditionModal,
  validationError,
  setShowDelivery,
  showDelivery,
  deliveryOption,
  setDeliveryOption,
  removeTags,
  tags,
  handleTags,
  aramex,
  bundle,
  gig,
  paxi,
  pickup,
  postnet,
  pudoDoor,
  pudoLocker,
  setAramex,
  setBundle,
  setGig,
  setPaxi,
  setPickup,
  setPostnet,
  setPudoDoor,
  setPudoLocker,
  meta,
  setMeta,
}: Props) => {
  const { user } = useAuth()
  const { categories } = useCategory()

  return (
    <div className="flex flex-col flex-1">
      <label className="text-sm mt-[15px] mb-2.5">Product Name</label>
      <input
        className="w-[250px] mb-2.5 p-[5px] focus-visible:outline-0 border-b-light-ev3 bg-transparent dark:border-b-dark-ev3 text-black dark:text-white border-b  focus-visible:border-b-orange-color focus-visible:border-b"
        type="text"
        value={input.name}
        onChange={(e) => handleOnChange(e.target.value, "name")}
      />
      {validationError.name && (
        <div className="text-[red] text-xs">{validationError.name}</div>
      )}
      {user?.role === "Admin" && (
        <>
          <label className="text-sm mt-[15px] mb-2.5">Active</label>
          <div className="flex items-center">
            <input
              className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
    after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
    checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
    checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
    after:bg-white dark:after:bg-black after:dark:checked:bg-orange-color p-[5px]`}
              type="radio"
              name="active"
              id="active"
              value="yes"
              checked={active}
              onChange={() => {
                setActive(true)
              }}
            />
            <label className="text-lg font-light mx-2.5 my-0" htmlFor="active">
              Yes
            </label>
            <input
              className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
      after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
      checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
      checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
      after:bg-white dark:after:bg-black after:dark:checked:bg-orange-color p-[5px]`}
              type="radio"
              name="active"
              id="active2"
              value="no"
              checked={!active}
              onChange={() => setActive(false)}
            />
            <label className="text-lg font-light mx-2.5 my-0" htmlFor="active2">
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
      after:bg-white dark:after:bg-black after:dark:checked:bg-orange-color p-[5px]`}
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
      after:bg-white dark:after:bg-black after:dark:checked:bg-orange-color p-[5px]`}
              type="radio"
              name="badge"
              id="badgeno"
              value="no"
              checked={!badge}
              onChange={() => setBadge(false)}
            />
            <label className="text-lg font-light mx-2.5 my-0" htmlFor="badgeno">
              No
            </label>
          </div>
        </>
      )}
      {user?.role === "Admin" &&
        (soldLoading ? (
          <LoadingBox />
        ) : (
          <div
            className={`w-6/12 flex items-center justify-center mx-0 my-2.5 p-[5px] rounded-[0.2rem]
  ${
    product.sold
      ? "text-white bg-malon-color cursor-not-allowed"
      : "text-white bg-orange-color cursor-pointer"
  }`}
            onClick={handleSold}
          >
            <FaCheckCircle className="mr-[5px]" /> Mark
            {product.sold ? "ed" : ""} as sold
          </div>
        ))}
      <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Main Category</label>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.product}
            onChange={(e) => handleOnChange(e.target.value, "product")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
          >
            {categories.length > 0 &&
              categories.map((cat) => (
                <option value={cat.name}>{cat.name}</option>
              ))}
          </select>
        </div>
        {validationError.product && (
          <div className="text-[red] text-xs">{validationError.product}</div>
        )}
      </div>

      <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Category</label>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.category}
            onChange={(e) => handleOnChange(e.target.value, "category")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
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
        {validationError.category && (
          <div className="text-[red] text-xs">{validationError.category}</div>
        )}
      </div>

      <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Sub Category</label>

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.subCategory}
            onChange={(e) => handleOnChange(e.target.value, "subCategory")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
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
        {validationError.subCategory && (
          <div className="text-[red] text-xs">
            {validationError.subCategory}
          </div>
        )}
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

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.condition}
            onChange={(e) => handleOnChange(e.target.value, "condition")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
          >
            <option value="">-- select --</option>
            <option value="New with Tags">New with Tags</option>
            <option value="New with No Tags">New with No Tags</option>
            <option value="Excellent Condition">Excellent Condition</option>
            <option value="Good Condition">Good Condition</option>
            <option value="Fair Condition">Fair Condition</option>
          </select>
        </div>
        {validationError.condition && (
          <div className="text-[red] text-xs">{validationError.condition}</div>
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

        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
          <select
            value={input.material}
            onChange={(e) => handleOnChange(e.target.value, "material")}
            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
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
            <option value="Pony-style calfskin">Pony-style calfskin</option>
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
          <div className="text-[red] text-xs">{validationError.material}</div>
        )}
      </div>

      <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Description</label>
        <textarea
          className="h-[100px] p-2.5 rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4 text-black dark:text-white bg-transparent focus-visible:outline focus-visible:outline-orange-color"
          value={input.description}
          placeholder="Describe your product by giving buyers more information. Start with Headline, Condition, Material, Style & Size.

Be concise and only use relevant keywords."
          onChange={(e) => handleOnChange(e.target.value, "description")}
        />
      </div>

      <div className="relative flex flex-col lg:w-[400px] mr-5 mt-2.5 w-full">
        <label className="text-sm mt-[15px] mb-2.5">Delivery Option</label>
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
          {validationError.tag && (
            <div className="text-[red] text-xs">{validationError.tag}</div>
          )}
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
  )
}

export default LeftEditProduct
