import useAuth from "../../hooks/useAuth"
import ProductItem from "../../components/ProductItem"
import { Link } from "react-router-dom"
import MessageBox from "../../components/MessageBox"
import LoadingBox from "../../components/LoadingBox"
import { FaCirclePlus } from "react-icons/fa6"
import { UserByUsername } from "../../types/user"

const tabs = ["all", "selling", "sold", "liked"] as const
type DisplayTab = (typeof tabs)[number] | "saved"

type Props = {
  displayTab: DisplayTab
  loading: boolean
  error?: string | null
  user?: UserByUsername["products"]
}

const SellerTabItems = ({ displayTab, loading, error, user }: Props) => {
  const { user: userInfo } = useAuth()

  return (
    <div className="grid grid-cols-[repeat(2,1fr)] bg-light-ev1 dark:bg-dark-ev1 p-0 lg:grid-cols-[repeat(4,1fr)] gap-2 lg:p-2.5 rounded-[0.2rem]">
      {displayTab === "all" && userInfo && (
        <div className="relative flex justify-center w-[162px] h-[342px] mx-[3px] my-[5px] lg:w-auto lg:h-auto lg:m-0">
          <Link to={userInfo.role === "seller" ? "/newproduct" : "/sell"}>
            <div
              className={`flex lg:w-60 lg:h-[500px] cursor-pointer justify-center items-center flex-col rounded-[0.2rem]
              w-[162px] h-[342px] mx-[3px] my-[5px] lg:m-0 bg-light-ev2 dark:bg-dark-ev2 hover:bg-light-ev4 dark:hover:bg-dark-ev4`}
            >
              <FaCirclePlus className="text-orange-color text-[50px] mb-[5px]" />
              <span>Add Product</span>
            </div>
          </Link>
        </div>
      )}
      {loading && <LoadingBox />}

      {!loading && error && (
        <MessageBox className="text-red-500">{error}</MessageBox>
      )}

      {!loading && !error && (
        <>
          {displayTab === "all" && (
            <>
              {user?.all.length === 0 ? (
                <MessageBox>No Product Found</MessageBox>
              ) : (
                user?.all.map((product) => (
                  <div
                    className="relative flex justify-center w-[162px] h-[342px] mx-[3px] my-[5px] lg:w-auto lg:h-auto m-0"
                    key={product._id}
                  >
                    <ProductItem product={product} />
                  </div>
                ))
              )}
            </>
          )}

          {displayTab === "selling" && (
            <>
              {user?.selling.length === 0 ? (
                <MessageBox>No Product Found</MessageBox>
              ) : (
                user?.selling.map(
                  (product) =>
                    product.countInStock > 0 && (
                      <div
                        className="relative flex justify-center w-[162px] h-[342px] mx-[3px] my-[5px] lg:w-auto lg:h-auto m-0"
                        key={product._id}
                      >
                        <ProductItem product={product} />
                      </div>
                    )
                )
              )}
            </>
          )}

          {displayTab === "sold" && (
            <>
              {user?.sold.length === 0 ? (
                <MessageBox>No Product Found</MessageBox>
              ) : (
                user?.sold.map(
                  (product) =>
                    product.sold && (
                      <div
                        className="relative flex justify-center w-[162px] h-[342px] mx-[3px] my-[5px] lg:w-auto lg:h-auto m-0"
                        key={product._id}
                      >
                        <div className="absolute">
                          <ProductItem product={product} />
                          {product.sold && (
                            <Link to={`/product/${product.slug}`}>
                              <div className="overlay">
                                <div className="absolute translate-x-2/4 -translate-y-2/4 text-2xl font-bold text-orange-color right-2/4 top-2/4">
                                  SOLD
                                </div>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    )
                )
              )}
            </>
          )}

          {displayTab === "liked" && (
            <>
              {user?.liked.length === 0 ? (
                <MessageBox>No Product Found</MessageBox>
              ) : (
                user?.liked.map((product) => (
                  <div
                    className="relative flex justify-center w-[162px] h-[342px] mx-[3px] my-[5px] lg:w-auto lg:h-auto m-0"
                    key={product._id}
                  >
                    <ProductItem product={product} />
                  </div>
                ))
              )}
            </>
          )}

          {displayTab === "saved" && (
            <>
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox className="text-red-500">{error}</MessageBox>
              ) : user?.liked.length === 0 ? (
                <MessageBox>No Product Found</MessageBox>
              ) : (
                user?.liked.map((product) => (
                  <div
                    className="relative flex justify-center w-[162px] h-[342px] mx-[3px] my-[5px] lg:w-auto lg:h-auto m-0"
                    key={product._id}
                  >
                    <ProductItem product={product} />
                  </div>
                ))
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default SellerTabItems
