import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import RegisterComp from '../../../section/auth/RegisterComp';
import { useState } from 'react';
import Modal from '../../../components/ui/Modal';

function Register() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <div className="flex relative flex-col lg:flex-row bg-white-color dark:bg-black-color h-screen">
        <div className="absolute flex inset-x-0 top-8 px-6 sm:px-14 sm:top-8 justify-between items-center">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="text-black lg:text-white text-base lg:text-xl cursor-pointer"
          />
          <Link to={'/'} className="h-8 sm:h-10 cursor-pointer">
            <img src="/images/logo/logo.png" alt="logo" className="h-full" />
          </Link>
        </div>
        <div className="flex-1 overflow-x-hidden">
          <img
            src="/images/auth/pexels-kseniachernaya-3965548.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="flex-[3] lg:flex-1 p-4 lg:p-8">
          <RegisterComp />
        </div>
      </div>
      {/* TODO: modal  */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-white h-full">This is the modal</div>
      </Modal>
    </>
  );
}

export default Register;
