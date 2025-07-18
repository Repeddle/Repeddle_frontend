import { FaGoogle } from "react-icons/fa";
import api from "../../services/api";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useToastNotification from "../../hooks/useToastNotification";

function GoogleLoginButton() {
  const [searchParams] = useSearchParams();
  const { getUser } = useAuth();
  const { addNotification } = useToastNotification();
  const redirectUri = `${window.location.origin}${window.location.pathname}?provider=google`;
  const provider = searchParams.get("provider");
  const code = searchParams.get("code");

  useEffect(() => {
    if (provider !== "google" || !code) return;

    api
      .get(`/auth/google/callback?code=${code}&redirect=${redirectUri}`)
      .then((response: any) => {
        localStorage.setItem("authToken", response.token);
        getUser();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error ? error : "An error occurred");
      });
  }, [searchParams, redirectUri]);

  const signIn = async () => {
    try {
      console.log("Redirect URI:", redirectUri);
      const res: any = await api.get(`/auth/google?redirect=${redirectUri}`);
      window.location.href = `${res.authUrl}`;
    } catch (error) {
      addNotification("An error occurred");
      console.log(error);
    }
  };
  return (
    <FaGoogle
      onClick={() => signIn()}
      className="text-4xl cursor-pointer hover:bg-malon-color/10 transition-all duration-300 hover:text-malon-color bg-orange-color text-orange-color bg-opacity-10 p-1.5 rounded "
    />
  );
}

export default GoogleLoginButton;
