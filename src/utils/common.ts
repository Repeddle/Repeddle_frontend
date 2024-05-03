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

export const compressImageUpload = async (file, maxSize, token, image = "") => {
  // Create an HTMLImageElement to get the original dimensions of the image
  const img = new Image()
  img.src = URL.createObjectURL(file)
  await new Promise((resolve, reject) => {
    img.onload = () => {
      URL.revokeObjectURL(img.src)
      resolve()
    }
    img.onerror = reject
  })
  const { width, height } = img

  // Resize the image if necessary
  if (width > maxSize || height > maxSize) {
    const aspectRatio = width / height
    let newWidth, newHeight
    if (aspectRatio >= 1) {
      newWidth = maxSize
      newHeight = maxSize / aspectRatio
    } else {
      newHeight = maxSize
      newWidth = maxSize * aspectRatio
    }
    const canvas = document.createElement("canvas")
    canvas.width = newWidth
    canvas.height = newHeight
    const ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0, newWidth, newHeight)
    const resizedBlob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob !== null) {
            resolve(blob)
          } else {
            reject(new Error("Failed to convert canvas to blob"))
          }
        },
        file.type,
        0.9
      )
    })

    file = new File([resizedBlob], file.name, { type: file.type })
  }

  // Upload the resized image using axios
  const formData = new FormData()
  formData.append("file", file)
  image && formData.append("deleteImage", image)
  try {
    const response = await axios.post("/api/upload", formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = response.data
    return data.secure_url
  } catch (error) {
    // Handle error if the request fails
    console.error("Error uploading image:", error)
    throw error
  }
}
