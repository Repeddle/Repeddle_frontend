import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { FaImage, FaQuestionCircle, FaTimes, FaVideo } from "react-icons/fa"
import CropImage from "../../components/cropImage/CropImage"
import Modal from "../../components/ui/Modal"
import LoadingBox from "../../components/LoadingBox"
import { resizeImage, uploadImage } from "../../utils/common"
import useToastNotification from "../../hooks/useToastNotification"

type InputProps = {
  image1: string
  image2: string
  image3: string
  image4: string
  video: string
  luxury: boolean
  luxuryImage: string
  vintage: boolean
}

type Props = {
  input: InputProps
  setInput: Dispatch<SetStateAction<InputProps>>
  video: string
  setVideo: (val: string) => void
}

const Media = ({ input, setInput, setVideo, video }: Props) => {
  const { addNotification } = useToastNotification()

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [loadingVideo, setLoadingVideo] = useState(false)
  const [showUploadingImage, setShowUploadingImage] = useState(false)
  const [invalidImage, setInvalidImage] = useState("")
  const [currentImage, setCurrentImage] = useState("")

  const [resizeImage1, setResizeImage] = useState<{
    file: File | null
    filepreview: string
  }>({
    file: null,
    filepreview: "",
  })

  useEffect(() => {
    const uploadImage = async () => {
      console.log("files", invalidImage, resizeImage1)

      if (!invalidImage && resizeImage1.filepreview && resizeImage1.file) {
        await uploadHandler(resizeImage1.file, "luxury")
        // setLuxuryImage(resizeImage1.filepreview);
      }
    }
    uploadImage()
  }, [resizeImage1])

  const handleOnChange = (text: string | boolean, input: keyof InputProps) => {
    setInput((prevState) => ({ ...prevState, [input]: text }))
  }

  const videouploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const maxSize = 8 * 1024 * 1024 // 8MB

    if (!file) return

    // Check if the file size exceeds the maximum allowed size
    if (file.size > maxSize) {
      // Show an error message or perform any necessary action
      addNotification("Request Failed: Video shouldn't be more than 8mb")
      return
    }

    console.log(setVideo, setLoadingVideo)

    // TODO: video upload route
  }

  const uploadHandler = async (file: File, fileType: string) => {
    setLoadingUpload(true)
    try {
      const res = await uploadImage(file)
      handleOnChange(res, fileType as keyof InputProps)
    } catch (error) {
      addNotification(error as string)
    }

    setLoadingUpload(false)
  }

  const handleLuxury = async (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.length &&
      resizeImage([e.target.files[0]], setInvalidImage, setResizeImage)
  }

  const removeVideo = () => {}

  return (
    <div className="flex flex-col gap-3 ">
      <label className="flex items-center">
        Image{" "}
        <div
          data-content="You will need to add aleast one image and a max of four images.Add clear and quality images. Ensure to follow the image uplaod rules. If image size appears to be too large, you can simply crop the image on your phone and try again. This should reduce the size of the image you're trying upload."
          className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
            hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
            lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
            hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
        >
          <FaQuestionCircle className="text-black dark:text-white ml-2.5" />
        </div>
      </label>
      <div className="flex gap-[5px]">
        <div className="flex-1 w-full h-[150px] border rounded-[0.2rem] border-dashed border-light-ev4 dark:border-dark-ev4">
          {input.image1 ? (
            <div className="w-full h-full relative">
              <div
                className="flex justify-center items-center h-[30px] w-[30px] absolute rounded-[50%] right-0 top-0"
                onClick={() => handleOnChange("", "image1")}
              >
                <FaTimes />
              </div>
              <img
                className="w-full h-full object-cover object-top rounded-[0.2rem]"
                src={input.image1}
                alt="product image"
              />
            </div>
          ) : (
            <label
              className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-xs"
              onClick={() => {
                setCurrentImage("image1")
                setShowUploadingImage(true)
              }}
            >
              {loadingUpload ? (
                <LoadingBox></LoadingBox>
              ) : (
                <>
                  <FaImage />
                  <div>
                    Click to Browse <span>Image</span>
                  </div>
                </>
              )}
            </label>
          )}
        </div>
        <div className="flex-1 w-full h-[150px] border rounded-[0.2rem] border-dashed border-light-ev4 dark:border-dark-ev4">
          {input.image2 ? (
            <div className="w-full h-full relative">
              <div
                className="flex justify-center items-center h-[30px] w-[30px] absolute rounded-[50%] right-0 top-0"
                onClick={() => handleOnChange("", "image2")}
              >
                <FaTimes />
              </div>
              <img
                className="w-full h-full object-cover object-top rounded-[0.2rem]"
                src={input.image2}
                alt="product image"
              />
            </div>
          ) : (
            <label
              className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-xs"
              onClick={() => {
                setCurrentImage("image2")
                setShowUploadingImage(true)
              }}
            >
              {loadingUpload ? (
                <LoadingBox></LoadingBox>
              ) : (
                <>
                  <FaImage />
                  <div>
                    Click to Browse <span>Image</span>
                  </div>
                </>
              )}
            </label>
          )}
        </div>
        <div className="flex-1 gap-[5px] flex flex-col">
          <div className="h-[72.5px] border rounded-[0.2rem] border-dashed border-light-ev4 dark:border-dark-ev4">
            {input.image3 ? (
              <div className="w-full h-full relative">
                <div
                  className="flex justify-center items-center h-[30px] w-[30px] absolute rounded-[50%] right-0 top-0"
                  onClick={() => handleOnChange("", "image3")}
                >
                  <FaTimes />
                </div>
                <img
                  className="w-full h-full object-top object-cover rounded-[0.2rem]"
                  src={input.image3}
                  alt="product image"
                />
              </div>
            ) : (
              <label
                className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-xs"
                onClick={() => {
                  setCurrentImage("image3")
                  setShowUploadingImage(true)
                }}
              >
                {loadingUpload ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <>
                    <FaImage />
                    <div>
                      Click to Browse <span>Image</span>
                    </div>
                  </>
                )}
              </label>
            )}
          </div>
          <div className="h-[72.5px] border rounded-[0.2rem] border-dashed border-light-ev4 dark:border-dark-ev4">
            {input.image4 ? (
              <div className="w-full h-full relative">
                <div
                  className="flex justify-center items-center h-[30px] w-[30px] absolute rounded-[50%] right-0 top-0"
                  onClick={() => handleOnChange("", "image4")}
                >
                  <FaTimes />
                </div>
                <img
                  className="w-full h-full object-top object-cover rounded-[0.2rem]"
                  src={input.image4}
                  alt="product image"
                />
              </div>
            ) : (
              <label
                className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-xs"
                onClick={() => {
                  setCurrentImage("image4")
                  setShowUploadingImage(true)
                }}
              >
                {loadingUpload ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <>
                    <FaImage />
                    <div>
                      Click to Browse <span>Image</span>
                    </div>
                  </>
                )}
              </label>
            )}

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
          </div>
        </div>
      </div>
      {loadingVideo ? (
        <LoadingBox />
      ) : video ? (
        <div className="flex justify-center items-center">
          <FaVideo className="mr-5" />
          <span>Video Uploaded</span>
          <FaTimes className="ml-5" onClick={removeVideo} />
        </div>
      ) : (
        <label
          htmlFor="video"
          className="block cursor-pointer text-orange-color text-clip font-bold uppercase"
        >
          Add a short video
        </label>
      )}
      <span className="w-auto lg:w-[70%] text-sm leading-[1.2]">
        <span className="text-malon-color">
          Please note: Make sure the image you're uploaing is in portrait format
          and not landscape. Image/Video size should be less than 8MB.
        </span>
      </span>
      <input
        type="file"
        onChange={(e) => {
          videouploadHandler(e)
          // setShowUploadingVideo(true);
        }}
        id="video"
        className="hidden"
      />
      <div className="flex gap-[5px]">
        <div className="flex-1 w-[150px]">
          <div className="flex items-center w-full ml-0 mr-5 mt-4 mb-0">
            <label className="mr-[10px] flex items-center gap-2.5 font-semibold">
              Luxury
              <div
                data-content="Product that is a well-known luxury brand. Please kindly select this box only if your goods are Luxury product."
                className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                    hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                    lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                    hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
              >
                <FaQuestionCircle />
              </div>
            </label>

            <input
              className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                  after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                  checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                  checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                  after:bg-white dark:after:bg-black p-[5px]`}
              type="checkbox"
              checked={input.luxury}
              onChange={(e) => handleOnChange(e.target.checked, "luxury")}
            />
          </div>
          <div className="flex items-center w-full ml-0 mr-5 mt-4 mb-0">
            <label className="flex items-center gap-2.5 mr-[10px] font-semibold">
              Vintage
              <div
                data-content="Product that is at least 15 years old. Please kindly select this box only if your goods are Vintage product."
                className={`relative lg:hover:after:w-[400px] hover:after:absolute lg:hover:after:left-[30px] hover:after:text-justify 
                    hover:after:text-sm hover:after:z-[2] hover:after:leading-[1.2] hover:after:font-normal hover:after:p-2.5 hover:after:rounded-lg
                    lg:hover:after:top-0 hover:after:text-[11px] hover:after:left-[-30px] hover:after:w-[200px] hover:after:top-5 hover:after:bg-black
                    hover:after:dark:bg-white hover:after:text-white dark:hover:after:text-black hover:after:content-[attr(data-content)]`}
              >
                <FaQuestionCircle />
              </div>
            </label>

            <input
              className={`w-auto m-0 after:w-[15px] after:h-[15px] after:content-[""] after:inline-block after:visible after:relative after:border
                  after:border-orange-color after:rounded-[15px] after:-left-px after:-top-0.5 checked:after:w-[15px] checked:after:h-[15px]
                  checked:after:content-[""] checked:after:inline-block checked:after:visible checked:after:relative checked:after:bg-orange-color
                  checked:after:border checked:after:border-orange-color checked:after:rounded-[15px] checked:after:-left-px checked:after:-top-0.5
                  after:bg-white dark:after:bg-black p-[5px]`}
              checked={input.vintage}
              type="checkbox"
              onChange={(e) => handleOnChange(e.target.checked, "vintage")}
            />
          </div>
        </div>
        {input.vintage || input.luxury ? (
          <div className="flex-1">
            <div className="flex-1 w-full h-[150px] border rounded-[0.2rem] border-dashed border-light-ev4 dark:border-dark-ev4">
              {input.luxuryImage ? (
                <div className="relative h-full w-full">
                  <div
                    className="flex justify-center items-center h-[30px] w-[30px] absolute rounded-[50%] right-0 top-0"
                    onClick={() => handleOnChange("", "luxury")}
                  >
                    <FaTimes />
                  </div>
                  <img
                    className="w-full h-full object-cover object-top rounded-[0.2rem]"
                    src={input.luxuryImage}
                    alt="product image"
                  />
                </div>
              ) : (
                <label
                  className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-xs"
                  htmlFor="image1"
                >
                  {loadingUpload ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      <FaImage />
                      <div>“Certificate, invoice, serial number”</div>
                      <input
                        className="hidden"
                        type="file"
                        id="image1"
                        onChange={handleLuxury}
                      />
                      {invalidImage && (
                        <div className="text-[red] text-xs">{invalidImage}</div>
                      )}
                    </>
                  )}
                </label>
              )}
            </div>
            <span className="w-auto lg:w-[70%] text-sm leading-[1.2]">
              This information is mandatory for luxury brands. This information
              will not be publicly displayed. Only use this option if you select
              any of the above, “Vintage or luxury Product”
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Media
