import { Link } from "react-router-dom";
import useCategory from "../../../hooks/useCategory";
import { useEffect } from "react";

const BarCategories = () => {
  const { categories, fetchCategories } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ul className="relative hidden group lg:flex justify-center items-center">
      {categories.length > 0 &&
        categories.map((c) => (
          <div className="mx-5 my-2.5 group-hover:flex">
            <li className="font-medium text-[15px] uppercase cursor-pointer hover:text-orange-color text-black dark:text-white dark:hover:text-orange-color">
              <Link to={c.path || `/search?category=${c.name}`}>{c.name}</Link>
              <Link to={`/category/${c.name}`}>{c.name}</Link>
            </li>

            <ul
              className={`hidden flex-col items-center z-[9] flex-wrap w-screen h-[550px] absolute px-[120px] py-10 left-0 top-8
            dark:bg-black dark:shadow-[0_0_3px_rgba(225,225,225,0.2)] bg-white shadow-[0_0_3px_rgba(0,0,0,0.2)]`}
            >
              {c.subCategories.length > 0 &&
                c.subCategories.map((s) => {
                  if (s.items.length === 0) {
                    return (
                      <li className="whitespace-nowrap text-xs uppercase font-medium cursor-pointer pb-2.5 hover:text-orange-color hover:underline self-start">
                        <Link to={s.path || `/search?query=${s.name}`}>
                          {s.name}
                        </Link>
                      </li>
                    );
                  } else {
                    return (
                      <div className="mb-2.5 self-start">
                        <li className="uppercase font-bold whitespace-nowrap text-xs self-start">
                          {s.name}
                        </li>
                        <ul className="flex flex-col">
                          {s.items.map((l) => (
                            <Link to={l.path || `/search?query=${l.name}`}>
                              <li className="text-xs cursor-pointer hover:text-orange-color hover:underline">
                                {l.name}
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                })}
            </ul>
          </div>
        ))}
      <div className="mx-5 my-2.5 group-hover:flex">
        <Link to="/brands">
          <li className="font-medium text-[15px] uppercase cursor-pointer hover:text-orange-color text-black dark:text-white dark:hover:text-orange-color">
            SHOP BY BRAND
          </li>
        </Link>
      </div>
      <div className="mx-5 my-2.5 group-hover:flex">
        <Link to="/recurated">
          <li className="font-medium text-[15px] uppercase cursor-pointer hover:text-orange-color text-black dark:text-white dark:hover:text-orange-color">
            RE:CURATED
          </li>
        </Link>
      </div>
    </ul>
  );
};

export default BarCategories;
