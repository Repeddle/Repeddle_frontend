export const region = () => {
  const add =
    window.location.hostname === "www.repeddle.co.za" ||
    window.location.hostname === "repeddle.co.za"
      ? "ZAR"
      : "NGN"
  return add
}
