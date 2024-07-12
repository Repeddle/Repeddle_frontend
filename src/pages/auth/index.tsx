import { Navigate, Outlet, useSearchParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useMemo } from "react"
import AuthNav from "../../components/layout/AuthNav"

export default function Auth() {
  const { user } = useAuth()
  const [searchParam] = useSearchParams()
  const redirectUrl = useMemo(() => searchParam.get("redirect"), [searchParam])

  if (user) {
    return <Navigate to={redirectUrl ? `/${redirectUrl}` : "/dashboard"} />
  }

  return (
    <div>
      <AuthNav />
      <Outlet />
    </div>
  )
}
