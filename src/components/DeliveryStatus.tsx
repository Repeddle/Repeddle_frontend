import { DeliverStatus } from "../types/order"

type Props = {
  status: DeliverStatus
}

const DeliveryStatus = ({ status }: Props) => {
  if (status === "Delivered")
    return (
      <div className="bg-green-color uppercase rounded text-white-color text-center px-2.5 py-0.5">
        {status}
      </div>
    )

  if (status === "Rejected")
    return (
      <div className="bg-yellow-color uppercase rounded text-white-color text-center px-2.5 py-0.5">
        {status}
      </div>
    )

  if (status === "Processing")
    return (
      <div className="bg-[blue] uppercase rounded text-white-color text-center px-2.5 py-0.5">
        {status}
      </div>
    )

  if (status === "Dispatched")
    return (
      <div className="bg-[#FFC000] uppercase rounded text-white-color text-center px-2.5 py-0.5">
        {status}
      </div>
    )

  if (status === "In Transit")
    return (
      <div className="bg-[#FFC000] uppercase rounded text-white-color text-center px-2.5 py-0.5">
        {status}
      </div>
    )

  if (status === "Hold")
    return (
      <div className="bg-yellow-color uppercase rounded text-white-color text-center px-2.5 py-0.5">
        {status}
      </div>
    )

  return (
    <div className="bg-[grey] uppercase rounded text-white-color text-center px-2.5 py-0.5">
      {status}
    </div>
  )
}

export default DeliveryStatus
