import { Link } from "react-router-dom"

type Props = {
  image: string
  title: string
  link: string
  bottom?: boolean
}

const CategoryListing = ({ bottom, image, link, title }: Props) => {
  return (
    <div className="snap-start h-60 relative mr-[15px]">
      <div className="h-60 relative w-60 rounded-[5px] bg-white">
        <img
          src={image}
          className={`h-full object-cover object-top w-full rounded-[5px] ${
            bottom ? "object-cover object-bottom" : ""
          }`}
          alt="img"
        />
        <Link to={link}>
          <p className="border bg-white hover:bg-malon-color hover:text-white border-malon-color text-malon-color cursor-pointer flex justify-center absolute capitalize w-[170px] rounded-[5px] border-solid right-0 bottom-0">
            {title}
          </p>
        </Link>
      </div>
    </div>
  )
}

export default CategoryListing
