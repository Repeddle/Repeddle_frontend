import NewsLetter from "../../NewsLetter"

const FooterNewsLetter = () => {
  return (
    <div className="flex flex-col">
      <img
        className="w-full -mt-px bg-black"
        src="https://res.cloudinary.com/emirace/image/upload/v1656370086/wave_p4ujhx.png"
        alt=""
      />

      <div className="lg:h-[125px] relative w-full -mt-0.5 bg-orange-color">
        <NewsLetter />
      </div>
    </div>
  )
}

export default FooterNewsLetter
