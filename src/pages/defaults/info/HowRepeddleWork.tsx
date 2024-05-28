/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
const HowRepeddleWork = () => {
    return (
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-medium text-xl lg:text-2xl text-center">
          HOW REPEDDLE WORKS <br /> <span className="text-primary text-malon-color">FOR SELLERS</span>
        </h2>
        <section className="mt-10 mb-6 mx-auto px-5">
          <div className="mt-8 flex lg:flex-row flex-col items-center justify-center">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-4 lg:mb-0">
              <img 
                src="https://res.cloudinary.com/emirace/image/upload/v1691621393/ntblm7mnigoa2pr273g6.png" 
                alt="Step-1" 
                className="lg:w-3/4"
              />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start px-2">
              <div className="lg:w-3/4">
                <h2 className="text-primary text-malon-color text-center">TAKE A PICS</h2>
                <p className="text-justify">
                 Always Remember; “Great image sales fast.” Take a picture of the product you wish to sell using a good source of natural lighting...
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="border-gray-300 border-t-2 lg:mx-36">
         </div>
        <section className="mt-6 mb-6 px-5">
          <div className="mt-8 flex lg:flex-row flex-col items-center justify-center">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end px-4">
              <div className="lg:w-3/4">
                <h2 className="text-primary text-malon-color text-center">LIST & SHARE</h2>
                <p className="text-justify">
                  List Products On Repeddle With Just A Few Clicks: Listing is easier than you think. With&nbsp;10,400 brand&nbsp;names to choose from our database,
                  it's just a click away! List and describe your item with all information buyer needs to know, set your price and share to help buyers discover your listing.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mt-4 lg:mt-0">
              <img 
                src="https://res.cloudinary.com/emirace/image/upload/v1691621285/doyhrechq04fnfckki96.png" 
                alt="Step-2" 
                className="lg:w-3/4"
              />
            </div>
          </div>
        </section>
         <div className="border-gray-300 border-t-2 lg:mx-36">
         </div>
        <section className="mt-6 mb-6 px-5">
          <div className="mt-8 flex lg:flex-row flex-col items-center justify-center">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-4 lg:mb-0">
              <img 
                src="https://res.cloudinary.com/emirace/image/upload/v1691621379/x7wilble1b3muoqsyi6n.png" 
                alt="Step-1" 
                className="lg:w-3/4"
              />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start px-4">
              <div className="lg:w-3/4">
                <h2 className="text-primary text-malon-color text-center">CASHOUT</h2>
                <p className="text-justify">
                Request a payout anytime you sale an item, deliver the item and the buyer receives the item. With multiple delivery choices installed on our App and Website, 
                you can choose any delivery that’s most convenient for you to send or receive your item. Once the buyer marks your order as received, you cash-out.
                </p>
              </div>
            </div>
          </div>
        </section>
        <h2 className="font-medium text-xl lg:text-2xl text-center text-primary text-malon-color">
          FOR BUYERS
        </h2>
        <section className="mt-6 mb-6 px-5">
          <div className="mt-8 flex lg:flex-row flex-col items-center justify-center">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-4 lg:mb-0">
              <img 
                src="https://res.cloudinary.com/emirace/image/upload/v1691621421/fidhkhbzohm4svjzhdmb.png" 
                alt="Step-1" 
                className="lg:w-3/4"
              />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start px-4">
              <div className="lg:w-3/4">
                <h2 className="text-xl text-malon-color text-center">Hunt all you want</h2>
                <h2 className="text-primary text-orange-300 text-center italic">Fashion, Homeware, Tech, Gadgets &amp; More</h2>
                <p className="text-center"> <Link to="/newproduct" className="text-malon-color underline">
                Shop
                </Link> the trill. No guilt..!!</p>
                <p className="text-justify">
                From the brand you love to the most trendy styles, shop variety of your favorites from size to pocket friendly piece. 
                Scoring a deal on Repeddle is a sure thing when shopping for something exciting.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="border-gray-300 border-t-2 lg:mx-36">
         </div>
        <section className="mt-6 mb-6 px-5">
          <div className="mt-8 flex lg:flex-row flex-col items-center justify-center">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end px-4">
              <div className="lg:w-3/4">
                <h2 className="text-primary text-malon-color text-center">Buy safely with <Link to="/newproduct" className="text-malon-color underline">
                REPEDDLE PROTECT
                </Link>
                </h2> 
                <h2 className="text-primary text-orange-300 text-center italic">All Safe, No Worries!</h2>
                <p className="text-justify">
                We never underestimate the importance of trust and safety in our community. Every time you buy an item on Repeddle, 
                we ensure your money is safe by withholding your money so you get your item delivered to you before we make the money 
                available for sellers to withdraw. In case of any unfortunate event, our support teams are always available to help.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mt-4 lg:mt-0">
              <img 
                src="https://res.cloudinary.com/emirace/image/upload/v1691621408/odn3kjxjksaptotxjdxg.png" 
                alt="Step-2" 
                className="lg:w-3/4"
              />
            </div>
          </div>
        </section>
        <div className="border-gray-300 border-t-2 lg:mx-36">
         </div>
        <section className="mt-6 mb-6 mx-auto px-5">
          <div className="mt-8 flex lg:flex-row flex-col items-center justify-center">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-4 lg:mb-0">
              <img 
                src="https://res.cloudinary.com/emirace/image/upload/v1691621436/ce53bpnuya8btoby5er3.png" 
                alt="Step-1" 
                className="lg:w-3/4"
              />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start px-2">
              <div className="lg:w-3/4">
                <h2 className="text-primary text-malon-color text-center">Engage with the community.</h2>
                <h2 className="text-primary text-orange-300 text-center italic">Comment, Review, Share & Chat with fellow community members.</h2>
                <p className="text-justify">
                Connecting and engaging is very easy on Repeddle. We make our community part of us by making it social, so you can comment, review, 
                report or chat with sellers and other users. By this way, you get the best out of what you buy, while keeping it safe.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default HowRepeddleWork;
  