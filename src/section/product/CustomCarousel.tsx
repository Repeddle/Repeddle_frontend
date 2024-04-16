import React, { PropsWithChildren, TouchEvent, useMemo, useState } from "react"

type Props = PropsWithChildren

const CustomCarousel = ({ children }: Props) => {
  const [currSlide, setCurrSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const totalSlides = useMemo(() => React.Children.count(children), [children])

  const handleSlideClick = (index: number) => {
    setCurrSlide(index)
  }

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50 && currSlide < totalSlides - 1) {
      setCurrSlide(currSlide + 1)
    }

    if (touchStart - touchEnd < -50 && currSlide > 0) {
      setCurrSlide(currSlide - 1)
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex transition-transform duration-[1s]`}
        style={{ transform: `translateX(-${currSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child, i) => (
          <div
            className="shrink-0 w-full"
            key={i}
            onClick={() => handleSlideClick(i)}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalSlides }, (_, i) => (
          <div
            className={`w-2.5 h-2.5 cursor-pointer mr-2 rounded-[50%] ${
              currSlide === i ? "bg-orange-color" : "bg-[#ccc]"
            }`}
            key={i}
            onClick={() => handleSlideClick(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default CustomCarousel
