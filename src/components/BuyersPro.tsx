import { Link } from "react-router-dom"

const BuyersPro = () => {
  return (
    <div className="overflow-auto px-[10vw] lg:py-[30px] py-[35px]">
      <div className="text-[25px] font-bold uppercase text-center">
        BUYER'S PROTECTION
      </div>

      <div className="text-justify lg:mb-[30px] mb-5">
        With our Repeddle buyer’s protection, if you make a purchase COMPLETELY
        within Repeddle App or Website using ADD TO CART and checkout, and the
        product is remarkably not as described or doesn’t arrive as a result of
        seller not sending your product or seller’s negligent (and not yours),
        we will refund you in full including delivery fee, otherwise all sale is
        final. Please have a look at our refund policy{" "}
        <Link className="text-orange-color" to="/returns">
          here.
        </Link>{" "}
        Any payment made outside our App or Website will not be covered by the
        buyer’s protection. When you purchase a product on our App or Website we
        transfer the money to the seller’s account ONLY when the buyer confirms
        receipt of the product. Repeddle buyer’s protection by default covers
        all Repeddle user/community members that complete their purchase through
        repeddle App or Website using the add to cart button and checkout.
      </div>

      <div className="text-[25px] font-bold uppercase text-center">
        {" "}
        SELLER'S PROTECTION{" "}
      </div>
      <div className="text-justify lg:mb-[30px] mb-5">
        Seller’s don’t have to worry about not getting paid. After a successful
        sell of a product inside Repeddle’s App or website, the money is
        automatically deposited to Repeddle and we will transfer the money to
        seller’s Repeddle Wallet after buyer confirmed the receipt of the
        seller’s product. You can either decide to use the money for other
        purchase to resell on Repeddle or transfer it directly to your provided
        bank account. The Repeddle protection by default cover sellers of all
        levels that successfully completes their entire sale transaction inside
        Repeddle App or Website. To find out more about payment turn around
        period, see our refund policy{" "}
        <Link className="text-orange-color" to="/returns">
          here.
        </Link>
      </div>
    </div>
  )
}

export default BuyersPro
