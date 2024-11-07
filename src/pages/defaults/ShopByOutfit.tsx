import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import Card from "../../components/Card"

const ShopByOutfit = () => {
  const available = true

  return (
    <div className="m-5">
      <Helmet>
        <title>Shop By Outfit</title>
      </Helmet>
      <h1 className="font-bold leading-tight font-sans text-[calc(1.375rem_+_1.5vw)] capitalize flex justify-center pt-5">
        Shop By Outfit
      </h1>
      {available ? (
        <div className="flex flex-col lg:flex-row">
          <img
            className="h-[600px]"
            src="https://res.cloudinary.com/emirace/image/upload/v1671258906/Picture2_gkly49.png"
            alt=""
          />
          <div className="flex-1 text-center text-xl lg:text-[50px] font-bold m-auto">
            Coming Soon
          </div>
        </div>
      ) : (
        <>
          <img
            className="h-[350px] w-full object-cover"
            src="/images/p9.png"
            alt="outfit"
          />
          <div className="flex mx-0 my-5">
            <div className="border m-[15px] px-5 py-[5px] rounded-[15px] border-solid">
              All
            </div>
            <div className="border m-[15px] px-5 py-[5px] rounded-[15px] border-solid">
              At the Office
            </div>

            <div className="border m-[15px] px-5 py-[5px] rounded-[15px] border-solid">
              <Link to="/createoutfits">Add Outfit</Link>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap border px-[25px] py-0 border-solid">
            <div className="w-[23%]">
              <Card src="/images/women.png" name="johnnycage" />
            </div>
            <div className="w-[23%]">
              <Card src="/images/card1.png" name="indianajone" />
            </div>
            <div className="w-[23%]">
              <Card src="/images/card2.png" name="kareem" />
            </div>
            <div className="w-[23%]">
              <Card src="/images/p1.jpg" name="fanstatic" />
            </div>
            <div className="w-[23%]">
              <Card src="/images/card2.png" name="kareem" />
            </div>
            <div className="w-[23%]">
              <Card src="/images/p1.jpg" name="fanstatic" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ShopByOutfit
