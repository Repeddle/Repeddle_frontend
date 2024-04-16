import { Link } from "react-router-dom"
import useTheme from "../../../hooks/useTheme"
import FacebookIcon from "../../../assets/icons/facebook-icon.svg"
import InstagramIcon from "../../../assets/icons/instagram-icon.svg"
import TwitterIcon from "../../../assets/icons/twitter-icon.svg"
import LargeFooterLinkItems from "./LargeFooterLinkItems"
import SmallFooterLinkItem from "./SmallFooterLinkItem"

type FooterLinks = {
  heading: string
  linkItems: { name: string; href: string }[]
}[]

const footerLinks: FooterLinks = [
  {
    heading: "Customer Care",
    linkItems: [
      { href: "/articles", name: "Support Center" },
      { href: "/returns", name: "Returns & Refund" },
      { href: "/privacypolicy", name: "Privacy Policy" },
      { href: "/terms", name: "Terms of Use" },
    ],
  },
  {
    heading: "Our Company",
    linkItems: [
      { href: "/about", name: "About Us" },
      { href: "/sustainability", name: "Sustainability" },
      { href: "/vipshield", name: "Vip Shield" },
      { href: "/", name: "Blog and News" },
      { href: "/rebundle", name: "Re:Bundle" },
      { href: "/#", name: "Wholesale" },
    ],
  },
  {
    heading: "Categories",
    linkItems: [
      { href: "/category/women", name: "Women" },
      { href: "/category/men", name: "Men" },
      { href: "/category/kids", name: "Kids" },
      { href: "/category/home", name: "Home" },
      { href: "/search", name: "More" },
      { href: "/recurated", name: "Re:Curated" },
    ],
  },
  {
    heading: "Top Brands",
    linkItems: [
      { href: "/search?query=adidas", name: "Adidas" },
      { href: "/search?query=alexandermcquen", name: "Alexander Mcqueen" },
      { href: "/search?query=balanciga", name: "Balanciaga" },
      { href: "/search?query=gucci", name: "Gucci" },
      { href: "/search?query=patagonia", name: "Patagonia" },
    ],
  },
]

const MainFooter = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className="flex flex-col lg:flex-row border-t border-orange-color">
      <div className="flex flex-[2_1] flex-col p-2.5">
        <div className="w-full">
          <Link to="/" className="flex justify-center items-center lg:block">
            <img
              className="w-[45%]"
              src={
                isDarkMode
                  ? "https://res.cloudinary.com/emirace/image/upload/v1659377710/Repeddle-White_pani6a.gif"
                  : "https://res.cloudinary.com/emirace/image/upload/v1659377672/Repeddle-Black_eko2g5.gif"
              }
            />
          </Link>
        </div>
        <div className="text-xs bg-light-ev1 dark:bg-dark-ev1 lg:bg-transparent lg:dark:bg-transparent text-left mt-2.5 mb-5 mx-5 p-5 lg:text-sm lg:text-justify lg:ml-0 lg:mr-[30px] lg:my-2.5">
          Africa’s leading social marketplace for Pre-loved fashion/Items,
          Gen-Z, The Millennials, The Environment and Your Budget. By fostering
          a creative generation of conscious fashion consumers to better the
          planet and our environment, we approach solving Africa’s fashion waste
          crisis, crafting our story of a sustainable circular fashion in
          Africa, one garment at a time, one person at a time, and one loving
          home at a time. Let’s peddle and thrift.
        </div>
        <div className="hidden lg:block">
          <span className="uppercase font-extrabold">Connect with us: </span>
          <span> We're Social, Let's Make It Media:</span>
        </div>
        <div className="flex justify-center lg:justify-normal p-2.5 lg:p-0 border-y-[grey] lg:border-none border-y border-solid">
          <div className="items-center text-white flex h-10 justify-center w-10 mr-5 rounded-[50%]">
            <a href="https://www.facebook.com/Repeddle?mibextid=ZbWKwL">
              <img
                src={FacebookIcon}
                alt="facebook icon"
                className="h-[30px] w-[30px]"
              />
            </a>
          </div>
          <div className="items-center text-white flex h-10 justify-center w-10 mr-5 rounded-[50%]">
            <a href="https://twitter.com/Repeddleapp?t=rOUSOjGxnzW0tDyzRiUSnQ&s=09">
              <img
                src={TwitterIcon}
                alt="twitter icon"
                className="h-[30px] w-[30px]"
              />
            </a>
          </div>
          <div className="items-center text-white flex h-10 justify-center w-10 mr-5 rounded-[50%]">
            <a href="https://instagram.com/repeddleapp?igshid=YmMyMTA2M2Y=">
              <img
                src={InstagramIcon}
                alt="instagram icon"
                className="h-[30px] w-[30px]"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-[3_1] p-2.5">
        {footerLinks.map((item) => (
          <LargeFooterLinkItems
            key={item.heading}
            heading={item.heading}
            linkItems={item.linkItems}
          />
        ))}
      </div>

      <div className="block lg:hidden flex-[3_1] mx-0 my-2.5 p-5 bg-light-ev1 dark:bg-dark-ev1">
        {footerLinks.map((item) => (
          <SmallFooterLinkItem
            key={item.heading}
            heading={item.heading}
            linkItems={item.linkItems}
          />
        ))}
      </div>
    </div>
  )
}

export default MainFooter
