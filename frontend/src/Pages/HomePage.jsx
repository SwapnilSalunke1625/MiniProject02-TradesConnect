import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewsHome from '../components/ReviewsHome';
import RatingPage from "./RatingProjectPage.jsx";
import ReviewHome from "../components/ReviewsHome.jsx";
import ContactUs from '../components/ContactUs.jsx';
import { FiSearch } from 'react-icons/fi';
import Plumber from "../components/Assets/Icons/Home main serveices/Plumber.svg";
import HomeRepair from "../components/Assets/Icons/Home main serveices/HomeRepair.svg";
import Electrical from "../components/Assets/Icons/Home main serveices/Electrical.svg";
import Painting from "../components/Assets/Icons/Home main serveices/Painting.svg";
import Moving from "../components/Assets/Icons/Home main serveices/Moving.svg";
import Cleaning from "../components/Assets/Icons/Home main serveices/Cleaning.svg";
import Direction from "../components/Assets/Icons/Direction.svg"

export default function HomePage(props) {
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    // Increment the rotation by 120 degrees per tap
    setRotation((prevRotation) => prevRotation + 120);
  };

  return (
    <>
      <div className='flex items-center flex-col w-full font-stdFont'>
        <div className="font-bold items-center mt-6 md:mt-20 flex flex-col flex-wrap">
          <h2 className="text-2xl md:text-5xl text-stdBlue">Find the best tradespeople</h2>
          <h2 className="text-2xl md:text-4xl md:mt-3 text-stdBlue">
            with <span className="text-3xl md:text-5xl text-color1">TradeConnect</span>
          </h2>
          <p className="text-xs md:text-lg md:mt-5 text-stdBlue">
            Connecting you with skilled tradespeople near you!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 md:mt-20 flex justify-center ">
          <div className="flex w-[300px] md:w-[500px] shadow-2xl rounded-3xl overflow-hidden">
            <input
              className="w-full h-[45px] md:h-[60px] px-4 md:px-6 text-sm md:text-lg border-0 focus:outline-none transition-all duration-200 ease-in-out placeholder-gray-500"
              type="text"
              placeholder="What do you need help with?"
            />
            <button className="h-[45px] md:h-[60px] w-[55px] md:w-[80px] flex items-center justify-center bg-stdBlue hover:bg-blue-950 transition-colors duration-200 ease-in-out">
              <FiSearch className="text-white" size={24} />
            </button>
          </div>
        </div>


        {/* Professions Image */}


        <div className="flex justify-center items-center mt-10 md:mt-20 mb-0 md:mb-20 px-5">
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">

            {/* First Row of Icons */}
            <div className="flex gap-10">
              {[
                { src: HomeRepair, label: "Home Repairs" },
                { src: Moving, label: "Moving" },
                { src: Electrical, label: "Electrical" }
              ].map((item, index) => (
                <Link to="/services" key={index} className="flex flex-col gap-3 items-center text-xs md:text-base font-semibold group">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-[30px] md:h-[60px] transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="transition-colors duration-300 group-hover:text-blue-600">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Second Row of Icons */}
            <div className="flex gap-10">
              {[
                { src: Cleaning, label: "Cleaning" },
                { src: Painting, label: "Painting" },
                { src: Plumber, label: "Plumbing" }
              ].map((item, index) => (
                <Link to="/services" key={index} className="flex flex-col gap-3 items-center text-xs md:text-base font-semibold group">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-[30px] md:h-[60px] transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="transition-colors duration-300 group-hover:text-blue-600">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>



        {/* Rating Page */}
        <RatingPage />

        {/* Review Section */}

        <div className="flex flex-col items-center justify-center w-full text-stdBlue px-5 my-10 md:my-20">
          <h2 className="text-xl md:text-3xl text-center font-bold mb-10 md:mb-20 ">
            See what happy customers are saying about TradeConnect
          </h2>
          <div className="flex flex-col w-full items-center">
            <div className='flex gap-[4rem]'>
              <ReviewHome name="Sophie Carter" />
              <ReviewHome name="Benjamin Adams" />
            </div>

            <div className="flex justify-center items-center mt-5 md:mt-10">
              <div className="p-3 h-[70px] w-[70px] md:h-[80px] md:w-[80px]  rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(#223265 0% 30%,transparent 30% 33%,#FF3D00 33% 63%,transparent 63% 66%,#008080 66% 96%,transparent 96% 100%)`,
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.5s ease',
                  clipPath: 'inset(5px round 50%)',
                }}>
                {/* Inner Div (Static) */}
                <div className="flex items-center justify-center bg-white text-stdBlue h-[40px] w-[40px] md:h-[50px] md:w-[50px] rounded-full font-bold cursor-pointer hover:bg-gray-200 hover:scale-105"
                  onClick={handleClick}>
                  <img src={Direction} className='h-[30px] hover:h-[40px]' />
                </div>
              </div>
            </div>

            <div className='flex gap-[4rem] mt-2 md:mt-4 '>
              <ReviewHome name="Matthew Evans" />
              <ReviewHome name="Oliver Scott" />
            </div>
          </div>
        </div>

        {/* Contact Page (if enabled) */}
        {/* <ContactUs /> */}
      </div>
    </>
  );
}

