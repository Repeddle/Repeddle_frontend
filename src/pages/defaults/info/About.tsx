//import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-8">
      <h1 className="font-bold text-4xl text-center mb-8 lg:text-5xl">
        OUR STORY
      </h1>
      <section className="mb-8">
        <div className="text-center text-lg lg:text-2xl">
          <b>INSPIRING A GENERATION:</b> Crafting our story of a sustainable
          circular fashion in Africa, one garment at a time, one person at a
          time, and one loving home at a time.
        </div>
        <div className="relative mx-auto">
          <img
            src="https://res.cloudinary.com/emirace/image/upload/v1666946911/20221028_104228_0000_hnjzz1.webp"
            alt="img"
            className="w-full  mb-4 sm:w-full"
          />

          <Link to="/signup">
            <div
              className="bg-orange-400 absolute lg:text-4xl z-10 bottom-4 left-1/2 transform -translate-x-1/2 lg:py-4 lg:px-6
             rounded text-white font-bold px-1 py-2 sm:-mr-10 text-base lg:mb-8"
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
        <p className="text-center -mt-8">
          <a
            href="https://repeddle.com/sell"
            className="font-bold lg:text-2xl text-1xl text-red-700 -mt-14 cursor-pointer hover:underline hover:text-orange-300"
          >
            THINK THE PLANET, THINK THE ENVIRONMENT, THINK REPEDDLE; GO PEDDLE
          </a>
        </p>

      </section>
      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Image icon on the left side */}
          <div className="md:w-1/3 mb-8 md:mb-0">
          <img src="img.png" alt="img" />
          </div>
          {/* Text on the right side */}
          <div className="md:w-2/3">
            <div className="flex flex-col justify-center items-center">
              <h4 className="p-0 leading-tight m-0 mx-1 font-bold text-2xl text-center md:text-left">
                REUSE &amp; SECOND-HAND
              </h4>
              <h4 className="box-border p-0 leading-tight m-0 mx-1 font-bold text-2xl text-center md:text-left">
                POSITIVE IMPACT OF USING PRE-LOVED GARMENT
              </h4>
              <h4 className="box-border p-0 leading-tight m-0 mx-1 font-bold text-2xl text-center md:text-left">
                SECOND-HAND = SECOND-CHANCE
              </h4>
            </div>
            <p className="font-medium text-lg text-left lg:text-xl lg:leading-8 lg:font-medium">
              By buying and selling second-hand item on Repeddle, you’re not
              only reducing carbon footprint and saving the planet, but you are
              giving an African Child a better hope for tomorrow. Learn more on
              our sustainability take <a href="/sustainability">here</a>
            </p>
            <ul className="box-border font-medium m-0 p-0 list-disc text-lg lg:text-xl lg:leading-8 lg:font-medium">
              <li>
                <b>98%</b> Chance of clothes ending up in landfills avoided.
              </li>
              <li>
                <b>2,700L</b> of water saved for one person to drink for 900
                days. “sustainablecampus.fsu.edu”
              </li>
              <li>
                <b>10%</b> Co2 of global carbon emissions avoided.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Image icon on the left side */}
          <div className="md:w-1/3 mb-8 md:mb-0">
          <img src="img.png" alt="img" />
          </div>
          {/* Text on the right side */}
          <div className="md:w-2/3">
            <div className="flex flex-col justify-center items-center">
              <h4 className="p-0 leading-tight m-0 mx-1 font-bold text-2xl text-center md:text-left">
                IT STARTS WITH LESS -
              </h4>
              <h4 className="box-border p-0 leading-tight m-0 mx-1 font-bold text-2xl text-center md:text-left">
                MAKING IT BETTER FOR AFRICA
              </h4>
              <h4 className="box-border p-0 leading-tight m-0 mx-1 font-bold text-2xl text-center md:text-left">
               +THE PLANET
              </h4>
            </div>
            {/*<p className="font-medium text-lg text-left">
              By buying and selling second-hand item on Repeddle, you’re not
              only reducing carbon footprint and saving the planet, but you are
              giving an African Child a better hope for tomorrow. Learn more on
              our sustainability take <a href="/sustainability">here</a>
            </p>*/}
            <ul className="box-border font-medium m-0 p-0 list-disc text-lg lg:text-xl lg:leading-8 lg:font-medium">
              <li>
               Think before you buy.
              </li>
              <li>
              Buy second-hand clothing from thrift stores, local markets, your family and friends or online like Repeddle.
              </li>
              <li>
              Discourage throw away culture, repair your damaged clothes instead of throwing them away. 
              You can resale them on Repeddle App and Website.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Image icon on the left side */}
          <div className="md:w-1/3 mb-8 md:mb-0">
           <img src="img.png" alt="img" />
          </div>
          {/* Text on the right side */}
          <div className="md:w-2/3">
            <div className="flex flex-col justify-center items-center">
              <h4 className="p-0 leading-tight m-0 mx-1 font-bold text-2xl text-center md:text-left">
                UPCYLE. RECYCLE. REUSE. RESELL
              </h4>
              <h4 className="box-border p-0 leading-tight m-0 mx-1 font-bold text-2xl text-center md:text-left">
                MAKING SUSTAINABILITY MORE IMPACTFUL IN THREE EASY WAYS
              </h4>
              <h4 className="box-border p-0 leading-tight m-0 mx-1 font-bold text-2xl text-center md:text-left">
               THE REPEDDLE VIP SHIELD
              </h4>
            </div>
            {/*<p className="font-medium text-lg text-left">
              By buying and selling second-hand item on Repeddle, you’re not
              only reducing carbon footprint and saving the planet, but you are
              giving an African Child a better hope for tomorrow. Learn more on
              our sustainability take <a href="/sustainability">here</a>
            </p>*/}
            <ul className="box-border font-medium m-0 p-0 list-disc text-lg lg:text-xl lg:leading-8 lg:font-medium">
              <li>
              First, we advance the conversation of secondhand fashion as part of the solution for sustainable fashion,
              to address the footprint and impact of fashion in Africa, our environment and the planet.
              </li>
              <li>
              Second we strive to take fashion waste off our environment by encouraging people to upcycle, recycle, 
              rework, reuse and resell fashion by making fashion affordable and sustainable to avoid waste,
              landfills and carbon emission.
              </li>
              <li>
              Third, we offer the best and quality rare finds to Africa’s Pre-love fashion lovers and community on Repeddle, 
              helping them to always think secondhand first. <a href="/sustainability" className="cursor-pointer font-extrabold hover:underline hover:text-orange-300">REPEDDLE VIP SHIELD</a> 
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
