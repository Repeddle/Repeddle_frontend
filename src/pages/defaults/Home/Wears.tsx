import { Link } from "react-router-dom"

const Wears = () => {
  return (
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
  )
}

export default Wears
