import SellerLeft from "../../section/seller/SellerLeft"
import SellerRight from "../../section/seller/SellerRight"
import { useParams } from "react-router-dom"
import useUser from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { UserByUsername } from "../../types/user"
import LoadingLogoModal from "../../components/ui/loadin/LoadingLogoModal"
import useToastNotification from "../../hooks/useToastNotification"
import { IReview } from "../../types/product"

const Seller = () => {
  const params = useParams()
  const { slug } = params

  const [user, setUser] = useState<UserByUsername>()

  const { getUserByUsername, loading, error } = useUser()
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

  const addReview = (review: IReview) => {
    if (user) {
      const newUser: UserByUsername = { ...user }
      if (!newUser.user.reviews) newUser.user.reviews = [review]
      else newUser.user.reviews.push(review)

      setUser(newUser)
    }
  }

  return (
    <div className="flex lg:mx-[1vw] lg:my-0 lg:flex-row flex-col mx-2.5 my-[30px]">
      {loading && <LoadingLogoModal />}

      <>
        <SellerLeft
          addReview={addReview}
          loadingUser={loading}
          error={error}
          usernameData={user}
        />

        <SellerRight usernameData={user} loading={loading} error={error} />
      </>
    </div>
  )
}

export default Seller
