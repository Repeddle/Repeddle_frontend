type Props = {
  tips: string
  classNames?: string
}

const IconsTooltips = ({ tips, classNames }: Props) => {
  return (
    <div className="relative">
      <div
        className={`absolute opacity-0 transition-all duration-[1s] bottom-[-30px] z-[9] bg-white 
      text-black text-[13px] whitespace-nowrap p-[5px] rounded-[10px] before:content-[''] 
      before:absolute before:top-[-5px] before:w-2.5 before:h-2.5 before:rotate-45 before:left-2.5 
      before:bg:white ${classNames ? classNames : ""}`}
      >
        {tips}
      </div>
    </div>
  )
}

export default IconsTooltips
