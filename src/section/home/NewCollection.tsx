import { FaArrowRight } from "react-icons/fa"
import CategoryListing from "../../components/CategoryListing"
import { useNavigate } from "react-router-dom"

const NewCollection = () => {
  const navigate = useNavigate()

  const param = (key: string, val: string) => {
    return new URLSearchParams([[key, val]])
  }

  return (
    <section className="flex-col my-2.5 lg:flex-row flex">
      <div className="flex flex-[2_1] flex-col">
        <h2 className="lg:text-[50px] leading-[1.2] capitalize relative text-[30px] mb-[10px] lg:mb-[30px] pl-[5vw] pr-[3vw] py-0 after:absolute after:content-[''] after:h-0.5 after:w-[70px] after:bg-malon-color after:left-[10vw] after:-bottom-1">
          New Collections
        </h2>
        <p className="lg:max-w-[450px] mb-4 text-justify max-w-[400px] px-[5vw] py-0">
          Discover new shops launching on our App and Website daily. Shop Hot
          deals, New Arrivals & New style drops from your favorite shops and
          influencers.
        </p>
      </div>
      <div className="flex flex-[4_1] pb-[10px] scrollbar-hide h-[250px] overflow-x-auto ml-5 lg:ml-0">
        <CategoryListing
          image="/images/categories/engin-akyurt-xbFtknoQG_Y-unsplash.webp"
          title="STYLE UP"
          link={`/search?${param("filter", "type:recurated")}`}
        />
        <CategoryListing
          image="/images/categories/ruan-richard-rodrigues--MCGquf_4mU-unsplash.webp"
          bottom={true}
          title="ACCESSORIZE"
          link="/search?search=accessorize"
        />
        <CategoryListing
          image="/images/categories/julian-hochgesang-sA5wcAu4CBA-unsplash.webp"
          title="SHOES AFFAIR"
          link="/search?search=shoe"
        />
        <CategoryListing
          image="/images/categories/stephen-audu-BkB5T-ZdK88-unsplash.webp"
          title="BAGS AFFAIR"
          bottom={true}
          link="/search?search=bags"
        />
        <CategoryListing
          image="/images/categories/carmen-fu-4xb2LK36Mps-unsplash.webp"
          title="GEN-Z KIDS"
          link="/search?search=kids"
        />
        <CategoryListing
          image="/images/categories/ahmed-carter-GP3-QpmTgPk-unsplash.webp"
          title="LET'S GO PARTY"
          bottom={true}
          link="/search"
        />
      </div>
      <div
        className="flex lg:hidden items-center text-orange-color cursor-pointer text-[15px] font-bold self-end mx-5 hover:text-malon-color"
        onClick={() => navigate("/categories")}
      >
        <span>Search All Categories</span>
        <FaArrowRight className="ml-2.5" />
      </div>
    </section>
  )
}

export default NewCollection
