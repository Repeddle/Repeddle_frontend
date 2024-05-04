import { FormEvent, useState } from "react"
import InputWithLabel from "../../../components/ui/InputWithLabel"
import Button from "../../../components/ui/Button"
import { Link, useNavigate } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6"
import useAuth from "../../../hooks/useAuth"
import useToastNotification from "../../../hooks/useToastNotification"
import { emailRegex } from "../../../utils/constants"
import SmallModel from "../../../components/SmallModel"

const ForgetPassword = () => {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("")
  const [formError, setFormError] = useState("")
  const { sendForgetPasswordEmail, loading, error } = useAuth()
  const { addNotification } = useToastNotification()

  const validateEmail = () => {
    if (email.length === 0) {
      setFormError("Email field must not be empty")
      return false
    }

    if (!email.toLocaleLowerCase().match(emailRegex)) {
      setFormError("Please enter a valid email")
      return false
    }

    setFormError("")
    return true
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (validateEmail()) {
      const value = await sendForgetPasswordEmail({ email })

      if (value) {
        setShowModal(true)
      } else {
        addNotification(error ?? "An error occurred")
      }
    }
  }

  return (
    <>
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
                  label="Enter Recovery Email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                  error={formError}
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
      <SmallModel setShowModel={setShowModal} showModel={showModal}>
        <div className="bg-white h-full pt-4 px-8 py-6 rounded-lg flex flex-col gap-2">
          <h1 className="text-3xl">Verification Sent</h1>
          <div className="max-w-md">
            A password reset link has been sent to your email
          </div>
        </div>
      </SmallModel>
    </>
  )
}

export default ForgetPassword
