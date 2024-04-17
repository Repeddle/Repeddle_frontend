import { user } from "../../utils/data"
import SellerLeft from "../../section/seller/SellerLeft"
import SellerRight from "../../section/seller/SellerRight"

const Seller = () => {
  const loadingUser = false
  const loading = false
  const error = null

  return (
    <div className="flex lg:mx-[1vw] lg:my-0 lg:flex-row flex-col mx-2.5 my-[30px]">
      <SellerLeft loadingUser={loadingUser} error={error} user={user} />

      <SellerRight user={user} loading={loading} error={error} />
    </div>
  )
}

export default Seller
