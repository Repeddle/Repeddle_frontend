import { Link, useNavigate } from "react-router-dom"
import CategoriesLinksButtons from "../../components/CategoriesLinksButtons"
import TheThrill from "../../components/TheThrill"
import CategoryListing from "../../components/CategoryListing"
import { FaAngleLeft, FaAngleRight, FaArrowRight } from "react-icons/fa"
import { useContext } from "react"
import ThemeContext from "../../context/ThemeContext"
import MessageBox from "../../components/MessageBox"
import LoadingBox from "../../components/LoadingBox"
import { IProduct } from "../../types/product"
import Product from "../../components/Product"

function Home() {
  const navigate = useNavigate()
  const theme = useContext(ThemeContext)

  const products: IProduct[] = []
  const sellers: any[] = []
  const loadingUser = false
  const error = null

  return (
    <div>
      {/* <Helmet>
        <title>Repeddle</title>
      </Helmet> */}
      <div>
        {/* <section className="banner ">
          <OwlCarousel
            items={1}
            loop
            autoHeight={false}
            dots={true}
            autoplayTimeout={5000}
            autoplaySpeed={3000}
            autoplay={true}
            margin={0}
            autoplayHoverPause={true}
            className="banner_slider owl-theme"
          >
            <div className="banner_item">
              <div className="banner_image">
                <img src="/images/ezgif.com-gif-maker.webp" alt="img" />
              </div>
              <div className="banner_text">
                <h1>
                  AFRICA’S MILLENNIALS & GEN-Z ONLINE COMMUNITY FOR SECONHAND
                  FASHION.
                </h1>
                <Link to="/signup">join us</Link>
              </div>
            </div>
            <div className="banner_item">
              <div className="banner_image">
                <img
                  src="/images/greg-raines-rqFBIR6vQXg-unsplash.webp"
                  alt="img"
                />
              </div>
              <div className="banner_text">
                <h1>BUY-SELL-CHAT-CASH OUT-REPEAT</h1>
                <Link to="/search">shop Now</Link>
              </div>
            </div>
            <div className="banner_item">
              <div className="banner_image">
                <img
                  src="/images/chimi-davila-58FCfyUti_w-unsplash.webp"
                  alt="img"
                />
              </div>
              <div className="banner_text">
                <h1>JOIN THE THRIFT TREASURE HUNT</h1>
                <Link to="/sell">Discover</Link>
              </div>
            </div>
          </OwlCarousel>
        </section> */}

        <section>
          <CategoriesLinksButtons />
        </section>
        <section>
          <Link to="/how-repeddle-work">
            <img
              src="https://res.cloudinary.com/emirace/image/upload/v1691653514/20230807_205931_0000_t2aa7t.png"
              alt="img"
              style={{ width: "100%", objectFit: "contain" }}
            />
          </Link>
        </section>

        <TheThrill />

        <section className="flex-col mx-0 my-2.5 lg:flex-col">
          <div className="flex-[2] flex flex-col">
            <h2 className="text-[50px] capitalize relative mb-[30px] pl-[5vw] pr-[3vw] py-0 after:absolute after:content-[''] after:h-0.5 after:w-[70px] after:bg-malon-color after:left-[10vw] after:-bottom-1">
              New Collections
            </h2>
            <p className="max-w-[450px] text-justify lg:max-w-[400px] px-[5vw] py-0">
              Discover new shops launching on our App and Website daily. Shop
              Hot deals, New Arrivals & New style drops from your favorite shops
              and influencers.
            </p>
          </div>
          <div className="CategoryListing_item scroll_snap">
            <CategoryListing
              image="/images/engin-akyurt-xbFtknoQG_Y-unsplash.webp"
              title="STYLE UP"
              link="/recurated"
            />
            <CategoryListing
              image="/images/ruan-richard-rodrigues--MCGquf_4mU-unsplash.webp"
              bottom={true}
              title="ACCESSORIZE"
              link="/search?query=accessorize"
            />
            <CategoryListing
              image="/images/julian-hochgesang-sA5wcAu4CBA-unsplash.webp"
              title="SHOES AFFAIR"
              link="/search?query=shoe"
            />
            <CategoryListing
              image="/images/stephen-audu-BkB5T-ZdK88-unsplash.webp"
              title="BAGS AFFAIR"
              bottom={true}
              link="/search?query=bags"
            />
            <CategoryListing
              image="/images/carmen-fu-4xb2LK36Mps-unsplash.webp"
              title="GEN-Z KIDS"
              link="/search?query=kids"
            />
            <CategoryListing
              image="/images/ahmed-carter-GP3-QpmTgPk-unsplash.webp"
              title="LET'S GO PARTY"
              bottom={true}
              link="/search"
            />
          </div>
          <div
            className="flex lg:hidden items-center text-orange-color cursor-pointer text-[15px] font-[bold] self-end mx-5 hover:text-malon-color"
            onClick={() => navigate("/categories")}
          >
            <span>Search All Categories</span>
            <FaArrowRight className="ml-2.5" />
          </div>
        </section>
        <section className="relative overflow-hidden mb-2.5">
          <div className="w-full mx-auto px-3">
            <div className="flex md:flex-row md:gap-5 gap-0 flex-col">
              <div className="flex-[5] order-2 md:order-none">
                <div className="">
                  <div className="items-center flex h-[325px] relative py-3">
                    <img
                      src="/images/vonecia-carswell-D3HSYAUjVrM-unsplash.webp"
                      alt=""
                      className="h-full object-cover w-full rounded-[10px]"
                    />
                    <div className="max-w-[150px] left-[10px] absolute lg:left-[50px] bg-none">
                      <h4 className="text-white font-bold text-shadow text-[calc(1.275rem_+_0.3vw)] xl:text-2xl">
                        Classic Men Wears
                      </h4>
                      <Link
                        className={`text-white inline-block text-sm font-semibold relative no-underline uppercase pt-0 pb-[3px] px-0
                        after:bg-orange-color after:content-[""] after:h-0.5 after:absolute after:w-full after:left-0 after:bottom-0`}
                        to="/search?category=men"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="items-center flex h-[325px] relative py-3">
                    <img
                      src="/images/For-kids.webp"
                      alt=""
                      className="h-full object-cover object-left lg:object-center w-full rounded-[10px]"
                    />
                    <div className="max-w-[150px] left-[10px] absolute lg:left-[50px] bg-none">
                      <h4 className="text-white font-bold text-shadow text-[calc(1.275rem_+_0.3vw)] xl:text-2xl">
                        Smart Kid's Wears
                      </h4>
                      <Link
                        className={`text-white inline-block text-sm font-semibold relative no-underline uppercase pt-0 pb-[3px] px-0
                        after:bg-orange-color after:content-[""] after:h-0.5 after:absolute after:w-full after:left-0 after:bottom-0`}
                        to="/search?query=kid"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-[7] order-1 md:order-none">
                <div className="items-center flex h-[325px] lg:h-[650px] relative py-3">
                  <img
                    src="/images/tamara-bellis-uN1m9Ca0aqo-unsplash.webp"
                    alt=""
                    className="h-full object-cover object-left lg:object-center w-full rounded-[10px]"
                  ></img>
                  <div className="max-w-[40%] absolute mb-[15px] left-[10] lg:left-[30px]">
                    <h1 className="text-white font-bold text-shadow text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem]">
                      High Taste Women Wears
                    </h1>
                    <div>
                      <Link
                        to="/search?query=women"
                        className="text-white inline-block text-sm font-semibold relative no-underline uppercase pt-0 pb-[3px] px-0"
                      >
                        <button className="bg-orange-color text-white cursor-pointer text-[13px] font-medium capitalize px-[30px] py-2.5 rounded-[25px] border-[none]">
                          Shop Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex-col mx-0 my-2.5 lg:flex-col  ">
          <div className="flex-[2] flex flex-col">
            <h2 className="text-[50px] capitalize relative mb-[30px] pl-[5vw] pr-[3vw] py-0 after:absolute after:content-[''] after:h-0.5 after:w-[70px] after:bg-malon-color after:left-[10vw] after:-bottom-1">
              Brands
            </h2>
            <p className="max-w-[450px] text-justify lg:max-w-[400px] px-[5vw] py-0">
              Discover brands that tick the boxes, from names you love, price
              that does not break the bank and environmental conscious brands
              that you can pass on to generations. That is sustainability.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row mx-0 my-2.5 scroll_snap">
            <CategoryListing
              image="https://res.cloudinary.com/emirace/image/upload/v1692426674/usljgmtg7fb5wi0m5o4r.jpg"
              title="PUMA"
              link="/search?brand=puma"
            />
            <CategoryListing
              image="/images/Picture1.webp"
              title="PATAGONIA"
              link="/search?brand=patagonia"
            />
            <CategoryListing
              image="/images/lucas-hoang-O0e6Ka5vYSs-unsplash.webp"
              bottom
              title="GUCCI"
              link="/search?brand=gucci"
            />
            <CategoryListing
              image="/images/tony-tran-VKVDdLGoilc-unsplash.webp"
              title="BALANCIAGA"
              bottom
              link="/search?brand=balanciaga"
            />
            <CategoryListing
              image="/images/jakayla-toney-v0gHLhdQPCY-unsplash.webp"
              title="ADIDAS"
              link="/search?brand=adidas"
            />
            <CategoryListing
              image="/images/A.mcqueen.webp"
              title="A. MCQUEEN"
              link="/search?brand=alexander%20mcqueen"
            />
          </div>
          <div
            className="flex lg:hidden items-center text-orange-color cursor-pointer text-[15px] font-[bold] self-end mx-5 hover:text-malon-color"
            onClick={() => navigate("/brand")}
          >
            <span>Search All Brands</span>
            <FaArrowRight className="ml-2.5" />
          </div>
        </section>

        <section className="overflow-hidden relative px-0 py-2.5">
          <div>
            <h2
              className={`lg:text-[50px] relative capitalize text-3xl lg:mb-5 mb-2.5 px-[5vw] py-0
            after:bg-orange-color after:content-[""] after:h-0.5 after:absolute after:w-[70px] after:left-[10vw] after:-bottom-1`}
            >
              New deals
            </h2>
          </div>
          <button
            // onClick={() => sliderHandler("left")}
            className="items-center cursor-pointer flex h-full justify-center opacity-50 absolute w-[5vw] z-[8] border-[none] left-0 top-0 bg-transparent"
          >
            <FaAngleLeft size={40} opacity={0.2} />
          </button>
          <button
            // onClick={() => sliderHandler("right")}
            className="items-center cursor-pointer flex h-full justify-center opacity-50 absolute w-[5vw] z-[8] border-[none] right-0 top-0 bg-transparent"
          >
            <FaAngleRight size={40} opacity={0.2} />
          </button>
          <div id="slider" className="product-container1 scroll_snap">
            {products.length > 0
              ? products.map((product) => (
                  <div key={product._id} className="smooth1">
                    <Product product={product} />
                  </div>
                ))
              : "No Product Found"}
          </div>
        </section>
        <div
          className={`rounded-[0.2rem] ${
            theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
          }`}
        >
          <div className="border-b-malon-color lg:border-none lg:flex-row flex-col lg:h-auto h-[400px] overflow-hidden m-0 p-2.5 flex lg:px-20 lg:py-2.5 border-b-[5px] border-solid">
            <div className="flex flex-1 flex-col justify-center lg:p-[5vw] p-2.5">
              <div className="lg:pb-[30px] pb-[15px]">
                <h2 className="text-3xl leading-10 pb-2.5 lg:text-[50px] capitalize lg:pb-5">
                  try it on mobile
                </h2>
                Easy, with just aclick away. Never miss amazing deals and hot
                drops by getting real-time Notifications. Buy, Sell,Chat,
                Cash-out and Repeat. Anywhere, Anytime.
              </div>
              <div className="flex justify-start lg:justify-between">
                <img
                  src="/images/as.png"
                  className="w-[140px] mr-2.5 cursor-pointer lg:w-[20vw] lg:mr-[5px]"
                  alt="playstore"
                />
                <img
                  src="/images/gp.png"
                  className="w-[140px] mr-2.5 cursor-pointer lg:w-[20vw] lg:mr-[5px]"
                  alt="playstore"
                />
              </div>
            </div>
            <div className="items-center flex flex-1 justify-center relative">
              <img
                src="/images/phonescreen.png"
                className="w-[150px] lg:w-auto"
                alt="app"
              />
              <img
                className="w-[150px] absolute lg:w-[200px] right-[50px] top-[50px]"
                src="/images/phonescreen.png"
                alt="app"
              />
              <h3 className="text-3xl text-shadow1 -translate-x-2/4 translate-y-[-80%] absolute font-bold text-black lg:text-[50px] lg:-translate-x-2/4 lg:-translate-y-2/4 text-center whitespace-nowrap left-2/4 top-2/4">
                COMING SOON
              </h3>
            </div>
          </div>
        </div>

        <div className="mx-0 my-2.5">
          <div className="flex justify-center">
            <img
              className="w-full lg:w-[70%]"
              src="https://res.cloudinary.com/emirace/image/upload/v1670561126/20221127_190952_0000_930_1_ftrpnf.webp"
            />
          </div>
        </div>

        <section className="w-full px-0 py-2.5 lg:pt-5 lg:pb-2.5">
          <div className="container mx-auto sm:px-4">
            <div className="flex flex-wrap">
              <div className="md:w-1/2 p-0">
                <div className="h-full min-w-full">
                  <img
                    src="/images/mike-von-bWUOx0SaSAk-unsplash.webp"
                    alt=""
                    className="h-full object-cover w-full"
                  />
                </div>
              </div>
              <div className="md:w-1/2 p-0">
                <div
                  className={`h-full p-[30px] lg:pt-[75px] lg:pb-[50px] lg:px-[90px] ${
                    theme?.isDarkMode ? "bg-dark-ev1" : "bg-light-ev1"
                  }`}
                >
                  <div
                    className={`relative text-center z-[1] mb-[30px] lg:mb-[60px] after:bg-white after:content-[""] after:h-[183px] after:ml-[-90px] 
                    after:top-[-18px] after:absolute lg:after:top-[-38px] after:translate-x-[-10%] after:w-[220px] after:z-[-1] after:left-2/4`}
                  >
                    <span className="text-black text-xl font-medium uppercase">
                      Discount
                    </span>
                    <h2 className="text-orange-color text-[55px] font-bold mb-2.5">
                      Season Sales{" "}
                    </h2>
                    <h5 className="text-black">
                      <div
                        className={`text-black text-xl font-medium uppercase ${
                          theme?.isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        Sales Up To 60% OFF
                      </div>
                    </h5>
                  </div>
                  <div className="text-center mb-2.5">
                    <div className="float-left w-3/12 mb-[15px] flex flex-col lg:block">
                      <span className="inline-block text-3xl font-semibold">
                        22
                      </span>
                      <p className="inline-block font-medium mb-0">Days</p>
                    </div>
                    <div className="float-left w-3/12 mb-[15px] flex flex-col lg:block">
                      <span className="inline-block text-3xl font-semibold">
                        18
                      </span>
                      <p className="inline-block font-medium mb-0">Hours</p>
                    </div>
                    <div className="float-left w-3/12 mb-[15px] flex flex-col lg:block">
                      <span className="inline-block text-3xl font-semibold">
                        46
                      </span>
                      <p className="inline-block font-medium mb-0">Min</p>
                    </div>
                    <div className="float-left w-3/12 mb-[15px] flex flex-col lg:block">
                      <span className="inline-block text-3xl font-semibold">
                        05
                      </span>
                      <p className="inline-block font-medium mb-0">Sec</p>
                    </div>
                  </div>
                  <a
                    href="/"
                    className="text-malon-color inline-block text-sm font-bold relative uppercase ml-[45%] pt-0 pb-[3px] px-0"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="top_seller_carousel">
          <div>
            <h2
              className={`lg:text-[50px] relative capitalize text-3xl lg:mb-5 mb-2.5 px-[5vw] py-0
            after:bg-orange-color after:content-[""] after:h-0.5 after:absolute after:w-[70px] after:left-[10vw] after:-bottom-1`}
            >
              Top Sellers
            </h2>
          </div>
          <div>
            {loadingUser ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox>{error}</MessageBox>
            ) : (
              <>
                {sellers.length === 0 && (
                  <MessageBox>No Seller Found</MessageBox>
                )}
                <div className="flex overflow-x-auto scroll-smooth mx-[5vw] my-0 scrollbar-hide scroll_snap">
                  {sellers &&
                    sellers.length > 0 &&
                    sellers.map((seller, index) => (
                      <Link to={`/seller/${seller.userId._id}`} key={index}>
                        <div className="items-center flex flex-col mr-[30px]">
                          <div className="relative">
                            <img
                              src={seller.userId.image}
                              alt={seller.userId.username}
                              className="lg:h-[200px] object-cover object-top lg:w-[200px] rounded-[50%] h-[150px] w-[150px]"
                            ></img>
                            {seller.userId.badge && (
                              <div className="seller_profile_badge">
                                <img
                                  className="w-5 object-cover"
                                  src="https://res.cloudinary.com/emirace/image/upload/v1661148671/Icons-28_hfzerc.png"
                                />
                              </div>
                            )}
                          </div>
                          <p className="mt-0 mb-4">@{seller.userId.username}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
