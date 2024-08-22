import { Link } from "react-router-dom"

const rebundle = () => {
  return (
    <div className="bs-container mx-auto max-w-7xl px-4 lg:px-8">
      <h2 className="font-medium text-xl text-center mb-8 lg:text-2xl">
        RE: BUNDLE
      </h2>
      <section className="mb-8">
        <p className="-mt-5 text-center">
          SOMETHING GREAT CAUGHT YOUR EYE? WONDERING IF YOU COULD BUY THEM
          TOGETHER USING ONE DELIVERY FEE? <b>YES, YOU CAN!</b>
        </p>
      </section>
      <h2 className="font-medium text-xl text-center mb-8 lg:text-2xl">
        HOW IT WORKS
      </h2>
      <h1 className="font-medium text-xl mb-8 lg:text-2xl text-malon-color">
        Buyer
      </h1>
      <section className="mb-8">
        <p className="text-justify -mt-5">
          Shopping for something on the App or Website and see item(s) you can’t
          let go from the same seller profile/shop? You can shop them all and
          pay for <b> one delivery fee. </b>
          It’s simple; When you purchase an item using a preferred delivery
          method as offered by the seller, and the seller enabled “Re:Bundle”
          option for their profile, you have <b> Two Hours </b> window circle to
          make more additional purchase. By so; You only pay for the first
          delivery, and the rest items you buy from the same seller within the
          open two hours’ window will be eligible for free delivery.
        </p>
        <p className="text-justify mt-5">
          This means the seller will ship all items in one package (including
          the first purchase) so you have bought multiple items, paid for one
          delivery, and get free delivery for the other items.
        </p>
      </section>
      <h1 className="font-medium text-xl mb-8 lg:text-2xl text-malon-color">
        Seller
      </h1>
      <section className="mb-8">
        <p className="text-justify -mt-5">
          Care about your customers/fans enough to give them the opportunity to
          spend less on delivery cost? This also means more earnings for you.
          Enabling <b> Re:Bundle </b> option in your profile/shop gives a buyer
          the opportunity to pay for one delivery fee, buy various items for the
          next
          <b> two hours </b> and get <b> free delivery </b> for the rest items
          they buy within that two hours window after they pay for the first
          delivery cost.
        </p>
        <p className="text-justify mt-5">
          When a seller enables Re:Bundle Option in their profile/shop, they
          will package all items as one package, (including the first purchase)
          to other purchases the same buyer had made within two hours window and
          ship as one.
        </p>
      </section>
      <h2 className="font-medium text-xl text-center mb-8 lg:text-2xl">
        LET’S BREAK IT DOWN
      </h2>
      <h1 className="font-medium text-xl mb-8 lg:text-2xl text-malon-color">
        As a Buyer
      </h1>
      <section className="mb-8">
        <div className="text-justify -mt-5">
          <ul className="list-disc">
            <li>You add the first item to your cart.</li>
            <li>
              You check out and pay for the first item + the preferred offered
              delivery fee.
            </li>
            <li>
              Within two hours from the first purchase, you are eligible for
              free delivery for other items you buy from the same seller/shop
              because they have enabled the Re:Bundle option on their shop.
            </li>
            <li>
              The free delivery elapses after two hours you made the first
              purchase.
            </li>
          </ul>
        </div>
      </section>
      <h1 className="font-medium text-xl mb-8 lg:text-2xl text-malon-color">
        As a Seller
      </h1>
      <section className="mb-8">
        <div className="text-justify -mt-5">
          <ul className="list-disc">
            <li>You activate Re:Bundle on your profile/shop.</li>
            <li>
              Buyers will pay for delivery only on the first purchase, and
              within two hours from that first purchase, they will be able to
              buy more items from your shop and get free delivery for the rest
              items they bought within the two hours’ window.
            </li>
            <li>
              When the two hours’ window ends, you will package all items the
              buyer purchased (including the first item purchased) and ship them
              as one package.
            </li>
            <li>This means more sale and more earnings for you.</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <div className="flex flex-col lg:flex-row lg:gap-24 items-center justify-center">
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/emirace/image/upload/v1660107093/phonescreen_opkx9a.png"
              alt="image"
              className="mb-5 mt-6 lg:w-96"
            />
            <div>
              {" "}
              <b> Purchase No 1 </b> - Free delivery option is visible but
              grayed out
            </div>
          </div>

          <div className="flex flex-col items-center lg:mt-0 lg:ml-32">
            <img
              src="https://res.cloudinary.com/emirace/image/upload/v1660107093/phonescreen_opkx9a.png"
              alt="image"
              className="mb-5 mt-6 lg:w-96"
            />
            <div>
              <b> Purchase No 2 </b> - Free delivery is enabled and can be
              chosen
            </div>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h1 className="text-center cursor-pointer hover:text-malon-color underline font-medium text-xl lg:text-2xl">
          Happy Thrifting!
        </h1>
        <div className="flex flex-row items-center justify-around mt-2.5 gap-5">
          <Link
            to="/buyersguide"
            className="text-left lg:text-justify text-[11px] lg:text-lg float-left lg:mr-52 text-malon-color cursor-pointer hover:text-orange-400"
          >
            BUYING GUIDE
          </Link>

          <Link
            to="/buyersguide"
            className="text-right lg:text-justify text-[11px] lg:text-lg float-right lg:ml-64 lg:-mr-12 text-malon-color cursor-pointer hover:text-orange-400"
          >
            CASH-OUT WITH FREE DELIVERY
          </Link>
        </div>
      </section>
    </div>
  )
}

export default rebundle
