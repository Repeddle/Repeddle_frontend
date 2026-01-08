import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaQuestionCircle, FaTimes } from "react-icons/fa";
import Modal from "../../components/ui/Modal";
import AddOtherBrand from "../../components/AddOtherBrand";
import useBrands from "../../hooks/useBrand";
import { ISize } from "../../types/product";
import useToastNotification from "../../hooks/useToastNotification";

type InputProps = {
  selectedSize: string;
  specification: string;
  brand: string;
  tag: string;
  description: string;
};

type InputData = InputProps & {
  name: string;
  product: string;
  category: string;
  subCategory: string;
  condition: string;
  material: string;
  price: string;
  color: string[];
  keyFeatures: string;
  image: string;
};

type Props = {
  input: InputProps;
  validationError: InputProps;
  setInput: Dispatch<SetStateAction<InputData>>;
  handleError: (text: string, key: keyof InputProps) => void;
  sizes: ISize[];
  setSizes: Dispatch<SetStateAction<ISize[]>>;
  countInStock: number;
  setCountInStock: (val: number) => void;
  tags: string[];
  handleTags: (tag: string) => void;
  removeTags: (tag: string) => void;
  addSize: boolean;
  setAddSize: (val: boolean) => void;
  moderationWarnings: { [key: string]: string[] };
};

const Description = ({
  input,
  validationError,
  setInput,
  handleError,
  setSizes,
  sizes,
  countInStock,
  setCountInStock,
  handleTags,
  removeTags,
  tags,
  addSize,
  setAddSize,
  moderationWarnings,
}: Props) => {
  const { brands: searchBrand, fetchBrands } = useBrands();
  const { addNotification } = useToastNotification();

  const [showOtherBrand, setShowOtherBrand] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [brandQuery, setBrandQuery] = useState("");

  useEffect(() => {
    const getFilterBrand = async () => {
      const params: string[][] = [["search", brandQuery]];

      const string = new URLSearchParams(params).toString();

      await fetchBrands(string);
    };

    if (brandQuery) getFilterBrand();
  }, [brandQuery]);

  const handleOnChange = (text: string, inputVal: keyof typeof input) => {
    setInput((prevState) => ({ ...prevState, [inputVal]: text }));
  };

  const smallSizeHandler = (label: string, value: string) => {
    setSizes((prevSizes) => {
      const sizeIndex = prevSizes.findIndex((x) => x.size === label);
      if (sizeIndex !== -1) {
        const updatedSizes = [...prevSizes];
        updatedSizes[sizeIndex].quantity = parseInt(value);
        return updatedSizes;
      }
      return prevSizes;
    });
  };

  const removeSize = (label: string) => {
    setSizes((prev) => prev.filter((val) => val.size !== label));
  };

  const sizeHandler = (sizenow: string) => {
    if (!sizenow) {
      addNotification("Please enter size");
      return;
    }

    const exist = sizes.some((s) => s.size === sizenow);

    if (exist) {
      const newSizes = sizes.filter((s) => s.size !== sizenow);
      setSizes(newSizes);
    } else {
      setSizes((prevSizes) => [...prevSizes, { size: sizenow, quantity: 1 }]);
    }

    setInput((prev) => ({ ...prev, selectedSize: "" }));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex flex-col mr-5 w-full">
        <label className="text-sm mb-2.5">Brands</label>
        <div className="w-auto lg:w-[70%] text-sm leading-[1.2] mb-[5px]">
          Can't find the brand you're listing? Search & use Other
        </div>
        <input
          className="border h-10 bg-transparent p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
          placeholder="Search Brand"
          type="search"
          value={input.brand.length > 0 ? input.brand : brandQuery}
          onChange={(e) => {
            handleOnChange("", "brand");
            setBrandQuery(e.target.value);
          }}
          onBlur={() => input.brand.length > 0 && setBrandQuery("")}
        />
        <div className="absolute max-h-[300px] overflow-auto z-[9] rounded-br-[0.2rem] rounded-bl-[0.2rem] top-[93px] bg-light-ev2 dark:bg-dark-ev2">
          {brandQuery.length > 0 &&
            [...searchBrand, { name: "Other", _id: Math.random() }].map((b) => (
              <div
                className="text-[15px] cursor-pointer px-5 py-2.5 hover:bg-light-ev3 dark:hover:bg-dark-ev3"
                key={b._id}
                onClick={() => {
                  if (b.name === "Other") {
                    setShowOtherBrand(true);
                  } else {
                    handleOnChange(b.name, "brand");
                  }
                  setBrandQuery("");
                }}
              >
                {b.name}
              </div>
            ))}
        </div>

        <Modal onClose={() => setShowOtherBrand(false)} isOpen={showOtherBrand}>
          <AddOtherBrand
            setShowOtherBrand={setShowOtherBrand}
            handleOnChange={handleOnChange}
          />
        </Modal>
        {validationError.brand && (
          <div className="text-[red] text-xs">{validationError.brand}</div>
        )}
      </div>
      <div className="relative flex flex-col mr-5 w-full">
        <label className="text-sm mb-2.5">Add Tags #</label>
        <div>
          <div className="flex items-center overflow-hidden border h-10 bg-transparent rounded-[0.2rem] border-light-ev4 dark:border-dark-ev4">
            <input
              className="flex-1 h-10 p-2.5 border-none focus-visible:outline-none bg-transparent"
              value={input.tag}
              placeholder="Add tags"
              type="text"
              onChange={(e) => handleOnChange(e.target.value, "tag")}
            />
            {moderationWarnings.tag && (
              <div className="absolute top-[40px] left-0 text-[10px] text-orange-500 font-semibold">
                Warning: Restricted words found:{" "}
                {moderationWarnings.tag.join(", ")}. Item will be review before
                publishing
              </div>
            )}
            <div
              className="text-white cursor-pointer mx-[5px] my-0 px-[5px] py-0.5 bg-malon-color"
              onClick={() => handleTags(input.tag)}
            >
              Add
            </div>
          </div>
          {moderationWarnings.tags && (
            <div className="text-[11px] text-orange-500 font-semibold mt-1">
              Warning: Existing tags contain restricted words:{" "}
              {moderationWarnings.tags.join(", ")}. Item will be review before
              publishing
            </div>
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
      <label className="text-sm flex mt-3 items-center">
        <div
          onClick={() => setShowSize(!showSize)}
          className="border rounded-[0.2rem] cursor-pointer border-light-ev1 px-3 py-1.5 dark:border-[grey]"
        >
          Add Size
        </div>
        <div
          data-content="If I feel the product and the size seems to differ from what indicated on the label, what should I do?
                    Please be advised to list the product with the size printed on the label. Mentioning the size discrepancy, you noticed in the product description helps a great deal for buyers to make informed size decision. If buyers are forewarned, they will not be disappointed. This minimizes the chances of your products been returned as a result of unfit size."
          className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                    hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                    lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                    hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
        >
          <FaQuestionCircle className="text-black dark:text-white ml-2.5" />
        </div>
      </label>
      {showSize && (
        <div className="flex flex-col gap-2.5 lg:gap-5 m-0">
          <div className="text-sm mb-2.5">
            Please include size for items that requires size, EG: Shoes, Clothes
            Etc. For item that does not require size, EG: Books, Cups, Etc.
            Kindly switch to "ITEM DO NOT REQUIRE SIZE" button.
          </div>
          <div className="flex items-center">
            <label className="mr-2.5">Item do not require size</label>
            <input
              type="checkbox"
              className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
          before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
          appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
              checked={addSize}
              onChange={(e) => {
                setSizes([]);
                setAddSize(e.target.checked);
              }}
            />
          </div>

          {!addSize ? (
            <div className="flex-1">
              <>
                <div className="relative flex flex-col mr-5 gap-2 w-full">
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
                        );
                        handleError("", "selectedSize");
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

                <div className="flex flex-wrap items-center">
                  <div className="w-auto lg:w-[70%] mt-3 text-sm leading-[1.2]">
                    Provide the exact size as indicated on your product's label.
                  </div>
                  {sizes.map((s) => (
                    <div className="m-2.5 flex items-center">
                      <label className="text-sm">{s.size}</label>
                      :
                      <input
                        className="bg-transparent numeric-arrow ml-[5px] text-xs border h-5 w-10 p-2.5 rounded-[0.2rem] text-black dark:text-white focus-visible:outline focus-visible:outline-orange-color"
                        placeholder="qty"
                        maxLength={4}
                        type="number"
                        value={s.quantity}
                        onChange={(e) => {
                          smallSizeHandler(s.size, e.target.value.slice(0, 4));
                          handleError("", "selectedSize");
                        }}
                      />
                      <FaTimes
                        className="text-sm ml-2 cursor-pointer"
                        onClick={() => removeSize(s.size)}
                      />
                    </div>
                  ))}
                </div>
              </>
            </div>
          ) : (
            <div className="relative flex flex-col mr-5 w-full">
              <label className="text-sm">Count in stock</label>
              <input
                className="border h-10 bg-transparent p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev4 dark:border-dark-ev4 text-black dark:text-white"
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(parseInt(e.target.value))}
              />
            </div>
          )}
        </div>
      )}
      {validationError.selectedSize && (
        <div className="text-[red] text-xs">{validationError.selectedSize}</div>
      )}
      <div className="relative flex gap-2 flex-col mr-5 my-2 w-full">
        <label className="text-sm">Description</label>
        <textarea
          className="h-[120px] p-2.5 rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4 text-black dark:text-white bg-transparent focus-visible:outline focus-visible:outline-orange-color"
          value={input.description}
          placeholder="Describe your product by giving buyers more information. Start with Headline, Condition, Material, Style & Size. Be concise and only use relevant keywords."
          onChange={(e) => handleOnChange(e.target.value, "description")}
        />
        {moderationWarnings.description && (
          <div className="text-xs text-orange-500 font-semibold">
            Warning: Restricted words found in description:{" "}
            {moderationWarnings.description.join(", ")}. Item will be review
            before publishing
          </div>
        )}
        {validationError.description && (
          <div className="text-[red] text-xs">
            {validationError.description}
          </div>
        )}
      </div>
      <div className="relative flex gap-2 flex-col mr-5 w-full">
        <label className="text-sm">Specification</label>
        <textarea
          className="h-[100px] p-2.5 rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4 text-black dark:text-white bg-transparent focus-visible:outline focus-visible:outline-orange-color"
          value={input.specification}
          placeholder="FOR CHILDREN'S WEAR/SH0ES, Please manually enter the Size/Age brackets as shown on the label of clothes/shoes"
          onChange={(e) => handleOnChange(e.target.value, "specification")}
        />
        {moderationWarnings.specification && (
          <div className="text-xs text-orange-500 font-semibold mt-1">
            Warning: Restricted words found in specification:{" "}
            {moderationWarnings.specification.join(", ")}. Item will be review
            before publishing
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
