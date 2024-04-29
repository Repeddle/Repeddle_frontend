import { Navigate, Outlet, useSearchParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useMemo } from "react"

export default function Auth() {
  const { loading, user } = useAuth()
  const [searchParam] = useSearchParams()
  const redirectUrl = useMemo(() => searchParam.get("redirect"), [searchParam])

  if (loading) {
    return <div>Loading</div>
  }

  if (user) {
    return <Navigate to={redirectUrl ? redirectUrl : "/dashboard"} />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
