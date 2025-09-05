import { FormEvent, useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CartItem } from "../context/CartContext";
import RebundlePoster from "./RebundlePoster";
import { currency } from "../utils/common";
import { postnet, pudo, states } from "../utils/constants";
import Button from "./ui/Button";
import { IDeliveryMeta } from "../types/order";
import useGeoLocation from "../hooks/useGeoLocation";
import { IRebundle } from "../types/user";
import { fetchStations, getGigPrice } from "../services/others";
import { Stations } from "../types/product";
import useToastNotification from "../hooks/useToastNotification";
import useCart from "../hooks/useCart";
import useRegion from "../hooks/useRegion";

type Props = {
  setShowModel: (val: boolean) => void;
  item: CartItem;
};

const DeliveryOptionScreen = ({ setShowModel, item }: Props) => {
  const { addNotification } = useToastNotification();
  const { addToCart } = useCart();
  const { region } = useRegion();

  const [loadingStations, setLoadingStations] = useState(false);
  const [stations, setStations] = useState<Stations[]>([]);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [meta, setMeta] = useState<IDeliveryMeta>({});
  const [value, setValue] = useState(0);
  const [token, setToken] = useState({ userId: "", token: "", username: "" });
  const location = useGeoLocation();
  const [locationerror, setLocationerror] = useState("");
  const [loadingGig, setLoadingGig] = useState(false);
  const [isRebundle] = useState<IRebundle>({
    count: 0,
    status: false,
  });
  const [validationError, setValidationError] = useState<{
    [key in keyof IDeliveryMeta]: string;
  }>({});

  useEffect(() => {
    const getStations = async () => {
      setLoadingStations(true);
      const data = await fetchStations();
      if (data) {
        setStations(data.stations);
        setToken(data.token);
      }

      setLoadingStations(false);
    };

    getStations();
  }, []);

  const setLocation = useCallback(() => {
    if (deliveryOption === "GIG Logistics") {
      if (location.error) {
        setLocationerror("Location is require for proper delivery");
      } else if (location.coordinates) {
        setMeta({
          ...meta,
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        });
      }
    }
  }, [deliveryOption, location.coordinates, location.error, meta]);

  useEffect(() => {
    setLocation();
  }, [setLocation]);

  const submitHandler = async () => {
    let deliverySelect = {};

    if (deliveryOption === "GIG Logistics") {
      if (
        location.error ||
        !location.coordinates?.lat ||
        !location.coordinates?.lng
      ) {
        setLocationerror("Location is require for proper delivery");
        addNotification("Location is require for proper delivery");
        return;
      }
      try {
        setLoadingGig(true);

        const data = await getGigPrice(item, meta, location.coordinates, token);

        if (data) {
          deliverySelect = {
            "delivery Option": deliveryOption,
            cost: data.DeliveryPrice,
            ...meta,
            lat: location.coordinates.lat,
            lng: location.coordinates.lng,
            total: { status: true, cost: data.DeliveryPrice },
          };
        } else {
          setLoadingGig(false);
          setLocationerror(
            "Error selecting delivery method, try again later or try other delivery method"
          );
          return;
        }
      } catch (err) {
        setLoadingGig(false);
        console.log(err);
      }
    } else {
      deliverySelect = {
        "delivery Option": deliveryOption,
        cost: value,
        ...meta,
        total: { status: true, cost: value },
      };
    }

    // const valid = true
    // TODO:
    // const allowData = await rebundleIsActive(user, item.seller._id, cart, valid)
    // console.log("allow", allowData, deliveryOption)
    // if (
    //   allowData?.countAllow > 0 &&
    //   allowData?.seller?.deliveryMethod === deliveryOption
    // ) {
    //   deliverySelect = {
    //     ...deliverySelect,
    //     total: { status: true, cost: 0 },
    //   }
    // }
    addToCart({
      ...item,
      deliverySelect,
    });
    setShowModel(false);
    // navigate("/placeorder");
    setLoadingGig(false);
  };

  const validation = (e: FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!deliveryOption) {
      valid = false;
    }
    if (deliveryOption === "Paxi PEP store") {
      if (!meta.shortName) {
        setValidationError({
          ...validationError,
          shortName: "Select a pick up point ",
        });
        valid = false;
      }
      if (!meta.phone) {
        setValidationError({
          ...validationError,
          phone: "Enter a valid phone number ",
        });
        valid = false;
      }
    }
    if (deliveryOption === "PUDO Locker-to-Locker") {
      if (!meta.phone) {
        setValidationError({
          ...validationError,
          phone: "Enter a valid phone number ",
        });
        valid = false;
      }
      if (!meta.province) {
        setValidationError({
          ...validationError,
          province: "Select province",
        });
        valid = false;
      }
      if (!meta.shortName) {
        setValidationError({
          ...validationError,
          shortName: "Select a pick up point ",
        });
        valid = false;
      }
    }
    if (deliveryOption === "PUDO Locker-to-Door") {
      if (!meta.phone) {
        setValidationError({
          ...validationError,
          phone: "Enter a valid phone number ",
        });
        valid = false;
      }
      if (!meta.province) {
        setValidationError({
          ...validationError,
          province: "Select province",
        });
        valid = false;
      }
      if (!meta.address) {
        setValidationError({
          ...validationError,
          address: "Enter a delivery address ",
        });
        valid = false;
      }
    }
    if (deliveryOption === "PostNet-to-PostNet") {
      if (!meta.phone) {
        setValidationError({
          ...validationError,
          phone: "Enter a valid phone number ",
        });
        valid = false;
      }

      if (!meta.province) {
        setValidationError({
          ...validationError,
          province: "Select province",
        });
        valid = false;
      }
      if (!meta.pickUp) {
        setValidationError({
          ...validationError,
          pickUp: "Select a pick up locker ",
        });
        valid = false;
      }
    }
    if (deliveryOption === "Aramex Store-to-Door") {
      if (!meta.province) {
        setValidationError({
          ...validationError,
          province: "Select province",
        });
        valid = false;
      }
      if (!meta.postalcode) {
        setValidationError({
          ...validationError,
          postalcode: "Enter your postal code ",
        });
        valid = false;
      }
      if (!meta.city) {
        setValidationError({
          ...validationError,
          city: "Enter your city ",
        });
        valid = false;
      }
      if (!meta.suburb) {
        setValidationError({
          ...validationError,
          suburb: "Enter your suburb ",
        });
        valid = false;
      }
      if (!meta.address) {
        setValidationError({
          ...validationError,
          address: "Enter your address ",
        });
        valid = false;
      }
      if (!meta.email) {
        setValidationError({
          ...validationError,
          email: "Enter your email ",
        });
        valid = false;
      }
      if (!meta.name) {
        setValidationError({
          ...validationError,
          name: "Enter your name ",
        });
        valid = false;
      }
      if (!meta.phone) {
        setValidationError({
          ...validationError,
          phone: "Enter a valid phone number ",
        });
        valid = false;
      }
    }
    if (deliveryOption === "GIG Logistics") {
      if (!meta.stationId) {
        setValidationError({
          ...validationError,
          stationId: "Select a station ",
        });
        valid = false;
      }
      if (!meta.address) {
        setValidationError({
          ...validationError,
          address: "Enter your address ",
        });
        valid = false;
      }
      if (!meta.name) {
        setValidationError({
          ...validationError,
          name: "Enter your name ",
        });
        valid = false;
      }
      if (!meta.phone) {
        setValidationError({
          ...validationError,
          phone: "Enter a valid phone number ",
        });
        valid = false;
      }
    }

    if (valid) {
      submitHandler();
    }
  };

  console.log(item);

  return (
    <div className="m-[30px]">
      <div>
        <Helmet>
          <title>Delivery Method</title>
        </Helmet>
        <h1 className="my-3">Delivery Method</h1>
        {isRebundle.status && <RebundlePoster />}
        <form onSubmit={validation}>
          {item.deliveryOption.map((x) => (
            <div className="mb-3" key={x.name}>
              <div className="my-2.5 mx-0">
                <div className="flex items-center">
                  <input
                    className="checked:after:w-[20px] checked:after:h-[20px] checked:after:relative checked:after:bg-orange-color checked:after:content-[''] checked:after:inline-block checked:after:visible checked:after:border-white checked:after:rounded-[20px] checked:after:border-2 checked:after:-left-px checked:after:-top-0.5"
                    type="radio"
                    id={x.name}
                    value={x.name}
                    checked={deliveryOption === x.name}
                    onChange={(e) => {
                      setMeta({
                        ...meta,
                        "delivery Option": e.target.value,
                        cost: x.value,
                      });
                      setDeliveryOption(e.target.value);
                      setValue(x.value);
                      setMeta({});
                    }}
                  />
                  <label className="mx-2.5 capitalize" htmlFor={x.name}>
                    {x.name}{" "}
                    {x.value === 0 ? (
                      ""
                    ) : isRebundle.status && isRebundle.method === x.name ? (
                      <div className="text-malon-color text-[11px] font-bold ml-2.5">
                        Free delivery for {isRebundle?.count} item
                      </div>
                    ) : (
                      `+ ${currency(region)}${x.value}`
                    )}
                  </label>
                </div>
                {deliveryOption === x.name ? (
                  deliveryOption === "Paxi PEP store" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              shortName: "",
                            })
                          }
                          type="text"
                          onClick={() => setShowMap(true)}
                          placeholder="Choose the closest pick up point"
                          defaultValue={meta.shortName}
                        />
                        {validationError.shortName && (
                          <div className="text-[red] text-[13px]">
                            {validationError.shortName}
                          </div>
                        )}
                      </div>
                      {showMap && (
                        <iframe
                          width="100%"
                          height="600"
                          src="https://map.paxi.co.za?size=l,m,s&status=1,3,4&maxordervalue=1000&output=nc,sn&select=true"
                          frameBorder="0"
                          allow="geolocation"
                        ></iframe>
                      )}
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              phone: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone number"
                          value={meta.phone}
                        />
                        {validationError.phone && (
                          <div className="text-[red] text-[13px]">
                            {validationError.phone}
                          </div>
                        )}
                      </div>

                      <a
                        className="text-orange-color text-sm underline font-normal pl-2.5"
                        href="https://www.paxi.co.za/#send-a-parcel"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How Paxi works
                      </a>
                    </div>
                  ) : deliveryOption === "PUDO Locker-to-Locker" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <label className="mx-2.5 capitalize">Province</label>

                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-full border border-light-ev4 dark:border-dark-ev4">
                          <select
                            value={meta.province}
                            onChange={(e) => {
                              setMeta({ ...meta, province: e.target.value });
                              setValidationError({
                                ...validationError,
                                province: "",
                              });
                            }}
                            className="text-base m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-4/5 appearance-none text-black-color dark:text-white-color"
                          >
                            {region === "NG"
                              ? states.Nigeria.map((x) => (
                                  <option value={x}>{x}</option>
                                ))
                              : states.SouthAfrican.map((x) => (
                                  <option value={x}>{x}</option>
                                ))}
                          </select>
                        </div>
                        {validationError.province && (
                          <div className="text-[red] text-[13px]">
                            {validationError.province}
                          </div>
                        )}
                      </div>

                      <a
                        className="text-orange-color text-sm underline font-normal pl-2.5"
                        href="https://www.pudo.co.za/where-to-find-us.php"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Find locker near your location
                      </a>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <label className="mx-2.5 capitalize">
                          Pick Up Locker
                        </label>

                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-full border border-light-ev4 dark:border-dark-ev4">
                          <select
                            value={meta.shortName}
                            onChange={(e) => {
                              setMeta({ ...meta, shortName: e.target.value });
                              setValidationError({
                                ...validationError,
                                shortName: "",
                              });
                            }}
                            className="text-base m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-4/5 appearance-none text-black-color dark:text-white-color"
                          >
                            {meta.province &&
                              pudo[meta.province as keyof typeof pudo]?.map(
                                (x) => <option value={x}>{x}</option>
                              )}
                          </select>
                        </div>

                        {validationError.shortName && (
                          <div className="text-[red] text-[13px]">
                            {validationError.shortName}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              phone: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone"
                          value={meta.phone}
                        />
                        {validationError.phone && (
                          <div className="text-[red] text-[13px]">
                            {validationError.phone}
                          </div>
                        )}
                      </div>
                      <a
                        className="text-orange-color text-sm underline font-normal pl-2.5"
                        href="https://www.pudo.co.za/how-it-works.php"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How PUDO works
                      </a>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <a
                          className="text-orange-color text-sm underline font-normal pl-2.5"
                          href="
                      https://www.pudo.co.za/faq.php"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          PUDO FAQ
                        </a>
                      </div>
                    </div>
                  ) : deliveryOption === "PUDO Locker-to-Door" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              address: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, address: e.target.value })
                          }
                          placeholder="Address"
                          value={meta.address}
                        />
                        {validationError.address && (
                          <div className="text-[red] text-[13px]">
                            {validationError.address}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              city: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, city: e.target.value })
                          }
                          placeholder="City/Town"
                          value={meta.city}
                        />
                        {validationError.city && (
                          <div className="text-[red] text-[13px]">
                            {validationError.city}
                          </div>
                        )}
                      </div>

                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <label className="mx-2.5 capitalize">Province</label>

                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-full border border-light-ev4 dark:border-dark-ev4">
                          <select
                            value={meta.province}
                            onChange={(e) => {
                              setMeta({ ...meta, province: e.target.value });
                              setValidationError({
                                ...validationError,
                                province: "",
                              });
                            }}
                            className="text-base m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-4/5 appearance-none text-black-color dark:text-white-color"
                          >
                            {region === "NG"
                              ? states.Nigeria.map((x) => (
                                  <option value={x}>{x}</option>
                                ))
                              : states.SouthAfrican.map((x) => (
                                  <option value={x}>{x}</option>
                                ))}
                          </select>
                        </div>
                        {validationError.province && (
                          <div className="text-[red] text-[13px]">
                            {validationError.province}
                          </div>
                        )}
                      </div>

                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              phone: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone"
                          value={meta.phone}
                        />
                        {validationError.phone && (
                          <div className="text-[red] text-[13px]">
                            {validationError.phone}
                          </div>
                        )}
                      </div>
                      <a
                        className="text-orange-color text-sm underline font-normal pl-2.5"
                        href="https://www.pudo.co.za/how-it-works.php"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How PUDO works
                      </a>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <a
                          className="text-orange-color text-sm underline font-normal pl-2.5"
                          href="
                      https://www.pudo.co.za/faq.php"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          PUDO FAQ
                        </a>
                      </div>
                    </div>
                  ) : deliveryOption === "PostNet-to-PostNet" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <label className="mx-2.5 capitalize">Province</label>
                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-full border border-light-ev4 dark:border-dark-ev4">
                          <select
                            value={meta.province}
                            onChange={(e) => {
                              setMeta({ ...meta, province: e.target.value });
                              setValidationError({
                                ...validationError,
                                province: "",
                              });
                            }}
                            className="text-base m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-4/5 appearance-none text-black-color dark:text-white-color"
                          >
                            {region === "NG"
                              ? states.Nigeria.map((x) => (
                                  <option value={x}>{x}</option>
                                ))
                              : states.SouthAfrican.map((x) => (
                                  <option value={x}>{x}</option>
                                ))}
                          </select>
                        </div>
                        {validationError.province && (
                          <div className="text-[red] text-[13px]">
                            {validationError.province}
                          </div>
                        )}
                      </div>

                      <a
                        className="text-orange-color text-sm underline font-normal pl-2.5"
                        href="https://www.postnet.co.za/stores"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Find store near your location
                      </a>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <label className="mx-2.5 capitalize">
                          Pick Up Locker
                        </label>

                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-full border border-light-ev4 dark:border-dark-ev4">
                          <select
                            value={meta.pickUp}
                            onChange={(e) => {
                              setMeta({ ...meta, pickUp: e.target.value });
                              setValidationError({
                                ...validationError,
                                pickUp: "",
                              });
                            }}
                            className="text-base m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-4/5 appearance-none text-black-color dark:text-white-color"
                          >
                            {meta.province &&
                              postnet[
                                meta.province as keyof typeof postnet
                              ]?.map((x) => <option value={x}>{x}</option>)}
                          </select>
                        </div>
                        {validationError.pickUp && (
                          <div className="text-[red] text-[13px]">
                            {validationError.pickUp}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              phone: "",
                            })
                          }
                          type="number"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone"
                          value={meta.phone}
                        />
                        {validationError.phone && (
                          <div className="text-[red] text-[13px]">
                            {validationError.phone}
                          </div>
                        )}
                      </div>
                      <a
                        className="text-orange-color text-sm underline font-normal pl-2.5"
                        href="https://www.postnet.co.za/domestic-postnet2postnet"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How PostNet works
                      </a>
                    </div>
                  ) : deliveryOption === "Aramex Store-to-Door" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              name: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, name: e.target.value })
                          }
                          placeholder="Name"
                          value={meta.name}
                        />
                        {validationError.name && (
                          <div className="text-[red] text-[13px]">
                            {validationError.name}
                          </div>
                        )}
                      </div>

                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              phone: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone"
                          value={meta.phone}
                        />
                        {validationError.phone && (
                          <div className="text-[red] text-[13px]">
                            {validationError.phone}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              email: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, email: e.target.value })
                          }
                          placeholder="E-mail"
                          value={meta.email}
                        />
                        {validationError.email && (
                          <div className="text-[red] text-[13px]">
                            {validationError.email}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              company: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, company: e.target.value })
                          }
                          placeholder="Company name (if applicable)"
                          value={meta.company}
                        />
                        {validationError.company && (
                          <div className="text-[red] text-[13px]">
                            {validationError.company}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              address: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, address: e.target.value })
                          }
                          placeholder="Address (P.O. box not accepted"
                          value={meta.address}
                        />
                        {validationError.address && (
                          <div className="text-[red] text-[13px]">
                            {validationError.address}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              suburb: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, suburb: e.target.value })
                          }
                          placeholder="Suburb"
                          value={meta.suburb}
                        />
                        {validationError.suburb && (
                          <div className="text-[red] text-[13px]">
                            {validationError.suburb}
                          </div>
                        )}
                      </div>

                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              city: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, city: e.target.value })
                          }
                          placeholder="City/Town"
                          value={meta.city}
                        />
                        {validationError.city && (
                          <div className="text-[red] text-[13px]">
                            {validationError.city}
                          </div>
                        )}
                      </div>

                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              postalcode: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, postalcode: e.target.value })
                          }
                          placeholder="Postal Code"
                          value={meta.postalcode}
                        />
                        {validationError.postalcode && (
                          <div className="text-[red] text-[13px]">
                            {validationError.postalcode}
                          </div>
                        )}
                      </div>

                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <label className="mx-2.5 capitalize">Province</label>
                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-full border border-light-ev4 dark:border-dark-ev4">
                          <select
                            value={meta.province}
                            onChange={(e) => {
                              setMeta({ ...meta, province: e.target.value });
                              setValidationError({
                                ...validationError,
                                province: "",
                              });
                            }}
                            className="text-base m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-4/5 appearance-none text-black-color dark:text-white-color"
                          >
                            {region === "NG"
                              ? states.Nigeria.map((x) => (
                                  <option value={x}>{x}</option>
                                ))
                              : states.SouthAfrican.map((x) => (
                                  <option value={x}>{x}</option>
                                ))}
                          </select>
                        </div>
                        {validationError.province && (
                          <div className="text-[red] text-[13px]">
                            {validationError.province}
                          </div>
                        )}
                      </div>
                      <a
                        className="text-orange-color text-sm underline font-normal pl-2.5"
                        href="https://www.youtube.com/watch?v=VlUQTF064y8"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How Aramex works
                      </a>
                    </div>
                  ) : deliveryOption === "GIG Logistics" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      {locationerror && (
                        <div className="text-[red] text-center">
                          {locationerror}
                        </div>
                      )}
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              name: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, name: e.target.value })
                          }
                          placeholder="Name"
                          value={meta.name}
                        />
                        {validationError.name && (
                          <div className="text-[red] text-[13px]">
                            {validationError.name}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              phone: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, phone: e.target.value })
                          }
                          placeholder="Phone"
                          value={meta.phone}
                        />
                        {validationError.phone && (
                          <div className="text-[red] text-[13px]">
                            {validationError.phone}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <input
                          className="w-full h-[30px] bg-transparent pl-2.5 border-b focus:border-b-orange-color border-light-ev3 dark:border-dark-ev3 text-black dark:text-white focus:border-b placeholder:text-sm"
                          onFocus={() =>
                            setValidationError({
                              ...validationError,
                              address: "",
                            })
                          }
                          type="text"
                          onChange={(e) =>
                            setMeta({ ...meta, address: e.target.value })
                          }
                          placeholder="Address"
                          value={meta.address}
                        />
                        {validationError.address && (
                          <div className="text-[red] text-[13px]">
                            {validationError.address}
                          </div>
                        )}
                      </div>
                      <div className="flex items-stretch flex-col mx-0 my-[15px]">
                        <div className="text-sm mx-5 text-[grey]">
                          Select Station
                        </div>

                        <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none bg-light-ev1 overflow-hidden rounded-[0.2rem] ml-5 w-[150px] border border-light-ev4 dark:border-dark-ev4">
                          <select
                            value={meta.stationId}
                            onChange={(e) => {
                              setMeta({ ...meta, stationId: e.target.value });
                              setValidationError({
                                ...validationError,
                                stationId: "",
                              });
                            }}
                            className="text-base m-0 pl-2.5 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal bg-light-ev1 focus-within:outline-orange-color w-4/5 appearance-none text-black-color dark:text-white-color"
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
                        {validationError.stationId && (
                          <div className="text-[red] text-[13px]">
                            {validationError.stationId}
                          </div>
                        )}
                      </div>
                      <a
                        className="text-orange-color text-sm underline font-normal pl-2.5"
                        href="https://giglogistics.com/faqs/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How GIG works
                      </a>
                    </div>
                  ) : deliveryOption === "Pick up from Seller" ? (
                    <div className="border m-[5px] p-2.5 rounded-[0.2rem] border-light-ev3 dark:border-dark-ev3">
                      <div className="flex items-stretch flex-col justify-center mx-0 my-[15px]">
                        <div className="text-xs">
                          When using Pick Up From Seller, our system is
                          unfortunately not able to record the delivery process.
                          This means (you) the buyer makes arrangement with the
                          seller to pick up your order. The risk involved in
                          getting your product is expressly yours and not of
                          Repeddle, any affiliate or Delivery companies offered
                          on Repeddle.
                        </div>
                      </div>
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
              type="submit"
              disabled={loadingGig}
              text="Continue"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryOptionScreen;
