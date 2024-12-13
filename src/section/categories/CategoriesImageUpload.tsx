import { ChangeEvent } from "react"
import LoadingBox from "../../components/LoadingBox"
import { imageUrl } from "../../services/api"

type Props = {
  imageUpload: {
    loading: boolean
    image: string
    error: string
  }
  uploadImageHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

const CategoriesImageUpload = ({ imageUpload, uploadImageHandler }: Props) => {
  return (
    <div className="flex flex-col mr-5 mt-2.5 p-2.5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2">
      <label className="text-sm font-semibold mb-2.5">Category Image</label>
      {imageUpload.loading ? (
        <LoadingBox />
      ) : imageUpload.error ? (
        <div className="text-[red]">{imageUpload.error}</div>
      ) : imageUpload.image ? (
        <img
          src={imageUrl + imageUpload.image}
          alt="imageupload"
          className="object-contain w-[200px] h-[200px]"
        />
      ) : (
        ""
      )}
      <input
        id="uploadimage"
        className="hidden"
        type="file"
        onChange={uploadImageHandler}
      />
      <label
        className="border border-malon-color text-sm cursor-pointer text-center mt-[5px] px-[5px] py-0.5 rounded-[0.2rem]"
        htmlFor="uploadimage"
      >
        Upload
      </label>
    </div>
  )
}

export default CategoriesImageUpload
