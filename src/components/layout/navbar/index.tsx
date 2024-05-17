import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import BarCategories from "./BarCategories";
import Middlebar from "./Middlebar";

function Navbar() {
  // useEffect(() => {
  //   setmodelRef1(modelRef.current);
  //   setmodelRef2(modelRef2.current);
  // }, []);

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;

      // Adjust the scroll threshold (72px) as needed
      const scrollThreshold = 72;

      if (
        isScrollingUp ||
        currentScrollPos <= scrollThreshold ||
        currentScrollPos === 0
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <div
        className={`fixed lg:relative transition-transform duration-[0.3s] ease-[ease-in-out] z-50 mb-0 left-0 top-0 w-full lg:mb-5 dark:bg-dark-ev1 bg-light-ev1
       ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <TopBar />

        <Middlebar />

        <BarCategories />
      </div>
      <div className="block lg:hidden h-[72px]" />
    </>
  );
}

export default Navbar;
