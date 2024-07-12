import { useState, useCallback, useEffect, ChangeEvent } from "react"

import Cropper, { Area } from "react-easy-crop"
import { getCroppedImg } from "./cropImage1"
import LoadingBox from "../LoadingBox"
import { getBackendErrorMessage } from "../../utils/error"
import { resizeImage } from "../../utils/common"

type Props = {
  setShowModel: (val: boolean) => void
  currentImage: string
  uploadHandler: (file: File, image: string) => Promise<void>
}

const CropImage = ({ uploadHandler, setShowModel, currentImage }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | Area>(null)
  const [imageSrc, setImageSrc] = useState("")

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const [invalidImage, setInvalidImage] = useState("")
  const [resizeImage1, setResizeImage] = useState<{
    file: File | null
    filepreview: string
  }>({
    file: null,
    filepreview: "",
  })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const uploadImage = async () => {
      try {
        if (!invalidImage && resizeImage1.filepreview && resizeImage1.file) {
          await uploadHandler(resizeImage1.file, currentImage)
          setLoading(false)
          setImageSrc("")
          setShowModel(false)
        }
      } catch (err) {
        console.log(getBackendErrorMessage(err))
        setLoading(false)
      }
    }
    uploadImage()
  }, [invalidImage, resizeImage1])

  const handleResize = async (e: File[]) => {
    resizeImage(e, setInvalidImage, setResizeImage)
  }

  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return

    setLoading(true)
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      handleResize([croppedImage as File])
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageDataUrl = (await readFile(file)) as string

      setImageSrc(imageDataUrl)
    }
  }

  function readFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener("load", () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="w-full h-[70vh] p-[30px]">
      <label
        className="text-malon-color border border-malon-color capitalize mx-0 my-[5px] px-[5px] py-[3px] rounded-[0.2rem]"
        htmlFor="inputButton"
      >
        Add an image
      </label>
      <div className="flex gap-5 items-center justify-center h-[90%] relative p-[5px]">
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={9 / 14}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
        <div>
          <input
            id="inputButton"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
      </div>
      <div className="flex justify-end items-end">
        {loading ? (
          <LoadingBox />
        ) : (
          <div
            className="text-white cursor-pointer bg-orange-color hover:bg-malon-color capitalize mx-0 my-[5px] px-[5px] py-[3px] rounded-[0.2rem]"
            onClick={showCroppedImage}
          >
            Done
          </div>
        )}
      </div>
    </div>
  )
}

export default CropImage
