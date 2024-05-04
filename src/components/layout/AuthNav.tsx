import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';

function AuthNav() {
  const navigate = useNavigate();
  return (
    <div className="fixed z-30 flex inset-x-0 top-8 px-6 sm:px-14 sm:top-8 justify-between items-center">
      <FaArrowLeftLong
        onClick={() => navigate(-1)}
        className="text-black lg:text-white text-base lg:text-xl cursor-pointer"
      />
      <Link to={'/'} className="h-8 sm:h-10 cursor-pointer">
        <img src="/images/logo/logo.png" alt="logo" className="h-full" />
      </Link>
    </div>
  );
}

export default AuthNav;
