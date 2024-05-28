import { Link } from "react-router-dom"
import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.default.css"
import OwlCarousel from "react-owl-carousel"

const data = [
  {
    image: "/images/homeCarousel/ezgif.com-gif-maker.webp",
    heading:
      "AFRICA’S MILLENNIALS & GEN-Z ONLINE COMMUNITY FOR SECONDHAND FASHION.",
    linkText: "join us",
    href: "/auth/signup",
  },
  {
    image: "/images/homeCarousel/greg-raines-rqFBIR6vQXg-unsplash.webp",
    heading: "BUY-SELL-CHAT-CASH OUT-REPEAT",
    linkText: "shop Now",
    href: "/search",
  },
  {
    image: "/images/homeCarousel/chimi-davila-58FCfyUti_w-unsplash.webp",
    heading: "JOIN THE THRIFT TREASURE HUNT",
    linkText: "Discover",
    href: "/sell",
  },
]

const HomeCarousel = () => {
  return (
    <section className="relative">
      <OwlCarousel
        items={1}
        loop
        dots={true}
        autoplayTimeout={5000}
        autoplaySpeed={3000}
        autoplay={true}
        margin={0}
        autoplayHoverPause={true}
        className="text-center owl-theme"
      >
        {data.map((item) => (
          <div className="overflow-hidden relative" key={item.heading}>
            <div className="items-center flex h-[300px] lg:h-[600px] relative">
              <img
                src={item.image}
                className="h-full object-cover object-bottom"
                alt="img"
              />
            </div>
            <div className="absolute mt-[30px] bottom-5 inset-x-0 bg-transparent text-shadow">
              <h1 className="text-white font-bold text-3xl leading-[25px] lg:text-[70px] lg:leading-[60px] mb-px">
                {item.heading}
              </h1>
              <Link
                className={`text-white font-bold inline-block text-lg relative uppercase pt-0 pb-[3px] px-0
                after:content-[""] after:h-0.5 after:absolute after:w-full after:left-0 after:bottom-0 after:bg-orange-color`}
                to={item.href}
              >
                {item.linkText}
              </Link>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </section>
  )
}

export default HomeCarousel
