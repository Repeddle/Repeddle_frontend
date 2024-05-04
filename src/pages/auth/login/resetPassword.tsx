import { FormEvent, useEffect, useMemo, useState } from "react"
import InputWithLabel from "../../../components/ui/InputWithLabel"
import { FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from "react-router"
import { Link, useSearchParams } from "react-router-dom"
import Button from "../../../components/ui/Button"
import useAuth from "../../../hooks/useAuth"
import useToastNotification from "../../../hooks/useToastNotification"
import LoadingPage from "../../../components/ui/LoadingPage"

const ResetPassword = () => {
  const navigate = useNavigate()
  const { loading, error, resetPassword, verifyEmail } = useAuth()
  const { addNotification } = useToastNotification()

  const [searchParam] = useSearchParams()
  const token = useMemo(() => searchParam.get("token"), [searchParam])

  const [password, setPassword] = useState("")
  const [tokenValidated, setTokenValidated] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formError, setFormError] = useState({
    password: "",
    confirmPassword: "",
  })

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
        // Show modal
      } else {
        addNotification(error ?? "An error occurred")
      }
    }
  }

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
                      <a
                        className="text-orange-color hover:underline active:underline"
                        href="/auth/login"
                      >
                        Login
                      </a>
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
