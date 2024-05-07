import { useParams } from "react-router-dom"
import LoadingPage from "../../../components/ui/LoadingPage"
import useAuth from "../../../hooks/useAuth"
import { useEffect, useState } from "react"
import ProfileForm from "../../../section/auth/ProfileForm"

function Verify() {
  const { error, verifyEmail } = useAuth()
  const [loading, setLoading] = useState(true)

  const { token } = useParams()

  const [tokenValidated, setTokenValidated] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true)
      if (token) {
        const val = await verifyEmail({ token })
        if (val) {
          setTokenValidated(true)
          setLoading(true)
        }
        setLoading(false)
      }
    }
    if (!tokenValidated) {
      verifyToken()
    }
  }, [token, tokenValidated])

  if (!loading && !token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        No token
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center mt-[20vh]">{error}</div>
  }

  return (
    <>
      {!tokenValidated && <LoadingPage />}

      {tokenValidated && (
        <div className="flex relative flex-col lg:flex-row bg-white-color dark:bg-black-color h-screen">
          <div className="flex-1 overflow-x-hidden">
            <img
              src="/images/auth/pexels-kseniachernaya-3965548.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="flex-[3] lg:flex-1 p-4 lg:p-8">
            <ProfileForm token={token} />
          </div>
        </div>
      )}
    </>
  )
}

export default Verify
