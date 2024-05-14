import { FormEvent } from "react"
import { Helmet } from "react-helmet-async"
import { FaArrowRight } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import Button from "../../components/ui/Button"

const ProductSignin = () => {
  //   const [email, setEmail] = useState("")
  //   const [password, setPassword] = useState("")

  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get("redirect")
  const redirect = redirectInUrl ? redirectInUrl : "/"

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="max-w-[600px] shadow-orange-color shadow-[0px_0px_35px_0px] my-10 p-[50px] rounded-[10px]">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <div className="flex items-center justify-center">
        <div
          className="text-white-color flex w-[400px] justify-center cursor-pointer items-center font-bold m-[15px] p-2 rounded-[5px] border-none bg-[#507cc0]"
          id=""
        >
          <img
            className="h-5 mr-5"
            src="/public/images/icon-images/facebook.png"
            alt="facebook"
          />
          Facebook
        </div>
        <div
          className="text-white-color flex w-[400px] justify-center cursor-pointer items-center font-bold m-[15px] p-2 rounded-[5px] border-none bg-[#df4930]"
          id=""
        >
          <img
            className="h-5 mr-5"
            src="/public/images/icon-images/google.png"
            alt="google"
          />
          Facebook
        </div>
        <div className="w-full relative flex justify-center">
          <div className="relative uppercase border-orange-color w-[50px] h-[50px] flex justify-center items-center z-[2] m-[15px] rounded-[50%] border-2 ">
            or
          </div>
          <div className="absolute w-[500px] h-0.5 z-[1] top-2/4 bg-orange-color" />
        </div>
      </div>
      <form onSubmit={submitHandler}>
        {/* <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            className={mode === "pagebodydark" ? "hhf" : "color_black"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group> */}
        <div className="mb-4">
          <Button text="Sign In" type="submit" />
        </div>
        <div className="mb-3">
          New customer?{"  "}
          <Link to={`/signup?redirect=${redirect}`}>
            {" "}
            {"  "}Create your account
          </Link>
        </div>

        <div className="flex justify-center mt-6 hover:underline">
          <Link to="/info">
            Continue without Signing in <FaArrowRight />
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ProductSignin
