import { useState } from "react"

const NewsLetter = () => {
  const [input, setInput] = useState("")

  const sent = false

  const handleSubmit = () => {}

  return sent ? (
    <div className="h-full w-full flex lg:text-lg md:text-base text-sm justify-center items-center text-center px-2.5 py-0">
      Great! Welcome to the Repeddle Tribe. We've sent you an email to confirm
      your subscription.
    </div>
  ) : (
    <div className="items-center flex flex-col justify-center pt-[10px] lg:pt-0">
      <div className="text-center text-black font-extrabold text-base">
        WANT TO GET EXCITING HOT DEALS, DISCOUNTS, AND TIMELY UPDATE FROM YOUR
        FAVOURITES STORE?
      </div>
      <div className="text-center text-base text-malon-color lg:text-black">
        Drop your email not to miss out!
      </div>
      <div className="bg-white w-[90%] flex h-10 justify-between lg:w-1/2 rounded-[15px]">
        <input
          type={"text"}
          placeholder="Your Email"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="flex-[8_1] pl-5 rounded-tl-[15px] rounded-bl-[15px] border-none"
        />
        <button
          className="text-white flex-[2_1] rounded-tr-[15px] rounded-br-[15px] border-l-0 border-none bg-malon-color"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
      <div className="mt-[5px] text-black text-center">
        We prioritize your privacy
      </div>
    </div>
  )
}

export default NewsLetter
