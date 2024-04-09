import { useState } from "react"
import { Link } from "react-router-dom"

type Props = {
  heading: string
  linkItems: { name: string; href: string }[]
}

const SmallFooterLinkItem = ({ heading, linkItems }: Props) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="flex-1">
      <div
        className={`text-[13px] uppercase tracking-[2px] leading-[1.83] mb-[15px] before:content-["_"]
        before:w-2.5 before:h-2.5 before:-translate-y-2/4 before:absolute before:border-b before:border-solid 
        before:border-l before:right-5 ${
          isOpen ? "before:-rotate-45" : "before:rotate-[135deg]"
        }`}
        onClick={() => setOpen(!isOpen)}
      >
        {heading}
      </div>
      {isOpen && (
        <ul className="ml-5 lg:ml-0">
          {linkItems.map((linkItem) => (
            <li
              className="text-sm w-auto mb-[15px] lg:w-6/12 lg:mb-[5px]"
              key={linkItem.name}
            >
              <Link to={linkItem.href}>{linkItem.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SmallFooterLinkItem
