import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaCheck, FaQuestionCircle, FaTruck } from "react-icons/fa"
import LoadingBox from "./LoadingBox"
import { IDeliveryOption, ProductMeta, Stations } from "../types/product"
import { getBackendErrorMessage } from "../utils/error"
import useGeoLocation from "../hooks/useGeoLocation"
import { pudoOptions } from "../utils/constants"
import { fetchStations } from "../services/others"
import useRegion from "../hooks/useRegion"

type InputProps = {
  costPrice: string
  sellingPrice: string
  discount: string
  deliveryOption: string
}

type Props = {
  paxi: boolean
  setPaxi: (val: boolean) => void
  pudoLocker: boolean
  setPudoLocker: (val: boolean) => void
  pudoDoor: boolean
  setPudoDoor: (val: boolean) => void
  postnet: boolean
  setPostnet: (val: boolean) => void
  aramex: boolean
  setAramex: (val: boolean) => void
  gig: boolean
  setGig: (val: boolean) => void
  pickup: boolean
  setPickup: (val: boolean) => void
  bundle: boolean
  setBundle: (val: boolean) => void
  deliveryOption: IDeliveryOption[]
  setDeliveryOption: (val: IDeliveryOption[]) => void
  setShowModel: (val: boolean) => void
  meta: ProductMeta
  setMeta: (val: ProductMeta) => void
  handleError?: (text: string, key: keyof InputProps) => void
}

const DeliveryOption = ({
  paxi,
  setPaxi,
  deliveryOption,
  setDeliveryOption,
  pudoLocker,
  setPudoLocker,
  pudoDoor,
  setPudoDoor,
  postnet,
  setPostnet,
  aramex,
  setAramex,
  gig,
  setGig,
  meta,
  setMeta,
  pickup,
  setPickup,
  setShowModel,
  bundle,
  setBundle,
  handleError,
}: Props) => {
  const { region } = useRegion()
  const [error1, setError1] = useState("")
  const [rebundleStatus, setRebundleStatus] = useState(false)
  const [rebundleCount, setRebundleCount] = useState(0)
  const [loadingRebundle, setLoadingRebundle] = useState(false)
  const [rebundleError, setRebundleError] = useState("")
  const [loadingStations, setLoadingStations] = useState(false)
  const [locationerror, setLocationerror] = useState("")
  const [stations, setStations] = useState<Stations[]>([])

  const location = useGeoLocation(gig)

  const setLocation = useCallback(() => {
    if (gig) {
      if (location.error) {
        setLocationerror("Location is require for proper delivery")
      } else if (location.coordinates) {
        setMeta({
          ...meta,
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        })
      }
    }
  }, [gig, location])

  useEffect(() => {
    setLocation()
  }, [setLocation])

  useEffect(() => {
    const getStations = async () => {
      setLoadingStations(true)
      const data = await fetchStations()
      if (data) setStations(data.stations)

      setLoadingStations(false)
    }

    getStations()
  }, [])

  type HandleChange = { name: string; value: number | string; gig?: boolean }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>["target"] | HandleChange
  ) => {
    const { name, value } = e
    const exist = deliveryOption.filter((x) => x.name === name)

    if ("gig" in e && e?.gig) {
      setLocation()
      if (location.error) return
    }

    const intValue = typeof value === "string" ? parseInt(value) : value
    if (exist) {
      const newArray = deliveryOption.filter((x) => x.name !== name)
      setDeliveryOption([...newArray, { name, value: intValue }])
    } else {
      setDeliveryOption([...deliveryOption, { name, value: intValue }])
    }
  }

  const handleClose = () => {
    if (rebundleStatus && !bundle) {
      setRebundleError("Click activate to make Rebundle active ")
      return
    }

    if (paxi) {
      const exist = deliveryOption.filter((x) => x.name === "Paxi PEP store")
      if (exist.length === 0) {
        setError1("Select a delivery price option for Paxi PEP store ")
        return
      }
    }
    if (pudoLocker) {
      const exist = deliveryOption.filter(
        (x) => x.name === "PUDO Locker-to-Locker"
      )
      if (exist.length === 0) {
        setError1("Select a delivery price option for PUDO Locker-to-Locker ")
        return
      }
    }

    if (pudoDoor) {
      const exist = deliveryOption.filter(
        (x) => x.name === "PUDO Locker-to-Door"
      )
      if (exist.length === 0) {
        setError1("Select a delivery price option for PUDO Locker-to-Door ")
        return
      }
    }

    if (postnet) {
      const exist = deliveryOption.filter(
        (x) => x.name === "PostNet-to-PostNet"
      )
      if (exist.length === 0) {
        setError1("Select a delivery price option for PostNet-to-PostNet ")
        return
      }
    }
    if (aramex) {
      const exist = deliveryOption.filter(
        (x) => x.name === "Aramex Store-to-Door"
      )
      if (exist.length === 0) {
        setError1("Select a delivery price option for Aramex Store-to-Door ")
        return
      }
    }

    if (gig) {
      if (!meta.name) {
        setError1("Enter a valid name")
        return
      }
      if (!meta.address) {
        setError1("Enter a valid address")
        return
      }
      if (!meta.phone) {
        setError1("Enter a valid phone")
        return
      }
      if (!meta.stationId) {
        setError1("Select station")
        return
      }
    }

    setShowModel(false)
  }

  const handleRebundle = async (value?: { status: boolean; count: number }) => {
    if (value) {
      // TODO: handle bundle
      setBundle(value.status)
      return
    }
    if (!rebundleCount) {
      setRebundleError("Enter the quantity of item(s) for Rebundle")
      return
    }
    try {
      setLoadingRebundle(true)
      // TODO: handle bundle
      // setBundle(data.status)
      setLoadingRebundle(false)
    } catch (err) {
      setLoadingRebundle(false)
      console.log(getBackendErrorMessage(err))
    }
  }

  return (
    <div className="px-[9vw] py-[30px]">
      <h1 className="text-[28px] leading-tight">Delivery</h1>
      <span className="w-[70%] text-sm leading-[1.2] mb-2.5">
        Select as many as you like. Shops with multiple options sell faster. The
        Buyer will cover the delivery fee when purchasing.
      </span>
      {region === "ZA" ? (
        <>
          <div className="mx-0 my-2.5">
            <div className="flex justify-between mx-0 my-2">
              <div className="flex items-center">
                <FaTruck className="mr-2.5" />
                <div className="mr-2.5">Paxi PEP store</div>
                <div
                  data-content="How do I know what the primary material of the product is? This information is mostly indicated on the Product labels, please refer to the label detailing the composition of your Product."
                  className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-[11px] hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                >
                  <FaQuestionCircle className="mr-2.5" />
                </div>
              </div>
              <input
                className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                checked={paxi}
                onChange={(e) => {
                  handleError?.("", "deliveryOption")
                  setPaxi(e.target.checked)
                  if (!e.target.checked) {
                    setDeliveryOption(
                      deliveryOption.filter((x) => x.name !== "Paxi PEP store")
                    )
                  }
                }}
                type="checkbox"
              />
            </div>
            <div className="w-full h-px bg-[#d4d4d4]" />
            {paxi && (
              <div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Offer free shipping to buyer + R 0.00
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="Paxi PEP store"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    id="free"
                    value={0}
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Standard parcel (450x370 mm) + R 59.95
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="Paxi PEP store"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    value={59.95}
                    id="standard"
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Large parcel (640x510 mm) + R 99.95
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="Paxi PEP store"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    value={99.95}
                    id="Large"
                  />
                </div>
                <a
                  className="text-orange-color underline"
                  href="https://www.paxi.co.za/#send-a-parcel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How PAXI works
                </a>
              </div>
            )}
          </div>
          <div className="my-2.5 mx-0">
            <div className="flex justify-between mx-0 my-2">
              <div className="flex items-center">
                <FaTruck className="mr-2.5" />
                <div className="mr-2.5">PUDO Locker-to-Locker</div>
                <div
                  data-content="Locker-to-locker courier service anywhere in South Africa. Drop off the item at the nearest Pudo locker. The Buyer will collect the item from the locker of their choice. Pudo lockers are accessible 24/7, so you can drop off or pick up your package when it suits you best."
                  className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-[11px] hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                >
                  <FaQuestionCircle className="text-neutral-300" />
                </div>
              </div>
              <input
                className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                checked={pudoLocker}
                onChange={(e) => {
                  handleError?.("", "deliveryOption")
                  setPudoLocker(e.target.checked)
                  if (!e.target.checked) {
                    setDeliveryOption(
                      deliveryOption.filter(
                        (x) => x.name !== "PUDO Locker-to-Locker"
                      )
                    )
                  }
                }}
                type="checkbox"
              />
            </div>
            <div className="w-full h-px bg-[#d4d4d4]" />
            {pudoLocker && (
              <div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Offer free shipping to buyer + R 0.00
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="PUDO Locker-to-Locker"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    id="free"
                    value={0}
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Extra-Small | 600x170x80 mm (MAX 2kg) + R 50.00
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="PUDO Locker-to-Locker"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    value={50}
                    id="standard"
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Medium | 600x410x190 mm (MAX 10kg) + R 60.00
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="PUDO Locker-to-Locker"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    value={60}
                    id="Large"
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Large | 600x410x410 mm (MAX 15kg) + R 60.00
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="PUDO Locker-to-Locker"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    value={60}
                    id="Large"
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Extra-Large | 600x410x690 mm (MAX 20kg) + R 60.00
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="PUDO Locker-to-Locker"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    value={60}
                    id="Large"
                  />
                </div>
                <a
                  className="text-orange-color underline"
                  href="https://www.pudo.co.za/how-it-works.php"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How PUDO works
                </a>
              </div>
            )}
          </div>
          <div className="my-2.5 mx-0">
            <div className="flex justify-between mx-0 my-2">
              <div className="flex items-center">
                <FaTruck className="mr-2.5" />
                <div className="mr-2.5">PUDO Locker-to-Door</div>
                <div
                  data-content="Locker-to-locker courier service anywhere in South Africa. Drop off the item at the nearest Pudo locker. The Buyer will collect the item from the locker of their choice. Pudo lockers are accessible 24/7, so you can drop off or pick up your package when it suits you best."
                  className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-[11px] hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                >
                  <FaQuestionCircle className="text-neutral-300" />
                </div>
              </div>
              <input
                className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                checked={pudoDoor}
                onChange={(e) => {
                  setPudoDoor(e.target.checked)
                  handleError?.("", "deliveryOption")
                  if (!e.target.checked) {
                    setDeliveryOption(
                      deliveryOption.filter(
                        (x) => x.name !== "PUDO Locker-to-Door"
                      )
                    )
                  }
                }}
                type="checkbox"
              />
            </div>
            <div className="w-full h-px bg-[#d4d4d4]" />
            {pudoDoor && (
              <div>
                {pudoOptions.map((opt) => (
                  <div className="flex items-center justify-between mx-0 my-2">
                    <div className="text-sm">{opt.name}</div>
                    <input
                      className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                      type="radio"
                      name="PUDO Locker-to-Door"
                      onChange={(e) => {
                        handleChange(e.target)
                        handleError?.("", "deliveryOption")
                      }}
                      value={opt.value}
                      id="standard"
                    />
                  </div>
                ))}

                <a
                  className="text-orange-color underline"
                  href="https://www.pudo.co.za/how-it-works.php"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How PUDO works
                </a>
              </div>
            )}
          </div>
          <div className="my-2.5 mx-0">
            <div className="flex justify-between mx-0 my-2">
              <div className="flex items-center">
                <FaTruck className="mr-2.5" />
                <div className="mr-2.5">PostNet-to-PostNet</div>
                <div
                  data-content="PostNet-to-PostNet courier service anywhere in South Africa. Drop off the item at the nearest PostNet counter. The Buyer will collect the item from the pick-up point of their choice. Your parcel will be delivered within 2-4 working days."
                  className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-[11px] hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                >
                  <FaQuestionCircle className="text-neutral-300" />
                </div>
              </div>
              <input
                className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                checked={postnet}
                onChange={(e) => {
                  setPostnet(e.target.checked)
                  handleError?.("", "deliveryOption")
                  if (!e.target.checked) {
                    setDeliveryOption(
                      deliveryOption.filter(
                        (x) => x.name !== "PostNet-to-PostNet"
                      )
                    )
                  }
                }}
                type="checkbox"
              />
            </div>
            <div className="w-full h-px bg-[#d4d4d4]" />
            {postnet && (
              <div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Offer free shipping to buyer + R 0.00
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="PostNet-to-PostNet"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    id="free"
                    value={0}
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Standard parcel (up to 2kg) + R 99
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="PostNet-to-PostNet"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    value={99.99}
                    id="standard"
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Standard parcel (up to 5kg) + R 109
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="PostNet-to-PostNet"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    value={99.99}
                    id="standard"
                  />
                </div>
                <a
                  className="text-orange-color underline"
                  href="https://www.postnet.co.za/domestic-postnet2postnet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How Postnet works
                </a>
              </div>
            )}
          </div>
          <div className="my-2.5 mx-0">
            <div className="flex justify-between mx-0 my-2">
              <div className="flex items-center">
                <FaTruck className="mr-2.5" />
                <div className="mr-2.5">Aramex Store-to-Door</div>
                <div
                  data-content="Store-to-door courier service anywhere in South Africa. Aramex shipment sleeves can be bought at kiosks, selected Pick n Pay and Freshstop stores nationwide. The parcel will be delivered to buyer’s door."
                  className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-[11px] hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                >
                  <FaQuestionCircle className="text-neutral-300" />
                </div>
              </div>
              <input
                className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                checked={aramex}
                onChange={(e) => {
                  setAramex(e.target.checked)
                  handleError?.("", "deliveryOption")
                  if (!e.target.checked) {
                    setDeliveryOption(
                      deliveryOption.filter(
                        (x) => x.name !== "Aramex Store-to-Door"
                      )
                    )
                  }
                }}
                type="checkbox"
              />
            </div>
            <div className="w-full h-px bg-[#d4d4d4]" />
            {aramex && (
              <div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Offer free shipping to buyer + R 0.00
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="Aramex Store-to-Door"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    id="free"
                    value={0}
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <div className="text-sm">
                    Standard parcel (350x450 mm) + R 99.99
                  </div>
                  <input
                    className="checked:after:w-[15px] checked:after:h-[15px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[15px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    name="Aramex Store-to-Door"
                    onChange={(e) => {
                      handleChange(e.target)
                      handleError?.("", "deliveryOption")
                    }}
                    value={99.99}
                    id="standard"
                  />
                </div>
                <a
                  className="text-orange-color underline"
                  href="https://www.youtube.com/watch?v=VlUQTF064y8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How Aramex works
                </a>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="my-2.5 mx-0">
            <div className="flex justify-between mx-0 my-2">
              <div className="flex items-center">
                <FaTruck className="mr-2.5" />
                <div className="mr-2.5">GIG Logistics</div>
                <div
                  data-content="Sending & receiving package almost anywhere in Nigeria is made easy with GIGL integrated on Repeddle. Simply fill in a contactable correct address and phone number. A GIGL driver may come to you for pick up, or ask you to drop off your package to the nearest GIGL experience centre closer to you. The buyer pays for delivery and package will be delivered to the address buyer will provide when making a purchase. Please do not make any delivery payment to anyone."
                  className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-[11px] hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:left-[-35px] hover:after:w-[200px] hover:after:-top-9 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
                >
                  <FaQuestionCircle className="text-neutral-300" />
                </div>
              </div>
              <input
                className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
                checked={gig}
                type="checkbox"
                onChange={(e) => {
                  setGig(e.target.checked)
                  handleError?.("", "deliveryOption")
                  handleChange({
                    name: "GIG Logistics",
                    value: 0,
                    gig: e.target.checked,
                  })
                  if (!e.target.checked) {
                    setDeliveryOption(
                      deliveryOption.filter((x) => x.name !== "GIG Logistics")
                    )
                  }
                }}
              />
            </div>
            <div className="w-full h-px bg-[#d4d4d4]" />
            {gig && (
              <div>
                {locationerror && (
                  <div className="text-[red] text-center">{locationerror}</div>
                )}
                <div className="flex items-center justify-between mx-0 my-2 px-[30px] py-2.5">
                  <input
                    className="w-full h-[30px] pl-2.5 text-black dark:text-white bg-transparent border-b-light-ev3 dark:border-b-[grey] focus:outline-0 placeholder:text-sm border-b focus:border-b-orange-color focus:border-b"
                    type="text"
                    onChange={(e) => setMeta({ ...meta, name: e.target.value })}
                    placeholder="Name"
                    value={meta?.name}
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2 px-[30px] py-2.5">
                  <input
                    className="w-full h-[30px] pl-2.5 text-black dark:text-white bg-transparent border-b-light-ev3 dark:border-b-[grey] focus:outline-0 placeholder:text-sm border-b focus:border-b-orange-color focus:border-b"
                    type="text"
                    onChange={(e) => {
                      setMeta({ ...meta, address: e.target.value })
                      handleError?.("", "deliveryOption")
                    }}
                    placeholder="Address"
                    value={meta?.address}
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2 px-[30px] py-2.5">
                  <input
                    className="w-full h-[30px] pl-2.5 text-black dark:text-white bg-transparent border-b-light-ev3 dark:border-b-[grey] focus:outline-0 placeholder:text-sm border-b focus:border-b-orange-color focus:border-b"
                    type="text"
                    onChange={(e) => {
                      setMeta({ ...meta, phone: e.target.value })
                      handleError?.("", "deliveryOption")
                    }}
                    placeholder="Phone"
                    value={meta?.phone}
                  />
                </div>
                <div className="flex items-center justify-between mx-0 my-2 px-[30px] py-2.5">
                  <label className="text-sm tex-[grey] ">Select Station</label>
                  <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 dark:bg-dark-ev1 overflow-hidden rounded-[0.2rem] w-[150px] border border-light-ev4 dark:border-dark-ev4">
                    <select
                      value={meta.stationId}
                      onChange={(e) => {
                        setMeta({ ...meta, stationId: e.target.value })
                        handleError?.("", "deliveryOption")
                      }}
                      className="text-base m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 dark:bg-dark-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                    >
                      {loadingStations ? (
                        <option value="">Loading...</option>
                      ) : (
                        stations.map((station) => (
                          <option value={station.stationId}>
                            {station.StateName}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>
                <a
                  className="text-orange-color underline"
                  href="https://giglogistics.com/faqs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How GIG works
                </a>
              </div>
            )}
          </div>
        </>
      )}
      <div className="my-2.5 mx-0">
        <div className="flex justify-between mx-0 my-2">
          <div className="flex items-center">
            <FaTruck className="mr-2.5" />
            <div className="mr-2.5">Pick up from Seller</div>{" "}
            <div
              data-content="Pick-up from seller is an option seller & buyer agrees upon a choice of delivery outside of delivery methods available on Repeddle. Pick-up from seller may be ideal for users within the same locality."
              className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-[11px] hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:left-[-70px] hover:after:w-[200px] hover:after:top-0 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
            >
              <FaQuestionCircle className="text-neutral-300" />
            </div>
          </div>
          <input
            className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
            checked={pickup}
            type="checkbox"
            onChange={(e) => {
              setPickup(e.target.checked)
              handleError?.("", "deliveryOption")
              handleChange({ name: "Pick up from Seller", value: "0" })
              if (!e.target.checked) {
                setDeliveryOption(
                  deliveryOption.filter((x) => x.name !== "Pick up from Seller")
                )
              }
            }}
          />
        </div>
        <div className="w-full h-px bg-[#d4d4d4]" />
      </div>
      <div className="my-2.5 mx-0">
        <div className="flex justify-between mx-0 my-2">
          <div className="flex items-center">
            <FaTruck className="mr-2.5" />
            <div className="mr-2.5">Re:Bundle</div>
            <div
              data-content="Re:bundle allows buyers to shop multiple items from your store and only pay for delivery once! The buyer will be charged delivery on their first purchase, and, if they make any additional purchases within the next 2 hours, free delivery will then automatically apply. Shops who enable bundling sell more and faster."
              className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                  hover:after:text-[11px] hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                  lg:hover:after:top-0 hover:after:left-[-20px] hover:after:w-[200px] hover:after:-top-14 hover:after:bg-black
                hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
            >
              <FaQuestionCircle className="text-neutral-300" />
            </div>
          </div>
          <input
            className={`relative w-10 h-[15px] transition-[0.5s] rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px]
                before:content-[""] before:absolute before:-translate-y-2/4 before:transition-[0.5s] before:rounded-[50%] before:left-0 before:top-2/4
                appearance-none bg-[#d4d4d4] outline-0 checked:before:bg-orange-color before:bg-[grey] dark:checked:bg-dark-ev4 checked:bg-[#fcf0e0]`}
            checked={rebundleStatus}
            type="checkbox"
            onChange={(e) => {
              handleError?.("", "deliveryOption")
              if (e.target.checked) {
                setRebundleStatus(e.target.checked)
              } else {
                setRebundleStatus(e.target.checked)
                handleRebundle({ status: false, count: 0 })
              }
            }}
          />
        </div>
        <div className="w-full h-px bg-[#d4d4d4]" />
        {rebundleStatus && (
          <div>
            {bundle ? (
              <div>
                <FaCheck className="text-orange-color" />
              </div>
            ) : (
              <>
                <div className="text-[11px]">
                  Please input numbers of how many item(s) you are willing to
                  pack in delivery bag(s) for a buyer when Rebundle is active
                </div>
                <div className="flex items-center justify-between mx-0 my-2">
                  <input
                    className="w-full h-[30px] pl-2.5 text-black dark:text-white bg-transparent border-b-light-ev3 dark:border-b-[grey] focus:outline-0 placeholder:text-sm border-b focus:border-b-orange-color focus:border-b"
                    type="number"
                    onChange={(e) => {
                      handleError?.("", "deliveryOption")
                      setRebundleCount(+e.target.value)
                    }}
                    onFocus={() => setRebundleError("")}
                  />
                  {loadingRebundle ? (
                    <LoadingBox />
                  ) : (
                    <div
                      className="cursor-pointer text-white-color text-center px-[7px] py-[5px] rounded-[0.2rem] bg-orange-color hover:bg-malon-color"
                      onClick={() => handleRebundle()}
                    >
                      Activate
                    </div>
                  )}
                </div>
                {rebundleError && (
                  <div className="text-[red]">{rebundleError}</div>
                )}
              </>
            )}
            <Link
              className="text-orange-color underline"
              to="/rebundle"
              target="_blank"
            >
              More on Re:bundle
            </Link>
          </div>
        )}
      </div>
      {error1 && <div className="text-[red]">{error1}</div>}
      <div
        className="cursor-pointer text-white-color text-center px-[7px] py-[5px] rounded-[0.2rem] bg-orange-color hover:bg-malon-color"
        onClick={handleClose}
      >
        Continue
      </div>
    </div>
  )
}

export default DeliveryOption
