import { FormEvent, useEffect, useState } from "react"
import InputWithLabel from "../../../components/ui/InputWithLabel"
import { Link, useNavigate, useParams } from "react-router-dom"
import Button from "../../../components/ui/Button"
import useAuth from "../../../hooks/useAuth"
import useToastNotification from "../../../hooks/useToastNotification"
import LoadingPage from "../../../components/ui/LoadingPage"

const ResetPassword = () => {
  const { error, resetPassword, verifyEmail } = useAuth()
  const { addNotification } = useToastNotification()

  const { token } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [tokenValidated, setTokenValidated] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formError, setFormError] = useState({
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true)
      if (token) {
        const val = await verifyEmail({ token })
        if (val) {
          setTokenValidated(true)
        }
      }
      setLoading(false)
    }
    if (!tokenValidated) {
      verifyToken()
    }
  }, [token, tokenValidated])

  const validatePassword = () => {
    if (password.length < 6) {
      setFormError({
        ...formError,
        password: "password must be at least 6 characters",
      })
      return false
    }

    setFormError({ ...formError, password: "" })
    return true
  }

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setFormError({
        ...formError,
        confirmPassword: "confirm password must equal password",
      })
      return false
    }

    setFormError({ ...formError, confirmPassword: "" })
    return true
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (validatePassword() && validateConfirmPassword() && token) {
      const value = await resetPassword(password, token)

      if (value) {
        addNotification("Password has been changed")
        navigate("/auth/login")
      } else {
        addNotification(error ?? "An error occurred")
      }
    }
  }

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
          <div className="flex-1 hidden lg:block overflow-x-hidden">
            <img
              src="/images/auth/jakub-zerdzicki-VfZj-4H5D48-unsplash.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="flex-[3] lg:flex-1 p-4 lg:p-8">
            <div className="flex h-full w-full mt-24 lg:mt-0 lg:justify-center items-center flex-col">
              <div className="w-full max-w-lg flex flex-col gap-6">
                <h2 className="text-2xl font-semibold">Forget Password</h2>
                <form className="flex flex-col gap-6" onSubmit={submitHandler}>
                  <InputWithLabel
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={setPassword}
                    error={formError.password}
                    onBlur={validatePassword}
                  />

                  <InputWithLabel
                    label="Confirm Password"
                    type="password"
                    id="confirm_password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    error={formError.confirmPassword}
                    onBlur={validateConfirmPassword}
                  />

                  <Button
                    type="submit"
                    text="Reset Password"
                    isLoading={loading}
                    disabled={loading}
                  />

                  <div className="flex items-center justify-center gap-4">
                    <p className="text-center text-sm space-x-0.5">
                      <span>Already have an account?</span>
                      <Link
                        className="text-orange-color hover:underline active:underline"
                        to="/auth/login"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ResetPassword
