import CategoriesLinksButtons from "../../../components/CategoriesLinksButtons"
import TheThrill from "../../../components/TheThrill"
import { IProduct } from "../../../types/product"
import { Helmet } from "react-helmet-async"
import HomeCarousel from "./HomeCarousel"
import NewCollection from "./NewCollection"
import Brands from "./Brands"
import TopSellers from "./TopSellers"
import NewDeals from "./NewDeals"
import Wears from "./Wears"
import Discount from "./Discount"
import MobileApp from "./MobileApp"
import Influencers from "./Influencers"

function Home() {
  const products: IProduct[] = []
  const sellers: any[] = []
  const loadingUser = false
  const error = undefined

  return (
    <div>
      <Helmet>
        <title>Repeddle</title>
      </Helmet>

      <div>
        <HomeCarousel />

        <CategoriesLinksButtons />

        <TheThrill />

        <NewCollection />

        <Wears />

        <Brands />

        <NewDeals products={products} />

        <MobileApp />

        <Influencers />

        <Discount />

        <TopSellers loadingUser={loadingUser} sellers={sellers} error={error} />
      </div>
    </div>
  )
}

export default Home
