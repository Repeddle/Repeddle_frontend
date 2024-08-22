import { Link } from "react-router-dom"

type Props = {
  src: string
  name: string
  setCurrentDot?: (val: string) => void
}

const Card = ({ name, src, setCurrentDot }: Props) => {
  return (
    <div className="w-full relative">
      <Link to="/outfits">
        <img
          className="w-full mb-[5px] border border-malon-color"
          src={src}
          alt="outfit"
        />
      </Link>
      <div>@{name}</div>
      <div
        className="absolute border bg-orange-color w-[35px] h-[35px] flex items-center justify-center text-[25px] font-light opacity-[6] cursor-pointer rounded-[50%] border-solid left-2/4 top-[100px]"
        onClick={() => (setCurrentDot ? setCurrentDot("1") : "")}
      >
        +
      </div>
      <div
        className="absolute border bg-orange-color w-[35px] h-[35px] flex items-center justify-center text-[25px] font-light opacity-[6] cursor-pointer rounded-[50%] border-solid left-2/4 top-[200px]"
        onClick={() => (setCurrentDot ? setCurrentDot("2") : "")}
      >
        +
      </div>
    </div>
  )
}

export default Card
