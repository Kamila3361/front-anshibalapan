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
    <div className="absolute w-full flex items-center p-[15px] bg-white bg-opacity-20 backdrop-blur-sm pointer-events-auto z-50">
      <div className="flex flex-1 justify-center">
        <div className="text-5xl font-bold">AIBALA</div>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-[30px]">
        <Link href="/" className="text-2xl font-semibold hover:underline">Жаңа Әуен</Link>
        <Link href="/songs" className="text-2xl font-semibold hover:underline">Әуендер</Link>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
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



