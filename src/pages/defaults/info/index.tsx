import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"

type LinksData = { displayName: string; url: string }

const supportLinksData = [
  {
    header: "BUYER'S KITS",
    links: [
      { displayName: "Buyer's Guide", url: "/buyersguide" },
      { displayName: "Re:Bundle", url: "/rebundle" },
      { displayName: "Re:Bundle Simplified", url: "/rebundle-simplified" },
      { displayName: "How to log a return", url: "/howtologreturn" },
      { displayName: "Product Condition", url: "/condition" },
      // Add more links here
    ],
  },
  {
    header: "SELLER'S KITS",
    links: [
      { displayName: "Commission Fee Structure", url: "/feestructure" },
      { displayName: "Product Condition", url: "/condition" },
      // Add more links here
    ],
  },
  {
    header: "SAFETY KITS",
    links: [
      { displayName: "Buyers & sellers Protection", url: "/buyerprotection" },
      // Add more links here
    ],
  },
  {
    header: "LEGAL STUFF",
    links: [
      { displayName: "Terms of use", url: "/terms" },
      { displayName: "Privacy Policy", url: "/privacypolicy" },
      { displayName: "Cookies Policy", url: "/privacypolicy?cookies" },
      { displayName: "Return & Refund", url: "/returns" },
      // Add more links here
    ],
  },
  // Add more groups here
]

const SupportArticles = () => {
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState<LinksData[]>([])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearch(query)

    if (query.trim() === "") {
      setFilteredData([])
    } else {
      // Perform the search here based on the query
      const results = supportLinksData.flatMap((group) =>
        group.links.filter((link) =>
          link.displayName.toLowerCase().includes(query.toLowerCase())
        )
      )
      setFilteredData(results)
    }
  }

  return (
    <div className="">
      <section className="relative bg-[#f0f0f0] flex flex-col items-center justify-center p-5">
        <h2 className="text-xl mb-2.5 font-medium">Support Articles</h2>
        <input
          type="text"
          placeholder="Search support articles"
          className="border max-w-[300px] peer text-black md:max-w-[650px] w-full p-2.5 rounded-[5px] border-solid border-[#ccc] focus:outline-none focus:border-orange-color"
          value={search}
          onChange={handleSearch}
        />
        <div className="absolute -translate-x-1/2 w-full md:w-1/2 max-h-[200px] overflow-y-auto bg-[#f0f0f0] border z-10 rounded-[5px] border-solid border-[#ccc] left-2/4 top-full">
          {filteredData.length !== 0 &&
            filteredData.map((item, idx) => (
              <Link
                key={idx}
                to={item.url}
                className="block p-2.5 text-black hover:bg-[#e0e0e0]"
              >
                {item.displayName}
              </Link>
            ))}
        </div>
      </section>
      <section className="max-w-[1200px] grid md:grid-cols-4 gap-5 mx-auto my-5 px-5 py-0">
        {supportLinksData.map((group, i) => (
          <div key={i}>
            <h2 className="text-xl mb-2.5 font-medium leading-tight">
              {group.header}
            </h2>
            <SupportLinks links={group.links} />
          </div>
        ))}
      </section>
    </div>
  )
}

const SupportLinks = ({
  links,
}: {
  links: (typeof supportLinksData)[number]["links"]
}) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const hiddenLinksCount = links.length - 5

  return (
    <>
      <ul className="list-none p-0 m-0">
        {showAll
          ? links.map((link, index) => (
              <li
                className="mb-1.5 text-[gray] hover:text-orange-color"
                key={index}
              >
                <Link to={link.url}>{link.displayName}</Link>
              </li>
            ))
          : links.slice(0, 5).map((link, index) => (
              <li
                className="mb-1.5 text-[gray] hover:text-orange-color"
                key={index}
              >
                <Link to={link.url}>{link.displayName}</Link>
              </li>
            ))}
      </ul>
      {links.length > 5 && (
        <button
          className="text-orange-color bg-transparent py-1.5 px-0 border-none cursor-pointer"
          onClick={toggleShowAll}
        >
          {showAll ? "Show Less" : "View All"} ({hiddenLinksCount})
        </button>
      )}
    </>
  )
}

export default SupportArticles
