import { Link } from "react-router-dom"

const How = () => {
  return (
    <section>
      <Link to="/how-repeddle-work">
        <img
          src="https://res.cloudinary.com/emirace/image/upload/v1691653514/20230807_205931_0000_t2aa7t.png"
          alt="img"
          style={{ width: "100%", objectFit: "contain" }}
        />
      </Link>
    </section>
  )
}

export default How
