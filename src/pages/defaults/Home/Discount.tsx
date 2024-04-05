const Discount = () => {
  return (
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
            <div className="h-full p-[30px] lg:pt-[75px] lg:pb-[50px] lg:px-[90px] dark:bg-dark-ev1 bg-light-ev1">
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
                  <div className="text-xl font-medium uppercase dark:text-white text-black">
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
  )
}

export default Discount
