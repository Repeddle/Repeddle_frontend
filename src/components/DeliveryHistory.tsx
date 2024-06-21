import { FaCheck } from "react-icons/fa"

type Props = {
  status: number
}

const DeliveryHistory = ({ status }: Props) => {
  return (
    <div className="flex pb-[30px]">
      <div className="flex flex-col lg:flex-row items-center">
        {status < 6 ? (
          <>
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 1 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Not yet Dispatched
              </div>
            </div>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 1 ? "bg-[green]" : ""
              }`}
            />
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 2 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 2 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Dispatch
              </div>
            </div>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 2 ? "bg-[green]" : ""
              }`}
            />
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 3 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 3 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                In Transit
              </div>
            </div>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 3 ? "bg-[green]" : ""
              }`}
            />
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 4 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 4 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Delivered
              </div>
            </div>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 4 ? "bg-[green]" : ""
              }`}
            />
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 5 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 5 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Received
              </div>
            </div>
          </>
        ) : status < 12 ? (
          <>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 6 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 6 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Return Logged
              </div>
            </div>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 6 ? "bg-[green]" : ""
              }`}
            />
            {status > 7 ? (
              <>
                <div
                  className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                    status >= 8 ? "bg-[green]" : ""
                  }`}
                />
                <div className="relative">
                  <div
                    className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                      status >= 8 ? "bg-[green]" : ""
                    }`}
                  >
                    <FaCheck color="white" className="-rotate-45" />
                  </div>
                  <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                    Return Approved
                  </div>
                </div>
                <div
                  className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                    status >= 8 ? "bg-[green]" : ""
                  }`}
                />
              </>
            ) : (
              <>
                <div
                  className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                    status >= 7 ? "bg-[green]" : ""
                  }`}
                />
                <div className="relative">
                  <div
                    className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                      status >= 7 ? "bg-[red]" : ""
                    }`}
                  >
                    <FaCheck color="white" className="-rotate-45" />
                  </div>
                  <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                    Return Declined
                  </div>
                </div>

                <div className="h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey]" />
              </>
            )}
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 9 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 9 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Return Dispatched
              </div>
            </div>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 9 ? "bg-[green]" : ""
              }`}
            />
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 10 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 10 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Return Delivered
              </div>
            </div>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 10 ? "bg-[green]" : ""
              }`}
            />
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 11 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 11 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Return Received
              </div>
            </div>
          </>
        ) : status > 12 ? (
          <>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 13 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 13 ? "bg-[green]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Pay Seller
              </div>
            </div>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 13 ? "bg-[green]" : ""
              }`}
            />
          </>
        ) : (
          <>
            <div
              className={`h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey] ${
                status >= 12 ? "bg-[green]" : ""
              }`}
            />
            <div className="relative">
              <div
                className={`w-[30px] h-[30px] rotate-45 flex items-center justify-center bg-[grey] ${
                  status >= 12 ? "bg-[red]" : ""
                }`}
              >
                <FaCheck color="white" className="-rotate-45" />
              </div>
              <div className="absolute -translate-x-2/4 text-center font-medium text-[13px] leading-[1em] lg:left-2/4 lg:top-[35px] left-[100px] top-0">
                Buyer Refund
              </div>
            </div>

            <div className="h-5 w-[5px] lg:w-[45px] lg:h-[5px] bg-[grey]" />
          </>
        )}
      </div>
    </div>
  )
}

export default DeliveryHistory
