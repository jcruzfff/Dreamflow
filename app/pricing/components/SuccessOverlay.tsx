'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface SuccessOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessOverlay({ isOpen, onClose }: SuccessOverlayProps) {
  if (!isOpen) return null;

  // Animation variants for framer-motion (same as IntakeForm)
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
      {/* Particles Background */}
      <div id="particles-js" className="fixed inset-0 z-[-4]"></div>
      
      {/* Close Button - Same as IntakeForm */}
      <button onClick={onClose} className="absolute top-[4%] right-[4%] bg-transparent border border-[#242424] rounded-full p-3 text-white text-lg cursor-pointer z-[2000] hover:bg-white/5 transition-colors">
        <span className="flex items-center justify-center">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </span>
      </button>

      {/* Form Container - centered on screen (same as IntakeForm) */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-[1000] p-5">
        {/* Success Step - Exact copy from IntakeForm step 12 */}
        <motion.div
          className="flex flex-col items-center text-center w-full"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className="mb-8 flex justify-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#1ADABA" strokeWidth="2"/>
              <path d="M8 12L11 15L16 9" stroke="#1ADABA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2 className="text-[36px] md:text-[50px] lg:text-[64px] mb-4 font-normal text-center">Application submitted!</h2>
          <p className="text-xl text-[#dadada] mb-8 text-center max-w-2xl mx-auto">
            Thank you for your application. Our team will review it and get back to you within 1-2 business days to schedule your Dream Discovery Call.
          </p>
          
          <div className="flex justify-center">
            <button 
              onClick={onClose}
              className="relative z-[1000] py-3 md:py-4 px-10 md:px-[51px] text-lg md:text-xl bg-white text-black border-none rounded-[46.55px] cursor-pointer hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 flex items-center justify-center font-medium group"
            >
              Let&apos;s Start Dreaming
              <Image 
                src="/icons/black-arrow.svg" 
                alt="Arrow" 
                width={13}
                height={13}
                className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2"
              />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Image - Same as IntakeForm */}
      <div className="fixed bottom-0 left-0 w-full z-0 bottom-image">
        <div 
          className="absolute w-[1728px] h-[66px]" 
          style={{
            bottom: "-80%",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "1728px",
            background: "linear-gradient(98deg, #1ADBBB 6.26%, #14A5ED 42.34%, #926FE9 53.54%, #FFAF84 68.77%, #FF766C 75.65%, #F33265 84.13%)",
            filter: "blur(121.8px)",
            opacity: "0.8"
          }}
        />
      </div>
    </div>
  );
} 