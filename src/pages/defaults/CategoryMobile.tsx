import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import { ICategory, ISubCategory } from "../../types/category";
import { FaChevronDown } from "react-icons/fa";
import useCategory from "../../hooks/useCategory";

const CategoryMobile = () => {
  const { categories, fetchCategories } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="fixed z-[7] overflow-auto mt-[72px] p-2.5 inset-0 bg-white dark:bg-black">
        <div className="flex justify-center items-center text-white mx-0 my-[15px] p-[3px] rounded-[0.2rem] bg-orange-color">
          Let's help you find what you are looking for
        </div>
        <div className="mb-[15px]">
          <SearchBox />
        </div>

        <div className="shrink-0 overflow-auto pb-[50px]">
          {categories &&
            categories.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
        </div>
        <div className="h-[55px] w-full" />
      </div>
    </>
  );
};

const SidebarItem = ({ item }: { item: ICategory | ISubCategory }) => {
  const [open, setOpen] = useState(false);

  if ("subCategories" in item && item?.subCategories?.length > 0) {
    return (
      <div
        className={`block hover:bg-[#eb9f4015] transition-all group duration-[0.15s] px-[1em] py-[0.75em] rounded-[5px] ${
          open ? "open" : ""
        }`}
      >
        <div
          className="flex text-[1em] capitalize justify-between"
          onClick={() => setOpen(!open)}
        >
          <span>{item.name}</span>
          <FaChevronDown className="group-has-[.open]:rotate-180 transition-all duration-300" />
        </div>
        {item?.subCategories?.length > 0 && (
          <div className="h-0 overflow-hidden pt-[0.25em] group-has-[.open]:h-auto">
            {item.subCategories.map((child, index) => (
              <SidebarItem key={index} item={child} />
            ))}
          </div>
        )}
      </div>
    );
  } else if (Array.isArray(item.items)) {
    return (
      <div
        className={`block hover:bg-[#eb9f4015] transition-all group duration-[0.15s] px-[1em] py-[0.75em] rounded-[5px] ${
          open ? "open" : ""
        }`}
      >
        {item?.items?.length > 0 && (
          <div className="h-0 overflow-hidden pt-[0.25em] group-has-[.open]:h-auto">
            {item.items.map((child, index) => (
              <div
                className="text-[1em] capitalize px-[1em] py-[0.75em] hover:text-orange-color"
                key={index}
              >
                <Link
                  to={`/search?query=${child.name}`}
                  className="font-medium"
                >
                  {child.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="text-[1em] capitalize px-[1em] py-[0.75em] hover:text-orange-color">
        <Link to={`/search?query=${item.name}`}> {item.name}</Link>
      </div>
    );
  }
};

export default CategoryMobile;
