import { FaArrowRight } from "react-icons/fa"
import CategoryListing from "../../components/CategoryListing"
import { useNavigate } from "react-router-dom"

const Brands = () => {
  const navigate = useNavigate()

  const param = (key: string, val: string) => {
    return new URLSearchParams([[key, val]])
  }

  return (
    <section className="flex-col mx-0 my-2.5 lg:flex-row flex">
      <div className="flex flex-[2_1] flex-col">
        <h2 className="text-[30px] lg:text-[50px] leading-[1.2] capitalize relative mb-[10px] lg:mb-[30px] pl-[5vw] pr-[3vw] py-0 after:absolute after:content-[''] after:h-0.5 after:w-[70px] after:bg-malon-color after:left-[10vw] after:-bottom-1">
          Brands
        </h2>
        <p className="lg:max-w-[450px] mb-4 font-medium text-sm lg:text-base text-justify max-w-[400px] px-[5vw] py-0">
          Discover brands that tick the boxes, from names you love, price that
          does not break the bank and environmental conscious brands that you
          can pass on to generations. That is sustainability.
        </p>
      </div>
      <div className="flex flex-[4_1] pb-[10px] scrollbar-hide h-[250px] overflow-x-auto ml-5 lg:ml-auto">
        <CategoryListing
          image="https://res.cloudinary.com/emirace/image/upload/v1692426674/usljgmtg7fb5wi0m5o4r.jpg"
          title="PUMA"
          link={`/search?${param("filter", "brand:puma")}`}
        />
        <CategoryListing
          image="/images/brands/Picture1.webp"
          title="PATAGONIA"
          link={`/search?${param("filter", "brand:patagonia")}`}
        />
        <CategoryListing
          image="/images/brands/lucas-hoang-O0e6Ka5vYSs-unsplash.webp"
          bottom
          title="GUCCI"
          link={`/search?${param("filter", "brand:gucci")}`}
        />
        <CategoryListing
          image="/images/brands/tony-tran-VKVDdLGoilc-unsplash.webp"
          title="BALANCIAGA"
          bottom
          link={`/search?${param("filter", "brand:balanciaga")}`}
        />
        <CategoryListing
          image="/images/brands/jakayla-toney-v0gHLhdQPCY-unsplash.webp"
          title="ADIDAS"
          link={`/search?${param("filter", "brand:adidas")}`}
        />
        <CategoryListing
          image="/images/brands/A.mcqueen.webp"
          title="A. MCQUEEN"
          link={`/search?${param("filter", "brand:alexander mcqueen")}`}
        />
      </div>
      <div
        className="flex lg:hidden items-center text-orange-color cursor-pointer text-[15px] font-bold self-end mx-5 hover:text-malon-color"
        onClick={() => navigate("/brands")}
      >
        <span>Search All Brands</span>
        <FaArrowRight className="ml-2.5" />
      </div>
    </section>
  )
}

export default Brands
