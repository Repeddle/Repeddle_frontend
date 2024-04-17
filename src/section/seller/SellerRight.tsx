import { useMemo, useState } from "react"
import { productDetails } from "../../utils/data"
import { IProduct } from "../../types/product"
import useAuth from "../../hooks/useAuth"
import { Link, useSearchParams } from "react-router-dom"
import { IUser } from "../../types/user"
import SellerTabItems from "./SellerTabItems"

const tabs = ["all", "selling", "sold", "liked"] as const
type DisplayTabs = (typeof tabs)[number] | "saved"

type Props = {
  user: IUser
  loading: boolean
  error?: string | null
}

const SellerRight = ({ user, loading, error }: Props) => {
  const [displayTab, setDisplayTab] = useState<DisplayTabs>("all")

  const [searchParams] = useSearchParams()
  const page = useMemo(() => +(searchParams.get("page") ?? 1), [searchParams])

  const products: IProduct[] = [productDetails]
  const pages = 0

  const getFilterUrl = (filter: { page: number }) => {
    const filterPage = filter.page || page
    return `?page=${filterPage}`
  }

  const { user: userInfo } = useAuth()

  return (
    <div className="flex-[7] lg:mx-[15px] lg:my-0 m-0">
      <div className="flex justify-center mb-[5px] rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
        {tabs.map((tab) => (
          <div
            className={`flex justify-center cursor-pointer relative capitalize min-w-[70px] m-2.5 hover:text-orange-color ${
              displayTab === tab
                ? "text-orange-color font-bold after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:-bottom-2.5 after:bg-orange-color"
                : ""
            }`}
            key={tab}
            onClick={() => setDisplayTab(tab)}
          >
            {tab}
          </div>
        ))}
        {userInfo && userInfo._id === user._id && (
          <div
            className={`flex justify-center cursor-pointer relative capitalize min-w-[70px] m-2.5 hover:text-orange-color ${
              displayTab === "saved"
                ? "text-orange-color font-bold after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:-bottom-2.5 after:bg-orange-color"
                : ""
            }`}
            onClick={() => setDisplayTab("saved")}
          >
            Saved
          </div>
        )}
      </div>

      <SellerTabItems
        displayTab={displayTab}
        loading={loading}
        products={products}
        user={user}
        error={error}
      />

      <div className="flex gap-2.5 justify-center items-center mt-5">
        {page > 1 && (
          <Link to={getFilterUrl({ page: page - 1 })}>
            <div className="border w-[100px] text-center font-medium p-1 rounded-[0.2rem] hover:bg-light-ev3 dark:hover:bg-dark-ev2">
              Previous
            </div>
          </Link>
        )}
        {pages > 1 && products.length === 40 && (
          <Link to={getFilterUrl({ page: page + 1 })}>
            <div className="border w-[100px] text-center font-medium p-1 rounded-[0.2rem] hover:bg-light-ev3 dark:hover:bg-dark-ev2">
              Next
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default SellerRight
