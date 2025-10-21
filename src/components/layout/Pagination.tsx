import { useMemo } from "react"
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa"

type Props = {
  currentPage?: number
  totalPages?: number
  onPageChange?: (val: number) => void
}

const Pagination = ({
  onPageChange,
  currentPage = 1,
  totalPages = 1,
}: Props) => {
  const delta = 1

  const newPage = (val: number) => {
    onPageChange?.(val)
  }

  const pagination = useMemo(() => {
    const range = delta + 4 // use for handle visible number of links left side

    const render: (string | number)[] = []
    const renderTwoSide: (string | number)[] = []
    const dot = `...`
    let countTruncate = 0 // use for ellipsis - truncate left side or right side

    // use for truncate two side
    const numberTruncateLeft = currentPage - delta // -4
    const numberTruncateRight = currentPage + delta // 5

    for (let pos = 1; pos <= totalPages; pos++) {
      // total page 10
      // truncate
      if (totalPages >= 2 * range - 1) {
        if (
          numberTruncateLeft > 3 &&
          numberTruncateRight < totalPages - 3 + 1
        ) {
          // truncate 2 side
          if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
            renderTwoSide.push(pos)
          }
        } else {
          // truncate left side or right side
          if (
            (currentPage < range && pos <= range) ||
            (currentPage > totalPages - range &&
              pos >= totalPages - range + 1) ||
            pos === totalPages ||
            pos === 1
          ) {
            render.push(pos)
          } else {
            countTruncate++
            if (countTruncate === 1) render.push(dot)
          }
        }
      } else {
        // not truncate
        render.push(pos)
      }
    }

    if (renderTwoSide.length) {
      return [1, dot, ...renderTwoSide, totalPages]
    } else {
      return render
    }
  }, [currentPage, totalPages])

  return (
    <div className="flex mr-4">
      <div className="flex w-auto ml-auto items-center self-end justify-end bg-white dark:bg-black  mt-8 px-0 sm:px-[15px] py-2.5 rounded-[5px]">
        <button
          className="bg-transparent border-none hidden sm:block text-black disabled:text-[#aaadc7] dark:text-white px-3 py-1.5"
          disabled={currentPage === 1}
          onClick={() => newPage(1)}
        >
          <FaAngleDoubleLeft className="cursor-pointer text-lg" />
        </button>
        <button
          className="bg-transparent border-none text-black disabled:text-[#aaadc7] dark:text-white px-3 py-1.5"
          disabled={currentPage === 1}
          onClick={() => newPage(currentPage - 1)}
        >
          <FaAngleLeft className="cursor-pointer text-lg" />
        </button>
        <ul className="flex items-center">
          {pagination.map((pag) =>
            typeof pag !== "string" ? (
              <li
                key={pag}
                className={`cursor-pointer overflow-hidden mx-[1px] sm:mx-[3px] px-[13px] py-1.5 hover:bg-orange-color hover:text-white my-0 rounded-[5px] ${
                  currentPage === pag
                    ? "bg-orange-color text-white"
                    : "text-black dark:text-white"
                }`}
                onClick={() => newPage(pag)}
              >
                {pag}
              </li>
            ) : (
              <li
                key={pag}
                className={`overflow-hidden mx-[1px] sm:mx-[3px] px-[13px] text-black dark:text-white py-1.5 my-0 rounded-[5px]`}
              >
                {pag}
              </li>
            )
          )}
        </ul>
        <button
          className="bg-transparent border-none text-black disabled:text-[#aaadc7] dark:text-white px-3 py-1.5"
          disabled={currentPage === totalPages}
          onClick={() => newPage(currentPage + 1)}
        >
          <FaAngleRight className="text-lg" />
        </button>
        <button
          className="bg-transparent border-none hidden sm:block text-black disabled:text-[#aaadc7] dark:text-white px-3 py-1.5"
          disabled={currentPage === totalPages}
          onClick={() => newPage(totalPages)}
        >
          <FaAngleDoubleRight className="text-lg" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
