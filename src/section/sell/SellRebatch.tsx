import { useState } from "react"

const SellRebatch = () => {
  const [input, setInput] = useState("")

  const handleSubmit = () => {}

  return (
    <div className="flex flex-col items-center mx-0 lg:my-10 my-5">
      <h2 className="flex text-center justify-center font-bold lg:text-base text-[15px] mx-[5px] my-0">
        RE:BATCH
      </h2>
      <div className="flex w-auto flex-col lg:flex-row lg:w-[70%] justify-center items-center">
        <h4 className="font-bold block lg:hidden text-xs lg:text-lg text-center mx-[5px] my-0">
          COMING SOON!!!
        </h4>
        <h4 className="font-bold block lg:hidden text-xs lg:text-lg text-center mx-[5px] my-0">
          WANTS TO CONSIGN WITH US?
        </h4>
        <img
          className=" w-[200px] mx-0 my-2.5 flex-1 h-[500px] ml-0 lg:mr-5 lg:my-5"
          src="https://res.cloudinary.com/emirace/image/upload/v1661221991/derick-anies-hDJT_ERrB-w-unsplash_tty8rb.webp"
          alt="img"
        />
        <div>
          <p className="text-sm text-justify sm:text-base mb-2.5">
            Repeddle Batch is a consignment option that offers a personalized
            service to our community members that wish to transfer their
            pre-loved items to a new loving home but don’t like the admin.
          </p>
          <p className="text-sm text-justify sm:text-base mb-2.5">
            Consigning your garment is part of the steps you take to reduce
            fashion foot print on our environment. Save our planet by recycling
            garments instead of dumping them to landfills.
          </p>
          <h4 className="font-bold text-xs lg:text-lg hidden lg:block text-center mx-[5px] my-0">
            COMING SOON!!!
          </h4>
          <h4 className="font-bold text-xs lg:text-lg hidden lg:block text-center mx-[5px] my-0">
            WANTS TO CONSIGN WITH US?
          </h4>
          <p className="text-sm text-left sm:text-base mb-2.5">
            Drop Your email and we will let you know once we start accepting
            consignment
          </p>

          <div className="border h-10 w-full items-center flex px-[5px] py-0 rounded-[0.2rem] border-solid">
            <input
              className="flex-[10] h-full border-0 focus-visible:outline-none dark:bg-white-color bg-black-color text-black-color dark:text-white-color"
              value={input}
              placeholder="Email:"
              onChange={(e) => setInput(e.target.value)}
            />
            <div style={{ cursor: "pointer", flex: 1 }} onClick={handleSubmit}>
              SUBMIT
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellRebatch
