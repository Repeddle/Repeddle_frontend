import { useState } from "react"
import ModelLogin from "../../components/ModelLogin"

const SizeChart = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <span className="underline cursor-pointer" onClick={() => setShow(true)}>
        size chart{" "}
      </span>

      <ModelLogin showModel={show} setShowModel={setShow}>
        <div className="h-full overflow-hidden">
          <img
            className="w-full"
            src="/images/repeddleSizes/repeddleSize1.jpg"
            alt="sizeChart"
          />
          <img
            className="w-full"
            src="/images/repeddleSizes/repeddleSize2.jpg"
            alt="sizeChart"
          />
          <img
            className="w-full"
            src="/images/repeddleSizes/repeddleSize3.jpg"
            alt="sizeChart"
          />
        </div>
      </ModelLogin>
    </>
  )
}

export default SizeChart
