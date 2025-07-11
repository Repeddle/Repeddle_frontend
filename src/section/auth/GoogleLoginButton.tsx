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

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      api
        .post("/auth/google/callback", { code })
        .then((response: any) => {
          localStorage.setItem("authToken", response.token);
          getUser();
          window.location.href = "/";
        })
        .catch((error) => {
          addNotification(error ? error : "An error occurred");
        });
    }
  }, [searchParams]);

  const signIn = async () => {
    try {
      const redirectUri = `${window.location.origin}${window.location.pathname}${window.location.search}`;
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
