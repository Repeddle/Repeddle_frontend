import { FormEvent, useState } from "react";
import useToastNotification from "../hooks/useToastNotification";

type Props = {
  index: number | null;
  onClose?: () => void;
  category: {
    name: string;
    isCategory: boolean;
    path: string;
    mobile_path?: string | object;
  };
  nameLabel?: string;
  linkLabel: string;
  itemIndex: number | null;
  handleAdd?: (
    name: string,
    isCategory: boolean,
    link: string,
    mobile_path?: string | object
  ) => void;
  handleSubAdd?: (
    index: number,
    name: string,
    isCategory: boolean,
    link: string,
    mobile_path?: string | object
  ) => void;
  handleChange?: (
    subIndex: number,
    index: number,
    name: string,
    isCategory: boolean,
    link: string
  ) => void;
};

const FormModal = ({
  category,
  linkLabel,
  nameLabel,
  onClose,
  index,
  itemIndex,
  handleAdd,
  handleChange,
  handleSubAdd,
}: Props) => {
  const [link, setLink] = useState(category.path || "");
  const [name, setName] = useState(category.name || "");
  const [mobile_path, setMobile_path] = useState<string | object | undefined>(
    category.mobile_path
  );
  const [isCategory, setIsCategory] = useState(category.isCategory);

  const { addNotification } = useToastNotification();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name) {
      addNotification("Name is required");
      return;
    }

    if (index !== null && index >= 0) {
      if (itemIndex !== null && itemIndex >= 0) {
        handleChange?.(index, itemIndex, name, isCategory, link);
      } else {
        handleSubAdd?.(index, name, isCategory, link, mobile_path);
      }
    } else {
      handleAdd?.(name, isCategory, link, mobile_path);
    }
    onClose?.();
  };

  return (
    <div className="bg-white dark:bg-black p-5">
      <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
        {nameLabel && (
          <>
            <label className="text-sm font-semibold mb-2.5">{nameLabel}</label>
            <input
              className={`h-10 p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev3
              dark:border-dark-ev3 border text-black-color dark:text-white-color bg-transparent`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </>
        )}
        {linkLabel && (
          <>
            <label className="text-sm font-semibold mb-2.5">{linkLabel}</label>
            <input
              className={`h-10 p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev3
              dark:border-dark-ev3 border text-black-color dark:text-white-color bg-transparent`}
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <label className="text-sm font-semibold mb-2.5">Mobile Path</label>

            <input
              className={`h-10 p-2.5 rounded-[0.2rem] focus-visible:outline focus-visible:outline-orange-color border-light-ev3
          dark:border-dark-ev3 border text-black-color dark:text-white-color bg-transparent`}
              type="text"
              value={JSON.stringify(mobile_path)}
              onChange={(e) => setMobile_path(e.target.value)}
              placeholder="{'name': 'value'}"
            />
          </>
        )}
        <div className="flex items-center">
          <input
            className={`mr-2.5 mb-2.5 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block
            after:visible after:relative after:border after:border-orange-color after:-left-px after:-top-0.5
            checked:after:w-[15px] checked:after:h-[15px] checked:after:content-[""] checked:after:inline-block
            checked:after:visible checked:after:relative checked:after:bg-orange-color checked:after:border
          checked:after:border-orange-color checked:after:-left-px checked:after:-top-0.5 after:bg-white-color after:dark:bg-black-color`}
            id="checkbox"
            type="checkbox"
            checked={isCategory}
            onChange={(e) => setIsCategory(e.target.checked)}
          />
          <label htmlFor="checkbox">It's Category</label>
        </div>

        <button
          className="bg-orange-color w-[200px] text-white-color cursor-pointer mx-0 my-2.5 px-2.5 py-[5px] rounded-[0.2rem] border-none"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default FormModal;
