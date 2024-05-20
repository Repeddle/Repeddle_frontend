import SellerLeft from "../../section/seller/SellerLeft"
import SellerRight from "../../section/seller/SellerRight"
import { useParams } from "react-router-dom"
import useUser from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { IUser } from "../../types/user"
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal"
import useToastNotification from "../../hooks/useToastNotification"

const Seller = () => {
  const params = useParams()
  const { slug } = params

  const [user, setUser] = useState<IUser>()

  const { getUserByUsername, loading: loadingUser } = useUser()
  const { addNotification } = useToastNotification()

  useEffect(() => {
    const fetUser = async () => {
      if (slug) {
        const user = await getUserByUsername(slug)

        if (typeof user === "string") {
          return addNotification(user)
        }

        setUser(user)
      }
    }
    fetUser()
  }, [slug])

  const loading = false
  const error = null

  return (
    <div className="flex lg:mx-[1vw] lg:my-0 lg:flex-row flex-col mx-2.5 my-[30px]">
      {loadingUser && <LoadingLogoModal />}

      <>
        <SellerLeft loadingUser={loadingUser} error={error} user={user} />

        <SellerRight user={user} loading={loading} error={error} />
      </>
    </div>
  )
}

export default Seller
