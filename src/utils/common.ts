export const region = () => {
  const add =
    window.location.hostname === "www.repeddle.co.za" ||
    window.location.hostname === "repeddle.co.za"
      ? "ZAR"
      : "NGN"
  return add
}

export const daydiff = (start: Date | string, end: number) => {
  if (!start) return 0
  const startNum = timeDifference(new window.Date(start), new window.Date())
  console.log("startNum", start, end - startNum)
  return end - startNum
}

export function timeDifference(date1: Date, date2: Date) {
  console.log(date1, date2)
  const Difference_In_Time = date2.getTime() - date1.getTime()
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
  return Math.floor(Difference_In_Days)
}

export const deliveryNumber = (status: string) => {
  const deliveryStatusMap = {
    Processing: 1,
    Dispatched: 2,
    "In Transit": 3,
    Delivered: 4,
    Received: 5,
    "Return Logged": 6,
    "Return Approved": 8,
    "Return Declined": 7,
    "Return Dispatched": 9,
    "Return Delivered": 10,
    "Return Received": 11,
    Refunded: 12,
    "Payment to Seller Initiated": 13,
  } as const

  return deliveryStatusMap[status as keyof typeof deliveryStatusMap] ?? 0
}

export function getMonday(d: Date) {
  d = new Date(d)
  const day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1) // adjust when day is sunday
  return new Date(d.setDate(diff))
}
