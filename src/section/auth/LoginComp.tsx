import InputWithLabel from "../../components/ui/InputWithLabel";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useToastNotification from "../../hooks/useToastNotification";
import GoogleLoginButton from "./GoogleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";
import AppleLoginButton from "./AppleLoginButton";

const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, getUser, loading } = useAuth();
  const { addNotification } = useToastNotification();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const { isError, error } = await login({ email: email.trim(), password });
    if (!isError) {
      await getUser();
    } else {
      addNotification(error ? error : "An error occurred");
    }
  };

  return (
    <div className="flex h-full bg-white dark:bg-black w-full justify-center items-center flex-col">
      <div className="w-full max-w-lg flex flex-col gap-6">
        <h2 className="text-2xl text-black dark:text-white font-semibold">
          Sign In
        </h2>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <InputWithLabel
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />

          <InputWithLabel
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />

          <Link
            to="/auth/forget-password"
            className="self-end text-sm text-orange-color hover:underline active:underline -mt-2 mb-2"
          >
            Forget password
          </Link>

          <div className="text-center">
            By signing up, you are agreeing to our{" "}
            <Link className="text-orange-color" to="/privacypolicy">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link className="text-orange-color" to="/terms">
              terms of use
            </Link>{" "}
          </div>

          <Button
            text="Login"
            type="submit"
            isLoading={loading}
            disabled={loading}
          />

          <div className="flex items-center justify-center gap-4">
            <p className="text-center text-black dark:text-white text-sm space-x-0.5">
              <span>New Customer? </span>
              <Link
                className="text-orange-color active:underline hover:underline"
                to="/auth/register"
              >
                Create an account
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
          <GoogleLoginButton />
          <FacebookLoginButton />
          <AppleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
