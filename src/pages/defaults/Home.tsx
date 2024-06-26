import CategoriesLinksButtons from "../../components/CategoriesLinksButtons"
import TheThrill from "../../section/home/TheThrill"
import { Helmet } from "react-helmet-async"
import HomeCarousel from "../../section/home/HomeCarousel"
import NewCollection from "../../section/home/NewCollection"
import Brands from "../../section/home/Brands"
import TopSellers from "../../section/home/TopSellers"
import NewDeals from "../../section/home/NewDeals"
import Wears from "../../section/home/Wears"
import Discount from "../../section/home/Discount"
import MobileApp from "../../section/home/MobileApp"
import Influencers from "../../section/home/Influencers"
import RepeddleWorks from "../../section/home/RepeddleWorks"
import useProducts from "../../hooks/useProducts"
import { useEffect } from "react"

function Home() {
  const { products, fetchProducts } = useProducts()

  useEffect(() => {
    fetchProducts("order=newest")
  }, [])

  return (
    <div>
      <Helmet>
        <title>Repeddle</title>
      </Helmet>

      <div>
        <HomeCarousel />

        <CategoriesLinksButtons />

        <RepeddleWorks />

        <TheThrill />

        <NewCollection />

        <Wears />

        <Brands />

        <NewDeals products={products.products} />

        <MobileApp />

        <Influencers />

        <Discount />

        <TopSellers />
      </div>
    </div>
  )
}

export default Home
