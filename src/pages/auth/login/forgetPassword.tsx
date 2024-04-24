import InputWithLabel from "../../../components/ui/InputWithLabel"
import Button from "../../../components/ui/Button"
import { Link, useNavigate } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6"

const ForgetPassword = () => {
  const navigate = useNavigate()

  return (
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
            <form className="flex flex-col gap-6">
              <InputWithLabel
                label="Enter Recovery Email"
                type="email"
                id="email"
                placeholder="Email"
              />

              <Button type="submit" text="Reset Password" />

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
  )
}

export default ForgetPassword
