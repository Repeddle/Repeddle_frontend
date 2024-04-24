import InputWithLabel from "../../components/ui/InputWithLabel"
import Button from "../../components/ui/Button"
import { FaFacebookF, FaGoogle } from "react-icons/fa"

const RegisterComp = () => {
  return (
    <div className="flex h-full w-full justify-center items-center flex-col">
      <div className="w-full max-w-lg flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Create an Account</h2>
        <form className="flex flex-col gap-4">
          <InputWithLabel
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
          />

          <Button text="Register" />

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
  )
}

export default RegisterComp
