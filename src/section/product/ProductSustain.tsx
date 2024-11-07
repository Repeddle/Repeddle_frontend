import { FaCloud, FaLightbulb, FaWater } from "react-icons/fa"
import { Link } from "react-router-dom"

const ProductSustain = () => {
  return (
    <div className="mx-0 my-[15px]">
      <div className="font-semibold uppercase">
        REPEDDLE SUSTAINABILITY IMPACT
      </div>
      <div className="text-sm">
        <p className="mb-4">
          Save our environment (AFRICA) and planet from Landfill, Water
          pollution and Carbon Emission.
        </p>{" "}
        <p className="mb-4">
          We advocate for <b className="font-bold">clean air</b>,{" "}
          <b className="font-bold">clean water</b> and a{" "}
          <b className="font-bold">clean environment</b>. These are not too much
          to ask; these are common basic living condition!!!
        </p>
        <p className="mb-4">
          {" "}
          By buying and{" "}
          <Link className="underline text-malon-color" to="/sell">
            selling
          </Link>{" "}
          secondhand item on Repeddle, you’re not only reducing carbon footprint
          and saving the planet, but you are giving an African Child a better
          hope for tomorrow. Learn more on our sustainability take{" "}
          <Link className="underline text-malon-color" to="/sustainability">
            here.
          </Link>
        </p>
      </div>
      <div className="font-semibold uppercase">
        POSITIVE IMPACT OF USING SECONDHAND CLOTHES
      </div>
      <div className="flex text-sm items-center">
        <div className="flex-1 mt-1">
          <FaWater className="text-base" />
        </div>
        <div className="flex-[9]">
          <span className="text-base font-bold">2,700L</span> of water saved for
          one person to drink for 900 days.
        </div>
      </div>
      <div className="flex text-sm items-center">
        <div className="flex-1 mt-1">
          <FaCloud className="text-base" />
        </div>
        <div className="flex-[9]">
          <span className="text-base font-bold">10%</span> co2 of global carbon
          emissions avoided.
        </div>
      </div>
      <div className="flex text-sm items-center">
        <div className="flex-1 mt-1">
          <FaLightbulb className="text-base" />
        </div>
        <div className="flex-[9]">
          <span className="text-base font-bold">98%</span> Chance of clothes
          ending up in landfills avoided.
        </div>
      </div>
    </div>
  )
}

export default ProductSustain
