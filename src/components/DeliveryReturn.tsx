import { FormEvent, useState } from "react"
import { IReturn } from "../types/order"
import { Helmet } from "react-helmet-async"
import Modal from "./ui/Modal"
import AddFund from "../section/wallet/AddFund"
import { currency, region } from "../utils/common"
import { postnet, pudo, states } from "../utils/constants"
import Button from "./ui/Button"
import useToastNotification from "../hooks/useToastNotification"
import useReturn from "../hooks/useReturn"

type Props = {
  returned: IReturn
  setReturned: (val: IReturn) => void
  setShowModel: (val: boolean) => void
}

const DeliveryReturn = ({ setShowModel, returned, setReturned }: Props) => {
  const { addNotification } = useToastNotification()
  const { updateReturnAddress, error } = useReturn()

  const [deliveryOption, setDeliveryOption] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [meta, setMeta] = useState<{ [key: string]: string | number }>({})
  const [value, setValue] = useState<number>()
  const [showModel, setShowModel1] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)

  const error1 = ""
  const currencys = currency(region())

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (!deliveryOption) {
      addNotification("Select a method of delivery", undefined, true)
      return
    }

    setLoading(true)

    if (
      !returned.deliverySelected &&
      returned.deliveryOption.method !== "Pick up from Seller"
    ) {
      // TODO:  method for other delivery methods
    } else {
      const res = await updateReturnAddress(returned._id, {
        method: deliveryOption,
        fee: value ?? 0,
      })

      if (res) {
        setReturned(res)
        setShowModel(false)
        addNotification("address added")
      } else {
        addNotification(error || "Failed to update address", undefined, true)
      }
    }

    setLoading(false)
  }

  return (
    <div className="m-[30px]">
      <div>
        <Helmet>
          <title>Delivery Method</title>
        </Helmet>
        <h1 className="my-4">Delivery Method</h1>
        {error1 && (
          <div className="text-[red]">
            {error1}
            <span
              onClick={() => setShowModel1(true)}
              className="cursor-pointer text-orange-color underline"
            >
              {" "}
              Fund now
            </span>
          </div>
        )}

        <form onSubmit={submitHandler}>
          {[
            {
              name: returned.deliveryOption.method,
              value: returned.deliveryOption.fee,
            },
          ].map((x) => (
            <div className="mb-3" key={x.name}>
              <div className="my-2.5 mx-0">
                <div className="flex items-center gap-2.5">
                  <input
                    className={`checked:after:w-5 checked:after:h-5 checked:after:relative checked:after:bg-orange-color
                    checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:border-white-color
                    checked:after:rounded-[20px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5`}
                    type="radio"
                    id={x.name}
                    value={x.name}
                    checked={deliveryOption === x.name}
                    onChange={(e) => {
                      setMeta({
                        ...meta,
                        deliveryOption: e.target.value,
                        fee: +x.value,
                      })
                      setDeliveryOption(e.target.value)
                      setValue(x.value)
                      setMeta({})
                    }}
                  />
                  <label className="ml-2.5 capitalize" htmlFor={x.name}>
                    {x.name} {x.value === 1 ? "" : `+ ${currencys}${x.value}`}
                  </label>
                </div>
                {deliveryOption === x.name ? (
                  deliveryOption === "Paxi PEP store" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onClick={() => setShowMap(true)}
                          placeholder="Choose the closest pick up point"
                          defaultValue={meta.shortName}
                        />
                      </div>
                      {showMap && (
                        <iframe
                          width="100%"
                          height="600"
                          src="https://map.paxi.co.za?size=l,m,s&status=1,3,4&maxordervalue=1000&output=nc,sn&select=true"
                          allow="geolocation"
                        />
                      )}
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone number"
                          value={meta.phone}
                        />
                      </div>

                      <a
                        className="link"
                        href="https://www.paxi.co.za/send"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How Paxi works
                      </a>
                    </div>
                  ) : deliveryOption === "PUDO Locker-to-Locker" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <label className="ml-2.5 capitalize">Province</label>
                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                          <select
                            onChange={(e) => {
                              setMeta({ ...meta, province: e.target.value })
                            }}
                            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                          >
                            {region() === "NGN"
                              ? states.Nigeria.map((x) => (
                                  <option value={x}>{x}</option>
                                ))
                              : states.SouthAfrican.map((x) => (
                                  <option value={x}>{x}</option>
                                ))}
                          </select>
                        </div>
                      </div>

                      <a
                        className="link"
                        href="https://www.pudo.co.za/where-to-find-us.php"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Find locker near your location
                      </a>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <label className="ml-2.5 capitalize">
                          Pick Up Locker
                        </label>
                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                          <select
                            onChange={(e) => {
                              setMeta({ ...meta, shortName: e.target.value })
                            }}
                            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                          >
                            {pudo[meta.province as keyof typeof pudo]?.map(
                              (x) => (
                                <option value={x}>{x}</option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone"
                          value={meta.phone}
                        />
                      </div>
                      <a
                        className="link"
                        href="https://www.pudo.co.za/how-it-works.php"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How PUDO works
                      </a>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <a
                          className="link"
                          href="https://www.pudo.co.za/faq.php"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          PUDO FAQ
                        </a>
                      </div>
                    </div>
                  ) : deliveryOption === "PostNet-to-PostNet" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <label className="ml-2.5 capitalize">Province</label>
                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                          <select
                            onChange={(e) => {
                              setMeta({ ...meta, province: e.target.value })
                            }}
                            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                          >
                            {region() === "NGN"
                              ? states.Nigeria.map((x) => (
                                  <option value={x}>{x}</option>
                                ))
                              : states.SouthAfrican.map((x) => (
                                  <option value={x}>{x}</option>
                                ))}
                          </select>
                        </div>
                      </div>

                      <a
                        className="link"
                        href="https://www.postnet.co.za/stores"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Find store near your location
                      </a>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <label className="ml-2.5 capitalize">
                          Pick Up Locker
                        </label>
                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                          <select
                            onChange={(e) => {
                              setMeta({ ...meta, pickUp: e.target.value })
                            }}
                            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                          >
                            {postnet[
                              meta.province as keyof typeof postnet
                            ]?.map((x) => (
                              <option value={x}>{x}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone"
                          value={meta.phone}
                        />
                      </div>
                      <a
                        className="link"
                        href="https://www.postnet.co.za/domestic-postnet2postnet"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How PostNet works
                      </a>
                    </div>
                  ) : deliveryOption === "Aramex Store-to-Door" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, name: e.target.value })
                          }
                          placeholder="Name"
                          value={meta.name}
                        />
                      </div>

                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone"
                          value={meta.phone}
                        />
                      </div>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, email: e.target.value })
                          }
                          placeholder="E-mail"
                          value={meta.email}
                        />
                      </div>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, company: e.target.value })
                          }
                          placeholder="Company name (if applicable)"
                          value={meta.company}
                        />
                      </div>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, address: e.target.value })
                          }
                          placeholder="Address (P.O. box not accepted"
                          value={meta.address}
                        />
                      </div>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, suburb: e.target.value })
                          }
                          placeholder="Suburb"
                          value={meta.suburb}
                        />
                      </div>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, city: e.target.value })
                          }
                          placeholder="City/Town"
                          value={meta.city}
                        />
                      </div>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] pl-2.5 border-b-light-ev3 dark:border-b-light-ev3 border-b   focus:border-b-orange-color focus:border-b"
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, postalcode: e.target.value })
                          }
                          placeholder="Postal Code"
                          value={meta.postalcode}
                        />
                      </div>
                      <div className="flex items-center justify-between mx-0 my-[15px]">
                        <label className="ml-2.5 capitalize">Province</label>
                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                          <select
                            onChange={(e) => {
                              setMeta({ ...meta, province: e.target.value })
                            }}
                            className="text-base m-0 pl-2.5 border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                          >
                            {region() === "NGN"
                              ? states.Nigeria.map((x) => (
                                  <option value={x}>{x}</option>
                                ))
                              : states.SouthAfrican.map((x) => (
                                  <option value={x}>{x}</option>
                                ))}
                          </select>
                        </div>
                      </div>
                      <a
                        className="link"
                        href="https://www.youtube.com/watch?v=VlUQTF064y8"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How Aramex works
                      </a>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
          <div className="mb-3">
            <Button
              className="w-full"
              isLoading={loading}
              text="Continue"
              type="submit"
            />
          </div>
        </form>
        <Modal isOpen={showModel} onClose={() => setShowModel1(false)}>
          <AddFund
            setShowModel={setShowModel}
            currency={currencys === "₦" ? "NGN" : "ZAR"}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </Modal>
      </div>
    </div>
  )
}

export default DeliveryReturn
