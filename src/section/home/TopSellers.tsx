import LoadingBox from "../../components/LoadingBox"
import MessageBox from "../../components/MessageBox"
import { Link } from "react-router-dom"
import { TopSellers as TopSellersType } from "../../types/user"
import useUser from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { imageUrl } from "../../services/api"

const TopSellers = () => {
  const { getTopSellers } = useUser()

  const [sellers, setSellers] = useState<TopSellersType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const getSeller = async () => {
      setLoading(true)
      const sellers = await getTopSellers()
      if (typeof sellers !== "string") setSellers(sellers.sellers)
      else setError(sellers)

      setLoading(false)
    }
    getSeller()
  }, [])

  return (
    <section id="top_seller_carousel">
      <div>
        <h2
          className={`lg:text-[50px] leading-[1.2] relative capitalize text-3xl lg:mb-5 mb-2.5 px-[5vw] py-0
    after:bg-orange-color after:content-[""] after:h-0.5 after:absolute after:w-[70px] after:left-[10vw] after:-bottom-1`}
        >
          Top Sellers
        </h2>
      </div>
      <div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <>
            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
            <div className="flex overflow-x-auto scroll-smooth mx-[5vw] my-0 scrollbar-hide scroll_snap">
              {sellers &&
                sellers.length > 0 &&
                sellers.map((seller, index) => (
                  <Link to={`/seller/${seller.username}`} key={index}>
                    <div className="items-center flex flex-col mr-[30px]">
                      <div className="relative lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[100px] h-[100px]">
                        <img
                          src={imageUrl + seller.image}
                          alt={seller.username}
                          className="h-full w-full object-cover object-top rounded-[50%]"
                        />

                        {seller.badge && (
                          <div className="seller_profile_badge">
                            <img
                              className="w-5 object-cover"
                              src="https://res.cloudinary.com/emirace/image/upload/v1661148671/Icons-28_hfzerc.png"
                            />
                          </div>
                        )}
                      </div>
                      <p className="mt-0 mb-4">@{seller.username}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default TopSellers
