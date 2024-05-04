/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  brandA,
  brandB,
  brandC,
  brandD,
  brandE,
  brandF,
  brandG,
  brandH,
  brandI,
  brandJ,
  brandK,
  brandL,
  brandM,
  brandN,
  brandO,
  brandP,
  brandQ,
  brandR,
  brandS,
  brandT,
  brandU,
  brandV,
  brandW,
  brandX,
  brandY,
  brandZ,
  brandnumbers,
} from "../../../components/constant";
import React from "react";

// Define the Brands interface with an index signature
interface Brands {
  [key: string]: string[];
}

// Use the interface to type your brands object
const brands: Brands = {
  brandA,
  brandB,
  brandC,
  brandD,
  brandE,
  brandF,
  brandG,
  brandH,
  brandI,
  brandJ,
  brandK,
  brandL,
  brandM,
  brandN,
  brandO,
  brandP,
  brandQ,
  brandR,
  brandS,
  brandT,
  brandU,
  brandV,
  brandW,
  brandX,
  brandY,
  brandZ,
  brandnumbers,
};

async function fetchProduct(brandName: string) {
  // Replace with your actual API endpoint
  const response = await fetch(`/api/products/${brandName}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const product = await response.json();
  return product;
}

const Brand = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleAlphabetClick = (alphabet: string) => {
    const element = document.getElementById(
      alphabet === "#" ? "brandnumbers" : alphabet
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredBrands = Object.entries(brands).reduce(
    (acc, [brandKey, brandNames]) => {
      const filteredBrandNames = brandNames.filter((brandName) =>
        brandName.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      if (filteredBrandNames.length > 0) {
        acc[brandKey] = filteredBrandNames;
      }
      return acc;
    },
    {} as Brands
  );

  return (
    <div className="container mx-auto max-w-7xl px-6 mb-10">
      <h1 className="font-black text-xl lg:text-5xl text-center">Brands</h1>

      <section className="mt-8 text-center text-xl lg:text-3xl font-extrabold flex flex-wrap justify-center space-x-4 lg:space-x-5">
        {[
          "#",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ].map((alphabet) => (
          <div
            key={alphabet}
            onClick={() => handleAlphabetClick(alphabet)}
            className="cursor-pointer hover:text-yellow-400"
          >
            {alphabet}
          </div>
        ))}
      </section>

      <div className="mt-4 flex items-center bg-malon-color rounded-xl p-2 lg:w-9/12 mx-auto">
        <FaSearch
          className="text-yellow-400 mr-3 ml-1 cursor-pointer hover:text-black"
          size={25}
        />
        <input
          type="text"
          placeholder="Search brands..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" bg-white outline-none w-full p-2 rounded-xl"
        />
      </div>

      {Object.entries(filteredBrands).map(([brandKey, brandNames]) => (
        <div
          key={brandKey}
          id={
            brandKey === "brandnumbers"
              ? "brandnumbers"
              : brandKey.charAt(5).toUpperCase()
          }
        >
          <h2 className="font-black text-xl lg:text-3xl bg-gray-300 mb-3 mt-8 p-1 text-center w-60 mx-auto lg:ml-36 items-center justify-center rounded-xl">
            {brandKey}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-7xl text-center">
            {brandNames.map((brandName: string) => (
              <div
                key={brandName}
                className="border border-gray-300 md:border-0 p-2 md:p-0 cursor-pointer hover:text-yellow-500"
              >
                <Link
                  to={`/product/${brandName}`}
                  onClick={async (e) => {
                    try {
                      const product = await fetchProduct(brandName);
                      if (!product) {
                        e.preventDefault();
                        alert(
                          "The product you're searching for is not available"
                        );
                      }
                    } catch (error) {
                      console.error(error);
                      e.preventDefault();
                      alert("An error occurred while fetching the product");
                    }
                  }}
                >
                  {brandName}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Brand;
