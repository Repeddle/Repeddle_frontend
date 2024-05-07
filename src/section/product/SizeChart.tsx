import { useState } from "react"
import Modal from "../../components/ui/Modal"

const SizeChart = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <span className="underline cursor-pointer" onClick={() => setShow(true)}>
        size chart{" "}
      </span>

      <Modal isOpen={show} onClose={() => setShow(false)}>
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
      </Modal>
    </>
  )
}

export default SizeChart
