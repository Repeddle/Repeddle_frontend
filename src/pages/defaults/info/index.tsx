import React, { useState } from 'react';

interface Article {
  title: string;
  link: string;
}

const SupportArticles = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Article[]>([]);

  const data: Article[] = [
    { title: 'Buyers Guide', link: '/buyersguide' },
    { title: 'Re:Bundle', link: '/rebundle' },
    { title: 'Re:Bundle Simplified', link: '/RebundleSimplify' },
    { title: 'How To Log A Return', link: '/howtologreturn' },
    { title: 'Product Condition', link: '/condition' },
    { title: 'Buyers & Sellers Protection', link: '/buyerprotection' },
    { title: 'Terms Of Use', link: '/terms' },
    { title: 'Privacy Policy', link: '/privacypolicy' },
    { title: 'Cookies Policy', link: '/privacypolicy?cookies' },
    { title: 'Return & Refund', link: '/returns' },
    // Add all your list items here
  ];

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
    if (event.target.value === '') {
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
                <a
                  key={idx}
                  href={item.link}
                  className="block p-4 hover:bg-gray-200"
                >
                  {item.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="mb-8">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-4 gap-5 px-5">
          <div>
            <h2 className="text-2xl font-medium">BUYER'S KITS</h2>
            <ul className="text-lg">
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/buyersguide">Buyers Guide</a>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/rebundle">Re:Bundle</a>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/RebundleSimplify">Re:Bundle Simplified</a>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/howtologreturn">How To Log A Return</a>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/condition">Product Condition</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-medium">SELLER'S KIT</h2>
            <ul className="text-lg">
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/feestructure">Commission Fee Structure</a>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/condition">Product Condition</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-medium">SAFETY KITS</h2>
            <ul className="text-lg">
              <li className="hover:text-orange-300 cursor-pointer text-slate-500">
                <a href="/buyerprotection">Buyers & Sellers Protection</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-medium">LEGAL STUFF</h2>
            <ul className="text-lg">
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/terms">Terms Of Use</a>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/privacypolicy">Privacy Policy</a>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500 ">
                <a href="/privacypolicy?cookies">Cookies Policy</a>
              </li>
              <li className="hover:text-orange-300 cursor-pointer text-gray-500">
                <a href="/returns">Return & Refund</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportArticles;
