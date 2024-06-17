import InputWithLabel from "../../components/ui/InputWithLabel"
import Button from "../../components/ui/Button"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { FormEvent, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { emailRegex } from "../../utils/constants"
import useToastNotification from "../../hooks/useToastNotification"
import { Link } from "react-router-dom"
import Modal from "../../components/ui/Modal"

const RegisterComp = () => {
  const [email, setEmail] = useState("")
  const [showEmail, setShowEmail] = useState("")
  const [formError, setFormError] = useState("")
  const [showModal, setShowModal] = useState(false)

  const { sendVerifyEmail, loading, error } = useAuth()
  const { addNotification } = useToastNotification()

  const validateEmail = () => {
    if (email.trim().length === 0) {
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
      const value = await sendVerifyEmail({ email: email.trim() })

      if (value) {
        setShowModal(true)
        setShowEmail(email)
        setEmail("")
        setFormError("")
      } else {
        addNotification(error ?? "An error occurred")
      }
    }
  }

  return (
    <>
      <div className="flex h-full w-full justify-center items-center flex-col">
        <div className="w-full max-w-lg flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Create an Account</h2>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <InputWithLabel
              label="Email"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
              error={formError}
              // onBlur={validateEmail}
            />

            <div className="text-center">
              By signing up, you are agreeing to our{" "}
              <Link className="text-orange-color" to="/privacypolicy">
                privacy policy
              </Link>{" "}
              and{" "}
              <Link className="text-orange-color" to="/terms">
                terms of use
              </Link>{" "}
              .
            </div>

            <Button
              text="Register"
              type="submit"
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
          <div className="w-full relative flex justify-center">
            <div className="relative bg-white-color dark:bg-black uppercase border-orange-color w-[50px] h-[50px] flex justify-center items-center z-[2] rounded-[50%] border-2">
              or
            </div>
            <div className="absolute w-full max-w-[500px] h-0.5 z-[1] top-2/4 bg-orange-color" />
          </div>
          <div className="flex justify-center items-center gap-6">
            <FaGoogle className="text-4xl cursor-pointer hover:bg-malon-color/10 transition-all duration-300 hover:text-malon-color bg-orange-color text-orange-color bg-opacity-10 p-1.5 rounded " />
            <FaFacebookF className="text-4xl cursor-pointer hover:bg-malon-color/10 transition-all duration-300 hover:text-malon-color bg-orange-color text-orange-color bg-opacity-10 p-1.5 rounded " />
          </div>
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <div className="h-full w-full pt-4 items-center px-8 py-6 rounded-lg flex flex-col gap-3">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl text-center">Verify Your Email Address</h1>
            <div className=" text-center">
              You're almost there! We will send an email to <b>{showEmail}</b>
            </div>

            <div className="text-center">
              Just click on the link in that email to continue your
              registration. If you don't see it, you may need to{" "}
              <b>check your spam</b> folder.
            </div>

            <div className="text-center">
              If you have already verify your email,{" "}
              <Link
                to="/auth/login"
                className="text-orange-color font-bold ml-1"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default RegisterComp
