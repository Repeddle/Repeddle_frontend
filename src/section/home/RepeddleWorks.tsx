import { Link } from "react-router-dom"

const RepeddleWorks = () => {
  return (
    <section>
      <Link to="/how-repeddle-work">
        <img
          src="/images/how_it_works.png"
          alt="img"
          className="w-full object-contain"
        />
      </Link>
    </section>
  )
}

export default RepeddleWorks
