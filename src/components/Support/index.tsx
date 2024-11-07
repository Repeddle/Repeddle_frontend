import { RiCustomerService2Fill } from "react-icons/ri";
import { CgChevronDown } from "react-icons/cg";
import { useEffect, useState } from "react";
import useArticle from "../../hooks/useArticle";
import FAQ from "./FAQ";
import Form from "./Form";
import Chat from "./Chat";
import Header from "./Header";
import { IGuestUser, IUser } from "../../types/user";
import useAuth from "../../hooks/useAuth";
import useToastNotification from "../../hooks/useToastNotification";
import { loginGuestService } from "../../services/user";
import socket from "../../socket";

export default function Support() {
  const { articles } = useArticle();
  const { user: defaultUser } = useAuth();
  const { addNotification } = useToastNotification();
  const [showSupport, setShowSupport] = useState(false);
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (showSupport) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showSupport]);

  useEffect(() => {
    if (defaultUser) {
      setUser(defaultUser);
    } else {
      const email = localStorage.getItem("guestUserEmail");
      const fullName = localStorage.getItem("guestUserFullName");
      if (email && fullName) {
        loginGuest({ email, fullName });
      }
    }
  }, []);

  const loginGuest = async (value: IGuestUser) => {
    try {
      const { email, fullName } = value;
      const res = await loginGuestService({ email, fullName });
      if (res) {
        setUser(res);
        socket.emit("login", res._id);
      }
    } catch (error) {
      throw error;
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return (
          <FAQ
            articles={articles}
            setScreen={setScreen}
            setShowSupport={setShowSupport}
            user={user}
          />
        );
      case "form":
        return (
          <Form
            setScreen={setScreen}
            setUser={setUser}
            loginGuest={loginGuest}
          />
        );
      case "chat":
        return <Chat user={user} />;
      default:
        break;
    }
  };

  const handleToggle = () => {
    if (defaultUser && defaultUser.role === "Admin") {
      addNotification(
        "Admin can't contact supporot, You are Suppport 😎",
        undefined,
        true
      );
    } else {
      setShowSupport(!showSupport);
    }
  };

  return (
    <div
      className={`fixed  z-50  ${
        showSupport
          ? "bottom-0 top-0 right-0 left-0 md:bottom-2  md:right-5 md:top-auto md:left-auto"
          : "bottom-[60px] right-5 md:bottom-2"
      }`}
    >
      {showSupport && (
        <div
          className={`relative flex h-full w-full md:h-[80vh] md:w-[25rem] mb-2 lg:rounded-md  flex-col bg-white `}
        >
          <div
            className="absolute top-5 right-5 z-20 cursor-pointer"
            onClick={handleToggle}
          >
            <CgChevronDown className="text-3xl text-orange-color " />
          </div>
          <Header screen={screen} setScreen={setScreen} user={user} />
          {renderScreen()}
        </div>
      )}
      <div
        className={`justify-end${showSupport ? "hidden md:flex" : "md:flex"}`}
      >
        <div
          onClick={handleToggle}
          className="p-3 bg-black dark:bg-white rounded-full cursor-pointer"
        >
          {showSupport ? (
            <CgChevronDown className="text-3xl text-orange-color curs" />
          ) : (
            <RiCustomerService2Fill className="text-3xl text-orange-color " />
          )}
        </div>
      </div>
    </div>
  );
}
