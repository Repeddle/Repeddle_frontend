import OrangeButton from "../../components/ui/OrangeButton"
import { Link } from "react-router-dom"
import useTheme from "../../hooks/useTheme"

const SellBulkAndSlot = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className="flex flex-col items-center mx-0 lg:my-10 my-5 mb-2.5">
      <h2 className="flex text-center justify-center font-bold lg:text-base text-[15px] mx-[5px] my-0">
        BULK n SLOT
      </h2>
      <div className="relative">
        <img
          className="w-full object-cover h-full mx-0 my-2.5"
          src={
            !isDarkMode
              ? "https://res.cloudinary.com/emirace/image/upload/v1665979415/png_20221014_165106_0000_288__pg6wxw.webp"
              : "https://res.cloudinary.com/emirace/image/upload/v1665979442/png_20221014_164522_0000_287__vlarrx.webp"
          }
          alt="image"
        />
        <Link to="/sell">
          <h2 className="lg:text-[40px] font-bold text-[13px] absolute -translate-x-2/4 left-[55%] bottom-[10%]">
            GET STARTED
          </h2>
        </Link>
      </div>
      <p className="text-sm sm:text-base mb-2.5 text-justify">
        Repeddle BULK n SLOT offers opportunity to either retailers who are
        clearing out a large amount of items as clearance, or wholesalers who
        are selling items in bulk or slots also known as BALES. These option
        gives you the benefit to list a minimum of ten items in a bag/box and
        you can list as much items as you are able to deliver.
      </p>
      <p className="text-sm text-justify sm:text-base mb-2.5">
        We initiated this solution to provide a self{" "}
        <b className="font-bold">B2B</b> services to our community members who
        may be in need to buy in bulk from fellow community members. If you’re a
        retailer and would prefer to buy items online that you can also resale
        online; these service carters for you, and if you are a wholesaler that
        prefer to sell your BALES online, this service is also tailored made for
        you.
      </p>
      <h4 className="font-bold text-xs lg:text-base text-center mx-[5px] my-0">
        THREE EASY STEPS TO USE BULK n SLOT
      </h4>
      <div className="flex w-full justify-center mt-[10px] items-start">
        <b className="font-bold mr-[10px]">1.</b>
        <p className="text-sm text-justify sm:text-base mb-2.5">
          <b className="font-bold">TAKE A PIC/VIDEO:</b> Make sure to pack up to
          Ten (10) minimum items, you want to sell in a bag/box, snap a photo of
          your Bulk or Slot bag/box and take extra clear detailed photos or make
          a short video of items with any visible and reasonable tear & wear.
          Uploading video is optional, but strongly advised to make things easy
          for you and buyer.
        </p>
      </div>

      <div className="flex w-full justify-center items-start">
        <b className="mr-[10px] font-bold">2.</b>
        <p className="text-sm text-justify sm:text-base mb-2.5">
          <b className="font-bold">LIST:</b> Ensure to describe in details the
          conditions of your items as per our condition guidelines before
          listing your Bulk or Slot bag/box, give full details of items in the
          description and if your bag/box contains more than 10 items, be sure
          to state how many items it contains while listing. Please provide as
          much information as possible in description, this information will
          help buyers make better informed purchase decision. Any misleading
          information or not providing information buyer needs to know about
          your items before purchase may result to return and refund.
        </p>
      </div>

      <div className="flex w-full justify-center items-start">
        <b className="mr-[10px] font-bold">3.</b>
        <p className="text-sm text-justify sm:text-base mb-2.5">
          <b className="font-bold">SHARE AND CASH-OUT:</b> After a successful
          upload, be sure to share your listing, both on Repeddle’s platforms
          and social medias to help buyers discover your items. You can cash-out
          by either withdrawing your cash from your Repeddle’s wallet to your
          bank account or you can decide to further trade with it, buying more
          goods to sell, as soon as your item sale and buyer receives your
          shipment.
        </p>
      </div>
      <OrangeButton>
        <h2 className="flex text-center justify-center font-bold lg:text-base text-[15px] mx-[5px] my-0">
          GET STARTED
        </h2>
      </OrangeButton>
    </div>
  )
}

export default SellBulkAndSlot
