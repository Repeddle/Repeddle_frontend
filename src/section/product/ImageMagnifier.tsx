import { MouseEvent, useRef, useState } from "react"

type Props = {
  src: string
  alt?: string
  zoom?: number
  className?: string
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const ImageMagnifier = ({
  src,
  alt = "",
  zoom = 2.5,
  className = "",
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [isZooming, setIsZooming] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 0, height: 0 })

  const measure = () => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setSize({ width: rect.width, height: rect.height })
  }

  const handleMouseEnter = () => {
    measure()
    setIsZooming(true)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const lensWidth = size.width / zoom
  const lensHeight = size.height / zoom

  // Keep the lens fully inside the image so the panel never shows dead space
  const lensLeft = clamp(cursor.x - lensWidth / 2, 0, size.width - lensWidth)
  const lensTop = clamp(cursor.y - lensHeight / 2, 0, size.height - lensHeight)

  const showZoom = isZooming && size.width > 0

  return (
    <div
      ref={containerRef}
      className={`relative inline-block w-full cursor-crosshair ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsZooming(false)}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        onLoad={measure}
        className="w-full object-contain select-none"
      />

      {showZoom && (
        <>
          <div
            className="absolute pointer-events-none border-2 border-orange-color bg-white/30"
            style={{
              left: lensLeft,
              top: lensTop,
              width: lensWidth,
              height: lensHeight,
            }}
          />

          {/* The panel matches the image box exactly, so the zoom math stays 1:1 */}
          <div
            className="absolute top-0 left-full ml-5 z-20 pointer-events-none overflow-hidden bg-light-ev1 dark:bg-dark-ev1 border border-light-ev4 dark:border-dark-ev4"
            style={{
              width: size.width,
              height: size.height,
              backgroundImage: `url('${src}')`,
              backgroundSize: `${size.width * zoom}px ${size.height * zoom}px`,
              backgroundPosition: `-${lensLeft * zoom}px -${lensTop * zoom}px`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </>
      )}
    </div>
  )
}

export default ImageMagnifier
