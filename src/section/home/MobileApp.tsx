const MobileApp = () => {
  return (
    <div className="rounded-[0.2rem] dark:bg-dark-ev1 bg-light-ev1">
      <div className="border-b-malon-color lg:border-none lg:flex-row flex-col lg:h-auto h-[400px] overflow-hidden m-0 p-2.5 flex lg:px-20 lg:py-2.5 border-b-[5px] ">
        <div className="flex flex-1 flex-col justify-center lg:p-[5vw] p-2.5">
          <div className="lg:pb-[30px] pb-[15px]">
            <h2 className="text-3xl leading-10 pb-2.5 lg:text-[50px] capitalize lg:pb-5">
              try it on mobile
            </h2>
            Easy, with just aclick away. Never miss amazing deals and hot drops
            by getting real-time Notifications. Buy, Sell,Chat, Cash-out and
            Repeat. Anywhere, Anytime.
          </div>
          <div className="flex justify-start lg:justify-between">
            <img
              src="/images/mobile/as.png"
              className="w-[140px] mr-2.5 cursor-pointer lg:w-[20vw] lg:mr-[5px]"
              alt="playstore"
            />
            <img
              src="/images/mobile/gp.png"
              className="w-[140px] mr-2.5 cursor-pointer lg:w-[20vw] lg:mr-[5px]"
              alt="playstore"
            />
          </div>
        </div>
        <div className="items-center flex flex-1 justify-center relative">
          <img
            src="/images/mobile/phonescreen.png"
            className="w-[150px] lg:w-auto"
            alt="app"
          />
          <img
            className="w-[150px] absolute lg:w-[200px] right-[50px] top-[50px]"
            src="/images/mobile/phonescreen.png"
            alt="app"
          />
          <h3 className="text-3xl text-shadow1 -translate-x-2/4 translate-y-[-80%] absolute font-bold text-black lg:text-[50px] lg:-translate-x-2/4 lg:-translate-y-2/4 text-center whitespace-nowrap left-2/4 top-2/4">
            COMING SOON
          </h3>
        </div>
      </div>
    </div>
  )
}

export default MobileApp
