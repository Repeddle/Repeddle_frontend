import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Article {
  title: string;
  link: string;
}

const SupportArticles = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Article[]>([]);

  const data: Article[] = [
    { title: "Buyers Guide", link: "/buyersguide" },
    { title: "Re:Bundle", link: "/rebundle" },
    { title: "Re:Bundle Simplified", link: "/rebundle-simplified" },
    { title: "How To Log A Return", link: "/howtologreturn" },
    { title: "Product Condition", link: "/condition" },
    { title: "Buyers & Sellers Protection", link: "/buyerprotection" },
    { title: "Terms Of Use", link: "/terms" },
    { title: "Privacy Policy", link: "/privacypolicy" },
    { title: "Cookies Policy", link: "/privacypolicy?cookies" },
    { title: "Return & Refund", link: "/returns" },
    // Add all your list items here
  ];

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setFilteredData([]);
    } else {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  return (
    <div className="w-full lg:mt-5 mt-20">
      <section className="mb-8 bg-gray-100 px-12 py-12 mt-8">
        <h1 className="text-2xl text-center mb-10 font-medium -mt-6">
          Support Articles
        </h1>
        <div className="lg:w-6/12 mx-auto relative justify-center items-center -mt-5">
          <input
            type="text"
            placeholder="Search support articles"
            className="w-full py-4 px-8 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-300
            justify-center items-center text-xl"
            value={search}
            onChange={handleSearch}
          />
          {filteredData.length !== 0 && (
            <div className="absolute z-10 bg-gray-100 mt-2 w-full border border-gray-300 rounded-lg overflow-auto max-h-60">
              {filteredData.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  className="block p-4 hover:bg-gray-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="mb-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-5 px-5">
          <div>
            <h2 className="text-xl mb-2 font-medium">BUYER'S KITS</h2>
            <ul className="">
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/buyersguide">Buyers Guide</Link>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/rebundle">Re:Bundle</Link>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/rebundle-simplified">Re:Bundle Simplified</Link>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/howtologreturn">How To Log A Return</Link>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/condition">Product Condition</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl mb-2 font-medium">SELLER'S KIT</h2>
            <ul className="">
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/feestructure">Commission Fee Structure</Link>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/condition">Product Condition</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl mb-2 font-medium">SAFETY KITS</h2>
            <ul className="text-lg">
              <li className="hover:text-orange-300 cursor-pointer text-slate-500">
                <Link to="/buyerprotection">Buyers & Sellers Protection</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl mb-2 font-medium">LEGAL STUFF</h2>
            <ul className="">
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/terms">Terms Of Use</Link>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/privacypolicy">Privacy Policy</Link>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500 ">
                <Link to="/privacypolicy?cookies">Cookies Policy</Link>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <Link to="/returns">Return & Refund</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportArticles;
