"use client";

import { useState } from 'react';
import Link from 'next/link';
import '../globals.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="absolute w-full flex justify-between p-[15px] bg-opacity-0 bg-white pointer-events-auto z-50">
      <div className="hidden lg:flex gap-[30px]">
        <div className='bg-yellow-400 font-semibold p-[30px] rounded-xl'>
          <Link href="/" className="text-4xl hover:underline">Жаңа Әуен</Link>
        </div>
        <div className='bg-white font-semibold p-[30px] rounded-xl'>
          <Link href="/songs" className="text-4xl hover:underline">Әуендер</Link>
        </div>
      </div>
      <div className="bg-white font-semibold py-8 w-full md:w-[650px] text-center md:mx-[30px] md:rounded-xl text-4xl">
        Aibala
      </div>
      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center bg-white">
        <button onClick={toggleMenu} className="text-3xl">
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>
      
      {/* Mobile Dropdown Menu */}
      <div className={`fixed top-20 left-0 w-full bg-white bg-opacity-20 backdrop-blur-md shadow-lg z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}`}>
        <div className="flex flex-col items-end p-4">
          <Link href="/" className="text-2xl font-semibold mb-4 hover:underline" onClick={() => setIsMenuOpen(false)}>Жаңа Әуен</Link>
          <Link href="/songs" className="text-2xl font-semibold mb-4 hover:underline" onClick={() => setIsMenuOpen(false)}>Әуендер</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;




