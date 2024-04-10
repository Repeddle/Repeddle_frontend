import {
  FaCreditCard,
  FaGlobe,
  FaHandshake,
  FaTruckFast,
} from "react-icons/fa6"
import TopFooterItem from "./TopFooterItem"

const TopFooter = () => {
  return (
    <section className="flex flex-col">
      <img
        className="w-full -mt-px "
        src="https://res.cloudinary.com/emirace/image/upload/v1656370086/wave2_k9xnpv.png"
        alt=""
      />
      <div className="text-white -mt-0.5 bg-malon-color">
        <div className="!mx-0 !my-[5px] bs-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-3 gap-3 lg:gap-6">
            <TopFooterItem
              heading="Free Shipping with RE:BUNDLE"
              linkText="how"
              linkHref="rebundle"
              Icon={FaTruckFast}
              content="Get free shipping when you shop on Repeddle App or Website, using Re:Bundle. Discover"
            />

            <TopFooterItem
              heading="Secure, Easy and Protected Payments"
              linkText="more"
              linkHref="protections"
              Icon={FaCreditCard}
              content="With every item you buy using the complete checkout on our App or Website, you are guaranteed 100% money back. Find out"
            />

            <TopFooterItem
              heading="Community Engagement"
              Icon={FaHandshake}
              content="We are fostering a generation of conscious fashion consumption
              in Africa, and we can only achieve it together with our
              community. Using the in-built Chat/Message system, our
              community remain engaged about fashion sustainability, have
              access to easy communications tool, while participating in
              seamless fair trade."
            />

            <TopFooterItem
              heading="Repeddle Sustainability Impact"
              linkText="how"
              linkHref="/sustainability"
              Icon={FaGlobe}
              content="Fashion industry is the second most intense water consuming
              and polluting industry in the world. With the help of our
              community, we can drastically reduce this impact in Africa and
              make our environment and planet, a more livable place. Learn"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopFooter
