import { Navigate, Outlet, useSearchParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useMemo } from "react"
import AuthNav from "../../components/layout/AuthNav"
import LoadingPage from "../../components/ui/LoadingPage"

export default function Auth() {
  const { loading, user } = useAuth()
  const [searchParam] = useSearchParams()
  const redirectUrl = useMemo(() => searchParam.get("redirect"), [searchParam])

  if (user) {
    return <Navigate to={redirectUrl ? `/${redirectUrl}` : "/dashboard"} />
  }

  return (
    <div>
      <AuthNav />
      <Outlet />
      {loading && <LoadingPage />}
    </div>
  )
}
