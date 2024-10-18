import { Link } from "react-router-dom"

const FeeStructure = () => {
  return (
    <div className="container mx-auto max-w-7xl px-8 pt-6">
      <h2 className="font-medium text-xl lg:text-2xl text-center">
        HOW REPEDDLE COMMISSION WORKS
      </h2>
      <section className="mb-6">
        <h2 className="font-medium text-xl lg:text-2xl text-malon-color mb-2">
          OUR COMMISSION EXPLIANED
        </h2>
        <p className="text-justify leading-tight">
          Here’s how our fee structure works to help you understand what you
          could earn and decides how you should mark your price. <br />
          To give you unmatched user experience and support the growth of your
          business as part of our thrift secondhand community, you will only be
          charged 7.9% commission. <br />
          These commission is charged against the listed product price,
          including delivery fee on the total amount of a successful sale.{" "}
          <br />
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-medium text-xl lg:text-2xl mb-2">
          HERE’S THE ENTIRE FEES BREAKDOWN
        </h2>
        <p className="text-justify">
          Repeddle Commission: 2.9% <br />
          Payment processing fee up to: 5% (Charged by payment gateway) <br />
          Total commission: 7.9% <br />
          Total commission is applied against the total amount of a successful
          checkout of <b>each</b> product(s) including delivery that buyer paid
          for. Once the transaction is complete and you send your product to the
          buyer and buyer confirms they receive your delivery, we will less the
          commission and pay the balance into your <b>Repeddle wallet</b>. You
          can decide to use your earnings within the Repeddle App and Website or
          transfer into your provided bank account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-medium text-xl lg:text-2xl mb-2">
          THE ENTIRE FEE CHARGED IS DEVIDED INTO TWO PARTS:
        </h2>
        <ol className="mb-4 pl-8 list-decimal list-outside text-justify">
          <li>
            2.9% Repeddle commission: Aid us to continue supporting the growth
            of your business and giving you great and seamless user experience
            with access to all the functionality and resources available on
            Repeddle App and Website.
          </li>
          <li>
            5% Payment Processing fee: Payment processing fee is charged by
            payment gateway providers available on our platform which enables
            them to offer you safe and secured payment experience.
          </li>
        </ol>
        <p className="mb-4 text-justify">
          <b>PS:</b> When making a withdrawal from your Repedlle wallet, the
          payments gateway providers also charge a processing fee; For South
          Africa, a fixed amount of R10 regardless the amount of that
          transaction. For Nigeria, the amount depends the charge, but between
          (N10.75 – N53.75)Max. These fee is entirely up to the payment
          platforms, Repeddle do not have any say or take in these charge
          whatsoever.
        </p>
        <p className="font-black mb-4">
          THERE ARE NO SETUP, SIGNUP, ADDING PRODUCT, MONTHLY OR HIDDEN FEES.
        </p>
        <p className="text-malon-color font-bold mb-4">
          ESTIMATED CALCULATION EXAMPLE MADE FOR YOU!
        </p>
        <p className="mb-4">
          This gives you an idea of what your earning looks like base on the
          listed price of your product, your delivery choice and our commission.
        </p>
        <p className="font-bold">
          {" "}
          <b>Say a successful purchase is made in</b>{" "}
          <span className="text-malon-color">Nigeria</span>
        </p>
        <ul className="list-disc text-justify pl-5 mb-4">
          <li>Your Product listed price is NGN 300</li>
          <li>Balance = NGN 276.3</li>
          <li>Delivery cost is NGN 100</li>
          <li>Comission on delivery cost 1.4% = NGN 1.4</li>
          <li>
            From Your Order product page, select <b>Log a Return.</b>{" "}
          </li>
          <li>Total amount buyer paid is NGN 400</li>
          <li>
            The total earning we will send to your Repeddle wallet is NGN 274.9
          </li>
        </ul>
        <p className="font-bold">
          {" "}
          <b>Say a successful purchase is made in</b>{" "}
          <span className="text-malon-color">South Africa</span>
        </p>
        <ul className="list-disc text-justify pl-5 mb-4">
          <li>Your Product listed price is R 300</li>
          <li>Shipping cost to buyer is R 59</li>
          <li>Total cost we charge buyer is R 359</li>
          <li>
            7.9% Commission fee applied to the total amount paid by buyer is R
            28.37
          </li>
          <li>
            The total earning we will send to your Repeddle wallet or your bank
            account is = R 330.63
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="font-medium text-xl lg:text-2xl text-malon-color">
          HELPING YOU MARK YOUR PRICE
        </h2>
        <p>
          While we want you to have fun doing what you love doing best, we also
          prioritize that your business generates profit for you, hence we came
          up with a strategy to help you make a good price marking of your
          product.
        </p>
        <ul className="list-disc text-justify pl-5 mt-4">
          <li>
            Before you mark a price on your product, consider factoring in all
            the expenses incurred in the process.
          </li>
          <li>
            Your expenditure may also include the commission charged on any
            thrift or secondhand online platform you sell your product; In this
            case “Repeddle app and website”.
          </li>
          <li>
            Then add all the expenditure including cost of the purchase of your
            product or the current market value.
          </li>
          <li>
            Then you will have the total price to list your products on Repeddle
            app and website
          </li>
          <li>
            Finally, when your product is sold “thrifted” you’re expected to
            make the full total estimated amount you intend to sell your
            product, back in your{" "}
            <b className="text-malon-color">Repeddle Wallet</b> or bank account.
          </li>
        </ul>
        <p className="mt-4 mb-6">
          <b className="text-malon-color font-black"> NOTE: </b> We do not
          currently offer cross border sells. Example: If you’re located in
          Nigeria and your product is listed in Nigeria, you will only sell to
          buyers within Nigeria. Viś-à-viś to sellers and buyers in South
          Africa.
        </p>
      </section>
      <h2 className="font-medium text-xl lg:text-2xl text-malon-color">
        WONDERING WHY YOU NEED TO PAY COMMISSION? HERE’S WHY
      </h2>
      <section className="mb-8 mt-2">
        <p className="text-justify mb-3">
          <b className="font-black">App or Website Infrastructure: </b> Our
          infrastructure is built with tools to support your business growth, to
          maintain this infrastructure there’s a lot that goes on behind the
          scene. We use the 2,9% Repeddle commission fee to offset the monthly
          maintenance fee that is required to keep these infrastructure running
          smoothly.
        </p>
        <p className="text-justify mb-3">
          <b className="font-black">Marketing: </b> For a business to thrive, it
          requires aggressive consistent marketing, our aim is for your business
          to succeed, either you do it as a side hustle or fulltime. We
          prioritize your growth and currently subsidizing Ad campaigns we run
          so your store and real products gets to the right hand and find new
          home.
        </p>
        <p className="text-justify mb-3">
          <b className="font-black">Support system: </b> Our customer support
          system is active and accessible at all times to you, so you get all
          the information, insights and education you need to scale your
          business while having great experience using Repeddle’s app and
          website.
        </p>
        <p className="text-justify mb-3">
          <b className="font-black">Delivery: </b> Repeddle provides you with
          hassle free, easy and a click away delivery options integrated into
          our app and website to choose from. You have the choice to choose
          which delivery option(s) is convenient for you that you offer to
          buyers, with the delivery options you have initiated, buyers will
          choose what’s also convenient for them, both in time and cost. These
          gives you more selling opportunities.
        </p>
        <p className="text-justify mb-3">
          <b className="font-black">Payments: </b> Unlike other platforms,
          Repeddle offers you different payment options that’s convenient,
          secured and reliable for you to choose from. These payment processing
          platforms charges up-to 5% of the total amount for every transaction
          that goes through your sellers account/dashboard. 5% of the 7.9% we
          charge covers this fee.
        </p>
        <p className="text-justify mb-3">
          <b className="font-black">In Summary: </b> the more you sell, the
          better your opportunity and chances to earn more with our reward
          programs and free membership VIP prioritization. For you to make it to
          our <b className="text-malon-color">PRIORITY LIST</b>
          and get verified with <b className="text-malon-color">VIP SHILED</b>,
          your sale and earnings needs to be higher in number than other users +
          your total profile reviews + star ratings. Read more about our reward
          programs and how we calculate our verification shield approval here.
        </p>

        <Link
          to="/newproduct"
          className="text-orange-400 hover:text-malon-color hover:underline font-medium text-[1.2rem]"
        >
          LIST A PRODUCT TO START SELLING TODAY!
        </Link>
      </section>
    </div>
  )
}

export default FeeStructure
