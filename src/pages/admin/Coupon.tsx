const Coupon = () => {
  return (
    <div className="mb-2.5 m-0 p-2.5 flex-[4] lg:mb-[-25px] bg-light-ev1 dark:bg-dark-ev1 lg:mx-5 lg:my-0 lg:p-5 rounded-[0.2rem]">
      <div className="h-10 flex rounded-[0.2rem] border-malon-color border">
        <input
          className="flex-[4] p-[5px] rounded-tl-[0.2rem] rounded-bl-[0.2rem] border-0 focus-visible:outline-0 bg-light-ev1 dark:bg-dark-ev1"
          placeholder="Enter value"
        />
        <button className="flex-[2] lg:flex-1 text-white-color rounded-tr-[0.2rem] rounded-br-[0.2rem] border-0 bg-orange-color hover:bg-malon-color">
          Generate
        </button>
      </div>
    </div>
  )
}

export default Coupon
