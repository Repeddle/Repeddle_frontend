import { FaFacebookF } from "react-icons/fa";
import api from "../../services/api";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useToastNotification from "../../hooks/useToastNotification";

function FacebookLoginButton() {
  const [searchParams] = useSearchParams();
  const { getUser } = useAuth();
  const { addNotification } = useToastNotification();
  const provider = searchParams.get("provider");
  const code = searchParams.get("code");
  const redirectUri = `${window.location.origin}${window.location.pathname}`;

  useEffect(() => {
    if (provider !== "facebook" || !code) return;
    api
      .get(`/auth/facebook/callback?code=${code}&redirect=${redirectUri}`)
      .then((response: any) => {
        localStorage.setItem("authToken", response.token);
        getUser();
        window.location.href = "/";
      })
      .catch((error) => {
        // Handle error during login
        console.error("Login failed:", error);
        addNotification(error ? error : "An error occurred");
      });
  }, [searchParams]);

  const signIn = async () => {
    try {
      window.location.href = `/api/auth/authorize?redirect_uri=${redirectUri}&client_id=facebook&scope=email,public_profile`;
    } catch (error) {
      console.log(error);
      addNotification("An error occurred");
    }
  };
  return (
    <FaFacebookF
      onClick={() => signIn()}
      className="text-4xl cursor-pointer hover:bg-malon-color/10 transition-all duration-300 hover:text-malon-color bg-orange-color text-orange-color bg-opacity-10 p-1.5 rounded "
    />
  );
}

export default FacebookLoginButton;
