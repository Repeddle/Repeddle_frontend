import useAuth from "../hooks/useAuth"
import useCart from "../hooks/useCart"

const RedirectButton = () => {
  const { user, logout } = useAuth()
  const { clearCart } = useCart()

  const signoutHandler = () => {
    logout()
    clearCart()
    localStorage.removeItem("userInfo")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
    // mixpanel.reset();
  }

  const redirect = async () => {
    // try {
    //     const { data } = await axios.get("api/redirects", {
    //       headers: { Authorization: `Bearer ${userInfo.token}` },
    //     });
    //     if (data.success) {
    //       if (region() === "ZAR") {
    signoutHandler()
    //         window.location.replace(
    //           `https://repeddle.com?redirecttoken=${data.token}`
    //           // `http://localhost:3000?redirecttoken=${data.token}&url=com`
    //         );
    //       } else {
    //         signoutHandler();
    //         window.location.replace(
    //           `https://repeddle.co.za?redirecttoken=${data.token}`
    //           // `http://localhost:3000?redirecttoken=${data.token}&url=coza`
    //         );
    //       }
    //     }
    //   } catch (err) {}
  }

  return user?.role === "Admin" ? (
    <div
      onClick={redirect}
      className="text-[white] text-center cursor-pointer rounded-[0.2rem] p-2.5 lg:p-0 bg-orange-color hover:bg-malon-color"
    >
      Redirect
    </div>
  ) : (
    ""
  )
}

export default RedirectButton
