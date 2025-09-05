import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useRegion from "../hooks/useRegion";
import useToastNotification from "../hooks/useToastNotification";

const RedirectButton = () => {
  const { user } = useAuth();
  const { clearCart } = useCart();
  const { region, changeRegion } = useRegion();
  const { addNotification } = useToastNotification();

  const redirect = async () => {
    try {
      await changeRegion(region === "NG" ? "ZA" : "NG");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      clearCart();
      window.location.replace(window.location.href);
    } catch (err) {
      addNotification("Fail to redirect", "", false);
    }
  };

  return user?.role === "Admin" ? (
    <div
      onClick={redirect}
      className="text-[white] text-center cursor-pointer rounded-[0.2rem] p-2.5 lg:p-0 bg-orange-color hover:bg-malon-color"
    >
      Redirect
    </div>
  ) : (
    ""
  );
};

export default RedirectButton;
