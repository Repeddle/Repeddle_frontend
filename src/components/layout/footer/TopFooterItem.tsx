import { useState } from "react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"

type Props = {
  heading: string
  content: string
  linkText?: string
  linkHref?: string
  Icon: IconType
}

const TopFooterItem = ({
  content,
  heading,
  linkHref,
  linkText,
  Icon,
}: Props) => {
  const [showMethod, setShowMethod] = useState(false)
  return (
    <div className="w-full">
      <div>
        <Icon className="text-orange-color hidden lg:block text-[55px] mb-[15px]" />
        <div
          className={`flex text-[15px] lg:hidden font-bold items-center capitalize relative cursor-pointer mx-0 my-[5px] 
          before:content-["_"] before:w-2.5 before:h-2.5 before:-translate-y-2/4 before:absolute before:border-b
           before:border-solid before:border-l before:right-5 before:top-2/4 ${
             showMethod ? "before:rotate-[-45deg]" : "before:rotate-[135deg]"
           }`}
          onClick={() => setShowMethod(!showMethod)}
        >
          <Icon className="w-10 text-xl text-orange-color mr-2.5 mb-0" />
          {heading}
        </div>

        <div
          className={`lg:hidden relative overflow-hidden transition-[0.5s] block text-sm mb-[15px] lg:mb-0 lg:text-base 
      ${showMethod ? "h-auto" : "h-0"}
        }`}
        >
          {content}{" "}
          {linkHref && linkText && (
            <Link to={linkHref} className="text-orange-color">
              {linkText}
            </Link>
          )}
        </div>

        <h6 className="text-2xl font-semibold mb-2.5 hidden lg:block">
          {heading}
        </h6>

        <p className="hidden lg:block text-base mb-4 mt-0">
          {content}{" "}
          {linkHref && linkText && (
            <Link to={linkHref} className="text-orange-color">
              {linkText}
            </Link>
          )}
        </p>
      </div>
    </div>
  )
}

export default TopFooterItem
