//import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-8">
      <header className="font-bold text-4xl text-center mb-8">OUR STORY</header>
      <section className="mb-8">
        {/* Commented out H1 element */}
        {/* <h1 className="font-bold text-5xl text-center my-8 sm:text-base">
 OUR STORY
</h1> */}
        <div className="text-center text-lg lg:text-2xl">
          <b>INSPIRING A GENERATION:</b> Crafting our story of a sustainable
          circular fashion in Africa, one garment at a time, <br /> one person
          at a time, and one loving home at a time.
        </div>
        <div className="relative my-8 mx-auto">
          <img
            src="https://res.cloudinary.com/emirace/image/upload/v1666946911/20221028_104228_0000_hnjzz1.webp"
            alt="img"
            className="w-full mx-auto sm:w-10/12 md:w-10/12 mb-4"
          />
          <Link to="/signup">
            <div
              className="bg-orange-400 absolute z-10 bottom-4 left-1/2 transform -translate-x-1/2 lg:py-5 lg:px-20 
            md:py-6 md:px-10 sm:py-10 sm:px-12 sm:p-18 sm:ml-18 rounded text-white font-bold text-sm md:text-xl"
            >
              JOIN US
            </div>
          </Link>
        </div>
      </section>
      <section className="mb-8">
        <h4 className="font-bold text-2xl text-center mb-4">WHO WE ARE</h4>
        <div className="text-lg lg:text-2xl mb-4">
          Repeddle is Africa’s leading social marketplace for Pre-loved fashion,
          Gen-Z, Millennials, the Environment, and your Budget. By fostering a
          creative generation of conscious fashion consumers to better the
          planet and our environment, we approach solving Africa’s fashion waste
          crisis.
        </div>
        <div className="text-lg lg:text-2xl mb-8 text-center">
          Become Part of Our Community Member; Click the JOIN US button above.
        </div>
      </section>
      <section className="mb-8">
        <h2 className="font-bold text-2xl text-center mb-4">
          REPEDDLE EXPLAINED: (THE M.G.H.)
        </h2>
        <div className="flex mb-4 justify-center">
          <div className="w-full sm:w-1/2 mb-4 mx-auto">
            <img
              src="https://res.cloudinary.com/emirace/image/upload/v1661221991/cytonn-photography-n95VMLxqM2I-unsplash_zjvrqp.webp"
              alt="img"
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-1/2 mb-4 mx-auto">
            <img
              src="https://res.cloudinary.com/emirace/image/upload/v1666953838/Repeddle_Logo-02_ztvmtx.png"
              alt="img"
              className="w-full"
            />
          </div>
        </div>
        <p className="text-lg lg:text-2xl mb-4">
          <b>THE MEANING:</b> Our name <b>REPEDDLE</b> is derived from two words
          “Re & Peddle” <b>Re</b>- Meaning: “Once more; afresh; anew” and{" "}
          <b>Peddle</b>- Meaning: “Try to sell (something, especially small
          goods) by going from place to place”.
        </p>
        <p className="text-lg lg:text-2xl mb-4">
          <b>OUR SYMBOL:</b> Our symbol represents a handshake in a circular
          form, meaning; people agreeing to join forces to achieve a beneficial
          common goal, these goal is to better both humanity and the planet. The
          circular form interprets as “recycling” that helps us save the planet.
          These put together, is part of our company’s vision: “people coming
          together to form community that solves environmental crisis through
          fashion Re-use and Recycling”
        </p>
        <p className="text-lg lg:text-2xl mb-4">
          <b>THE GOAL:</b> Our goal is to help address part of global
          environmental crisis, “Carbon emissions, Landfills and Waste”, which
          has led to a global warming state of emergency, and fashion industry
          being the 2nd largest contributor to these global problems.
        </p>
        <p className="text-lg lg:text-2xl mb-4">
          <b>THE HOW:</b> By providing a platform for a likeminded community
          that believes in a common goal, we address these challenges and
          encourage our community to “once more, refresh and make anew” fashion
          items to “Resell & Thrift” them on Repeddle. By so doing, we are
          radically reducing the impact of fashion footprint on our planet and
          making our environment a better place for all to live.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="font-bold text-2xl text-center mb-4">
          NOW, LET'S GO PEDDLE; DOWNLOAD OUR APP
        </h2>
        <div className="flex mb-4 justify-evenly relative">
          <div className="w-1/2 sm:w-1/2 mb-4 mx-auto mr-2 relative">
            <img
              src="https://res.cloudinary.com/emirace/image/upload/v1661221990/andhika-soreng-XuJ9qu47S2c-unsplash_po2ujf.webp"
              alt="img"
              className="w-full"
            />
            <img
              src="https://repeddle.com/images/as.png"
              alt="appstore"
              className="mr-7 float-right relative lg:bottom-20 w-24 lg:w-48 bottom-8 left-6"
            />
          </div>
          <h3
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          font-bold text-white text-5xl text-center whitespace-nowrap z-10
          md:text-2xl lg:text-6xl xl:text-7xl 2xl:text-8xl sm:text-lg
          shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl 2xl:shadow-3xl
          text-shadow responsive"
            style={{
              textShadow: "2px 2px 4px brown", // Added brown color to text-shadow
            }}
          >
            COMING SOON
          </h3>

          <div className="w-1/2 sm:w-1/2 mb-4 mx-auto relative">
            <img
              src="https://res.cloudinary.com/emirace/image/upload/v1661221991/blubel-TL5JFCvITp4-unsplash_q3ygsq.webp"
              alt="img"
              className="w-full"
            />
            <img
              src="https://repeddle.com/images/gp.png"
              alt="playstore"
              className="mr-7 float-right relative lg:bottom-20 w-24 lg:w-48 bottom-8 left-6"
            />
          </div>
        </div>
        <a href="https://repeddle.com/sell">
          <div className="cursor-pointer hover:underline hover:text-orange-300 font-bold text-center lg:text-2xl text-1xl text-red-700 -mt-14">
            THINK THE PLANET, THINK THE ENVIRONMENT, THINK REPEDDLE; GO PEDDLE
          </div>
        </a>
      </section>
      <div>
        <div>
          <section>

          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
