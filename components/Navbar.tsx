"use client";

import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past the first section
      const showThreshold = window.innerHeight * 0.7;
      if (window.scrollY > showThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  return (
    <>
      {/* Floating Navigation Bar */}
      <nav 
        className={`fixed bottom-[10%] left-1/2 -translate-x-1/2 h-[52px] p-1 flex items-start gap-2.5 
          rounded-[32px] border border-[#393939] bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] 
          z-40 transition-all duration-500 ease-in-out
          ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="flex items-center h-full">
          <a 
            href="#simple" 
            className="flex w-[146px] h-[44px] px-[15px] justify-center items-center rounded-[32px] 
              text-[#86868B] text-[14px] font-['Helvetica_Neue'] leading-[14px] tracking-[-0.5px] whitespace-nowrap 
              hover:bg-gradient-to-b hover:from-[#3B3B3B] hover:via-[#302F32] hover:to-[#1C1C1C] 
              hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] hover:outline hover:outline-1 hover:outline-[#424242] hover:text-white
              transition-all duration-300 ease-in-out"
          >
            How it works
          </a>
          <a 
            href="#pricing" 
            className="flex w-[146px] h-[44px] px-[15px] justify-center items-center rounded-[32px] 
              text-[#86868B] text-[14px] font-['Helvetica_Neue'] leading-[14px] tracking-[-0.5px] whitespace-nowrap 
              hover:bg-gradient-to-b hover:from-[#3B3B3B] hover:via-[#302F32] hover:to-[#1C1C1C] 
              hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] hover:outline hover:outline-1 hover:outline-[#424242] hover:text-white
              transition-all duration-300 ease-in-out"
          >
            Pricing
          </a>
          <a 
            href="#calendar" 
            className="flex w-[146px] h-[44px] px-[15px] justify-center items-center rounded-[32px] 
              text-[#86868B] text-[14px] font-['Helvetica_Neue'] leading-[14px] tracking-[-0.5px] whitespace-nowrap 
              hover:bg-gradient-to-b hover:from-[#3B3B3B] hover:via-[#302F32] hover:to-[#1C1C1C] 
              hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] hover:outline hover:outline-1 hover:outline-[#424242] hover:text-white
              transition-all duration-300 ease-in-out"
          >
            Book a call
          </a>
          <a 
            href="#pricing" 
            className="flex w-[146px] h-[44px] px-[15px] justify-center items-center rounded-[32px] 
              text-[#86868B] text-[14px] font-['Helvetica_Neue'] leading-[14px] tracking-[-0.5px] whitespace-nowrap 
              hover:bg-gradient-to-b hover:from-[#3B3B3B] hover:via-[#302F32] hover:to-[#1C1C1C] 
              hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] hover:outline hover:outline-1 hover:outline-[#424242] hover:text-white
              transition-all duration-300 ease-in-out"
          >
            Apply now
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button 
          className="absolute top-6 right-6 w-10 h-10" 
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <span className="block absolute w-6 h-0.5 bg-white rotate-45 translate-y-0"></span>
          <span className="block absolute w-6 h-0.5 bg-white -rotate-45 translate-y-0"></span>
        </button>
        
        <div className="flex flex-col items-center space-y-8">
          <a 
            href="#simple" 
            className="text-white text-2xl"
            onClick={toggleMobileMenu}
          >
            How it works
          </a>
          <a 
            href="#pricing" 
            className="text-white text-2xl"
            onClick={toggleMobileMenu}
          >
            Pricing
          </a>
          <a 
            href="#calendar" 
            className="text-white text-2xl"
            onClick={toggleMobileMenu}
          >
            Book a call
          </a>
          <a 
            href="#pricing" 
            className="text-white text-xl mt-8 border border-white px-8 py-3 rounded-full"
            onClick={toggleMobileMenu}
          >
            Apply Now
          </a>
        </div>
      </div>

      {/* Mobile Menu Hamburger Button */}
      <button 
        className="fixed top-6 right-6 w-10 h-8 flex flex-col justify-between z-40 md:hidden"
        onClick={toggleMobileMenu}
        aria-label="Open menu"
      >
        <span className="block w-full h-0.5 bg-white"></span>
        <span className="block w-full h-0.5 bg-white"></span>
        <span className="block w-full h-0.5 bg-white"></span>
      </button>
    </>
  );
};

export default Navbar; 