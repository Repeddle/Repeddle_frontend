import { Link } from "react-router-dom"

type Props = {
  heading: string
  linkItems: { name: string; href: string }[]
}

const MainFooterLinkItems = ({ heading, linkItems }: Props) => {
  return (
    <div className="flex-1">
      <h3 className="text-base mb-2.5">{heading}</h3>
      <ul className="ml-5 lg:ml-0">
        {linkItems.map((linkItem) => (
          <li
            key={linkItem.name}
            className="text-sm w-auto mb-[15px] lg:w-6/12 lg:mb-[5px]"
          >
            <Link to={linkItem.href}>{linkItem.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MainFooterLinkItems
