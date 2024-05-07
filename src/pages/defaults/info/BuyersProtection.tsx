import { Link } from "react-router-dom";

const BuyersProtection = () => {
  return (
    <div className="container mx-auto max-w-7xl px-8">
        <section className="mb-6 lg:mt-12 mt-8">
        <h2 className="font-medium text-xl lg:text-3xl text-center">
        BUYER'S PROTECTION
        </h2> 
        <p className="text-justify">
        With our Repeddle buyer’s protection, if you make a purchase COMPLETELY within Repeddle App or Website using ADD TO CART and checkout, 
        and the product is remarkably not as described or doesn’t arrive as a result of seller not sending your product or seller’s negligent (and not yours), 
        we will refund you in full including delivery fee, otherwise all sale is final. Please have a look at our refund policy <Link to="/returns" 
        className="text-orange-400 hover:text-red-700 hover:underline"> here.</Link> Any payment made outside our App or Website will not be covered by the buyer’s protection. 
        When you purchase a product on our App or Website we transfer the money to the seller’s account ONLY when the buyer confirms receipt of the product. Repeddle buyer’s protection 
        by default covers all Repeddle user/community members that complete their purchase through repeddle App or Website using the add to cart button and checkout.
        </p>
        </section>

        <section className="mb-12 mt-10">
        <h2 className="font-medium text-xl lg:text-3xl text-center">
        SELLER'S PROTECTION
        </h2> 
        <p className="text-justify">
        Seller’s don’t have to worry about not getting paid. After a successful sell of a product inside Repeddle’s App or website, the money is automatically deposited to Repeddle 
        and we will transfer the money to seller’s Repeddle Wallet after buyer confirmed the receipt of the seller’s product. You can either decide to use the money for other purchase 
        to resell on Repeddle or transfer it directly to your provided bank account. The Repeddle protection by default cover sellers of all levels that successfully completes their 
        entire sale transaction inside Repeddle App or Website. To find out more about payment turn around period, see our refund policy <Link to="/returns" 
        className="text-orange-400 hover:text-red-700 hover:underline"> here.</Link>
        </p>
        </section>
    </div>
  )
}

export default BuyersProtection