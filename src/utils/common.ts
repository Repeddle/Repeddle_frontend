import { saveImageService } from "../services/image";
import { IProduct } from "../types/product";

export const region = () => {
  const add =
    window.location.hostname === "www.repeddle.co.za" ||
    window.location.hostname === "repeddle.co.za"
      ? "ZAR"
      : "NGN";
  return add;
};

export const currency = (region: IProduct["region"]) => {
  if (region === "NGN") return "₦";
  return "R";
};

export const daydiff = (start: Date | string | number, end: number) => {
  if (!start) return 0;
  const startNum = timeDifference(new window.Date(start), new window.Date());
  console.log("startNum", start, end - startNum);
  return end - startNum;
};

export function timeDifference(date1: Date, date2: Date) {
  console.log(date1, date2);
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Math.floor(Difference_In_Days);
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
  } as const;

  return deliveryStatusMap[status as keyof typeof deliveryStatusMap] ?? 0;
};

export function getMonday(d: Date) {
  d = new Date(d);
  const day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export const compressImageUpload = async (
  file: File,
  maxSize: number,
  image = ""
) => {
  // Create an HTMLImageElement to get the original dimensions of the image

  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise((resolve, reject) => {
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(null);
    };
    img.onerror = reject;
  });
  const { width, height } = img;

  // Resize the image if necessary
  if (width > maxSize || height > maxSize) {
    const aspectRatio = width / height;
    let newWidth, newHeight;
    if (aspectRatio >= 1) {
      newWidth = maxSize;
      newHeight = maxSize / aspectRatio;
    } else {
      newHeight = maxSize;
      newWidth = maxSize * aspectRatio;
    }
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No canvas found");
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    const resizedBlob: BlobPart = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob !== null) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert canvas to blob"));
          }
        },
        file.type,
        0.9
      );
    });

    file = new File([resizedBlob], file.name, { type: file.type });
  }

  // Upload the resized image using axios
  const formData = new FormData();
  formData.append("image", file);
  image && formData.append("deleteImage", image);

  try {
    const url = await saveImageService(formData);
    return url;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error(error as any);
  }
};

export const resizeImage = (
  files: File[],
  setinvalidImage: (val: string) => void,
  setuserInfo: (val: { file: File | null; filepreview: string }) => void
) => {
  const reader = new FileReader();
  const imageFile = files[0];
  const imageFilname = files[0].name;

  if (!imageFile) {
    setinvalidImage("Please select image.");
    return false;
  }

  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      //------------- Resize img code ----------------------------------
      const canvas = document.createElement("canvas");

      const MAX_WIDTH = 1000;
      const MAX_HEIGHT = 1000;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0, width, height);
      ctx!.canvas.toBlob(
        (blob) => {
          const file = new File([blob!], imageFilname, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          setuserInfo({
            file: file,
            filepreview: URL.createObjectURL(imageFile),
          });
          console.log(file);
        },
        "image/jpeg",
        1
      );
      setinvalidImage("");
    };
    img.onerror = () => {
      setinvalidImage("Invalid image content.");
      return false;
    };
    //debugger
    img.src = e.target!.result as string;
  };
  reader.readAsDataURL(imageFile);
};
