import { FaUpload } from "react-icons/fa"
import LoadingBox from "../../components/LoadingBox"
import Modal from "../../components/ui/Modal"
import CropImage from "../../components/cropImage/CropImage"
import MessageImage from "../../components/ui/MessageImage"
import useAuth from "../../hooks/useAuth"
import useToastNotification from "../../hooks/useToastNotification"
import { IProduct } from "../../types/product"
import { uploadImage } from "../../utils/common"
import { useState } from "react"
import { imageUrl } from "../../services/api"

type Props = {
  product: IProduct
  validationError: { [key: string]: string }
  currentImage: string
  showUploadingImage: boolean
  setShowUploadingImage: (val: boolean) => void
  setCurrentImage: (val: string) => void
  images: string[]
  setImages: (val: string[]) => void
}

const ImageUploadEditProduct = ({
  validationError,
  setShowUploadingImage,
  showUploadingImage,
  currentImage,
  product,
  images,
  setImages,
  setCurrentImage,
}: Props) => {
  const { user } = useAuth()
  const { addNotification } = useToastNotification()

  const [loadingUpload, setLoadingUpload] = useState(false)

  const uploadHandler = async (file: File, url: string) => {
    setLoadingUpload(true)
    try {
      const res = await uploadImage(file)
      if (url) {
        setImages(images.map((val) => (val === url ? res : val)))
      } else setImages([...images, res])
    } catch (error) {
      addNotification(error as string, undefined, true)
    }

    setLoadingUpload(false)
  }

  return (
    <div>
      <div className="flex items-center mt-[15px]">
        {!loadingUpload ? (
          <img
            className="w-[100px] h-[100px] object-cover object-top mr-5 rounded-[10px]"
            src={imageUrl + currentImage}
            alt=""
          />
        ) : (
          <LoadingBox />
        )}

        <label
          className="text-sm mt-[15px] mb-2.5"
          onClick={() => setShowUploadingImage(true)}
        >
          <FaUpload />
        </label>
      </div>
      <Modal
        onClose={() => setShowUploadingImage(false)}
        isOpen={showUploadingImage}
        size="lg"
      >
        <CropImage
          currentImage={currentImage}
          uploadHandler={uploadHandler}
          setShowModel={setShowUploadingImage}
        />
      </Modal>
      <div className="flex">
        {product.images.map((img, i) => (
          <div
            key={i}
            className="w-5 h-5 flex justify-center items-center cursor-pointer ml-0 mr-[7px] mt-2.5 mb-0 p-[5px] rounded-[0.2rem] bg-light-ev3 dark:bg-dark-ev3"
            onClick={() => setCurrentImage(img)}
          >
            {i + 1}
          </div>
        ))}
      </div>
      {validationError.image && (
        <div className="text-[red] text-xs">{validationError.image}</div>
      )}
      {user?.role === "Admin" ? (
        (product.luxury || product.vintage) && product.luxuryImage ? (
          <MessageImage url={product.luxuryImage} />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  )
}

export default ImageUploadEditProduct
