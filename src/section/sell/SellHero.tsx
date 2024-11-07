const SellHero = () => {
  return (
    <section className="flex flex-col items-center mx-0 lg:my-10 my-5">
      <h2 className="flex text-center justify-center font-bold lg:text-3xl text-[15px] mx-[5px] my-0">
        LET YOUR WARDROBE LIVE IN YOUR POCKET, ITS FAST
      </h2>
      <div className="flex w-full justify-center items-center">
        <h4 className="font-bold lg:text-[calc(1.275rem_+_0.3vw)] text-xs lg:text-base text-malon-color mx-[5px] my-0">
          "CAN'T DO IT IN REAL LIFE?
        </h4>
        <h4 className="font-bold lg:text-[calc(1.275rem_+_0.3vw)] text-xs lg:text-base text-orange-color mx-[5px] my-0">
          DO IT ON REPEDDLE"
        </h4>
      </div>
      <div className="relative w-full lg:h-[70vh] h-auto">
        <img
          className="w-full object-cover h-full mx-0 my-2.5"
          src="https://res.cloudinary.com/emirace/image/upload/v1661221993/tamara-bellis-HPvN6rs86F0-unsplash_q78awc.webp"
          alt="main Image"
        />
        <h1 className="font-bold text-shadow absolute max-w-[300px] text-3xl text-center top-[80%] lg:text-start lg:text-[80px] lg:leading-tight text-white-color -translate-y-2/4 left-[10%] lg:top-2/4">
          THE THRILL! START SELLING
        </h1>
      </div>
    </section>
  )
}

export default SellHero
