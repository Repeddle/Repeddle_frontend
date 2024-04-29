import { FaArrowLeftLong } from "react-icons/fa6"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import LoadingPage from "../../../components/ui/LoadingPage"
import useAuth from "../../../hooks/useAuth"
import useToastNotification from "../../../hooks/useToastNotification"
import { useEffect, useMemo, useState } from "react"
import ProfileForm from "../../../section/auth/ProfileForm"

function Verify() {
  const navigate = useNavigate()
  const { loading, error, verifyEmail } = useAuth()
  const { addNotification } = useToastNotification()

  const [searchParam] = useSearchParams()
  const token = useMemo(() => searchParam.get("token"), [searchParam])

  const [tokenValidated, setTokenValidated] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        const val = await verifyEmail({ token })
        if (val) {
          setTokenValidated(true)
        } else {
          addNotification(error ?? "An error occurred")
        }
      }
    }
    if (!tokenValidated) {
      verifyToken()
    }
  }, [addNotification, error, token, tokenValidated, verifyEmail])

  return (
    <>
      {!tokenValidated && loading && <LoadingPage />}

      {tokenValidated && (
        <div className="flex relative flex-col lg:flex-row bg-white-color dark:bg-black-color h-screen">
          <div className="absolute flex inset-x-0 top-8 px-6 sm:px-14 sm:top-8 justify-between items-center">
            <FaArrowLeftLong
              onClick={() => navigate(-1)}
              className="text-black lg:text-white text-base lg:text-xl cursor-pointer"
            />
            <Link to={"/"} className="h-8 sm:h-10 cursor-pointer">
              <img src="/images/logo/logo.png" alt="logo" className="h-full" />
            </Link>
          </div>
          <div className="flex-1 overflow-x-hidden">
            <img
              src="/images/auth/pexels-kseniachernaya-3965548.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="flex-[3] lg:flex-1 p-4 lg:p-8">
            {token && <ProfileForm token={token} />}
          </div>
        </div>
      )}
    </>
  )
}

export default Verify
